#!/bin/bash

echo "Starting server at http://localhost:8000"
echo "Press Ctrl+C to stop the server"

# Try Python 3 first, then Python 2 as fallback
if command -v python3 &>/dev/null; then
    python3 -m http.server 8000
elif command -v python &>/dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "Error: Python is not installed. Please install Python or use another HTTP server."
    exit 1
fi
