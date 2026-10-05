import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        
        {/* Big 404 number with gradient */}
        <div className="relative inline-block">
          <span className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 drop-shadow-2xl">
            404
          </span>
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          عفواً! الصفحة غير موجودة
        </h1>

        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعيدك إلى المسار الصحيح.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/20"
          >
            <Home className="w-4 h-4" />
            <span>الذهاب للرئيسية</span>
          </Link>
          <Link
            to="/blog"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-[#161616] border border-white/10 text-white hover:bg-white/5 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>تصفح المقالات</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
