import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  category: string;
  readingTime: number;
  content: string;
}

function ensureContentDir() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  ensureContentDir();

  try {
    console.log('[BLOG] Posts directory:', postsDirectory);
    console.log('[BLOG] Directory exists:', fs.existsSync(postsDirectory));
    
    const fileNames = fs.readdirSync(postsDirectory);
    console.log('[BLOG] Found files:', fileNames);
    
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        console.log('[BLOG] Reading:', fullPath);
        
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        console.log('[BLOG] Parsed:', slug, data.title);

        return {
          slug,
          title: data.title || 'Untitled',
          excerpt: data.excerpt || content.substring(0, 150) + '...',
          date: data.date || new Date().toISOString(),
          updatedAt: data.updatedAt,
          category: data.category || 'Tech',
          readingTime: calculateReadingTime(content),
          content: marked(content) as string,
        };
      });

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) return 1;
      else return -1;
    });
  } catch (error) {
    console.error('[BLOG] Error reading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  ensureContentDir();

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    console.log('[BLOG] getPostBySlug - Looking for:', fullPath);
    console.log('[BLOG] getPostBySlug - Exists:', fs.existsSync(fullPath));

    if (!fs.existsSync(fullPath)) {
      console.log('[BLOG] getPostBySlug - File not found!');
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    console.log('[BLOG] getPostBySlug - Success:', slug, data.title);

    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      date: data.date || new Date().toISOString(),
      updatedAt: data.updatedAt,
      category: data.category || 'Tech',
      readingTime: calculateReadingTime(content),
      content: marked(content) as string,
    };
  } catch (error) {
    console.error(`[BLOG] Error reading post ${slug}:`, error);
    return null;
  }
}