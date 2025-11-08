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

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [prices, setPrices] = useState<Prices | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productData, pricesData, historyData] = await Promise.all([
          getProduct(id),
          getProductPrices(id),
          getProductHistory(id, 30)
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
  }, [id]);

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

  // Prepare chart data
  const chartData = {
    labels: history.map((h: any) => new Date(h.scraped_at).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Prezzo (€)',
        data: history.map((h: any) => parseFloat(h.price)),
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
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

  const minPrice = prices?.new && prices.new.length > 0 
    ? Math.min(...prices.new.map((p: PriceItem) => parseFloat(p.price)))
    : null;

  const minUsedPrice = prices?.used && prices.used.length > 0
    ? Math.min(...prices.used.map((p: UsedListing) => parseFloat(p.price)))
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Torna ai prodotti
          </Link>
        </div>

        {/* Header Prodotto */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Immagine */}
            <div 
              style={{
                background: hasImage ? '#f3f4f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '400px'
              }}
              className="rounded-lg flex items-center justify-center relative"
            >
              {hasImage ? (
                <div className="relative w-full h-[400px]">
                  <Image
                    src={product.image_url!}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-8"
                    priority
                  />
                </div>
              ) : (
                <div className="text-9xl text-white">{fallbackIcon}</div>
              )}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                {product.name}
              </h1>
              
              <div className="flex gap-3 mb-6">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold uppercase text-sm">
                  {product.category}
                </span>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
                  {product.brand}
                </span>
              </div>

              {minPrice && (
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Miglior prezzo NUOVO</p>
                  <p className="text-5xl font-bold text-blue-600">
                    €{minPrice.toFixed(2)}
                  </p>
                </div>
              )}

              {minUsedPrice && (
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Miglior prezzo USATO</p>
                  <p className="text-4xl font-bold text-green-600">
                    €{minUsedPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Storico Prezzi */}
        {history.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6">Storico Prezzi</h2>
            <div style={{ height: '300px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Prezzi Retailers */}
        {prices && prices.new && prices.new.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold mb-6">Prezzi NUOVI</h2>
            <div className="space-y-4">
              {prices.new.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-lg">{item.retailer}</p>
                    {item.availability !== undefined && (
                      <p className={`text-sm ${item.availability ? 'text-green-600' : 'text-red-600'}`}>
                        {item.availability ? '✅ Disponibile' : '❌ Non disponibile'}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      €{parseFloat(item.price).toFixed(2)}
                    </p>
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Vai al sito →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Annunci Usato */}
        {prices && prices.used && prices.used.length > 0 && (
          <div id="usato" className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Annunci USATO</h2>
            <div className="space-y-4">
              {prices.used.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      {item.location && <span>📍 {item.location}</span>}
                      {item.condition && <span>🔧 {item.condition}</span>}
                      {item.published_date && <span>📅 {new Date(item.published_date).toLocaleDateString('it-IT')}</span>}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-green-600">
                      €{parseFloat(item.price).toFixed(2)}
                    </p>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Vedi annuncio →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}