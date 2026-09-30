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

## 实测步骤（你来操作）

### 你电脑上现在的状态（2026-09-30 10:12 查的）

- agent-browser 0.38.1，装在 `~/.nvm/versions/node/v24.13.0/bin/agent-browser`。
- `doctor --offline --quick` 结果：8 pass，0 warn，0 fail。
- `/Applications/Google Chrome.app` 存在。
- `~/.agent-browser/browsers/` 里已经有一份 Chrome for Testing 154.0.8037.92（约 360 MB，10:01 下载）。它排在查找顺序第一位，所以默认会用它，而不是你自己的 Chrome。npm 的安装脚本只检查 Chrome、不会下载，doctor 两次运行（10:04、10:10）都在下载之后，所以这份很可能是执行过一次 `agent-browser install` 留下的。写帖子时如实写「我电脑上有 Chrome，但也下载了一份 Chrome for Testing」，或者按第 8 步单独验证用自己的 Chrome。

### 截图怎么截（macOS）

- 截整个窗口：`Cmd + Shift + 4`，按一下空格，点要截的窗口。
- 截一块区域：`Cmd + Shift + 4`，拖出范围。
- 截图默认存在桌面。截完拖进下面的截图目录，按表里的文件名改名。
- 终端路径里的 `/Users/zch` 介意的话发之前打码。

### 第 0 步：准备

在 macOS 自带的「终端」或 iTerm 里执行（不要在 Cursor 里跑 `npm run dev` 的那个终端）：

```bash
cd ~/Documents/code/github-scout
SHOTS=data/articals/assets/2026-09/29-agent-browser
mkdir -p "$SHOTS"
agent-browser close --all
```

最后一行是保险：确保没有旧的后台浏览器。`--headed`、`--proxy`、`--executable-path` 这类启动参数只在浏览器启动时生效，后台已经有浏览器时加了也没用。

GitHub 打不开的话，所有 `open` 命令都加 `--proxy http://127.0.0.1:10809`。它也会自动读取 `ALL_PROXY`、`HTTPS_PROXY` 环境变量，你之前 `export all_proxy=...` 过的话可以不加。

### 第 1 步：doctor 截图

```bash
agent-browser doctor
```

截图：`01-doctor.png`，截终端，露出 Chrome 那一栏和最后的 Summary。

### 第 2 步：打开项目页，让浏览器窗口显示出来

```bash
agent-browser open https://github.com/vercel-labs/agent-browser --headed
```

会弹出一个 Chrome 窗口。把终端和这个窗口左右摆好。

截图：`02-headed.png`，截屏幕上终端和浏览器窗口并排的那一块。

### 第 3 步：拍快照，看编号

```bash
agent-browser snapshot -i
agent-browser snapshot -i > "$SHOTS/snapshot.txt"
grep -c "ref=" "$SHOTS/snapshot.txt"
```

第一行在终端打出带 `[ref=e1]` 的列表；第二行把同样的内容存成文件；第三行数一共多少个编号，记到下面的记录表。

截图：`03-snapshot.png`，截终端里一段能看清按钮、链接名字和 `[ref=eN]` 的输出，不用截全。

### 第 4 步：带编号的页面截图（适合做首图）

```bash
agent-browser screenshot --annotate "$SHOTS/04-annotated.png"
agent-browser screenshot "$SHOTS/05-page.png"
```

这两张是命令直接生成的文件，不用你手动截。`04-annotated.png` 上每个可点元素都标了 `[N]`，对应快照里的 `@eN`，终端也会打出对照表。

截图（可选）：`04-annotated-legend.png`，截终端里 `--annotate` 打出的对照表。

### 第 5 步：按编号点一下

先找到 Issues 链接的编号：

```bash
grep -i "issues" "$SHOTS/snapshot.txt"
```

输出里会有类似 `link "Issues 403" [ref=e27]` 的一行（编号和数字以你看到的为准）。把下面的 `e27` 换成你看到的编号：

```bash
agent-browser click @e27
agent-browser get url
```

浏览器窗口应当跳到 Issues 页，`get url` 打出 `https://github.com/vercel-labs/agent-browser/issues`。

截图：`06-click.png`，终端（露出 click 和 get url 两行）和已经跳到 Issues 页的浏览器窗口并排。

点完页面变了，旧编号作废。要继续点，先重新 `agent-browser snapshot -i`。

### 第 6 步：关掉

```bash
agent-browser close
```

### 第 7 步（可选）：让编码代理自己用它

```bash
npx skills add vercel-labs/agent-browser
```

这会把 agent-browser 的技能装进当前项目（和 humanizer-zh-next 同一个位置）。装完在 Cursor 或 Claude Code 里新开一个对话，发：

```text
用 agent-browser 打开 https://github.com/vercel-labs/agent-browser/releases，告诉我最新 release 的版本号和发布日期。
```

截图：`07-agent.png`，截对话里代理执行 `agent-browser` 命令和给出答案的部分。

