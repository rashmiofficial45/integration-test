#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Starting PostgreSQL..."
docker compose up -d

cleanup() {
  echo "🧹 Stopping containers..."
  docker compose down -v
}
trap cleanup EXIT
echo "⏳ Waiting for database..."
until docker compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; do
  sleep 1
done

echo "🛠 Applying migrations..."
pnpm prisma migrate deploy

echo "🧪 Running tests..."
pnpm test
