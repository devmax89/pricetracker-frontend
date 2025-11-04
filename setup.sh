#!/bin/bash

echo "🚀 TechTracker Frontend - Setup Automatico"
echo "=========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non trovato!"
    echo "   Installa Node.js da: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node -v) trovato"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm non trovato!"
    exit 1
fi

echo "✅ npm $(npm -v) trovato"
echo ""

# Install dependencies
echo "📦 Installazione dipendenze..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Errore durante installazione dipendenze"
    exit 1
fi

echo ""
echo "✅ Dipendenze installate con successo!"
echo ""

# Check .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  File .env.local non trovato"
    echo "   Creazione .env.local..."
    echo "NEXT_PUBLIC_API_URL=http://192.168.1.241:3000/api" > .env.local
    echo "✅ File .env.local creato"
fi

echo ""
echo "🎉 Setup completato!"
echo ""
echo "Prossimi passi:"
echo "1. Verifica configurazione API in .env.local"
echo "2. Esegui: npm run dev"
echo "3. Apri browser su: http://localhost:3000"
echo ""
echo "Per deploy su Vercel: vercel"
echo ""
