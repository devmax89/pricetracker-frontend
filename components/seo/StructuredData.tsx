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
  
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `${product.name} - Confronta prezzi nuovo e usato`,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "image": product.image_url || "https://occhioalprezzo.com/default-product.jpg",
    "offers": {
      "@type": "AggregateOffer",
      "url": `https://occhioalprezzo.com/products/${product.id}`,
      "priceCurrency": "EUR",
      "lowPrice": minPrice,
      "highPrice": product.new_max_price || minPrice,
      "offerCount": product.retailer_count || 1,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": product.rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.review_count || 1
    } : undefined
  };
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