'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import CategorySection from '@/components/CategorySection';
import { getProducts, getCategories } from '@/lib/api';

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

  // Gestisce il submit della ricerca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aggiorna URL con query param
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/');
    }
  };

  // Gestisce il cambio input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Resetta ricerca
  const clearSearch = () => {
    setSearchQuery('');
    // Mantieni categoria se attiva
    if (activeCategory) {
      router.push(`/?category=${activeCategory}`);
    } else {
      router.push('/');
    }
  };

  // Gestisce click su categoria
  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    // Mantieni ricerca se attiva
    const params = new URLSearchParams();
    params.set('category', categorySlug);
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    router.push(`/?${params.toString()}`);
  };

  // Rimuove filtro categoria
  const clearCategory = () => {
    setActiveCategory('');
    // Mantieni ricerca se attiva
    if (searchQuery) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trova il Miglior Prezzo Tech in Italia
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            Nuovo e Usato • Storico Prezzi • Alert Automatici
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInput}
                placeholder="Cerca RTX 4090, PS5, iPhone 15..."
                className="w-full px-6 py-4 rounded-full text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
                style={{ 
                  paddingRight: searchQuery ? '140px' : '120px',
                  backgroundColor: '#ffffff',
                  color: '#111827',
                }}
              />
              
              {/* Clear button (solo se c'è testo) */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-28 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  title="Cancella ricerca"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              {/* Search button */}
              <button
                type="submit"
                className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-colors shadow-lg"
              >
                Cerca
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Categories - NUOVO COMPONENTE */}
      <CategorySection
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        loading={loading}
      />

      {/* Products Section */}
      <section id="offerte" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        {/* Header con risultati ricerca e categoria */}
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
            
            {/* Contatore risultati */}
            {(searchQuery || activeCategory) && (
              <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full whitespace-nowrap">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'prodotto trovato' : 'prodotti trovati'}
              </div>
            )}
          </div>

          {/* Active Filters Badges */}
          {(searchQuery || activeCategory) && (
            <div className="flex flex-wrap gap-2">
              {activeCategory && (
                <button
                  onClick={clearCategory}
                  className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-200 transition"
                >
                  <span>Categoria: {categories.find(c => c.slug === activeCategory)?.name_plural}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition"
                >
                  <span>Cerca: &quot;{searchQuery}&quot;</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {(searchQuery || activeCategory) && (
                <button
                  onClick={() => {
                    clearSearch();
                    clearCategory();
                  }}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
                >
                  Rimuovi tutti i filtri
                </button>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
            <p className="mt-6 text-gray-600 font-medium">Caricamento prodotti...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 font-semibold text-lg">❌ {error}</p>
          </div>
        )}

        {/* No Results State (quando c'è ricerca/categoria ma 0 risultati) */}
        {!loading && !error && (searchQuery || activeCategory) && filteredProducts.length === 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-yellow-800 font-semibold text-xl mb-2">
              Nessun prodotto trovato
              {searchQuery && ` per "${searchQuery}"`}
              {activeCategory && ` nella categoria ${categories.find(c => c.slug === activeCategory)?.name_plural}`}
            </p>
            <p className="text-yellow-700 mb-6">
              Prova a {searchQuery ? 'cercare con parole chiave diverse' : 'selezionare un\'altra categoria'} o rimuovi i filtri
            </p>
            <div className="flex gap-3 justify-center">
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-semibold transition"
                >
                  Rimuovi ricerca
                </button>
              )}
              {activeCategory && (
                <button
                  onClick={clearCategory}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-semibold transition"
                >
                  Rimuovi categoria
                </button>
              )}
              <button
                onClick={() => {
                  clearSearch();
                  clearCategory();
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold transition"
              >
                Mostra tutti i prodotti
              </button>
            </div>
          </div>
        )}

        {/* Empty State (nessun prodotto nel DB) */}
        {!loading && !error && !searchQuery && !activeCategory && products.length === 0 && (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-center">
            <p className="text-gray-600 font-semibold">⚠️ Nessun prodotto disponibile</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

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