import type { Metadata } from "next";
import Link from "next/link";
import CookieSettingsButton from '@/components/CookieSettingsButton';

export const metadata: Metadata = {
  title: "Cookie Policy - OcchioAlPrezzo.com",
  description: "Informativa sull'utilizzo dei cookie su OcchioAlPrezzo.com",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Cookie Policy</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          
          {/* Introduzione */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Cosa sono i Cookie
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al suo terminale 
              (generalmente al browser), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti 
              alla successiva visita. I cookie sono utilizzati per diverse finalità, hanno caratteristiche diverse 
              e possono essere utilizzati sia dal titolare del sito che si sta visitando, sia da terze parti.
            </p>
          </section>

          {/* Tipologie */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Tipologie di Cookie Utilizzati
            </h2>
            
            <div className="space-y-6">
              {/* Cookie Tecnici */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  2.1 Cookie Tecnici (Necessari)
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Sono i cookie strettamente necessari per il funzionamento del sito e per permetterti di navigare 
                  correttamente. <strong>Questi cookie non possono essere disabilitati</strong> in quanto essenziali per il servizio.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium mb-2">Cookie utilizzati:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>occhioalprezzo_cookie_consent</strong>: Memorizza le tue preferenze sui cookie (durata: 12 mesi)</li>
                    <li>• <strong>occhioalprezzo_session</strong>: Gestisce la sessione di navigazione (durata: sessione)</li>
                    <li>• <strong>product_viewed</strong>: Cache prodotti visualizzati per navigazione offline (durata: 7 giorni)</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">Base giuridica: Legittimo interesse (art. 6.1.f GDPR)</p>
                </div>
              </div>

              {/* Cookie Analitici */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  2.2 Cookie Analitici
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Questi cookie ci permettono di raccogliere informazioni aggregate e anonime sull'utilizzo del sito 
                  per migliorare l'esperienza utente. <strong>Richiedono il tuo consenso esplicito</strong>.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium mb-2">Servizi utilizzati:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>
                      • <strong>Plausible Analytics</strong> (https://plausible.io)
                      <br/>
                      <span className="text-xs">Cookie-less, GDPR-compliant. Raccoglie statistiche aggregate senza identificazione personale.</span>
                      <br/>
                      <span className="text-xs text-gray-500">Dati raccolti: pagine viste, sorgenti traffico, dispositivi (aggregati)</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">Base giuridica: Consenso (art. 6.1.a GDPR)</p>
                </div>
              </div>

              {/* Cookie Marketing */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  2.3 Cookie di Marketing e Affiliazione
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Utilizziamo cookie di affiliazione per tracciare i click verso i retailer partner e ricevere una 
                  commissione sugli acquisti, senza alcun costo aggiuntivo per te. <strong>Richiedono il tuo consenso</strong>.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium mb-2">Partner affiliati:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>
                      • <strong>Amazon Associates</strong>
                      <br/>
                      <span className="text-xs">Traccia click e acquisti su Amazon.it per calcolare commissioni</span>
                    </li>
                    <li>
                      • <strong>eBay Partner Network</strong>
                      <br/>
                      <span className="text-xs">Traccia click verso eBay.it</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">Base giuridica: Consenso (art. 6.1.a GDPR)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Gestione Cookie */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Come Gestire i Cookie
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <h4 className="font-semibold text-gray-900 mb-2">🎛️ Pannello Preferenze</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Puoi modificare le tue preferenze in qualsiasi momento cliccando sul link "Gestisci Cookie" nel footer del sito.
                </p>
                <CookieSettingsButton />
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🌐 Impostazioni Browser</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Puoi anche gestire i cookie direttamente dalle impostazioni del tuo browser:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Google Chrome</a></li>
                  <li>• <a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
                  <li>• <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Safari</a></li>
                  <li>• <a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  ⚠️ Nota: Disabilitare tutti i cookie potrebbe compromettere alcune funzionalità del sito.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie di Terze Parti */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Cookie di Terze Parti
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Alcuni cookie sono installati da servizi di terze parti. OcchioAlPrezzo.com non controlla 
              direttamente questi cookie. Per informazioni dettagliate, consulta le privacy policy dei servizi terzi:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• <strong>Amazon</strong>: <a href="https://www.amazon.it/gp/help/customer/display.html?nodeId=201909010" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Privacy Notice</a></li>
                <li>• <strong>eBay</strong>: <a href="https://www.ebay.it/help/policies/member-behaviour-policies/user-privacy-notice-privacy-policy?id=4260" target="_blank" rel="noopener" className="text-blue-600 hover:underline">User Privacy Notice</a></li>
                <li>• <strong>Plausible</strong>: <a href="https://plausible.io/privacy" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
          </section>

          {/* Durata Cookie */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Durata dei Cookie
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Nome Cookie</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Tipo</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Durata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">occhioalprezzo_cookie_consent</td>
                    <td className="border border-gray-300 px-4 py-2">Necessario</td>
                    <td className="border border-gray-300 px-4 py-2">12 mesi</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">occhioalprezzo_session</td>
                    <td className="border border-gray-300 px-4 py-2">Necessario</td>
                    <td className="border border-gray-300 px-4 py-2">Sessione</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">product_viewed</td>
                    <td className="border border-gray-300 px-4 py-2">Necessario</td>
                    <td className="border border-gray-300 px-4 py-2">7 giorni</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Plausible Analytics</td>
                    <td className="border border-gray-300 px-4 py-2">Analitico</td>
                    <td className="border border-gray-300 px-4 py-2">Cookie-less</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Amazon Associates</td>
                    <td className="border border-gray-300 px-4 py-2">Marketing</td>
                    <td className="border border-gray-300 px-4 py-2">90 giorni</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Aggiornamenti */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Aggiornamenti della Cookie Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Questa Cookie Policy può essere aggiornata periodicamente. Ti invitiamo a consultare regolarmente 
              questa pagina per rimanere informato. Gli aggiornamenti saranno comunicati attraverso il sito web.
            </p>
          </section>

          {/* Contatti */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Contatti
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Per domande riguardo questa Cookie Policy o per esercitare i tuoi diritti, contattaci:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p className="text-gray-700">
                <strong>Email</strong>: <a href="mailto:privacy@occhioalprezzo.com" className="text-blue-600 hover:underline">privacy@occhioalprezzo.com</a>
              </p>
              <p className="text-gray-700">
                <strong>Privacy Policy</strong>: <Link href="/privacy" className="text-blue-600 hover:underline">Leggi qui</Link>
              </p>
            </div>
          </section>

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