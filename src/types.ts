export type PageId =
  | 'beranda'
  | 'panduan'
  | 'materi'
  | 'latihan'
  | 'games'
  | 'simulasi'
  | 'asesmen'
  | 'refleksi';

export interface ChapterRule {
  id: number;
  name: string;
  title: string;
  formula: string;
  desc: string;
  example: string;
  badge: string;
}

export interface Chapter {
  id: number;
  number: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  topicKicker: string;
  youtubeId?: string;
  themeColor: {
    pastel: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
  };
  summary: string;
  formula: string;
  audioText: string;
  content: string;
  rules?: ChapterRule[];
}

export type QuestionType = 'pilihan' | 'isian';

export interface PracticeQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  answer: string;
  options?: string[];
  explanation: string;
}

export interface TopicInfo {
  id: number;
  number: string;
  title: string;
  desc: string;
  iconName: string;
  tagColor: string;
}

export interface GameCardItem {
  id: string;
  pairId: number;
  type: 'function' | 'derivative';
  label: string;
  latex: string;
  subtext: string;
  color: string;
}

export interface ReflectionStage {
  title: string;
  subtitle: string;
  questions: string[];
}

export interface UserProgress {
  completedChapters: number[];
  openedChapters: number[];
  solvedQuestions: string[];
  userAnswers: Record<string, string>;
  lastActiveDate: string;
  reflectionNotes: Record<number, Record<number, string>>;
}
