# AI Company Platform

A comprehensive AI agent orchestration platform for managing multi-agent company operations.

## Features

- **Dashboard**: Real-time overview of all company operations
- **Agent Management**: Create and configure AI agents with multiple provider support
- **Ticket System**: Kanban-style ticket management for task tracking
- **Mission Tracking**: Monitor and manage agent missions
- **Budget Management**: Track spending across agents
- **Organization Chart**: Visualize company hierarchy

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-company-platform

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

#### Development Mode

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory, in another terminal)
npm run dev
```

#### Production Mode with Docker

```bash
docker-compose up -d
```

### Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- WebSocket: ws://localhost:3001

**Demo Mode**: Login with any email and password to explore the platform.

## Project Structure

```
ai-company-platform/
├── frontend/           # React frontend (Vite + TypeScript)
├── backend/            # Node.js API server
├── build/              # Build scripts for packaging
├── docker-compose.yml  # Docker configuration
└── README.md           # This file
```

## API Documentation

See [API_DESIGN.md](./backend/API_DESIGN.md) for detailed API documentation.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](./LICENSE) for details.
