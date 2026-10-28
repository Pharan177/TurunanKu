import React, { useState, useEffect } from 'react';
import { PageId, GameCardItem } from '../types';
import { generateMatchCards, EXTERNAL_LINKS } from '../data/gamesData';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Sparkles,
  Trophy,
  RotateCcw,
  Timer,
  Play,
  ExternalLink,
  Zap,
  CheckCircle2,
  Lock,
  Unlock,
  BookOpen,
  Swords,
  Compass,
} from 'lucide-react';
import { playClickSound, playCorrectSound, playFanfareSound } from '../utils/soundEffects';

interface GamesViewProps {
  onNavigate: (page: PageId, chapterIndex?: number) => void;
  completedChapters?: number[];
}

export const GamesView: React.FC<GamesViewProps> = ({
  onNavigate,
  completedChapters = [],
}) => {
  // Matching Game State
  const [cards, setCards] = useState<GameCardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<GameCardItem[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  // Teacher / Preview bypass toggle
  const [bypassLock, setBypassLock] = useState<boolean>(false);

  // Unlock requirements:
  // Zep: Materi 01 & 02 (id: 0, 1)
  const isZepUnlocked =
    bypassLock || (completedChapters.includes(0) && completedChapters.includes(1));

  // Math Adventure: Materi 03 (id: 2)
  const isMathAdventureUnlocked =
    bypassLock || completedChapters.includes(2);

  // Derivative Boxing: Materi 04 & 05 (id: 3, 4)
  const isBoxingUnlocked =
    bypassLock || (completedChapters.includes(3) && completedChapters.includes(4));

  // Match Game: All 6 chapters (id: 0, 1, 2, 3, 4, 5)
  const isMatchGameUnlocked =
    bypassLock ||
    [0, 1, 2, 3, 4, 5].every((chId) => completedChapters.includes(chId));

  // Initialize Cards
  const startNewGame = () => {
    const newCards = generateMatchCards(6);
    setCards(newCards);
    setSelectedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setSeconds(0);
    setHasWon(false);
    setIsGameActive(true);
    playClickSound();
  };

  useEffect(() => {
    startNewGame();
  }, []);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGameActive && !hasWon && isMatchGameUnlocked) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, hasWon, isMatchGameUnlocked]);

  // Card Click Handler
  const handleCardClick = (card: GameCardItem) => {
    if (!isGameActive || hasWon || !isMatchGameUnlocked) return;
    if (matchedPairs.includes(card.pairId)) return;
    if (selectedCards.length === 1 && selectedCards[0].id === card.id) return;
    if (selectedCards.length >= 2) return;

    playClickSound();
    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newSelected;

      if (first.pairId === second.pairId && first.type !== second.type) {
        // Correct Match!
        playCorrectSound();
        const newMatched = [...matchedPairs, first.pairId];
        setMatchedPairs(newMatched);
        setSelectedCards([]);

        // Check Win Condition (6 pairs)
        if (newMatched.length === 6) {
          setHasWon(true);
          playFanfareSound();
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#6366F1', '#38BDF8', '#34D399', '#FBBF24', '#F43F5E'],
          });
        }
      } else {
        // Wrong match - flip back after delay
        setTimeout(() => {
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 border border-purple-200 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5" />
              Sistem Belajar & Game Berjenjang
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-['Outfit']">
              Arena Games Matematika TurunanKu
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Mainkan game interaktif untuk melatih insting kalkulusmu! Setiap game akan terbuka seiring dengan materi yang telah kamu tuntaskan.
            </p>
          </div>

          {/* Quick Teacher / Exploration Unlock Toggle */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
            <button
              onClick={() => {
                setBypassLock(!bypassLock);
                playClickSound();
              }}
              type="button"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition shadow-2xs ${
                bypassLock
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title="Buka akses semua game untuk mode guru atau pratinjau cepat"
            >
              {bypassLock ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Semua Terbuka (Mode Eksplorasi Aktif)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Buka Semua Game (Mode Guru/Pratinjau)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Learning Progression Overview Bar */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Progres Pembelajaranmu:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold font-mono">
              {completedChapters.length} dari 6 Bab Selesai
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 ${
                isZepUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {isZepUnlocked ? '✓ ZEP Terbuka' : '🔒 ZEP (Bab 01 & 02)'}
            </span>
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 ${
                isMathAdventureUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {isMathAdventureUnlocked ? '✓ Math Adventure Terbuka' : '🔒 Math Adventure (Bab 03)'}
            </span>
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 ${
                isBoxingUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {isBoxingUnlocked ? '✓ Boxing Terbuka' : '🔒 Boxing (Bab 04 & 05)'}
            </span>
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 ${
                isMatchGameUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {isMatchGameUnlocked ? '✓ Kartu Pasangan Terbuka' : '🔒 Kartu (Semua Bab)'}
            </span>
          </div>
        </div>
      </div>

      {/* ARENA GAME LAINNYA (EXTERNAL & GENIALLY) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Arena Game Interaktif & Petualangan
          </h2>
          <span className="text-xs text-slate-400 font-mono">Tantangan Eksternal</span>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {/* Game 1: ZEP Virtual Math Quiz */}
          <div
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
              isZepUnlocked
                ? 'bg-white border-purple-200/90 shadow-xs hover:shadow-md'
                : 'bg-slate-50/90 border-slate-200 opacity-90'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    isZepUnlocked
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isZepUnlocked ? 'GAME 01 · TERBUKA' : 'GAME 01 · TERKUNCI'}
                </span>
                {!isZepUnlocked && <Lock className="w-4 h-4 text-slate-400" />}
              </div>

              <h3 className="font-bold text-slate-900 text-lg font-['Outfit']">
                ZEP Virtual Math Quiz
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jelajahi arena ruang virtual 2D di ZEP untuk bertanding kuis turunan bersama teman sekelasmu secara langsung di metaverse!
              </p>

              <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 text-[11px] text-purple-900">
                <strong>Syarat Buka:</strong> Selesaikan <strong>Materi 01 (Limit)</strong> dan <strong>Materi 02 (Aljabar)</strong>.
              </div>
            </div>

            <div className="pt-2">
              {isZepUnlocked ? (
                <a
                  href={EXTERNAL_LINKS.zepGameMatch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <span>Mainkan di ZEP Quiz</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => onNavigate('materi', 0)}
                  type="button"
                  className="w-full py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Pelajari Materi 01 & 02</span>
                </button>
              )}
            </div>
          </div>

          {/* Game 2: Genially Math Adventure */}
          <div
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
              isMathAdventureUnlocked
                ? 'bg-white border-amber-200/90 shadow-xs hover:shadow-md'
                : 'bg-slate-50/90 border-slate-200 opacity-90'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    isMathAdventureUnlocked
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isMathAdventureUnlocked ? 'GAME 02 · TERBUKA' : 'GAME 02 · TERKUNCI'}
                </span>
                {!isMathAdventureUnlocked ? (
                  <Lock className="w-4 h-4 text-slate-400" />
                ) : (
                  <Compass className="w-4 h-4 text-amber-600" />
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-lg font-['Outfit']">
                Genially Math Adventure
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Petualangan interaktif memecahkan teka-teki aturan turunan, kaidah perkalian, pembagian, dan aturan rantai yang mendebarkan!
              </p>

              <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 text-[11px] text-amber-900">
                <strong>Syarat Buka:</strong> Selesaikan <strong>Materi 03 (Operasi & Aturan Rantai)</strong>.
              </div>
            </div>

            <div className="pt-2">
              {isMathAdventureUnlocked ? (
                <a
                  href={EXTERNAL_LINKS.geniallyMathAdventure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <span>Mulai Math Adventure</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => onNavigate('materi', 2)}
                  type="button"
                  className="w-full py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Pelajari Materi 03</span>
                </button>
              )}
            </div>
          </div>

          {/* Game 3: Genially Derivative Boxing */}
          <div
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
              isBoxingUnlocked
                ? 'bg-white border-rose-200/90 shadow-xs hover:shadow-md'
                : 'bg-slate-50/90 border-slate-200 opacity-90'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    isBoxingUnlocked
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isBoxingUnlocked ? 'GAME 03 · TERBUKA' : 'GAME 03 · TERKUNCI'}
                </span>
                {!isBoxingUnlocked ? (
                  <Lock className="w-4 h-4 text-slate-400" />
                ) : (
                  <Swords className="w-4 h-4 text-rose-600" />
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-lg font-['Outfit']">
                Genially Derivative Boxing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adu kecepatan dan ketepatan pukulan diferensial untuk fungsi eksponensial Euler dan trigonometri pada ring tinju matematika!
              </p>

              <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100 text-[11px] text-rose-900">
                <strong>Syarat Buka:</strong> Selesaikan <strong>Materi 04 (Eksponensial)</strong> dan <strong>Materi 05 (Trigonometri)</strong>.
              </div>
            </div>

            <div className="pt-2">
              {isBoxingUnlocked ? (
                <a
                  href={EXTERNAL_LINKS.geniallyDerivativeBoxing}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <span>Mulai Derivative Boxing</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => onNavigate('materi', 3)}
                  type="button"
                  className="w-full py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Pelajari Materi 04 & 05</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BUILT-IN INTERACTIVE GAME: MATCH FUNCTION & DERIVATIVE */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-white border border-purple-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  isMatchGameUnlocked
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isMatchGameUnlocked ? 'GAME PAMUNGKAS · TERBUKA' : 'GAME PAMUNGKAS · TERKUNCI'}
              </span>
              {!isMatchGameUnlocked && <Lock className="w-4 h-4 text-slate-400" />}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit'] mt-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Cocokkan Pasangan Fungsi & Turunan
            </h2>
            <p className="text-xs text-slate-500">
              Klik 2 kartu untuk mencocokkan rumus fungsi asli f(x) dengan turunannya f′(x)
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3 text-xs font-mono font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-slate-700">
              <Timer className="w-4 h-4 text-sky-500" />
              <span>{formatTime(seconds)}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-slate-700">
              <span>Langkah:</span>
              <strong className="text-indigo-600">{moves}</strong>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-slate-700">
              <span>Cocok:</span>
              <strong className="text-emerald-600">{matchedPairs.length} / 6</strong>
            </div>
            <button
              onClick={startNewGame}
              disabled={!isMatchGameUnlocked}
              type="button"
              className="p-2 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 text-slate-700 border border-slate-200 shadow-2xs cursor-pointer transition"
              title="Kocok Ulang Kartu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* LOCKED STATE BANNER FOR MATCH GAME */}
        {!isMatchGameUnlocked ? (
          <div className="p-8 sm:p-12 text-center rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800">
            <div className="w-16 h-16 rounded-3xl bg-slate-800 text-amber-400 flex items-center justify-center text-3xl mx-auto shadow-inner">
              🔒
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
                Game Kartu Terkunci
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tantangan ini merupakan uji pemahaman menyeluruh. Selesaikan seluruh <strong>6 Bab Pembelajaran</strong> di menu Materi untuk membuka kartu permainan ini!
              </p>
              <div className="py-2 text-xs font-mono text-amber-400 font-bold">
                Status: {completedChapters.length} / 6 Bab Selesai
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('materi', completedChapters.length < 6 ? completedChapters.length : 0)}
                type="button"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white text-xs font-bold shadow-md cursor-pointer transition"
              >
                Lanjutkan Belajar Materi →
              </button>
              <button
                onClick={() => {
                  setBypassLock(true);
                  playClickSound();
                }}
                type="button"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition border border-slate-700"
              >
                Buka Game Sekarang (Mode Guru)
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Victory Banner */}
            {hasWon && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg font-['Outfit']">
                      Luar Biasa! Semua Pasangan Berhasil Dicocokkan!
                    </h3>
                    <p className="text-xs text-emerald-100">
                      Kamu menyelesaikan game dalam waktu <strong className="text-white">{formatTime(seconds)}</strong> dan{' '}
                      <strong className="text-white">{moves} langkah</strong>.
                    </p>
                  </div>
                </div>
                <button
                  onClick={startNewGame}
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Main Lagi 🔄
                </button>
              </div>
            )}

            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {cards.map((card) => {
                const isSelected = selectedCards.some((c) => c.id === card.id);
                const isMatched = matchedPairs.includes(card.pairId);

                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    className={`aspect-4/3 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 select-none cursor-pointer border ${
                      isMatched
                        ? 'bg-emerald-50/90 border-emerald-300 opacity-90 shadow-2xs scale-98'
                        : isSelected
                        ? 'bg-white border-indigo-400 shadow-md ring-2 ring-indigo-200 scale-102'
                        : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-2xs hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                      <span className={card.type === 'function' ? 'text-indigo-600' : 'text-teal-600'}>
                        {card.label}
                      </span>
                      {isMatched && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                      )}
                    </div>

                    <div className="text-center py-2">
                      <div className="font-mono text-base sm:text-lg font-bold text-slate-800 tracking-tight">
                        {card.latex}
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 text-center font-medium truncate">
                      {card.subtext}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
