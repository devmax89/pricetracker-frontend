'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { generateRetailerUrls, generateSlug } from '@/lib/utils';
import { CATEGORIES } from '@/lib/categories';

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

  // Auto-fill function
  const handleAutoFill = () => {
  if (!formData.name || !formData.brand) {
    alert('Inserisci almeno Nome Prodotto e Brand prima di auto-compilare!');
    return;
  }

  const urls = generateRetailerUrls(formData.name, formData.brand, formData.category);
  
  setFormData({
    ...formData,
    ...urls,
  });
  
  console.log('✅ URL auto-generati:', urls);
};

  const categories = CATEGORIES.map(cat => ({
    value: cat.value,
    label: cat.label
  }));

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

            {/* Auto-fill Button */}
            <div className="col-span-2">
              <button
                type="button"
                onClick={handleAutoFill}
                className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Auto-Compila URL Retailer
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Genera automaticamente gli URL per tutti i retailer
              </p>
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

              {/* MediaWorld URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MediaWorld URL
                </label>
                <input
                  type="text"
                  name="mediaworld_url"
                  value={formData.mediaworld_url}
                  onChange={handleChange}
                  placeholder="URL o query: galaxy s25 edge"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* MediaWorld Ricondizionati */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MediaWorld Ricondizionati URL
                </label>
                <input
                  type="text"
                  name="mediaworld_ricondizionati_url"
                  value={formData.mediaworld_ricondizionati_url}
                  onChange={handleChange}
                  placeholder="Query: Samsung Galaxy S25 Edge"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* LDLC URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LDLC URL
                </label>
                <input
                  type="text"
                  name="ldlc_url"
                  value={formData.ldlc_url}
                  onChange={handleChange}
                  placeholder="URL o query: galaxy s25 edge"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* AK Informatica URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AK Informatica URL
                </label>
                <input
                  type="text"
                  name="akinformatica_url"
                  value={formData.akinformatica_url}
                  onChange={handleChange}
                  placeholder="URL o query: samsung galaxy s25 fe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* NextHS URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NextHS URL
                </label>
                <input
                  type="text"
                  name="nexths_url"
                  value={formData.nexths_url}
                  onChange={handleChange}
                  placeholder="URL o query: Galaxy S25 Edge"
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