'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  shouldShowBanner, 
  acceptAll, 
  rejectAll,
  saveConsent,
  type CookieConsent 
} from '@/lib/cookies';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Show banner after a short delay (better UX)
    const timer = setTimeout(() => {
      if (shouldShowBanner()) {
        setIsVisible(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
    
    // Initialize analytics if accepted
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookieConsentGranted'));
    }
  };

  const handleRejectAll = () => {
    rejectAll();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setIsVisible(false);
    setShowSettings(false);
    
    // Initialize analytics if accepted
    if (preferences.analytics && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookieConsentGranted'));
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]" />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] animate-slide-up">
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            
            {/* Simple View */}
            {!showSettings ? (
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  {/* Cookie Icon */}
                  <div className="flex-shrink-0 hidden sm:block">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      🍪 Questo sito utilizza i cookie
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Utilizziamo cookie tecnici necessari per il funzionamento del sito e, con il tuo consenso, cookie analitici per migliorare l'esperienza utente. 
                      Puoi gestire le tue preferenze in qualsiasi momento.
                      {' '}
                      <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                        Privacy Policy
                      </Link>
                      {' · '}
                      <Link href="/cookie-policy" className="text-blue-600 hover:underline font-medium">
                        Cookie Policy
                      </Link>
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleAcceptAll}
                        className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Accetta tutti
                      </button>
                      <button
                        onClick={handleRejectAll}
                        className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Solo necessari
                      </button>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="flex-1 sm:flex-none border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Personalizza
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Settings View */
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Preferenze Cookie
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">Cookie Necessari</h4>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                          Sempre Attivi
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Cookie essenziali per il funzionamento del sito (sessione, preferenze). Non possono essere disabilitati.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="w-5 h-5 text-blue-600 rounded cursor-not-allowed opacity-50"
                      />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-gray-900 mb-1">Cookie Analitici</h4>
                      <p className="text-sm text-gray-600">
                        Ci aiutano a capire come gli utenti interagiscono con il sito per migliorare l'esperienza (es. Google Analytics, Plausible).
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <label className="relative inline-block w-12 h-6 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                      </label>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-gray-900 mb-1">Cookie Marketing</h4>
                      <p className="text-sm text-gray-600">
                        Utilizzati per il tracking delle affiliazioni e remarketing. Aiutano a sostenere il servizio gratuito.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <label className="relative inline-block w-12 h-6 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Salva Preferenze
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Accetta Tutti
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}