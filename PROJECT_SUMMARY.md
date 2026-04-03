# AI Company Platform - Project Summary

## Overview

AI Company Platform is a comprehensive multi-agent management system designed to orchestrate AI agents within an organizational structure. The platform provides tools for managing agents, tickets, missions, budgets, and organizational hierarchies.

## Key Features

- **Multi-Agent Management**: Create, configure, and monitor AI agents with different providers (Claude, OpenAI, Custom)
- **Ticket System**: Kanban-style ticket management with agent assignment and tracking
- **Mission Tracking**: Monitor agent mission progress and completion
- **Budget Management**: Allocate and track spending across agents
- **Organization Chart**: Visualize organizational hierarchy
- **Real-time Communication**: WebSocket-based updates for live status changes

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Recharts for data visualization
- Socket.io-client for WebSocket communication

### Backend
- Node.js with Express
- SQLite for data persistence
- JWT for authentication
- WebSocket (ws) for real-time updates

## Project Structure

```
ai-company-platform/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React contexts
│   │   ├── services/     # API services
│   │   └── types/       # TypeScript definitions
│   └── ...
├── backend/           # Node.js backend API
│   ├── src/
│   │   ├── routes/      # API route handlers
│   │   ├── models/       # Data models
│   │   ├── middleware/   # Express middleware
│   │   └── utils/        # Utility functions
│   └── database/        # Database schema
├── build/             # Build scripts
└── .github/           # GitHub configuration
```

## Getting Started

See the main README.md for detailed setup instructions.

## License

MIT License - see LICENSE file for details.
