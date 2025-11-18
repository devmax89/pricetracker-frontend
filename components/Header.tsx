'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Funzione per resettare filtri quando si clicca sul logo
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Naviga alla home pulita (senza filtri)
    router.push('/');
    
    // Se siamo già in homepage, forza il refresh dello stato
    if (pathname === '/') {
      window.location.href = '/';
    }
  };

  // Funzione per gestire click su Categorie
  const handleCategoriesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        scrollToCategories();
      }, 300);
    } else {
      scrollToCategories();
    }
  };

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categorie');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    setTimeout(() => {
      const viewAllButton = document.querySelector('[data-open-categories]') as HTMLButtonElement;
      if (viewAllButton) {
        viewAllButton.click();
      }
    }, 500);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Cliccabile per tornare alla home pulita */}
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            title="Torna alla homepage"
          >
            <span className="text-2xl font-bold">
              <span className="text-blue-600">Occhio</span>
              <span className="text-red-600">AlPrezzo</span>
            </span>
            <span className="text-sm text-gray-500">.com</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={handleCategoriesClick}
              className="text-gray-700 hover:text-blue-600 font-medium transition cursor-pointer"
            >
              Categorie
            </button>
            <Link href="/offerte" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Offerte
            </Link>
            <Link href="/usato" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Usato
            </Link>
            <Link href="/alert" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Alert
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Blog
            </Link>
            <Link href="/come-funziona" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Come Funziona
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 space-y-3">
            <button
              onClick={handleCategoriesClick}
              className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              📂 Categorie
            </button>
            <Link
              href="/offerte"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              🔥 Offerte
            </Link>
            <Link
              href="/usato"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              💰 Usato
            </Link>
            <Link
              href="/alert"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              🔔 Alert
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              📚 Blog
            </Link>
            <Link
              href="/come-funziona"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              ❓ Come Funziona
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}