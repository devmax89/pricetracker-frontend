'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import CategorySection from '@/components/CategorySection';
import { getProducts, getCategories } from '@/lib/api';
import { getCategoryIcon, getCategoryLabel } from '@/lib/categories';
import StructuredData, { generateOrganizationSchema, generateWebSiteSchema } from '@/components/seo/StructuredData';

// Componente separato per gestire searchParams
function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Stato ricerca e categoria
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');

  // Carica prodotti e categorie all'avvio
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Errore nel caricamento dei dati');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filtra prodotti quando cambia la ricerca o categoria
  useEffect(() => {
    let filtered = [...products];
    
    // Filtro per categoria
    if (activeCategory) {
      filtered = filtered.filter(product => 
        product.category === activeCategory
      );
    }
    
    // Filtro per ricerca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => {
        const searchableText = [
          product.name,
          product.brand,
          product.model,
          product.category
        ].join(' ').toLowerCase();
        
        return searchableText.includes(query);
      });
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, activeCategory, products]);

  // ==========================================
  // SEZIONI DINAMICHE PER HOMEPAGE
  // ==========================================
  
  // 🔥 TOP 3 OFFERTE - Prodotti con sconto più alto
  const topDeals = products
    .map(p => ({
      ...p,
      discountValue: p.discount_percentage ? parseFloat(p.discount_percentage) : 0
    }))
    .filter(p => p.discountValue > 0)
    .sort((a, b) => b.discountValue - a.discountValue)
    .slice(0, 3);

  // ⚡ NUOVI ARRIVI - Ultimi 6 prodotti aggiunti (ordinati per ID desc)
  const newArrivals = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 6);

  // 💰 PIÙ CONVENIENTI USATO - Maggior risparmio tra nuovo e usato
  const bestUsedDeals = products
    .map(p => {
      const newPrice = p.new_min_price ? parseFloat(p.new_min_price) : 0;
      const usedPrice = p.used_min_price ? parseFloat(p.used_min_price) : 0;
      const savings = newPrice && usedPrice ? newPrice - usedPrice : 0;
      return { ...p, savings };
    })
    .filter(p => p.savings > 50) // Risparmio minimo €50
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 6);

  // 🎮 PER CATEGORIA - Top 4 per ogni categoria principale
  const categoryGroups: { [key: string]: any[] } = {};
  const mainCategories = ['gpu', 'cpu', 'console', 'monitor', 'smartphone', 'notebook'];
  
  mainCategories.forEach(catSlug => {
    categoryGroups[catSlug] = products
      .filter(p => p.category === catSlug)
      .sort((a, b) => {
        // Ordina per sconto se disponibile, altrimenti per ID
        const discountA = a.discount_percentage ? parseFloat(a.discount_percentage) : 0;
        const discountB = b.discount_percentage ? parseFloat(b.discount_percentage) : 0;
        return discountB - discountA;
      })
      .slice(0, 4);
  });

  // 🌟 TRENDING - Random 8 prodotti (in futuro: più visti/cliccati)
  const trending = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  // Gestisce il submit della ricerca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/');
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (activeCategory) {
      router.push(`/?category=${activeCategory}`);
    } else {
      router.push('/');
    }
  };

  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    
    // Se categorySlug è vuoto, torna alla home pulita
    if (!categorySlug) {
      router.push('/');
      return;
    }
    
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    params.set('category', categorySlug);
    router.push(`/?${params.toString()}`);
  };

  // Se c'è ricerca o categoria attiva, mostra risultati filtrati classici
  const showFilteredView = searchQuery || activeCategory;

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={generateOrganizationSchema()} />
      <StructuredData data={generateWebSiteSchema()} />
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
        className="text-white py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-lg md:text-2xl text-white mb-2">
              Confronta prezzi tech in tempo reale
            </p>
            <p className="text-sm md:text-lg text-purple-200">
              Nuovo e Usato • Storico Prezzi • Alert Personalizzati
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInput}
                placeholder="Cerca prodotto, marca o modello..."
                className="w-full px-6 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-2xl pr-32"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#111827',
                }}
              />
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-32 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  title="Cancella ricerca"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-colors shadow-lg"
              >
                Cerca
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <CategorySection
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        loading={loading}
      />

      {/* SEZIONI DINAMICHE */}
      {!showFilteredView && !loading && (
        <>
          {/* TOP 3 OFFERTE */}
          {topDeals.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                  <span className="text-3xl md:text-4xl">🔥</span>
                  <span className="hidden sm:inline">Top 3 Offerte del Giorno</span>
                  <span className="sm:hidden">Top 3 Offerte</span>
                </h2>
                <Link 
                  href="/offerte"
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 md:gap-2 text-sm md:text-base"
                >
                  <span className="hidden sm:inline">Vedi tutte</span>
                  <span className="sm:hidden">Tutte</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-3 md:gap-6">
                {topDeals.map((product, idx) => {
                  const hasImage = product.image_url && product.image_url.trim() !== '';
                  const fallbackIcon = getCategoryIcon(product.category);
                  const discount = Math.round(product.discountValue);
                  const newPrice = product.new_min_price ? parseFloat(product.new_min_price) : null;

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
                    >
                      <div className={`absolute top-2 left-2 md:top-4 md:left-4 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-xl font-bold shadow-lg ${
                        idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                        idx === 1 ? 'bg-gray-300 text-gray-700' :
                        'bg-orange-400 text-orange-900'
                      }`}>
                        {idx + 1}
                      </div>

                      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-red-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl font-bold shadow-lg text-sm md:text-base">
                        -{discount}%
                      </div>

                      <div
                        style={{
                          background: hasImage ? '#ffffff' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        }}
                        className="flex items-center justify-center relative h-[150px] md:h-[220px]"
                      >
                        {hasImage ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={product.image_url!}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-contain p-3 md:p-6 group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="text-5xl md:text-8xl text-white">{fallbackIcon}</div>
                        )}
                      </div>

                      <div className="p-3 md:p-6">
                        <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 text-gray-900 line-clamp-2 min-h-[2.5rem] md:min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>

                        <div className="flex items-center justify-between">
                          {newPrice ? (
                            <div>
                              <p className="text-xs md:text-sm text-gray-500 mb-0.5 md:mb-1">Miglior prezzo</p>
                              <p className="text-lg md:text-2xl font-bold text-blue-600">€{newPrice.toFixed(2)}</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-xs md:text-sm text-gray-500">Prezzo non disponibile</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* NUOVI ARRIVI */}
          {newArrivals.length > 0 && (
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-8 md:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                    <span className="text-3xl md:text-4xl">⚡</span>
                    Nuovi Arrivi
                  </h2>
                </div>

                <div className="overflow-x-auto pb-4 -mx-4 px-4">
                  <div className="flex gap-3 md:gap-4" style={{ width: 'max-content' }}>
                    {newArrivals.map((product) => (
                      <div key={product.id} className="w-[220px] md:w-[280px]">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* PIÙ CONVENIENTI USATO */}
          {bestUsedDeals.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                  <span className="text-3xl md:text-4xl">💰</span>
                  <span className="hidden sm:inline">Più Convenienti Usato</span>
                  <span className="sm:hidden">Usato Conveniente</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {bestUsedDeals.map((product) => {
                  const hasImage = product.image_url && product.image_url.trim() !== '';
                  const fallbackIcon = getCategoryIcon(product.category);

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
                    >
                      <div className="absolute top-3 right-3 z-10 bg-green-600 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
                        Risparmi €{product.savings.toFixed(0)}
                      </div>

                      <div
                        style={{
                          background: hasImage ? '#ffffff' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          minHeight: '180px'
                        }}
                        className="flex items-center justify-center relative"
                      >
                        {hasImage ? (
                          <div className="relative w-full h-[180px]">
                            <Image
                              src={product.image_url!}
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 50vw, 33vw"
                              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="text-6xl text-white">{fallbackIcon}</div>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-sm mb-3 text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-green-600 transition-colors">
                          {product.name}
                        </h3>

                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <p className="text-gray-500">Nuovo da</p>
                            <p className="font-bold text-gray-700">€{parseFloat(product.new_min_price).toFixed(0)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500">Usato da</p>
                            <p className="font-bold text-green-600">€{parseFloat(product.used_min_price).toFixed(0)}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* PER CATEGORIA */}
          {mainCategories.map(catSlug => {
            const categoryProducts = categoryGroups[catSlug];
            if (!categoryProducts || categoryProducts.length === 0) return null;

            const catInfo = categories.find(c => c.slug === catSlug);
            const catIcon = getCategoryIcon(catSlug);
            const catName = getCategoryLabel(catSlug);

            return (
              <section key={catSlug} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                    <span className="text-3xl md:text-4xl">{catIcon}</span>
                    {catName}
                  </h2>
                  <button
                    onClick={() => handleCategoryClick(catSlug)}
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 text-sm md:text-base"
                  >
                    <span className="hidden sm:inline">Vedi tutti</span>
                    <span className="sm:hidden">Tutti</span>
                    {catInfo && <span className="hidden sm:inline">({catInfo.product_count})</span>}
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}

          {/* TRENDING */}
          {trending.length > 0 && (
            <section className="bg-gradient-to-br from-purple-100 to-pink-100 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                    <span className="text-3xl md:text-4xl">🌟</span>
                    <span className="hidden sm:inline">Trending Questa Settimana</span>
                    <span className="sm:hidden">Trending</span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {trending.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* VISTA FILTRATA */}
      {showFilteredView && (
        <section id="offerte" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                {searchQuery ? (
                  <>
                    <span>🔍</span>
                    <span className="break-all">Risultati per &quot;{searchQuery}&quot;</span>
                  </>
                ) : activeCategory ? (
                  <>
                    <span>{categories.find(c => c.slug === activeCategory)?.icon}</span>
                    {categories.find(c => c.slug === activeCategory)?.name_plural}
                  </>
                ) : (
                  <>
                    <span className="animate-pulse">🔥</span>
                    Top Offerte Oggi
                  </>
                )}
              </h2>
              
              {(searchQuery || activeCategory) && (
                <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full whitespace-nowrap">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'prodotto' : 'prodotti'}
                </div>
              )}
            </div>
          </div>

          {(searchQuery || activeCategory) && (
            <div className="mb-6 flex items-center gap-3 flex-wrap">
              {activeCategory && (
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  <span>{categories.find(c => c.slug === activeCategory)?.icon}</span>
                  <span>{categories.find(c => c.slug === activeCategory)?.name_plural}</span>
                  <button
                    onClick={() => {
                      setActiveCategory('');
                      router.push(searchQuery ? `/?search=${searchQuery}` : '/');
                    }}
                    className="ml-1 hover:text-blue-600 hover:scale-110 transition-transform"
                    title="Rimuovi filtro categoria"
                  >
                    ✕
                  </button>
                </div>
              )}
              
              {searchQuery && (
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  <span>🔍</span>
                  <span>&quot;{searchQuery}&quot;</span>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      router.push(activeCategory ? `/?category=${activeCategory}` : '/');
                    }}
                    className="ml-1 hover:text-purple-600 hover:scale-110 transition-transform"
                    title="Rimuovi ricerca"
                  >
                    ✕
                  </button>
                </div>
              )}
              
              {searchQuery && activeCategory && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('');
                    router.push('/');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900 underline hover:no-underline transition-all"
                >
                  🗑️ Cancella tutti i filtri
                </button>
              )}
            </div>
          )}

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
              <p className="mt-6 text-gray-600 font-medium">Caricamento prodotti...</p>
            </div>
          )}

          {error && !loading && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
              <p className="text-red-600 font-semibold">❌ {error}</p>
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (searchQuery || activeCategory) && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
              <p className="text-yellow-700 font-semibold mb-2">🔍 Nessun prodotto trovato</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('');
                  router.push('/');
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Torna alla homepage
              </button>
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Features Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Storico Prezzi</h3>
              <p className="text-gray-600">
                Tracciamo i prezzi nel tempo per aiutarti a comprare al momento giusto
              </p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-bold mb-2">Alert Automatici</h3>
              <p className="text-gray-600">
                Ricevi notifiche quando il prezzo scende sotto la tua soglia
              </p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-4">🆚</div>
              <h3 className="text-xl font-bold mb-2">Nuovo vs Usato</h3>
              <p className="text-gray-600">
                Confronta prezzi nuovo dai retailer e usato da Subito.it
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}

// Componente principale con Suspense
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
          <p className="mt-6 text-gray-600 font-medium">Caricamento...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}