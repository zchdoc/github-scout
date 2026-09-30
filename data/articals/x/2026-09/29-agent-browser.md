---
repo: vercel-labs/agent-browser
url: https://github.com/vercel-labs/agent-browser
date: 2026-09-29
platform: x
verification: 未实机运行
---

## A. 长帖主稿（需要 X Premium）

让 Cursor、Claude Code 去点网页，常见做法是把整页 HTML 塞给它，或者让它自己写选择器。页面一长上下文就满了，网站一改版又点空。

分享一个实用的 AI 开源工具 agent-browser，它让 AI 代理按页面上的按钮和输入框操作浏览器。它先给页面拍一张快照，能点的元素都带编号，代理只要说点 @e2。

编号来自 Chrome 的无障碍树，就是浏览器按按钮、输入框、链接整理出来的页面结构。模型不写选择器，只从快照里挑编号。要点的位置被弹窗挡住时，命令会直接失败，并告诉你挡住它的是哪个元素。

GitHub：github.com/vercel-labs/agent-browser

它是 Vercel Labs 用 Rust 写的，第一条命令会拉起一个常驻后台进程，直连 Chrome 的调试接口。文档写明不需要 Node.js，也不需要 Playwright。0.38 的更新记录里还加了 snapshot --delta，只回传页面变化；screenshot --if-changed 会跳过没变的截图，都是为了少占上下文。

装好后执行 npx skills add vercel-labs/agent-browser，Claude Code、Codex、Cursor 这类代理就能读到用法，也能用 agent-browser mcp 接成 MCP 服务。自然语言的 chat 命令要另配 AI Gateway 密钥，普通命令不用。

我没在本机跑过。按文档，最短是 npm install -g agent-browser，再 agent-browser install 下载 Chrome，然后 open 一个网址、snapshot -i 看编号。

它适合让编码代理去看文档站和后台。要写带断言的测试报告，还是 Playwright 更合适。版本更新很快，写进长期脚本前记得锁版本。

配图：

1. README 首屏，露出项目名和 “Browser automation CLI for AI agents”
2. README 里 snapshot 输出带 [ref=e1] 的那段示例，配一句「这是文档示例」
3. 你自己跑出来的 snapshot -i 终端截图。跑之前不要放这一张

## B. 串推版（免费账号用）

1.
让编码代理去点网页，常见做法是把整页 HTML 塞给它，或者让它自己写选择器。分享一个实用的 AI 开源工具 agent-browser，它让代理先拍快照，再按 @e2 这种编号点击和填写。

2.
编号来自 Chrome 的无障碍树，也就是浏览器按按钮、输入框、链接整理出来的结构。模型只从快照里挑编号。点的位置被弹窗挡住时，命令会直接失败，并告诉你挡住它的是谁。

3.
它是 Vercel Labs 用 Rust 写的，常驻后台进程直连 Chrome，文档写明不需要 Node.js 和 Playwright。0.38 加了 snapshot --delta 和 screenshot --if-changed，都是为了少占上下文。

4.
执行 npx skills add vercel-labs/agent-browser，Claude Code、Codex、Cursor 就能读到用法，也能用 agent-browser mcp 接成 MCP 服务。chat 命令要另配 AI Gateway 密钥，普通命令不用。

5.
我没在本机跑过。按文档：npm install -g agent-browser，再 agent-browser install，然后 open、snapshot -i。适合让代理看文档站和后台，写测试报告还是用 Playwright。
GitHub：github.com/vercel-labs/agent-browser

## C. 英文速递卡（可选）

⭐ agent-browser

Browser automation CLI for AI agents. It snapshots the page into refs like @e2, so an agent can click and fill by ref instead of writing selectors.

Total: 43,365 ⭐ (as of 2026-09-30)

https://github.com/vercel-labs/agent-browser
