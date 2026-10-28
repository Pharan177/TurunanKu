import { GameCardItem } from '../types';

export const MATCH_PAIRS_CATALOG: { pairId: number; func: string; deriv: string; note: string }[] = [
  { pairId: 1, func: 'f(x) = x²', deriv: "f′(x) = 2x", note: 'Aturan Pangkat Sederhana' },
  { pairId: 2, func: 'f(x) = x³', deriv: "f′(x) = 3x²", note: 'Polinomial Kubik' },
  { pairId: 3, func: 'f(x) = 5x⁴', deriv: "f′(x) = 20x³", note: 'Konstanta Pengali' },
  { pairId: 4, func: 'f(x) = sin(x)', deriv: "f′(x) = cos(x)", note: 'Trigonometri Sinus' },
  { pairId: 5, func: 'f(x) = cos(x)', deriv: "f′(x) = -sin(x)", note: 'Trigonometri Cosinus (Tanda Minus)' },
  { pairId: 6, func: 'f(x) = eˣ', deriv: "f′(x) = eˣ", note: 'Eksponensial Natural Euler' },
  { pairId: 7, func: 'f(x) = tan(x)', deriv: "f′(x) = sec²(x)", note: 'Trigonometri Tangen' },
  { pairId: 8, func: 'f(x) = 1/x', deriv: "f′(x) = -1/x²", note: 'Pangkat Negatif x⁻¹' },
  { pairId: 9, func: 'f(x) = √x', deriv: "f′(x) = 1 / (2√x)", note: 'Pangkat Pecahan x^(1/2)' },
  { pairId: 10, func: 'f(x) = ln(x)', deriv: "f′(x) = 1/x", note: 'Logaritma Natural' },
  { pairId: 11, func: 'f(x) = e^(2x)', deriv: "f′(x) = 2e^(2x)", note: 'Aturan Rantai Eksponen' },
  { pairId: 12, func: 'f(x) = 7 (konstan)', deriv: "f′(x) = 0", note: 'Aturan Konstanta Datar' },
];

export function generateMatchCards(pairCount: number = 6): GameCardItem[] {
  // Shuffle catalog and pick pairCount
  const shuffledCatalog = [...MATCH_PAIRS_CATALOG].sort(() => Math.random() - 0.5).slice(0, pairCount);
  
  const cards: GameCardItem[] = [];
  const colorPalettes = [
    'from-sky-100 to-indigo-100 border-sky-300 text-sky-900',
    'from-emerald-100 to-teal-100 border-emerald-300 text-emerald-900',
    'from-amber-100 to-orange-100 border-amber-300 text-amber-900',
    'from-purple-100 to-pink-100 border-purple-300 text-purple-900',
    'from-rose-100 to-red-100 border-rose-300 text-rose-900',
    'from-cyan-100 to-blue-100 border-cyan-300 text-cyan-900',
  ];

  shuffledCatalog.forEach((item, index) => {
    const color = colorPalettes[index % colorPalettes.length];
    // Function card
    cards.push({
      id: `fn-${item.pairId}`,
      pairId: item.pairId,
      type: 'function',
      label: 'Fungsi Asli',
      latex: item.func,
      subtext: item.note,
      color,
    });
    // Derivative card
    cards.push({
      id: `dev-${item.pairId}`,
      pairId: item.pairId,
      type: 'derivative',
      label: 'Turunan Pertama',
      latex: item.deriv,
      subtext: item.note,
      color,
    });
  });

  // Shuffle cards
  return cards.sort(() => Math.random() - 0.5);
}

