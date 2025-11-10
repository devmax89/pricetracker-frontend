'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: string;
  image_url?: string;
  new_min_price?: string;
  new_max_price?: string;
  used_min_price?: string;
  discount_percentage?: string;
}

export default function OffertePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filtra e ordina per sconto (migliori offerte prime)
  const productsWithDiscounts = products
    .map(product => ({
      ...product,
      discountValue: product.discount_percentage 
        ? parseFloat(product.discount_percentage) 
        : 0
    }))
    .filter(p => p.discountValue > 0) // Solo prodotti con sconto
    .sort((a, b) => b.discountValue - a.discountValue); // Ordina per sconto decrescente

  // Filtra per categoria
  const filteredProducts = selectedCategory === 'all'
    ? productsWithDiscounts
    : productsWithDiscounts.filter(p => p.category.toLowerCase() === selectedCategory);

  // Categorie uniche
  const categories = Array.from(new Set(products.map(p => p.category.toLowerCase())));

  // Icone per categoria
  const categoryIcons: { [key: string]: string } = {
    'gpu': '🎮',
    'cpu': '🖥️',
    'console': '🎮',
    'monitor': '📺',
    'ssd': '💾',
    'motherboard': '🔌',
    'ram': '💿',
    'psu': '⚡',
    'cooling': '❄️',
    'case': '📦'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl md:text-7xl mb-6">🔥</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Migliori Offerte Tech
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            I prodotti con gli sconti più alti rispetto al prezzo massimo recente. 
            Aggiornato in tempo reale!
          </p>
          
          {/* Stats */}
          {!loading && (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="text-3xl font-bold">{productsWithDiscounts.length}</div>
                <div className="text-sm text-white/80">Offerte Attive</div>
              </div>
              {productsWithDiscounts.length > 0 && (
                <>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                    <div className="text-3xl font-bold">
                      -{Math.round(productsWithDiscounts[0].discountValue)}%
                    </div>
                    <div className="text-sm text-white/80">Sconto Massimo</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                    <div className="text-3xl font-bold">
                      {Math.round(
                        productsWithDiscounts.reduce((sum, p) => sum + p.discountValue, 0) / 
                        productsWithDiscounts.length
                      )}%
                    </div>
                    <div className="text-sm text-white/80">Sconto Medio</div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-[73px] z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              Filtra per:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔥 Tutte ({productsWithDiscounts.length})
            </button>
            {categories.map(cat => {
              const count = productsWithDiscounts.filter(p => p.category.toLowerCase() === cat).length;
              if (count === 0) return null;
              
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {categoryIcons[cat] || '🔧'} {cat.toUpperCase()} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
              <p className="mt-4 text-gray-600">Caricamento offerte...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              {/* Top 3 Deals - Large Cards */}
              {filteredProducts.length >= 3 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <span>🏆</span>
                    Top 3 Offerte del Momento
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {filteredProducts.slice(0, 3).map((product, idx) => {
                      const hasImage = product.image_url && product.image_url.trim() !== '';
                      const fallbackIcon = categoryIcons[product.category.toLowerCase()] || '🔧';
                      const newPrice = product.new_min_price 
                        ? parseFloat(product.new_min_price) 
                        : null;
                      const discount = Math.round(product.discountValue);

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
                        >
                          {/* Badge Posizione */}
                          <div className={`absolute top-4 left-4 z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg ${
                            idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                            idx === 1 ? 'bg-gray-300 text-gray-700' :
                            'bg-orange-400 text-orange-900'
                          }`}>
                            {idx + 1}
                          </div>

                          {/* Badge Sconto */}
                          <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg text-lg">
                            -{discount}%
                          </div>

                          {/* Immagine */}
                          <div
                            style={{
                              background: hasImage ? '#f3f4f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              minHeight: '250px'
                            }}
                            className="flex items-center justify-center relative"
                          >
                            {hasImage ? (
                              <div className="relative w-full h-[250px]">
                                <Image
                                  src={product.image_url!}
                                  alt={product.name}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="text-8xl text-white">{fallbackIcon}</div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-6">
                            <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2 min-h-[3.5rem] group-hover:text-red-600 transition-colors">
                              {product.name}
                            </h3>

                            <div className="flex items-baseline justify-between">
                              {newPrice && (
                                <div>
                                  <span className="text-sm text-gray-500 block mb-1">Prezzo attuale</span>
                                  <span className="text-3xl font-bold text-red-600">
                                    €{newPrice.toFixed(0)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Altre Offerte */}
              {filteredProducts.length > 3 && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <span>💎</span>
                    Altre Offerte
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.slice(3).map((product) => {
                      const hasImage = product.image_url && product.image_url.trim() !== '';
                      const fallbackIcon = categoryIcons[product.category.toLowerCase()] || '🔧';
                      const newPrice = product.new_min_price 
                        ? parseFloat(product.new_min_price) 
                        : null;
                      const discount = Math.round(product.discountValue);

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                          {/* Badge Sconto */}
                          <div className="absolute top-3 right-3 z-10 bg-red-600 text-white px-3 py-1 rounded-lg font-bold shadow-md text-sm">
                            -{discount}%
                          </div>

                          {/* Immagine */}
                          <div
                            style={{
                              background: hasImage ? '#f3f4f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              minHeight: '160px'
                            }}
                            className="flex items-center justify-center relative"
                          >
                            {hasImage ? (
                              <div className="relative w-full h-[160px]">
                                <Image
                                  src={product.image_url!}
                                  alt={product.name}
                                  fill
                                  sizes="(max-width: 768px) 50vw, 25vw"
                                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="text-5xl text-white">{fallbackIcon}</div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-4">
                            <h3 className="font-bold text-sm mb-2 text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-red-600 transition-colors">
                              {product.name}
                            </h3>

                            {newPrice && (
                              <div>
                                <span className="text-xs text-gray-500">da</span>
                                <div className="text-xl font-bold text-red-600">
                                  €{newPrice.toFixed(0)}
                                </div>
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Nessuna offerta al momento
              </h2>
              <p className="text-gray-600 mb-8">
                {selectedCategory === 'all' 
                  ? 'Torna più tardi per scoprire nuove offerte!'
                  : `Nessuna offerta nella categoria ${selectedCategory.toUpperCase()}`
                }
              </p>
              <Link
                href="/"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition"
              >
                Torna alla Homepage
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Aggiornamenti Real-Time</h3>
              <p className="text-gray-600">
                Gli sconti vengono calcolati confrontando il prezzo attuale con il massimo 
                degli ultimi 90 giorni.
              </p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Crea Alert</h3>
              <p className="text-gray-600">
                Non vuoi perdere l'occasione? Crea un alert di prezzo per ricevere 
                notifiche quando scende ancora!
              </p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Più Negozi</h3>
              <p className="text-gray-600">
                Confrontiamo Amazon, MediaWorld, LDLC, NextHS e AK Informatica 
                per trovare il prezzo migliore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Non Perdere le Prossime Offerte!
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Crea alert di prezzo per i prodotti che ti interessano 
            e ricevi notifiche quando il prezzo scende.
          </p>
          <Link
            href="/alert"
            className="inline-block bg-white text-red-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition shadow-lg hover:shadow-xl"
          >
            🔔 Crea il Tuo Primo Alert
          </Link>
        </div>
      </section>
    </div>
  );
}