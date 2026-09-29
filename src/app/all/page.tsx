import type { Metadata } from "next";
import RepoBrowser from "@/components/RepoBrowser";
import { loadRepos } from "@/lib/load-repos";

export const metadata: Metadata = {
  title: "全部项目 | GitHub Scout · GitHub 拾光",
  description: "GitHub Scout 收录的全部开源项目",
};

export default function AllReposPage() {
  return <RepoBrowser repos={loadRepos()} scope="all" />;
}
