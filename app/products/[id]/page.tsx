'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProduct, getProductPrices, getProductHistory } from '@/lib/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: string;
}

interface PriceItem {
  retailer: string;
  price: string;
  availability?: boolean;
  url?: string;
  scraped_at: string;
}

interface UsedListing {
  title: string;
  price: string;
  location: string;
  condition: string;
  url: string;
  scraped_at: string;
}

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [newPrices, setNewPrices] = useState<PriceItem[]>([]);
  const [usedPrices, setUsedPrices] = useState<UsedListing[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState(30);
  const [alertPrice, setAlertPrice] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productData, pricesData, historyData] = await Promise.all([
          getProduct(id),
          getProductPrices(id),
          getProductHistory(id, timeFilter)
        ]);

        setProduct(productData);
        setNewPrices(pricesData.new || []);
        setUsedPrices(pricesData.used || []);
        setHistory(historyData);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching product data:', err);
        setError(err.message || 'Errore nel caricamento del prodotto');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, timeFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-sm md:text-base">Caricamento prodotto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 md:p-8 max-w-md w-full">
          <p className="text-red-600 font-medium text-center text-sm md:text-base">
            ❌ {error || 'Prodotto non trovato'}
          </p>
        </div>
      </div>
    );
  }

  // Calcola statistiche
  const prices = newPrices.map(p => parseFloat(p.price));
  const currentPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;

  const minUsedPrice = usedPrices.length > 0 
    ? Math.min(...usedPrices.map(u => parseFloat(u.price)))
    : 0;

  // Chart data
  const chartData = {
    labels: history.map((h: any) => new Date(h.scraped_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })),
    datasets: [
      {
        label: 'Prezzo',
        data: history.map((h: any) => parseFloat(h.price)),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return '€' + context.parsed.y.toFixed(2);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value: any) {
            return '€' + value;
          }
        }
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-8 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        {/* Breadcrumbs - Hidden on small mobile */}
        <nav className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6 hidden sm:block">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/#${product.category}`} className="text-blue-600 hover:underline capitalize">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        {/* Product Header - MOBILE RESPONSIVE */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-8 mb-4 md:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* Immagine Prodotto - RESPONSIVE */}
            <div>
              <div 
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '16px',
                  minHeight: '200px'
                }}
                className="md:min-h-[400px] aspect-square flex items-center justify-center text-white"
              >
                <div className="text-7xl md:text-9xl">🎮</div>
              </div>
            </div>

            {/* Info Prodotto - RESPONSIVE */}
            <div>
              <h1 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-900">
                {product.name}
              </h1>
              
              {/* Badge Meta - RESPONSIVE */}
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                <span className="bg-gray-100 px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold text-gray-700">
                  🎮 Scheda Video
                </span>
                <span className="bg-gray-100 px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold text-gray-700">
                  ⚡ Alta Gamma
                </span>
                <span className="bg-gray-100 px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold text-gray-700">
                  📊 {newPrices.length} negozi tracciati
                </span>
              </div>

              {/* Box Prezzi - STACK VERTICALMENTE SU MOBILE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                {/* Prezzo Nuovo */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 md:p-6 text-white">
                  <div className="text-xs md:text-sm opacity-90 mb-1 md:mb-2">Miglior Prezzo Nuovo</div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">
                    €{currentPrice > 0 ? currentPrice.toFixed(0) : 'N/D'}
                  </div>
                  {currentPrice > 0 && maxPrice > currentPrice && (
                    <div className="text-xs md:text-sm opacity-90 flex items-center gap-1">
                      <span>↓</span>
                      <span>€{(maxPrice - currentPrice).toFixed(0)} (-{(((maxPrice - currentPrice) / maxPrice) * 100).toFixed(0)}%) negli ultimi 30gg</span>
                    </div>
                  )}
                </div>

                {/* Prezzo Usato */}
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 md:p-6 text-white">
                  <div className="text-xs md:text-sm opacity-90 mb-1 md:mb-2">Miglior Prezzo Usato</div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">
                    €{minUsedPrice > 0 ? minUsedPrice.toFixed(0) : 'N/D'}
                  </div>
                  {usedPrices.length > 0 && (
                    <div className="text-xs md:text-sm opacity-90 flex items-center gap-1">
                      <span className="text-green-200">↑</span>
                      <span className="truncate">{usedPrices[0].location} • {usedPrices[0].condition}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Alert Box - STACK VERTICALMENTE SU MOBILE */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 md:p-4">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
                  <span className="text-xl md:text-2xl text-center md:text-left">🔔</span>
                  <input
                    type="text"
                    placeholder="Avvisami sotto €..."
                    value={alertPrice}
                    onChange={(e) => setAlertPrice(e.target.value)}
                    className="flex-1 px-3 py-2 md:px-4 md:py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 placeholder-gray-600 text-gray-900 text-sm md:text-base"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold transition text-sm md:text-base">
                    Crea Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - 2 COLONNE SU MOBILE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-3 md:p-6 text-center">
            <div className="text-xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">€{currentPrice.toFixed(0)}</div>
            <div className="text-xs md:text-sm text-gray-600">Prezzo Attuale</div>
          </div>
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-3 md:p-6 text-center">
            <div className="text-xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">€{maxPrice.toFixed(0)}</div>
            <div className="text-xs md:text-sm text-gray-600">Prezzo Massimo</div>
          </div>
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-3 md:p-6 text-center">
            <div className="text-xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">€{minPrice.toFixed(0)}</div>
            <div className="text-xs md:text-sm text-gray-600">Prezzo Minimo</div>
          </div>
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-3 md:p-6 text-center">
            <div className="text-xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">€{avgPrice.toFixed(0)}</div>
            <div className="text-xs md:text-sm text-gray-600">Media 90gg</div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-0 mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-bold flex items-center gap-2">
              <span>📊</span> 
              <span className="hidden sm:inline">Storico Prezzi {timeFilter > 0 && `(${timeFilter} giorni)`}</span>
              <span className="sm:hidden">Storico ({timeFilter}gg)</span>
            </h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setTimeFilter(7)}
                className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base ${
                  timeFilter === 7
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                7gg
              </button>
              <button
                onClick={() => setTimeFilter(30)}
                className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base ${
                  timeFilter === 30
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                30gg
              </button>
              <button
                onClick={() => setTimeFilter(90)}
                className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base ${
                  timeFilter === 90
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                90gg
              </button>
            </div>
          </div>
          <div className="h-64 md:h-80">
            {history.length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm md:text-base">
                Nessun dato storico disponibile
              </div>
            )}
          </div>
        </div>

        {/* Prices Grid - STACK VERTICALMENTE SU MOBILE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Prezzi Nuovo */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
              <span>🆕</span> Prezzi Nuovo
            </h2>
            <div className="space-y-3">
              {newPrices.length > 0 ? (
                newPrices.map((item, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-gray-200 rounded-lg md:rounded-xl p-3 md:p-4 hover:border-blue-600 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2 md:mb-3">
                      <div className="font-semibold text-gray-900 text-sm md:text-base">{item.retailer}</div>
                      <div className="text-xl md:text-2xl font-bold text-blue-600">€{parseFloat(item.price).toFixed(2)}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-0 pt-2 md:pt-3 border-t border-gray-200">
                      <span className="text-xs md:text-sm text-green-600 font-semibold">✓ Disponibile</span>
                      <a
                        href={item.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition text-center"
                      >
                        Vai allo Store →
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-6 md:py-8 text-sm md:text-base">Nessun prezzo disponibile</p>
              )}
            </div>
          </div>

          {/* Prezzi Usato */}
          <div id="usato" className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
              <span>♻️</span> Prezzi Usato (Subito.it)
            </h2>
            <div className="space-y-3">
              {usedPrices.length > 0 ? (
                usedPrices.map((listing, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-gray-200 rounded-lg md:rounded-xl p-3 md:p-4 hover:border-green-600 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 mb-1 text-sm md:text-base line-clamp-2">{listing.title}</div>
                        <div className="text-xs md:text-sm text-gray-600">
                          📍 {listing.location} • 
                          <span className="ml-1 bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                            {listing.condition}
                          </span>
                        </div>
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-green-600 flex-shrink-0">
                        €{parseFloat(listing.price).toFixed(0)}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 sm:gap-0 pt-2 md:pt-3 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
                        Pubblicato: {new Date(listing.scraped_at).toLocaleDateString('it-IT')}
                      </span>
                      <a
                        href={listing.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition text-center"
                      >
                        Vedi Annuncio →
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-6 md:py-8 text-sm md:text-base">Nessun annuncio usato disponibile</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}