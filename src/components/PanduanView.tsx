import React from 'react';
import { PageId } from '../types';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  Sliders,
  CheckSquare,
  Gamepad2,
  Award,
  MessageSquareHeart,
} from 'lucide-react';

interface PanduanViewProps {
  onNavigate: (page: PageId) => void;
}

export const PanduanView: React.FC<PanduanViewProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Pahami Konsep & Landasan Limit',
      desc: 'Buka Bab 01 untuk memahami bagaimana pergerakan jarak h menuju nol menghasilkan kemiringan garis singgung sesaat.',
      icon: BookOpen,
      color: 'bg-sky-100 text-sky-700 border-sky-200',
    },
    {
      num: '02',
      title: 'Dengarkan Audio Guide Cerdas',
      desc: 'Gunakan fitur narasi audio sintetis di setiap bab untuk mendengar penjelasan intuitif tanpa harus membaca teks panjang.',
      icon: Lightbulb,
      color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    },
    {
      num: '03',
      title: 'Eksplorasi Slider Lab Visual',
      desc: 'Buka Lab Simulasi dan gerakkan slider jarak h maupun koefisien parabola untuk melihat perubahan gradien secara nyata.',
      icon: Sliders,
      color: 'bg-teal-100 text-teal-700 border-teal-200',
    },
    {
      num: '04',
      title: 'Uji Kemampuan di Latihan Bertingkat',
      desc: 'Mulai dari Level Dasar (1 langkah), naik ke Level Menengah, dan taklukkan Level Menantang dengan pembahasan lengkap.',
      icon: CheckSquare,
      color: 'bg-amber-100 text-amber-700 border-amber-200',
    },
    {
      num: '05',
      title: 'Mainkan Game Pengenal Pola',
      desc: 'Latih refleks dan insting matematis dengan game mencocokkan kartu fungsi dan turunan dengan skor terbaik.',
      icon: Gamepad2,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
    },
    {
      num: '06',
      title: 'Tuangkan Kreativitas di Portofolio',
      desc: 'Selesaikan tugas mandiri asesmen (poster, video, atau slide) dan catat kemajuan belajarmu di Jurnal Refleksi.',
      icon: Award,
      color: 'bg-rose-100 text-rose-700 border-rose-200',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Langkah Sukses Belajar
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3 font-['Outfit']">
            Panduan Pembelajaran Terpadu TurunanKu
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Platform TurunanKu dirancang secara pedagogis agar kamu dapat membangun pemahaman konseptual yang kokoh, rasa percaya diri tinggi, dan intuisi visual yang bertahan seumur hidup.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      LANGKAH {step.num}
                    </span>
                    <div className={`p-1.5 rounded-xl border ${step.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm font-['Outfit']">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Educational Pro Tip Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/80 border border-teal-200/80 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-teal-500 text-white shadow-xs shrink-0 select-none">
            💡
          </div>
          <div className="text-xs sm:text-sm text-teal-950 leading-relaxed">
            <strong className="font-bold text-teal-900">Tips Belajar Efektif Bersama Duki:</strong>{' '}
            Saat kamu mengeksplorasi fungsi kuadrat di Lab Kurva, coba tebak tanda kemiringannya terlebih dahulu (apakah grafik sedang menanjak positif, mendatar nol di puncak, atau menurun negatif) sebelum menekan tombol "Buka Hasil Analisis". Latihan tebak insting ini akan mengasah intuisi kalkulusmu dengan sangat cepat!
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-3">
          <button
            onClick={() => onNavigate('beranda')}
            type="button"
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <button
            onClick={() => onNavigate('materi')}
            type="button"
            className="px-5 py-2.5 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Mulai Masuk ke Bab 01</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
