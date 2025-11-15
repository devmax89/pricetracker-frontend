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

// Helper functions per generare structured data
export function generateProductSchema(product: any) {
  const minPrice = product.new_min_price || product.used_min_price;
  const maxPrice = product.new_max_price || minPrice;
  
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

  // Add offers with lowPrice and highPrice (REQUIRED!)
  if (minPrice) {
    schema.offers = {
      "@type": "AggregateOffer",
      "url": `https://occhioalprezzo.com/products/${product.id}`,
      "priceCurrency": "EUR",
      "lowPrice": parseFloat(minPrice).toFixed(2),
      "highPrice": parseFloat(maxPrice).toFixed(2),
      "offerCount": product.retailers_count || 1,
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days
    };
  }

  // Add aggregate rating (optional, but recommended)
  // For now, use a placeholder or skip if you don't have ratings
  if (product.rating && product.review_count) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.review_count,
      "bestRating": "5",
      "worstRating": "1"
    };
  }

  // Add review (optional)
  // Skip for now unless you implement user reviews

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