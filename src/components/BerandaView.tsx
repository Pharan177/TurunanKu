import React from 'react';
import { PageId } from '../types';
import { MascotDuck } from './MascotDuck';
import heroCalculusImg from '../assets/images/hero_calculus_visual_1793162860913.jpg';
import {
  Sparkles,
  ArrowRight,
  Sliders,
  BookMarked,
  Layers,
  Gamepad2,
  FileCheck2,
  MessageSquareHeart,
  TrendingUp,
  CheckCircle2,
  Zap,
  Target,
} from 'lucide-react';

interface BerandaViewProps {
  onNavigate: (page: PageId, chapterIndex?: number) => void;
  completedChaptersCount: number;
  solvedQuestionsCount: number;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  onNavigate,
  completedChaptersCount,
  solvedQuestionsCount,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner with Modern Pastel Gradients */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-sky-50/50 to-emerald-50/40 shadow-sm">
        {/* Soft Ambient Pastel Glows */}
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-1/3 bottom-0 w-48 h-48 bg-purple-300/15 rounded-full blur-2xl pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            {/* Catchy Pill Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-indigo-200/80 rounded-full text-xs font-bold text-indigo-700 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
              <span>Cara Baru Belajar Kalkulus Interaktif</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-['Outfit']">
              Kuasai Konsep{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-500 bg-clip-text text-transparent">
                Turunan
              </span>{' '}
              Secara Nyata & Ceria.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              Bukan sekadar menghafal rumus mati. Jelajahi laju perubahan, geser garis potong menjadi garis singgung, dan kuasai aturan turunan lewat visual interaktif yang menyenangkan setiap hari!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('materi', 0)}
                type="button"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Mulai Belajar Dari Awal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('simulasi')}
                type="button"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 font-semibold text-sm shadow-xs transition hover:border-slate-300 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>Coba Lab Simulasi Kurva</span>
              </button>
            </div>

            {/* Quick Feature Metric Counters */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200/60 max-w-md text-center sm:text-left">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-800 font-mono">6 Bab</div>
                <div className="text-xs text-slate-500 font-medium">Materi & Aturan</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 font-mono">54 Soal</div>
                <div className="text-xs text-slate-500 font-medium">Tingkat Bertingkat</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-teal-600 font-mono">100%</div>
                <div className="text-xs text-slate-500 font-medium">Visual Interaktif</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Interactive Mockup Card */}
          {/* Hero Visual Card with 3D Illustration & Interactive Formula Preview */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4">
            {/* 3D Isometric Calculus Illustration Card */}
            <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-xl border border-indigo-200/90 bg-white relative group">
              <img
                src={heroCalculusImg}
                alt="Ilustrasi Visual 3D TurunanKu: Duki dan Garis Singgung Kurva"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-102"
                loading="eager"
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-slate-900/85 backdrop-blur-md text-white border border-slate-700/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl select-none animate-bounce">🐤</span>
                  <div>
                    <div className="font-bold font-['Outfit'] text-white">Duki & Garis Singgung Kurva</div>
                    <div className="text-[10px] text-teal-300 font-mono">f′(x₀) = gradien garis singgung</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-bold border border-indigo-400/30">
                  Visual 3D
                </span>
              </div>
            </div>

            {/* Quick Interactive Formula Pill */}
            <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-[#0e172e] text-white p-4 rounded-2xl shadow-md border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span className="text-slate-300">Laju Sesaat: f(x) = x²</span>
                </div>
                <span className="text-sky-300 font-semibold font-mono">f′(x) = 2x</span>
              </div>
              <div className="flex items-center justify-between text-xs bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Titik x₀ = 1.00:</span>
                <span className="text-amber-300 font-bold font-mono">Gradien m = 2.00 ⟶ y = 2x - 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mascot Advice Banner */}
      <MascotDuck />

      {/* Daily Challenge Card for High Engagement (Streak Removed) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-orange-50/90 via-amber-50/70 to-yellow-50/90 border border-orange-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-orange-400 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0 select-none">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                  Misi Belajar Hari Ini
                </h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  Target Ceria ✨
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Selesaikan 3 soal latihan atau coba 1 eksperimen di Lab Kurva untuk mengasah logika kalkulusmu bersama Duki!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('latihan')}
              type="button"
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buka Tantangan Latihan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Navigation Grid (6 Core Modules) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit'] tracking-tight">
              Eksplorasi Modul Pembelajaran
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pilih fitur interaktif yang ingin kamu pelajari hari ini
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            6 Fitur Unggulan
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Materi */}
          <div
            onClick={() => onNavigate('materi')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100 shadow-2xs">
                <BookMarked className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                Materi & Aturan Turunan
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                6 bab tuntas: limit, aljabar, 8 aturan operasi (jumlah, perkalian, pembagian, rantai), eksponensial, dan trigonometri dengan audio pintar.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600">
              <span>Buka Bab Materi</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Latihan */}
          <div
            onClick={() => onNavigate('latihan')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-2xs">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                Latihan Soal Bertingkat
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                54 soal pilihan ganda & isian matematika dalam 3 level (Dasar, Menengah, Menantang) lengkap dengan pembahasan instan.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
              <span>Mulai Latihan</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Lab Simulasi */}
          <div
            onClick={() => onNavigate('simulasi')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-teal-300 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shadow-2xs">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                Lab Simulasi Kurva
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Laboratorium visual SVG: amati transformasi garis potong menjadi garis singgung, perbandingan f(x) vs f′(x), dan kuis prediksi gradien kurva.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600">
              <span>Eksplorasi Lab</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Games */}
          <div
            onClick={() => onNavigate('games')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-300 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-2xs">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                Games Edukasi Interaktif
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mainkan kartu memori pencocokan fungsi & turunannya, tantangan kilat berwaktu, dan arena permainan edukasi ZEP.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-600">
              <span>Mainkan Game</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 5: Asesmen */}
          <div
            onClick={() => onNavigate('asesmen')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-2xs">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                Asesmen & Portofolio
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Panduan tugas kreatif mandiri: slide presentasi, poster infografis, video tutorial, serta pengumpulan tugas via Google Form resmi.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600">
              <span>Instruksi Karya</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 6: Refleksi */}
          <div
            onClick={() => onNavigate('refleksi')}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-pink-300 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100 shadow-2xs">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                Jurnal Refleksi Diri
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                7 tahap refleksi pembelajaran untuk mengukur seberapa dalam pemahamanmu, tersimpan otomatis di perangkatmu.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-pink-600">
              <span>Buka Jurnal</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Cheat Sheet Table / Formula Pill Card */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold font-['Outfit'] text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Cheat Sheet: Rumus Turunan Cepat
            </h3>
            <p className="text-xs text-slate-400">Ringkasan cepat untuk belajar dan latihan harian</p>
          </div>
          <button
            onClick={() => onNavigate('materi')}
            type="button"
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
          >
            Pelajari Detail 8 Aturan →
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-sans text-slate-400 font-bold">Pangkat</span>
            <div className="text-sky-300 font-bold">(xⁿ)′ = n · xⁿ⁻¹</div>
            <div className="text-slate-400 text-[11px] font-sans">(x³)′ = 3x²</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-sans text-slate-400 font-bold">Perkalian</span>
            <div className="text-emerald-300 font-bold">(u · v)′ = u′v + uv′</div>
            <div className="text-slate-400 text-[11px] font-sans">Dua suku bergantian</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-sans text-slate-400 font-bold">Eksponen Euler</span>
            <div className="text-amber-300 font-bold">(eˣ)′ = eˣ</div>
            <div className="text-slate-400 text-[11px] font-sans">Tetap dirinya sendiri</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-sans text-slate-400 font-bold">Trigonometri</span>
            <div className="text-pink-300 font-bold">(sin x)′ = cos x</div>
            <div className="text-slate-400 text-[11px] font-sans">(cos x)′ = −sin x</div>
          </div>
        </div>
      </div>
    </div>
  );
};
