#!/bin/bash
set -e

echo "==================================="
echo "AI Company Platform - Quick Start"
echo "==================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Error: Node.js 18+ is required"
    echo "Current version: $(node -v)"
    exit 1
fi

echo "Node.js version OK: $(node -v)"
echo ""

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "==================================="
echo "Setup complete!"
echo "==================================="
echo ""
echo "To start the backend:"
echo "  cd backend && npm run dev"
echo ""
echo "To start the frontend (in another terminal):"
echo "  cd frontend && npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "Login with any email/password to explore the platform"
echo ""
