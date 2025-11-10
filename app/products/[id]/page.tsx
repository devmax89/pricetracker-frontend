'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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
  image_url?: string;
}

interface PriceItem {
  retailer: string;
  price: string;
  availability?: boolean;
  url?: string;
}

interface UsedListing {
  title: string;
  price: string;
  location?: string;
  condition?: string;
  url: string;
  published_date?: string;
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

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [prices, setPrices] = useState<Prices | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<7 | 30 | 90>(90);
  
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

  // 🆕 Aggrega prezzi per giorno (un punto per giorno)
  const aggregateDailyPrices = (historyData: any[]): DailyPrice[] => {
    const dailyMap = new Map<string, number[]>();

    // Raggruppa per data (YYYY-MM-DD)
    historyData.forEach((item) => {
      const date = new Date(item.scraped_at).toLocaleDateString('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      const price = parseFloat(item.price);

      if (!isNaN(price)) {
        if (!dailyMap.has(date)) {
          dailyMap.set(date, []);
        }
        dailyMap.get(date)!.push(price);
      }
    });

    // Calcola min/avg/max per ogni giorno
    const dailyPrices: DailyPrice[] = [];
    dailyMap.forEach((prices, date) => {
      dailyPrices.push({
        date,
        minPrice: Math.min(...prices),
        avgPrice: prices.reduce((a, b) => a + b, 0) / prices.length,
        maxPrice: Math.max(...prices),
        count: prices.length
      });
    });

    // Ordina per data crescente
    return dailyPrices.sort((a, b) => {
      const dateA = a.date.split('/').reverse().join('');
      const dateB = b.date.split('/').reverse().join('');
      return dateA.localeCompare(dateB);
    });
  };

  // Handle Price Alert Submission
  const handleAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const price = parseFloat(alertPrice);
    if (isNaN(price) || price <= 0) {
      setAlertError('Inserisci un prezzo valido');
      return;
    }
    
    if (!alertEmail || !alertEmail.includes('@')) {
      setAlertError('Inserisci un indirizzo email valido');
      return;
    }

    setAlertSubmitting(true);
    setAlertError(null);

    try {
      // TODO: Implement actual API call when backend is ready
      // const response = await createPriceAlert(id, price, alertEmail);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAlertSuccess(true);
      setAlertPrice('');
      setAlertEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setAlertSuccess(false), 5000);
      
    } catch (err: any) {
      setAlertError(err.message || 'Errore nella creazione dell\'alert');
    } finally {
      setAlertSubmitting(false);
    }
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

  // Icone fallback
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
  const fallbackIcon = categoryIcons[product.category.toLowerCase()] || '🔧';
  const hasImage = product.image_url && product.image_url.trim() !== '';

  // 🆕 Usa dati aggregati per giorno
  const dailyPrices = aggregateDailyPrices(history);
  
  // Calculate price stats from DAILY aggregated data
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

