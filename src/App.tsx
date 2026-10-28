import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { HeaderNavbar } from './components/HeaderNavbar';
import { Sidebar } from './components/Sidebar';
import { BerandaView } from './components/BerandaView';
import { PanduanView } from './components/PanduanView';
import { MateriView } from './components/MateriView';
import { LatihanView } from './components/LatihanView';
import { GamesView } from './components/GamesView';
import { SimulasiView } from './components/SimulasiView';
import { AsesmenView } from './components/AsesmenView';
import { RefleksiView } from './components/RefleksiView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('beranda');
  const [targetChapterIdx, setTargetChapterIdx] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Persistent Progress States
  const [completedChapters, setCompletedChapters] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('turunanku_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [solvedQuestions, setSolvedQuestions] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('turunanku_solved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userAnswers, setUserAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('turunanku_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [reflectionNotes, setReflectionNotes] = useState<
    Record<number, Record<number, string>>
  >(() => {
    try {
      const saved = localStorage.getItem('turunanku_reflection');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('turunanku_completed', JSON.stringify(completedChapters));
    } catch {}
  }, [completedChapters]);

  useEffect(() => {
    try {
      localStorage.setItem('turunanku_solved', JSON.stringify(solvedQuestions));
    } catch {}
  }, [solvedQuestions]);

  useEffect(() => {
    try {
      localStorage.setItem('turunanku_answers', JSON.stringify(userAnswers));
    } catch {}
  }, [userAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem('turunanku_reflection', JSON.stringify(reflectionNotes));
    } catch {}
  }, [reflectionNotes]);

  // Navigation Helper
  const handleNavigate = (page: PageId, chapterIndex?: number) => {
    setCurrentPage(page);
    if (chapterIndex !== undefined) {
      setTargetChapterIdx(chapterIndex);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteChapter = (chapterId: number) => {
    if (!completedChapters.includes(chapterId)) {
      setCompletedChapters((prev) => [...prev, chapterId]);
    }
  };

  const handleSolveQuestion = (key: string, answer: string) => {
    if (!solvedQuestions.includes(key)) {
      setSolvedQuestions((prev) => [...prev, key]);
    }
    setUserAnswers((prev) => ({ ...prev, [key]: answer }));
  };

  const handleSaveReflectionNote = (stageIdx: number, qIdx: number, text: string) => {
    setReflectionNotes((prev) => {
      const stageMap = prev[stageIdx] ? { ...prev[stageIdx] } : {};
      stageMap[qIdx] = text;
      return { ...prev, [stageIdx]: stageMap };
    });
  };

  const handleResetProgress = () => {
    if (
      window.confirm(
        'Apakah kamu yakin ingin mereset seluruh progres pembelajaran, riwayat latihan, dan catatan refleksi?'
      )
    ) {
      setCompletedChapters([]);
      setSolvedQuestions([]);
      setUserAnswers({});
      setReflectionNotes({});
      localStorage.removeItem('turunanku_completed');
      localStorage.removeItem('turunanku_solved');
      localStorage.removeItem('turunanku_answers');
      localStorage.removeItem('turunanku_reflection');
    }
  };

  const breadcrumbs: Record<PageId, string> = {
    beranda: '01 — Beranda Utama',
    panduan: '02 — Panduan Belajar',
    materi: '03 — Materi & Konsep Kalkulus',
    latihan: '04 — Latihan Soal Bertingkat',
    games: '05 — Games Edukasi',
    simulasi: '06 — Lab Simulasi Kurva',
    asesmen: '07 — Asesmen Mandiri',
    refleksi: '08 — Jurnal Refleksi',
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-['Plus_Jakarta_Sans'] text-slate-800">
      {/* Mobile Top Bar Only (hidden on desktop) */}
      <HeaderNavbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleMobileMenu={() => setMobileMenuOpen((o) => !o)}
      />

      {/* Sidebar Navigation - Fixed & Sticky on Desktop (Never scrolls away) */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        completedChaptersCount={completedChapters.length}
        totalChaptersCount={6}
        isOpenOnMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content Scrollable Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-6xl w-full mx-auto">
          {/* Breadcrumb Header Bar */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500 font-sans">Kalkulus Interaktif Modern</span>
            </div>
            <div className="text-slate-700 font-bold font-mono">
              {breadcrumbs[currentPage]}
            </div>
          </div>

          {/* Render Active View */}
          {currentPage === 'beranda' && (
            <BerandaView
              onNavigate={handleNavigate}
              completedChaptersCount={completedChapters.length}
              solvedQuestionsCount={solvedQuestions.length}
            />
          )}

          {currentPage === 'panduan' && (
            <PanduanView onNavigate={handleNavigate} />
          )}

          {currentPage === 'materi' && (
            <MateriView
              initialChapterIndex={targetChapterIdx}
              onNavigate={handleNavigate}
              completedChapters={completedChapters}
              onCompleteChapter={handleCompleteChapter}
            />
          )}

          {currentPage === 'latihan' && (
            <LatihanView
              onNavigate={handleNavigate}
              solvedQuestions={solvedQuestions}
              userAnswers={userAnswers}
              onSolveQuestion={handleSolveQuestion}
              completedChapters={completedChapters}
            />
          )}

          {currentPage === 'games' && (
            <GamesView
              onNavigate={handleNavigate}
              completedChapters={completedChapters}
            />
          )}

          {currentPage === 'simulasi' && (
            <SimulasiView onNavigate={handleNavigate} />
          )}

          {currentPage === 'asesmen' && (
            <AsesmenView onNavigate={handleNavigate} />
          )}

          {currentPage === 'refleksi' && (
            <RefleksiView
              onNavigate={handleNavigate}
              reflectionNotes={reflectionNotes}
              onSaveNote={handleSaveReflectionNote}
            />
          )}
        </main>

        {/* Modern Clean Footer with Anti-Slop Discipline */}
        <footer className="border-t border-slate-200 bg-white/60 py-6 px-4 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 font-['Outfit']">TurunanKu</span>
              <span>·</span>
              <span>Platform Belajar Kalkulus Diferensial Interaktif</span>
              <span>·</span>
              <span>Didukung Simulasi Visual & Duki 🐤</span>
            </div>
            <div className="text-slate-400">
              © {new Date().getFullYear()} TurunanKu. Didedikasikan untuk Pelajar Matematika Indonesia.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
