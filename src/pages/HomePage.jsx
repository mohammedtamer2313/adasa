import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Sun, 
  User, 
  Mountain, 
  Sliders, 
  Camera, 
  CheckCircle2, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Layers 
} from 'lucide-react';
import postsData from '../data/posts.json';
import PostCard from '../components/PostCard';

export default function HomePage() {
  const posts = postsData.posts || [];
  
  // Featured posts (first 3 featured)
  const featuredPosts = posts.filter(p => p.featured).slice(0, 3);
  
  // Latest posts (sorted by date descending, first 3)
  const latestPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  // Category counts
  const categoriesList = [
    { name: 'إضاءة', icon: Sun, desc: 'أسرار التحكم بالضوء الطبيعي والصناعي' },
    { name: 'بورتريه', icon: User, desc: 'فنون التقاط المشاعر والملامح الإنسانية' },
    { name: 'مناظر طبيعية', icon: Mountain, desc: 'توثيق سحر الأرض وروعة الطبيعة' },
    { name: 'تقنيات', icon: Sliders, desc: 'إتقان إعدادات الكاميرا والتكوين الفني' },
    { name: 'معدات', icon: Camera, desc: 'دليل اختيار العدسات والكاميرات المناسبة' },
  ];

  const getCategoryCount = (catName) => {
    return posts.filter(p => p.category === catName).length;
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md animate-fade-in">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>مرحباً بك في عدسة</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.2] max-w-4xl mx-auto mb-6">
            اكتشف{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400">
              فن التصوير
            </span>{' '}
            الفوتوغرافي
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
            انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/blog"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              <span>استكشف المقالات</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-[#161616] border border-white/10 text-white hover:bg-white/5 hover:border-white/20 transition-all"
            >
              <span>اعرف المزيد</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-[#161616]/80 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex flex-col items-center hover:border-orange-500/30 transition-all">
              <BookOpen className="w-6 h-6 text-orange-500 mb-2" />
              <span className="text-2xl sm:text-3xl font-black text-white">{posts.length}</span>
              <span className="text-xs text-neutral-400 font-medium">مقالة</span>
            </div>
            <div className="bg-[#161616]/80 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex flex-col items-center hover:border-orange-500/30 transition-all">
              <Users className="w-6 h-6 text-orange-500 mb-2" />
              <span className="text-2xl sm:text-3xl font-black text-white">+ 10 ألف</span>
              <span className="text-xs text-neutral-400 font-medium">قارئ</span>
            </div>
            <div className="bg-[#161616]/80 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex flex-col items-center hover:border-orange-500/30 transition-all">
              <Layers className="w-6 h-6 text-orange-500 mb-2" />
              <span className="text-2xl sm:text-3xl font-black text-white">5</span>
              <span className="text-xs text-neutral-400 font-medium">تصنيفات</span>
            </div>
            <div className="bg-[#161616]/80 backdrop-blur-md border border-white/5 p-5 rounded-2xl flex flex-col items-center hover:border-orange-500/30 transition-all">
              <Camera className="w-6 h-6 text-orange-500 mb-2" />
              <span className="text-2xl sm:text-3xl font-black text-white">{posts.length}</span>
              <span className="text-xs text-neutral-400 font-medium">كاتب</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مميزة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">مقالات مختارة</h2>
            <p className="text-neutral-400 text-sm mt-1">محتوى منتقى لبدء رحلة تعلمك</p>
          </div>
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors group"
          >
            <span>عرض الكل</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Explore by Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>التصنيفات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">استكشف حسب الموضوع</h2>
          <p className="text-neutral-400 text-sm">اعثر على محتوى مصمم حسب اهتماماتك</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            const count = getCategoryCount(cat.name);
            return (
              <Link
                key={cat.name}
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="group bg-[#161616] border border-white/5 hover:border-orange-500/50 p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-amber-500 transition-all duration-300">
                  <Icon className="w-7 h-7 text-orange-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors mb-1">
                  {cat.name}
                </h3>
                <span className="text-xs text-orange-400/90 font-medium mb-2">
                  {count} مقالات
                </span>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {cat.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>الأحدث</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">أحدث المقالات</h2>
            <p className="text-neutral-400 text-sm mt-1">محتوى جديد طازج من المطبعة</p>
          </div>
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors group"
          >
            <span>عرض جميع المقالات</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold bg-[#161616] border border-white/10 hover:border-orange-500/40 text-white transition-all hover:shadow-lg hover:shadow-orange-500/10"
          >
            <span>عرض جميع المقالات ({posts.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1b1008] via-[#161616] to-[#120e0a] border border-orange-500/20 p-8 sm:p-12 md:p-16 text-center">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              اشترك في{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                نشرتنا الإخبارية
              </span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('شكراً لاشتراكك في نشرة عدسة!');
              }}
              className="pt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-all text-right"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-md shadow-orange-500/20 shrink-0"
              >
                اشترك الان
              </button>
            </form>

            <p className="text-xs text-neutral-500 pt-2">
              انضم لـ 10,000+ مصور • بدون إزعاج • إلغاء الاشتراك في أي وقت
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
