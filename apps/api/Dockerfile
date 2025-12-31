# Build stage
FROM node:20-alpine AS builder

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy from root (context is already root)
COPY . .

# Install all dependencies from root
RUN npm install --legacy-peer-deps

# Move to backend and build
WORKDIR /app/apps/api

# Generate Prisma client with explicit schema path
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

# Install OpenSSL and dumb-init
RUN apk add --no-cache openssl dumb-init

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./package.json
COPY --from=builder /app/apps/api/docker-entrypoint.sh ./docker-entrypoint.sh

# Copy Prisma client
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy tsx for seed execution
COPY --from=builder /app/node_modules/.bin/tsx ./node_modules/.bin/tsx

# Make entrypoint executable
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/usr/sbin/dumb-init", "--", "./docker-entrypoint.sh"]
CMD ["node", "dist/index.js"]
