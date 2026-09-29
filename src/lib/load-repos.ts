import fs from "fs";
import path from "path";
import { Repo } from "./types";

const MONTH_DIR = /^\d{4}-\d{2}$/;
const REPO_FILE = /^\d{2}-[a-z0-9-]+\.json$/;

function shiftISODate(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

type IndexEntry = { fullName: string };

function readIndexNames(root: string): string[] {
  const indexPath = path.join(root, "index.json");
  if (!fs.existsSync(indexPath)) {
    throw new Error("缺少 data/repos/index.json，先运行 npm run index");
  }

  const index = JSON.parse(fs.readFileSync(indexPath, "utf8")) as {
    repos?: IndexEntry[];
    parts?: string[];
  };
  const files = index.parts?.length
    ? index.parts.map((name) => path.join(root, name))
    : [indexPath];

  return files.flatMap((file) => {
    const data = JSON.parse(fs.readFileSync(file, "utf8")) as { repos?: IndexEntry[] };
    return (data.repos ?? []).map((entry) => entry.fullName.toLowerCase());
  });
}

function assertIndexMatches(root: string, repos: Repo[]) {
  const indexed = new Set(readIndexNames(root));
  const collected = repos.map((repo) => repo.fullName.toLowerCase());
  const missing = collected.filter((name) => !indexed.has(name));
  const extra = [...indexed].filter((name) => !collected.includes(name));
  if (missing.length === 0 && extra.length === 0) return;
  throw new Error(
    `data/repos/index.json 和项目文件不一致。运行 npm run index 重新生成。缺少：${missing.join(", ") || "无"}；多出：${extra.join(", ") || "无"}`
  );
}

export function loadRepos(): Repo[] {
  const root = path.join(process.cwd(), "data", "repos");
  if (!fs.existsSync(root)) return [];

  const repos: Repo[] = [];
  for (const month of fs.readdirSync(root)) {
    if (!MONTH_DIR.test(month)) continue;
    const monthDir = path.join(root, month);
    if (!fs.statSync(monthDir).isDirectory()) continue;

    for (const file of fs.readdirSync(monthDir)) {
      if (!REPO_FILE.test(file)) continue;
      const repo = JSON.parse(fs.readFileSync(path.join(monthDir, file), "utf8")) as Repo;
      repos.push(repo);
    }
  }

  assertIndexMatches(root, repos);
  return repos.sort((a, b) => b.curatedDate.localeCompare(a.curatedDate) || a.id.localeCompare(b.id));
}

/** Latest curated date, then 365 days back. Both endpoints are included. */
export function recentWindow(repos: Repo[]): { since: string; until: string } {
  if (repos.length === 0) return { since: "", until: "" };
  const until = repos.reduce((latest, repo) => (repo.curatedDate > latest ? repo.curatedDate : latest), "");
  return { since: shiftISODate(until, -365), until };
}

export function loadRecentRepos(repos = loadRepos()): { repos: Repo[]; since: string; until: string } {
  const window = recentWindow(repos);
  return {
    ...window,
    repos: repos.filter((repo) => repo.curatedDate >= window.since),
  };
}
