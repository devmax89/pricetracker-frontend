import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from '@/components/CookieBanner';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import Providers from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://occhioalprezzo.com'),
  title: {
    default: 'OcchioAlPrezzo.com - Confronta Prezzi Tech in Tempo Reale',
    template: '%s | OcchioAlPrezzo.com'
  },
  description: 'Trova il miglior prezzo per prodotti tech in Italia. Confronta prezzi nuovo e usato, monitora lo storico prezzi e ricevi alert automatici su GPU, CPU, Smartphone, Console e molto altro.',
  keywords: ['confronto prezzi', 'tech', 'elettronica', 'gpu', 'cpu', 'smartphone', 'console', 'monitor', 'notebook', 'prezzo più basso', 'offerte tech'],
  authors: [{ name: 'OcchioAlPrezzo.com' }],
  creator: 'OcchioAlPrezzo.com',
  publisher: 'OcchioAlPrezzo.com',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OcchioAlPrezzo",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://occhioalprezzo.com',
    siteName: 'OcchioAlPrezzo.com',
    title: 'OcchioAlPrezzo.com - Confronta Prezzi Tech in Tempo Reale',
    description: 'Trova il miglior prezzo per prodotti tech in Italia. Confronta prezzi nuovo e usato in tempo reale.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OcchioAlPrezzo.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OcchioAlPrezzo.com - Confronta Prezzi Tech',
    description: 'Trova il miglior prezzo per prodotti tech in Italia',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // 🆕 Aggiungi dopo Google Search Console
  },
};

export const viewport = {
  themeColor: "#2563eb",
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AnalyticsProvider />
          <Header />
          {children}
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}