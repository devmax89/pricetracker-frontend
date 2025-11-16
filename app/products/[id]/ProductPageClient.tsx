'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProduct, getProductPrices, getProductHistory, createPriceAlert } from '@/lib/api';
import { getCategoryLabel, getCategoryIcon } from '@/lib/categories';
import StructuredData, { generateProductSchema, generateBreadcrumbSchema } from '@/components/seo/StructuredData';
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
  image_url?: string;
}

interface PriceItem {
  retailer: string;
  price: string;
  availability?: boolean;
  url?: string;
  condition?: string;
}

interface UsedListing {
  title: string;
  price: string;
  location?: string;
  condition?: string;
  url: string;
  published_date?: string;
  source?: string;
  grading?: string;
  discount_percentage?: number;
  original_price?: string;
}

interface Prices {
  new: PriceItem[];
  used: UsedListing[];
}

interface DailyPrice {
  date: string;
  minPrice: number;
  avgPrice: number;
  maxPrice: number;
  count: number;
}

export default function ProductPageClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [prices, setPrices] = useState<Prices | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<7 | 30 | 90>(30);
  
  // Price Alert State
  const [alertPrice, setAlertPrice] = useState<string>('');
  const [alertEmail, setAlertEmail] = useState<string>('');
  const [alertSubmitting, setAlertSubmitting] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productData, pricesData, historyData] = await Promise.all([
          getProduct(id),
          getProductPrices(id),
          getProductHistory(id, selectedPeriod)
        ]);

        setProduct(productData);
        setPrices(pricesData);
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
  }, [id, selectedPeriod]);

  // Aggregate daily prices
  const aggregateDailyPrices = (historyData: any[]): DailyPrice[] => {
    const dailyMap = new Map<string, number[]>();
    
    historyData.forEach((entry) => {
      const date = new Date(entry.scraped_at).toISOString().split('T')[0];
      const price = parseFloat(entry.price);
      
      if (!dailyMap.has(date)) {
        dailyMap.set(date, []);
      }
      dailyMap.get(date)!.push(price);
    });
    
    return Array.from(dailyMap.entries())
      .map(([date, prices]) => ({
        date,
        minPrice: Math.min(...prices),
        avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length,
        maxPrice: Math.max(...prices),
        count: prices.length
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  // Handle Price Alert Submit
  const handleAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setAlertSubmitting(true);
    setAlertError(null);
    
    try {
      await createPriceAlert(id, parseFloat(alertPrice), alertEmail);
      
      setAlertSuccess(true);
      setAlertPrice('');
      setAlertEmail('');
      
      setTimeout(() => setAlertSuccess(false), 5000);
      
    } catch (err: any) {
      setAlertError(err.message || 'Errore nella creazione dell\'alert');
    } finally {
      setAlertSubmitting(false);
    }
  };

  // Helper to extract grading
  const extractGrading = (gradingFull?: string): string | null => {
    if (!gradingFull) return null;
    const match = gradingFull.match(/([ROBN]{4})/);
    return match ? match[1] : null;
  };

  // Check if MediaWorld Ricondizionati
  const isMediaWorldRicondizionati = (item: UsedListing): boolean => {
    return item.source === 'MediaWorld Ricondizionati';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Caricamento prodotto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
          <p className="text-red-600 font-medium text-center">❌ {error || 'Prodotto non trovato'}</p>
          <Link href="/" className="block mt-4 text-center text-blue-600 hover:underline">
            ← Torna alla homepage
          </Link>
        </div>
      </div>
    );
  }

  const fallbackIcon = getCategoryIcon(product.category);
  const hasImage = product.image_url && product.image_url.trim() !== '';

  // Daily aggregated data
  const dailyPrices = aggregateDailyPrices(history);
  
  // Price stats
  const priceValues = dailyPrices.map(d => d.minPrice);
  const currentPrice = priceValues.length > 0 ? priceValues[priceValues.length - 1] : null;
  const minHistoryPrice = priceValues.length > 0 ? Math.min(...priceValues) : null;
  const maxHistoryPrice = priceValues.length > 0 ? Math.max(...priceValues) : null;
  const avgHistoryPrice = priceValues.length > 0 
    ? priceValues.reduce((a, b) => a + b, 0) / priceValues.length 
    : null;

  // Current best prices
  const minPrice = prices?.new && prices.new.length > 0 
    ? Math.min(...prices.new.map((p: PriceItem) => parseFloat(p.price)))
    : null;

  const minUsedPrice = prices?.used && prices.used.length > 0
    ? Math.min(...prices.used.map((p: UsedListing) => parseFloat(p.price)))
    : null;

  // Chart data
  const chartData = {
    labels: dailyPrices.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('it-IT', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Prezzo Minimo Giornaliero',
        data: dailyPrices.map(d => d.minPrice),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const dayData = dailyPrices[context.dataIndex];
            return [
              `Min: €${dayData.minPrice.toFixed(2)}`,
              `Media: €${dayData.avgPrice.toFixed(2)}`,
              `Max: €${dayData.maxPrice.toFixed(2)}`,
              `Rilevazioni: ${dayData.count}`
            ];
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
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={generateProductSchema(product)} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: getCategoryLabel(product.category), url: `/?category=${product.category}` },
        { name: product.name, url: `/products/${product.id}` }
      ])} />

      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-4 md:mb-6">
            <Link href="/" className="text-blue-600 hover:underline text-sm md:text-base">
              ← Torna ai prodotti
            </Link>
          </div>

          {/* Product Header */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              {/* Image */}
              <div 
                className="bg-white rounded-lg flex items-center justify-center relative"
                style={{ minHeight: '300px' }}
              >
                {hasImage ? (
                  <div className="relative w-full h-[300px] md:h-[400px]">
                    <Image
                      src={product.image_url!}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-4 md:p-8"
                      priority
                    />
                  </div>
                ) : (
                  <div className="text-7xl md:text-9xl text-gray-400">{fallbackIcon}</div>
                )}
              </div>

              {/* Info */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  {product.name}
                </h1>
                
                <div className="flex gap-3 mb-6">
                  <span className="bg-blue-100 text-blue-800 px-3 md:px-4 py-1 md:py-2 rounded-lg font-semibold uppercase text-xs md:text-sm">
                    {getCategoryLabel(product.category)}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 md:px-4 py-1 md:py-2 rounded-lg font-medium text-xs md:text-sm">
                    {product.brand}
                  </span>
                </div>

                {/* Best New Price */}
                {minPrice && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6 mb-3 md:mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 font-semibold mb-1 uppercase text-xs md:text-sm">Miglior Prezzo Nuovo</p>
                        <p className="text-3xl md:text-4xl font-bold text-blue-600">
                          €{minPrice.toFixed(2)}
                        </p>
                      </div>
                      {prices?.new && prices.new.length > 0 && (
                        <span className="bg-blue-600 text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap">
                          📊 {prices.new.length} {prices.new.length === 1 ? 'negozio' : 'negozi'}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Best Used Price */}
                {minUsedPrice && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 font-semibold mb-1 uppercase text-xs md:text-sm">Miglior Prezzo Usato</p>
                        <p className="text-2xl md:text-3xl font-bold text-green-600">
                          €{minUsedPrice.toFixed(2)}
                        </p>
                        {minPrice && (
                          <p className="text-xs md:text-sm text-green-600 mt-1">
                            Risparmio: €{(minPrice - minUsedPrice).toFixed(2)} ({Math.round(((minPrice - minUsedPrice) / minPrice) * 100)}%)
                          </p>
                        )}
                      </div>
                      {prices?.used && prices.used.length > 0 && (
                        <span className="bg-green-600 text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap">
                          ♻️ {prices.used.length} {prices.used.length === 1 ? 'annuncio' : 'annunci'}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Price Alert Form */}
          {minPrice && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-4 md:p-6 mb-6">
              <h3 className="text-lg md:text-xl font-bold mb-3 flex items-center gap-2">
                <span>🔔</span>
                Alert Prezzo
              </h3>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                Ricevi una notifica via email quando il prezzo scende sotto la tua soglia
              </p>

              {alertSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  ✅ Alert creato con successo! Ti avviseremo quando il prezzo scende.
                </div>
              )}

              {alertError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  ❌ {alertError}
                </div>
              )}

              <form onSubmit={handleAlertSubmit} className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prezzo desiderato (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max={minPrice}
                      value={alertPrice}
                      onChange={(e) => setAlertPrice(e.target.value)}
                      placeholder={`Max €${minPrice.toFixed(2)}`}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      placeholder="tua@email.com"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={alertSubmitting}
                  className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  {alertSubmitting ? 'Creazione...' : '🔔 Crea Alert'}
                </button>
              </form>
            </div>
          )}

          {/* Price History */}
          {dailyPrices.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-bold">📊 Storico Prezzi</h2>
                
                {/* Period Selector */}
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                  {([7, 30, 90] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 md:px-4 py-2 rounded-lg font-semibold text-xs md:text-sm transition-colors ${
                        selectedPeriod === period
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period} giorni
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Stats */}
              {minHistoryPrice && maxHistoryPrice && avgHistoryPrice && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <p className="text-xs md:text-sm text-gray-600 mb-1">Prezzo Minimo</p>
                    <p className="text-lg md:text-xl font-bold text-green-600">€{minHistoryPrice.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <p className="text-xs md:text-sm text-gray-600 mb-1">Prezzo Massimo</p>
                    <p className="text-lg md:text-xl font-bold text-red-600">€{maxHistoryPrice.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <p className="text-xs md:text-sm text-gray-600 mb-1">Prezzo Medio</p>
                    <p className="text-lg md:text-xl font-bold text-blue-600">€{avgHistoryPrice.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                    <p className="text-xs md:text-sm text-gray-600 mb-1">Prezzo Attuale</p>
                    <p className="text-lg md:text-xl font-bold text-gray-900">
                      {currentPrice ? `€${currentPrice.toFixed(2)}` : 'N/A'}
                    </p>
                  </div>
                </div>
              )}

              {/* Chart */}
              <div style={{ height: '300px' }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          )}

          {/* New Prices */}
          {prices && prices.new && prices.new.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                <span className="text-blue-600">🛒</span>
                Prezzi Nuovo
              </h2>
              <div className="space-y-3 md:space-y-4">
                {prices.new.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:justify-between md:items-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition border-2 border-transparent hover:border-blue-200 gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-semibold text-base md:text-lg">{item.retailer}</p>
                        
                        {item.condition === 'refurbished' && (
                          <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            ✨ COME NUOVO
                          </span>
                        )}
                      </div>
                      
                      {item.availability !== undefined && (
                        <p className={`text-xs md:text-sm ${item.availability ? 'text-green-600' : 'text-red-600'}`}>
                          {item.availability ? '✅ Disponibile' : '❌ Non disponibile'}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <span className="text-xl md:text-2xl font-bold text-blue-600">
                        €{parseFloat(item.price).toFixed(2)}
                      </span>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg font-semibold text-xs md:text-sm transition whitespace-nowrap"
                        >
                          Vai allo Store →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Used Prices */}
          {prices && prices.used && prices.used.length > 0 && (
            <div id="usato" className="bg-white rounded-xl shadow-lg p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                <span className="text-green-600">♻️</span>
                Annunci Usato e Ricondizionato
              </h2>
              <div className="space-y-3 md:space-y-4">
                {prices.used.map((item, idx) => {
                  const isMWRicond = isMediaWorldRicondizionati(item);
                  const grading = extractGrading(item.grading);
                  
                  return (
                    <div 
                      key={idx} 
                      className={`flex flex-col md:flex-row md:justify-between md:items-center p-3 md:p-4 bg-gray-50 rounded-lg transition border-2 gap-3 ${
                        isMWRicond 
                          ? 'hover:bg-orange-50 border-orange-200 hover:border-orange-300' 
                          : 'hover:bg-green-50 border-green-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex-1">
                        {isMWRicond ? (
                          <div className="mb-2">
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md font-medium">
                              🏪 MediaWorld Ricondizionati
                            </span>
                          </div>
                        ) : (
                          <div className="mb-2">
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
                              🏪 Subito.it
                            </span>
                          </div>
                        )}
                        
                        <p className="font-semibold text-sm md:text-base mb-2">{item.title}</p>
                        
                        <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                          {isMWRicond ? (
                            <>
                              {grading && (
                                <span className="bg-orange-500 text-white px-2 py-1 rounded-md font-bold">
                                  ✨ {grading}
                                </span>
                              )}
                              {item.discount_percentage && (
                                <span className="bg-red-500 text-white px-2 py-1 rounded-md font-bold">
                                  🏷️ -{item.discount_percentage}%
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              {item.location && <span className="text-gray-600">📍 {item.location}</span>}
                              {item.condition && <span className="text-gray-600">🔧 {item.condition}</span>}
                              {item.published_date && (
                                <span className="text-gray-600">
                                  📅 {new Date(item.published_date).toLocaleDateString('it-IT')}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-4">
                        <span className={`text-xl md:text-2xl font-bold ${
                          isMWRicond ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          €{parseFloat(item.price).toFixed(2)}
                        </span>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`px-4 md:px-6 py-2 rounded-lg font-semibold text-xs md:text-sm transition whitespace-nowrap text-white ${
                            isMWRicond 
                              ? 'bg-orange-600 hover:bg-orange-700' 
                              : 'bg-green-600 hover:bg-green-700'
                          }`}
                        >
                          {isMWRicond ? 'Vedi Offerta →' : 'Vedi annuncio →'}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}