### 第 8 步（可选）：验证「已经有 Chrome 就能用」

你电脑上有 Chrome for Testing，默认不会用到你自己的 Chrome。想证明帖子里「已有 Chrome 不用再装」这句，手动指定一次：

```bash
agent-browser close --all
agent-browser --executable-path "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" open https://example.com --headed
agent-browser get title
agent-browser close
```

弹出的窗口应当是你平时的 Google Chrome 图标（不是带 “for Testing” 字样的那个），`get title` 打出 `Example Domain`。

截图：`08-system-chrome.png`，截程序坞里的 Chrome 图标和终端。

### 出问题时

- `open` 卡住或超时：大概率是 GitHub 连不上，加 `--proxy http://127.0.0.1:10809`，或先用 `https://example.com` 试。
- 加了 `--headed` 没有窗口：后台已有无头浏览器。先 `agent-browser close --all` 再 open。
- click 报被遮挡：页面上有弹层（比如 cookie 提示）。先对弹层的关闭按钮 click，再重新 snapshot。
- 报错原文复制下来发给我，别先用 `doctor --fix`。

### 代跑进度（2026-09-30 10:17，重启 Cursor 前）

已完成，文件都在 `data/articals/assets/2026-09/29-agent-browser/`：

- 第 1 步：`01-doctor.txt`。完整 doctor 10 pass，0 warn，0 fail；无头启动测试 1.07 秒；用的是 Chrome for Testing 154.0.8037.92。
- 第 2 步：`02-open.txt`、`02-page-opened.png`。`open ... --headed --proxy http://127.0.0.1:10809` 约 3 秒返回。
- 第 3 步：`snapshot.txt`。`snapshot -i` 共 945 个编号，约 50 KB（GitHub 页面把整份 README 渲染进来了）。Issues 链接是 `@e27`。
- 第 4 步：`04-annotated.png`、`04-annotated-legend.txt`（943 行对照表）。
- 第 5 步第一次：`click @e27` 返回 `✓ Done`，但紧接着的 `get url` 还是仓库首页；过一会儿再查才是 `/issues`。原因是 GitHub 用前端路由换页，点完要等。准备改成 `click @e27` → `wait --url "**/issues"` → `get url` 重跑。`06-click.txt`、`06-after-click.png` 是第一次的结果，需要覆盖。

未完成：

- 第 5 步重跑（上面那条命令被 Cursor 权限打断了）。
- `02-headed.png` 这类窗口截图：`screencapture` 报 “could not create image from display”，是 Cursor 没有屏幕录制权限。
- 终端截图：打算把 `.txt` 里的真实输出渲染成终端样式图片，文字不改。
- 第 6 步 close、第 7 步代理接入、第 8 步用系统 Chrome。

### 记录表（跑完填，改帖子用）

| 项目 | 结果 |
|------|------|
| 用的哪个浏览器 | Chrome for Testing 154 / 自己的 Chrome |
| 是否需要代理 | |
| open 到页面出来大概几秒 | |
| snapshot -i 编号数量 | |
| Issues 链接的编号 | |
| click 后 get url 输出 | |
| 第 7 步代理答出的版本号 | |
| 卡住或报错的地方 | |

跑完把记录表填好、截图放进 `data/articals/assets/2026-09/29-agent-browser/`，告诉我一声，我按真实结果改三篇文稿和配图说明，并把 `verification` 改成已实机运行。

## 发布辅助

1. 开头用了「实用」和「AI 开源工具」。仓库定位就是给 AI 代理的浏览器命令行，核心能力是点击和填写，所以用「实用」，不用「创新」。
2. 推荐语：让编码代理按页面编号操作浏览器，先走通快照再谈聊天。
3. 知乎摘要：agent-browser 是一条给 AI 代理用的浏览器命令行。它用无障碍树给按钮和输入框编号，代理按编号点击，不必把整页 HTML 塞进上下文。这篇按源码和文档说明它怎么工作、最短怎么跑，以及什么时候该改用 Playwright。我没有在本机跑过。
4. 知乎话题：浏览器自动化、AI 编程、GitHub。
5. 配图：封面只放项目名和「按编号操作网页」；原理图用命令到 CDP 的流程；运行图等你自己截到 `snapshot -i` 和截图文件后再放；代码图截 `cli/src/native/snapshot.rs` 里分配 `e{编号}` 的那一段。
6. 三端侧重点：X 强调「代理靠整页 HTML 和选择器点网页」这个麻烦，以及快照编号给出的结果；小红书强调五步体验；知乎强调编号怎么从无障碍树来，以及默认没跑过。
7. X 长帖需要 Premium。没有 Premium 就发串推版。英文速递卡里的 Star 数是 2026-09-30 的查询值，发之前更新。
8. 不需要改成谨慎评测。文档和源码对得上，局限写在判断里即可。仪表盘那张图在复现 #2010 之前先不要用。
