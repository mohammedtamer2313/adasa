import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mail, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const categories = ['إضاءة', 'بورتريه', 'مناظر طبيعية', 'تقنيات', 'معدات'];

  return (
    <footer className="bg-gradient-to-b from-[#0a0a0a] via-[#110c08] to-[#0a0a0a] border-t border-white/10 text-neutral-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-400 p-[2px] shadow-lg shadow-orange-500/20">
                <div className="w-full h-full bg-[#0a0a0a] rounded-[10px] flex items-center justify-center">
                  <Camera className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white">عدسة</span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين ونصائح عملية لتطوير مهاراتكم.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 relative inline-block">
              استكشف
              <span className="absolute -bottom-1 right-0 w-8 h-[2px] bg-gradient-to-l from-orange-500 to-amber-400 rounded-full"></span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors flex items-center gap-1 group">
                  <ArrowLeft className="w-3.5 h-3.5 text-orange-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-orange-400 transition-colors flex items-center gap-1 group">
                  <ArrowLeft className="w-3.5 h-3.5 text-orange-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  <span>المدونة</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors flex items-center gap-1 group">
                  <ArrowLeft className="w-3.5 h-3.5 text-orange-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  <span>من نحن</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 relative inline-block">
              التصنيفات
              <span className="absolute -bottom-1 right-0 w-8 h-[2px] bg-gradient-to-l from-orange-500 to-amber-400 rounded-full"></span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/blog?category=${encodeURIComponent(cat)}`}
                    className="hover:text-orange-400 transition-colors flex items-center gap-1 group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-orange-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    <span>{cat}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 relative inline-block">
              ابقى على اطلاع
              <span className="absolute -bottom-1 right-0 w-8 h-[2px] bg-gradient-to-l from-orange-500 to-amber-400 rounded-full"></span>
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              اشترك للحصول على أحدث المقالات والتحديثات.
            </p>
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>تم الاشتراك بنجاح! شكراً لك.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="أدخل البريد الالكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-right"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-md shadow-orange-500/20"
                >
                  اشترك
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 عدسة. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            صُنِع بكل <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> لعشاق التصوير
          </p>
        </div>
      </div>
    </footer>
  );
}
