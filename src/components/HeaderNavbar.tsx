import React from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { Menu, PlayCircle, Sparkles } from 'lucide-react';

interface HeaderNavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleMobileMenu: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  currentPage,
  onNavigate,
  onToggleMobileMenu,
}) => {
  return (
    <header className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Brand Wordmark (Single Element Lockup) */}
        <button
          onClick={() => onNavigate('beranda')}
          type="button"
          className="focus:outline-none text-left shrink-0 cursor-pointer"
          aria-label="Kembali ke Beranda TurunanKu"
        >
          <Logo size="md" showSubtitle={false} />
        </button>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-600"
          aria-label="Navigasi Atas"
        >
          <button
            onClick={() => onNavigate('beranda')}
            type="button"
            className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'beranda'
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => onNavigate('materi')}
            type="button"
            className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'materi'
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            Materi
          </button>
          <button
            onClick={() => onNavigate('simulasi')}
            type="button"
            className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'simulasi'
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            Lab Simulasi
          </button>
          <button
            onClick={() => onNavigate('latihan')}
            type="button"
            className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'latihan'
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            Latihan Soal
          </button>
          <button
            onClick={() => onNavigate('games')}
            type="button"
            className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'games'
                ? 'bg-indigo-50 text-indigo-700 font-bold'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            Games
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Primary CTA (Desktop & Tablet) */}
          <button
            onClick={() => onNavigate('simulasi')}
            type="button"
            className="hidden sm:flex px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-600 rounded-xl hover:from-indigo-700 hover:to-teal-700 shadow-sm shadow-indigo-500/20 transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mulai Eksplorasi</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={onToggleMobileMenu}
            type="button"
            className="md:hidden p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 focus:outline-none cursor-pointer"
            aria-label="Buka Menu Navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
