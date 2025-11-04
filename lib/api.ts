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
    
    // L'API restituisce { success, count, data }
    // Estraiamo solo il campo 'data'
    return json.data || json;
  } catch (error: any) {
    console.error('API Fetch Error:', error);
    throw new Error(error.message || 'Errore di connessione all\'API');
  }
}

export async function getProducts() {
  return fetchAPI('/products');
}

export async function getProduct(id: string) {
  return fetchAPI(`/products/${id}`);
}

export async function getProductPrices(id: string) {
  return fetchAPI(`/products/${id}/prices`);
}

export async function getProductHistory(id: string, days: number = 30) {
  return fetchAPI(`/products/${id}/history?days=${days}`);
}
