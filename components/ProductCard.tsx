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
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 h-48 flex items-center justify-center text-white text-6xl">
          🎮
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg mb-2 text-gray-900">{product.name}</h3>
          <div className="flex gap-2 mb-4">
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
              {product.brand}
            </span>
            <span className="text-sm bg-blue-100 px-3 py-1 rounded-full text-blue-700 capitalize">
              {product.category}
            </span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">Vedi Prezzi</span>
            <span className="text-blue-600 font-semibold">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
