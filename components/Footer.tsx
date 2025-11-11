import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Links Row */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <Link href="/come-funziona" className="text-gray-400 hover:text-white transition">
            Come Funziona
          </Link>
          <span className="text-gray-600">•</span>
          <Link href="/privacy" className="text-gray-400 hover:text-white transition">
            Privacy
          </Link>
          <span className="text-gray-600">•</span>
          <Link href="/contatti" className="text-gray-400 hover:text-white transition">
            Contatti
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-300">
            © 2025 OcchioAlPrezzo.com - Tutti i diritti riservati
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Amazon, MediaWorld, LDLC, Subito.it e altri marchi sono proprietà dei rispettivi proprietari
          </p>
        </div>
      </div>
    </footer>
  );
}