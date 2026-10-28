import { PracticeQuestion, TopicInfo } from '../types';

export const TOPICS_DATA: TopicInfo[] = [
  {
    id: 0,
    number: 'Topik 01',
    title: 'Definisi Turunan & Turunan Aljabar',
    desc: 'Pondasi limit h mendekati nol, konstanta, garis identitas, dan polinomial berpangkat.',
    iconName: 'Sparkles',
    tagColor: 'bg-sky-100 text-sky-800 border-sky-200',
  },
  {
    id: 1,
    number: 'Topik 02',
    title: 'Aturan Operasi & Rantai',
    desc: 'Penjumlahan, perkalian (uv), pembagian (u/v), dan turunan fungsi komposisi bersarang.',
    iconName: 'Layers',
    tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  },
  {
    id: 2,
    number: 'Topik 03',
    title: 'Turunan Eksponensial',
    desc: 'Karakteristik fungsi eˣ, basis sembarang aˣ, dan rantai turunan pada eksponen.',
    iconName: 'TrendingUp',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    id: 3,
    number: 'Topik 04',
    title: 'Turunan Trigonometri',
    desc: 'Turunan sinus, cosinus, tangen, serta rantai pada sudut gelombang periodik.',
    iconName: 'Activity',
    tagColor: 'bg-teal-100 text-teal-800 border-teal-200',
  },
  {
    id: 4,
    number: 'Topik 05',
    title: 'Aplikasi Garis Singgung',
    desc: 'Perhitungan kemiringan gradien m dan perumusan persamaan kurva di titik singgung.',
    iconName: 'Compass',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    id: 5,
    number: 'Topik 06',
    title: 'Evaluasi Menyeluruh',
    desc: 'Kombinasi komprehensif seluruh materi diferensial untuk menguji pemahaman total.',
    iconName: 'Award',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-200',
  },
];

export const LEVEL_NAMES = ['Dasar', 'Menengah', 'Menantang'];

export const LEVEL_META = [
  {
    id: 0,
    name: 'Level Dasar',
    stage: 'Tahap 01',
    desc: 'Konsep inti, notasi standar, dan 1 langkah perhitungan langsung.',
    color: 'emerald',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    borderHover: 'hover:border-emerald-400',
  },
  {
    id: 1,
    name: 'Level Menengah',
    stage: 'Tahap 02',
    desc: 'Gabungan aturan turunan, penyederhanaan aljabar, dan interpretasi grafik.',
    color: 'amber',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    borderHover: 'hover:border-amber-400',
  },
  {
    id: 2,
    name: 'Level Menantang',
    stage: 'Tahap 03',
    desc: 'Analisis kesalahan konsep, soal bertingkat multi-aturan, dan penalaran kritis.',
    color: 'rose',
    badge: 'bg-rose-100 text-rose-800 border-rose-200',
    borderHover: 'hover:border-rose-400',
  },
];

