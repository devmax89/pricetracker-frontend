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
  used_min_price?: string;
}

export default function AlertPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

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

  // Filtra prodotti in base alla ricerca
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <section className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-7xl mb-6">🔔</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Crea Alert di Prezzo
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Non perdere mai più un'offerta! Ti avvisiamo via email quando il prezzo 
            del prodotto che desideri scende sotto la tua soglia.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="text-3xl font-bold">Gratis</div>
              <div className="text-sm text-white/80">100% Gratuito</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="text-3xl font-bold">Istantaneo</div>
              <div className="text-sm text-white/80">Email immediata</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="text-3xl font-bold">Affidabile</div>
              <div className="text-sm text-white/80">Check ogni ora</div>
            </div>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Come Funziona
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Scegli il Prodotto
              </h3>
              <p className="text-gray-600">
                Cerca il prodotto tech che vuoi monitorare dalla lista qui sotto 
                o dalla homepage.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Imposta il Prezzo
              </h3>
              <p className="text-gray-600">
                Nella pagina del prodotto, crea un alert inserendo il prezzo target 
                e la tua email.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Ricevi Notifica
              </h3>
              <p className="text-gray-600">
                Quando il prezzo scende sotto la tua soglia, riceverai un'email 
                istantanea con il link all'offerta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cerca Prodotto per Alert */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Cerca un Prodotto da Monitorare
            </h2>
            <p className="text-gray-600 text-lg">
              Seleziona un prodotto dalla lista per creare il tuo primo alert
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca prodotto (es. RTX 4090, PS5, iPhone...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-200 transition"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
              <p className="mt-4 text-gray-600">Caricamento prodotti...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.slice(0, 12).map((product) => {
                const hasImage = product.image_url && product.image_url.trim() !== '';
                const fallbackIcon = categoryIcons[product.category.toLowerCase()] || '🔧';
                const minPrice = product.new_min_price 
                  ? parseFloat(product.new_min_price) 
                  : null;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Immagine */}
                    <div
                      style={{
                        background: hasImage ? '#f3f4f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="text-6xl text-white">{fallbackIcon}</div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-sm mb-2 text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-yellow-600 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        {minPrice ? (
                          <div>
                            <span className="text-xs text-gray-500 block">da</span>
                            <span className="text-xl font-bold text-yellow-600">
                              €{minPrice.toFixed(0)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">
                            Prezzo in aggiornamento
                          </span>
                        )}

                        <div className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <span>🔔</span>
                          <span>Crea Alert</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600 text-lg">
                Nessun prodotto trovato per "{searchQuery}"
              </p>
            </div>
          )}

          {/* View All Products */}
          {!searchQuery && filteredProducts.length > 12 && (
            <div className="text-center mt-12">
              <Link
                href="/"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-xl transition shadow-lg hover:shadow-xl"
              >
                Vedi Tutti i Prodotti →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Perché Usare gli Alert?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Risparmia
              </h3>
              <p className="text-gray-600 text-sm">
                Compra al momento giusto quando il prezzo scende. 
                Risparmio medio del 15-30%.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Risparmia Tempo
              </h3>
              <p className="text-gray-600 text-sm">
                Non serve controllare i prezzi ogni giorno. 
                Ci pensiamo noi per te.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Precisione
              </h3>
              <p className="text-gray-600 text-sm">
                Imposta la tua soglia di prezzo ideale. 
                Ti avvisiamo solo quando conviene.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Privacy
              </h3>
              <p className="text-gray-600 text-sm">
                La tua email è al sicuro. 
                Nessuno spam, solo alert quando serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Domande Frequenti
          </h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-3">
                <span className="text-2xl">❓</span>
                Gli alert sono davvero gratuiti?
              </h3>
              <p className="text-gray-600 pl-11">
                Sì, completamente gratuiti! Non ci sono limiti al numero di alert 
                che puoi creare. Il servizio è e rimarrà sempre gratuito.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                Quanto velocemente ricevo la notifica?
              </h3>
              <p className="text-gray-600 pl-11">
                I prezzi vengono controllati ogni ora. Quando il prezzo scende sotto 
                la tua soglia, ricevi l'email entro 1 ora. Molto veloce!
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-3">
                <span className="text-2xl">📧</span>
                Riceverò spam o troppe email?
              </h3>
              <p className="text-gray-600 pl-11">
                Assolutamente no! Ricevi l'email SOLO quando il prezzo scende sotto 
                la soglia che hai impostato. Una volta notificato, l'alert si disattiva 
                automaticamente. Zero spam garantito.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-3">
                <span className="text-2xl">🔄</span>
                Posso creare più alert per lo stesso prodotto?
              </h3>
              <p className="text-gray-600 pl-11">
                Sì! Puoi creare alert diversi con soglie diverse. Ad esempio, un alert 
                a €900 e uno a €850 per lo stesso prodotto.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-3">
                <span className="text-2xl">🛒</span>
                Quali negozi monitorate?
              </h3>
              <p className="text-gray-600 pl-11">
                Monitoriamo i prezzi NEW da Amazon.it, MediaWorld, LDLC, NextHS e 
                AK Informatica. Gli alert funzionano solo sui prezzi nuovo (non usato).
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-3">
                <span className="text-2xl">❌</span>
                Posso cancellare un alert?
              </h3>
              <p className="text-gray-600 pl-11">
                Al momento gli alert si disattivano automaticamente dopo la notifica. 
                In futuro aggiungeremo un dashboard per gestire i tuoi alert attivi. 
                Stay tuned! 🚀
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto a Iniziare?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Scegli un prodotto qui sopra o torna alla homepage per esplorare 
            tutte le categorie disponibili.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-white text-yellow-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition shadow-lg hover:shadow-xl inline-block"
            >
              🏠 Torna alla Homepage
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-8 py-4 rounded-xl transition shadow-lg hover:shadow-xl"
            >
              🔔 Cerca Prodotto
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}