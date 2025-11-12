import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from '@/components/CookieBanner';
import AnalyticsProvider from '@/components/AnalyticsProvider';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AnalyticsProvider />
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}