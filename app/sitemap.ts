import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://occhioalprezzo.com';
  
  try {
    // Fetch all products
    const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      cache: 'no-store'
    });
    const productsData = await productsResponse.json();
    const products = productsData.data || [];

    // Fetch all categories
    const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      cache: 'no-store'
    });
    const categoriesData = await categoriesResponse.json();
    const categories = categoriesData.data || [];

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/offerte`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/admin/dashboard`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.3,
      },
    ];

    // Product pages
    const productPages = products.map((product: any) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(product.updated_at || Date.now()),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

    // Category pages
    const categoryPages = categories.map((category: any) => ({
      url: `${baseUrl}/?category=${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...productPages, ...categoryPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least the homepage if fetch fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
    ];
  }
}