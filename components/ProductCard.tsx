import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: string;
  image_url?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Mock data per prezzi (in futuro prenderli dall'API)
  const newPrice = 899;
  const usedPrice = 750;
  const discount = 15;

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
            {product.category === 'gpu' ? 'NUOVO' : 'NUOVO'}
          </span>
        </div>

        {/* Sezione prezzi */}
        <div className="flex-1">
          {/* Prezzo NUOVO con badge sconto */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase font-semibold mb-1">Nuovo</span>
              <span className="text-2xl font-bold text-blue-600">€{newPrice}</span>
            </div>
            <div className="bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
              -{discount}%
            </div>
          </div>

          {/* Prezzo USATO */}
          <div className="mb-4">
            <span className="text-xs text-gray-500 uppercase font-semibold mb-1 block">Usato da</span>
            <span className="text-xl font-bold text-green-600">€{usedPrice}</span>
          </div>
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