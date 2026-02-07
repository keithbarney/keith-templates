#!/bin/bash

# Create a new Figma plugin from template
# Usage: ./new-plugin.sh plugin-name "Plugin Display Name" "Description"

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$(dirname "$SCRIPT_DIR")/figma-plugin"
PROJECTS_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Arguments
SLUG="${1:-my-plugin}"
NAME="${2:-My Plugin}"
DESCRIPTION="${3:-A Figma plugin}"

# Generate plugin ID (random)
PLUGIN_ID=$(uuidgen | tr '[:upper:]' '[:lower:]' | cut -d'-' -f1-2)

TARGET_DIR="$PROJECTS_DIR/$SLUG"

# Check if target exists
if [ -d "$TARGET_DIR" ]; then
  echo "Error: Directory $TARGET_DIR already exists"
  exit 1
fi

echo "Creating new Figma plugin: $NAME"
echo "  Slug: $SLUG"
echo "  Location: $TARGET_DIR"
echo ""

# Copy template
cp -r "$TEMPLATE_DIR" "$TARGET_DIR"

# Replace placeholders
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  find "$TARGET_DIR" -type f \( -name "*.json" -o -name "*.ts" -o -name "*.html" -o -name "*.md" -o -name "*.css" \) -exec sed -i '' \
    -e "s/{{PLUGIN_NAME}}/$NAME/g" \
    -e "s/{{PLUGIN_SLUG}}/$SLUG/g" \
    -e "s/{{PLUGIN_ID}}/$PLUGIN_ID/g" \
    -e "s/{{PLUGIN_DESCRIPTION}}/$DESCRIPTION/g" \
    {} \;
else
  # Linux
  find "$TARGET_DIR" -type f \( -name "*.json" -o -name "*.ts" -o -name "*.html" -o -name "*.md" -o -name "*.css" \) -exec sed -i \
    -e "s/{{PLUGIN_NAME}}/$NAME/g" \
    -e "s/{{PLUGIN_SLUG}}/$SLUG/g" \
    -e "s/{{PLUGIN_ID}}/$PLUGIN_ID/g" \
    -e "s/{{PLUGIN_DESCRIPTION}}/$DESCRIPTION/g" \
    {} \;
fi

# Create dist directory
mkdir -p "$TARGET_DIR/dist"

# Replace heavy-theme.css copy with symlink to template source
rm "$TARGET_DIR/heavy-theme.css"
ln -s "../keith-templates/figma-plugin/heavy-theme.css" "$TARGET_DIR/heavy-theme.css"

# Initialize git (Figma plugins track dist/ — do NOT gitignore it)
cd "$TARGET_DIR"
git init -q
echo "node_modules/" >> .gitignore

echo ""
echo "Done! Next steps:"
echo ""
echo "  cd $TARGET_DIR"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "Then in Figma:"
echo "  Plugins → Development → Import plugin from manifest"
echo "  Select: $TARGET_DIR/manifest.json"
echo ""
