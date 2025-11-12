import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - OcchioAlPrezzo.com",
  description: "Informativa sulla privacy e trattamento dei dati personali di OcchioAlPrezzo.com",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Privacy Policy</span>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
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
              1. Introduzione
            </h2>
            <p className="text-gray-700 leading-relaxed">
              OcchioAlPrezzo.com ("noi", "nostro") rispetta la privacy dei propri utenti e si impegna a proteggere i dati personali raccolti attraverso il proprio servizio di comparazione prezzi. 
              Questa informativa sulla privacy descrive come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR - UE 2016/679).
            </p>
          </section>

          {/* Dati Raccolti */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Dati Personali Raccolti
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  2.1 Dati forniti volontariamente
                </h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Raccogliamo i seguenti dati personali quando utilizzi il nostro servizio di alert prezzi:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li><strong>Indirizzo email</strong>: necessario per inviarti notifiche quando il prezzo di un prodotto raggiunge il tuo target</li>
                  <li><strong>Preferenze di prezzo</strong>: prezzi target impostati per ricevere gli alert</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  2.2 Dati raccolti automaticamente
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li><strong>Dati di navigazione</strong>: indirizzo IP, tipo di browser, sistema operativo, pagine visitate</li>
                  <li><strong>Cookie tecnici</strong>: necessari per il funzionamento del sito (es. preferenze utente)</li>
                  <li><strong>Dati aggregati e anonimi</strong>: statistiche sull'utilizzo del servizio senza identificazione personale</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Finalità del Trattamento */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Finalità del Trattamento
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              I tuoi dati personali vengono trattati per le seguenti finalità:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Servizio di alert prezzi</strong>: invio di notifiche email quando il prezzo di un prodotto monitorato scende al di sotto del tuo target (base giuridica: consenso)</li>
              <li><strong>Funzionamento tecnico del sito</strong>: garantire il corretto funzionamento della piattaforma (base giuridica: legittimo interesse)</li>
              <li><strong>Miglioramento del servizio</strong>: analisi aggregate e anonime per ottimizzare l'esperienza utente (base giuridica: legittimo interesse)</li>
              <li><strong>Comunicazioni relative al servizio</strong>: invio di informazioni importanti sul funzionamento del servizio (base giuridica: esecuzione del contratto)</li>
            </ul>
          </section>

          {/* Base Giuridica */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Base Giuridica del Trattamento
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Il trattamento dei tuoi dati personali si basa su:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-2">
              <li><strong>Consenso esplicito</strong>: per l'invio di alert prezzi via email</li>
              <li><strong>Legittimo interesse</strong>: per analisi tecniche e miglioramento del servizio</li>
              <li><strong>Esecuzione del contratto</strong>: per fornire il servizio richiesto</li>
            </ul>
          </section>

          {/* Condivisione Dati */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Condivisione dei Dati
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              OcchioAlPrezzo.com <strong>non vende</strong> i tuoi dati personali a terze parti. I dati possono essere condivisi solo nei seguenti casi:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Fornitori di servizi essenziali</strong>: provider di hosting, servizi email (con adeguate garanzie di sicurezza)</li>
              <li><strong>Retailer esterni</strong>: quando clicchi su un link verso un negozio online, sarai reindirizzato al sito del retailer (Amazon, MediaWorld, LDLC, etc.) soggetto alle loro politiche privacy</li>
              <li><strong>Obbligo di legge</strong>: in caso di richiesta da parte di autorità competenti</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Cookie e Tecnologie di Tracciamento
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza sul sito:
              </p>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Cookie tecnici (necessari)
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Essenziali per il funzionamento del sito (es. preferenze di visualizzazione, sessione utente). Non richiedono consenso.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Cookie analitici
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Utilizziamo dati aggregati e anonimi per capire come gli utenti utilizzano il sito e migliorare il servizio.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Puoi gestire le preferenze sui cookie attraverso le impostazioni del tuo browser.
              </p>
            </div>
          </section>

          {/* Sicurezza */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Sicurezza dei Dati
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Adottiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati personali da accesso non autorizzato, perdita, distruzione o alterazione. Le misure includono:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li>Crittografia dei dati in transito (HTTPS/TLS)</li>
              <li>Sistemi di backup regolari</li>
              <li>Accesso limitato ai dati personali solo a personale autorizzato</li>
              <li>Monitoraggio continuo dei sistemi di sicurezza</li>
            </ul>
          </section>

          {/* Conservazione */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Conservazione dei Dati
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Conserviamo i tuoi dati personali solo per il tempo necessario a fornire il servizio richiesto:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
              <li><strong>Email per alert prezzi</strong>: fino alla cancellazione dell'alert o richiesta di eliminazione</li>
              <li><strong>Dati di navigazione</strong>: massimo 12 mesi</li>
              <li><strong>Dati aggregati e anonimi</strong>: possono essere conservati indefinitamente per scopi statistici</li>
            </ul>
          </section>

          {/* Diritti dell'Utente */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. I Tuoi Diritti (GDPR)
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In conformità con il GDPR, hai i seguenti diritti riguardo ai tuoi dati personali:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Diritto di accesso</strong>: richiedere una copia dei dati personali che deteniamo su di te</li>
              <li><strong>Diritto di rettifica</strong>: correggere dati inesatti o incompleti</li>
              <li><strong>Diritto alla cancellazione</strong>: richiedere l'eliminazione dei tuoi dati ("diritto all'oblio")</li>
              <li><strong>Diritto di limitazione</strong>: limitare il trattamento dei tuoi dati in determinate circostanze</li>
              <li><strong>Diritto di opposizione</strong>: opporti al trattamento dei tuoi dati per determinate finalità</li>
              <li><strong>Diritto alla portabilità</strong>: ricevere i tuoi dati in formato strutturato e leggibile</li>
              <li><strong>Diritto di revoca del consenso</strong>: revocare il consenso in qualsiasi momento per l'invio di alert</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
              <p className="text-gray-700">
                <strong>Per esercitare i tuoi diritti</strong>, contattaci all'indirizzo email indicato nella sezione Contatti.
              </p>
            </div>
          </section>

          {/* Link Esterni */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Link a Siti Esterni
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Il nostro sito contiene link a siti web di retailer esterni (Amazon, MediaWorld, LDLC, etc.). 
              <strong> Non siamo responsabili delle pratiche di privacy di questi siti esterni</strong>. 
              Ti invitiamo a leggere le loro politiche sulla privacy prima di fornire dati personali.
            </p>
          </section>

          {/* Modifiche */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Modifiche alla Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento. 
              Le modifiche sostanziali saranno comunicate attraverso il sito web con adeguato preavviso. 
              Ti invitiamo a consultare regolarmente questa pagina per rimanere informato su come proteggiamo i tuoi dati.
            </p>
          </section>

          {/* Contatti */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Contatti
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Per qualsiasi domanda riguardo questa Privacy Policy o per esercitare i tuoi diritti, puoi contattarci:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p className="text-gray-700">
                <strong>Email</strong>: <a href="mailto:privacy@occhioalprezzo.com" className="text-blue-600 hover:underline">privacy@occhioalprezzo.com</a>
              </p>
              <p className="text-gray-700">
                <strong>Sito web</strong>: <a href="/" className="text-blue-600 hover:underline">www.occhioalprezzo.com</a>
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              Ci impegniamo a rispondere alle richieste entro 30 giorni dalla ricezione, come previsto dal GDPR.
            </p>
          </section>

          {/* Autorità Garante */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. Autorità di Controllo
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Hai il diritto di presentare un reclamo presso l'autorità di controllo competente se ritieni che il trattamento dei tuoi dati personali violi il GDPR:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2 mt-4">
              <p className="text-gray-700 font-semibold">
                Garante per la Protezione dei Dati Personali
              </p>
              <p className="text-gray-700">
                Piazza Venezia, 11 - 00187 Roma<br/>
                Centralino telefonico: (+39) 06.696771<br/>
                Fax: (+39) 06.69677.3785<br/>
                Email: <a href="mailto:garante@gpdp.it" className="text-blue-600 hover:underline">garante@gpdp.it</a><br/>
                Sito web: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.garanteprivacy.it</a>
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