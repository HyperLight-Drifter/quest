import os
import re
import sys
from pathlib import Path

OLD_ID = "quest"
NEW_ID = "quest-adventure-game"  # <-- change this to whatever you land on

ROOT = Path(__file__).resolve().parent

def replace_in_file(path: Path, patterns):
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, PermissionError):
        return False

    original = text
    for pattern, repl in patterns:
        text = re.sub(pattern, repl, text)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False

def main():
    patterns = [
        (rf"systems/{OLD_ID}/", f"systems/{NEW_ID}/"),
        (rf'"{OLD_ID}"', f'"{NEW_ID}"'),
        (rf"flags\.{OLD_ID}", f"flags.{NEW_ID}"),
    ]

    targets = []
    for folder in ["scripts", "templates", "lang"]:
        folder_path = ROOT / folder
        if folder_path.exists():
            targets.extend(folder_path.rglob("*"))
    targets.append(ROOT / "system.json")

    changed_files = []
    for path in targets:
        if path.is_file():
            if replace_in_file(path, patterns):
                changed_files.append(path)

    print(f"Updated {len(changed_files)} file(s):")
    for f in changed_files:
        print(f"  {f.relative_to(ROOT)}")

    # Rename the system.json "id" field explicitly, in case quoting differs
    system_json = ROOT / "system.json"
    text = system_json.read_text(encoding="utf-8")
    text = re.sub(rf'"id":\s*"{OLD_ID}"', f'"id": "{NEW_ID}"', text)
    system_json.write_text(text, encoding="utf-8")
    print(f"\nConfirmed system.json id field set to \"{NEW_ID}\".")

    # Rename the repo folder itself
    new_folder = ROOT.parent / NEW_ID
    if new_folder.exists():
        print(f"\nWARNING: {new_folder} already exists — skipping folder rename. Do it manually.")
    else:
        os.rename(ROOT, new_folder)
        print(f"\nRenamed project folder:\n  {ROOT}\n  -> {new_folder}")

    print("\nDone. Now verify with a manual search for any remaining 'quest' references,")
    print("especially in README files, packs/, or anything outside scripts/templates/lang/system.json.")

if __name__ == "__main__":
    main()