import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "data", "repos");
const MONTH_DIR = /^\d{4}-\d{2}$/;
const REPO_FILE = /^\d{2}-[a-z0-9-]+\.json$/;
const PART_SIZE = 500;

const entries = [];
for (const month of fs.readdirSync(root)) {
  if (!MONTH_DIR.test(month)) continue;
  const monthDir = path.join(root, month);
  if (!fs.statSync(monthDir).isDirectory()) continue;
  for (const file of fs.readdirSync(monthDir)) {
    if (!REPO_FILE.test(file)) continue;
    const repo = JSON.parse(fs.readFileSync(path.join(monthDir, file), "utf8"));
    entries.push({
      id: repo.id,
      fullName: repo.fullName,
      url: repo.url,
      curatedDate: repo.curatedDate,
      file: `${month}/${file}`,
    });
  }
}

entries.sort((a, b) => a.fullName.localeCompare(b.fullName, "en", { sensitivity: "base" }) || a.id.localeCompare(b.id));

const seen = new Set();
for (const entry of entries) {
  const key = entry.fullName.toLowerCase();
  if (seen.has(key)) {
    throw new Error(`Duplicate repository in catalog: ${entry.fullName}`);
  }
  seen.add(key);
}

for (const name of fs.readdirSync(root)) {
  if (name === "index.json" || /^index\.part\d+\.json$/.test(name)) {
    fs.unlinkSync(path.join(root, name));
  }
}

function write(name, data) {
  fs.writeFileSync(path.join(root, name), JSON.stringify(data, null, 2) + "\n");
}

if (entries.length <= PART_SIZE) {
  write("index.json", { repos: entries });
  console.log(`data/repos/index.json  ${entries.length} repos`);
} else {
  const parts = [];
  for (let i = 0; i < entries.length; i += PART_SIZE) {
    const name = `index.part${parts.length + 1}.json`;
    write(name, { repos: entries.slice(i, i + PART_SIZE) });
    parts.push(name);
  }
  write("index.json", { parts });
  console.log(`data/repos/index.json -> ${parts.join(", ")}  ${entries.length} repos`);
}
