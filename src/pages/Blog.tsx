import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import PageTransition from '../components/PageTransition';
import { Calendar, User, ArrowLeft, BookOpen, Clock, Tag, ChevronRight } from 'lucide-react';

// Custom lightweight frontmatter parser for browser environments
function parseFrontmatter(rawContent: string) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);
  if (!match) {
    return { data: {} as Record<string, string>, content: rawContent };
  }
  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, string> = {};
  yamlBlock.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const value = parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '');
      data[key] = value;
    }
  });
  return { data, content };
}

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  coverImage: string;
  category: string;
  content: string;
}

export default function Blog() {
  const { slug } = useParams<{ slug?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Dynamically import posts
  const posts = useMemo(() => {
    const postsGlob = import.meta.glob('../posts/*.md', { query: '?raw', eager: true }) as Record<string, { default: string }>;
    
    return Object.entries(postsGlob).map(([filePath, fileModule]) => {
      const rawContent = fileModule.default;
      const { data, content } = parseFrontmatter(rawContent);
      const postSlug = filePath.split('/').pop()?.replace('.md', '') || '';
      return {
        slug: postSlug,
        title: data.title || 'Untitled Post',
        date: data.date || '',
        author: data.author || 'DHAYATRADERS',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '/assets/20260610_173338.webp',
        category: data.category || 'Construction',
        content,
      } as BlogPost;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(posts.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return posts;
    return posts.filter(p => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  const currentPost = useMemo(() => {
    if (!slug) return null;
    return posts.find(p => p.slug === slug) || null;
  }, [posts, slug]);

  // Calculate reading time
  const readingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (currentPost) {
    const rt = readingTime(currentPost.content);
    return (
      <PageTransition>
        <Helmet>
          <title>{currentPost.title} | DHAYATRADERS Blog</title>
          <meta name="description" content={currentPost.excerpt} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${currentPost.title} | DHAYATRADERS Blog`} />
          <meta name="twitter:image" content={currentPost.coverImage} />
          <link rel="canonical" href={`https://dhayatraders.com/blog/${currentPost.slug}`} />
        </Helmet>

        <article className="min-h-screen bg-white text-navy font-sans pt-20">
          {/* Post Header Image banner */}
          <div className="h-64 sm:h-[450px] w-full bg-navy-deep relative overflow-hidden">
            <img
              src={currentPost.coverImage}
              alt={currentPost.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-navy-deep/40 to-[#0d2136]/60" />
            
            {/* Header Content overlays */}
            <div className="absolute bottom-6 left-0 right-0 max-w-4xl mx-auto px-4 md:px-6">
              <div className="space-y-3">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-xs text-teal font-extrabold uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 hover:bg-white/20 transition-all"
                >
                  <ArrowLeft className="h-3 w-3" /> Back to Articles
                </Link>
                
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                  {currentPost.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-xs text-slate-200 pt-2 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-teal" /> {currentPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-teal" /> {currentPost.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-teal" /> {rt} min read
                  </span>
                  <span className="flex items-center gap-1.5 bg-teal/20 text-teal px-2 py-0.5 rounded border border-teal/40 uppercase font-bold text-[10px]">
                    <Tag className="h-3 w-3 inline" /> {currentPost.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Post Markdown Content */}
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 text-left">
            <div className="font-sans">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy mt-8 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy mt-8 mb-4 border-b border-silver pb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg sm:text-xl font-serif font-bold text-navy mt-6 mb-3">{children}</h3>,
                  p: ({ children }) => <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-xs sm:text-sm text-slate-600">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 pl-4 text-xs sm:text-sm text-slate-600">{children}</ol>,
                  li: ({ children }) => <li className="text-xs sm:text-sm text-slate-600">{children}</li>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-steel bg-slate-50 px-4 py-3 my-6 italic text-slate-700 rounded-r-lg font-serif">{children}</blockquote>,
                }}
              >
                {currentPost.content}
              </ReactMarkdown>
            </div>
            
            <div className="border-t border-silver mt-12 pt-8 flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold font-sans">Published by</p>
                <p className="text-sm font-serif font-bold text-navy">{currentPost.author}</p>
              </div>
              <Link
                to="/contact"
                className="bg-steel hover:bg-navy text-white text-xs uppercase tracking-widest font-extrabold py-3 px-6 rounded-lg transition-colors block text-center shadow hover:shadow-lg"
              >
                Inquire With DHAYATRADERS
              </Link>
            </div>
          </div>
        </article>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Corporate Construction & Real Estate Blog | DHAYATRADERS</title>
        <meta name="description" content="Stay updated with industry trends, expert building guides, material selection guides, and property investment tips in Erode from DHAYATRADERS." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Corporate Construction & Real Estate Blog | DHAYATRADERS" />
        <meta name="twitter:image" content="/assets/og-image.webp" />
        <link rel="canonical" href="https://dhayatraders.com/blog" />
      </Helmet>

      <div className="min-h-screen bg-gray-light text-navy font-sans pt-20">
        {/* Banner Block */}
        <div className="bg-navy-deep text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-steel-radial opacity-20 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 text-center space-y-4">
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-teal font-extrabold block">Dhaya Insights</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Corporate Knowledge Hub
            </h1>
            <div className="w-16 h-1 bg-teal mx-auto rounded-full" />
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
              Practical guides, engineering bulletins, and real estate market analysis curated by our certified civil builders and legal consultants.
            </p>
          </div>
        </div>

        {/* Listing Block */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-10">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-steel text-white shadow-md'
                    : 'bg-white text-slate-600 border border-silver hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => {
              const rt = readingTime(post.content);
              return (
                <div
                  key={post.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-silver shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-48 w-full relative overflow-hidden bg-navy-deep">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1.5 rounded bg-[#0D2136]/90 backdrop-blur-md text-white border border-white/10 shadow-lg">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex gap-4 text-[10px] text-slate-400 font-bold font-sans">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-steel" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-steel" /> {rt} min read
                        </span>
                      </div>
                      <h2 className="font-serif text-lg font-bold text-navy leading-snug hover:text-steel transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="border-t border-silver pt-4 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold font-sans">By {post.author.split(',')[0]}</span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-steel hover:text-navy transition-all"
                      >
                        <span>Read Article</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16 bg-white border border-silver rounded-2xl">
              <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500 font-semibold">No articles found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
