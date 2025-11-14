import Head from 'next/head';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

export default function MetaTags({
  title = 'OcchioAlPrezzo.com - Confronta Prezzi Tech in Tempo Reale',
  description = 'Trova il miglior prezzo per prodotti tech in Italia. Confronta prezzi nuovo e usato, monitora lo storico prezzi e ricevi alert automatici su GPU, CPU, Smartphone, Console e molto altro.',
  keywords = 'confronto prezzi, tech, elettronica, gpu, cpu, smartphone, console, monitor, notebook, prezzo più basso, offerte tech, usato, nuovo',
  ogImage = 'https://occhioalprezzo.com/og-image.jpg',
  ogType = 'website',
  canonical,
  noindex = false,
}: MetaTagsProps) {
  const fullTitle = title.includes('OcchioAlPrezzo') ? title : `${title} | OcchioAlPrezzo.com`;
  const siteUrl = 'https://occhioalprezzo.com';
  const canonicalUrl = canonical || siteUrl;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="OcchioAlPrezzo.com" />
      <meta property="og:locale" content="it_IT" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#2563eb" />
      <meta httpEquiv="content-language" content="it" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}