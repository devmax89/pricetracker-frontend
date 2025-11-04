import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-blue-600">Occhio</span>
              <span className="text-red-600">AlPrezzo</span>
            </span>
            <span className="text-sm text-gray-500">.com</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/#categorie" className="text-gray-700 hover:text-blue-600 font-medium">
              Categorie
            </Link>
            <Link href="/#offerte" className="text-gray-700 hover:text-blue-600 font-medium">
              Offerte
            </Link>
            <Link href="/#come-funziona" className="text-gray-700 hover:text-blue-600 font-medium">
              Come Funziona
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
