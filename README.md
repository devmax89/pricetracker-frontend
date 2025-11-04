# 🚀 TechTracker Frontend - Next.js 14

Frontend moderno per il progetto TechTracker, convertito dai mockup HTML in React/Next.js con Tailwind CSS.

## ✨ Features

- ✅ **Next.js 14** con App Router
- ✅ **TypeScript** per type safety
- ✅ **Tailwind CSS** per styling
- ✅ **Chart.js** per grafici interattivi
- ✅ **Axios** per chiamate API
- ✅ **Responsive Design** (mobile-first)
- ✅ Conversione completa dei mockup HTML

## 📁 Struttura Progetto

```
pricetracker-frontend/
├── app/
│   ├── layout.tsx              # Layout principale con Header/Footer
│   ├── page.tsx                # Homepage
│   ├── products/[id]/
│   │   └── page.tsx            # Pagina dettaglio prodotto
│   └── globals.css             # Stili globali
│
├── components/
│   ├── Header.tsx              # Header navigation
│   ├── Footer.tsx              # Footer
│   ├── ProductCard.tsx         # Card prodotto (homepage)
│   └── PriceChart.tsx          # Grafico storico prezzi
│
├── lib/
│   └── api.ts                  # Client API con Axios
│
├── .env.local                  # Environment variables
└── package.json
```

## 🛠️ Setup Locale

### 1. Installazione

```bash
# Installa dipendenze
npm install

# Configura URL API
# Il file .env.local è già configurato con:
# NEXT_PUBLIC_API_URL=http://192.168.1.241:3000/api
```

### 2. Sviluppo

```bash
# Avvia server di sviluppo
npm run dev

# Apri browser su
http://localhost:3000
```

### 3. Build per Produzione

```bash
# Crea build ottimizzato
npm run build

# Avvia server produzione
npm start
```

## 🌐 Deploy su Vercel (Consigliato)

### Opzione A: Deploy via CLI

```bash
# Installa Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Imposta environment variable su Vercel dashboard:
# NEXT_PUBLIC_API_URL = http://TUO_IP_PUBBLICO:3000/api
```

### Opzione B: Deploy via GitHub

1. Push su GitHub
2. Vai su [vercel.com](https://vercel.com)
3. Importa repository GitHub
4. Aggiungi environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy! 🚀

## 📊 Pagine Implementate

### Homepage (`/`)
- ✅ Hero section con search bar
- ✅ Categorie cliccabili
- ✅ Griglia prodotti con prezzi nuovo/usato
- ✅ Sezione features

### Prodotto (`/products/[id]`)
- ✅ Dettaglio prodotto
- ✅ Grafico storico prezzi (Chart.js)
- ✅ Statistiche (min/max/avg)
- ✅ Confronto prezzi nuovo
- ✅ Annunci usato Subito.it
- ✅ Alert form

## 🔌 Integrazione API

Backend Node.js su `http://192.168.1.241:3000/api`

Endpoints:
- `GET /api/products` - Lista prodotti
- `GET /api/products/:id` - Dettaglio prodotto
- `GET /api/products/:id/prices` - Prezzi attuali
- `GET /api/products/:id/history?days=30` - Storico

## 🎨 Design

### Colori
- **Primary Blue**: #2563eb
- **Purple Gradient**: #667eea → #764ba2
- **Success Green**: #16a34a
- **Alert Red**: #dc2626

## 🐛 Troubleshooting

### API non raggiungibile
```bash
curl http://192.168.1.241:3000/api/health
```

### Build error
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 🚀 Next Steps

- [ ] Implementare search
- [ ] Filtri categoria
- [ ] Alert system
- [ ] Loading states
- [ ] SEO optimization
- [ ] Dark mode

---

**Developed with ❤️ for TechTracker.it**
