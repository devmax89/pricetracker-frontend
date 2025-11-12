'use client';

import { useEffect } from 'react';
import { hasConsent } from '@/lib/cookies';

export default function AnalyticsProvider() {
  useEffect(() => {
    // Init analytics se consenso già dato
    if (hasConsent('analytics')) {
      initAnalytics();
    }
    
    // Listen per quando l'utente dà il consenso
    const handleConsentGranted = () => {
      if (hasConsent('analytics')) {
        initAnalytics();
      }
    };
    
    window.addEventListener('cookieConsentGranted', handleConsentGranted);
    return () => window.removeEventListener('cookieConsentGranted', handleConsentGranted);
  }, []);

  return null; // Questo component non renderizza nulla
}

function initAnalytics() {
  if (typeof window === 'undefined') return;
  
  // Check se script già caricato
  if (document.querySelector('[data-domain="occhioalprezzo.com"]')) return;
  
  // Inizializza Plausible (o il tuo analytics)
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = 'occhioalprezzo.com';
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
  
  console.log('📊 Analytics initialized with consent');
}