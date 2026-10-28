import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { EXTERNAL_LINKS } from '../data/gamesData';
import {
  calculateSecantSlope,
  calculateTangentQuadratic,
  formatNum,
  formatPoly,
  evaluateSlopeSign,
} from '../math/calculus';
import { playClickSound, playCorrectSound, playFanfareSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Headphones,
  BookOpen,
  Sparkles,
  Play,
  Info,
  Youtube,
  Award,
  Sliders,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';

interface MateriViewProps {
  initialChapterIndex?: number;
  onNavigate: (page: PageId) => void;
  completedChapters: number[];
  onCompleteChapter: (chapterId: number) => void;
}

export const MateriView: React.FC<MateriViewProps> = ({
  initialChapterIndex = 0,
  onNavigate,
  completedChapters,
  onCompleteChapter,
}) => {
  const [activeChapter, setActiveChapter] = useState(initialChapterIndex);
  const [activeRuleIdx, setActiveRuleIdx] = useState(0);

  // Audio Speech state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<string>('');
  const speechSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

  // Celebration Reward Modal State
  const [showRewardModal, setShowRewardModal] = useState<boolean>(false);

  // Mini Explorer 1: Garis Potong slider h
  const [secantH, setSecantH] = useState<number>(1.0);

  // Explorer 6: Interactive Quadratic & Tangent Line Simulation
  const [coefA, setCoefA] = useState<number>(1);
  const [coefB, setCoefB] = useState<number>(2);
  const [coefC, setCoefC] = useState<number>(-3);
  const [tangentX0, setTangentX0] = useState<number>(2.0);

  // Video embed visibility
  const [showVideoEmbed, setShowVideoEmbed] = useState<boolean>(true);

  const chapter = CHAPTERS_DATA[activeChapter];

  // Stop speech on chapter switch
  useEffect(() => {
    if (speechSupported && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setSpeechStatus('');
  }, [activeChapter]);

  // Audio speech handler
  const handlePlayAudio = () => {
    if (!speechSupported) {
      setSpeechStatus('Audio Web Speech API tidak didukung di browser ini.');
      return;
    }
    window.speechSynthesis.cancel();
    playClickSound();

    const utterance = new SpeechSynthesisUtterance(chapter.audioText);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setSpeechStatus('Sedang memutar audio penjelasan cerdas...');
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setSpeechStatus('Penjelasan audio selesai didengarkan.');
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setSpeechStatus('Audio dihentikan.');
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopAudio = () => {
    if (speechSupported && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setSpeechStatus('Audio dihentikan.');
  };

  // Chapter completion with rewarding confetti animation
  const handleMarkComplete = () => {
    onCompleteChapter(chapter.id);
    playFanfareSound();
    setShowRewardModal(true);

    // Multi-angle confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#6366F1', '#38BDF8', '#34D399', '#FBBF24', '#F472B6'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 250);
  };

  // SVG Plot Calculations for Chapter 1: f(x) = x^2, A(1, 1), B(1+h, (1+h)^2)
  const x1 = 1 + secantH;
  const y1 = x1 * x1;
  const secantSlope = calculateSecantSlope(1, secantH, (x) => x * x);

  // SVG Dimension helpers for Chapter 1
  const W1 = 600;
  const H1 = 280;
  const pad1 = 35;
  const toX1 = (val: number, min = -1.5, max = 3.5) => pad1 + ((val - min) / (max - min)) * (W1 - 2 * pad1);
  const toY1 = (val: number, min = -1, max = 10) => H1 - pad1 - ((val - min) / (max - min)) * (H1 - 2 * pad1);

  let curveD1 = '';
  for (let i = 0; i <= 100; i++) {
    const cx = -1.5 + (5.0 * i) / 100;
    const cy = cx * cx;
    curveD1 += (i === 0 ? 'M' : 'L') + toX1(cx).toFixed(1) + ' ' + toY1(cy).toFixed(1);
  }

  const secantXStart = -1.5;
  const secantYStart = 1 + secantSlope * (secantXStart - 1);
  const secantXEnd = 3.5;
  const secantYEnd = 1 + secantSlope * (secantXEnd - 1);

  // Chapter 6: Detailed Parabola & Tangent Line Simulation
  const tangentData = calculateTangentQuadratic(coefA, coefB, coefC, tangentX0);
  const slopeSign = evaluateSlopeSign(tangentData.slope);

  // SVG bounds for Chapter 6 Parabola
  const W6 = 600;
  const H6 = 300;
  const pad6 = 35;
  const minX6 = -5;
  const maxX6 = 5;
  const minY6 = -10;
  const maxY6 = 12;

  const toX6 = (x: number) => pad6 + ((x - minX6) / (maxX6 - minX6)) * (W6 - 2 * pad6);
  const toY6 = (y: number) => H6 - pad6 - ((y - minY6) / (maxY6 - minY6)) * (H6 - 2 * pad6);

  let curveD6 = '';
  for (let i = 0; i <= 100; i++) {
    const cx = minX6 + ((maxX6 - minX6) * i) / 100;
    const cy = coefA * cx * cx + coefB * cx + coefC;
    if (Number.isFinite(cy) && cy >= -25 && cy <= 35) {
      curveD6 += (curveD6 === '' ? 'M' : 'L') + toX6(cx).toFixed(1) + ' ' + toY6(cy).toFixed(1);
    }
  }

  // Tangent line path
  const tXStart = minX6;
  const tYStart = tangentData.tangentFn(tXStart);
  const tXEnd = maxX6;
  const tYEnd = tangentData.tangentFn(tXEnd);

  // Presets for Chapter 6
  const setPresetCurve = (a: number, b: number, c: number, x0: number) => {
    setCoefA(a);
    setCoefB(b);
    setCoefC(c);
    setTangentX0(x0);
    playClickSound();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Chapter Completion Reward Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-100 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-500 to-teal-400 text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-indigo-500/25">
              🏆
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Pencapaian Baru Terbuka!
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 font-['Outfit']">
                Bab {chapter.number} Berhasil Dituntaskan!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Hebat sekali! Kamu telah mempelajari konsep {chapter.title}. Tetap jaga semangat belajarmu bersama Duki 🐤
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
              <span>Status Belajar:</span>
              <strong className="text-emerald-600 font-mono">
                {completedChapters.length} dari 6 Bab Selesai
              </strong>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowRewardModal(false)}
                type="button"
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Tetap di Bab Ini
              </button>
              <button
                onClick={() => {
                  setShowRewardModal(false);
                  if (activeChapter < CHAPTERS_DATA.length - 1) {
                    setActiveChapter((c) => c + 1);
                  } else {
                    onNavigate('latihan');
                  }
                }}
                type="button"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-xs font-bold shadow-md cursor-pointer hover:from-indigo-700 hover:to-sky-700"
              >
                {activeChapter === 5 ? 'Lanjut Latihan →' : 'Bab Berikutnya →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Tabs Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
            Ensiklopedi Kalkulus
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Materi & Konsep Pembelajaran
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-slate-600 flex items-center gap-1.5">
            {completedChapters.includes(activeChapter) ? (
              <span className="text-emerald-600 flex items-center gap-1 font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> Bab Ini Tuntas
              </span>
            ) : (
              <span>Sedang Dipelajari</span>
            )}
            <span className="text-slate-400">·</span>
            <span className="font-mono text-indigo-600 font-bold">
              {completedChapters.length}/6 Selesai
            </span>
          </span>
        </div>
      </div>

      {/* Chapter Selector Tabs */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2 bg-slate-100/90 rounded-2xl border border-slate-200/90 shadow-2xs"
        role="tablist"
        aria-label="Pilihan Bab Materi"
      >
        {CHAPTERS_DATA.map((ch, idx) => {
          const isActive = activeChapter === idx;
          const isDone = completedChapters.includes(idx);
          return (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChapter(idx);
                playClickSound();
              }}
              type="button"
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 text-left ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm font-bold ring-2 ring-indigo-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
              role="tab"
              aria-selected={isActive}
            >
              <span className="truncate">{ch.tabLabel}</span>
              {isDone ? (
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 fill-emerald-100" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Chapter Content Container */}
      <article className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
        {/* Header Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${chapter.themeColor.badgeBg} ${chapter.themeColor.badgeText}`}
            >
              BAB {chapter.number} · {chapter.topicKicker}
            </span>
            <span className="text-xs text-slate-400 font-mono">Modul Konseptual</span>
          </div>

          {chapter.youtubeId && (
            <a
              href={`https://www.youtube.com/watch?v=${chapter.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-semibold hover:bg-red-100 transition-colors shadow-2xs"
            >
              <Youtube className="w-4 h-4 text-red-600" />
              <span>Buka Video di YouTube</span>
            </a>
          )}
        </div>

        {/* Title & Introductory Explanation */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            {chapter.title}
          </h2>
          <p className="text-sm sm:text-base font-medium text-slate-500 mt-1">
            {chapter.subtitle}
          </p>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {chapter.summary}
          </p>
        </div>

        {/* Formula Block */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-sky-300 font-mono text-sm sm:text-base border border-slate-800 shadow-inner overflow-x-auto flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-sans font-bold">
              Rumusan Matematis Inti
            </div>
            <div className="font-bold text-white text-base sm:text-lg">
              {chapter.formula}
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-sans font-semibold border border-sky-400/20 shrink-0">
            Kalkulus
          </div>
        </div>

        {/* Audio Guide Bar with Live Animated Equalizer Wave */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#101b33] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Audio Guide Pintar
              </div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>Dengarkan Penjelasan Konsep Bab {chapter.number}</span>
                {isPlayingAudio && (
                  <div className="flex items-center gap-1 h-4">
                    <span className="w-1 h-3 bg-sky-400 rounded-full animate-bounce" />
                    <span className="w-1 h-4 bg-teal-400 rounded-full animate-pulse" />
                    <span className="w-1 h-2 bg-indigo-400 rounded-full animate-bounce" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePlayAudio}
              type="button"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Putar Audio</span>
            </button>
            <button
              onClick={handleStopAudio}
              type="button"
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <VolumeX className="w-4 h-4" />
              <span>Stop</span>
            </button>
          </div>
        </div>
        {speechStatus && (
          <p className="text-xs text-slate-500 italic font-medium -mt-2">
            {speechStatus}
          </p>
        )}

        {/* Video Pembelajaran Card (for chapters with YouTube videos) */}
        {chapter.youtubeId && (
          <div className="p-5 rounded-3xl bg-gradient-to-br from-red-50/70 via-rose-50/30 to-white border border-red-200/80 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100/70 px-2 py-0.5 rounded-md">
                      Video Pembelajaran Interaktif
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Bab {chapter.number}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit'] mt-0.5">
                    {chapter.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowVideoEmbed(!showVideoEmbed)}
                  type="button"
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer transition shadow-2xs"
                >
                  {showVideoEmbed ? 'Sembunyikan Pemutar' : 'Tampilkan Pemutar'}
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${chapter.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1 shadow-2xs transition"
                >
                  <span>Buka di YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {showVideoEmbed && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${chapter.youtubeId}?rel=0`}
                  title={`Video Pembelajaran ${chapter.title}`}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}

        {/* Detailed Chapter-Specific Visual Exploration */}
        {chapter.id === 0 && (
          /* Chapter 1: Garis Potong Menuju Garis Singgung */
          <div className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/90 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                  Mini Eksplorasi: Garis Potong Menuju Garis Singgung
                </h3>
                <p className="text-xs text-slate-500">
                  Amati kurva f(x) = x² dengan titik tetap A(1, 1) dan titik kedua B(1+h, f(1+h))
                </p>
              </div>
              <span className="px-3 py-1 bg-sky-100 text-sky-800 border border-sky-200 rounded-xl text-xs font-mono font-bold">
                f(x) = x²
              </span>
            </div>

            {/* Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="secant-slider" className="font-bold text-slate-700">
                  Geser Jarak Antara Titik (h):
                </label>
                <span className="font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                  h = {formatNum(secantH, 2)}
                </span>
              </div>
              <input
                id="secant-slider"
                type="range"
                min="-2"
                max="2"
                step="0.05"
                value={secantH}
                onChange={(e) => setSecantH(parseFloat(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            {/* Live Readout Pill */}
            <div className="p-3 bg-white rounded-2xl border border-slate-200 font-mono text-xs text-slate-800 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
              <div>
                Titik A(1.00, 1.00) ⟶ Titik B({formatNum(x1)}, {formatNum(y1)})
              </div>
              <div>
                Gradien {Math.abs(secantH) < 1e-6 ? 'Garis Singgung (Limit)' : 'Garis Potong'}:{' '}
                <strong className="text-teal-700 font-bold text-sm">
                  m = {formatNum(secantSlope)}
                </strong>
              </div>
            </div>

            {/* SVG Plot */}
            <svg
              className="w-full aspect-[600/280] bg-white rounded-2xl border border-slate-200 shadow-inner"
              viewBox={`0 0 ${W1} ${H1}`}
              role="img"
              aria-label="Grafik Garis Potong Kurva x kuadrat"
            >
              {/* Grid Lines */}
              {[-1, 0, 1, 2, 3].map((gx) => (
                <line
                  key={gx}
                  x1={toX1(gx)}
                  x2={toX1(gx)}
                  y1={pad1}
                  y2={H1 - pad1}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
              ))}
              {[0, 2, 4, 6, 8].map((gy) => (
                <line
                  key={gy}
                  x1={pad1}
                  x2={W1 - pad1}
                  y1={toY1(gy)}
                  y2={toY1(gy)}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
              ))}

              {/* Axes */}
              <line x1={toX1(0)} x2={toX1(0)} y1={pad1} y2={H1 - pad1} stroke="#94A3B8" strokeWidth="1.5" />
              <line x1={pad1} x2={W1 - pad1} y1={toY1(0)} y2={toY1(0)} stroke="#94A3B8" strokeWidth="1.5" />

              {/* Curve f(x) = x^2 */}
              <path d={curveD1} fill="none" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round" />

              {/* Garis Potong */}
              <line
                x1={toX1(secantXStart)}
                y1={toY1(secantYStart)}
                x2={toX1(secantXEnd)}
                y2={toY1(secantYEnd)}
                stroke="#0D9488"
                strokeWidth="2.2"
                strokeDasharray="6 4"
              />

              {/* Point A */}
              <circle cx={toX1(1)} cy={toY1(1)} r={7} fill="#2563EB" opacity="0.25" />
              <circle cx={toX1(1)} cy={toY1(1)} r={4.5} fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />

              {/* Point B */}
              <circle cx={toX1(x1)} cy={toY1(y1)} r={7} fill="#0D9488" opacity="0.25" />
              <circle cx={toX1(x1)} cy={toY1(y1)} r={4.5} fill="#0D9488" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Catatan Penting:</strong> Garis potong menghubungkan dua titik kurva. Saat jarak titik{' '}
                <span className="font-mono font-bold">h</span> kian menyusut mendekati nol, garis potong tersebut
                berhimpit sempurna menjadi <strong>garis singgung kurva (tangent line)</strong> tepat di titik (1, 1)
                dengan kemiringan tepat 2.00!
              </span>
            </div>
          </div>
        )}

        {chapter.id === 1 && (
          /* Chapter 2: 3 Basic Rules */
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kaidah 1</span>
              <h4 className="font-bold text-slate-900 text-sm">Fungsi Konstanta</h4>
              <div className="p-2.5 rounded-xl bg-slate-900 text-sky-300 font-mono text-xs">
                f(x) = c ⟶ f′(x) = 0
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Garis horisontal tidak memiliki kemiringan menanjak maupun menurun.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kaidah 2</span>
              <h4 className="font-bold text-slate-900 text-sm">Fungsi Identitas</h4>
              <div className="p-2.5 rounded-xl bg-slate-900 text-sky-300 font-mono text-xs">
                f(x) = x ⟶ f′(x) = 1
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Garis lurus 45 derajat memiliki kemiringan konstan sebesar tepat 1.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kaidah 3</span>
              <h4 className="font-bold text-slate-900 text-sm">Aturan Pangkat</h4>
              <div className="p-2.5 rounded-xl bg-slate-900 text-teal-300 font-mono text-xs">
                f(x) = xⁿ ⟶ f′(x) = n · xⁿ⁻¹
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kalikan ke depan dengan eksponen lama, lalu kurangi pangkatnya dengan 1.
              </p>
            </div>
          </div>
        )}

        {chapter.id === 2 && chapter.rules && (
          /* Chapter 3: 8 Interactive Rules Explorer */
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
              Pilih Aturan Diferensial:
            </h3>

            {/* Rule Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              {chapter.rules.map((rule, idx) => (
                <button
                  key={rule.id}
                  onClick={() => {
                    setActiveRuleIdx(idx);
                    playClickSound();
                  }}
                  type="button"
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeRuleIdx === idx
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {rule.name}
                </button>
              ))}
            </div>

            {/* Active Rule Details Card */}
            {chapter.rules[activeRuleIdx] && (
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {chapter.rules[activeRuleIdx].badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {chapter.rules[activeRuleIdx].name}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  {chapter.rules[activeRuleIdx].title}
                </h4>

                <div className="p-3.5 rounded-2xl bg-slate-900 text-sky-300 font-mono text-sm sm:text-base border border-slate-800">
                  {chapter.rules[activeRuleIdx].formula}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {chapter.rules[activeRuleIdx].desc}
                </p>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800">
                  <span className="font-bold text-indigo-600">Contoh Penerapan Nyata: </span>
                  <span className="font-mono text-slate-700">{chapter.rules[activeRuleIdx].example}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {chapter.id === 3 && (
          /* Chapter 4: Exponential Curve Visualization */
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
              Visualisasi Karakteristik Unik Kurva y = eˣ
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Di setiap absis x, kemiringan garis singgung grafik eˣ bernilai tepat identik dengan ketinggian fungsi y itu sendiri.
            </p>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 font-mono text-xs text-slate-700">
              f(x) = eˣ ⟶ f′(x) = eˣ &emsp;|&emsp; f(0) = 1 ⟶ f′(0) = 1 (Garis miring 45° di titik potong sumbu Y)
            </div>
          </div>
        )}

        {chapter.id === 4 && (
          /* Chapter 5: Trigonometric Wave Visualization */
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
              Perbandingan Gelombang: f(x) = sin(x) vs f′(x) = cos(x)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Saat sin(x) berada di puncak gelombang (maksimum nilai 1), kemiringan kurvanya mendatar (gradien 0). Di titik yang sama, grafik cos(x) memotong sumbu X tepat di nilai 0!
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
                <span className="font-bold">f(x) = sin(x):</span> Gelombang sinusoidal dasar
              </div>
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900">
                <span className="font-bold">f′(x) = cos(x):</span> Gelombang laju perubahan sudut
              </div>
            </div>
          </div>
        )}

        {/* BAB 06: FULL INTERACTIVE QUADRATIC & TANGENT LINE SIMULATION */}
        {chapter.id === 5 && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/60 via-sky-50/40 to-white border border-indigo-200 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold uppercase tracking-wider">
                  Simulasi Visual Terpadu
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 font-['Outfit']">
                  Simulasi Fungsi Kuadrat & Garis Singgung Kurva
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Geser titik absis x₀ dan amati bagaimana garis singgung menyentuh tepat pada parabola di titik P(x₀, y₀)
                </p>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500">Preset:</span>
                <button
                  onClick={() => setPresetCurve(1, 0, -4, 2)}
                  type="button"
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  x² − 4
                </button>
                <button
                  onClick={() => setPresetCurve(-1, 0, 4, 1)}
                  type="button"
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  −x² + 4 (Terbalik)
                </button>
                <button
                  onClick={() => setPresetCurve(1, 2, -3, 2)}
                  type="button"
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  x² + 2x − 3
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid sm:grid-cols-3 gap-3">
              <label className="block text-xs font-bold text-slate-700">
                Koefisien a (Kelengkungan)
                <input
                  type="number"
                  step="0.5"
                  value={coefA}
                  onChange={(e) => setCoefA(parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                Koefisien b (Pergeseran)
                <input
                  type="number"
                  step="0.5"
                  value={coefB}
                  onChange={(e) => setCoefB(parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                Konstanta c (Tinggi Awal)
                <input
                  type="number"
                  step="0.5"
                  value={coefC}
                  onChange={(e) => setCoefC(parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
            </div>

            {/* Slider x0 */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="tangent-x0-slider" className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                  Geser Titik Singgung (x₀):
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      slopeSign === 'positif'
                        ? 'bg-emerald-100 text-emerald-800'
                        : slopeSign === 'negatif'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {slopeSign === 'positif'
                      ? '▲ Menanjak Naik'
                      : slopeSign === 'negatif'
                      ? '▼ Menurun Turun'
                      : '● Mendatar (Puncak/Lembah)'}
                  </span>
                  <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                    x₀ = {formatNum(tangentX0)}
                  </span>
                </div>
              </div>
              <input
                id="tangent-x0-slider"
                type="range"
                min="-4"
                max="4"
                step="0.1"
                value={tangentX0}
                onChange={(e) => setTangentX0(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Realtime Interactive SVG Canvas */}
            <svg
              className="w-full aspect-[600/300] bg-white rounded-2xl border border-slate-200 shadow-inner"
              viewBox={`0 0 ${W6} ${H6}`}
              role="img"
              aria-label="Simulasi Parabola dan Garis Singgung"
            >
              {/* Background Grid */}
              {[-4, -2, 0, 2, 4].map((gx) => (
                <line
                  key={gx}
                  x1={toX6(gx)}
                  x2={toX6(gx)}
                  y1={pad6}
                  y2={H6 - pad6}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
              ))}
              {[-8, -4, 0, 4, 8].map((gy) => (
                <line
                  key={gy}
                  x1={pad6}
                  x2={W6 - pad6}
                  y1={toY6(gy)}
                  y2={toY6(gy)}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
              ))}

              {/* Main Axes */}
              <line x1={toX6(0)} x2={toX6(0)} y1={pad6} y2={H6 - pad6} stroke="#94A3B8" strokeWidth="1.5" />
              <line x1={pad6} x2={W6 - pad6} y1={toY6(0)} y2={toY6(0)} stroke="#94A3B8" strokeWidth="1.5" />

              {/* Parabola Curve */}
              <path d={curveD6} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />

              {/* Tangent Line */}
              <line
                x1={toX6(tXStart)}
                y1={toY6(tYStart)}
                x2={toX6(tXEnd)}
                y2={toY6(tYEnd)}
                stroke="#0D9488"
                strokeWidth="2.5"
                strokeDasharray="none"
              />

              {/* Contact Point P(x0, y0) with pulse rings */}
              <circle
                cx={toX6(tangentX0)}
                cy={toY6(tangentData.y0)}
                r={10}
                fill="#F43F5E"
                opacity="0.2"
                className="animate-ping"
              />
              <circle
                cx={toX6(tangentX0)}
                cy={toY6(tangentData.y0)}
                r={5.5}
                fill="#F43F5E"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />

              {/* Floating label at Point P */}
              <text
                x={toX6(tangentX0) + 8}
                y={toY6(tangentData.y0) - 8}
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="bold"
                fill="#0F172A"
              >
                P({formatNum(tangentX0)}, {formatNum(tangentData.y0)})
              </text>
            </svg>

            {/* Step-by-Step Derivation Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2 border border-slate-800 shadow-inner">
              <div className="text-slate-400 font-sans font-bold text-[11px] uppercase tracking-wider flex items-center justify-between">
                <span>Langkah Penyelesaian Persamaan Garis Singgung:</span>
                <span className="text-teal-300 font-mono">m = {formatNum(tangentData.slope)}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 text-sky-300">
                <div>
                  1. Fungsi kurva: <strong className="text-white">f(x) = {formatPoly(coefA, coefB, coefC)}</strong>
                </div>
                <div>
                  2. Turunan pertama: <strong className="text-teal-300">f′(x) = {formatPoly(0, 2 * coefA, coefB)}</strong>
                </div>
                <div>
                  3. Gradien di x₀ = {formatNum(tangentX0)}:{' '}
                  <strong className="text-amber-300">m = f′({formatNum(tangentX0)}) = {formatNum(tangentData.slope)}</strong>
                </div>
                <div>
                  4. Titik kontak kurva: <strong className="text-rose-300">P({formatNum(tangentX0)}, {formatNum(tangentData.y0)})</strong>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-emerald-300 text-xs font-bold font-mono">
                Persamaan Garis Singgung: y − ({formatNum(tangentData.y0)}) = {formatNum(tangentData.slope)}(x − ({formatNum(tangentX0)})) ⟶ y = {formatPoly(0, tangentData.slope, tangentData.intercept)}
              </div>
            </div>
          </div>
        )}

        {/* Navigation & Completion Controls Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              setActiveChapter((prev) => Math.max(0, prev - 1));
              playClickSound();
            }}
            disabled={activeChapter === 0}
            type="button"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Bab Sebelumnya</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleMarkComplete}
              type="button"
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                completedChapters.includes(chapter.id)
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>
                {completedChapters.includes(chapter.id) ? 'Bab Selesai (Tuntas)' : 'Tandai Bab Selesai'}
              </span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                if (activeChapter < CHAPTERS_DATA.length - 1) {
                  setActiveChapter((prev) => prev + 1);
                } else {
                  onNavigate('latihan');
                }
              }}
              type="button"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <span>{activeChapter === 5 ? 'Lanjut ke Latihan Soal' : 'Bab Berikutnya'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
