const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.241:3000/api';
console.log('API Base URL:', API_BASE);

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  console.log('Fetching:', url);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    console.log('Response data:', json);
    
    return json;
  } catch (error: any) {
    console.error('API Fetch Error:', error);
    throw new Error(error.message || 'Errore di connessione all\'API');
  }
}

export async function getProducts() {
  const response = await fetchAPI('/products');
  return response.data || [];
}

export async function getProduct(id: string) {
  const response = await fetchAPI(`/products/${id}`);
  return response.data || null;
}

export async function getProductPrices(id: string) {
  const response = await fetchAPI(`/products/${id}/prices`);
  
  console.log('🔍 Raw API response:', response);
  console.log('🔍 new_prices:', response.new_prices);
  console.log('🔍 used_listings:', response.used_listings);
  
  // Trasforma per compatibilità con il componente
  const transformed = {
    new: response.new_prices || [],
    used: response.used_listings || []
  };
  
  console.log('🔍 Transformed data:', transformed);
  
  return transformed;
}

export async function getProductHistory(id: string, days: number = 30) {
  const response = await fetchAPI(`/products/${id}/history?days=${days}`);
  return response.data || [];
}

export async function getCategories() {
  const response = await fetchAPI('/categories');
  return response.data || [];
}