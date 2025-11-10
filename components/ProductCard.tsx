import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: string;
  image_url?: string;
  new_min_price?: string;
  new_avg_price?: string;
  new_max_price?: string;
  used_min_price?: string;
  used_avg_price?: string;
  used_count?: string;
  discount_percentage?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const newPrice = product.new_min_price 
    ? parseFloat(product.new_min_price) 
    : null;
  
  const usedPrice = product.used_min_price 
    ? parseFloat(product.used_min_price) 
    : null;
  
  const discount = product.discount_percentage 
    ? Math.round(parseFloat(product.discount_percentage)) 
    : null;

  // Determina quale immagine mostrare
  const hasImage = product.image_url && product.image_url.trim() !== '';
  
  // Icone di fallback per categoria
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

  return (
    <Link 
      href={`/products/${product.id}`}
      className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col h-full group"
    >
      {/* Immagine prodotto - Sfondo bianco SE c'è immagine, viola SE manca */}
      <div 
        style={{
          background: hasImage ? '#ffffff' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '200px'
        }}
        className="flex items-center justify-center relative overflow-hidden"
      >
        {hasImage ? (
          <div className="relative w-full h-[200px]">
            <Image
              src={product.image_url!}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback se l'immagine non carica -> torna al viola con icona
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && parent.parentElement) {
                  parent.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  parent.innerHTML = `<div class="text-7xl text-white">${fallbackIcon}</div>`;
                }
              }}
            />
          </div>
        ) : (
          <div className="text-7xl text-white group-hover:scale-110 transition-transform duration-300">{fallbackIcon}</div>
        )}
      </div>

      {/* Contenuto card */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Nome prodotto */}
        <h3 className="font-bold text-base mb-3 text-gray-900 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Badge categoria */}
        <div className="mb-4">
          <span className="inline-block text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 uppercase font-semibold">
            {product.category === 'gpu' ? 'GPU' : 
             product.category === 'cpu' ? 'CPU' :
             product.category === 'console' ? 'CONSOLE' :
             product.category === 'monitor' ? 'MONITOR' : 
             product.category.toUpperCase()}
          </span>
        </div>

        {/* Sezione prezzi */}
        <div className="flex-1 mb-4">
          {/* Prezzo NUOVO con badge sconto */}
          {newPrice && (
            <div className="flex justify-between items-center mb-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-semibold mb-1">Nuovo</span>
                <span className="text-2xl font-bold text-blue-600">
                  €{newPrice.toFixed(0)}
                </span>
              </div>
              {discount && discount > 0 && (
                <div className="bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
                  -{discount}%
                </div>
              )}
            </div>
          )}

          {/* Prezzo USATO */}
          {usedPrice && (
            <div className="mb-2">
              <span className="text-xs text-gray-500 uppercase font-semibold mb-1 block">
                Usato da
              </span>
              <span className="text-xl font-bold text-green-600">
                €{usedPrice.toFixed(0)}
              </span>
            </div>
          )}

          {/* Se non ci sono prezzi */}
          {!newPrice && !usedPrice && (
            <div className="text-gray-400 text-sm italic">
              Prezzi in aggiornamento...
            </div>
          )}
        </div>

        {/* Singolo bottone "Vedi Prezzi" */}
        <div className="pt-4 border-t border-gray-200">
          <div className="bg-blue-600 group-hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2">
            <span>Vedi Prezzi</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}