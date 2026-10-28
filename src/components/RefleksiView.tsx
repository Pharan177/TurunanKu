import React, { useState } from 'react';
import { PageId } from '../types';
import { REFLECTION_STAGES_DATA } from '../data/gamesData';
import { jsPDF } from 'jspdf';
import {
  MessageSquareHeart,
  Save,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Copy,
  Download,
  FileText,
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
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [pdfExported, setPdfExported] = useState<boolean>(false);

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

  const handleExportPDF = () => {
    setIsExportingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 18;
      const contentWidth = pageWidth - 2 * margin;

      let currentY = 18;

      // Header Banner
      doc.setFillColor(236, 72, 153); // Pink primary
      doc.roundedRect(margin, currentY, contentWidth, 24, 3, 3, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text('TURUNANKU — JURNAL REFLEKSI BELAJAR', margin + 6, currentY + 10);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(
        'Catatan Evaluasi Metakognitif & Pemahaman Konsep Kalkulus Diferensial Siswa',
        margin + 6,
        currentY + 18
      );

      currentY += 32;

      // Meta info bar
      doc.setTextColor(71, 85, 105);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      const printDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      doc.text(`Tanggal Cetak: ${printDate}`, margin, currentY);

      // Count answered questions
      let answeredCount = 0;
      let totalQuestions = 0;
      REFLECTION_STAGES_DATA.forEach((stg, sIdx) => {
        stg.questions.forEach((_, qIdx) => {
          totalQuestions++;
          if (reflectionNotes[sIdx]?.[qIdx]?.trim()) {
            answeredCount++;
          }
        });
      });

      doc.text(
        `Kelengkapan: ${answeredCount} dari ${totalQuestions} Pertanyaan Terisi`,
        margin + 90,
        currentY
      );

      currentY += 6;
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, currentY, margin + contentWidth, currentY);
      currentY += 8;

      // Stages Content
      REFLECTION_STAGES_DATA.forEach((stg, sIdx) => {
        // Check space for stage header
        if (currentY > pageHeight - 40) {
          doc.addPage();
          currentY = 20;
        }

        // Stage Title Box
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(244, 114, 182);
        doc.roundedRect(margin, currentY, contentWidth, 9, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(190, 24, 93); // Pink-800
        doc.text(`Tahap ${sIdx + 1}: ${stg.title}`, margin + 4, currentY + 6);

        currentY += 13;

        // Questions & Answers
        stg.questions.forEach((qText, qIdx) => {
          const ansText =
            reflectionNotes[sIdx]?.[qIdx]?.trim() ||
            '(Siswa belum mengisi catatan refleksi untuk pertanyaan ini)';
          const isFilled = Boolean(reflectionNotes[sIdx]?.[qIdx]?.trim());

          // Question prompt
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(30, 41, 59);

          const qLines = doc.splitTextToSize(`${qIdx + 1}. ${qText}`, contentWidth);
          if (currentY + qLines.length * 4.5 > pageHeight - 25) {
            doc.addPage();
            currentY = 20;
          }
          doc.text(qLines, margin, currentY);
          currentY += qLines.length * 4.5 + 2;

          // Answer text
          doc.setFont('helvetica', isFilled ? 'normal' : 'italic');
          doc.setFontSize(8.5);
          doc.setTextColor(isFilled ? 51 : 148, isFilled ? 65 : 163, isFilled ? 85 : 184);

          const ansLines = doc.splitTextToSize(ansText, contentWidth - 8);
          if (currentY + ansLines.length * 4 > pageHeight - 20) {
            doc.addPage();
            currentY = 20;
          }

          // Light background card for student answer
          doc.setFillColor(isFilled ? 253 : 241, isFilled ? 242 : 245, isFilled ? 248 : 249);
          doc.roundedRect(
            margin + 2,
            currentY - 3,
            contentWidth - 4,
            ansLines.length * 4 + 4,
            1.5,
            1.5,
            'F'
          );

          doc.text(ansLines, margin + 5, currentY + 1.5);
          currentY += ansLines.length * 4 + 7;
        });

        currentY += 3;
      });

      // Add page numbers on footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(
          `TurunanKu Platform Pembelajaran · Jurnal Refleksi · Halaman ${i} dari ${totalPages}`,
          pageWidth / 2,
          pageHeight - 9,
          { align: 'center' }
        );
      }

      doc.save('Jurnal-Refleksi-TurunanKu.pdf');
      setPdfExported(true);
      setTimeout(() => setPdfExported(false), 4000);
    } catch (err) {
      console.error('Gagal membuat file PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

          <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            {/* Download PDF Button */}
            <button
              onClick={handleExportPDF}
              disabled={isExportingPdf}
              type="button"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-sm hover:shadow"
              title="Unduh seluruh catatan refleksi ke dalam format dokumen PDF"
            >
              <Download className="w-4 h-4" />
              <span>{isExportingPdf ? 'Membuat PDF...' : pdfExported ? '✓ Berhasil Diunduh!' : 'Unduh Jurnal (PDF)'}</span>
            </button>

            {/* Copy Notes Button */}
            <button
              onClick={handleCopySummary}
              type="button"
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedStatus ? '✓ Disalin!' : 'Salin Catatan'}</span>
            </button>
          </div>
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
