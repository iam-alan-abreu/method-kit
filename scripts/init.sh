#!/bin/sh
set -eu

# Method Kit v0.2.0 — Shell installer (alternative to npx)
# Usage: .method-kit/scripts/init.sh <project-name>

PROJECT_NAME="${1:-my-project}"
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
KIT_DIR="$(dirname "$SCRIPT_DIR")"
TARGET_DIR="$(pwd)"

echo ""
echo "🧠 Method Kit v0.2.0 — AI-first development methodology"
echo ""
echo "  Project: $PROJECT_NAME"
echo "  Target:  $TARGET_DIR"
echo ""

# Helper: copy file if not exists
copy_if_new() {
  src="$1"
  dest="$2"
  if [ -f "$dest" ]; then
    echo "  ⏭  Skip (exists): $dest"
  else
    mkdir -p "$(dirname "$dest")"
    cp "$src" "$dest"
    echo "  ✓  Created: $dest"
  fi
}

# Helper: copy directory recursively (skip existing)
copy_dir() {
  src="$1"
  dest="$2"
  if [ ! -d "$src" ]; then return; fi
  find "$src" -type f | while read -r file; do
    rel="${file#$src/}"
    copy_if_new "$file" "$dest/$rel"
  done
}

# 1. Install skills
echo "📁 Installing skills/"
copy_dir "$KIT_DIR/skills" "$TARGET_DIR/.agents/skills"

# 2. Create .memory/
echo ""
echo "📁 Creating .memory/"
for f in "$KIT_DIR/templates/memory/"*.template.md; do
  [ -f "$f" ] || continue
  base="$(basename "$f" .template.md)"
  copy_if_new "$f" "$TARGET_DIR/.memory/$base.md"
done

# 3. Create docs/
echo ""
echo "📁 Creating docs/"
for f in "$KIT_DIR/templates/docs/"*.template.md; do
  [ -f "$f" ] || continue
  base="$(basename "$f" .template.md)"
  copy_if_new "$f" "$TARGET_DIR/docs/$base.md"
done

# 4. Create AGENTS.md
echo ""
echo "📁 Creating AGENTS.md"
copy_if_new "$KIT_DIR/templates/AGENTS.template.md" "$TARGET_DIR/AGENTS.md"

# 5. Replace placeholders
echo ""
echo "🔧 Applying project name: $PROJECT_NAME"

SKILL_PREFIX="$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g')"

replace_placeholders() {
  file="$1"
  [ -f "$file" ] || return
  if command -v sed >/dev/null 2>&1; then
    sed -i.bak \
      -e "s/{{PRODUCT_NAME}}/$PROJECT_NAME/g" \
      -e "s/{{PRODUCT_TAGLINE}}/$PROJECT_NAME — AI-first project with method-kit governance/g" \
      -e "s/{{PRODUCT_SKILL_PREFIX}}/$SKILL_PREFIX/g" \
      -e "s/{{PROTECTED_MODULES}}/.memory\/, .agents\/, AGENTS.md, .method-kit\//g" \
      -e "s/{{ACTIVE_HORIZON}}/H1/g" \
      "$file"
    rm -f "${file}.bak"
  fi
}

replace_placeholders "$TARGET_DIR/AGENTS.md"
replace_placeholders "$TARGET_DIR/.memory/product-vision.md"
replace_placeholders "$TARGET_DIR/.memory/decisions.md"
replace_placeholders "$TARGET_DIR/docs/roadmap.md"

echo ""
echo "✅ Method Kit installed successfully!"
echo ""
echo "Next steps:"
echo "  1. Edit .memory/product-vision.md — define your real problem"
echo "  2. Edit AGENTS.md §4 — define your surfaces"
echo "  3. Edit docs/roadmap.md — define your first 3-5 spikes"
echo "  4. Write founding ADRs in .memory/decisions.md (D-001..D-003)"
echo "  5. Run your first delivery turn — verify §7 closing block renders"
echo ""
