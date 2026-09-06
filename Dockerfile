# Multi-stage Dockerfile for Google Cloud Run (Node.js/Express)
# Stage 1: Build Frontend Assets and Bundle Backend
FROM node:22-slim AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json tsconfig.json vite.config.ts ./
RUN npm ci || npm install

# Copy application source code
COPY index.html ./
COPY src/ ./src/
COPY server.ts ./

# Compile client SPA into dist/ and bundle Express backend into dist/server.cjs
RUN npm run build

# Stage 2: Production Container Runner
FROM node:22-slim AS runner

WORKDIR /app

# Google Cloud Run runs as container listening on port 8080 by default
ENV NODE_ENV=production
ENV PORT=8080

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# Copy compiled production assets from builder stage
COPY --from=builder /app/dist ./dist

# Security: Run as non-root user
USER node

# Expose Cloud Run standard port
EXPOSE 8080

# Launch bundled Express server
CMD ["node", "dist/server.cjs"]
