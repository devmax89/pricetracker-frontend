'use client';

import { useState } from 'react';

interface Category {
  slug: string;
  name_plural: string;
  icon: string;
  product_count: number;
  is_featured: boolean;
}

interface CategorySectionProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (slug: string) => void;
  loading: boolean;
}

export default function CategorySection({
  categories,
  activeCategory,
  onCategoryClick,
  loading
}: CategorySectionProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Separa categorie featured e non-featured
  const heroCategories = categories
    .filter(cat => cat.is_featured)
    .slice(0, 7); // 🆕 Aumentato a 7 per includere notebook
  
  const secondaryCategories = categories.filter(cat => !cat.is_featured);

// Organizza categorie secondarie per gruppo
  const groupedCategories = {
    'Componenti PC': secondaryCategories.filter(cat => 
      ['schede-madri', 'ssd', 'ram', 'alimentatori', 'dissipatori', 'case-pc', 'pc-desktop'].includes(cat.slug)
    ),
    'Periferiche & Gaming': secondaryCategories.filter(cat =>
      ['mouse-tastiere', 'cuffie-audio', 'controller-gaming', 'webcam-streaming'].includes(cat.slug) // 🆕 Aggiunto mouse-tastiere
    ),
    'Mobile & Wearables': secondaryCategories.filter(cat =>
      ['smartwatch'].includes(cat.slug)
    ),
    'Casa & Intrattenimento': secondaryCategories.filter(cat =>
      ['tv-video', 'hifi-audio', 'elettrodomestici'].includes(cat.slug)
    )
  };

  return (
    <section id="categorie" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Esplora per Categoria</h2>
        
        {secondaryCategories.length > 0 && (
          <button
            onClick={() => setShowAllCategories(true)}
            data-open-categories="true"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 transition shadow-lg"
          >
            Vedi tutte ({categories.length})
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      
      {loading && categories.length === 0 && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )}
      
      {/* 🆕 Hero Categories Grid - 7 visibili (era 6) */}
      {heroCategories.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {heroCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryClick(cat.slug)}
              className={`bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all cursor-pointer border-2 ${
                activeCategory === cat.slug
                  ? 'border-purple-500 ring-4 ring-purple-200 shadow-lg'
                  : 'border-transparent hover:border-purple-200'
              }`}
            >
              <div className="text-5xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">{cat.name_plural}</h3>
              <p className="text-xs text-gray-500">{cat.product_count} prodotti</p>
            </button>
          ))}
        </div>
      )}

      {/* Modal/Drawer - resto invariato */}
      {showAllCategories && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center"
          onClick={() => setShowAllCategories(false)}
        >
          <div 
            className="bg-white w-full md:max-w-4xl md:rounded-2xl md:rounded-b-none rounded-t-3xl max-h-[85vh] md:max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-3xl md:rounded-t-2xl">
              <h3 className="text-xl font-bold text-gray-800">Tutte le Categorie</h3>
              <button
                onClick={() => setShowAllCategories(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Chiudi"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <h4 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <span>⭐</span>
                  Categorie Principali
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {heroCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        onCategoryClick(cat.slug);
                        setShowAllCategories(false);
                      }}
                      className={`bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-center transition border-2 ${
                        activeCategory === cat.slug
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-transparent'
                      }`}
                    >
                      <div className="text-3xl mb-2">{cat.icon}</div>
                      <p className="font-semibold text-sm text-gray-900">{cat.name_plural}</p>
                      <p className="text-xs text-gray-500 mt-1">{cat.product_count}</p>
                    </button>
                  ))}
                </div>
              </div>

              {Object.entries(groupedCategories).map(([groupName, groupCats]) => (
                groupCats.length > 0 && (
                  <div key={groupName}>
                    <h4 className="text-lg font-bold text-gray-700 mb-4">{groupName}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {groupCats.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => {
                            onCategoryClick(cat.slug);
                            setShowAllCategories(false);
                          }}
                          className={`bg-gray-50 hover:bg-gray-100 rounded-xl p-4 text-center transition border-2 ${
                            activeCategory === cat.slug
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-transparent'
                          }`}
                        >
                          <div className="text-3xl mb-2">{cat.icon}</div>
                          <p className="font-semibold text-sm text-gray-900">{cat.name_plural}</p>
                          <p className="text-xs text-gray-500 mt-1">{cat.product_count}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}