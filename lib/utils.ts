import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility per Tailwind CSS (se usi shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Genera slug URL-friendly da stringa
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Genera automaticamente gli URL retailer da nome prodotto e brand
 */
export function generateRetailerUrls(productName: string, brand: string, category: string) {
  // Rimuovi brand dal nome per query più pulite
  const nameWithoutBrand = productName.replace(brand, '').trim();
  
  // Query base (senza brand)
  const baseQuery = nameWithoutBrand.toLowerCase();
  
  // Query con brand
  const fullQuery = productName.toLowerCase();
  
  // URL encoding per Amazon
  const amazonQuery = nameWithoutBrand.replace(/\s+/g, '+');
  
  // URL encoding per Subito
  const subitoQuery = encodeURIComponent(baseQuery);
  
  return {
    amazon_url: `https://www.amazon.it/s?k=${amazonQuery}`,
    mediaworld_url: baseQuery,
    mediaworld_ricondizionati_url: productName,
    ldlc_url: baseQuery,
    akinformatica_url: fullQuery,
    nexths_url: nameWithoutBrand,
    subito_url: `https://www.subito.it/annunci-italia/vendita/informatica/?q=${subitoQuery}`,
  };
}

/**
 * Format date for blog posts
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('it-IT', options);
}

/**
 * Format relative time (e.g., "2 giorni fa")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Pochi secondi fa';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minuti'} fa`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'ora' : 'ore'} fa`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'giorno' : 'giorni'} fa`;
  } else {
    return formatDate(dateString);
  }
}

/**
 * Get current year (for copyright)
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}