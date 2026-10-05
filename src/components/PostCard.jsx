import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function PostCard({ post, viewMode = 'grid' }) {
  if (viewMode === 'list') {
    return (
      <article className="group bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col sm:flex-row">
        {/* Image Container */}
        <div className="sm:w-80 md:w-96 relative overflow-hidden shrink-0 aspect-[16/10] sm:aspect-auto">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
            {post.category}
          </span>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <Link to={`/details/${post.slug}`}>
              <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors leading-snug mb-3">
                {post.title}
              </h3>
            </Link>

            {/* Excerpt */}
            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          </div>

          {/* Author & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-orange-500/50"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">{post.author.name}</span>
                <span className="text-xs text-neutral-400">{post.author.role}</span>
              </div>
            </div>

            <Link
              to={`/details/${post.slug}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-all group-hover:translate-x-1"
            >
              <span>اقرأ المقال</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Grid View (Default)
  return (
    <article className="group bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <Link to={`/details/${post.slug}`}>
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-400 transition-colors leading-snug mb-3">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2 mb-6">
            {post.excerpt}
          </p>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-orange-500/50"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">{post.author.name}</span>
              <span className="text-xs text-neutral-400">{post.author.role}</span>
            </div>
          </div>

          <Link
            to={`/details/${post.slug}`}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-neutral-300 group-hover:bg-orange-500 group-hover:text-white transition-all group-hover:rotate-45"
            aria-label={`قراءة مقال ${post.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
