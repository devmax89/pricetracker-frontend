import { Metadata } from 'next';
import ProductPageClient from './ProductPageClient';

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.241:3000/api';
    const response = await fetch(`${API_URL}/products/${resolvedParams.id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Product not found');
    }
    
    const result = await response.json();
    const product = result.data;
    
    const minPrice = product.new_min_price || product.used_min_price || 'N/A';
    
    return {
      title: `${product.name} - Confronta Prezzi`,
      description: `${product.name} al miglior prezzo. Confronta prezzi nuovo da €${minPrice} e usato. Storico prezzi e alert automatici.`,
      openGraph: {
        title: `${product.name} - Miglior Prezzo`,
        description: `Confronta prezzi per ${product.name}. Nuovo da €${minPrice}`,
        images: [product.image_url || '/og-image.jpg'],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} - Miglior Prezzo`,
        description: `Confronta prezzi per ${product.name}`,
        images: [product.image_url || '/og-image.jpg'],
      }
    };
  } catch (error) {
    return {
      title: 'Prodotto non trovato',
      description: 'Il prodotto cercato non è disponibile',
    };
  }
}

// Server Component wrapper
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <ProductPageClient id={resolvedParams.id} />;
}