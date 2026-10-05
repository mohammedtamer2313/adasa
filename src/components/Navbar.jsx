import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Camera, Menu, X, Sparkles, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المدونة', path: '/blog' },
    { name: 'من نحن', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-400 p-[2px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0a0a0a] rounded-[10px] flex items-center justify-center">
                <Camera className="w-6 h-6 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                عدسة
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              </span>
              <span className="text-xs text-neutral-400 font-medium">عالم التصوير الفوتوغرافي</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#161616]/80 p-1.5 rounded-full border border-white/5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Action Button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/blog"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 transition-all shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>ابدأ القراءة</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-[#161616] text-neutral-300 hover:text-white border border-white/5 transition-colors"
              aria-label="القائمة الرئيسية"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0e0e0e] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-500 text-white'
                    : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2">
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white"
            >
              <BookOpen className="w-4 h-4" />
              <span>ابدأ القراءة</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
