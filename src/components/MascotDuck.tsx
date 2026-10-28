import React, { useState } from 'react';
import { Sparkles, MessageCircle, RefreshCw } from 'lucide-react';

interface MascotDuckProps {
  message?: string;
  tip?: string;
  mood?: 'happy' | 'thinking' | 'celebrating' | 'teaching';
  compact?: boolean;
}

const DUKI_QUOTES = [
  'Ingat kawan: turunan itu hanyalah kemiringan garis singgung saat dua titik berpelukan (h → 0)! 🐤✨',
  'Fungsi konstan itu datar kayak jalan tol, makanya gradiennya selalu 0! 🛣️',
  'eˣ itu burung elang kalkulus: diturunkan berapa kali pun, bentuknya tetap dirinya sendiri! 🦅',
  'Saat aturan perkalian (uv)′, ingat lagunya: u′v ditambah uv′! Jangan tertukar ya! 🎵',
  'Garis singgung di puncak gunung atau lembah selalu mendatar dengan gradien m = 0! ⛰️',
  'Latihan 3 soal setiap hari jauh lebih sakti daripada belajar semalam suntuk! Tetap semangat! 💪🐣',
];

export const MascotDuck: React.FC<MascotDuckProps> = ({
  message,
  tip,
  mood = 'happy',
  compact = false,
}) => {
  const [quoteIdx, setQuoteIdx] = useState(0);

  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % DUKI_QUOTES.length);
  };

  const currentSpeech = message || tip || DUKI_QUOTES[quoteIdx];

  if (compact) {
    return (
      <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 shadow-xs">
        <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center text-base shadow-xs shrink-0 select-none animate-bounce">
          🐤
        </div>
        <div className="text-xs text-amber-900 font-medium leading-snug line-clamp-2">
          {currentSpeech}
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50/90 via-sky-50/60 to-emerald-50/70 border border-amber-200/70 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Animated Duck Avatar */}
        <div className="relative shrink-0 select-none">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-100 border-2 border-amber-400/60 flex items-center justify-center shadow-md shadow-amber-400/20">
            <span className="text-2xl transform hover:scale-110 transition-transform">🐤</span>
          </div>
          {/* Scholar Cap Badge */}
          <div className="absolute -top-1.5 -right-1.5 px-1 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-bold shadow-xs">
            🎓
          </div>
        </div>

        {/* Speech Bubble */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-950 font-['Outfit']">Duki Sang Kalkulus</span>
              <span className="px-1.5 py-0.2 text-[10px] font-medium bg-amber-200/60 text-amber-800 rounded-full">
                Teman Belajar
              </span>
            </div>
            <button
              onClick={nextQuote}
              type="button"
              className="p-1 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors"
              title="Ganti tips Duki"
              aria-label="Ganti tips belajar Duki"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            "{currentSpeech}"
          </p>

          <div className="mt-2.5 flex items-center gap-3 text-[11px] text-amber-800/80">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Tips Harian
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 text-teal-600" /> Tanya Konsep Kapan Saja
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
