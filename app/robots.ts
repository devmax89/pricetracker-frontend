import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Block AI scrapers from training (optional)
      {
        userAgent: [
          'GPTBot',          // OpenAI
          'ChatGPT-User',    // ChatGPT
          'CCBot',           // Common Crawl
          'anthropic-ai',    // Anthropic
          'Claude-Web',      // Claude
          'Google-Extended', // Google Bard training
        ],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://occhioalprezzo.com/sitemap.xml',
  };
}