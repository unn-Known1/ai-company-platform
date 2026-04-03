#!/bin/bash
set -e

echo "Building AI Company Platform..."
echo "================================"

# Run all build scripts
if [ -f "./build/build-portable.sh" ]; then
    echo "Building portable package..."
    ./build/build-portable.sh
fi

if [ -f "./build/build-deb.sh" ]; then
    echo "Building Debian package..."
    ./build/build-deb.sh
fi

echo ""
echo "Build complete!"
echo "Output files are in the build/ directory"
