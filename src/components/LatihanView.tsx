import React, { useState } from 'react';
import { PageId } from '../types';
import { TOPICS_DATA, LEVEL_META, QUESTIONS_DATA } from '../data/questionsData';
import { normalizeAnswer } from '../math/calculus';
import { playClickSound, playCorrectSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Award,
  ChevronRight,
  BookOpen,
  Lock,
} from 'lucide-react';

interface LatihanViewProps {
  onNavigate: (page: PageId, chapterIndex?: number) => void;
  solvedQuestions: string[];
  userAnswers: Record<string, string>;
  onSolveQuestion: (key: string, answer: string) => void;
  completedChapters?: number[];
}

export const LatihanView: React.FC<LatihanViewProps> = ({
  onNavigate,
  solvedQuestions,
  userAnswers,
  onSolveQuestion,
  completedChapters = [],
}) => {
  const [activeTopic, setActiveTopic] = useState<number | null>(null);
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  // Local answer inputs and explanations state
  const [inputs, setInputs] = useState<Record<string, string>>(userAnswers || {});
  const [openExplanations, setOpenExplanations] = useState<Record<string, boolean>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, { correct: boolean; msg: string }>>({});

  // Topic Unlock Requirements
  const getTopicRequirement = (topicId: number) => {
    switch (topicId) {
      case 0:
        return {
          isUnlocked: completedChapters.includes(0) || completedChapters.includes(1),
          chapterIdx: 0,
          label: 'Bab 01 · Definisi Limit & Gradien',
        };
      case 1:
        return {
          isUnlocked: completedChapters.includes(2),
          chapterIdx: 2,
          label: 'Bab 03 · Aturan Operasi Aljabar & Rantai',
        };
      case 2:
        return {
          isUnlocked: completedChapters.includes(3),
          chapterIdx: 3,
          label: 'Bab 04 · Turunan Fungsi Eksponensial',
        };
      case 3:
        return {
          isUnlocked: completedChapters.includes(4),
          chapterIdx: 4,
          label: 'Bab 05 · Turunan Fungsi Trigonometri',
        };
      case 4:
        return {
          isUnlocked: completedChapters.includes(5),
          chapterIdx: 5,
          label: 'Bab 06 · Aplikasi Turunan & Garis Singgung',
        };
      case 5:
        return {
          isUnlocked: [0, 1, 2, 3, 4, 5].every((ch) => completedChapters.includes(ch)),
          chapterIdx: 0,
          label: 'Seluruh 6 Bab Pembelajaran',
        };
      default:
        return { isUnlocked: true, chapterIdx: 0, label: '' };
    }
  };

  const unlockedTopicsCount = TOPICS_DATA.filter((t) => getTopicRequirement(t.id).isUnlocked).length;

  // Helper to count solved questions per topic & level
  const getSolvedCount = (topicIdx: number, levelIdx: number) => {
    return QUESTIONS_DATA[topicIdx][levelIdx].filter((_, i) =>
      solvedQuestions.includes(`${topicIdx}-${levelIdx}-${i}`)
    ).length;
  };

  const getTopicTotalSolved = (topicIdx: number) => {
    return [0, 1, 2].reduce((sum, lvl) => sum + getSolvedCount(topicIdx, lvl), 0);
  };

  const handleCheckAnswer = (topicIdx: number, levelIdx: number, qIdx: number) => {
    const key = `${topicIdx}-${levelIdx}-${qIdx}`;
    const question = QUESTIONS_DATA[topicIdx][levelIdx][qIdx];
    const userVal = inputs[key];

    if (!userVal || !userVal.trim()) {
      setFeedbacks((prev) => ({
        ...prev,
        [key]: { correct: false, msg: '⚠️ Silakan isi atau pilih jawabanmu terlebih dahulu.' },
      }));
      return;
    }

    const isCorrect = normalizeAnswer(userVal) === normalizeAnswer(question.answer);

    if (isCorrect) {
      setFeedbacks((prev) => ({
        ...prev,
        [key]: { correct: true, msg: '🎉 Jawabanmu tepat sekali! Hebat!' },
      }));
      onSolveQuestion(key, userVal);
      playCorrectSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10B981', '#3B82F6', '#F59E0B'],
      });
    } else {
      setFeedbacks((prev) => ({
        ...prev,
        [key]: {
          correct: false,
          msg: '❌ Belum tepat. Tinjau kembali konsepmu atau buka pembahasan di bawah.',
        },
      }));
    }
  };

  const toggleExplanation = (key: string) => {
    setOpenExplanations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Asah Kemampuan Diferensial
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Latihan Soal Bertingkat
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700">
            Topik Terbuka: <strong className="font-mono">{unlockedTopicsCount}</strong> / 6
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-slate-600">
            Total Tuntas: <strong className="text-emerald-600 font-mono">{solvedQuestions.length}</strong> / 54 Soal
          </span>
        </div>
      </div>

      {/* Unlock Progression Banner */}
      {activeTopic === null && (
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs text-amber-900 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Fitur Latihan Berjenjang:</strong> Setiap topik latihan terbuka otomatis setelah kamu menuntaskan bab materi yang bersesuaian di menu Materi.
            </span>
          </div>
          <span className="font-semibold text-amber-800 font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-amber-200">
            {completedChapters.length} / 6 Bab Selesai
          </span>
        </div>
      )}

      {/* VIEW 1: TOPIC SELECTION */}
      {activeTopic === null && (
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600">
            Pilih topik materi kalkulus yang ingin kamu latih hari ini:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS_DATA.map((topic) => {
              const req = getTopicRequirement(topic.id);
              const isUnlocked = req.isUnlocked;
              const solvedCount = getTopicTotalSolved(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => {
                    if (isUnlocked) {
                      setActiveTopic(topic.id);
                    }
                  }}
                  className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                    isUnlocked
                      ? 'bg-white border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 hover:-translate-y-1 cursor-pointer'
                      : 'bg-slate-50/90 border-slate-200 opacity-90'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${topic.tagColor}`}>
                        {topic.number}
                      </span>
                      {isUnlocked ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ✓ Terbuka
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-600 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Terkunci
                        </span>
                      )}
                    </div>

                    <h2 className="font-bold text-slate-900 text-base font-['Outfit'] leading-snug">
                      {topic.title}
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {topic.desc}
                    </p>

                    {!isUnlocked && (
                      <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 space-y-1 mt-2">
                        <div className="font-semibold flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-600" />
                          <span>Syarat Membuka Topik:</span>
                        </div>
                        <div className="text-[10.5px] text-amber-800">
                          Selesaikan <strong>{req.label}</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    {isUnlocked ? (
                      <>
                        <span className="text-[11px] font-mono text-slate-500">
                          {solvedCount} dari 9 soal tuntas
                        </span>
                        <div className="flex items-center gap-1 text-indigo-600">
                          <span>Mulai Latihan</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('materi', req.chapterIdx);
                        }}
                        type="button"
                        className="w-full py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-indigo-200"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Pelajari Materinya Dulu →</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: LEVEL SELECTION */}
      {activeTopic !== null && activeLevel === null && (
        <div className="space-y-5">
          <button
            onClick={() => setActiveTopic(null)}
            type="button"
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Topik</span>
          </button>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                {TOPICS_DATA[activeTopic].number}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
                {TOPICS_DATA[activeTopic].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pilih tingkat tantangan yang sesuai dengan kesiapanmu:
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {LEVEL_META.map((lvl) => {
                const count = getSolvedCount(activeTopic, lvl.id);
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setActiveLevel(lvl.id)}
                    type="button"
                    className={`p-5 rounded-2xl bg-white border border-slate-200 ${lvl.borderHover} hover:shadow-md transition text-left flex flex-col justify-between cursor-pointer space-y-3`}
                  >
                    <div className="space-y-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${lvl.badge}`}>
                        {lvl.stage}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                        {lvl.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {lvl.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span className="font-mono text-[11px] text-slate-500">
                        {count} dari 3 soal tuntas
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: QUESTIONS LIST */}
      {activeTopic !== null && activeLevel !== null && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <button
              onClick={() => setActiveLevel(null)}
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ganti Tingkat Kesulitan</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                {TOPICS_DATA[activeTopic].title} · {LEVEL_META[activeLevel].name}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg font-mono">
                {getSolvedCount(activeTopic, activeLevel)} / 3 Soal Selesai
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {QUESTIONS_DATA[activeTopic][activeLevel].map((item, qIdx) => {
              const key = `${activeTopic}-${activeLevel}-${qIdx}`;
              const isSolved = solvedQuestions.includes(key);
              const feedback = feedbacks[key];
              const isExplanationOpen = openExplanations[key];

              return (
                <article
                  key={key}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4"
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.type === 'pilihan'
                          ? 'bg-sky-100 text-sky-800 border border-sky-200'
                          : 'bg-teal-100 text-teal-800 border border-teal-200'
                      }`}
                    >
                      SOAL {qIdx + 1} · {item.type === 'pilihan' ? 'PILIHAN GANDA' : 'ISIAN MATEMATIKA'}
                    </span>

                    <span
                      className={`text-xs font-semibold font-mono ${
                        isSolved ? 'text-emerald-600' : 'text-slate-400'
                      }`}
                    >
                      {isSolved ? '✓ Tuntas' : 'Belum Selesai'}
                    </span>
                  </div>

                  {/* Question Prompt */}
                  <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                    {item.prompt}
                  </p>

                  {/* Interaction Controls */}
                  {item.options ? (
                    /* Multiple Choice */
                    <fieldset className="space-y-2 pt-1">
                      {item.options.map((opt, optIdx) => {
                        const optVal = 'abc'[optIdx];
                        const isChecked = inputs[key] === optVal;
                        return (
                          <label
                            key={optIdx}
                            className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer text-xs sm:text-sm font-medium transition ${
                              isChecked
                                ? 'bg-indigo-50/70 border-indigo-300 text-indigo-900 font-semibold'
                                : 'border-slate-200/80 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`radio-${key}`}
                              value={optVal}
                              checked={isChecked}
                              onChange={() =>
                                setInputs((prev) => ({ ...prev, [key]: optVal }))
                              }
                              className="text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </fieldset>
                  ) : (
                    /* Text / Formula Input */
                    <div className="pt-1">
                      <input
                        type="text"
                        placeholder="Ketik jawabanmu di sini (contoh: 4, 15x4, -1)..."
                        value={inputs[key] || ''}
                        onChange={(e) =>
                          setInputs((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                        className="w-full sm:w-96 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleCheckAnswer(activeTopic, activeLevel, qIdx)}
                      type="button"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition cursor-pointer"
                    >
                      Periksa Jawaban
                    </button>

                    <button
                      onClick={() => toggleExplanation(key)}
                      type="button"
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                    >
                      {isExplanationOpen ? 'Tutup Pembahasan' : 'Buka Pembahasan'}
                    </button>
                  </div>

                  {/* Instant Feedback Notice */}
                  {feedback && (
                    <div
                      className={`text-xs font-semibold p-2.5 rounded-xl border ${
                        feedback.correct
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {feedback.msg}
                    </div>
                  )}

                  {/* Step-by-Step Explanation Drawer */}
                  {isExplanationOpen && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1">
                      <strong className="text-slate-900 block font-bold">
                        Pembahasan Konseptual:
                      </strong>
                      <p>{item.explanation}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
