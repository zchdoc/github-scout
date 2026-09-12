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
}

export interface ReposData {
  repos: Repo[];
}

export type SortOption = "date" | "stars";
