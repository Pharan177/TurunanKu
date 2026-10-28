import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeAnswer,
  calculateSecantSlope,
  calculateTangentQuadratic,
  formatPoly,
  evaluateSlopeSign,
  getMasteryDetails,
} from './calculus';

test('normalizeAnswer correctly cleans mathematical strings', () => {
  assert.equal(normalizeAnswer(' 15x^4 '), '15x4');
  assert.equal(normalizeAnswer('15x⁴'), '15x4');
  assert.equal(normalizeAnswer('x² + 2x - 1'), 'x2+2x-1');
  assert.equal(normalizeAnswer('y = 6x - 7'), '6x-7');
  assert.equal(normalizeAnswer("f'(x) = 2x"), '2x');
  assert.equal(normalizeAnswer('−2'), '-2');
});

test('calculateSecantSlope approaches exact derivative 2 as h approaches 0 for f(x)=x^2 at x=1', () => {
  const f = (x: number) => x * x;
  assert.equal(calculateSecantSlope(1, 1, f), 3);
  const slopeNear = calculateSecantSlope(1, 0.1, f);
  assert.ok(Math.abs(slopeNear - 2.1) < 1e-6);
  assert.equal(calculateSecantSlope(1, 0, f), 2);
});

test('calculateTangentQuadratic correctly computes tangent slope and point', () => {
  const res = calculateTangentQuadratic(1, 2, -3, 2);
  assert.equal(res.y0, 5);
  assert.equal(res.slope, 6);
  assert.equal(res.intercept, -7);
  assert.equal(res.tangentFn(2), 5);
  assert.equal(res.tangentFn(3), 11);
});

test('formatPoly correctly renders polynomial equations', () => {
  assert.equal(formatPoly(1, 2, -3), 'x² + 2x - 3');
  assert.equal(formatPoly(-1, 0, 4), '-x² + 4');
  assert.equal(formatPoly(0, 6, -7), '6x - 7');
  assert.equal(formatPoly(0, 0, 0), '0');
});

test('evaluateSlopeSign correctly detects slope trends', () => {
  assert.equal(evaluateSlopeSign(3.5), 'positif');
  assert.equal(evaluateSlopeSign(-0.01), 'negatif');
  assert.equal(evaluateSlopeSign(0), 'nol');
});

test('getMasteryDetails returns appropriate labels', () => {
  assert.equal(getMasteryDetails(0).title, 'Petualang Pemula');
  assert.equal(getMasteryDetails(50).title, 'Penjelajah Terampil');
  assert.equal(getMasteryDetails(100).title, 'Master Kalkulus Sejati');
});
