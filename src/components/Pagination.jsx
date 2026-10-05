import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
      {/* Previous Button (ArrowRight in RTL is previous) */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#161616] text-sm font-medium text-neutral-300 hover:text-white hover:border-orange-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ArrowRight className="w-4 h-4" />
        <span>السابق</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
              currentPage === page
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                : 'bg-[#161616] border border-white/10 text-neutral-300 hover:text-white hover:border-orange-500/40'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button (ArrowLeft in RTL is next) */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#161616] text-sm font-medium text-neutral-300 hover:text-white hover:border-orange-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <span>التالي</span>
        <ArrowLeft className="w-4 h-4" />
      </button>
    </div>
  );
}
