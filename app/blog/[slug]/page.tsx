import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, BlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: BlogPost | null = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Articolo non trovato',
    };
  }

  return {
    title: `${post.title} | Blog OcchioAlPrezzo`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post: BlogPost | null = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span className="mx-2 text-gray-400">→</span>
            <Link href="/blog" className="hover:text-blue-600 transition">Blog</Link>
            <span className="mx-2 text-gray-400">→</span>
            <span className="text-gray-900 font-medium">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header - Hero Style */}
      <header className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-4">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight drop-shadow-lg">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span className="font-medium">{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span className="font-medium">{post.readingTime} min</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content - Magazine Style */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-10 lg:p-16">
            <div
              className="article-content
                /* Typography moderna e leggibile */
                [&>h1]:text-4xl [&>h1]:font-black [&>h1]:text-gray-900 [&>h1]:mb-8 [&>h1]:mt-16 [&>h1]:leading-tight
                
                [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-6 [&>h2]:mt-14 
                [&>h2]:pb-4 [&>h2]:border-b-2 [&>h2]:border-blue-200 [&>h2]:leading-snug
                
                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mb-4 [&>h3]:mt-10
                [&>h3]:flex [&>h3]:items-center [&>h3]:gap-3
                
                [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:text-gray-700 [&>h4]:mb-3 [&>h4]:mt-8
                
                /* Paragrafi ariosi */
                [&>p]:text-gray-700 [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-6
                [&>p]:first-of-type:text-xl [&>p]:first-of-type:leading-relaxed [&>p]:first-of-type:text-gray-800
                
                /* Link evidenti */
                [&_a]:text-blue-600 [&_a]:font-semibold [&_a]:underline [&_a]:decoration-2 
                [&_a]:underline-offset-2 hover:[&_a]:text-blue-700 hover:[&_a]:decoration-blue-700
                
                /* Bold più evidente */
                [&_strong]:text-gray-900 [&_strong]:font-bold [&_strong]:bg-yellow-50 [&_strong]:px-1 [&_strong]:rounded
                
                /* Liste spaziose e colorate */
                [&>ul]:my-8 [&>ul]:space-y-4 [&>ul]:ml-6
                [&>ol]:my-8 [&>ol]:space-y-4 [&>ol]:ml-6
                [&_li]:text-gray-700 [&_li]:text-lg [&_li]:leading-relaxed
                [&_li]:pl-2 [&_li]:relative
                [&>ul>li]:before:content-['▸'] [&>ul>li]:before:absolute [&>ul>li]:before:-left-6 
                [&>ul>li]:before:text-blue-600 [&>ul>li]:before:font-bold [&>ul>li]:before:text-xl
                
                /* Separatori eleganti */
                [&>hr]:my-12 [&>hr]:border-0 [&>hr]:h-px [&>hr]:bg-gradient-to-r 
                [&>hr]:from-transparent [&>hr]:via-gray-300 [&>hr]:to-transparent
                
                /* Blockquote stile tip box */
                [&>blockquote]:my-8 [&>blockquote]:p-6 [&>blockquote]:bg-blue-50 
                [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:rounded-r-lg
                [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:shadow-sm
                
                /* Code inline pulito */
                [&_code]:text-sm [&_code]:bg-gray-100 [&_code]:text-blue-700 
                [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:font-mono [&_code]:font-semibold
                
                /* Tabelle moderne (se usi) */
                [&_table]:w-full [&_table]:my-8 [&_table]:border-collapse
                [&_th]:bg-blue-50 [&_th]:p-4 [&_th]:text-left [&_th]:font-bold [&_th]:text-gray-900
                [&_td]:p-4 [&_td]:border-t [&_td]:border-gray-200 [&_td]:text-gray-700
                [&_tr]:hover:bg-gray-50 [&_tr]:transition"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>

        {/* CTA Box - Sticky Style */}
        <div className="my-16">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-8 lg:p-12 text-center shadow-2xl transform hover:scale-105 transition-transform">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
              Trova il Miglior Prezzo
            </h3>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Confronta prezzi in tempo reale su centinaia di prodotti tech
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              Esplora Prodotti →
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pb-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-lg group transition"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Torna al Blog
          </Link>
        </div>
      </div>
    </article>
  );
}