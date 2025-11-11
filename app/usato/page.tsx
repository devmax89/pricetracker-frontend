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
}

export default function UsatoPage() {
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

  // Filtra prodotti con usato disponibile e calcola risparmio
  const productsWithUsed = products
    .map(product => {
      const newPrice = product.new_min_price ? parseFloat(product.new_min_price) : 0;
      const usedPrice = product.used_min_price ? parseFloat(product.used_min_price) : 0;
      const savings = newPrice && usedPrice ? newPrice - usedPrice : 0;
      const savingsPercent = newPrice && usedPrice ? ((newPrice - usedPrice) / newPrice) * 100 : 0;
      
      return { ...product, savings, savingsPercent, newPrice, usedPrice };
    })
    .filter(p => p.usedPrice > 0 && p.savings > 0) // Solo prodotti con usato disponibile
    .sort((a, b) => b.savings - a.savings); // Ordina per risparmio decrescente

  // Filtra per categoria
  const filteredProducts = selectedCategory === 'all'
    ? productsWithUsed
    : productsWithUsed.filter(p => p.category.toLowerCase() === selectedCategory);

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

  // Calcola statistiche
  const totalSavings = productsWithUsed.reduce((sum, p) => sum + p.savings, 0);
  const avgSavings = productsWithUsed.length > 0 ? totalSavings / productsWithUsed.length : 0;
  const maxSavings = productsWithUsed.length > 0 ? productsWithUsed[0].savings : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl md:text-7xl mb-6">💰</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Risparmia con l'Usato
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Confronta prezzi tra nuovo e usato. Include annunci privati da Subito.it 
            e prodotti ricondizionati/come nuovo dai retailer.
          </p>
          
          {/* Stats */}
          {!loading && productsWithUsed.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="text-3xl font-bold">{productsWithUsed.length}</div>
                <div className="text-sm text-white/80">Prodotti Usato</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="text-3xl font-bold">€{Math.round(maxSavings)}</div>
                <div className="text-sm text-white/80">Risparmio Max</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="text-3xl font-bold">€{Math.round(avgSavings)}</div>
                <div className="text-sm text-white/80">Risparmio Medio</div>
              </div>
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
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💰 Tutti ({productsWithUsed.length})
            </button>
            {categories.map(cat => {
              const count = productsWithUsed.filter(p => p.category.toLowerCase() === cat).length;
              if (count === 0) return null;
              
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-green-600 text-white'
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
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">Caricamento prodotti usato...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              {/* Top 3 Maggiori Risparmi */}
              {filteredProducts.length >= 3 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <span>🏆</span>
                    Top 3 Maggiori Risparmi
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.slice(0, 3).map((product, idx) => {
                      const hasImage = product.image_url && product.image_url.trim() !== '';
                      const fallbackIcon = categoryIcons[product.category.toLowerCase()] || '🔧';

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
                        >
                          {/* Badge Posizione */}
                          <div className={`absolute top-2 md:top-4 left-2 md:left-4 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-xl font-bold shadow-lg ${
                            idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                            idx === 1 ? 'bg-gray-300 text-gray-700' :
                            'bg-orange-400 text-orange-900'
                          }`}>
                            {idx + 1}
                          </div>

                          {/* Badge Risparmio */}
                          <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10 bg-green-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-bold shadow-lg text-xs md:text-base">
                            €{Math.round(product.savings)}
                          </div>

                          {/* Immagine */}
                          <div
                            style={{
                              background: hasImage ? '#ffffff' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              minHeight: '140px'
                            }}
                            className="md:min-h-[250px] flex items-center justify-center relative"
                          >
                            {hasImage ? (
                              <div className="relative w-full h-[140px] md:h-[250px]">
                                <Image
                                  src={product.image_url!}
                                  alt={product.name}
                                  fill
                                  sizes="(max-width: 768px) 50vw, 33vw"
                                  className="object-contain p-3 md:p-6 group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="text-5xl md:text-8xl text-white">{fallbackIcon}</div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-3 md:p-6">
                            <h3 className="font-bold text-sm md:text-lg mb-2 md:mb-3 text-gray-900 line-clamp-2 min-h-[2.5rem] md:min-h-[3.5rem] group-hover:text-green-600 transition-colors">
                              {product.name}
                            </h3>

                            <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
                              <div>
                                <span className="text-gray-500 block mb-1">Nuovo da</span>
                                <span className="text-base md:text-xl font-bold text-gray-700">
                                  €{product.newPrice.toFixed(0)}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500 block mb-1">Usato da</span>
                                <span className="text-base md:text-xl font-bold text-green-600">
                                  €{product.usedPrice.toFixed(0)}
                                </span>
                              </div>
                            </div>

                            <div className="mt-2 md:mt-3 text-center bg-green-50 py-1.5 md:py-2 rounded-lg">
                              <span className="text-green-700 font-bold text-xs md:text-base">
                                Risparmi {Math.round(product.savingsPercent)}%
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Altri Prodotti Usato */}
              {filteredProducts.length > 3 && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <span>♻️</span>
                    Altri Prodotti Usato
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.slice(3).map((product) => {
                      const hasImage = product.image_url && product.image_url.trim() !== '';
                      const fallbackIcon = categoryIcons[product.category.toLowerCase()] || '🔧';

                      return (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                        >
                          {/* Badge Risparmio */}
                          <div className="absolute top-3 right-3 z-10 bg-green-600 text-white px-3 py-1 rounded-lg font-bold shadow-md text-sm">
                            -€{Math.round(product.savings)}
                          </div>

                          {/* Immagine */}
                          <div
                            style={{
                              background: hasImage ? '#ffffff' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                            <h3 className="font-bold text-sm mb-2 text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-green-600 transition-colors">
                              {product.name}
                            </h3>

                            <div className="flex items-center justify-between text-xs mb-2">
                              <span className="text-gray-500">Nuovo: €{product.newPrice.toFixed(0)}</span>
                            </div>

                            <div className="text-xl font-bold text-green-600">
                              €{product.usedPrice.toFixed(0)}
                            </div>

                            <div className="text-xs text-green-600 font-semibold mt-1">
                              Risparmi {Math.round(product.savingsPercent)}%
                            </div>
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
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Nessun prodotto usato disponibile
              </h2>
              <p className="text-gray-600 mb-8">
                {selectedCategory === 'all' 
                  ? 'Al momento non ci sono prodotti usato disponibili. Torna più tardi!'
                  : `Nessun prodotto usato nella categoria ${selectedCategory.toUpperCase()}`
                }
              </p>
              <Link
                href="/"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition"
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
              <div className="text-5xl mb-4">♻️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Usato da Privati</h3>
              <p className="text-gray-600">
                Annunci usato da Subito.it con dettagli su condizione, 
                località e prezzo. Risparmia acquistando da privati.
              </p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Ricondizionati</h3>
              <p className="text-gray-600">
                Prodotti ricondizionati e "come nuovo" da retailer come LDLC. 
                Garanzia inclusa con prezzi ridotti.
              </p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Massimo Risparmio</h3>
              <p className="text-gray-600">
                Risparmia fino al 70% rispetto al prezzo nuovo. 
                Perfetto per chi vuole qualità a prezzi accessibili.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trova la Tua Occasione!
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Crea un alert di prezzo per essere notificato quando un prodotto 
            usato scende sotto la tua soglia ideale.
          </p>
          <Link
            href="/alert"
            className="inline-block bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition shadow-lg hover:shadow-xl"
          >
            🔔 Crea Alert di Prezzo
          </Link>
        </div>
      </section>
    </div>
  );
}