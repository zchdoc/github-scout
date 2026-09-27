import base64, zlib, pathlib
parts = []
for i in range(33):
    parts.append(pathlib.Path(f"data/repos/.fold-b64-{i:02d}").read_text().strip())
raw = zlib.decompress(base64.b64decode("".join(parts)))
pathlib.Path("data/repos/2026-09.json").write_bytes(raw)
print("wrote", len(raw))
for i in range(33):
    pathlib.Path(f"data/repos/.fold-b64-{i:02d}").unlink(missing_ok=True)
for p in ["scripts/assemble-monthly.py", ".github/workflows/fold-monthly-json.yml",
          "data/repos/.fold-b64-part1", "data/repos/.fold-b64-part2"]:
    pathlib.Path(p).unlink(missing_ok=True)
