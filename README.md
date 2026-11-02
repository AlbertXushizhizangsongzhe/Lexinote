# 拾词 Lexinote 网站源码

本压缩包包含最新版完整网页文件，已包含北京时间每日更新的灵感词卡。

## 上传 GitHub

1. 解压本 ZIP。
2. 在 GitHub 新建 Public 仓库，例如 lexinote。
3. 点击 Add file → Upload files，上传解压后的所有文件。
4. 确认 index.html 位于仓库根目录，不要只上传 ZIP 或套一层文件夹。
5. 在 Settings → Pages 选择 Deploy from a branch、main、/(root)，点击 Save。
6. 发布后从 Pages 页面打开网站网址。

无需安装依赖或编译。请使用以上分支发布方式。

## 文件

index.html：网页入口
style.css：样式
app.js：单词本、本地存储、复习及自测
lookup.js：在线查词、翻译与语境辅助匹配
daily.js：每日词卡（30 个精选词循环，北京时间零点切换）

## 保存与查询

词库保存在当前浏览器 localStorage，不随代码上传，不跨设备同步。同一设备的同一浏览器配置会共用词库。清除网站数据可能丢失词库，请定期导出备份。迁移到新网址时，应从旧网址导出后在新网址导入。

在线补全依赖 Free Dictionary API、MyMemory 和必要时的 Datamuse，查询内容会发送到对应服务。结果需自行核对，服务不可用时可手动整理。
