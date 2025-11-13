'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface NewPrice {
  id: number;
  retailer: string;
  price: number;
  url: string;
  scraped_at: string;
}

interface UsedPrice {
  id: number;
  title: string;
  price: number;
  external_url: string;
  location?: string;
  condition?: string;
  is_active: boolean;
  scraped_at: string;
}

interface PriceTableProps {
  newPrices: NewPrice[];
  usedPrices: UsedPrice[];
  onRefresh: () => void;
}

export default function PriceTable({ newPrices, usedPrices, onRefresh }: PriceTableProps) {
  const [editingNew, setEditingNew] = useState<number | null>(null);
  const [editingUsed, setEditingUsed] = useState<number | null>(null);
  const [editFormNew, setEditFormNew] = useState({ price: '', retailer: '', url: '' });
  const [editFormUsed, setEditFormUsed] = useState({ price: '', title: '', external_url: '' });

  // 🆕 Pagination states
  const [currentPageNew, setCurrentPageNew] = useState(1);
  const [currentPageUsed, setCurrentPageUsed] = useState(1);
  const itemsPerPage = 20;

  // Calculate pagination
  const totalPagesNew = Math.ceil(newPrices.length / itemsPerPage);
  const totalPagesUsed = Math.ceil(usedPrices.length / itemsPerPage);

  const paginatedNewPrices = newPrices.slice(
    (currentPageNew - 1) * itemsPerPage,
    currentPageNew * itemsPerPage
  );

  const paginatedUsedPrices = usedPrices.slice(
    (currentPageUsed - 1) * itemsPerPage,
    currentPageUsed * itemsPerPage
  );

  // NEW PRICES
  const handleEditNew = (price: NewPrice) => {
    setEditingNew(price.id);
    setEditFormNew({
      price: price.price.toString(),
      retailer: price.retailer,
      url: price.url || '',
    });
  };

  const handleSaveNew = async (id: number) => {
    try {
      await axios.put(`${API_URL}/admin/prices/new/${id}`, {
        price: parseFloat(editFormNew.price),
        retailer: editFormNew.retailer,
        url: editFormNew.url,
      });
      setEditingNew(null);
      onRefresh();
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Errore durante l\'aggiornamento');
    }
  };

  const handleDeleteNew = async (id: number) => {
    if (!confirm('Sei sicuro di voler eliminare questo prezzo?')) return;

    try {
      await axios.delete(`${API_URL}/admin/prices/new/${id}`);
      onRefresh();
    } catch (error) {
      console.error('Error deleting price:', error);
      alert('Errore durante l\'eliminazione');
    }
  };

  // USED PRICES
  const handleEditUsed = (price: UsedPrice) => {
    setEditingUsed(price.id);
    setEditFormUsed({
      price: price.price.toString(),
      title: price.title,
      external_url: price.external_url || '',
    });
  };

  const handleSaveUsed = async (id: number) => {
    try {
      await axios.put(`${API_URL}/admin/prices/used/${id}`, {
        price: parseFloat(editFormUsed.price),
        title: editFormUsed.title,
        external_url: editFormUsed.external_url,
      });
      setEditingUsed(null);
      onRefresh();
    } catch (error) {
      console.error('Error updating used price:', error);
      alert('Errore durante l\'aggiornamento');
    }
  };

  const handleDeleteUsed = async (id: number) => {
    if (!confirm('Sei sicuro di voler eliminare questo annuncio usato?')) return;

    try {
      await axios.delete(`${API_URL}/admin/prices/used/${id}`);
      onRefresh();
    } catch (error) {
      console.error('Error deleting used price:', error);
      alert('Errore durante l\'eliminazione');
    }
  };

  // 🆕 Pagination Component
  const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50">
        <div className="text-sm text-gray-700">
          Pagina <span className="font-medium">{currentPage}</span> di{' '}
          <span className="font-medium">{totalPages}</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Precedente
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
              >
                1
              </button>
              {startPage > 2 && <span className="px-2 py-1">...</span>}
            </>
          )}
          
          {pages.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm border rounded ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2 py-1">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Successiva →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* NEW PRICES TABLE */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Prezzi Nuovo ({newPrices.length})
        </h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Retailer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Prezzo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedNewPrices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Nessun prezzo trovato
                  </td>
                </tr>
              ) : (
                paginatedNewPrices.map((price) => (
                  <tr key={price.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingNew === price.id ? (
                        <input
                          type="text"
                          value={editFormNew.retailer}
                          onChange={(e) => setEditFormNew({ ...editFormNew, retailer: e.target.value })}
                          className="px-2 py-1 border rounded text-sm w-full"
                        />
                      ) : (
                        <span className="font-medium text-gray-900">{price.retailer}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingNew === price.id ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editFormNew.price}
                          onChange={(e) => setEditFormNew({ ...editFormNew, price: e.target.value })}
                          className="px-2 py-1 border rounded text-sm w-24"
                        />
                      ) : (
                        <span className="text-gray-900">€{Number(price.price).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {editingNew === price.id ? (
                        <input
                          type="url"
                          value={editFormNew.url}
                          onChange={(e) => setEditFormNew({ ...editFormNew, url: e.target.value })}
                          className="px-2 py-1 border rounded text-sm w-full"
                        />
                      ) : (
                        <a href={price.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {price.url ? 'Link' : '-'}
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(price.scraped_at), 'dd MMM HH:mm', { locale: it })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingNew === price.id ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleSaveNew(price.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Salva
                          </button>
                          <button
                            onClick={() => setEditingNew(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Annulla
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-4 justify-end">
                          <button
                            onClick={() => handleEditNew(price)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleDeleteNew(price.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Elimina
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {/* 🆕 Pagination NEW */}
          {totalPagesNew > 1 && (
            <Pagination
              currentPage={currentPageNew}
              totalPages={totalPagesNew}
              onPageChange={setCurrentPageNew}
            />
          )}
        </div>
      </div>

      {/* USED PRICES TABLE */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Prezzi Usato ({usedPrices.length})
        </h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Titolo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Prezzo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Località
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsedPrices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Nessun annuncio usato trovato
                  </td>
                </tr>
              ) : (
                paginatedUsedPrices.map((price) => (
                  <tr key={price.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {editingUsed === price.id ? (
                        <input
                          type="text"
                          value={editFormUsed.title}
                          onChange={(e) => setEditFormUsed({ ...editFormUsed, title: e.target.value })}
                          className="px-2 py-1 border rounded text-sm w-full"
                        />
                      ) : (
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          <a href={price.external_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {price.title}
                          </a>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUsed === price.id ? (
                        <input
                          type="number"
                          step="0.01"
                          value={editFormUsed.price}
                          onChange={(e) => setEditFormUsed({ ...editFormUsed, price: e.target.value })}
                          className="px-2 py-1 border rounded text-sm w-24"
                        />
                      ) : (
                        <span className="text-gray-900">€{Number(price.price).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {price.location || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(price.scraped_at), 'dd MMM HH:mm', { locale: it })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        price.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {price.is_active ? 'Attivo' : 'Venduto'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingUsed === price.id ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleSaveUsed(price.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Salva
                          </button>
                          <button
                            onClick={() => setEditingUsed(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Annulla
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-4 justify-end">
                          <button
                            onClick={() => handleEditUsed(price)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleDeleteUsed(price.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Elimina
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {/* 🆕 Pagination USED */}
          {totalPagesUsed > 1 && (
            <Pagination
              currentPage={currentPageUsed}
              totalPages={totalPagesUsed}
              onPageChange={setCurrentPageUsed}
            />
          )}
        </div>
      </div>
    </div>
  );
}