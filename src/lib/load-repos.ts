import { Repo, ReposData } from "./types";

type ReposModule = ReposData | { default: ReposData };

interface ReposContext {
  keys(): string[];
  (id: string): ReposModule;
}

// Collects every data/repos/YYYY-MM.json. A new month file is included without editing this list.
// @ts-expect-error require.context is provided by the Next.js bundler
const reposContext = require.context(
  "../../data/repos",
  false,
  /^\.\/\d{4}-\d{2}\.json$/,
) as ReposContext;

function readRepos(mod: ReposModule): Repo[] {
  if ("repos" in mod && Array.isArray(mod.repos)) return mod.repos;
  if ("default" in mod && Array.isArray(mod.default?.repos)) return mod.default.repos;
  return [];
}

export function loadRepos(): Repo[] {
  return reposContext
    .keys()
    .sort()
    .flatMap((key) => readRepos(reposContext(key)));
}
