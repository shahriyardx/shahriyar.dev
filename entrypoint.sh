#!/bin/sh
set -e

echo "Running migrations..."
bunx prisma migrate deploy

echo "Starting server..."
exec bun run server.js