  // 🆕 Chart data con UN PUNTO PER GIORNO (prezzo minimo giornaliero)
  const chartData = {
    labels: dailyPrices.map(d => {
      // Formato: "8 nov"
      const [day, month] = d.date.split('/');
      const months = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
      return `${parseInt(day)} ${months[parseInt(month) - 1]}`;
    }),
    datasets: [
      {
        label: 'Prezzo (€)',
        data: dailyPrices.map(d => d.minPrice), // 🆕 USA PREZZO MINIMO GIORNALIERO
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Torna ai prodotti
        </Link>

        {/* Product Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Immagine */}
            <div 
              style={{
                background: hasImage ? '#f3f4f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '300px'
              }}
              className="rounded-lg flex items-center justify-center relative"
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
                <div className="text-7xl md:text-9xl text-white">{fallbackIcon}</div>
              )}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {product.name}
              </h1>
              
              <div className="flex gap-3 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 md:px-4 py-1 md:py-2 rounded-lg font-semibold uppercase text-xs md:text-sm">
                  {product.category}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 md:px-4 py-1 md:py-2 rounded-lg font-medium text-xs md:text-sm">
                  {product.brand}
                </span>
              </div>

              {/* 🆕 Miglior Prezzo NUOVO - Mobile Optimized */}
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

              {/* 🆕 Miglior Prezzo USATO - Mobile Optimized */}
              {minUsedPrice && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 font-semibold mb-1 uppercase text-xs md:text-sm">Miglior Prezzo Usato</p>
                      <p className="text-3xl md:text-4xl font-bold text-green-600">
                        €{minUsedPrice.toFixed(2)}
                      </p>
                    </div>
                    {prices?.used && prices.used.length > 0 && (
                      <span className="bg-green-600 text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap">
                        ♻️ {prices.used.length}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Storico Prezzi + Stats + Price Alert */}
        {dailyPrices.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Grafico + Stats (2 colonne) */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                <span>📈</span>
                Storico Prezzi
              </h2>
              
              {/* Tabs periodo */}
              <div className="flex gap-2 mb-4 md:mb-6">
                <button 
                  onClick={() => setSelectedPeriod(90)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition ${
                    selectedPeriod === 90 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  90gg
                </button>
                <button 
                  onClick={() => setSelectedPeriod(30)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition ${
                    selectedPeriod === 30 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  30gg
                </button>
                <button 
                  onClick={() => setSelectedPeriod(7)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition ${
                    selectedPeriod === 7 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  7gg
                </button>
              </div>

              <div style={{ height: '250px', minHeight: '250px' }} className="md:h-[300px]">
                <Line data={chartData} options={chartOptions} />
              </div>

              {/* Stats sotto il grafico */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                {/* Prezzo Attuale */}
                {currentPrice && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Attuale</p>
                    <p className="text-xl md:text-2xl font-bold text-blue-600">€{currentPrice.toFixed(0)}</p>
                  </div>
                )}

                {/* Prezzo Minimo */}
                {minHistoryPrice && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Minimo</p>
                    <p className="text-xl md:text-2xl font-bold text-green-600">€{minHistoryPrice.toFixed(0)}</p>
                  </div>
                )}

                {/* Prezzo Massimo */}
                {maxHistoryPrice && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Massimo</p>
                    <p className="text-xl md:text-2xl font-bold text-red-600">€{maxHistoryPrice.toFixed(0)}</p>
                  </div>
                )}

                {/* Media */}
                {avgHistoryPrice && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Media {selectedPeriod}gg</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-700">€{avgHistoryPrice.toFixed(0)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Price Alert (1 colonna) */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl shadow-lg p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl md:text-3xl">🔔</span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Crea Alert</h3>
              </div>
              
              <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
                Ti avviseremo via email quando il prezzo scende sotto la soglia che scegli.
              </p>

              {alertSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-3 md:px-4 py-2 md:py-3 rounded-lg mb-4 text-sm">
                  <p className="font-semibold">✅ Alert creato!</p>
                  <p className="text-xs mt-1">Riceverai un'email quando il prezzo scenderà.</p>
                </div>
              ) : (
                <form onSubmit={handleAlertSubmit} className="space-y-3 md:space-y-4">
                  {/* Prezzo Target */}
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                      Prezzo Target (€)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">€</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={alertPrice}
                        onChange={(e) => setAlertPrice(e.target.value)}
                        placeholder={minPrice ? minPrice.toFixed(0) : "850"}
                        className="w-full pl-8 pr-3 md:pr-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition text-sm md:text-base"
                        required
                      />
                    </div>
                    {minPrice && (
                      <p className="text-xs text-gray-500 mt-1">
                        Attuale: €{minPrice.toFixed(2)}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                      La tua Email
                    </label>
                    <input
                      type="email"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      placeholder="tuaemail@esempio.com"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition text-sm md:text-base"
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {alertError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm">
                      {alertError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={alertSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    {alertSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                        <span>Creazione...</span>
                      </>
                    ) : (
                      <>
                        <span>🔔</span>
                        <span>Crea Alert</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Info aggiuntiva */}
              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-yellow-300">
                <p className="text-xs text-gray-600">
                  💡 <strong>Suggerimento:</strong> Imposta il prezzo leggermente sopra il minimo storico.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Prezzi Nuovo */}
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
                    <p className="font-semibold text-base md:text-lg">{item.retailer}</p>
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

        {/* Prezzi Usato */}
        {prices && prices.used && prices.used.length > 0 && (
          <div id="usato" className="bg-white rounded-xl shadow-lg p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
              <span className="text-green-600">♻️</span>
              Prezzi Usato (Subito.it)
            </h2>
            <div className="grid gap-3 md:gap-4">
              {prices.used.map((item, idx) => (
                <div key={idx} className="p-4 md:p-5 bg-green-50 rounded-lg hover:bg-green-100 transition border-2 border-transparent hover:border-green-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base md:text-lg mb-2">{item.title}</h3>
                      <div className="flex flex-wrap gap-2 text-xs md:text-sm text-gray-600">
                        {item.location && (
                          <span className="flex items-center gap-1">
                            📍 {item.location}
                          </span>
                        )}
                        {item.condition && (
                          <span className="bg-gray-200 px-2 py-1 rounded text-xs font-medium">
                            {item.condition}
                          </span>
                        )}
                        {item.published_date && (
                          <span className="text-xs">
                            {new Date(item.published_date).toLocaleDateString('it-IT')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="text-2xl md:text-3xl font-bold text-green-600 block">
                        €{parseFloat(item.price).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 rounded-lg font-semibold text-xs md:text-sm transition"
                  >
                    Vedi Annuncio →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}