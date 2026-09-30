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

适合已经在用 Cursor、Claude Code 这类编码代理，并且经常要打开文档站或后台的人。要写带断言的自动化测试报告，它不合适。机器装不了 Chrome，或者网页强依赖验证码，也先别指望它。

我这次没在本机跑。按文档和源码，最短是这几步：

1. `npm install -g agent-browser`
2. `agent-browser doctor`，看它有没有找到浏览器
3. `agent-browser open https://example.com`
4. `agent-browser snapshot -i`
5. 看到带 ref 的列表后，再截一张图，然后 `close`

电脑上已经有 Chrome、Brave，或者 Playwright、Puppeteer 下载过的浏览器，它会自己找到，不用再装。一个都没有，第 2 步之后补一句 `agent-browser install`，下载一份 Chrome。Linux 服务器用 `agent-browser install --with-deps`，顺带装系统库。

它默认开的是看不见窗口的临时浏览器，不碰你平时的登录。想看它点网页，open 后面加 `--headed`。

怎样算成功：snapshot 打出带编号的元素，截图文件出现。

浏览器会留在后台进程里，所以打开和快照可以分成两次命令。点击被弹窗挡住时，文档说命令会失败，并告诉你挡住的是谁。先关掉那一层，再重新快照，旧编号不要接着用。

马上能用的一种方式：让编码代理走「打开、快照、按编号点击、再快照」。登录密码不要写进提示词，文档给的办法是把密码存进本机凭证库。

自然语言的 chat 命令要另外配置 AI Gateway 密钥。不配这个密钥，上面的打开和快照也能用。

值不值得试：代理经常要看真实网页，就值得先走通这几步。版本更新很快，写进长期脚本前先锁定版本。仓库是 Apache-2.0，地址放在配图最后一页。

#AI开源 #GitHub #浏览器自动化 #编码代理 #开发者工具 #开源工具 #Cursor #ClaudeCode #编程效率 #Chrome

---

配图：

1. 封面：项目名 agent-browser，一句「让 AI 按编号点网页」
2. 无障碍树示意：按钮、输入框旁边标 @e1、@e2
3. 五步命令，从 npm 安装到 snapshot，旁边标一句「已有 Chrome 不用再装」
4. 你自己跑出来的截图。`screenshot --annotate` 生成的带编号页面最直观，其次是 snapshot -i 的终端输出。撰写时没有截图，不要用生成图冒充
5. 「适合编码代理 / 不适合写测试套件」两列
6. 被弹窗挡住时要重新快照
7. 仓库地址和 Apache-2.0
