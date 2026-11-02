// Curated daily cards; selection follows the calendar date in Asia/Shanghai.
const DAILY_WORDS = [
  {
    "word": "serendipity",
    "pos": "noun",
    "zh": "意外发现美好事物的机缘",
    "en": "The chance discovery of something pleasant or valuable.",
    "sentence": "Finding this quiet bookshop was pure serendipity."
  },
  {
    "word": "endeavor",
    "pos": "noun",
    "zh": "努力；尝试",
    "en": "A serious effort to achieve a goal.",
    "sentence": "Learning a language is a rewarding endeavor."
  },
  {
    "word": "resilient",
    "pos": "adjective",
    "zh": "有韧性的；能恢复的",
    "en": "Able to recover after difficulties or change.",
    "sentence": "She remained resilient after the setback."
  },
  {
    "word": "nuance",
    "pos": "noun",
    "zh": "细微差别",
    "en": "A small difference in meaning, feeling, or expression.",
    "sentence": "The original sentence reveals a nuance of the word."
  },
  {
    "word": "discern",
    "pos": "verb",
    "zh": "辨别；察觉",
    "en": "To notice or recognize something that is not obvious.",
    "sentence": "We could discern a pattern in the results."
  },
  {
    "word": "coherent",
    "pos": "adjective",
    "zh": "连贯的；条理清楚的",
    "en": "Clear and logically connected.",
    "sentence": "Her essay presents a coherent argument."
  },
  {
    "word": "subtle",
    "pos": "adjective",
    "zh": "微妙的；不易察觉的",
    "en": "Not immediately obvious or easy to notice.",
    "sentence": "There is a subtle difference between the two claims."
  },
  {
    "word": "foster",
    "pos": "verb",
    "zh": "促进；培养",
    "en": "To encourage the growth or development of something.",
    "sentence": "The project aims to foster curiosity."
  },
  {
    "word": "compelling",
    "pos": "adjective",
    "zh": "有说服力的；引人入胜的",
    "en": "Powerful enough to hold attention or persuade someone.",
    "sentence": "The author gives a compelling reason for the change."
  },
  {
    "word": "scrutinize",
    "pos": "verb",
    "zh": "仔细检查；审视",
    "en": "To examine something very carefully.",
    "sentence": "Scientists scrutinize the evidence before drawing conclusions."
  },
  {
    "word": "ambiguous",
    "pos": "adjective",
    "zh": "含糊不清的；有歧义的",
    "en": "Having more than one possible meaning.",
    "sentence": "Without context, the sentence is ambiguous."
  },
  {
    "word": "tentative",
    "pos": "adjective",
    "zh": "暂定的；不确定的",
    "en": "Not yet certain or final.",
    "sentence": "We reached a tentative conclusion."
  },
  {
    "word": "plausible",
    "pos": "adjective",
    "zh": "看似合理的；可信的",
    "en": "Seeming reasonable or likely to be true.",
    "sentence": "The data support a plausible explanation."
  },
  {
    "word": "corroborate",
    "pos": "verb",
    "zh": "证实；佐证",
    "en": "To provide evidence that supports a statement.",
    "sentence": "A second experiment helped corroborate the finding."
  },
  {
    "word": "mitigate",
    "pos": "verb",
    "zh": "减轻；缓和",
    "en": "To make something harmful or unpleasant less severe.",
    "sentence": "The new design may mitigate the problem."
  },
  {
    "word": "elusive",
    "pos": "adjective",
    "zh": "难以找到或理解的",
    "en": "Difficult to find, catch, or understand.",
    "sentence": "A complete explanation remains elusive."
  },
  {
    "word": "meticulous",
    "pos": "adjective",
    "zh": "一丝不苟的；细致的",
    "en": "Showing great care and attention to detail.",
    "sentence": "She kept meticulous notes during the experiment."
  },
  {
    "word": "ubiquitous",
    "pos": "adjective",
    "zh": "无处不在的；普遍存在的",
    "en": "Present or found almost everywhere.",
    "sentence": "Digital devices have become ubiquitous."
  },
  {
    "word": "contemplate",
    "pos": "verb",
    "zh": "思考；仔细考虑",
    "en": "To think carefully about something.",
    "sentence": "Take a moment to contemplate the question."
  },
  {
    "word": "tenacious",
    "pos": "adjective",
    "zh": "坚韧的；坚持不懈的",
    "en": "Determined to continue despite difficulty.",
    "sentence": "The tenacious team kept searching for an answer."
  },
  {
    "word": "profound",
    "pos": "adjective",
    "zh": "深刻的；深远的",
    "en": "Very deep or having a strong and lasting effect.",
    "sentence": "The discovery had a profound effect on medicine."
  },
  {
    "word": "inherent",
    "pos": "adjective",
    "zh": "固有的；内在的",
    "en": "Existing as a natural part of something.",
    "sentence": "Every method has inherent limitations."
  },
  {
    "word": "empirical",
    "pos": "adjective",
    "zh": "以观察或实验为依据的",
    "en": "Based on observation or experiment.",
    "sentence": "The claim requires empirical evidence."
  },
  {
    "word": "synthesize",
    "pos": "verb",
    "zh": "综合；合成",
    "en": "To combine separate parts into a new whole.",
    "sentence": "The essay synthesizes ideas from several sources."
  },
  {
    "word": "articulate",
    "pos": "verb",
    "zh": "清晰表达",
    "en": "To express an idea clearly in words.",
    "sentence": "Try to articulate the main idea in one sentence."
  },
  {
    "word": "equivocal",
    "pos": "adjective",
    "zh": "含糊的；不明确的",
    "en": "Unclear or open to different interpretations.",
    "sentence": "The experiment produced equivocal results."
  },
  {
    "word": "juxtapose",
    "pos": "verb",
    "zh": "并置；并列比较",
    "en": "To place things side by side for comparison.",
    "sentence": "The writer juxtaposes two different perspectives."
  },
  {
    "word": "persevere",
    "pos": "verb",
    "zh": "坚持不懈",
    "en": "To keep trying despite difficulty.",
    "sentence": "Small goals helped him persevere."
  },
  {
    "word": "salient",
    "pos": "adjective",
    "zh": "显著的；突出的",
    "en": "Most noticeable or important.",
    "sentence": "Underline the salient points in the passage."
  },
  {
    "word": "insight",
    "pos": "noun",
    "zh": "洞察；深入理解",
    "en": "A clear or deep understanding of something.",
    "sentence": "The example offers insight into the process."
  }
];
function dailyDateKey(date=new Date()) {
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
  const value=type=>parts.find(p=>p.type===type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}
function dailyWord(date=new Date()) {
  const day=Math.floor(Date.parse(dailyDateKey(date)+'T00:00:00Z')/86400000);
  const epoch=Math.floor(Date.parse('2026-11-02T00:00:00Z')/86400000);
  return DAILY_WORDS[((day-epoch)%DAILY_WORDS.length+DAILY_WORDS.length)%DAILY_WORDS.length];
}
