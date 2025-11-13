'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    category: 'gpu',
    description: '',
    image_url: '',
    
    //RETAILER URLs
    amazon_url: '',
    mediaworld_url: '',
    mediaworld_ricondizionati_url: '',
    ldlc_url: '',
    akinformatica_url: '',
    nexths_url: '',
    subito_url: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/admin/products`, formData);
      alert('Prodotto creato con successo!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Errore durante la creazione del prodotto');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-4"
        >
          ← Torna indietro
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Nuovo Prodotto</h1>
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
              placeholder="es. NVIDIA GeForce RTX 4070"
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
                placeholder="es. NVIDIA"
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
                placeholder="es. RTX 4070"
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
              placeholder="Descrizione del prodotto..."
            />
          </div>

          {/* URLs Retailer */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">URL Retailer</h3>
            
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
                  placeholder="https://www.amazon.it/s?k=..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MediaWorld URL
                </label>
                <input
                  type="url"
                  name="mediaworld_url"
                  value={formData.mediaworld_url}
                  onChange={handleChange}
                  placeholder="https://www.mediaworld.it/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MediaWorld Ricondizionati URL
                </label>
                <input
                  type="url"
                  name="mediaworld_ricondizionati_url"
                  value={formData.mediaworld_ricondizionati_url}
                  onChange={handleChange}
                  placeholder="Query o URL per ricondizionati"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LDLC URL
                </label>
                <input
                  type="url"
                  name="ldlc_url"
                  value={formData.ldlc_url}
                  onChange={handleChange}
                  placeholder="https://www.ldlc.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AK Informatica URL
                </label>
                <input
                  type="url"
                  name="akinformatica_url"
                  value={formData.akinformatica_url}
                  onChange={handleChange}
                  placeholder="https://www.akinformatica.it/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NextHS URL
                </label>
                <input
                  type="url"
                  name="nexths_url"
                  value={formData.nexths_url}
                  onChange={handleChange}
                  placeholder="https://www.nexths.it/..."
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
                  placeholder="https://www.subito.it/annunci-italia/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
              placeholder="https://..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvataggio...' : 'Crea Prodotto'}
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