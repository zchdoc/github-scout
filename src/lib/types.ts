export type Difficulty = "轻松" | "中等" | "硬核";

export interface Repo {
  id: string;
  fullName: string;
  url: string;
  starsApprox: number;
  hookZh: string;
  whyZh: string;
  tags: string[];
  curatedDate: string;
  tweetDraftZh: string;
  // 新增深度字段
  useForZh: string;        // 有什么用 — 目标用户 + 解决什么问题
  featuresZh: string[];    // 实现了什么 — 3-6 个核心功能
  howToRunZh: string;      // 怎么跑起来 — 安装运行步骤
  forYouZh: string;        // 怎么为我所用 — 1-2 个具体场景
  // 可选字段
  difficulty?: Difficulty; // 难度级别
  demoUrl?: string | null; // 演示链接
}

export interface ReposData {
  repos: Repo[];
}

export type SortOption = "date" | "stars";
