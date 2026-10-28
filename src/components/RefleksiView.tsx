import React, { useState } from 'react';
import { PageId } from '../types';
import { REFLECTION_STAGES_DATA } from '../data/gamesData';
import {
  MessageSquareHeart,
  Save,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Copy,
  Sparkles,
} from 'lucide-react';

interface RefleksiViewProps {
  onNavigate: (page: PageId) => void;
  reflectionNotes: Record<number, Record<number, string>>;
  onSaveNote: (stageIdx: number, qIdx: number, text: string) => void;
}

export const RefleksiView: React.FC<RefleksiViewProps> = ({
  onNavigate,
  reflectionNotes,
  onSaveNote,
}) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  const stage = REFLECTION_STAGES_DATA[activeStage];

  const handleInputChange = (qIdx: number, text: string) => {
    onSaveNote(activeStage, qIdx, text);
    setSaveStatus('Tersimpan otomatis...');
    setTimeout(() => {
      setSaveStatus('');
    }, 2000);
  };

  const handleCopySummary = () => {
    let summary = `=== JURNAL REFLEKSI TURUNANKU ===\n\n`;
    REFLECTION_STAGES_DATA.forEach((stg, sIdx) => {
      summary += `--- TAHAP ${sIdx + 1}: ${stg.title} ---\n`;
      stg.questions.forEach((q, qIdx) => {
        const ans = reflectionNotes[sIdx]?.[qIdx] || '(Belum diisi)';
        summary += `Q: ${q}\nA: ${ans}\n\n`;
      });
    });

    navigator.clipboard.writeText(summary);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 border border-pink-200 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <MessageSquareHeart className="w-3.5 h-3.5" />
              Evaluasi Metakognitif
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-['Outfit']">
              Jurnal Refleksi Pemahaman Diri
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Catat perjalanan dan pemahamanmu di setiap bab. Refleksi jujur membantumu mengenali kekuatan serta topik yang masih memerlukan latihan tambahan.
            </p>
          </div>

          <button
            onClick={handleCopySummary}
            type="button"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedStatus ? '✓ Disalin ke Clipboard!' : 'Salin Semua Catatan'}</span>
          </button>
        </div>

        {/* 7 Stage Tabs Strip */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          {REFLECTION_STAGES_DATA.map((stg, idx) => {
            const isActive = activeStage === idx;
            const hasNotes = Boolean(reflectionNotes[idx] && Object.values(reflectionNotes[idx]).some((v) => v.trim()));

            return (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-pink-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Tahap {idx + 1}</span>
                {hasNotes && <CheckCircle2 className="w-3 h-3 text-pink-500" />}
              </button>
            );
          })}
        </div>

        {/* Stage Content Card */}
        <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-bold font-['Outfit']">
              Tahap {activeStage + 1} · {stage.title}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {activeStage + 1} dari {REFLECTION_STAGES_DATA.length} Tahap
            </span>
          </div>

          <p className="text-xs font-medium text-slate-500 -mt-2">
            {stage.subtitle}
          </p>

          {/* Questions */}
          <div className="space-y-4">
            {stage.questions.map((promptText, qIdx) => {
              const currentVal = reflectionNotes[activeStage]?.[qIdx] || '';

              return (
                <div key={qIdx} className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-slate-800">
                    {qIdx + 1}. {promptText}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan refleksimu di sini secara bebas..."
                    value={currentVal}
                    onChange={(e) => handleInputChange(qIdx, e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                  />
                </div>
              );
            })}
          </div>

          {/* Stage Navigation & Status */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 flex-wrap gap-2">
            <button
              onClick={() => setActiveStage((p) => Math.max(0, p - 1))}
              disabled={activeStage === 0}
              type="button"
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Tahap Sebelumnya</span>
            </button>

            <div className="flex items-center gap-2">
              {saveStatus && (
                <span className="text-xs text-pink-600 font-semibold italic">
                  {saveStatus}
                </span>
              )}
              <button
                onClick={() =>
                  setActiveStage((p) => Math.min(REFLECTION_STAGES_DATA.length - 1, p + 1))
                }
                disabled={activeStage === REFLECTION_STAGES_DATA.length - 1}
                type="button"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>Tahap Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
