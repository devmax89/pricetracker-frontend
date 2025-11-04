'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api';

const categories = [
  { icon: '🎮', name: 'Schede Video', slug: 'gpu' },
  { icon: '🧠', name: 'Processori', slug: 'cpu' },
  { icon: '🕹️', name: 'Console', slug: 'console' },
  { icon: '💻', name: 'Laptop Gaming', slug: 'laptop' },
  { icon: '🖥️', name: 'Monitor', slug: 'monitor' },
  { icon: '⌨️', name: 'Periferiche', slug: 'periferiche' },
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        console.log('Products fetched:', data);
        setProducts(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Errore nel caricamento dei prodotti');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trova il Miglior Prezzo Tech in Italia
          </h1>
          <p className="text-xl mb-8 opacity-95">
            Il tuo radar sulle offerte tech • Nuovo e Usato • Storico Prezzi • Alert Automatici
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca RTX 4090, PS5, iPhone 15..."
                className="w-full px-6 py-4 text-lg rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition">
                Cerca
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categorie" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="bg-white rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-5xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-gray-900">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section id="offerte" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <span className="animate-pulse">🔥</span> Top Offerte Oggi
        </h2>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Caricamento prodotti...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium">❌ {error}</p>
            <p className="text-sm text-gray-600 mt-2">
              Verifica che l'API sia online: http://192.168.1.241:3000/api/health
            </p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800">⚠️ Nessun prodotto disponibile</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section id="come-funziona" className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Storico Prezzi</h3>
              <p className="text-gray-600">Visualizza l'andamento dei prezzi negli ultimi 90 giorni</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold mb-2">Alert Automatici</h3>
              <p className="text-gray-600">Ti avvisiamo quando il prezzo scende sotto la tua soglia</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🆕</div>
              <h3 className="text-xl font-semibold mb-2">Nuovo + Usato</h3>
              <p className="text-gray-600">Confronta prezzi tra nuovo e usato su Subito.it</p>
            </div>
            <div>
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Aggiornamenti Real-Time</h3>
              <p className="text-gray-600">Prezzi aggiornati ogni 2-6 ore da tutti i principali store</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
