#!/bin/sh
set -e

echo "🚀 Starting Repfy API..."
echo "Environment: ${NODE_ENV}"
echo "Port: ${PORT}"

# Start the server directly
exec "$@"
