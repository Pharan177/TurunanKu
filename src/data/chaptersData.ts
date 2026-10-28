import { Chapter } from '../types';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 0,
    number: '01',
    tabLabel: '01 · Definisi Limit & Gradien',
    title: 'Definisi Turunan Melalui Pendekatan Limit',
    subtitle: 'Konsep Geometris Garis Potong Menuju Garis Singgung',
    topicKicker: 'Pondasi Fundamental',
    themeColor: {
      pastel: 'from-sky-50/80 via-indigo-50/50 to-white',
      border: 'border-sky-200/80',
      badgeBg: 'bg-sky-100/80',
      badgeText: 'text-sky-800',
      accent: 'text-sky-600',
    },
    summary:
      'Secara intuitif, turunan merepresentasikan laju perubahan sesaat (instantaneous rate of change). Nilai ini didapatkan dari gradien garis potong yang menghubungkan dua titik kurva saat jarak kedua titik tersebut bergerak mendekati nol (h → 0).',
    formula: 'f′(x) = lim (h → 0)  [ f(x + h) − f(x) ] / h',
    audioText:
      'Turunan adalah limit perbandingan perubahan nilai fungsi terhadap perubahan nilai variabel x ketika jarak perubahan h mendekati nol. Sebagai contoh, untuk kurva fungsi x kuadrat, gradien garis potong antara titik 1 dan 1 ditambah h adalah 2 ditambah h. Ketika h semakin mengecil menuju nol, nilai kemiringan garis potong tersebut tepat bertransformasi menjadi kemiringan garis singgung sebesar 2.',
    content:
      'Bayangkan kamu mengendarai sepeda dan speedometer menunjukkan kecepatan 30 km/jam pada detik ke-5. Itu bukanlah kecepatan rata-rata perjalananmu selama 1 jam, melainkan kecepatan sesaat tepat pada detik tersebut! Dalam matematika, itulah turunan: kemiringan garis singgung tepat di satu titik tertentu pada kurva.',
  },
  {
    id: 1,
    number: '02',
    tabLabel: '02 · Aturan Aljabar & Pangkat',
    title: 'Turunan Fungsi Aljabar Sederhana',
    subtitle: 'Konstanta, Garis Identitas, dan Aturan Eksponen Polinomial',
    topicKicker: 'Aturan Dasar',
    themeColor: {
      pastel: 'from-emerald-50/80 via-teal-50/50 to-white',
      border: 'border-emerald-200/80',
      badgeBg: 'bg-emerald-100/80',
      badgeText: 'text-emerald-800',
      accent: 'text-emerald-600',
    },
    summary:
      'Tiga aturan mendasar yang menjadi tulang punggung kalkulus diferensial: fungsi konstan bernilai nol, fungsi identitas bergradien 1, dan fungsi pangkat yang menurunkan eksponen ke depan.',
    formula: 'f(x) = xⁿ  ⟶  f′(x) = n · xⁿ⁻¹',
    audioText:
      'Pada fungsi konstan, karena garisnya selalu datar horisontal, maka kemiringannya selalu nol. Pada fungsi identitas f(x) = x, garisnya miring 45 derajat sehingga kemiringannya selalu 1. Dan untuk fungsi pangkat x berpangkat n, turunannya adalah n dikali x berpangkat n dikurangi 1.',
    content:
      'Dengan aturan pangkat, kamu tidak perlu lagi menghitung limit yang panjang untuk setiap polinomial. Cukup kalikan koefisien dengan eksponen lamanya, lalu kurangi pangkatnya dengan angka 1. Contohnya: f(x) = 3x⁵ menghasilkan f′(x) = 3 × 5x⁴ = 15x⁴!',
  },
  {
    id: 2,
    number: '03',
    tabLabel: '03 · Aturan Operasi & Rantai',
    title: 'Operasi Turunan & Aturan Rantai',
    subtitle: '8 Kaidah Komprehensif: Jumlah, Kali, Bagi, dan Komposisi Fungsi',
    topicKicker: 'Delapan Aturan Utama',
    youtubeId: 'TE1BqPXXX7E',
    themeColor: {
      pastel: 'from-indigo-50/80 via-purple-50/50 to-white',
      border: 'border-indigo-200/80',
      badgeBg: 'bg-indigo-100/80',
      badgeText: 'text-indigo-800',
      accent: 'text-indigo-600',
    },
    summary:
      'Ketika fungsi-fungsi digabungkan melalui penjumlahan, pengurangan, perkalian, pembagian, atau fungsi bertingkat di dalam fungsi lain, kita menerapkan 8 kaidah operasi turunan.',
    formula: '(u · v)′ = u′v + uv′   |   [F(g(x))]′ = F′(g(x)) · g′(x)',
    audioText:
      'Ketika dua fungsi dikalikan, kita tidak boleh hanya mengalikan turunannya. Kita harus menggunakan aturan perkalian yaitu turunan u dikali v ditambah u dikali turunan v. Sedangkan untuk fungsi di dalam fungsi, aturan rantai mengajarkan kita untuk menurunkan fungsi luar terlebih dahulu, lalu dikalikan dengan turunan fungsi bagian dalam.',
    content:
      'Aturan rantai (Chain Rule) adalah salah satu penemuan terpenting dalam kalkulus. Seperti mengupas lapis bawang, kita menurunkan dari lapisan paling luar ke lapisan paling dalam secara sistematis.',
    rules: [
      {
        id: 0,
        name: 'k · u(x)',
        title: 'Perkalian Konstanta',
        formula: '(k · u)′ = k · u′',
        desc: 'Konstanta pengali tetap dipertahankan saat proses penurunan fungsi.',
        example: 'Untuk f(x) = 4x³, maka f′(x) = 4 · (3x²) = 12x².',
        badge: 'Kaidah 1',
      },
      {
        id: 1,
        name: 'u + v',
        title: 'Aturan Penjumlahan',
        formula: '(u + v)′ = u′ + v′',
        desc: 'Turunan dari penjumlahan dua fungsi adalah jumlah dari masing-masing turunannya.',
        example: 'Untuk f(x) = x³ + 2x, maka f′(x) = 3x² + 2.',
        badge: 'Kaidah 2',
      },
      {
        id: 2,
        name: 'u − v',
        title: 'Aturan Selisih / Pengurangan',
        formula: '(u − v)′ = u′ − v′',
        desc: 'Pertahankan tanda kurang dan turunkan masing-masing suku secara mandiri.',
        example: 'Untuk f(x) = x² − 5x, maka f′(x) = 2x − 5.',
        badge: 'Kaidah 3',
      },
      {
        id: 3,
        name: 'u · v',
        title: 'Aturan Perkalian (Product Rule)',
        formula: '(u · v)′ = u′v + uv′',
        desc: 'Jangan hanya mengalikan u′v′! Rumusnya adalah u′ dikali v ditambah u dikali v′.',
        example: 'Untuk x²(x + 1): u′=2x, v′=1 ⟶ 2x(x + 1) + x²(1) = 3x² + 2x.',
        badge: 'Kaidah 4',
      },
      {
        id: 4,
        name: 'u / v',
        title: 'Aturan Pembagian (Quotient Rule)',
        formula: '(u / v)′ = (u′v − uv′) / v²',
        desc: 'Pembilang adalah u′v dikurangi uv′, dibagi penyebut kuadrat v² (dengan v ≠ 0).',
        example: 'Untuk x / (x + 1): [(1)(x+1) − x(1)] / (x+1)² = 1 / (x+1)².',
        badge: 'Kaidah 5',
      },
      {
        id: 5,
        name: 'x⁻ⁿ',
        title: 'Pangkat Negatif',
        formula: '(x⁻ⁿ)′ = −n · x⁻ⁿ⁻¹',
        desc: 'Berlaku persis seperti aturan pangkat biasa untuk bentuk pecahan rasional.',
        example: 'Untuk f(x) = 1/x² = x⁻², maka f′(x) = −2x⁻³ = −2 / x³.',
        badge: 'Kaidah 6',
      },
      {
        id: 6,
        name: 'x^(p/q)',
        title: 'Pangkat Pecahan & Bentuk Akar',
        formula: '(xʳ)′ = r · xʳ⁻¹',
        desc: 'Ubah bentuk akar menjadi eksponen pecahan terlebih dahulu sebelum diturunkan.',
        example: 'Untuk f(x) = √x = x^(1/2), maka f′(x) = (1/2)x^(-1/2) = 1 / (2√x).',
        badge: 'Kaidah 7',
      },
      {
        id: 7,
        name: 'Chain Rule',
        title: 'Aturan Rantai (Komposisi Fungsi)',
        formula: '[F(g(x))]′ = F′(g(x)) · g′(x)',
        desc: 'Turunkan fungsi bagian luar, lalu kalikan dengan turunan fungsi bagian dalam.',
        example: 'Untuk f(x) = (2x + 1)³, f′(x) = 3(2x + 1)² · 2 = 6(2x + 1)².',
        badge: 'Kaidah 8',
      },
    ],
  },
  {
    id: 3,
    number: '04',
    tabLabel: '04 · Eksponensial Alami (eˣ)',
    title: 'Turunan Fungsi Eksponensial',
    subtitle: 'Keistimewaan Bilangan Euler e ≈ 2.718 & Basis Umum aˣ',
    topicKicker: 'Pertumbuhan Alami',
    youtubeId: 'HEyddRpRVO8',
    themeColor: {
      pastel: 'from-amber-50/80 via-orange-50/50 to-white',
      border: 'border-amber-200/80',
      badgeBg: 'bg-amber-100/80',
      badgeText: 'text-amber-800',
      accent: 'text-amber-600',
    },
    summary:
      'Pada fungsi eksponensial, variabel x berada pada pangkat. Bilangan natural Euler e adalah satu-satunya bilangan di mana laju pertumbuhan kurva persis sama dengan ketinggian kurvanya sendiri di setiap titik.',
    formula: '(eˣ)′ = eˣ   |   (aˣ)′ = aˣ · ln(a)',
    audioText:
      'Fungsi eksponensial alami e pangkat x memiliki sifat yang sangat istimewa: turunannya adalah dirinya sendiri! Di setiap titik, tinggi kurva dan kemiringan garis singgungnya bernilai sama persis. Sedangkan untuk basis bilangan lain seperti a pangkat x, kita kalikan dengan logaritma natural ln a.',
    content:
      'Fenomena ini sangat penting di dunia nyata untuk memodelkan pertumbuhan bakteri, peluruhan zat radioaktif, pergerakan bunga majemuk di bank, hingga penyebaran sinyal di jaringan internet.',
  },
  {
    id: 4,
    number: '05',
    tabLabel: '05 · Trigonometri (sin/cos/tan)',
    title: 'Turunan Fungsi Trigonometri',
    subtitle: 'Gelombang Harmonis Sinus, Cosinus, dan Tangen (Satuan Radian)',
    topicKicker: 'Gelombang & Siklus',
    youtubeId: 'Dm8l1JeNva4',
    themeColor: {
      pastel: 'from-teal-50/80 via-cyan-50/50 to-white',
      border: 'border-teal-200/80',
      badgeBg: 'bg-teal-100/80',
      badgeText: 'text-teal-800',
      accent: 'text-teal-600',
    },
    summary:
      'Dengan sudut dalam satuan radian, turunan gelombang sinus menghasilkan gelombang cosinus (pergeseran fase 90°), dan turunan cosinus menghasilkan minus sinus.',
    formula: '(sin x)′ = cos x   |   (cos x)′ = −sin x   |   (tan x)′ = sec²(x)',
    audioText:
      'Dalam trigonometri kalkulus, sudut harus selalu diukur dalam satuan radian. Turunan dari sinus adalah cosinus. Turunan dari cosinus adalah minus sinus, ingat ada tanda negatifnya. Dan turunan dari tangen adalah sekan kuadrat.',
    content:
      'Perhatikan bagaimana puncak gelombang sinus (di mana kurva mendatar dan gradiennya 0) bertepatan tepat dengan titik di mana gelombang cosinus memotong sumbu mendatar (bernilai 0)!',
  },
  {
    id: 5,
    number: '06',
    tabLabel: '06 · Aplikasi Garis Singgung',
    title: 'Aplikasi Turunan: Gradien & Garis Singgung',
    subtitle: 'Menghitung Kemiringan Garis dan Menentukan Persamaan Kurva di Titik (x₀, y₀)',
    topicKicker: 'Aplikasi Nyata',
    youtubeId: 'oKLSwrbcYaU',
    themeColor: {
      pastel: 'from-rose-50/80 via-pink-50/50 to-white',
      border: 'border-rose-200/80',
      badgeBg: 'bg-rose-100/80',
      badgeText: 'text-rose-800',
      accent: 'text-rose-600',
    },
    summary:
      'Gradien garis singgung kurva di absis x₀ didapat dengan mengevaluasi turunan pertama m = f′(x₀). Persamaan garis singgungnya kemudian dicari melalui rumus garis lurus titik singgung.',
    formula: 'y − f(x₀) = f′(x₀) · (x − x₀)',
    audioText:
      'Untuk mencari persamaan garis singgung pada kurva, lakukan tiga langkah: pertama, cari turunan fungsi f aksen x. Kedua, substitusikan titik absis x nol untuk mendapatkan nilai gradien m. Ketiga, masukkan titik dan gradien ke persamaan garis y dikurangi y nol sama dengan m dikali x dikurangi x nol.',
    content:
      'Aplikasi ini digunakan para insinyur untuk mendesain lintasan roller coaster yang mulus, perlintasan rel kereta api berkecepatan tinggi, aerodinamika sayap pesawat, dan optimasi biaya produksi.',
  },
];
