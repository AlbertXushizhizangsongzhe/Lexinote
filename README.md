# 拾词 Lexinote

把阅读中遇见的生词，变成可以反复复习的个人词卡。

**项目发起、产品设计与维护：陈泓旭 Albert**  
GitHub 账号：AlbertXushizhizangsongzhe  
项目仓库：https://github.com/AlbertXushizhizangsongzhe/Lexinote  
开发过程使用 AI 辅助实现。

## 功能

粘贴英文单词或中文释义，自动查询并整理词性及中英文释义，可选英文原句。支持分类、搜索、编辑、翻卡复习、英文释义自测、未掌握词重练及 JSON 导入导出。每日灵感词卡按北京时间零点切换，当前 30 个精选词循环展示。

## 更新现有 GitHub 仓库

1. 解压源码包，进入现有 Lexinote 仓库的首页。
2. 点击 Add file → Upload files，将本包中的文件直接上传到仓库根目录。
3. 同一路径的同名文件会被更新，不需要先删除旧文件；不要改名，也不要只上传 ZIP。
4. 选择 Commit directly to the main branch，点击 Commit changes。
5. 本次实际修改了 index.html、style.css 和 README.md；也可以只上传这三个文件。

## 开启公开网站

这是仓库设置中的 Pages，不是个人账号 Settings 中的域名验证页面。

1. 打开 Lexinote 仓库，在仓库顶部点击 Settings。
2. 左侧选择 Pages。
3. Source 选择 Deploy from a branch。
4. Branch 选择 main，文件夹选择 /(root)，点击 Save。
5. 部署完成后，从 Pages 页面查看并打开公开网址。

不需要添加自定义域名，也不需要安装依赖或构建。

## 数据与查询

词库保存在访问者当前浏览器 localStorage，不上传到项目数据库，也不随代码上传到 GitHub；没有跨设备同步。同一设备的同一浏览器配置会共用词库。请定期导出备份；切换网址时需从旧网址导出，再在新网址导入。

在线补全使用 Free Dictionary API、MyMemory 和必要时的 Datamuse，查询内容会发往对应服务。采用在线词典、翻译及简单规则匹配，并非 AI 大模型，推荐释义需自行确认。

## 项目记录

请通过上述仓库查看维护者和提交历史。署名用于说明项目来源，不构成防复制技术措施。本说明不额外授予代码复用许可；第三方服务及内容遵循各自条款。
