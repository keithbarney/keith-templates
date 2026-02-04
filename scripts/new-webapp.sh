#!/bin/bash

# Create a new web app from template
# Usage: ./new-webapp.sh app-name "App Display Name" "Description"

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$(dirname "$SCRIPT_DIR")/web-app"
PROJECTS_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Arguments
SLUG="${1:-my-app}"
NAME="${2:-My App}"
DESCRIPTION="${3:-A web application}"

TARGET_DIR="$PROJECTS_DIR/$SLUG"

# Check if target exists
if [ -d "$TARGET_DIR" ]; then
  echo "Error: Directory $TARGET_DIR already exists"
  exit 1
fi

echo "Creating new web app: $NAME"
echo "  Slug: $SLUG"
echo "  Location: $TARGET_DIR"
echo ""

# Copy template
cp -r "$TEMPLATE_DIR" "$TARGET_DIR"

# Replace placeholders
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  find "$TARGET_DIR" -type f \( -name "*.json" -o -name "*.js" -o -name "*.jsx" -o -name "*.html" -o -name "*.md" -o -name "*.css" \) -exec sed -i '' \
    -e "s/{{APP_NAME}}/$NAME/g" \
    -e "s/{{APP_SLUG}}/$SLUG/g" \
    -e "s/{{APP_DESCRIPTION}}/$DESCRIPTION/g" \
    {} \;
else
  # Linux
  find "$TARGET_DIR" -type f \( -name "*.json" -o -name "*.js" -o -name "*.jsx" -o -name "*.html" -o -name "*.md" -o -name "*.css" \) -exec sed -i \
    -e "s/{{APP_NAME}}/$NAME/g" \
    -e "s/{{APP_SLUG}}/$SLUG/g" \
    -e "s/{{APP_DESCRIPTION}}/$DESCRIPTION/g" \
    {} \;
fi

# Initialize git
cd "$TARGET_DIR"
git init -q

echo ""
echo "Done! Next steps:"
echo ""
echo "  cd $TARGET_DIR"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "App will open at http://localhost:3000"
echo ""
