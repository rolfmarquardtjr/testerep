#!/bin/sh
set -e

echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

echo "🌱 Running database seed..."
npx prisma db seed || echo "⚠️  Seed failed or already applied"

echo "🚀 Starting server..."
exec "$@"
