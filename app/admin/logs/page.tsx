'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ScrapingLog {
  id: number;
  retailer: string;
  product_id: number;
  product_name?: string;
  price?: number;
  success: boolean;
  error_message?: string;
  scraped_at: string;
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<ScrapingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [retailerFilter, setRetailerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      // TODO: Creare endpoint backend per logs scraping
      // const response = await axios.get(`${API_URL}/admin/logs/scraping`);
      // setLogs(response.data.data || []);
      
      // Mock data per demo
      const mockLogs = [
        {
          id: 1,
          retailer: 'Amazon',
          product_id: 1,
          product_name: 'NVIDIA RTX 4070',
          price: 599.99,
          success: true,
          scraped_at: new Date().toISOString(),
        },
        {
          id: 2,
          retailer: 'MediaWorld',
          product_id: 2,
          product_name: 'PlayStation 5',
          price: 499.99,
          success: true,
          scraped_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 3,
          retailer: 'Subito',
          product_id: 1,
          success: false,
          error_message: 'Connection timeout',
          scraped_at: new Date(Date.now() - 7200000).toISOString(),
        },
      ];
      setLogs(mockLogs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const retailers = Array.from(new Set(logs.map(l => l.retailer)));

  const filteredLogs = logs.filter(log => {
    const matchesRetailer = !retailerFilter || log.retailer === retailerFilter;
    const matchesStatus = !statusFilter || 
      (statusFilter === 'success' && log.success) ||
      (statusFilter === 'error' && !log.success);
    return matchesRetailer && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Log Scraping</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retailer
            </label>
            <select
              value={retailerFilter}
              onChange={(e) => setRetailerFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tutti i retailer</option>
              {retailers.map(retailer => (
                <option key={retailer} value={retailer}>{retailer}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tutti</option>
              <option value="success">Successo</option>
              <option value="error">Errore</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Totale Scraping</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{logs.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Successi</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {logs.filter(l => l.success).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Errori</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {logs.filter(l => !l.success).length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Retailer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Prodotto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Prezzo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Errore
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  Nessun log trovato
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(log.scraped_at), 'dd MMM HH:mm', { locale: it })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.retailer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {log.product_name || `ID: ${log.product_id}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.price ? `€${log.price.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      log.success
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {log.success ? 'Successo' : 'Errore'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-red-600">
                    {log.error_message || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        Mostrando {filteredLogs.length} di {logs.length} log
      </div>
    </div>
  );
}