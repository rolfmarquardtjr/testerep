# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root files
COPY .npmrc package*.json ./

# Copy app files
COPY apps/api ./apps/api
COPY apps/types ./apps/types
COPY packages ./packages

# Install dependencies with npm install (not ci)
RUN npm install --legacy-peer-deps

# Build the app
WORKDIR /app/apps/api
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/api/package*.json ./apps/api/

# Install production dependencies only
RUN npm install --legacy-peer-deps --omit=dev

# Copy built app from builder
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma

# Copy other necessary files
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3001

CMD ["npm", "run", "start"]
