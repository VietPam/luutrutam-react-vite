import os
from pathlib import Path

SOURCE_EXTENSIONS = [".ts", ".tsx"]
OUTPUT_FOLDER = "output"
OUTPUT_FILE = "all_code.txt"

def collect_files(base_dir):
    files = []
    for root, dirs, filenames in os.walk(base_dir):
        if "node_modules" in root:
            continue
        if ".wrangler" in root:
            continue
        if "summarize-tool" in root:
            continue
        for name in filenames:
            path = Path(root) / name
            if path.suffix in SOURCE_EXTENSIONS:
                files.append(path)
    return files

def write_output(files, base_dir, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    output_path = Path(output_dir) / OUTPUT_FILE

    with open(output_path, "w", encoding="utf-8") as out:
        for file_path in sorted(files):
            relative_path = file_path.relative_to(base_dir)
            out.write(f"\n/* FILE: {relative_path} */\n\n")
            with open(file_path, "r", encoding="utf-8") as f:
                out.write(f.read())
            out.write("\n")

def main():
    script_dir = Path(__file__).resolve().parent
    project_root = script_dir.parent
    output_dir = script_dir / OUTPUT_FOLDER

    files = collect_files(project_root)
    write_output(files, project_root, output_dir)

if __name__ == "__main__":
    main()