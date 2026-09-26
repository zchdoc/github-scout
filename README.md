# 🔭 GitHub Scout | GitHub 拾光

实用开源项目深度策展库 — 「能为我所用」

![GitHub Scout](https://img.shields.io/badge/version-0.2.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)

## ✨ 功能特性

- 📚 **深度项目库** - 每日一个深度解析，不只是「看一眼」
- 🎯 **实用导向** - 告诉你怎么跑起来、怎么用到自己的场景
- 🏷️ **多标签筛选** - 支持多选，快速定位感兴趣的领域
- 🔍 **全文搜索** - 支持项目名、简介、功能、场景搜索
- 📅 **日期分组** - 按收录日期分组，今日精选/历史精选
- ⭐ **星数排序** - 支持按收录日期或 Star 数排序
- 📋 **一键复制推文** - 精心撰写的中文推文文案，强调用途和如何尝试
- 🌙 **深色模式** - 自动适配系统主题，手动切换
- 📱 **移动端适配** - 响应式设计，手机也能用

## 🎯 内容特色

GitHub Scout 不是简单的项目列表，每个项目都包含：

| 字段 | 含义 | 说明 |
|------|------|------|
| **有什么用** | useForZh | 面向谁 + 解决什么问题 |
| **实现了什么** | featuresZh | 3-6 个核心功能点 |
| **工作原理** | howItWorksZh | 白话讲清它怎么运转（可选） |
| **核心技术** | coreTechZh | 3-5 个技术要点（可选） |
| **怎么跑起来** | howToRunZh | 可复制的安装运行命令 |
| **怎么为我所用** | forYouZh | 今天就能做的第一件事 |

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装运行

```bash
# 克隆项目
git clone https://github.com/zchdoc/github-scout.git
cd github-scout

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开浏览器访问 http://localhost:3000

### 构建部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📝 添加新项目

项目数据按收录月份存放，每月一个文件：`data/repos/YYYY-MM.json`（例如 `data/repos/2026-09.json`）。一个月最多一天一条，文件不会堆得很大。要添加新项目，按以下步骤操作：

### 1. 编辑数据文件

打开对应月份的 `data/repos/YYYY-MM.json`。新的月份直接新建这个文件，写入 `{ "repos": [] }` 后再追加项目。在 `repos` 数组中添加：

```json
{
  "id": "unique-id",
  "fullName": "owner/repo-name",
  "url": "https://github.com/owner/repo-name",
  "starsApprox": 12345,
  "hookZh": "吸引眼球的一句话介绍（Hook）",
  "whyZh": "为什么这个项目值得关注（简短说明）",
  "tags": ["标签1", "标签2", "标签3"],
  "curatedDate": "2026-09-12",
  "tweetDraftZh": "🔥 owner/repo-name ⭐12.3k\n\n吸引眼球的一句话介绍\n\n为什么值得关注的说明\n\n💡 试试：具体使用建议\n\n#GitHub #开源 #相关标签\n\nhttps://github.com/owner/repo-name",
  "useForZh": "面向谁 + 解决什么问题",
  "featuresZh": [
    "核心功能 1",
    "核心功能 2",
    "核心功能 3"
  ],
  "howItWorksZh": "用白话说明：输入 → 关键步骤 → 输出/效果",
  "coreTechZh": [
    "技术点 1",
    "技术点 2",
    "技术点 3"
  ],
  "howToRunZh": "```bash\ngit clone xxx\ncd xxx\nnpm install\nnpm run dev\n```\n\n⚠️ 注意事项说明",
  "forYouZh": "第一件事：今天就能做的具体建议",
  "difficulty": "轻松",
  "demoUrl": "https://demo.example.com"
}
```

### 2. 字段说明

#### 基础字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | ✅ | 唯一标识符，建议用 repo 名称小写 |
| `fullName` | string | ✅ | GitHub 仓库全名 (owner/repo) |
| `url` | string | ✅ | GitHub 仓库链接 |
| `starsApprox` | number | ✅ | 大约 Star 数 |
| `hookZh` | string | ✅ | 中文 Hook，一句话吸引注意力 |
| `whyZh` | string | ✅ | 中文说明，为什么值得关注 |
| `tags` | string[] | ✅ | 标签数组，建议 2-4 个 |
| `curatedDate` | string | ✅ | 收录日期，格式 YYYY-MM-DD |
| `tweetDraftZh` | string | ✅ | 中文推文草稿 |

#### 深度字段（v0.2 新增）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `useForZh` | string | ✅ | **有什么用** — 目标用户 + 解决什么问题 |
| `featuresZh` | string[] | ✅ | **实现了什么** — 3-6 个核心功能描述 |
| `howItWorksZh` | string | ❌ | **工作原理** — 白话讲清运行机制 |
| `coreTechZh` | string[] | ❌ | **核心技术** — 3-5 个技术要点 |
| `howToRunZh` | string | ✅ | **怎么跑起来** — 安装运行步骤，包含可复制命令 |
| `forYouZh` | string | ✅ | **怎么为我所用** — 1-2 个具体使用场景建议 |
| `difficulty` | string | ❌ | 难度级别：`"轻松"` / `"中等"` / `"硬核"` |
| `demoUrl` | string\|null | ❌ | 在线演示链接，无则为 `null` |

### 3. 深度字段撰写指南

#### useForZh（有什么用）
- 格式：`面向 [目标用户]。解决 [具体问题]——[一句话价值主张]`
- 例：`面向需要自动化复杂网页任务的开发者和测试工程师。解决长程网页操作难以自动化的问题——可将手动操作转化为可重复执行的脚本。`

#### featuresZh（实现了什么）
- 3-6 个功能点，每个功能用一句话描述
- 格式：`[功能名]：[具体说明]`
- 避免空洞描述，要有具体信息


#### howItWorksZh（工作原理）
- 用大白话写清「数据/请求从哪来、中间做了什么、结果怎么回来」
- 避免堆砌术语；必要时术语后跟一句人话解释
- 建议 2–4 句，读者扫一眼能懂

#### coreTechZh（核心技术）
- 3–5 条，格式：`[技术名]：[它解决什么 / 为什么重要]`
- 写实现抓手（协议、存储、算法、集成点），不要空泛形容词

#### howToRunZh（怎么跑起来）
- 提供可复制的命令
- 标注操作系统/依赖要求
- 用 ⚠️ 标注重要注意事项
- 如果步骤不确定，诚实说明并给出最佳努力的官方步骤

#### forYouZh（怎么为我所用）
- 格式：`第一件事：[具体可执行的建议]`
- 要具体到今天就能做的事
- 让读者有明确的行动方向

### 4. 推文文案模板

推荐的推文格式（强调用途和如何尝试）：

```
🔥 owner/repo-name ⭐Star数

Hook（一句话吸引眼球）

Why（简短说明亮点）

💡 试试：具体的使用建议

#GitHub #开源 #相关话题标签

https://github.com/owner/repo-name
```

### 5. 标签规范

常用标签参考：
- 技术领域：`AI`、`LLM`、`前端`、`后端`、`DevOps`
- 应用类型：`工具`、`框架`、`可视化`、`设计`
- 特点：`创意`、`趣味`、`效率`、`教育`

### 6. 提交 PR

完成编辑后，提交 Pull Request：

```bash
git add data/repos/YYYY-MM.json
git commit -m "feat: add [repo-name] to collection"
git push origin your-branch
```

## 📁 项目结构

```
github-scout/
├── data/
│   └── repos/            # 按月存放，如 2026-09.json
├── src/
│   ├── app/
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 首页（项目库）
│   │   ├── about/
│   │   │   └── page.tsx  # 关于页面
│   │   └── globals.css   # 全局样式
│   ├── components/
│   │   ├── RepoCard.tsx  # 项目卡片（含展开深度内容）
│   │   ├── TagFilter.tsx # 标签筛选
│   │   ├── SearchBar.tsx # 搜索框
│   │   └── SortSelect.tsx# 排序选择
│   └── lib/
│       ├── types.ts      # TypeScript 类型
│       └── utils.ts      # 工具函数
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎯 项目愿景

**GitHub Scout（GitHub 拾光）** 致力于：

1. **实用深度解析** - 每日一个项目深度剖析，不做浅尝辄止
2. **能为我所用** - 让读者看完就知道怎么跑起来、怎么用
3. **服务内容创作** - 助力 X/Twitter 中文技术社区内容运营

## 🗺️ 路线图

- [x] **v0.1** - 项目库 MVP（搜索、筛选、复制推文）
- [x] **v0.2** - 深度内容升级（每日一个深度项目，新增实用字段）
- [ ] **v0.3** - 用户收藏 & 个性化推荐

## 🤝 贡献指南

欢迎贡献优质项目！请确保：

1. 项目符合[策展标准](/about)
2. 信息准确完整，**特别是深度字段**
3. 推文文案简洁有力，**强调用途和如何尝试**
4. 不只是复制 README，要提供真正有用的中文内容

## 📄 开源协议

MIT License

---

Made with ❤️ for the Chinese tech community

**定位：「能为我所用」— 读者看完就知道怎么跑起来**
