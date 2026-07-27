#!/bin/bash
set -e

echo "Starting Entrypoint Script..."

echo "Waiting for database..."

# pg_isready accepts a full connection URI via -d
until pg_isready -d "$DATABASE_URL"; do
  echo "Database is unavailable - sleeping..."
  sleep 2
done

echo "Database is up - executing migrations from supabase/migrations..."
for f in /app/supabase/migrations/*.sql; do
  echo "Applying migration: $f"
  psql "$DATABASE_URL" -f "$f"
done

echo "Starting application with command: $@"
exec "$@"