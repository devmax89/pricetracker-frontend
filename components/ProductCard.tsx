import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: string;
  image_url?: string;
  // ✅ AGGIUNGI QUESTI CAMPI
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
  // ✅ USA I PREZZI DALL'API invece di mock
  const newPrice = product.new_min_price 
    ? parseFloat(product.new_min_price) 
    : null;
  
  const usedPrice = product.used_min_price 
    ? parseFloat(product.used_min_price) 
    : null;
  
  const discount = product.discount_percentage 
    ? Math.round(parseFloat(product.discount_percentage)) 
    : null;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col h-full">
      {/* Immagine prodotto - altezza fissa */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '200px'
        }}
        className="flex items-center justify-center text-white"
      >
        <div className="text-7xl">🎮</div>
      </div>

      {/* Contenuto card */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Nome prodotto */}
        <h3 className="font-bold text-base mb-3 text-gray-900 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Badge categoria */}
        <div className="mb-4">
          <span className="inline-block text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 uppercase font-semibold">
            {product.category === 'gpu' ? 'GPU' : 
             product.category === 'cpu' ? 'CPU' :
             product.category === 'console' ? 'CONSOLE' :
             product.category === 'monitor' ? 'MONITOR' : 'TECH'}
          </span>
        </div>

        {/* Sezione prezzi */}
        <div className="flex-1">
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
            <div className="mb-4">
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

        {/* Bottoni */}
        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <Link 
            href={`/products/${product.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 rounded-lg font-semibold text-sm transition"
          >
            Vedi Nuovo
          </Link>
          <Link 
            href={`/products/${product.id}#usato`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-2.5 rounded-lg font-semibold text-sm transition border-2 border-gray-300"
          >
            Vedi Usato
          </Link>
        </div>
      </div>
    </div>
  );
}