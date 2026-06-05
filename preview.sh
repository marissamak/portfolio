#!/bin/bash
cd "$(dirname "$0")"
echo "Preview at http://localhost:8888"
echo "In Cursor: Cmd+Shift+P → type 'Simple Browser' → Show → paste URL above"
python3 -m http.server 8888
