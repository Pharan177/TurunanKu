/**
 * Pure calculus and mathematics helper functions
 * Decoupled from UI for testing and high precision.
 */

export interface PolyCoefficients {
  a: number;
  b: number;
  c: number;
}

/**
 * Normalizes student answer strings for tolerant mathematical comparisons
 * Handles spaces, powers (x^2 or x²), minus variations, and case.
 */
export function normalizeAnswer(input: string | number): string {
  if (input === null || input === undefined) return '';
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')
    .replace(/\^/g, '')
    .replace(/[−–—]/g, '-')
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)))
    .replace(/^y=/, '')
    .replace(/^f'\(x\)=/, '')
    .replace(/^f′\(x\)=/, '');
}

/**
 * Menghitung kemiringan garis potong m = [f(x0 + h) - f(x0)] / h untuk f(x) = x^2 pada x0 = 1
 */
export function calculateSecantSlope(x0: number, h: number, fn: (x: number) => number): number {
  if (Math.abs(h) < 1e-9) {
    // Exact derivative at x0 for f(x) = x^2 is 2*x0
    return 2 * x0;
  }
  const y0 = fn(x0);
  const y1 = fn(x0 + h);
  return (y1 - y0) / h;
}

/**
 * Calculates tangent line equation values for a quadratic function f(x) = ax^2 + bx + c at point x0
 */
export function calculateTangentQuadratic(a: number, b: number, c: number, x0: number) {
  const y0 = a * x0 * x0 + b * x0 + c;
  const slope = 2 * a * x0 + b;
  const intercept = y0 - slope * x0; // y = slope * x + intercept
  return {
    y0,
    slope,
    intercept,
    tangentFn: (x: number) => slope * (x - x0) + y0,
    curveFn: (x: number) => a * x * x + b * x + c,
  };
}

/**
 * Formats numbers gracefully (e.g. 2 instead of 2.00, or 2.35)
 */
export function formatNum(val: number, precision: number = 2): string {
  if (!Number.isFinite(val)) return '0';
  if (Math.abs(val) < 1e-9) return '0';
  const factor = Math.pow(10, precision);
  const rounded = Math.round(val * factor) / factor;
  return String(rounded);
}

/**
 * Formats quadratic/linear polynomial string cleanly:
 * ax^2 + bx + c
 */
export function formatPoly(a: number, b: number, c: number): string {
  const terms: string[] = [];

  if (Math.abs(a) > 1e-9) {
    const sign = a < 0 ? '-' : '';
    const coef = Math.abs(a) === 1 ? '' : formatNum(Math.abs(a));
    terms.push(`${sign}${coef}x²`);
  }

  if (Math.abs(b) > 1e-9) {
    const sign = terms.length === 0 ? (b < 0 ? '-' : '') : (b < 0 ? ' - ' : ' + ');
    const coef = Math.abs(b) === 1 ? '' : formatNum(Math.abs(b));
    terms.push(`${sign}${coef}x`);
  }

  if (Math.abs(c) > 1e-9 || terms.length === 0) {
    const sign = terms.length === 0 ? (c < 0 ? '-' : '') : (c < 0 ? ' - ' : ' + ');
    terms.push(`${sign}${formatNum(Math.abs(c))}`);
  }

  return terms.join('') || '0';
}

/**
 * Evaluates the sign of slope: 'positif' | 'negatif' | 'nol'
 */
export function evaluateSlopeSign(slope: number, tolerance: number = 1e-6): 'positif' | 'negatif' | 'nol' {
  if (Math.abs(slope) <= tolerance) return 'nol';
  return slope > 0 ? 'positif' : 'negatif';
}

/**
 * Determines mastery level title and cheerful mascot badge based on completed percentage
 */
export function getMasteryDetails(pct: number): { title: string; badge: string; color: string } {
  if (pct >= 100) {
    return { title: 'Master Kalkulus Sejati', badge: '🏆 Juara Bintang', color: 'text-amber-500' };
  }
  if (pct >= 80) {
    return { title: 'Kandidat Mahir', badge: '🌟 Bintang Emas', color: 'text-indigo-500' };
  }
  if (pct >= 50) {
    return { title: 'Penjelajah Terampil', badge: '🚀 Meluncur Cepat', color: 'text-teal-500' };
  }
  if (pct >= 20) {
    return { title: 'Pelajar Antusias', badge: '🌱 Mulai Mekar', color: 'text-emerald-500' };
  }
  return { title: 'Petualang Pemula', badge: '🐣 Langkah Pertama', color: 'text-sky-500' };
}
