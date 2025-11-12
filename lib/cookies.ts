/**
 * Cookie Consent Management
 * GDPR-compliant cookie handling for OcchioAlPrezzo
 */

export type CookieCategory = 'necessary' | 'analytics' | 'marketing';

export interface CookieConsent {
  necessary: boolean;    // Always true (required)
  analytics: boolean;    // Google Analytics, Plausible, etc.
  marketing: boolean;    // Affiliate tracking, remarketing
  timestamp: string;
  version: string;       // Policy version
}

const CONSENT_KEY = 'occhioalprezzo_cookie_consent';
const CONSENT_VERSION = '1.0';

/**
 * Get current consent state from localStorage
 */
export function getConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    
    const consent = JSON.parse(stored) as CookieConsent;
    
    // Check if consent is still valid (same version)
    if (consent.version !== CONSENT_VERSION) {
      return null;
    }
    
    return consent;
  } catch (error) {
    console.error('Error reading consent:', error);
    return null;
  }
}

/**
 * Save consent preferences
 */
export function saveConsent(consent: Omit<CookieConsent, 'timestamp' | 'version'>): void {
  if (typeof window === 'undefined') return;
  
  const fullConsent: CookieConsent = {
    ...consent,
    necessary: true, // Always true
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(fullConsent));
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('consentChanged', { 
      detail: fullConsent 
    }));
  } catch (error) {
    console.error('Error saving consent:', error);
  }
}

/**
 * Check if user has given consent for a category
 */
export function hasConsent(category: CookieCategory): boolean {
  if (category === 'necessary') return true; // Always allowed
  
  const consent = getConsent();
  if (!consent) return false;
  
  return consent[category] === true;
}

/**
 * Accept all cookies
 */
export function acceptAll(): void {
  saveConsent({
    necessary: true,
    analytics: true,
    marketing: true,
  });
}

/**
 * Reject all optional cookies (keep only necessary)
 */
export function rejectAll(): void {
  saveConsent({
    necessary: true,
    analytics: false,
    marketing: false,
  });
}

/**
 * Clear consent (for testing or user request)
 */
export function clearConsent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
}

/**
 * Check if consent banner should be shown
 */
export function shouldShowBanner(): boolean {
  return getConsent() === null;
}