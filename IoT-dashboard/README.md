# ESP32 IoT Dashboard

React + TypeScript + Vite dashboard for monitoring and controlling ESP32 devices.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- ESP32 running and connected to the same network

## Setup

```bash
# Install dependencies
pnpm install

# Create environment file
cp .env.example .env

# Edit .env with your ESP32 IP address
```

## Run

```bash
pnpm dev
```

Dashboard opens at `http://localhost:3000`.

## Build

```bash
pnpm build
pnpm preview
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_ESP32_API_URL` | ESP32 API endpoint | `http://192.168.x.x` |
| `VITE_API_TIMEOUT` | Request timeout (ms) | `5000` |
