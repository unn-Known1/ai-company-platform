# AI Company Platform - API Design

## Overview

The AI Company Platform uses a RESTful API with JSON payloads and JWT authentication.

## Base URL

```
http://localhost:3001/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user

### Companies

- `GET /api/companies` - List all companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Agents

- `GET /api/agents` - List agents
- `GET /api/agents/:id` - Get agent by ID
- `POST /api/agents` - Create agent
- `PUT /api/agents/:id` - Update agent
- `DELETE /api/agents/:id` - Delete agent

### Missions

- `GET /api/missions` - List missions
- `GET /api/missions/:id` - Get mission by ID
- `POST /api/missions` - Create mission
- `PUT /api/missions/:id` - Update mission
- `DELETE /api/missions/:id` - Delete mission

### Tickets

- `GET /api/tickets` - List tickets
- `GET /api/tickets/:id` - Get ticket by ID
- `POST /api/tickets` - Create ticket
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket

### Budgets

- `GET /api/budgets` - List budgets
- `POST /api/budgets` - Create/update budget

### Organization

- `GET /api/org` - Get org chart
- `POST /api/org` - Create org node

## WebSocket

Connect to `ws://localhost:3001` for real-time updates.

### Message Types

- `ping` - Keep alive
- `update` - Broadcast updates
