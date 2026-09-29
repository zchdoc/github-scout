import { Repo } from "./types";

interface RepoContext {
  keys(): string[];
  (id: string): unknown;
}

// One directory per month, one file per project:
// data/repos/YYYY-MM/DD-id.json
// @ts-expect-error require.context is provided by the Next.js bundler
const reposContext = require.context(
  "../../data/repos",
  true,
  /^\.\/\d{4}-\d{2}\/\d{2}-[a-z0-9-]+\.json$/,
) as RepoContext;

function asRepo(mod: unknown): Repo | null {
  if (!mod || typeof mod !== "object") return null;
  const record = mod as { id?: unknown; fullName?: unknown; default?: unknown };
  if (typeof record.id === "string" && typeof record.fullName === "string") {
    return record as Repo;
  }
  if ("default" in record) return asRepo(record.default);
  return null;
}

export function loadRepos(): Repo[] {
  return reposContext
    .keys()
    .sort()
    .map((key) => {
      const repo = asRepo(reposContext(key));
      if (!repo) throw new Error(`Invalid repo file: ${key}`);
      return repo;
    });
}
