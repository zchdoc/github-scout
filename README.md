# 🔭 GitHub Scout | GitHub 拾光

精选 GitHub 开源项目库 — 为 X/Twitter 内容运营而生

![GitHub Scout](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)

## ✨ 功能特性

- 📚 **项目库浏览** - 卡片式展示，一目了然
- 🏷️ **多标签筛选** - 支持多选，快速定位感兴趣的领域
- 🔍 **全文搜索** - 支持项目名、简介、关键词搜索
- 📅 **日期分组** - 按收录日期分组，今日精选/历史精选
- ⭐ **星数排序** - 支持按收录日期或 Star 数排序
- 📋 **一键复制推文** - 精心撰写的中文推文文案，一键复制到剪贴板
- 🌙 **深色模式** - 自动适配系统主题，手动切换
- 📱 **移动端适配** - 响应式设计，手机也能用

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

项目数据存储在 `data/repos.json` 文件中。要添加新项目，按以下步骤操作：

### 1. 编辑数据文件

打开 `data/repos.json`，在 `repos` 数组中添加新项目：

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
  "tweetDraftZh": "🔥 owner/repo-name ⭐12.3k\n\n吸引眼球的一句话介绍\n\n为什么值得关注的说明\n\n#GitHub #开源 #相关标签\n\nhttps://github.com/owner/repo-name"
}
```

### 2. 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一标识符，建议用 repo 名称小写 |
| `fullName` | string | GitHub 仓库全名 (owner/repo) |
| `url` | string | GitHub 仓库链接 |
| `starsApprox` | number | 大约 Star 数 |
| `hookZh` | string | 中文 Hook，一句话吸引注意力 |
| `whyZh` | string | 中文说明，为什么值得关注 |
| `tags` | string[] | 标签数组，建议 2-4 个 |
| `curatedDate` | string | 收录日期，格式 YYYY-MM-DD |
| `tweetDraftZh` | string | 中文推文草稿，包含 emoji、换行、话题标签 |

### 3. 推文文案模板

推荐的推文格式：

```
🔥 owner/repo-name ⭐Star数

Hook（一句话吸引眼球）

Why（简短说明亮点）

#GitHub #开源 #相关话题标签

https://github.com/owner/repo-name
```

### 4. 标签规范

常用标签参考：
- 技术领域：`AI`、`LLM`、`前端`、`后端`、`DevOps`
- 应用类型：`工具`、`框架`、`可视化`、`设计`
- 特点：`创意`、`趣味`、`效率`、`教育`

### 5. 提交 PR

完成编辑后，提交 Pull Request：

```bash
git add data/repos.json
git commit -m "feat: add [repo-name] to collection"
git push origin your-branch
```

## 📁 项目结构

```
github-scout/
├── data/
│   └── repos.json        # 项目数据文件
├── src/
│   ├── app/
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 首页（项目库）
│   │   ├── about/
│   │   │   └── page.tsx  # 关于页面
│   │   └── globals.css   # 全局样式
│   ├── components/
│   │   ├── RepoCard.tsx  # 项目卡片
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

1. **发掘优质项目** - 每日精选值得关注的开源项目
2. **降低分享门槛** - 提供即用的中文推文文案
3. **服务内容创作** - 助力 X/Twitter 中文技术社区内容运营

## 🗺️ 路线图

- [x] **v0.1** - 项目库 MVP（搜索、筛选、复制推文）
- [ ] **v0.2** - Repo 星球（3D 地球可视化）
- [ ] **v0.3** - 用户收藏 & 个性化推荐

## 🤝 贡献指南

欢迎贡献优质项目！请确保：

1. 项目符合[策展标准](/about)
2. 信息准确完整
3. 推文文案简洁有力

## 📄 开源协议

MIT License

---

Made with ❤️ for the Chinese tech community
