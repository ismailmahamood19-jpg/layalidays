#!/bin/sh
cd "$(dirname "$0")"
echo "Layali Days site → http://localhost:8012"
python3 -m http.server 8012
