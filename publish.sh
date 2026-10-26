#!/bin/bash
# Publish the demo: stamps a new version on the CSS/JS links (so browsers never reuse stale copies), commits and pushes.
# Usage:  ./publish.sh "what changed"
cd "$(dirname "$0")" || exit 1
V=$(date +%Y%m%d%H%M%S)
sed -i '' -E "s/(styles\.css|data\.js|i18n-extra\.js|i18n-lean\.js|app\.js)(\?v=[0-9]+)?\"/\1?v=$V\"/g" index.html tests.html
git add -A
git commit -m "${1:-Update demo} (v$V)" && git push
echo "Published v$V. The live page picks it up in about a minute."
