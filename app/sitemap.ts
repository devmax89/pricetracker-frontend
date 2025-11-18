import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 🔧 FIX: Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Rivalidate ogni ora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://occhioalprezzo.com';
  
  try {
    // Fetch all products with cache
    const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: { revalidate: 3600 }
    });
    const productsData = await productsResponse.json();
    const products = productsData.data || [];

    // Fetch all categories with cache
    const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: { revalidate: 3600 }
    });
    const categoriesData = await categoriesResponse.json();
    const categories = categoriesData.data || [];

    // 🆕 Read blog posts dynamically from filesystem
    const blogPosts = getBlogPosts(baseUrl);

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
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ];

    // Product pages
    const productPages = products.map((product: any) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(product.updated_at || Date.now()),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    // Category pages
    const categoryPages = categories.map((category: any) => ({
      url: `${baseUrl}/?category=${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...blogPosts, ...productPages, ...categoryPages];
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return at least static pages + blog if fetch fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ];
  }
}

// 🆕 Helper: Read blog posts from content/blog directory
function getBlogPosts(baseUrl: string): MetadataRoute.Sitemap {
  try {
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    
    if (!fs.existsSync(blogDir)) {
      console.warn('Blog directory not found:', blogDir);
      return [];
    }
    
    const files = fs.readdirSync(blogDir);
    
    const posts = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const slug = file.replace('.md', '');
        const filePath = path.join(blogDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);
        
        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: data.date ? new Date(data.date) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        };
      });
    
    return posts;
    
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}