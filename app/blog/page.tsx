import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, BlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog - Guide e Consigli Tech | OcchioAlPrezzo',
  description: 'Guide all\'acquisto, confronti prodotti e consigli per risparmiare su tecnologia e hardware. Scopri le migliori offerte tech.',
  openGraph: {
    title: 'Blog Tech - Guide e Confronti | OcchioAlPrezzo',
    description: 'Guide, recensioni e confronti per acquistare tech al miglior prezzo',
  }
};

export default async function BlogPage() {
  const posts: BlogPost[] = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            📚 Blog Tech
          </h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Guide, confronti e consigli per risparmiare su tecnologia
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              📝 Articoli in arrivo... Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Category Badge */}
                <div className="p-4 pb-0">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-blue-600 transition">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>📅 {formatDate(post.date)}</span>
                    <span>⏱️ {post.readingTime} min</span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-700 transition"
                  >
                    Leggi articolo →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🔔 Non perdere le migliori offerte tech!
          </h2>
          <p className="text-gray-600 mb-6">
            Confronta prezzi in tempo reale e risparmia fino al 96%
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Esplora Prodotti
          </Link>
        </div>
      </section>
    </div>
  );
}