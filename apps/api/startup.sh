#!/bin/sh
set -e

echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy || echo "⚠️ Migrations failed"

echo "🌱 Running database seed..."
npx prisma db seed || echo "⚠️ Seed failed"

echo "🚀 Starting server..."
exec node dist/index.js
