#!/bin/bash
# post-build.sh
# Runs after npm run build — validates 3D bundle size, then commits if passing
# Save at: D:\Website_project\.claude\hooks\post-build.sh

echo "🔨 Running build check..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build FAILED. Fix errors before committing."
  exit 1
fi

echo ""
echo "✅ Build passed."
echo ""
echo "📦 Analyzing bundle for 3D libraries..."

# Check if three.js is in the project
if grep -q "\"three\"" package.json 2>/dev/null; then
  echo "🔍 Three.js detected — checking chunk sizes..."

  # Look for three.js chunks in .next/static/chunks
  if [ -d ".next/static/chunks" ]; then
    THREE_CHUNKS=$(find .next/static/chunks -name "*.js" -exec grep -l "three" {} \; 2>/dev/null | head -5)
    if [ -n "$THREE_CHUNKS" ]; then
      echo "Three.js chunks found:"
      for chunk in $THREE_CHUNKS; do
        SIZE=$(du -sh "$chunk" 2>/dev/null | cut -f1)
        echo "  $chunk → $SIZE"
      done

      # Warn if any single chunk is over 800KB (uncompressed)
      LARGE=$(find .next/static/chunks -name "*.js" -size +800k 2>/dev/null)
      if [ -n "$LARGE" ]; then
        echo ""
        echo "⚠️  WARNING: Large chunks detected (>800KB uncompressed):"
        echo "$LARGE"
        echo "   Consider: dynamic imports, tree-shaking, DRACO compression for models"
        echo "   This is a WARNING only — build will still commit."
      else
        echo "✅ Three.js chunk sizes within acceptable range."
      fi
    fi
  fi
fi

echo ""
echo "🔍 Checking for SSR safety of 3D components..."

# Verify no Canvas imported without ssr:false pattern in pages/app directory
SSR_VIOLATION=$(grep -rn --include="*.tsx" \
  "import { Canvas }" \
  ./app ./pages 2>/dev/null \
  | grep -v "dynamic" | grep -v "node_modules")

if [ -n "$SSR_VIOLATION" ]; then
  echo "❌ SSR VIOLATION: Canvas imported directly in app/pages without dynamic():"
  echo "$SSR_VIOLATION"
  echo "   Wrap with: dynamic(() => import('./SceneCanvas'), { ssr: false })"
  exit 1
else
  echo "✅ No SSR violations found in 3D components."
fi

echo ""
echo "🔍 Checking for missing 3D public assets..."

MISSING=0

# Check GLTF/GLB references
GLTF_REFS=$(grep -rn --include="*.tsx" --include="*.ts" \
  "useGLTF\|GLTFLoader" \
  ./components ./app 2>/dev/null \
  | grep -oP "['\"]/[^'\"]+\.(glb|gltf)['\"]" | tr -d "'\"" | sort -u)

for REF in $GLTF_REFS; do
  if [ ! -f "./public${REF}" ]; then
    echo "❌ MISSING: /public${REF} (referenced in code)"
    MISSING=1
  fi
done

if [ $MISSING -eq 1 ]; then
  echo "⛔ Missing 3D assets — add them to /public before committing."
  exit 1
fi

echo ""
echo "📊 Build Summary:"
echo "  ✅ Next.js build: PASSED"
echo "  ✅ SSR safety: PASSED"
echo "  ✅ 3D assets: VERIFIED"
echo ""
echo "🚀 Committing..."
git add -A
git commit -m "build: passing build — auto-committed by post-build hook"
echo "✅ Commit done."
