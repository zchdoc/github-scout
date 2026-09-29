import RepoBrowser from "@/components/RepoBrowser";
import { loadRecentRepos } from "@/lib/load-repos";

export default function HomePage() {
  const { repos, since } = loadRecentRepos();
  return <RepoBrowser repos={repos} scope="recent" since={since} />;
}
