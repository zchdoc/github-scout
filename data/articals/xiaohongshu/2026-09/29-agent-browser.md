---
repo: vercel-labs/agent-browser
url: https://github.com/vercel-labs/agent-browser
date: 2026-09-29
platform: xiaohongshu
verification: 未实机运行
---

封面标题：

- 让代理按编号点击网页按钮
- 五步跑通 AI 浏览器命令
- 编码代理也能点击网页了

---

分享一个实用的 AI 开源工具 agent-browser，你可以用它让 AI 代理按页面元素操作浏览器。

它是一条命令行。代理先对页面打一张无障碍树快照。无障碍树就是浏览器按按钮、输入框、链接整理出来的结构。这些元素会带上 @e1、@e2 这种编号，然后再去点击和填写。这样不用把整页 HTML 塞进对话。

适合已经在用 Cursor、Claude Code 这类编码代理，并且经常要打开文档站或后台的人。你要写带断言的自动化测试报告，它不是那条路。机器装不了 Chrome，或者网页强依赖验证码，也先别指望它。

我这次没在本机跑。按文档，最短是这几步：

1. `npm install -g agent-browser`
2. `agent-browser install`
3. `agent-browser open https://example.com`
4. `agent-browser snapshot -i`
5. 看到带 ref 的列表后，再截一张图，然后 `close`

怎样算成功：snapshot 打出带编号的元素，截图文件出现。install 会下载一份 Chrome。Linux 缺依赖时，文档写的是 `agent-browser install --with-deps`。

浏览器会留在后台进程里，所以打开和快照可以分成两次命令。点击被弹窗挡住时，文档说命令会失败，并告诉你挡住的是谁。先关掉那一层，再重新快照，旧编号不要接着用。

马上能用的一种方式：让编码代理走「打开、快照、按编号点击、再快照」。登录密码不要写进提示词，文档给的办法是把密码存进本机凭证库。

自然语言的 chat 命令要另外配置 AI Gateway 密钥。不配这个密钥，上面的打开和快照也能用。

值不值得试：代理经常要看真实网页，就值得先走通这几步。版本更新很快，写进长期脚本前先锁定版本。仓库是 Apache-2.0，地址放在配图最后一页。

#AI开源 #GitHub #浏览器自动化 #编码代理 #开发者工具 #开源工具 #Cursor #ClaudeCode #编程效率 #Chrome

---

配图：

1. 封面：项目名 agent-browser，一句「让 AI 按编号点网页」
2. 无障碍树示意：按钮、输入框旁边标 @e1、@e2
3. 五步命令，从 install 到 snapshot
4. 一张你自己跑出来的 example.com 截图。撰写时没有截图，不要用生成图冒充
5. 「适合编码代理 / 不适合写测试套件」两列
6. 被弹窗挡住时要重新快照
7. 仓库地址和 Apache-2.0
