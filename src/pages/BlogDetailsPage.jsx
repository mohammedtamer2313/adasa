import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy, 
  Check, 
  Tag, 
  BookOpen, 
  ListOrdered,
  ChevronLeft
} from 'lucide-react';
import postsData from '../data/posts.json';
import PostCard from '../components/PostCard';

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  const posts = postsData.posts || [];

  // Match by slug or id
  const post = posts.find((p) => p.slug === slug || String(p.id) === slug);

  // Extract headings (## ...) from content for Table of Contents
  const headings = useMemo(() => {
    if (!post || !post.content) return [];
    const lines = post.content.split('\n');
    return lines
      .filter(line => line.startsWith('## '))
      .map((line, idx) => ({
        id: `heading-${idx}`,
        text: line.replace('## ', '').trim(),
      }));
  }, [post]);

  // Related posts (same category, excluding current)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return posts
      .filter((p) => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post, posts]);

  // Copy link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // If post not found
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto text-orange-500">
          <BookOpen className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">المقال غير موجود</h1>
        <p className="text-neutral-400 text-lg">
          عذرًا، لم نتمكن من العثور على المقال المطلوب. ربما تم نقله أو حذفه.
        </p>
        <div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            <span>العودة إلى المدونة</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Parse markdown content into structured sections
  const renderContent = () => {
    if (!post.content) return null;
    const parts = post.content.split(/(?=## )/);

    return parts.map((part, index) => {
      if (part.startsWith('## ')) {
        const lines = part.split('\n');
        const headingText = lines[0].replace('## ', '').trim();
        const bodyLines = lines.slice(1).join('\n').trim();

        return (
          <section key={index} id={`heading-${headings.findIndex(h => h.text === headingText)}`} className="mb-10 scroll-mt-28">
            <h2 className="relative text-2xl sm:text-3xl font-bold text-white mb-4 pr-4 border-r-4 border-orange-500 leading-snug">
              {headingText}
            </h2>
            <div className="text-neutral-300 text-base sm:text-lg leading-loose space-y-4 whitespace-pre-line font-normal">
              {bodyLines}
            </div>
          </section>
        );
      } else {
        return (
          <div key={index} className="text-neutral-300 text-base sm:text-lg leading-loose space-y-4 mb-10 whitespace-pre-line font-normal">
            {part.trim()}
          </div>
        );
      }
    });
  };

  return (
    <article className="pb-24">
      
      {/* Top Banner / Hero Image Layer */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-black/40"></div>

        {/* Header Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 w-full space-y-6">
          
          {/* Breadcrumbs & Category */}
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-neutral-300">
            <Link to="/" className="hover:text-orange-400 transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-orange-400 transition-colors">المدونة</Link>
            <span>/</span>
            <Link to={`/blog?category=${encodeURIComponent(post.category)}`} className="bg-orange-500/20 text-orange-400 px-3 py-0.5 rounded-full border border-orange-500/30">
              {post.category}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.2] drop-shadow-lg">
            {post.title}
          </h1>

          {/* Metadata & Author Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-sm">
            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500"
              />
              <div className="flex flex-col">
                <span className="font-bold text-white text-base">{post.author.name}</span>
                <span className="text-xs text-orange-400 font-medium">{post.author.role}</span>
              </div>
            </div>

            {/* Date & ReadTime */}
            <div className="flex items-center gap-5 text-neutral-300 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-500" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-500" />
                {post.readTime}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Body Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Excerpt Callout */}
            <div className="bg-[#161616] p-6 sm:p-8 rounded-2xl border-r-4 border-orange-500 text-neutral-200 text-lg sm:text-xl leading-relaxed italic">
              {post.excerpt}
            </div>

            {/* Formatted Content */}
            <div className="text-neutral-200">
              {renderContent()}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-orange-500" />
                  <span>الوسوم</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#161616] border border-white/5 hover:border-orange-500/40 text-neutral-300 text-xs px-3.5 py-1.5 rounded-full transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share Box */}
            <div className="bg-[#161616] border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Share2 className="w-5 h-5 text-orange-500" />
                <span>شارك المقال</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white flex items-center justify-center text-neutral-300 transition-all"
                  title="مشاركة على فيسبوك"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white flex items-center justify-center text-neutral-300 transition-all"
                  title="مشاركة على X"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white flex items-center justify-center text-neutral-300 transition-all"
                  title="مشاركة على لينكدإن"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white flex items-center gap-2 text-neutral-300 text-xs font-semibold transition-all"
                  title="نسخ الرابط"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                </button>
              </div>
            </div>

            {/* Author Card Box */}
            <div className="bg-[#161616] border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-orange-500/40 shrink-0"
              />
              <div className="space-y-2 text-center sm:text-right">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">كاتب المقال</span>
                <h3 className="text-2xl font-bold text-white">{post.author.name}</h3>
                <p className="text-sm text-neutral-400">{post.author.role}</p>
                <p className="text-sm text-neutral-300 leading-relaxed pt-1">
                  خبير ومصور شغوف بمشاركة أحدث التقنيات وأسرار التصوير الاحترافي مع مجتمع عدسة.
                </p>
              </div>
            </div>

          </div>

          {/* Sticky Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="sticky top-28 bg-[#161616] border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 pb-3 border-b border-white/10">
                  <ListOrdered className="w-5 h-5 text-orange-500" />
                  <span>محتويات المقال</span>
                </h3>
                <nav className="space-y-2">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const elem = document.getElementById(h.id);
                        if (elem) {
                          elem.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="block text-sm text-neutral-400 hover:text-orange-400 hover:translate-x-1 py-1 transition-all"
                    >
                      • {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

          </div>

        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-white/10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">مقالات قد تعجبك</h2>
                <p className="text-sm text-neutral-400 mt-1">المزيد من مقالات قسم {post.category}</p>
              </div>
              <Link
                to={`/blog?category=${encodeURIComponent(post.category)}`}
                className="text-sm font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 group"
              >
                <span>المزيد</span>
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost) => (
                <PostCard key={relPost.id} post={relPost} />
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
