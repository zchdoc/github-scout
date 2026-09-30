---
repo: vercel-labs/agent-browser
url: https://github.com/vercel-labs/agent-browser
date: 2026-09-29
platform: x
verification: 已实机运行（macOS Apple Silicon，agent-browser 0.38.1，2026-09-30）
---

## 配图（X 一条最多 4 张，按这个顺序上传）

图片都在 `data/articals/assets/2026-09/29-agent-browser/`。

| 顺序 | 文件 | 为什么放 | 替代文本（X 上传时点「添加描述」填） |
|------|------|----------|------------------------------------|
| 1 | `04-annotated.png` | 首图。一眼看懂「页面元素都有编号」，不用读字 | agent-browser 对 GitHub 仓库页做的带编号截图，每个可点元素标了红色数字，Issues 是 27 |
| 2 | `06-click.png` | 证明按编号真的能点：左边命令，右边已经跳到 Issues 页 | 左边终端执行 click @e23、wait --url、get url，右边浏览器已经打开 Issues 页 |
| 3 | `03-snapshot.png` | 让读者看到模型实际拿到的是什么：一行行带 ref 的元素 | 终端里 snapshot -i 的输出，每个链接和按钮后面带 ref=e 编号 |
| 4 | `08-system-chrome.png` | 对应「已有 Chrome 能直接用」：用自己的 Chrome 打开，没有测试版提示条 | 用 --executable-path 指向本机 Google Chrome 打开仓库页 |

备用：`02-headed.png`（Chrome for Testing 窗口，顶部有「Chrome 测试版」提示条，可以和图 4 对比）、`01-doctor.png`（自检 10 pass）。

发之前检查：终端里的 `/Users/zch` 路径要不要打码；右边浏览器里的翻译弹窗是 Chrome 自带的，不影响内容。

## A. 长帖主稿（需要 X Premium）

让 Cursor、Claude Code 去点网页，常见做法是把整页 HTML 塞给它，或者让它自己写选择器。页面一长上下文就满了，网站一改版又点空。

分享一个实用的 AI 开源工具 agent-browser，它让 AI 代理按页面上的按钮和输入框操作浏览器。它先给页面拍一张快照，能点的元素都带编号，代理只要说点 @e2。

编号来自 Chrome 的无障碍树，就是浏览器按按钮、输入框、链接整理出来的页面结构。模型不用写选择器，只从快照里挑编号。

GitHub：github.com/vercel-labs/agent-browser

我在 Mac 上试了一下。打开它自己的 GitHub 仓库页，snapshot -i 给了 945 个编号，Issues 是 @e27，执行 click @e27 就进了 Issues 页。图一是 screenshot --annotate 截的，红框里的数字就是编号。

有两个地方要注意。一是编号跟着页面走，我把窗口缩窄后，Issues 变成了 @e23，所以每次操作前都要重新快照。二是 GitHub 用前端换页，click 返回完成时地址还没变，要先 wait --url "**/issues" 再往下走。

安装是 npm install -g agent-browser，然后跑 agent-browser doctor 自检。电脑上有 Chrome 或 Brave 就不用再装浏览器，都没有才执行 agent-browser install。我这台机器上还有一份它下载的 Chrome for Testing，它会优先用；想用自己的 Chrome，加 --executable-path 指过去就行。国内网络记得加 --proxy，我不加时连 example.com 都打不开。

它是 Vercel Labs 用 Rust 写的，不需要 Node.js 和 Playwright。执行 npx skills add vercel-labs/agent-browser，Claude Code、Codex、Cursor 就能读到用法。适合让编码代理看文档站和后台；要写带断言的测试报告，还是 Playwright 更合适。版本更新快，写进长期脚本前记得锁版本。

## B. 串推版（免费账号用，括号里是这一条配的图）

1.（图：04-annotated.png）
让编码代理去点网页，常见做法是把整页 HTML 塞给它，或者让它自己写选择器。分享一个实用的 AI 开源工具 agent-browser，它让代理先拍快照，再按 @e2 这种编号点击和填写。

2.（图：03-snapshot.png）
编号来自 Chrome 的无障碍树，也就是浏览器按按钮、输入框、链接整理出来的结构。我在 Mac 上试了它自己的 GitHub 仓库页，snapshot -i 给了 945 个编号，Issues 是 @e27。

3.（图：06-click.png）
click @e27 就进了 Issues 页。两个坑：窗口缩窄后 Issues 变成了 @e23，编号跟着页面走，每次都要重新快照；GitHub 是前端换页，点完要 wait --url 再查地址。

4.
安装：npm install -g agent-browser，再跑 agent-browser doctor 自检。电脑上有 Chrome 或 Brave 就不用再装浏览器，都没有才执行 agent-browser install。国内网络记得加 --proxy。

5.（图：08-system-chrome.png）
我这台机器上有一份它下载的 Chrome for Testing，默认优先用它。想用自己的 Chrome，加 --executable-path 指过去，窗口顶部就没有「测试版」提示条了。

6.
执行 npx skills add vercel-labs/agent-browser，Claude Code、Codex、Cursor 就能读到用法。适合让代理看文档站和后台，写测试报告还是用 Playwright。
GitHub：github.com/vercel-labs/agent-browser

## C. 英文速递卡（可选，配图用 04-annotated.png）

⭐ agent-browser

Browser automation CLI for AI agents. It snapshots the page into refs like @e2, so an agent can click and fill by ref instead of writing selectors.

Total: 43,365 ⭐ (as of 2026-09-30)

https://github.com/vercel-labs/agent-browser

## 实测记录

命令、原始输出和完整记录表在 `data/articals/notes/2026-09/29-agent-browser.md` 的「实测结果」一节。帖子里的数字都来自那次运行：945 个编号、@e27 和 @e23、不加代理时 `net::ERR_CONNECTION_CLOSED`、点击后要 `wait --url`。