export const EXTERNAL_LINKS = {
  zepGameMatch: 'https://quiz.zep.us/en/play/g1GYga',
  geniallyMathAdventure: 'https://view.genially.com/6ae16dc3bdc950d06ae83970',
  geniallyDerivativeBoxing: 'https://view.genially.com/6ae1794ff26a98145f5b241c',
  assessmentGoogleForm: 'https://forms.gle/qmcVXFyaLQBHeEw7A',
  youtubeVideos: {
    operasiRantai: 'TE1BqPXXX7E',
    eksponensial: 'HEyddRpRVO8',
    trigonometri: 'Dm8l1JeNva4',
    aplikasiTurunan: 'oKLSwrbcYaU',
  },
};

export const REFLECTION_STAGES_DATA = [
  {
    title: 'Definisi Turunan',
    subtitle: 'Konsep Dasar Limit & Laju Perubahan Sesaat',
    questions: [
      'Apa yang kamu pahami tentang arti turunan secara konsep geometris dan laju sesaat?',
      'Bagian mana dari konsep garis potong menuju garis singgung yang masih membuatmu bingung?',
      'Sebutkan 1 contoh fenomena nyata di kehidupan sehari-hari yang menggunakan konsep turunan!',
    ],
  },
  {
    title: 'Turunan Aljabar',
    subtitle: 'Konstanta, Garis Lurus, & Polinomial',
    questions: [
      'Bagaimana cara menurunkan fungsi aljabar menurut pemahaman dan bahasamu sendiri?',
      'Bagian mana dari aturan pangkat polinomial yang paling menantang bagimu?',
      'Buatlah sebuah contoh fungsi aljabar dan tunjukkan hasil turunannya!',
    ],
  },
  {
    title: 'Aturan Operasi & Rantai',
    subtitle: 'Perkalian, Pembagian, dan Komposisi Bersarang',
    questions: [
      'Aturan turunan apa yang paling sering kamu pakai dan sudah kamu kuasai dengan baik?',
      'Mengapa kita tidak boleh hanya menurunkan (u · v) menjadi u′ · v′? Jelaskan dengan singkat!',
      'Bagaimana caramu mengingat langkah aturan rantai saat menghadapi fungsi berpangkat luar?',
    ],
  },
  {
    title: 'Turunan Eksponensial',
    subtitle: 'Keistimewaan Bilangan Natural Euler e',
    questions: [
      'Apa yang membuat fungsi eksponensial alami eˣ begitu istimewa dalam dunia kalkulus?',
      'Bagaimana perbedaan turunan antara fungsi basis e (eˣ) dengan basis konstan lainnya (aˣ)?',
      'Di bidang apa saja kamu rasa fungsi pertumbuhan eksponensial sangat penting diterapkan?',
    ],
  },
  {
    title: 'Turunan Trigonometri',
    subtitle: 'Sinus, Cosinus, dan Tangen',
    questions: [
      'Apa yang terjadi pada gelombang sinus ketika diturunkan menjadi gelombang cosinus?',
      'Mengapa sudut dalam kalkulus diferensial trigonometri harus selalu menggunakan satuan radian?',
      'Trik apa yang membantumu mengingat tanda negatif pada turunan cos(x)?',
    ],
  },
  {
    title: 'Aplikasi Garis Singgung',
    subtitle: 'Gradien & Persamaan Garis di Titik Kurva',
    questions: [
      'Jelaskan 3 langkah utama dalam mencari persamaan garis singgung pada suatu kurva!',
      'Bagaimana cara membedakan antara nilai f(x₀) dengan nilai turunan f′(x₀)?',
      'Apa arti geometris ketika gradien garis singgung kurva bernilai tepat 0?',
    ],
  },
  {
    title: 'Refleksi Menyeluruh',
    subtitle: 'Rangkuman Perjalanan & Target Belajar',
    questions: [
      'Konsep kalkulus turunan mana yang paling membuatmu takjub atau paling kamu senangi?',
      'Strategi apa yang paling membantumu saat memecahkan soal-soal latihan tingkat menantang?',
      'Apa target pencapaian belajarmu selanjutnya setelah menyelesaikan pembelajaran di TurunanKu?',
    ],
  },
];
