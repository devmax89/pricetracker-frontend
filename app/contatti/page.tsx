import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contatti - OcchioAlPrezzo.com",
  description: "Contatta il team di OcchioAlPrezzo.com per supporto, suggerimenti o partnership",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Contatti</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contatti
          </h1>
          <p className="text-gray-600 text-lg">
            Hai domande o suggerimenti? Siamo qui per aiutarti!
          </p>
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            
            {/* Email Support */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Email
                  </h2>
                  <p className="text-gray-600 mb-3">
                    Per supporto generale, segnalazioni o domande sul servizio
                  </p>
                  <a 
                    href="mailto:info@occhioalprezzo.com" 
                    className="text-blue-600 hover:underline font-medium"
                  >
                    info@occhioalprezzo.com
                  </a>
                </div>
              </div>
            </div>

            {/* Privacy & Data */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Privacy & Dati Personali
                  </h2>
                  <p className="text-gray-600 mb-3">
                    Per richieste relative ai tuoi dati personali o esercizio dei diritti GDPR
                  </p>
                  <a 
                    href="mailto:privacy@occhioalprezzo.com" 
                    className="text-blue-600 hover:underline font-medium"
                  >
                    privacy@occhioalprezzo.com
                  </a>
                </div>
              </div>
            </div>

            {/* Business & Partnership */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Business & Partnership
                  </h2>
                  <p className="text-gray-600 mb-3">
                    Per proposte commerciali, collaborazioni o partnership
                  </p>
                  <a 
                    href="mailto:business@occhioalprezzo.com" 
                    className="text-blue-600 hover:underline font-medium"
                  >
                    business@occhioalprezzo.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Social Media
                  </h2>
                  <p className="text-gray-600 mb-3">
                    Seguici sui social per aggiornamenti e offerte
                  </p>
                  <div className="flex space-x-4">
                    {/* Placeholder - aggiungi i tuoi social quando li avrai */}
                    <span className="text-gray-400 text-sm">Coming soon...</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - FAQ & Info */}
          <div className="space-y-6">
            
            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Domande Frequenti
              </h2>
              
              <div className="space-y-6">
                
                {/* FAQ 1 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Come funziona OcchioAlPrezzo?
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Monitoriamo automaticamente i prezzi di prodotti tech su diversi retailer italiani (Amazon, MediaWorld, LDLC, etc.) 
                    e ti mostriamo dove trovare il miglior prezzo, sia nuovo che usato.
                  </p>
                </div>

                {/* FAQ 2 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Gli alert prezzi sono gratuiti?
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sì! Il servizio di alert è completamente gratuito. Ti invieremo una email quando il prezzo del prodotto 
                    che ti interessa scende al livello che hai impostato.
                  </p>
                </div>

                {/* FAQ 3 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Posso vendere su OcchioAlPrezzo?
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    No, siamo un comparatore di prezzi. Mostriamo offerte da retailer terzi come Amazon, MediaWorld, LDLC e annunci 
                    usati da Subito.it. Non vendiamo direttamente prodotti.
                  </p>
                </div>

                {/* FAQ 4 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Come guadagnate?
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Attraverso programmi di affiliazione: quando clicchi su un link verso un retailer e completi un acquisto, 
                    riceviamo una piccola commissione senza alcun costo aggiuntivo per te.
                  </p>
                </div>

                {/* FAQ 5 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    I prezzi sono aggiornati in tempo reale?
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Aggiorniamo i prezzi ogni ora attraverso il nostro sistema di scraping automatico. 
                    Ti consigliamo sempre di verificare il prezzo finale sul sito del retailer prima dell'acquisto.
                  </p>
                </div>

                {/* FAQ 6 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Posso richiedere l'aggiunta di un prodotto?
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Certo! Inviaci una email a <a href="mailto:info@occhioalprezzo.com" className="text-blue-600 hover:underline">info@occhioalprezzo.com</a> con 
                    il nome del prodotto e un link al prodotto su uno dei retailer che monitoriamo.
                  </p>
                </div>

              </div>
            </div>

            {/* Response Time */}
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Tempi di Risposta
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Ci impegniamo a rispondere entro <strong>24-48 ore</strong> nei giorni lavorativi. 
                    Per richieste relative ai dati personali (GDPR), risponderemo entro <strong>30 giorni</strong> come previsto dalla normativa.
                  </p>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Suggerimenti
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Il tuo feedback è prezioso! Se hai idee per migliorare OcchioAlPrezzo o vuoi segnalarci 
                un problema, non esitare a scriverci. Leggiamo e valutiamo ogni suggerimento ricevuto.
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Notice */}
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-gray-600">
            <strong>Nota:</strong> OcchioAlPrezzo.com è un servizio di comparazione prezzi indipendente. 
            Non siamo affiliati direttamente con i retailer mostrati sul sito. 
            Per supporto su ordini o spedizioni, contatta direttamente il retailer presso cui hai acquistato.
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Torna alla Home
          </Link>
        </div>

      </div>
    </main>
  );
}