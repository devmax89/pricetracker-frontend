'use client';

import { useEffect } from 'react';
import { hasConsent } from '@/lib/cookies';

export default function AnalyticsProvider() {
  useEffect(() => {
    // Init Umami se consenso già dato
    if (hasConsent('analytics')) {
      initUmami();
    }
    
    // Listen per quando l'utente dà il consenso
    const handleConsentGranted = () => {
      if (hasConsent('analytics')) {
        initUmami();
      }
    };
    
    window.addEventListener('cookieConsentGranted', handleConsentGranted);
    return () => window.removeEventListener('cookieConsentGranted', handleConsentGranted);
  }, []);

  return null;
}

function initUmami() {
  if (typeof window === 'undefined') return;
  if (document.querySelector('[data-website-id]')) {
    console.log('📊 Umami already loaded');
    return;
  }
  
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.websiteId = '7734ee79-bb22-4f12-b941-5679923b9780';
  //script.src = 'http://192.168.1.227:3001/script.js';
  script.src = 'https://analytics.occhioalprezzo.com:30022/script.js';
  
  script.onload = () => {
    console.log('✅ Umami Analytics loaded with consent');
  };
  
  document.head.appendChild(script);
}

// TypeScript declaration per eventi custom (opzionale)
declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, any>) => void;
    };
  }
}