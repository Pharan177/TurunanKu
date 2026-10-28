/**
 * Web Audio API synthesizer for clean, zero-dependency educational sounds.
 * Runs completely locally with oscillators (no external mp3 files).
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleMute(muted?: boolean): boolean {
  if (muted !== undefined) {
    isMuted = muted;
  } else {
    isMuted = !isMuted;
  }
  return isMuted;
}

export function getMuteStatus(): boolean {
  return isMuted;
}

/**
 * Pleasant light click for UI buttons
 */
export function playClickSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {}
}

/**
 * Cheerful ascending major chime for correct answers
 */
export function playCorrectSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  } catch {}
}

/**
 * Celebratory fanfare for chapter / assessment completion
 */
export function playFanfareSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const chords = [
      { freq: 523.25, time: 0.0, dur: 0.15 },
      { freq: 659.25, time: 0.12, dur: 0.15 },
      { freq: 783.99, time: 0.24, dur: 0.2 },
      { freq: 1046.5, time: 0.42, dur: 0.5 },
    ];

    chords.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now + note.time);

      gain.gain.setValueAtTime(0.15, now + note.time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.time);
      osc.stop(now + note.time + note.dur);
    });
  } catch {}
}
