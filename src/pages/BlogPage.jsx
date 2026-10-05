import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid, List, X, BookOpen, Sparkles, Filter } from 'lucide-react';
import postsData from '../data/posts.json';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'الكل';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const posts = postsData.posts || [];

  const categories = ['الكل', 'إضاءة', 'بورتريه', 'مناظر طبيعية', 'تقنيات', 'معدات'];

  // Sync with URL query parameter
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (cat === 'الكل') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      const matchesCategory = selectedCategory === 'الكل' || post.category === selectedCategory;

      // Search filter
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs sm:text-sm font-semibold mb-2">
          <BookOpen className="w-4 h-4" />
          <span>جميع المقالات</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          استكشف{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
            مقالاتنا
          </span>
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
          اكتشف الدروس والرؤى وأفضل الممارسات لتطوير مهاراتك في التصوير الحديث
        </p>
      </div>

      {/* Toolbar: Search + Category Pills */}
      <div className="space-y-6 bg-[#161616]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
        
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="ابحث في المقالات....."
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pr-12 pl-12 py-3.5 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-right"
          />
          <Search className="w-5 h-5 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips (Pills - not tabs!) */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {categories.map((cat) => {
            const count = cat === 'الكل' ? posts.length : posts.filter(p => p.category === cat).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 scale-105'
                    : 'bg-[#111111] border border-white/10 text-neutral-300 hover:text-white hover:border-orange-500/40'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-black/20 text-white' : 'bg-white/5 text-neutral-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Meta Bar: Results count & Grid/List toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-b border-white/5">
        <div className="text-sm text-neutral-400 font-medium">
          عرض <span className="font-bold text-white">{currentPosts.length}</span> من أصل{' '}
          <span className="font-bold text-orange-400">{filteredPosts.length}</span> من المقالات
          {selectedCategory !== 'الكل' && (
            <span> في قسم <strong className="text-white">"{selectedCategory}"</strong></span>
          )}
          {searchTerm && (
            <span> مطابقة لـ <strong className="text-white">"{searchTerm}"</strong></span>
          )}
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center gap-1 bg-[#161616] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'grid'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="عرض شبكي"
          >
            <Grid className="w-4 h-4" />
            <span>عرض شبكي</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'list'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="عرض قائمة"
          >
            <List className="w-4 h-4" />
            <span>عرض قائمة</span>
          </button>
        </div>
      </div>

      {/* Posts Container */}
      {filteredPosts.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 bg-[#161616]/40 rounded-3xl border border-dashed border-white/10 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto text-orange-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">لم يتم العثور على أي مقالات</h3>
          <p className="text-neutral-400 max-w-md mx-auto text-sm">
            لم نتمكن من إيجاد مقالات تطابق معايير بحثك. جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('الكل');
              searchParams.delete('category');
              setSearchParams(searchParams);
            }}
            className="px-6 py-2.5 rounded-full text-sm font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
          >
            <span>إعادة تعيين الفلاتر</span>
          </button>
        </div>
      ) : (
        /* Grid or List Layout */
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'flex flex-col gap-6'
        }>
          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} viewMode={viewMode} />
          ))}
        </div>
      )}

      {/* Pagination (Bonus 🎁) */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </div>
  );
}
