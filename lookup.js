// Automatic entry uses public dictionary senses and context hints. It never saves until confirmed.
const irregularForms={drawn:'draw',drew:'draw',taken:'take',took:'take',given:'give',gave:'give',written:'write',wrote:'write',seen:'see',saw:'see',made:'make',went:'go',gone:'go',thought:'think',brought:'bring',felt:'feel',found:'find',known:'know',knew:'know',built:'build',said:'say',told:'tell'};
const stopwords=new Set('a an the of to in on at is are was were be been being it its this that they he she we you i and or for from by with as do does did have has had will would can could may might should not their his her our your something someone one'.split(' '));
function normalizeTerm(s){return s.trim().replace(/^[\s\d.)、•\-*]+/,'').replace(/^["“'‘]+|["”'’.,;:!?。；：！？]+$/g,'').trim()}
function englishTokens(s){return (s.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g)||[])}
function stemWord(w){w=w.toLowerCase();if(irregularForms[w])return irregularForms[w];if(/ies$/.test(w))return w.slice(0,-3)+'y';if(/ing$/.test(w)&&w.length>5)return w.slice(0,-3).replace(/(.)\1$/,'$1');if(/ed$/.test(w)&&w.length>4)return w.slice(0,-2).replace(/(.)\1$/,'$1');if(/s$/.test(w)&&!/(ss|us|is)$/.test(w))return w.slice(0,-1);return w}
function parseEntryInput(raw,providedSentence=''){
  let english='',chinese='',sentence=providedSentence.trim();
  const lines=raw.trim().split(/\n+/).map(s=>s.trim()).filter(Boolean);
  for(let line of lines){
    const sentenceLabel=/^(英文原句|原句|sentence)\s*[:：]/i.test(line);
    line=line.replace(/^(单词|中文释义|中文|释义|英文原句|原句|英文|word|meaning|sentence)\s*[:：]\s*/i,'');
    if(/[\u3400-\u9fff]/.test(line)){
      const m=line.match(/^([a-zA-Z][a-zA-Z'’ -]{0,100}?)\s*(?:[：:—–\t]|\s)\s*([\u3400-\u9fff].*)$/);
      if(m&&englishTokens(m[1]).length<=6){if(!english)english=normalizeTerm(m[1]);if(!chinese)chinese=m[2].trim()}
      else if(!chinese)chinese=line;
    }else if(/[a-z]/i.test(line)){
      if(sentenceLabel||englishTokens(line).length>6||/[.!?]$/.test(line)&&englishTokens(line).length>2){if(!sentence)sentence=line}
      else if(!english)english=normalizeTerm(line);
      else if(!sentence)sentence=line;
    }
  }
  if(englishTokens(english).length>6)throw Error('请粘贴一个生词或短语；完整英文句子请放到可选原句中。');
  if(!english&&!chinese)throw Error(sentence?'请补充要整理的英文单词或中文词义，不能只输入原句。':'请先粘贴英文单词或中文释义。');
  return {english,chinese,sentence};
}
function inferPartOfSpeech(term,sentence){
  if(!sentence)return '';
  const tokens=englishTokens(sentence),index=tokens.findIndex(t=>stemWord(t)===stemWord(term));if(index<0)return '';
  const prev=tokens[index-1]||'',next=tokens[index+1]||'';
  if(['i','you','we','they','he','she'].includes(prev)||next==='to'&&!['a','an','the'].includes(prev))return 'verb';
  if(['to','will','would','can','could','may','might','must','should','have','has','had'].includes(prev))return 'verb';
  if(['a','an','the','this','that','my','your','his','her','their'].includes(prev))return 'noun';
  if(['very','quite','too','so'].includes(prev))return 'adjective';
  if(['is','are','was','were','be','been'].includes(prev))return /ed$|ing$/.test(term)||irregularForms[term.toLowerCase()]?'verb':'adjective';
  return '';
}
function rankDefinition(d,input,preferredPos){
  let score=0;const context=new Set(englishTokens(input.sentence).map(stemWord).filter(t=>!stopwords.has(t)&&t!==stemWord(d.word)));
  const definition=new Set(englishTokens(d.en+' '+(d.example||'')).map(stemWord).filter(t=>!stopwords.has(t)));
  context.forEach(t=>{if(definition.has(t))score+=2});
  englishTokens(input.meaningHint||'').map(stemWord).filter(t=>!stopwords.has(t)).forEach(t=>{if(definition.has(t))score+=5});
  if(preferredPos&&d.pos===preferredPos)score+=7;
  if(input.chinese&&d.zh){const a=input.chinese.replace(/[\s；;，,。]/g,''),b=d.zh.replace(/[\s；;，,。]/g,'');if(b.includes(a)||a.includes(b))score+=12;else{for(let i=0;i<a.length-1;i++)if(b.includes(a.slice(i,i+2)))score+=4}}
  if(/^(obsolete|archaic|rare)|\b(obsolete|archaic)\b/i.test(d.en))score-=10;
  if(/^(simple past|past participle|plural of|alternative form|alternative spelling)/i.test(d.en))score-=6;
  return score;
}
async function dictionarySenses(term){
  const d=await getJSON('https://api.dictionaryapi.dev/api/v2/entries/en/'+encodeURIComponent(term));
  let result=[];for(const e of Array.isArray(d)?d:[])for(const m of e.meanings||[])for(const def of m.definitions||[]){if(def.definition)result.push({word:e.word||term,pos:m.partOfSpeech||'',en:def.definition,example:def.example||''})}
  return result.filter((r,i,a)=>a.findIndex(x=>x.en===r.en&&x.pos===r.pos)===i);
}
async function resolveTerm(input){
  if(input.english)return {term:input.english,matched:!input.sentence||englishTokens(input.sentence).some(t=>stemWord(t)===stemWord(input.english))};
  const translated=normalizeTerm(await translate(input.chinese.slice(0,150),'zh-CN','en')).toLowerCase();input.meaningHint=translated;
  if(!translated||/[\u3400-\u9fff]/.test(translated))throw Error('暂时没有找到对应英文，请补充一个英文单词后重试。');
  if(!input.sentence)return {term:translated,matched:false};
  const tokens=englishTokens(input.sentence),direct=tokens.find(t=>stemWord(t)===stemWord(translated));
  if(direct)return {term:direct,matched:true};
  // A synonym already in the provided sentence is a better target than an unrelated translation.
  try{const suggestions=await getJSON('https://api.datamuse.com/words?ml='+encodeURIComponent(translated)+'&max=30');
    const candidates=suggestions.map(x=>x.word.toLowerCase());
    const match=tokens.find(t=>!stopwords.has(t)&&candidates.some(c=>stemWord(c)===stemWord(t)));
    if(match)return {term:match,matched:true};
  }catch{}
  return {term:translated,matched:false};
}
function invalidateAutoEntry(){lookupVersion++;choiceVersion++;$('#lookupBtn').disabled=false;$('#saveWord').disabled=true;$('#entryResult').hidden=true;$('#alternativePanel').hidden=true;$('#lookupStatus').textContent='';$('#candidates').innerHTML=''}
$('#lookupInput').addEventListener('input',invalidateAutoEntry);$('#sourceSentence').addEventListener('input',invalidateAutoEntry);
$('#entry').addEventListener('close',()=>{lookupVersion++;choiceVersion++;$('#lookupBtn').disabled=false});
$('#lookupInput').onkeydown=e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();$('#lookupBtn').click()}};
function applyAutoDefinition(d,input,term){$('#word').value=term;$('#pos').value=d.pos;$('#en').value=d.en;$('#zh').value=input.chinese||d.zh||'';$('#sentence').value=input.sentence||d.example||'';$('#entryResult').hidden=false;$('#resultHeading').hidden=false;$('#saveWord').disabled=false}
$('#lookupBtn').onclick=async()=>{
  let input;try{input=parseEntryInput($('#lookupInput').value,$('#sourceSentence').value)}catch(e){$('#lookupStatus').textContent=e.message;return}
  if(input.english.length>150||input.chinese.length>500){$('#lookupStatus').textContent='请缩短输入：英文词组最多 150 个字符，中文释义最多 500 字。';return}
  const version=++lookupVersion;choiceVersion++;const current=()=>version===lookupVersion&&$('#entry').open;
  $('#lookupBtn').disabled=true;$('#saveWord').disabled=true;$('#entryResult').hidden=true;$('#candidates').innerHTML='';$('#alternativePanel').hidden=true;
  $('#lookupStatus').textContent='正在识别输入，查找词性和英文释义…';
  try{
    const resolved=await resolveTerm(input);if(!current())return;const term=resolved.term;
    let senses=[];
    const lemma=irregularForms[term.toLowerCase()]||term;
    try{senses=await dictionarySenses(lemma)}catch{if(lemma!==stemWord(term)){try{senses=await dictionarySenses(stemWord(term))}catch{}}}
    if(!current())return;
    if(!senses.length){
      $('#word').value=term;$('#pos').value='';$('#en').value='';$('#zh').value=input.chinese||await translate(term,'en','zh-CN');if(!current())return;$('#sentence').value=input.sentence;
      $('#entryResult').hidden=false;$('#saveWord').disabled=false;$('#lookupStatus').textContent='找到对应译词，但词典暂无词性或英文释义。已保留你的输入，请补充缺失内容后保存。';return;
    }
    if(input.english&&input.chinese){try{input.meaningHint=await translate(input.chinese.slice(0,150),'zh-CN','en')}catch{}}
    if(!current())return;
    const preferredPos=inferPartOfSpeech(term,input.sentence);
    senses=senses.map((d,index)=>({...d,index,score:rankDefinition(d,input,preferredPos)})).sort((a,b)=>b.score-a.score||a.index-b.index);
    const top=senses.slice(0,8);
    $('#lookupStatus').textContent='已识别词性，正在匹配词义并完善中文释义…';
    // Translation failures remain visible and editable instead of inventing a definition.
    if(!input.chinese){try{top[0].zh=await translate(top[0].en.slice(0,450),'en','zh-CN')}catch{}}
    if(!current())return;
    top.sort((a,b)=>b.score-a.score||a.index-b.index);
    if(!top[0].zh&&!input.chinese){try{top[0].zh=await translate(term,'en','zh-CN')}catch{}}
    if(!current())return;
    applyAutoDefinition(top[0],input,term);
    const contextNote=input.sentence?(resolved.matched?'已参考原句中的词形和上下文，自动推荐词性与释义。':input.english?'原句中未找到输入的词，已按词典推荐释义，请核对。':'已根据中文推荐英文；原句中未找到确定对应的词，请核对英文。'):'已自动补全词性和释义；未提供原句时，优先推荐常用词义。';
    $('#lookupStatus').textContent=contextNote+(input.chinese?'你填写的中文释义已保留。':'')+(!$('#zh').value?' 中文翻译暂不可用，请手动补充。':'')+' 可直接保存，或展开其他词义调整。';
    if(top.length>1){$('#alternativePanel').hidden=false;top.forEach((d,i)=>{const b=document.createElement('button');b.type='button';b.className='candidate';b.textContent=`${i===0?'✓ 推荐 · ':''}${d.pos} — ${d.en}${d.zh?' / '+d.zh:''}`;b.onclick=async()=>{const choice=++choiceVersion;applyAutoDefinition(d,input,term);if(!input.chinese&&!d.zh){b.disabled=true;try{const zh=await translate(d.en.slice(0,450),'en','zh-CN');if(!current()||choice!==choiceVersion)return;d.zh=zh;$('#zh').value=zh}catch{if(current()&&choice===choiceVersion)$('#lookupStatus').textContent='已更换词义，中文翻译暂不可用，请手动补充。'}finally{b.disabled=false}}};$('#candidates').append(b)})}
  }catch(e){if(current())$('#lookupStatus').textContent=e.name==='TimeoutError'?'查询超时，输入内容已保留。可以重试或切换手动整理。':'自动整理暂未完成：'+(e.message||'网络连接失败，请重试或使用手动整理。')}
  finally{if(version===lookupVersion)$('#lookupBtn').disabled=false}
};
