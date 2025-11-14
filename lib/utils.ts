import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility per Tailwind CSS (se usi shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
    mediaworld_ricondizionati_url: productName, // Nome completo
    ldlc_url: baseQuery,
    akinformatica_url: fullQuery,
    nexths_url: nameWithoutBrand, // Con maiuscole originali
    subito_url: `https://www.subito.it/annunci-italia/vendita/informatica/?q=${subitoQuery}`,
  };
}

/**
 * Genera slug da nome prodotto
 */
export function generateSlug(productName: string): string {
  return productName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Rimuovi caratteri speciali
    .replace(/\s+/g, '-')          // Spazi → trattini
    .replace(/-+/g, '-')           // Multipli trattini → singolo
    .trim();
}