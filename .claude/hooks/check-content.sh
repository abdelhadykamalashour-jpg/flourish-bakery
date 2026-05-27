#!/bin/bash
# check-content.sh
# Detects placeholder content + passive wiring + waiting-for-user patterns
# Save at: D:\Website_project\.claude\hooks\check-content.sh

echo "🔍 Scanning for placeholder content + passive wiring..."

# Standard placeholder content
PLACEHOLDERS=(
  "lorem ipsum"
  "Lorem ipsum"
  "Lorem Ipsum"
  "TODO"
  "FIXME"
  "dummy text"
  "Dummy Text"
  "sample text"
  "Sample Text"
  "your text here"
  "Your text here"
  "coming soon"
  "Coming Soon"
  "[email protected]"
  "example.com"
  "123-456-7890"
  "Your Name"
  "Restaurant Name"
  "Product Name"
  "Category Name"
  "SKU-001"
  "Shop Name"
  "\$0.00"
  "not implemented"
  "user provides"
  "user will provide"
  "if user adds"
  "when user uploads"
)

# Anti-passive-wiring patterns (the new ones)
PASSIVE_PATTERNS=(
  "FallbackBox"
  "FallbackCube"
  "FallbackGeometry"
  "PlaceholderModel"
  "PlaceholderVideo"
  "PlaceholderAudio"
  "console.warn"
  "Asset missing"
  "Model not found"
)

FOUND=0

echo ""
echo "── Standard placeholder scan ──"
for TERM in "${PLACEHOLDERS[@]}"; do
  RESULTS=$(grep -rn --include="*.tsx" --include="*.ts" --include="*.js" \
    --include="*.jsx" --include="*.html" --include="*.css" \
    --include="*.json" --include="*.md" \
    "$TERM" . 2>/dev/null \
    | grep -v 'placeholder=' \
    | grep -v 'placeholder:' \
    | grep -v 'node_modules' \
    | grep -v '.next/')

  if [ -n "$RESULTS" ]; then
    echo "⚠️  PLACEHOLDER FOUND: '$TERM'"
    echo "$RESULTS"
    echo ""
    FOUND=1
  fi
done

echo ""
echo "── Passive-wiring / fallback-component scan ──"
for TERM in "${PASSIVE_PATTERNS[@]}"; do
  RESULTS=$(grep -rn --include="*.tsx" --include="*.ts" --include="*.js" \
    --include="*.jsx" \
    "$TERM" . 2>/dev/null \
    | grep -v 'node_modules' \
    | grep -v '.next/')

  if [ -n "$RESULTS" ]; then
    echo "❌ PASSIVE PATTERN: '$TERM' — rename to production or remove"
    echo "$RESULTS"
    echo ""
    FOUND=1
  fi
done

echo ""
echo "── Asset-waiting comment scan ──"
WAITING=$(grep -rn --include="*.tsx" --include="*.ts" --include="*.jsx" \
  -E "//.*(TODO|FIXME|user provides|user will|not implemented|coming soon|missing asset|when user)" . 2>/dev/null \
  | grep -v 'node_modules' \
  | grep -v '.next/')

if [ -n "$WAITING" ]; then
  echo "❌ ASSET-WAITING COMMENTS FOUND — recreate per asset-fallback.md:"
  echo "$WAITING"
  echo ""
  FOUND=1
fi

if [ $FOUND -eq 0 ]; then
  echo ""
  echo "✅ No placeholder content. No passive wiring. No waiting-for-user comments."
  echo "✅ Codebase is fully autonomous and production-ready."
else
  echo ""
  echo "⛔ Fix all flagged items above per .claude/asset-fallback.md"
  echo "   Goal: zero passive wires, zero TODOs, zero Fallback* component names."
  exit 1
fi