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
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Trova il Miglior Prezzo Tech in Italia
          </h1>
          <p className="text-xl mb-10 opacity-95">
            Nuovo e Usato • Storico Prezzi • Alert Automatici
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca RTX 4090, PS5, iPhone 15..."
                className="w-full px-6 py-5 text-lg rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-2xl"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-semibold transition shadow-lg">
                Cerca
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="bg-white rounded-2xl p-8 text-center cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="text-6xl mb-4">{cat.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-bold mb-10 flex items-center gap-3">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-xl font-bold mb-3">Storico Prezzi</h3>
              <p className="text-gray-600">Visualizza l'andamento dei prezzi negli ultimi 90 giorni</p>
            </div>
            <div>
              <div className="text-6xl mb-6">🔔</div>
              <h3 className="text-xl font-bold mb-3">Alert Automatici</h3>
              <p className="text-gray-600">Ti avvisiamo quando il prezzo scende</p>
            </div>
            <div>
              <div className="text-6xl mb-6">🆕</div>
              <h3 className="text-xl font-bold mb-3">Nuovo + Usato</h3>
              <p className="text-gray-600">Confronta prezzi nuovo e usato</p>
            </div>
            <div>
              <div className="text-6xl mb-6">⚡</div>
              <h3 className="text-xl font-bold mb-3">Real-Time</h3>
              <p className="text-gray-600">Aggiornamenti ogni 2-6 ore</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
