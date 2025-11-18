interface StructuredDataProps {
  data: any;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateProductSchema(product: any) {
  // Parse prezzi come float, fallback a 0.01 se mancanti
  const newMin = product.new_min_price ? parseFloat(product.new_min_price) : null;
  const newMax = product.new_max_price ? parseFloat(product.new_max_price) : null;
  const usedMin = product.used_min_price ? parseFloat(product.used_min_price) : null;
  const usedMax = product.used_max_price ? parseFloat(product.used_max_price) : null;
  
  // Prendi il prezzo minimo disponibile (nuovo o usato)
  const minPrice = newMin || usedMin || 0.01;
  const maxPrice = newMax || usedMax || newMin || usedMin || minPrice;
  
  // Base schema
  const schema: any = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `${product.name} - Confronta prezzi nuovo e usato. Trova il miglior prezzo in Italia.`,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Generic"
    },
    "sku": `PROD-${product.id}`,
    "mpn": product.model || `${product.id}`,
  };

  // Add image if available
  if (product.image_url) {
    schema.image = product.image_url.startsWith('http') 
      ? product.image_url 
      : `https://occhioalprezzo.com${product.image_url}`;
  }

  // SEMPRE aggiungi offers (richiesto da Google)
  schema.offers = {
    "@type": "AggregateOffer",
    "url": `https://occhioalprezzo.com/products/${product.id}`,
    "priceCurrency": "EUR",
    "lowPrice": minPrice.toFixed(2),
    "highPrice": maxPrice.toFixed(2),
    "offerCount": parseInt(product.retailers_count) || 1,
    "availability": minPrice > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    "priceValidUntil": new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };

  // Add aggregate rating if available
  if (product.rating && product.review_count) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.review_count,
      "bestRating": "5",
      "worstRating": "1"
    };
  }

  return schema;
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://occhioalprezzo.com${item.url}`
    }))
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OcchioAlPrezzo.com",
    "url": "https://occhioalprezzo.com",
    "logo": "https://occhioalprezzo.com/logo.png",
    "description": "Il comparatore di prezzi tech più completo d'Italia. Confronta prezzi nuovo e usato in tempo reale.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "info@occhioalprezzo.com"
    },
    "sameAs": [
      "https://twitter.com/occhioalprezzo",
      "https://facebook.com/occhioalprezzo"
    ]
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OcchioAlPrezzo.com",
    "url": "https://occhioalprezzo.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://occhioalprezzo.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}