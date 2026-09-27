import base64, zlib, pathlib

p1 = pathlib.Path("data/repos/.fold-b64-part1").read_text().strip()
p2 = pathlib.Path("data/repos/.fold-b64-part2").read_text().strip()
raw = zlib.decompress(base64.b64decode(p1 + p2))
pathlib.Path("data/repos/2026-09.json").write_bytes(raw)
print("wrote", len(raw))
for p in [
    "data/repos/.fold-b64-part1",
    "data/repos/.fold-b64-part2",
    "scripts/assemble-monthly.py",
    ".github/workflows/fold-monthly-json.yml",
]:
    pathlib.Path(p).unlink(missing_ok=True)
