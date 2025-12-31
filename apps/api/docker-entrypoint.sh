#!/bin/sh

echo "🚀 Starting Repfy API..."
echo "Environment: ${NODE_ENV}"
echo "Port: ${PORT}"

# Run migrations (don't fail if error)
echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy || echo "⚠️  Migrations failed or already applied"

# Run seed (don't fail if error)
echo "🌱 Running database seed..."
npx prisma db seed || echo "⚠️  Seed failed or already applied"

# Start the server
echo "✅ Starting server..."
exec "$@"
