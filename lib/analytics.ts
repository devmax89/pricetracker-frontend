// lib/analytics.ts
'use client';

import { useEffect } from 'react';
import { hasConsent } from './cookies';

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  
  // Solo se l'utente ha dato il consenso
  if (hasConsent('analytics')) {
    // Inizializza Plausible
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = 'occhioalprezzo.com';
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
  }
}

// Hook per componenti React
export function useAnalytics() {
  useEffect(() => {
    // Init on mount se consenso già dato
    if (hasConsent('analytics')) {
      initAnalytics();
    }
    
    // Listen per quando l'utente da il consenso
    const handleConsentGranted = () => {
      if (hasConsent('analytics')) {
        initAnalytics();
      }
    };
    
    window.addEventListener('cookieConsentGranted', handleConsentGranted);
    return () => window.removeEventListener('cookieConsentGranted', handleConsentGranted);
  }, []);
}