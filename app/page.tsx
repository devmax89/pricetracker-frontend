'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api';

const categories = [
  { icon: '🎮', name: 'Schede Video', slug: 'gpu', desc: 'RTX 4090, RX 7900 XT' },
  { icon: '🧠', name: 'Processori', slug: 'cpu', desc: 'Ryzen 9, Intel i9' },
  { icon: '🕹️', name: 'Console', slug: 'console', desc: 'PS5, Xbox Series X' },
  { icon: '💻', name: 'Laptop Gaming', slug: 'laptop', desc: 'ROG, Legion' },
  { icon: '🖥️', name: 'Monitor', slug: 'monitor', desc: '144Hz, 4K, OLED' },
  { icon: '⌨️', name: 'Periferiche', slug: 'periferiche', desc: 'Mouse, Tastiere' },
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
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Title ridotto */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trova il Miglior Prezzo Tech in Italia
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-95">
            Nuovo e Usato • Storico Prezzi • Alert Automatici
          </p>
          
          {/* Search bar stile mockup (bianca) */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca RTX 4090, PS5, iPhone 15..."
                className="w-full px-6 py-4 text-base rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl bg-white"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg text-sm">
                Cerca
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="bg-white rounded-2xl p-6 text-center cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="text-5xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">{cat.name}</h3>
              <p className="text-xs text-gray-500">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section id="offerte" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="animate-pulse">🔥</span> Top Offerte Oggi
        </h2>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
            <p className="mt-6 text-gray-600 font-medium">Caricamento prodotti...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 font-semibold text-lg">❌ {error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
            <p className="text-yellow-800 font-semibold">⚠️ Nessun prodotto disponibile</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features - Testo più scuro */}
      <section id="come-funziona" className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Storico Prezzi</h3>
              <p className="text-gray-700 text-sm">Visualizza l'andamento dei prezzi negli ultimi 90 giorni</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Alert Automatici</h3>
              <p className="text-gray-700 text-sm">Ti avvisiamo quando il prezzo scende</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🆕</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Nuovo + Usato</h3>
              <p className="text-gray-700 text-sm">Confronta prezzi nuovo e usato</p>
            </div>
            <div>
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Real-Time</h3>
              <p className="text-gray-700 text-sm">Aggiornamenti ogni 2-6 ore</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}