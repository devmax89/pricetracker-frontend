#!/bin/bash
# Deploy script for Next.js Frontend

echo '🚀 Starting deployment...'

cd /opt/pricetracker-frontend

# Pull latest code
if [ -d .git ]; then
    echo '📦 Pulling latest code...'
    git pull
else
    echo '⚠️  Not a git repository'
fi

# Install dependencies
echo '📦 Installing dependencies...'
npm install

# Build Next.js
echo '🏗️  Building Next.js...'
npm run build

# Restart PM2
echo '🔄 Restarting application...'
pm2 restart nextjs-app || pm2 start npm --name nextjs-app -- start

echo '✅ Deployment complete!'
echo '🌐 Frontend running at http://192.168.1.242:3000'
