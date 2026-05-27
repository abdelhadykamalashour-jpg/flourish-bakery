#!/bin/bash
# pre-done.sh
# Detects leftover brand/theme names + 3D placeholder artifacts from the original cloned source
# Save at: D:\Website_project\.claude\hooks\pre-done.sh

echo "🔍 Scanning for brand name leaks..."

LEAKS=(
  "Wilma"
  "wilma"
  "GrandRestaurant"
  "grandrestaurant"
  "themegoods"
  "ThemeGoods"
  "Grand Restaurant"
)

FOUND=0

for TERM in "${LEAKS[@]}"; do
  RESULTS=$(grep -rn --include="*.tsx" --include="*.ts" --include="*.js" \
    --include="*.jsx" --include="*.html" --include="*.css" \
    --include="*.json" --include="*.md" \
    "$TERM" . 2>/dev/null)

  if [ -n "$RESULTS" ]; then
    echo "❌ LEAK FOUND: '$TERM'"
    echo "$RESULTS"
    echo ""
    FOUND=1
  fi
done

echo ""
echo "🔍 Scanning for 3D placeholder artifacts..."

THREED_LEAKS=(
  "app.spline.design/placeholder"
  "prod.spline.design/placeholder"
  "your-scene-url-here"
  "REPLACE_WITH_SPLINE_URL"
  "REPLACE_WITH_GLTF"
  "model-placeholder"
  "scene-placeholder"
  "https://prod.spline.design/REPLACE"
  "defaultScene"
  "YOUR_SPLINE_URL"
)

for TERM in "${THREED_LEAKS[@]}"; do
  RESULTS=$(grep -rn --include="*.tsx" --include="*.ts" --include="*.js" \
    --include="*.jsx" --include="*.html" \
    "$TERM" . 2>/dev/null)

  if [ -n "$RESULTS" ]; then
    echo "❌ 3D PLACEHOLDER FOUND: '$TERM'"
    echo "$RESULTS"
    echo ""
    FOUND=1
  fi
done

echo ""
echo "🔍 Scanning for R3F SSR violations..."

SSR_LEAKS=(
  "import { Canvas }"
  "import {Canvas}"
)

for TERM in "${SSR_LEAKS[@]}"; do
  RESULTS=$(grep -rn --include="*.tsx" --include="*.ts" \
    "$TERM" . 2>/dev/null \
    | grep -v "dynamic(" \
    | grep -v "// ssr-safe" \
    | grep -v "SceneCanvas" \
    | grep -v "node_modules")

  if [ -n "$RESULTS" ]; then
    echo "⚠️  POTENTIAL SSR VIOLATION — Canvas imported without dynamic():"
    echo "$RESULTS"
    echo "   Verify these files are dynamically imported with ssr: false"
    echo ""
    FOUND=1
  fi
done

echo ""
echo "🔍 Scanning for missing 3D disposal patterns..."

DISPOSAL_CHECK=$(grep -rn --include="*.tsx" --include="*.ts" \
  "useGLTF\|useLoader\|new THREE\." \
  . 2>/dev/null | grep -v "node_modules" | grep -v ".next")

if [ -n "$DISPOSAL_CHECK" ]; then
  DISPOSAL_EXISTS=$(grep -rn --include="*.tsx" --include="*.ts" \
    "\.dispose()" \
    . 2>/dev/null | grep -v "node_modules" | grep -v ".next")

  if [ -z "$DISPOSAL_EXISTS" ]; then
    echo "⚠️  WARNING: Three.js resources found but no .dispose() calls detected."
    echo "   Ensure all geometries, materials, and textures are disposed on unmount."
    echo "$DISPOSAL_CHECK"
    echo ""
  else
    echo "✅ Three.js disposal patterns found."
  fi
fi

echo ""
echo "🔍 Scanning for uncapped devicePixelRatio..."

DPR_RESULTS=$(grep -rn --include="*.tsx" --include="*.ts" --include="*.js" \
  "devicePixelRatio" \
  . 2>/dev/null | grep -v "Math.min" | grep -v "node_modules" | grep -v ".next")

if [ -n "$DPR_RESULTS" ]; then
  echo "⚠️  WARNING: devicePixelRatio used without Math.min cap:"
  echo "$DPR_RESULTS"
  echo "   Use: Math.min(window.devicePixelRatio, 2)"
  echo ""
fi

if [ $FOUND -eq 0 ]; then
  echo "✅ No brand name leaks or 3D placeholder artifacts detected. Safe to ship."
else
  echo "⛔ Fix all leaks above before declaring done."
  exit 1
fi