export const QUESTIONS_DATA: PracticeQuestion[][][] = [
  // Topik 0: Definisi & Aljabar
  [
    // Level Dasar
    [
      {
        id: '0-0-0',
        type: 'pilihan',
        prompt: 'Notasi matematika standar mana yang menyatakan turunan pertama fungsi f terhadap variabel x?',
        answer: 'b',
        options: ['f(x) saja', 'f′(x) (atau dy/dx)', 'f(x) + 1'],
        explanation: "f′(x) atau notasi Leibniz dy/dx merepresentasikan laju perubahan sesaat fungsi f terhadap x.",
      },
      {
        id: '0-0-1',
        type: 'isian',
        prompt: 'Jika f(x) = 9 (fungsi konstan horisontal), berapakah nilai turunannya f′(x)?',
        answer: '0',
        explanation: 'Fungsi konstan berbentuk garis mendatar, sehingga kemiringannya di setiap titik bernilai nol (0).',
      },
      {
        id: '0-0-2',
        type: 'isian',
        prompt: 'Jika f(x) = 3x⁵, berapakah hasil turunannya? (Tulis format 15x^4 atau 15x4)',
        answer: '15x4',
        explanation: 'Gunakan aturan pangkat: 3 × (5x⁵⁻¹) = 3 × 5x⁴ = 15x⁴.',
      },
    ],
    // Level Menengah
    [
      {
        id: '0-1-0',
        type: 'isian',
        prompt: 'Untuk f(x) = x², hitung f′(2) dengan limit [(2+h)² − 4]/h saat h mendekati 0.',
        answer: '4',
        explanation: '[(4 + 4h + h²) − 4]/h = [4h + h²]/h = 4 + h. Ketika h → 0, nilai limitnya = 4.',
      },
      {
        id: '0-1-1',
        type: 'isian',
        prompt: 'Lengkapi turunan f(x) = 2x³ − 4x + 7: f′(x) = 6x² − __.',
        answer: '4',
        explanation: 'Turunan dari −4x adalah −4. Maka angka pelengkapnya adalah 4.',
      },
      {
        id: '0-1-2',
        type: 'pilihan',
        prompt: 'Kurva parabola y = x² pada titik x = −1 memiliki garis singgung yang sifatnya ...',
        answer: 'a',
        options: ['Menurun dengan gradien −2', 'Mendatar dengan gradien 0', 'Menanjak dengan gradien 2'],
        explanation: "f′(x) = 2x; maka f′(−1) = 2(−1) = −2. Karena gradien bernilai negatif, garis singgung miring menurun.",
      },
    ],
    // Level Menantang
    [
      {
        id: '0-2-0',
        type: 'pilihan',
        prompt: 'Seorang siswa langsung mensubstitusi h = 0 pada pecahan limit [(1+h)²−1]/h dan mengklaim turunan tidak terdefinisi karena pembagian 0/0. Apa perbaikan konsep yang tepat?',
        answer: 'b',
        options: [
          'Tetap bagi dengan nol karena hasilnya tak hingga',
          'Sederhanakan bentuk aljabar untuk h ≠ 0 menjadi 2 + h, baru kemudian ambil limit h menuju 0 bernilai 2',
          'Ganti nilai x menjadi nol',
        ],
        explanation: 'Nilai limit mencari kecenderungan nilai saat h mendekati 0, bukan mensubstitusi langsung bentuk tak tentu.',
      },
      {
        id: '0-2-1',
        type: 'isian',
        prompt: 'Jika f(x) = x³ − 2x², berapakah gradien garis singgung saat x = 2?',
        answer: '4',
        explanation: 'f′(x) = 3x² − 4x. Substitusi x = 2: f′(2) = 3(2)² − 4(2) = 12 − 8 = 4.',
      },
      {
        id: '0-2-2',
        type: 'pilihan',
        prompt: 'Pada kurva parabola y = x², bagaimana kondisi garis singgung tepat di titik puncak x = 0?',
        answer: 'c',
        options: ['Gradiennya bernilai 2', 'Kurva tidak kontinu di titik tersebut', 'Gradiennya nol dan garis singgung mendatar'],
        explanation: 'f′(0) = 2(0) = 0. Garis singgung sejajar sumbu X (kemiringan nol).',
      },
    ],
  ],

  // Topik 1: Aturan Operasi & Rantai
  [
    // Level Dasar
    [
      {
        id: '1-0-0',
        type: 'pilihan',
        prompt: 'Turunan pertama dari f(x) = x³ + 2x adalah ...',
        answer: 'b',
        options: ['3x² + 2x', '3x² + 2', 'x² + 2'],
        explanation: 'Gunakan aturan penjumlahan: turunan suku x³ adalah 3x² dan turunan 2x adalah 2, menghasilkan 3x² + 2.',
      },
      {
        id: '1-0-1',
        type: 'isian',
        prompt: 'Lengkapi penurunan fungsi konstanta pengali: (5x⁴)′ = __x³.',
        answer: '20',
        explanation: '5 × 4x³ = 20x³, sehingga koefisiennya adalah 20.',
      },
      {
        id: '1-0-2',
        type: 'pilihan',
        prompt: 'Turunan dari fungsi (x² − x) adalah ...',
        answer: 'a',
        options: ['2x − 1', '2x + 1', 'x − 1'],
        explanation: 'Turunkan tiap suku: (x²)′ − (x)′ = 2x − 1.',
      },
    ],
    // Level Menengah
    [
      {
        id: '1-1-0',
        type: 'pilihan',
        prompt: 'Untuk perkalian dua fungsi u = x² dan v = x + 1, aturan perkalian (u · v)′ yang tepat adalah ...',
        answer: 'b',
        options: ['u′ · v′', 'u′v + uv′', 'uv'],
        explanation: 'Aturan perkalian (product rule): (u·v)′ = u′v + uv′.',
      },
      {
        id: '1-1-1',
        type: 'isian',
        prompt: 'Lengkapi aturan rantai: [(x² + 1)³]′ = 3(x² + 1)² × __x.',
        answer: '2',
        explanation: 'Turunan fungsi bagian dalam (x² + 1) adalah 2x. Jadi faktor pengalinya adalah 2.',
      },
      {
        id: '1-1-2',
        type: 'pilihan',
        prompt: 'Turunan dari fungsi pembagian f(x) = x / (x + 1) adalah ...',
        answer: 'c',
        options: ['1', '1 / (x + 1)', '1 / (x + 1)²'],
        explanation: 'Quotient rule: [(1)(x+1) − x(1)] / (x+1)² = (x+1−x) / (x+1)² = 1 / (x+1)².',
      },
    ],
    // Level Menantang
    [
      {
        id: '1-2-0',
        type: 'pilihan',
        prompt: 'Seorang siswa menurunkan [x²(x + 1)] menjadi 2x. Kesalahan apa yang terjadi?',
        answer: 'a',
        options: [
          'Lupa menambahkan suku uv′; hasil yang tepat seharusnya 3x² + 2x',
          'Turunan dari (x + 1) seharusnya nol',
          'Tidak ada kesalahan sama sekali',
        ],
        explanation: 'Aturan perkalian mewajibkan u′v + uv′ = 2x(x+1) + x²(1) = 2x² + 2x + x² = 3x² + 2x.',
      },
      {
        id: '1-2-1',
        type: 'isian',
        prompt: 'Jika y = (x² + 1)/(x + 1), berapakah bentuk pembilang dari y′ setelah disederhanakan? (Format: x^2+2x-1 atau x2+2x-1)',
        answer: 'x2+2x-1',
        explanation: 'Pembilang = u′v − uv′ = 2x(x+1) − (x²+1)(1) = 2x² + 2x − x² − 1 = x² + 2x − 1.',
      },
      {
        id: '1-2-2',
        type: 'pilihan',
        prompt: 'Turunan dari f(x) = (2x − 1)³ saat dievaluasi pada titik x = 1 bernilai ...',
        answer: 'c',
        options: ['3', '12', '6'],
        explanation: 'f′(x) = 3(2x − 1)² · 2 = 6(2x − 1)². Pada x = 1: 6(2(1) − 1)² = 6(1)² = 6.',
      },
    ],
  ],

  // Topik 2: Turunan Eksponensial
  [
    // Level Dasar
    [
      {
        id: '2-0-0',
        type: 'pilihan',
        prompt: 'Turunan dari fungsi eksponensial alami f(x) = eˣ adalah ...',
        answer: 'a',
        options: ['eˣ', 'x · eˣ⁻¹', '1'],
        explanation: 'Fungsi eˣ istimewa karena turunannya sama persis dengan dirinya sendiri: (eˣ)′ = eˣ.',
      },
      {
        id: '2-0-1',
        type: 'pilihan',
        prompt: 'Untuk konstanta a > 0 dan a ≠ 1, turunan dari aˣ adalah ...',
        answer: 'b',
        options: ['x · aˣ⁻¹', 'aˣ · ln(a)', 'aˣ / a'],
        explanation: 'Diferensial basis konstan sembarang aˣ membutuhkan faktor pengali logaritma natural ln(a).',
      },
      {
        id: '2-0-2',
        type: 'isian',
        prompt: 'Lengkapi aturan rantai eksponensial: [e³ˣ]′ = __e³ˣ.',
        answer: '3',
        explanation: 'Turunan dari eksponen pangkat 3x adalah 3. Maka [e³ˣ]′ = 3e³ˣ.',
      },
    ],
    // Level Menengah
    [
      {
        id: '2-1-0',
        type: 'pilihan',
        prompt: 'Turunan dari f(x) = 2ˣ + eˣ adalah ...',
        answer: 'c',
        options: ['2ˣ + eˣ', '2x + eˣ', '2ˣ · ln(2) + eˣ'],
        explanation: 'Terapkan aturan masing-masing suku: (2ˣ)′ = 2ˣ·ln(2) dan (eˣ)′ = eˣ.',
      },
      {
        id: '2-1-1',
        type: 'isian',
        prompt: 'Lengkapi turunan rantai: [e^(x²)]′ = __x · e^(x²).',
        answer: '2',
        explanation: 'Turunan dari eksponen x² adalah 2x, sehingga [e^(x²)]′ = 2x · e^(x²).',
      },
      {
        id: '2-1-2',
        type: 'pilihan',
        prompt: 'Grafik fungsi f(x) = eˣ di seluruh domain x riil selalu memiliki gradien ...',
        answer: 'a',
        options: ['Selalu positif (kurva selalu naik)', 'Pernah bernilai nol', 'Selalu negatif'],
        explanation: 'Karena nilai eˣ selalu lebih besar dari 0 untuk semua x riil, maka kemiringannya selalu positif.',
      },
    ],
    // Level Menantang
    [
      {
        id: '2-2-0',
        type: 'pilihan',
        prompt: 'Seorang siswa menulis (2ˣ)′ = x · 2ˣ⁻¹. Koreksi konsep yang paling tepat adalah ...',
        answer: 'b',
        options: ['Hasilnya 2x', 'Hasilnya 2ˣ · ln(2)', 'Hasilnya nol'],
        explanation: 'Rumus pangkat xⁿ hanya berlaku bila variabel berada di basis. Jika variabel di pangkat (aˣ), turunannya aˣ·ln(a).',
      },
      {
        id: '2-2-1',
        type: 'isian',
        prompt: 'Untuk f(x) = e^(2x) + x², berapakah nilai f′(0)?',
        answer: '2',
        explanation: 'f′(x) = 2e^(2x) + 2x. Pada x = 0: 2e⁰ + 2(0) = 2(1) + 0 = 2.',
      },
      {
        id: '2-2-2',
        type: 'pilihan',
        prompt: 'Bentuk turunan pertama dari fungsi f(x) = 3^(x²) adalah ...',
        answer: 'c',
        options: ['2x · 3^(x²)', '3^(x²) · ln(3)', '2x · 3^(x²) · ln(3)'],
        explanation: 'Kombinasi aturan eksponen basis 3 dan aturan rantai untuk eksponen x² menghasilkan 2x · 3^(x²) · ln(3).',
      },
    ],
  ],

  // Topik 3: Turunan Trigonometri
  [
    // Level Dasar
    [
      {
        id: '3-0-0',
        type: 'pilihan',
        prompt: 'Dalam kalkulus dengan sudut satuan radian, turunan dari sin(x) adalah ...',
        answer: 'a',
        options: ['cos(x)', '−cos(x)', '−sin(x)'],
        explanation: 'Turunan standar dari fungsi sinus adalah cosinus: (sin x)′ = cos x.',
      },
      {
        id: '3-0-1',
        type: 'pilihan',
        prompt: 'Turunan pertama dari cos(x) adalah ...',
        answer: 'b',
        options: ['sin(x)', '−sin(x)', 'cos(x)'],
        explanation: 'Perhatikan perubahan tanda minus: (cos x)′ = −sin x.',
      },
      {
        id: '3-0-2',
        type: 'pilihan',
        prompt: 'Turunan dari tan(x) pada daerah asalnya adalah ...',
        answer: 'c',
        options: ['cos(x)', '−sec²(x)', 'sec²(x)'],
        explanation: 'Turunan fungsi tangen adalah sekan kuadrat: (tan x)′ = sec²(x).',
      },
    ],
    // Level Menengah
    [
      {
        id: '3-1-0',
        type: 'isian',
        prompt: 'Lengkapi turunan rantai: [cos(2x)]′ = −__ sin(2x).',
        answer: '2',
        explanation: 'Turunan sudut dalam 2x adalah 2, sehingga menghasilkan −2 sin(2x).',
      },
      {
        id: '3-1-1',
        type: 'pilihan',
        prompt: 'Pada kurva gelombang y = sin(x), berapakah kemiringan kurva tepat saat memotong titik asal (x = 0)?',
        answer: 'a',
        options: ['1 dan kurva menanjak naik', '0 dan kurva mendatar', '−1 dan kurva menurun'],
        explanation: "y′ = cos(x). Pada x = 0, cos(0) = 1. Jadi garis singgungnya miring menanjak dengan sudut 45°.",
      },
      {
        id: '3-1-2',
        type: 'pilihan',
        prompt: 'Turunan dari f(x) = sin(x) + cos(x) adalah ...',
        answer: 'b',
        options: ['cos(x) + sin(x)', 'cos(x) − sin(x)', '−cos(x) + sin(x)'],
        explanation: 'Turunkan masing-masing suku: (sin x)′ + (cos x)′ = cos(x) + (−sin(x)) = cos(x) − sin(x).',
      },
    ],
    // Level Menantang
    [
      {
        id: '3-2-0',
        type: 'pilihan',
        prompt: 'Siswa menulis [cos(x²)]′ = −sin(x²). Unsur penting apa yang terlewatkan?',
        answer: 'c',
        options: ['Tanda negatif', 'Faktor cos(x)', 'Faktor pengali turunan fungsi dalam yaitu 2x'],
        explanation: 'Aturan rantai mewajibkan dikalikan dengan turunan dari x² yaitu 2x, menghasilkan −2x · sin(x²).',
      },
      {
        id: '3-2-1',
        type: 'isian',
        prompt: 'Jika f(x) = sin(2x) + x², hitung nilai f′(0).',
        answer: '2',
        explanation: 'f′(x) = 2cos(2x) + 2x. Pada x = 0: 2cos(0) + 2(0) = 2(1) + 0 = 2.',
      },
      {
        id: '3-2-2',
        type: 'pilihan',
        prompt: 'Pada kurva y = cos(x), di titik absis x = π/2 radian, garis singgung kurva berkarakter ...',
        answer: 'a',
        options: ['Menurun dengan gradien −1', 'Mendatar dengan gradien 0', 'Menanjak dengan gradien 1'],
        explanation: 'y′ = −sin(x). Pada x = π/2: −sin(π/2) = −1. Garis singgung miring menurun.',
      },
    ],
  ],

  // Topik 4: Aplikasi Garis Singgung
  [
    // Level Dasar
    [
      {
        id: '4-0-0',
        type: 'pilihan',
        prompt: 'Gradien garis singgung kurva fungsi f(x) pada titik x = a selalu bernilai sama dengan ...',
        answer: 'b',
        options: ['f(a)', 'f′(a)', 'a · f(a)'],
        explanation: 'Nilai turunan pertama f′(a) adalah definisi nilai gradien kemiringan garis singgung di titik x = a.',
      },
      {
        id: '4-0-1',
        type: 'isian',
        prompt: 'Jika f(x) = x² + 2x − 3, hitung gradien kemiringan garis singgung saat x = 2.',
        answer: '6',
        explanation: 'f′(x) = 2x + 2. Pada x = 2: m = 2(2) + 2 = 6.',
      },
      {
        id: '4-0-2',
        type: 'isian',
        prompt: 'Untuk f(x) yang sama pada x = 2, koordinat titik singgung kurva adalah P(2, __).',
        answer: '5',
        explanation: 'Substitusi ke fungsi asli: f(2) = (2)² + 2(2) − 3 = 4 + 4 − 3 = 5.',
      },
    ],
    // Level Menengah
    [
      {
        id: '4-1-0',
        type: 'pilihan',
        prompt: 'Jika f′(a) = 0 pada suatu kurva mulus, maka garis singgung di titik tersebut berbentuk ...',
        answer: 'a',
        options: ['Garis lurus mendatar horisontal', 'Garis lurus tegak vertikal', 'Pasti melewati titik pusat (0,0)'],
        explanation: 'Gradien m = 0 menandakan garis sejajar dengan sumbu mendatar X (horisontal).',
      },
      {
        id: '4-1-1',
        type: 'isian',
        prompt: 'Garis singgung y = x² di titik x = 1 adalah y = 2x + __. Tentukan nilai konstantanya.',
        answer: '-1',
        explanation: 'Titik singgung P(1, 1), gradien m = 2. y − 1 = 2(x − 1) ⟶ y = 2x − 2 + 1 ⟶ y = 2x − 1.',
      },
      {
        id: '4-1-2',
        type: 'pilihan',
        prompt: 'Persamaan garis singgung f(x) = x² + 2x − 3 di absis x = 2 adalah ...',
        answer: 'c',
        options: ['y = 2x + 1', 'y = 6x + 5', 'y = 6x − 7'],
        explanation: 'm = 6, P(2, 5). y − 5 = 6(x − 2) ⟶ y = 6x − 12 + 5 ⟶ y = 6x − 7.',
      },
    ],
    // Level Menantang
    [
      {
        id: '4-2-0',
        type: 'pilihan',
        prompt: 'Siswa keliru memakai titik P(2, 6) saat mencari garis singgung f(x) = x² + 2x − 3 di x = 2. Di mana letak kekeliruannya?',
        answer: 'b',
        options: [
          'Gradien seharusnya bernilai 5',
          'Angka 6 adalah nilai gradien f′(2), sedangkan titik ordinat y kurva adalah f(2) = 5',
          'Nilai x seharusnya 6',
        ],
        explanation: 'Siswa tertukar antara nilai turunan f′(2) = 6 (gradien m) dengan nilai fungsi f(2) = 5 (titik koordinat y).',
      },
      {
        id: '4-2-1',
        type: 'isian',
        prompt: 'Untuk f(x) = x² − 4x, tentukan gradien garis singgung saat x = 3.',
        answer: '2',
        explanation: 'f′(x) = 2x − 4. f′(3) = 2(3) − 4 = 6 − 4 = 2.',
      },
      {
        id: '4-2-2',
        type: 'pilihan',
        prompt: 'Pada kurva y = x² − 4x, titik puncak parabola berada di x = 2. Garis singgung di puncak adalah ...',
        answer: 'a',
        options: [
          'Mendatar dengan persamaan garis y = −4',
          'Menanjak dengan persamaan y = 2x',
          'Tegak vertikal dengan persamaan x = 2',
        ],
        explanation: 'Di titik puncak, gradien m = 0 dan f(2) = 4 − 8 = −4. Garis singgungnya mendatar y = −4.',
      },
    ],
  ],

  // Topik 5: Evaluasi Menyeluruh
  [
    // Level Dasar
    [
      {
        id: '5-0-0',
        type: 'isian',
        prompt: 'Evaluasi campuran: Untuk f(x) = x², berapakah nilai limit f′(2)?',
        answer: '4',
        explanation: 'f′(x) = 2x; maka f′(2) = 2(2) = 4.',
      },
      {
        id: '5-0-1',
        type: 'pilihan',
        prompt: 'Turunan dari perkalian fungsi f(x) = x · eˣ adalah ...',
        answer: 'b',
        options: ['x · eˣ', 'eˣ + x · eˣ', 'eˣ'],
        explanation: 'Product rule: u=x (u′=1), v=eˣ (v′=eˣ) ⟶ u′v + uv′ = 1·eˣ + x·eˣ = eˣ + xeˣ.',
      },
      {
        id: '5-0-2',
        type: 'pilihan',
        prompt: 'Turunan dari f(x) = sin(3x) adalah ...',
        answer: 'a',
        options: ['3 cos(3x)', 'cos(3x)', '−3 sin(3x)'],
        explanation: 'Aturan rantai pada sinus dengan sudut 3x menghasilkan 3 cos(3x).',
      },
    ],
    // Level Menengah
    [
      {
        id: '5-1-0',
        type: 'isian',
        prompt: 'Untuk f(x) = x² + 2x, berapakah gradien garis singgung di titik x = 1?',
        answer: '4',
        explanation: 'f′(x) = 2x + 2. Pada x = 1: m = 2(1) + 2 = 4.',
      },
      {
        id: '5-1-1',
        type: 'pilihan',
        prompt: 'Turunan dari fungsi f(x) = x · sin(x) adalah ...',
        answer: 'c',
        options: ['cos(x)', 'x · cos(x)', 'sin(x) + x · cos(x)'],
        explanation: 'Product rule: u=x, v=sin(x) ⟶ u′=1, v′=cos(x) ⟶ 1·sin(x) + x·cos(x).',
      },
      {
        id: '5-1-2',
        type: 'pilihan',
        prompt: 'Kurva y = eˣ pada titik perpotongannya dengan sumbu Y (x = 0) memiliki kemiringan sebesar ...',
        answer: 'a',
        options: ['1', '0', '−1'],
        explanation: 'f′(x) = eˣ. Pada x = 0: f′(0) = e⁰ = 1.',
      },
    ],
    // Level Menantang
    [
      {
        id: '5-2-0',
        type: 'pilihan',
        prompt: 'Analisis pernyataan siswa: "Gradien kurva e^(2x) di titik x = 0 adalah 1". Tanggapan yang paling tepat?',
        answer: 'b',
        options: [
          'Tepat karena e⁰ bernilai 1',
          'Keliru; karena aturan rantai [e^(2x)]′ = 2e^(2x), sehingga saat x = 0 gradiennya adalah 2',
          'Keliru; karena bernilai 0',
        ],
        explanation: 'Aturan rantai menghasilkan pengali 2 dari turunan 2x, sehingga f′(0) = 2(1) = 2.',
      },
      {
        id: '5-2-1',
        type: 'isian',
        prompt: 'Jika f(x) = x · sin(x), berapa gradien garis singgung kurva tepat saat x = 0?',
        answer: '0',
        explanation: 'f′(x) = sin(x) + x cos(x). Pada x = 0: sin(0) + 0·cos(0) = 0 + 0 = 0.',
      },
      {
        id: '5-2-2',
        type: 'pilihan',
        prompt: 'Garis singgung kurva f(x) = x² + eˣ di titik x = 0 memiliki persamaan ...',
        answer: 'c',
        options: ['y = x', 'y = 2x + 1', 'y = x + 1'],
        explanation: 'f(0) = 0 + e⁰ = 1 ⟶ titik (0, 1). f′(x) = 2x + eˣ ⟶ f′(0) = 1 (gradien m = 1). y − 1 = 1(x − 0) ⟶ y = x + 1.',
      },
    ],
  ],
];
