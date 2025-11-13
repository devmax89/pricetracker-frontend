import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from '@/components/CookieBanner';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import Providers from './providers'; // 🆕 AGGIUNGI

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OcchioAlPrezzo.com - Il tuo radar sulle offerte tech",
  description: "Trova il miglior prezzo tech in Italia. Confronta prezzi nuovo e usato, storico prezzi e alert automatici.",
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
};

export const viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers> {/* 🆕 WRAP TUTTO */}
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