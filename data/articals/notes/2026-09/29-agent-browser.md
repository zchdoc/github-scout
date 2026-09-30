---
repo: vercel-labs/agent-browser
url: https://github.com/vercel-labs/agent-browser
date: 2026-09-29
type: 作者核对卡与发布辅助（不发布）
researched: 2026-09-30
verification: 未实机运行
---

## 作者核对卡

**一句话：** agent-browser 是给 AI 代理用的浏览器命令行。代理先拿无障碍树编号，再对 Chrome 做点击、填写和截图。

**速览（2026-09-30 的 GitHub API / 仓库页面）：**

| 项 | 内容 |
|---|---|
| 名称 | agent-browser，组织 vercel-labs |
| 语言 | Rust；npm 包用 Node 脚本启动对应二进制 |
| License | Apache-2.0 |
| Star / Fork | 43365 / 2924 |
| 打开的 issue / PR | 搜索结果为 403 个 issue、424 个 PR。仓库的 `open_issues_count` 是 827，这个数把 PR 算进去了 |
| 最新 Release | v0.38.1，2026-09-16；`package.json` 同为 0.38.1 |
| main 最近提交 | 2026-09-22，`d01253d9`，Browser Use Cloud 会话清理 |
| 仓库 `pushed_at` | 2026-09-29。main 上看到的最新提交仍是 9 月 22 日，这个时间可能来自其他分支 |
| 创建时间 | 2026-01-11 |
| 活跃度 | 9 月仍有 0.35 到 0.38 的发布，未归档 |

**读过的文件：** `README.md`、`package.json`、`pnpm-workspace.yaml`、`AGENTS.md`、`CHANGELOG.md` 开头、`bin/agent-browser.js`、`cli/Cargo.toml`、`cli/src/main.rs`、`cli/src/connection.rs`、`cli/src/chat.rs`、`cli/src/native/mod.rs`、`cli/src/native/daemon.rs`、`cli/src/native/snapshot.rs`、`cli/src/native/stream/chat.rs`。`cli/src/native/actions.rs` 约 680KB，只确认了守护进程会调用其中的 `execute_command`，没有逐行读完。`cdp` 目录没有逐文件读。

**主链路：** `main` → `parse_command` → `ensure_daemon`（设置 `AGENT_BROWSER_DAEMON=1`）→ `run_daemon` / `handle_connection` → `execute_command` → CDP。快照在 `take_snapshot` 里调用 `Accessibility.getFullAXTree`，编号为 `e1`、`e2`。

### 仓库事实

- 守护进程是 Rust，文档写明不需要 Node.js 和 Playwright。
- `chat` 没有 `AI_GATEWAY_API_KEY` 会直接退出。默认模型 `anthropic/claude-sonnet-4.6`，默认网关 `https://ai-gateway.vercel.sh`。
- 域名白名单、动作确认默认关闭；白名单与复用 Chrome 配置、恢复登录态、连接已有浏览器不能同时用。
- 默认空闲退出约 1 小时；有界面的浏览器和用户已经连上的浏览器不走这个默认。
- 找浏览器的顺序（`cli/src/native/cdp/chrome.rs` 的 `find_chrome`）：`agent-browser install` 下载的 Chrome → 系统 Chrome、Brave（Mac 另有 Canary、Chromium，Linux 另有 Chromium；Windows 只认 Chrome 和 Brave）→ Puppeteer、Playwright 缓存。已有浏览器就不必执行 `install`。
- 不带 `--profile` 时，每次用临时 `--user-data-dir` 启动无头浏览器；`--profile <名字>` 会把 Chrome 资料复制到临时目录再用。

### 我的推断

- 和 Playwright 的差别是使用方式：一个在代码里维护流程，一个把浏览器留在守护进程里、让代理按编号操作。没有做速度或稳定性对比。
- 「编号比整页 HTML 更省上下文」是从快照设计推出来的，不是实测 token 数。

### 未能确认

- 任何本机运行结果，包括 example.com 的真实快照。
- npm 页面上的当前版本。
- issue #37、#132、#1371、#2010、#2011 在 v0.38.1 上是否仍能复现。
- README 里 Browser Use 的 star 数，没有去那个仓库复核。

**命令来源：** 安装、`open`、`snapshot`、`screenshot`、`install --with-deps`、`doctor`、`dashboard`、`chat` 均来自 README。没有自造命令。

### 发布前清单

必须核对：

- 再看一眼 Star 和最新 Release。
- 在本机执行 `npm install -g agent-browser` 和 `agent-browser doctor`，看它是否用上了已有的 Chrome（没有才执行 `agent-browser install`），再对 `https://example.com` 做 `snapshot -i` 和截图，确认退出码与文件。

建议核对：

- 配图若用仪表盘，先跑 `agent-browser dashboard start`（有打开的 issue #2010）。
- 不要先加 `doctor --fix`。

## 发布辅助

1. 开头用了「实用」和「AI 开源工具」。仓库定位就是给 AI 代理的浏览器命令行，核心能力是点击和填写，所以用「实用」，不用「创新」。
2. 推荐语：让编码代理按页面编号操作浏览器，先走通快照再谈聊天。
3. 知乎摘要：agent-browser 是一条给 AI 代理用的浏览器命令行。它用无障碍树给按钮和输入框编号，代理按编号点击，不必把整页 HTML 塞进上下文。这篇按源码和文档说明它怎么工作、最短怎么跑，以及什么时候该改用 Playwright。我没有在本机跑过。
4. 知乎话题：浏览器自动化、AI 编程、GitHub。
5. 配图：封面只放项目名和「按编号操作网页」；原理图用命令到 CDP 的流程；运行图等你自己截到 `snapshot -i` 和截图文件后再放；代码图截 `cli/src/native/snapshot.rs` 里分配 `e{编号}` 的那一段。
6. 三端侧重点：X 强调「代理靠整页 HTML 和选择器点网页」这个麻烦，以及快照编号给出的结果；小红书强调五步体验；知乎强调编号怎么从无障碍树来，以及默认没跑过。
7. X 长帖需要 Premium。没有 Premium 就发串推版。英文速递卡里的 Star 数是 2026-09-30 的查询值，发之前更新。
8. 不需要改成谨慎评测。文档和源码对得上，局限写在判断里即可。仪表盘那张图在复现 #2010 之前先不要用。
