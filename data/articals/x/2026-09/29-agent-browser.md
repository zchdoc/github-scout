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

怎么跑起来，看你电脑上已经有什么：

1. 已经装了 Chrome 或 Brave，或者用 Playwright、Puppeteer 下载过浏览器：npm install -g agent-browser 就够了，它会自己找到，不用再装 Chrome。

2. 电脑上没有这类浏览器：再执行一次 agent-browser install，下载 Chrome for Testing。Linux 服务器改用 agent-browser install --with-deps，顺带装系统库。

3. 想让它带着你平时的登录状态：加 --profile Default。它把你的 Chrome 资料复制一份再用，不改原资料。Windows 上要先关掉 Chrome。

装完先跑 agent-browser doctor，它会检查浏览器并试着启动一次。然后 open 一个网址，snapshot -i 看编号。它默认开的是无界面的临时浏览器，不碰你平时的登录；想亲眼看它点网页，就加 --headed。以上按 README 和源码整理，我还没在本机跑过。

再执行 npx skills add vercel-labs/agent-browser，Claude Code、Codex、Cursor 这类代理就能读到用法，也能用 agent-browser mcp 接成 MCP 服务。自然语言的 chat 命令要另配 AI Gateway 密钥，普通命令不用。

它适合让编码代理去看文档站和后台。要写带断言的测试报告，还是 Playwright 更合适。版本更新很快，写进长期脚本前记得锁版本。

配图（最多 4 张，按顺序）：

1. 带编号的页面截图：`screenshot --annotate` 的结果，页面上每个可点元素都标了号。做首图最直观。等你实测后再放
2. snapshot -i 的终端输出，能看到 [ref=e1] 这种编号。等你实测后再放；没跑之前可以先用 README 里的示例，配一句「这是文档示例」
3. 用 --headed 打开时弹出的浏览器窗口和终端并排，说明它真的在操作浏览器
4. README 首屏，露出项目名和 “Browser automation CLI for AI agents”

## B. 串推版（免费账号用）

1.
让编码代理去点网页，常见做法是把整页 HTML 塞给它，或者让它自己写选择器。分享一个实用的 AI 开源工具 agent-browser，它让代理先拍快照，再按 @e2 这种编号点击和填写。

2.
编号来自 Chrome 的无障碍树，也就是浏览器按按钮、输入框、链接整理出来的结构。模型只从快照里挑编号。点的位置被弹窗挡住时，命令会直接失败，并告诉你挡住它的是谁。

3.
它是 Vercel Labs 用 Rust 写的，常驻后台进程直连 Chrome，文档写明不需要 Node.js 和 Playwright。0.38 加了 snapshot --delta 和 screenshot --if-changed，都是为了少占上下文。

4.
怎么装，看你电脑上有什么。装过 Chrome、Brave，或用 Playwright、Puppeteer 下载过浏览器：npm install -g agent-browser 就够，它会自己找到。都没有：再跑 agent-browser install。Linux 服务器加 --with-deps。

5.
想带上平时的登录状态，加 --profile Default，它复制一份资料再用。装完先 agent-browser doctor 自检，再 open 网址、snapshot -i 看编号。默认是无界面的临时浏览器，加 --headed 能看它点。

6.
执行 npx skills add vercel-labs/agent-browser，Claude Code、Codex、Cursor 就能读到用法。适合让代理看文档站和后台，写测试报告还是用 Playwright。以上按文档整理，我还没实测。
GitHub：github.com/vercel-labs/agent-browser

## C. 英文速递卡（可选）

⭐ agent-browser

Browser automation CLI for AI agents. It snapshots the page into refs like @e2, so an agent can click and fill by ref instead of writing selectors.

Total: 43,365 ⭐ (as of 2026-09-30)

https://github.com/vercel-labs/agent-browser

## D. 实测清单（你自己跑，跑完再改帖子）

先确认你属于哪种情况：Mac 看「应用程序」里有没有 Google Chrome、Chrome Canary、Chromium 或 Brave；Windows 看有没有 Chrome 或 Brave；Linux 执行 `which google-chrome chromium brave-browser`。源码的查找顺序是：先找 `agent-browser install` 下载的 Chrome，再找系统浏览器，最后找 Puppeteer 和 Playwright 的缓存。Windows 上的 Chromium 不在自动查找范围内，要用 `--executable-path` 指定。

按顺序执行，每步后面是要截的图：

```bash
npm install -g agent-browser
# 已有浏览器就跳过下面这行
agent-browser install

agent-browser doctor
# 截图 1：doctor 的检查结果。注意打码用户名路径

agent-browser open https://github.com/vercel-labs/agent-browser --headed
# 截图 2：弹出的浏览器窗口和终端并排

agent-browser snapshot -i
# 截图 3：带 [ref=eN] 的输出，挑一段能看清按钮和链接的

agent-browser screenshot --annotate annotated.png
# 截图 4：annotated.png 本身，适合做首图

agent-browser click @eN        # 换成快照里 Issues 或 Releases 链接的编号
agent-browser get url
# 截图 5：点完之后的地址，证明它按编号点对了

agent-browser close
```

想试接入代理的话，在项目里执行 `npx skills add vercel-labs/agent-browser`，再对 Claude Code 或 Cursor 说「用 agent-browser 打开这个仓库，告诉我最新 release 的版本号」。截图 6 截代理的对话过程。

跑的时候顺手记下这几件事，改帖子要用：

- 你是哪种情况：已有 Chrome 直接用，还是下载了 Chrome for Testing
- 系统和 agent-browser 版本
- doctor 有没有报错，报了什么
- 快照一共给了多少个编号，大概多长
- 有没有点不准或卡住的地方

跑完后，把长帖里「以上按 README 和源码整理，我还没在本机跑过」这一句换成真实经历，比如：

「我在 {系统} 上试了一下。本机{已经有 Chrome，装完没下载浏览器 / 没有 Chrome，install 下载了一个}，doctor {通过 / 报了 xxx}。打开这个仓库页，snapshot -i 给了 {N} 个编号，我让它点 @e{N} 进了 {页面}。{遇到的问题，没有就不写}」

花括号里只填你真实看到的。同时把文件开头的 `verification` 改成「已实机运行」，串推版第 6 条的「我还没实测」也一起改掉。
