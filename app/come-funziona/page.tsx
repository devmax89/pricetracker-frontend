'use client';

import { useState, useEffect } from 'react';

interface Stats {
  totalProducts: number;
  totalRetailers: number;
  totalCategories: number;
  lastUpdate: string;
}

export default function ComeFunzionaPage() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalRetailers: 0,
    totalCategories: 0,
    lastUpdate: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.241:3000/api';
        
        // Fetch products and categories
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE}/products`),
          fetch(`${API_BASE}/categories`)
        ]);
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        setStats({
          totalProducts: productsData.count || 0,
          totalRetailers: 4, // Amazon, MediaWorld, LDLC, Subito
          totalCategories: categoriesData.count || 0,
          lastUpdate: new Date().toLocaleDateString('it-IT')
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback values
        setStats({
          totalProducts: 34,
          totalRetailers: 4,
          totalCategories: 6,
          lastUpdate: new Date().toLocaleDateString('it-IT')
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
        className="text-white py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Come Funziona OcchioAlPrezzo
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8">
            Monitoriamo i prezzi tech per te, 24 ore su 24. <br/>
            Confrontiamo nuovo e usato per farti risparmiare.
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-white/30 rounded w-48"></div>
              </div>
            ) : (
              <p className="text-lg font-semibold">
                🎯 Oltre <span className="text-3xl font-bold">{stats.totalProducts}</span> prodotti tracciati
              </p>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          È Semplice, in 3 Passaggi
        </h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              1
            </div>
            <div className="flex-1 bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 flex items-center gap-3">
                <span className="text-4xl">🔍</span>
                Cerca il Prodotto
              </h3>
              <p className="text-gray-600 text-lg">
                Usa la barra di ricerca o naviga per categoria (GPU, CPU, Console, Monitor...). 
                Abbiamo già tracciato i prodotti tech più popolari e richiesti.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              2
            </div>
            <div className="flex-1 bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 flex items-center gap-3">
                <span className="text-4xl">📊</span>
                Confronta i Prezzi
              </h3>
              <p className="text-gray-600 text-lg">
                Vedi in tempo reale i prezzi da Amazon, MediaWorld e LDLC per il nuovo. 
                Confronta con gli annunci usato da Subito.it. Visualizza lo storico prezzi 
                con grafici interattivi per capire quando conviene comprare.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              3
            </div>
            <div className="flex-1 bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 flex items-center gap-3">
                <span className="text-4xl">💰</span>
                Risparmia!
              </h3>
              <p className="text-gray-600 text-lg">
                Clicca su "Vedi Nuovo" per acquistare dai retailer, oppure "Vedi Usato" 
                per sfogliare gli annunci di privati. Imposta alert di prezzo per essere 
                notificato quando il prezzo scende sotto la tua soglia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Cosa Offriamo
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Scraping Automatico
              </h3>
              <p className="text-gray-600">
                I nostri bot scansionano Amazon, MediaWorld, LDLC e Subito.it ogni 6-12 ore 
                per aggiornarti sui prezzi in tempo reale.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Storico Prezzi
              </h3>
              <p className="text-gray-600">
                Grafici interattivi che mostrano l'andamento dei prezzi nel tempo. 
                Scopri quando conviene comprare analizzando trend e fluttuazioni.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Alert di Prezzo
              </h3>
              <p className="text-gray-600">
                Imposta la tua soglia di prezzo ideale e ricevi una notifica email 
                quando il prodotto raggiunge quel prezzo.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-6xl mb-4">🆚</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Nuovo vs Usato
              </h3>
              <p className="text-gray-600">
                Confronta i prezzi del nuovo dai retailer con gli annunci usato 
                da privati. Calcolo automatico del risparmio potenziale.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-6xl mb-4">🔥</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Top Offerte
              </h3>
              <p className="text-gray-600">
                Sezione dedicata alle migliori offerte del momento, con evidenza 
                degli sconti più interessanti e dei prezzi storici più bassi.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 text-center hover:shadow-xl transition">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Mobile-Friendly
              </h3>
              <p className="text-gray-600">
                Interfaccia completamente responsive. Cerca e confronta prezzi 
                comodamente dal tuo smartphone ovunque tu sia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Domande Frequenti
        </h2>

        <div className="space-y-6">
          {/* FAQ 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-3">
              <span className="text-2xl">❓</span>
              È davvero gratis?
            </h3>
            <p className="text-gray-600 pl-11">
              Sì! OcchioAlPrezzo è completamente gratuito. Guadagniamo attraverso 
              commissioni affiliate quando acquisti tramite i nostri link, ma il 
              servizio di tracking prezzi è 100% gratuito per te.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-3">
              <span className="text-2xl">🔄</span>
              Quanto spesso vengono aggiornati i prezzi?
            </h3>
            <p className="text-gray-600 pl-11">
              I prezzi dei retailer (Amazon, MediaWorld, LDLC) vengono aggiornati ogni 
              6-12 ore. Gli annunci usato da Subito.it sono controllati quotidianamente. 
              Questo garantisce dati sempre freschi e affidabili.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-3">
              <span className="text-2xl">🛒</span>
              Posso comprare direttamente su OcchioAlPrezzo?
            </h3>
            <p className="text-gray-600 pl-11">
              No, siamo un comparatore di prezzi. Ti mostriamo dove trovare il miglior 
              prezzo, poi ti reindirizziamo al sito del venditore (Amazon, MediaWorld, 
              Subito, ecc.) per completare l'acquisto in sicurezza.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-3">
              <span className="text-2xl">📧</span>
              Come funzionano gli alert di prezzo?
            </h3>
            <p className="text-gray-600 pl-11">
              Inserisci la tua email e il prezzo target sulla pagina del prodotto. 
              Quando il prezzo scende sotto la tua soglia, ricevi automaticamente una 
              notifica. Puoi cancellare l'alert in qualsiasi momento.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-3">
              <span className="text-2xl">🎮</span>
              Quali prodotti tracciate?
            </h3>
            <p className="text-gray-600 pl-11">
              Attualmente monitoriamo: schede video (GPU), processori (CPU), console, 
              monitor gaming e periferiche. Aggiungiamo costantemente nuovi prodotti 
              in base alle richieste degli utenti.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              I miei dati sono al sicuro?
            </h3>
            <p className="text-gray-600 pl-11">
              Assolutamente! Utilizziamo solo il tuo indirizzo email per gli alert 
              (se li attivi). Non condividiamo mai i tuoi dati con terze parti e puoi 
              cancellare il tuo account in qualsiasi momento.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
        className="text-white py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto a Risparmiare?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Inizia subito a confrontare i prezzi e scopri quanto puoi risparmiare 
            sul tuo prossimo acquisto tech!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition shadow-xl"
            >
              Vai alla Homepage
            </a>
            <a 
              href="/#offerte"
              className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition border-2 border-white shadow-xl"
            >
              Vedi Top Offerte
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-10 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">{stats.totalProducts}+</div>
                <div className="text-sm text-gray-600">Prodotti Tracciati</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">{stats.totalRetailers}</div>
                <div className="text-sm text-gray-600">Retailer Monitorati</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Monitoraggio Attivo</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Gratuito</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}