# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root dependency files (from parent directory since Dockerfile is in apps/api)
COPY ../.. .

# Install all dependencies from root (handles monorepo workspaces)
RUN npm install --legacy-peer-deps --workspaces

# Generate Prisma client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build backend
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy built application
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./

# Copy Prisma client from node_modules if it exists
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma 2>/dev/null || true

EXPOSE 3001

ENTRYPOINT ["/usr/sbin/dumb-init", "--"]
CMD ["node", "dist/index.js"]
