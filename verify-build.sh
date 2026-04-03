#!/bin/bash
set -e

echo "Verifying AI Company Platform build..."
echo "======================================"

ERRORS=0

# Check Node.js version
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "  Node.js: $NODE_VERSION"
else
    echo "  ERROR: Node.js not found"
    ERRORS=$((ERRORS + 1))
fi

# Check npm version
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "  npm: $NPM_VERSION"
else
    echo "  ERROR: npm not found"
    ERRORS=$((ERRORS + 1))
fi

# Check frontend dependencies
echo "Checking frontend dependencies..."
if [ -f "frontend/package.json" ]; then
    echo "  frontend/package.json: OK"
else
    echo "  ERROR: frontend/package.json not found"
    ERRORS=$((ERRORS + 1))
fi

# Check backend dependencies
echo "Checking backend dependencies..."
if [ -f "backend/package.json" ]; then
    echo "  backend/package.json: OK"
else
    echo "  ERROR: backend/package.json not found"
    ERRORS=$((ERRORS + 1))
fi

# Check database schema
echo "Checking database schema..."
if [ -f "backend/database/schema.sql" ]; then
    echo "  backend/database/schema.sql: OK"
else
    echo "  WARNING: backend/database/schema.sql not found"
fi

echo ""
echo "======================================"
if [ $ERRORS -eq 0 ]; then
    echo "Verification complete - No errors found!"
    exit 0
else
    echo "Verification complete - $ERRORS error(s) found"
    exit 1
fi
