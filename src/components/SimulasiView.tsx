import React, { useState } from 'react';
import { PageId } from '../types';
import {
  calculateSecantSlope,
  calculateTangentQuadratic,
  formatNum,
  formatPoly,
  evaluateSlopeSign,
} from '../math/calculus';
import confetti from 'canvas-confetti';
import {
  Sliders,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Box,
} from 'lucide-react';
import { Calculus3DView } from './Calculus3DView';

interface SimulasiViewProps {
  onNavigate: (page: PageId) => void;
}

export const SimulasiView: React.FC<SimulasiViewProps> = ({ onNavigate }) => {
  // Active Lab Mode: '2d' | '3d'
  const [activeLabMode, setActiveLabMode] = useState<'2d' | '3d'>('2d');

  // LAB A: Garis Potong to Tangent Slider
  const [labAH, setLabAH] = useState<number>(1.0);

  // LAB B: Dual Curve Comparison
  const [funcType, setFuncType] = useState<
    'quadratic' | 'cubic' | 'quartic' | 'trig' | 'exponential'
  >('quadratic');
  const [paramVals, setParamVals] = useState<Record<string, number[]>>({
    quadratic: [1, 2, -3],
    cubic: [1, 0, 0, 0],
    quartic: [1, 0, 0, 0, 0],
    trig: [1, 1, 0, 0], // A, B, C, D
    exponential: [1, 2, 0, 0], // A, b, h, k
  });

  // LAB C: Prediction & Tangent Lab
  const [predA, setPredA] = useState<number>(1);
  const [predB, setPredB] = useState<number>(2);
  const [predC, setPredC] = useState<number>(-3);
  const [predX0, setPredX0] = useState<number>(2.0);
  const [userPrediction, setUserPrediction] = useState<'positif' | 'negatif' | 'nol' | null>(null);
  const [showPredResult, setShowPredResult] = useState<boolean>(false);
  const [predFeedback, setPredFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // LAB A Calculations: f(x) = x^2, A(1, 1), B(1+h, (1+h)^2)
  const aX0 = 1;
  const aY0 = 1;
  const aX1 = 1 + labAH;
  const aY1 = aX1 * aX1;
  const aSlope = calculateSecantSlope(1, labAH, (x) => x * x);

  // SVG Coordinates for Lab A
  const W = 600;
  const H = 270;
  const pad = 35;
  const toX = (val: number, min = -1.5, max = 3.5) => pad + ((val - min) / (max - min)) * (W - 2 * pad);
  const toY = (val: number, min = -1, max = 10) => H - pad - ((val - min) / (max - min)) * (H - 2 * pad);

  let labACurveD = '';
  for (let i = 0; i <= 100; i++) {
    const cx = -1.5 + (5.0 * i) / 100;
    const cy = cx * cx;
    labACurveD += (i === 0 ? 'M' : 'L') + toX(cx).toFixed(1) + ' ' + toY(cy).toFixed(1);
  }

  // LAB B Curves Configuration
  const currentParams = paramVals[funcType];
  const updateParam = (idx: number, val: number) => {
    setParamVals((prev) => {
      const arr = [...prev[funcType]];
      arr[idx] = val;
      return { ...prev, [funcType]: arr };
    });
  };

  let fnOriginal: (x: number) => number = () => 0;
  let fnDerivative: (x: number) => number = () => 0;
  let labelOriginal = '';
  let labelDerivative = '';
  let noteOriginal = '';
  let xRange = { min: -5, max: 5 };
  let yRange = { min: -10, max: 10 };

  if (funcType === 'quadratic') {
    const [a, b, c] = currentParams;
    fnOriginal = (x) => a * x * x + b * x + c;
    fnDerivative = (x) => 2 * a * x + b;
    labelOriginal = `f(x) = ${formatPoly(a, b, c)}`;
    labelDerivative = `f′(x) = ${formatPoly(0, 2 * a, b)}`;
    noteOriginal = 'Turunan kurva parabola derajat 2 menghasilkan garis linier derajat 1.';
  } else if (funcType === 'cubic') {
    const [a, b, c, d] = currentParams;
    fnOriginal = (x) => a * x ** 3 + b * x * x + c * x + d;
    fnDerivative = (x) => 3 * a * x * x + 2 * b * x + c;
    labelOriginal = `f(x) = ${a}x³ + ${b}x² + ${c}x + ${d}`;
    labelDerivative = `f′(x) = ${3 * a}x² + ${2 * b}x + ${c}`;
    noteOriginal = 'Titik puncak & lembah kurva kubik bertepatan dengan titik potong sumbu X pada grafik turunannya.';
  } else if (funcType === 'quartic') {
    const [a, b, c, d, e] = currentParams;
    fnOriginal = (x) => a * x ** 4 + b * x ** 3 + c * x * x + d * x + e;
    fnDerivative = (x) => 4 * a * x ** 3 + 3 * b * x * x + 2 * c * x + d;
    labelOriginal = `f(x) = ${a}x⁴ + ${b}x³ + ${c}x² + ${d}x + ${e}`;
    labelDerivative = `f′(x) = ${4 * a}x³ + ${3 * b}x² + ${2 * c}x + ${d}`;
    noteOriginal = 'Polinomial derajat 4 membentuk turunan berderajat 3.';
  } else if (funcType === 'trig') {
    const [A, B, C, D] = currentParams;
    fnOriginal = (x) => A * Math.sin(B * x + C) + D;
    fnDerivative = (x) => A * B * Math.cos(B * x + C);
    labelOriginal = `f(x) = ${A}·sin(${B}x + ${C}) + ${D}`;
    labelDerivative = `f′(x) = ${formatNum(A * B)}·cos(${B}x + ${C})`;
    noteOriginal = 'Amati pergeseran fase 90 derajat antara gelombang sinus dan turunannya cosinus.';
    xRange = { min: -6.3, max: 6.3 };
    const maxAmp = Math.max(2, Math.abs(A) + Math.abs(D) + 1);
    yRange = { min: -maxAmp, max: maxAmp };
  } else {
    // Exponential
    const [A, b, h, k] = currentParams;
    const base = b <= 0 || b === 1 ? 2 : b;
    fnOriginal = (x) => A * Math.pow(base, x - h) + k;
    fnDerivative = (x) => A * Math.log(base) * Math.pow(base, x - h);
    labelOriginal = `f(x) = ${A} · ${base}^(x − ${h}) + ${k}`;
    labelDerivative = `f′(x) = ${formatNum(A * Math.log(base))} · ${base}^(x − ${h})`;
    noteOriginal = 'Fungsi eksponensial memiliki turunan yang sebanding dengan ketinggian fungsinya sendiri.';
    xRange = { min: -3, max: 3 };
    yRange = { min: -5, max: 10 };
  }

  // Generate SVG paths for Lab B
  const toXPair = (x: number) => pad + ((x - xRange.min) / (xRange.max - xRange.min)) * (W - 2 * pad);
  const toYPair = (y: number) => H - pad - ((y - yRange.min) / (yRange.max - yRange.min)) * (H - 2 * pad);

  let pathOrig = '';
  let pathDeriv = '';
  const stepsPair = 100;
  for (let i = 0; i <= stepsPair; i++) {
    const cx = xRange.min + ((xRange.max - xRange.min) * i) / stepsPair;
    const cy1 = fnOriginal(cx);
    const cy2 = fnDerivative(cx);

    if (Number.isFinite(cy1) && Math.abs(cy1) < 1e3) {
      pathOrig += (pathOrig === '' ? 'M' : 'L') + toXPair(cx).toFixed(1) + ' ' + toYPair(cy1).toFixed(1);
    }
    if (Number.isFinite(cy2) && Math.abs(cy2) < 1e3) {
      pathDeriv += (pathDeriv === '' ? 'M' : 'L') + toXPair(cx).toFixed(1) + ' ' + toYPair(cy2).toFixed(1);
    }
  }

  // LAB C: Reveal Prediction & Tangent
  const handleRevealPrediction = () => {
    if (!userPrediction) {
      setPredFeedback({
        isCorrect: false,
        text: 'Pilih salah satu prediksi gradien (Positif, Negatif, atau Nol) terlebih dahulu.',
      });
      return;
    }

    const tangent = calculateTangentQuadratic(predA, predB, predC, predX0);
    const actualSign = evaluateSlopeSign(tangent.slope);
    const isCorrect = userPrediction === actualSign;

    setPredFeedback({
      isCorrect,
      text: isCorrect
        ? `🎉 Luar biasa, analisismu tepat sekali! Gradien kurva di titik ini adalah ${actualSign} (m = ${formatNum(tangent.slope)}).`
        : `💡 Kurang pas! Gradien kurva di titik x₀ = ${formatNum(predX0)} bernilai ${actualSign} (m = ${formatNum(tangent.slope)}).`,
    });

    setShowPredResult(true);

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const predTangent = calculateTangentQuadratic(predA, predB, predC, predX0);
  const predMinX = Math.min(-5, predX0 - 2);
  const predMaxX = Math.max(5, predX0 + 2);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
            Laboratorium Visual Matematika
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Lab Simulasi Kurva Interaktif
          </h1>
        </div>

        {/* 2D vs 3D Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl border border-slate-300/80">
          <button
            onClick={() => setActiveLabMode('2d')}
            type="button"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLabMode === '2d'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-teal-600" />
            <span>Lab 2D Koordinat</span>
          </button>

          <button
            onClick={() => setActiveLabMode('3d')}
            type="button"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLabMode === '3d'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-indigo-600" />
            <span>Wahana 3D Rollercoaster 🐤</span>
          </button>
        </div>
      </div>

      {/* 3D Lab View */}
      {activeLabMode === '3d' && (
        <div className="space-y-4">
          <Calculus3DView />
        </div>
      )}

      {/* 2D Labs Content */}
      {activeLabMode === '2d' && (
        <>

      {/* LAB SECTION A: DEFINISI TURUNAN */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="px-2.5 py-0.5 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider">
              Laboratorium A
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1 font-['Outfit']">
              Eksplorasi Geometris Garis Potong Menuju Garis Singgung
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-xl border border-teal-200">
            f(x) = x²
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Dua titik pada kurva <span className="font-mono font-semibold">A(1, 1)</span> dan{' '}
          <span className="font-mono font-semibold">B(1+h, (1+h)²)</span> membentuk garis potong. Geser nilai parameter <strong>h</strong> di bawah untuk menyaksikan garis tersebut mengerucut menjadi garis singgung di titik A:
        </p>

        {/* Slider h */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <label htmlFor="labA-h" className="font-bold text-slate-700">
              Geser Nilai Jarak Titik (h):
            </label>
            <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
              h = {formatNum(labAH, 2)}
            </span>
          </div>
          <input
            id="labA-h"
            type="range"
            min="-2"
            max="2"
            step="0.05"
            value={labAH}
            onChange={(e) => setLabAH(parseFloat(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
        </div>

        {/* Live Readout Panel */}
        <div className="p-3.5 bg-slate-900 text-teal-300 rounded-2xl font-mono text-xs border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div>
            Titik A(1.00, 1.00) ⟶ Titik B({formatNum(aX1)}, {formatNum(aY1)})
          </div>
          <div>
            Gradien {Math.abs(labAH) < 1e-6 ? 'Garis Singgung (Limit)' : 'Garis Potong'}:{' '}
            <strong className="text-amber-300 text-sm">{formatNum(aSlope)}</strong>
          </div>
        </div>

        {/* Lab A SVG Canvas */}
        <svg
          className="w-full aspect-[600/270] bg-slate-50/70 rounded-2xl border border-slate-200 shadow-inner"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Grafik Garis Potong Interaktif"
        >
          {/* Subtle Grid */}
          {[-1, 0, 1, 2, 3].map((gx) => (
            <line
              key={gx}
              x1={toX(gx)}
              x2={toX(gx)}
              y1={pad}
              y2={H - pad}
              stroke="#E2E8F0"
              strokeWidth="1"
            />
          ))}
          {[0, 2, 4, 6, 8].map((gy) => (
            <line
              key={gy}
              x1={pad}
              x2={W - pad}
              y1={toY(gy)}
              y2={toY(gy)}
              stroke="#E2E8F0"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          <line x1={toX(0)} x2={toX(0)} y1={pad} y2={H - pad} stroke="#94A3B8" strokeWidth="1.5" />
          <line x1={pad} x2={W - pad} y1={toY(0)} y2={toY(0)} stroke="#94A3B8" strokeWidth="1.5" />

          {/* Curve */}
          <path d={labACurveD} fill="none" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round" />

          {/* Garis Potong */}
          <line
            x1={toX(-1.5)}
            y1={toY(1 + aSlope * (-1.5 - 1))}
            x2={toX(3.5)}
            y2={toY(1 + aSlope * (3.5 - 1))}
            stroke="#0D9488"
            strokeWidth="2.2"
            strokeDasharray="6 4"
          />

          {/* Points */}
          <circle cx={toX(1)} cy={toY(1)} r={7} fill="#2563EB" opacity="0.25" />
          <circle cx={toX(1)} cy={toY(1)} r={4.5} fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx={toX(aX1)} cy={toY(aY1)} r={7} fill="#0D9488" opacity="0.25" />
          <circle cx={toX(aX1)} cy={toY(aY1)} r={4.5} fill="#0D9488" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      </div>

      {/* LAB SECTION B: PERBANDINGAN FUNGSI ASLI VS TURUNAN */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold uppercase tracking-wider">
              Laboratorium B
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1 font-['Outfit']">
              Grafik Komparasi: Fungsi Asli f(x) vs Turunannya f′(x)
            </h2>
          </div>
        </div>

        {/* Function Category Selector */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <label htmlFor="func-category" className="block text-xs font-bold text-slate-700 mb-1.5">
            Pilih Kategori Model Kurva:
          </label>
          <select
            id="func-category"
            value={funcType}
            onChange={(e) => setFuncType(e.target.value as any)}
            className="w-full sm:w-80 px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="quadratic">Fungsi Parabola Kuadrat (Derajat 2)</option>
            <option value="cubic">Polinomial Derajat 3 (Kubik)</option>
            <option value="quartic">Polinomial Derajat 4 (Kuartik)</option>
            <option value="trig">Trigonometri Sinusoidal</option>
            <option value="exponential">Eksponensial</option>
          </select>
        </div>

        {/* Parameter Inputs based on function type */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {funcType === 'quadratic' && (
            <>
              <label className="block text-xs font-bold text-slate-700">
                Koefisien a:
                <input
                  type="number"
                  value={currentParams[0]}
                  onChange={(e) => updateParam(0, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                Koefisien b:
                <input
                  type="number"
                  value={currentParams[1]}
                  onChange={(e) => updateParam(1, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                Konstanta c:
                <input
                  type="number"
                  value={currentParams[2]}
                  onChange={(e) => updateParam(2, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
            </>
          )}

          {funcType === 'cubic' && (
            <>
              <label className="block text-xs font-bold text-slate-700">
                a (x³):
                <input
                  type="number"
                  value={currentParams[0]}
                  onChange={(e) => updateParam(0, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                b (x²):
                <input
                  type="number"
                  value={currentParams[1]}
                  onChange={(e) => updateParam(1, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                c (x):
                <input
                  type="number"
                  value={currentParams[2]}
                  onChange={(e) => updateParam(2, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                d (konstanta):
                <input
                  type="number"
                  value={currentParams[3]}
                  onChange={(e) => updateParam(3, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
            </>
          )}

          {funcType === 'trig' && (
            <>
              <label className="block text-xs font-bold text-slate-700">
                Amplitudo (A):
                <input
                  type="number"
                  value={currentParams[0]}
                  onChange={(e) => updateParam(0, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                Frekuensi (B):
                <input
                  type="number"
                  value={currentParams[1]}
                  onChange={(e) => updateParam(1, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                Fase (C):
                <input
                  type="number"
                  value={currentParams[2]}
                  onChange={(e) => updateParam(2, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                Geser Vertikal (D):
                <input
                  type="number"
                  value={currentParams[3]}
                  onChange={(e) => updateParam(3, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
            </>
          )}

          {funcType === 'exponential' && (
            <>
              <label className="block text-xs font-bold text-slate-700">
                Skala (A):
                <input
                  type="number"
                  value={currentParams[0]}
                  onChange={(e) => updateParam(0, parseFloat(e.target.value) || 0)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
              <label className="block text-xs font-bold text-slate-700">
                Basis Eksponen (b):
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={currentParams[1]}
                  onChange={(e) => updateParam(1, parseFloat(e.target.value) || 2)}
                  className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                />
              </label>
            </>
          )}
        </div>

        {/* Live Formula Previews */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-3.5 bg-slate-900 text-sky-400 rounded-2xl font-mono text-xs border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              Fungsi Asli f(x):
            </span>
            <div className="mt-1 font-semibold text-sm">{labelOriginal}</div>
          </div>
          <div className="p-3.5 bg-slate-900 text-rose-400 rounded-2xl font-mono text-xs border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              Turunan Pertama f′(x):
            </span>
            <div className="mt-1 font-semibold text-sm">{labelDerivative}</div>
          </div>
        </div>

        {/* Lab B SVG Canvas */}
        <svg
          className="w-full aspect-[600/270] bg-slate-50/70 rounded-2xl border border-slate-200 shadow-inner"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Grafik Komparasi f(x) dan f'(x)"
        >
          {/* Main Axes */}
          <line
            x1={toXPair(0)}
            x2={toXPair(0)}
            y1={pad}
            y2={H - pad}
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <line
            x1={pad}
            x2={W - pad}
            y1={toYPair(0)}
            y2={toYPair(0)}
            stroke="#94A3B8"
            strokeWidth="1.5"
          />

          {/* Curves */}
          <path d={pathOrig} fill="none" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round" />
          <path d={pathDeriv} fill="none" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" />
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs font-semibold px-2 flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-700">
              <span className="w-4 h-1 bg-blue-600 rounded-full inline-block" /> Fungsi Asli f(x)
            </span>
            <span className="flex items-center gap-1.5 text-rose-700">
              <span className="w-4 h-1 bg-rose-600 rounded-full inline-block" /> Turunan Pertama f′(x)
            </span>
          </div>
          <p className="text-slate-500 italic text-[11px]">{noteOriginal}</p>
        </div>
      </div>

      {/* LAB SECTION C: PREDIKSI & GARIS SINGGUNG */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div>
          <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
            Laboratorium C
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1 font-['Outfit']">
            Uji Prediksi Gradien & Garis Singgung
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tentukan persamaan kuadrat <span className="font-mono">f(x) = ax² + bx + c</span> dan uji ketepatan analisismu:
          </p>
        </div>

        {/* Quadratic Inputs */}
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block text-xs font-bold text-slate-700">
            Koefisien a
            <input
              type="number"
              value={predA}
              onChange={(e) => {
                setPredA(parseFloat(e.target.value) || 0);
                setShowPredResult(false);
              }}
              className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
            />
          </label>
          <label className="block text-xs font-bold text-slate-700">
            Koefisien b
            <input
              type="number"
              value={predB}
              onChange={(e) => {
                setPredB(parseFloat(e.target.value) || 0);
                setShowPredResult(false);
              }}
              className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
            />
          </label>
          <label className="block text-xs font-bold text-slate-700">
            Konstanta c
            <input
              type="number"
              value={predC}
              onChange={(e) => {
                setPredC(parseFloat(e.target.value) || 0);
                setShowPredResult(false);
              }}
              className="mt-1 w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
            />
          </label>
        </div>

        {/* Position Slider */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <label htmlFor="pred-x0" className="font-bold text-slate-700">
              Pilih Titik Evaluasi Singgung (x₀):
            </label>
            <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              x₀ = {formatNum(predX0)}
            </span>
          </div>
          <input
            id="pred-x0"
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={predX0}
            onChange={(e) => {
              setPredX0(parseFloat(e.target.value));
              setShowPredResult(false);
            }}
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>

        {/* Prediction Radios Fieldset */}
        <fieldset className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <legend className="text-xs font-bold text-slate-800 px-2">
            Kuis Prediksi: Bagaimana Nilai Kemiringan Kurva di x₀ = {formatNum(predX0)}?
          </legend>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pred"
                checked={userPrediction === 'positif'}
                onChange={() => setUserPrediction('positif')}
                className="text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              <span>Positif (Kurva Menanjak Naik)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pred"
                checked={userPrediction === 'negatif'}
                onChange={() => setUserPrediction('negatif')}
                className="text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              <span>Negatif (Kurva Menurun Turun)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pred"
                checked={userPrediction === 'nol'}
                onChange={() => setUserPrediction('nol')}
                className="text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              <span>Nol (Titik Puncak/Lembah Mendatar)</span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleRevealPrediction}
              type="button"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
            >
              Buka Hasil Analisis
            </button>
            {predFeedback && (
              <span
                className={`text-xs font-semibold ${
                  predFeedback.isCorrect ? 'text-emerald-600' : 'text-amber-700'
                }`}
              >
                {predFeedback.text}
              </span>
            )}
          </div>
        </fieldset>

        {/* Revealed Result Analysis */}
        {showPredResult && (
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4 animate-fadeIn">
            <div className="font-mono text-xs sm:text-sm space-y-1 text-sky-300">
              <div>f(x) = {formatPoly(predA, predB, predC)}</div>
              <div>f′(x) = {formatPoly(0, 2 * predA, predB)}</div>
              <div className="text-white">
                Titik Singgung P({formatNum(predX0)}, {formatNum(predTangent.y0)}) ⟶ Gradien m = {formatNum(predTangent.slope)}
              </div>
              <div className="text-amber-300 font-bold">
                Persamaan Garis Singgung: y = {formatPoly(0, predTangent.slope, predTangent.intercept)}
              </div>
            </div>
          </div>
        )}
      </div>
      </>
      )}
    </div>
  );
};
