import React from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
import {
  Home,
  Compass,
  BookOpen,
  CheckSquare,
  Gamepad2,
  Sliders,
  Award,
  MessageSquareHeart,
  RotateCcw,
  Sparkles,
  X,
  ChevronRight,
} from 'lucide-react';
import { getMasteryDetails } from '../math/calculus';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  completedChaptersCount: number;
  totalChaptersCount: number;
  isOpenOnMobile: boolean;
  onCloseMobile: () => void;
  onResetProgress: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  completedChaptersCount,
  totalChaptersCount,
  isOpenOnMobile,
  onCloseMobile,
  onResetProgress,
}) => {
  const masteryPct = Math.round((completedChaptersCount / totalChaptersCount) * 100);
  const mastery = getMasteryDetails(masteryPct);

  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }>; color: string; badge?: string }[] = [
    { id: 'beranda', label: 'Beranda', icon: Home, color: 'text-indigo-500' },
    { id: 'panduan', label: 'Panduan Belajar', icon: Compass, color: 'text-emerald-500' },
    { id: 'materi', label: 'Materi & Konsep', icon: BookOpen, color: 'text-sky-500', badge: '6 Bab' },
    { id: 'latihan', label: 'Latihan Bertingkat', icon: CheckSquare, color: 'text-amber-500', badge: '54 Soal' },
    { id: 'games', label: 'Games Edukasi', icon: Gamepad2, color: 'text-purple-500', badge: 'Populer' },
    { id: 'simulasi', label: 'Lab Simulasi Kurva', icon: Sliders, color: 'text-teal-500', badge: 'Interaktif' },
    { id: 'asesmen', label: 'Asesmen Mandiri', icon: Award, color: 'text-rose-500' },
    { id: 'refleksi', label: 'Jurnal Refleksi', icon: MessageSquareHeart, color: 'text-pink-500' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenOnMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 md:z-20 w-72 md:h-screen md:overflow-y-auto bg-gradient-to-b from-slate-900 via-slate-900 to-[#0c162c] text-white border-r border-slate-800 flex flex-col p-4 sm:p-5 shrink-0 transition-transform duration-300 ease-in-out ${
          isOpenOnMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
          <Logo size="md" showSubtitle={true} isDark={true} className="text-white" />
          <button
            onClick={onCloseMobile}
            type="button"
            className="md:hidden p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Motivational Greeting with Mascot Duki */}
        <div className="p-3 mb-4 rounded-2xl bg-gradient-to-r from-indigo-950/70 to-slate-800/60 border border-indigo-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl select-none animate-bounce">🐤</span>
            <div>
              <div className="text-[11px] font-semibold text-slate-300">Halo, Sobat Kalkulus!</div>
              <div className="text-xs font-bold text-amber-300">
                Bersama Duki Si Bebek
              </div>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
            Siap Belajar
          </span>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1 flex-1 overflow-y-auto pr-1" aria-label="Navigasi Menu Utama">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                type="button"
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/90 to-sky-600/90 text-white font-bold shadow-md shadow-indigo-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : (
                  isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Progress Tracker Card */}
        <div className="mt-auto pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/70 border border-slate-800/90 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Penguasaan Materi
              </span>
              <span className="text-xs font-bold text-teal-300 font-mono tabular-nums">
                {masteryPct}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-indigo-500 via-sky-400 to-teal-400 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${masteryPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{completedChaptersCount} dari {totalChaptersCount} bab tuntas</span>
              <span className="text-amber-400 font-semibold">{mastery.badge}</span>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                onClick={() => {
                  onNavigate('asesmen');
                  onCloseMobile();
                }}
                type="button"
                className="py-1.5 px-2 bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-800/60 rounded-xl text-[11px] font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
                title="Klaim Sertifikat Kelulusan"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Sertifikat</span>
              </button>

              <button
                onClick={onResetProgress}
                type="button"
                className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-xl text-[11px] font-medium transition flex items-center justify-center gap-1 cursor-pointer"
                title="Reset progres"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
