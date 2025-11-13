'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    category: '',
    description: '',
    amazon_url: '',
    subito_url: '',
    image_url: '',
    is_active: true,
  });

  const categories = [
    { value: 'gpu', label: 'Schede Video (GPU)' },
    { value: 'cpu', label: 'Processori (CPU)' },
    { value: 'console', label: 'Console Gaming' },
    { value: 'monitor', label: 'Monitor' },
    { value: 'motherboard', label: 'Schede Madri' },
    { value: 'ram', label: 'Memorie RAM' },
    { value: 'ssd', label: 'SSD' },
  ];

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${productId}`);
      const product = response.data.data;
      
      setFormData({
        name: product.name || '',
        brand: product.brand || '',
        model: product.model || '',
        category: product.category || 'gpu',
        description: product.description || '',
        amazon_url: product.amazon_url || '',
        subito_url: product.subito_url || '',
        image_url: product.image_url || '',
        is_active: product.is_active ?? true,
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Errore nel caricamento del prodotto');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // TODO: Implementare API backend
      alert('Feature in arrivo - backend endpoint necessario');
      // await axios.put(`${API_URL}/admin/products/${productId}`, formData);
      // router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Errore durante l\'aggiornamento del prodotto');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-4"
        >
          ← Torna indietro
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Modifica Prodotto #{productId}</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Prodotto *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Brand e Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modello
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Descrizione */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrizione
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amazon URL
              </label>
              <input
                type="url"
                name="amazon_url"
                value={formData.amazon_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subito URL
              </label>
              <input
                type="url"
                name="subito_url"
                value={formData.subito_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Immagine
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Prodotto attivo
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Salvataggio...' : 'Salva Modifiche'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300"
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}