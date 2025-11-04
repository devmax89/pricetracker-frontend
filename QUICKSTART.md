# 🚀 QUICK START GUIDE

## 📦 Setup Iniziale (5 minuti)

```bash
# 1. Entra nella cartella
cd pricetracker-frontend

# 2. Installa dipendenze
npm install

# 3. Avvia sviluppo
npm run dev

# 4. Apri browser
http://localhost:3000
```

## ✅ Verifica Funzionamento

### Test 1: Homepage
- Vai su http://localhost:3000
- Dovresti vedere hero viola, categorie e prodotti

### Test 2: Pagina Prodotto
- Clicca su una card prodotto
- Dovresti vedere dettagli + grafico prezzi

### Test 3: API Connection
```bash
# Verifica backend online
curl http://192.168.1.241:3000/api/products
```

## 🔧 Configurazione API

Se il backend è su un altro IP, modifica `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://TUO_IP:3000/api
```

Poi riavvia:
```bash
npm run dev
```

## 🌐 Deploy su Vercel

```bash
# Installa CLI Vercel
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Produzione
vercel --prod
```

## 📱 Test Responsive

- Desktop: http://localhost:3000
- Mobile: Usa DevTools → Toggle device toolbar
- Oppure: http://TUO_IP_LOCALE:3000 dal telefono

## 🐛 Problemi Comuni

### Errore: "Cannot connect to API"
- ✅ Verifica che LXC 503 (API) sia online
- ✅ Controlla firewall Proxmox
- ✅ Testa con: `curl http://192.168.1.241:3000/api/health`

### Errore: "Module not found"
```bash
rm -rf node_modules
npm install
```

### Grafico non si vede
- Il componente PriceChart richiede dati in `history`
- Verifica che l'API ritorni storico prezzi

## 📂 File Importanti

```
.env.local              → URL backend
app/page.tsx            → Homepage
app/products/[id]/page.tsx  → Dettaglio prodotto
components/ProductCard.tsx  → Card prodotto
components/PriceChart.tsx   → Grafico
lib/api.ts              → Client API
```

## 🎯 Prossimi Passi

1. ✅ Testa tutto in locale
2. ✅ Verifica chiamate API
3. ✅ Test responsive mobile
4. 🔄 Deploy su Vercel
5. 🔄 Configura dominio custom

## 💡 Tips

- **Hot reload**: Salva file e vedi modifiche istantanee
- **TypeScript**: Sfrutta autocomplete con Ctrl+Space
- **Tailwind**: Usa IntelliSense per classi CSS
- **Console**: Apri DevTools per vedere errori API

## 🎉 Fatto!

Il frontend è pronto! Ora puoi:
- Personalizzare componenti
- Aggiungere nuove pagine
- Modificare styling
- Deploy in produzione

---

**Need help?** Check README.md per dettagli completi
