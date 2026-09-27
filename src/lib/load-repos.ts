import { Repo, ReposData } from "./types";

type ReposModule = ReposData | { default: ReposData };

interface ReposContext {
  keys(): string[];
  (id: string): ReposModule;
}

// Collects data/repos/YYYY-MM.json and optional YYYY-MM-<slug>.json sidecars
// (e.g. 2026-09-genoffice.json). Page sorts by curatedDate, so file order is secondary.
// @ts-expect-error require.context is provided by the Next.js bundler
const reposContext = require.context(
  "../../data/repos",
  false,
  /^\.\/\d{4}-\d{2}(?:-[a-z0-9]+)?\.json$/,
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
