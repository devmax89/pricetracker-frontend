#!/bin/bash

# Script per rebuild e restart di Next.js con PM2
# Salva questo file come rebuild-nextjs.sh e rendilo eseguibile con: chmod +x rebuild-nextjs.sh

set -e  # Esce in caso di errore

APP_NAME="nextjs-app"
APP_DIR="/opt/pricetracker-frontend"

echo "=========================================="
echo "🔄 Rebuild e Restart Next.js"
echo "=========================================="
echo ""

# Vai nella directory dell'app
cd "$APP_DIR" || exit 1

# Stop dell'app
echo "⏸️  Stopping PM2 app: $APP_NAME..."
pm2 stop "$APP_NAME" || true
echo ""

# Rimuovi la build precedente
echo "🗑️  Removing old build (.next/)..."
rm -rf .next/
echo ""

# Rebuild dell'app
echo "🔨 Building Next.js app..."
npm run build
echo ""

# Restart dell'app
echo "🚀 Starting PM2 app: $APP_NAME..."
pm2 start "$APP_NAME"
echo ""

# Salva la configurazione PM2
echo "💾 Saving PM2 configuration..."
pm2 save
echo ""

# Mostra i log
echo "=========================================="
echo "📋 Showing logs (Ctrl+C to exit)..."
echo "=========================================="
sleep 2
pm2 logs "$APP_NAME" --lines 50