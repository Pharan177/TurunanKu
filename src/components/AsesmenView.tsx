import React, { useState } from 'react';
import { PageId } from '../types';
import { EXTERNAL_LINKS } from '../data/gamesData';
import { playClickSound, playFanfareSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Award,
  ExternalLink,
  Presentation,
  Image,
  Mic,
  Video,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  Printer,
  Download,
  X,
} from 'lucide-react';

interface AsesmenViewProps {
  onNavigate: (page: PageId) => void;
}

export const AsesmenView: React.FC<AsesmenViewProps> = ({ onNavigate }) => {
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Pelajar Hebat');

  const handleOpenCertificate = () => {
    playFanfareSound();
    setShowCertificate(true);

    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#F59E0B', '#6366F1', '#10B981', '#EC4899', '#38BDF8'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
      });
    }, 300);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-300 relative space-y-6 text-center my-8">
            <button
              onClick={() => setShowCertificate(false)}
              type="button"
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer"
              aria-label="Tutup Sertifikat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Border Decorative Frame */}
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-amber-400 bg-gradient-to-b from-amber-50/40 via-white to-sky-50/30 space-y-4">
              <div className="flex items-center justify-center gap-2 text-3xl select-none">
                <span>🎓</span>
                <span>⭐</span>
                <span>🐤</span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  SERTIFIKAT KELULUSAN KALKULUS DIFERENSIAL
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-['Outfit']">
                  TurunanKu Honor Certificate
                </h2>
                <p className="text-xs text-slate-500 mt-1">Diberikan secara terhormat kepada:</p>
              </div>

              {/* Student Name Input Field */}
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ketik Namamu di Sini..."
                  className="w-full text-center text-xl sm:text-2xl font-extrabold text-indigo-700 border-b-2 border-indigo-400 bg-transparent py-1.5 focus:outline-none focus:border-indigo-600 font-['Outfit']"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Telah berhasil menjelajahi konsep turunan, memahami transformasi garis potong menjadi garis singgung, menguasai aturan rantai, dan menuntaskan asesmen mandiri secara kreatif.
              </p>

              {/* Signatures & Badges */}
              <div className="pt-4 border-t border-amber-200/80 flex items-center justify-between text-xs text-slate-600 px-4">
                <div className="text-left">
                  <div className="text-slate-400 text-[10px]">Tanggal Terbit:</div>
                  <strong className="text-slate-800 font-mono">
                    {new Date().toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </strong>
                </div>

                {/* Golden Stamp */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 border-2 border-amber-500 flex items-center justify-center text-xl shadow-md select-none">
                  🌟
                </div>

                <div className="text-right">
                  <div className="text-slate-400 text-[10px]">Tanda Tangan Duki:</div>
                  <strong className="text-indigo-600 font-['Outfit']">Duki Cendekiawan 🐤</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handlePrintCertificate}
                type="button"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>

              <button
                onClick={() => setShowCertificate(false)}
                type="button"
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="px-3 py-1 bg-rose-100 text-rose-700 border border-rose-200 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Tugas Mandiri & Portofolio
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-2 font-['Outfit']">
              Asesmen Mandiri Kreatif TurunanKu
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Tunjukkan pemahaman mendalammu. Rancang atau pilih satu persoalan turunan, pecahkan langkah demi langkah secara terstruktur, dan sajikan dalam media kreatif pilihanmu.
            </p>
          </div>

          <button
            onClick={handleOpenCertificate}
            type="button"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/25 cursor-pointer self-start sm:self-auto transition-transform hover:-translate-y-0.5"
          >
            <span>🏆 Klaim Sertifikat Kelulusan</span>
          </button>
        </div>

        {/* 3 Step Guidance Cards */}
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-mono font-bold text-rose-600">LANGKAH 01</span>
            <h3 className="font-bold text-slate-900 text-sm font-['Outfit']">
              Pilih Fokus Topik
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tentukan salah satu topik turunan (definisi limit garis potong, aljabar, perkalian/pembagian, rantai, eksponen, trigonometri, atau garis singgung).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-mono font-bold text-rose-600">LANGKAH 02</span>
            <h3 className="font-bold text-slate-900 text-sm font-['Outfit']">
              Siapkan Variasi Soal
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Rancang studi kasus nyata yang relevan atau modifikasi soal latihan dengan angka-angka barumu sendiri.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-xs font-mono font-bold text-rose-600">LANGKAH 03</span>
            <h3 className="font-bold text-slate-900 text-sm font-['Outfit']">
              Penyelesaian Rigorous
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tuliskan setiap kaidah diferensial yang digunakan secara runtut beserta alasan logis matematis di baliknya.
            </p>
          </div>
        </div>

        {/* 4 Creative Format Options */}
        <div className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-slate-900 font-['Outfit']">
            Pilihan Format Media Karya
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2">
              <Presentation className="w-5 h-5 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-sm">Presentasi Slide</h3>
              <p className="text-xs text-slate-500">
                Slide PDF / Canva rapi memuat penurunan rumus dan visualisasi kurva.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-2">
              <Image className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-slate-900 text-sm">Infografis Visual</h3>
              <p className="text-xs text-slate-500">
                Poster ringkas 1 halaman yang menyajikan peta konsep aturan turunan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
              <Mic className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-slate-900 text-sm">Rekaman Audio</h3>
              <p className="text-xs text-slate-500">
                Podcast atau rekaman suara menjelaskan cara penyelesaian masalah.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
              <Video className="w-5 h-5 text-rose-600" />
              <h3 className="font-bold text-slate-900 text-sm">Video Tutorial</h3>
              <p className="text-xs text-slate-500">
                Video 2-3 menit mendemonstrasikan pengerjaan soal di kertas atau tablet.
              </p>
            </div>
          </div>
        </div>

        {/* Submission Action Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-[#0e1b38] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-base text-white font-['Outfit']">
                Sudah Menyelesaikan Karyamu?
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              Unggah berkas atau lampirkan tautan Google Drive karyamu melalui formulir resmi:
            </p>
            <span className="text-[11px] text-teal-300 font-mono block">
              ● Google Form: Siap Menerima Pengumpulan Karya
            </span>
          </div>

          <a
            href={EXTERNAL_LINKS.assessmentGoogleForm}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <span>Kirim Karya via Google Form</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
