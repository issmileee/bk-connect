# BK-Connect 📚

**Sistem Booking Konseling Digital untuk Sekolah**

BK-Connect adalah platform digital yang dirancang untuk memudahkan proses booking dan manajemen konseling antara siswa dan Guru Bimbingan Konseling (BK) di sekolah. Sistem ini mengotomatisasi proses pemesanan jadwal konseling, manajemen antrian, dan pencatatan hasil konseling secara efisien dan terstruktur.

---

## 🎯 Tujuan

BK-Connect dibangun dengan tujuan untuk:

- **Memudahkan Siswa**: Memberikan kemudahan bagi siswa dalam memesan jadwal konseling tanpa harus datang langsung ke ruang BK
- **Efisiensi Guru BK**: Membantu Guru BK mengelola jadwal konseling, antrian, dan hasil konseling dengan lebih terorganisir
- **Digitalisasi Proses**: Mengubah proses manual menjadi digital yang lebih cepat, akurat, dan dapat diakses kapan saja
- **Transparansi**: Memberikan visibilitas yang jelas terhadap status booking dan hasil konseling

---

## ✨ Fitur Utama

### 👨‍🎓 Untuk Siswa

1. **Dashboard Siswa**
   - Tampilan ringkasan jadwal konseling aktif
   - Statistik konseling yang telah selesai
   - Quick access untuk membuat booking baru

2. **Sistem Booking**
   - Pilih kategori konseling (Akademik, Karir, atau Pribadi)
   - Pilih tanggal dan slot waktu yang tersedia
   - Input keluhan dan upload file pendukung (opsional)
   - Mendapatkan kode booking unik (contoh: BK-2024-001)

3. **Manajemen Jadwal**
   - Lihat semua jadwal konseling aktif dan mendatang
   - Lihat riwayat konseling yang telah selesai
   - Notifikasi untuk jadwal yang akan datang

4. **Profil Siswa**
   - Kelola informasi pribadi
   - Lihat statistik konseling

### 👨‍🏫 Untuk Guru BK

1. **Dashboard Guru BK**
   - Overview booking hari ini
   - Statistik konseling bulan ini
   - Breakdown kategori konseling (Akademik, Karir, Pribadi)
   - **Alert System**: Deteksi otomatis kata-kata sensitif dalam keluhan siswa untuk penanganan prioritas

2. **Manajemen Antrian**
   - Lihat semua booking yang masuk
   - Filter berdasarkan status (Pending, Confirmed, In Progress, Completed, Cancelled)
   - Urutkan berdasarkan tanggal dan waktu

3. **Proses Konseling**
   - Input hasil konseling (ringkasan masalah, solusi, tindak lanjut)
   - Tandai status hasil konseling (Completed, Follow-up Needed, Referred External)
   - Update status booking secara real-time

4. **Laporan & Statistik**
   - Laporan konseling per periode
   - Statistik berdasarkan kategori
   - Export data untuk keperluan administrasi

5. **Manajemen Slot Waktu**
   - Konfigurasi slot waktu konseling
   - Slot jam pelajaran (jam ke-1 sampai jam ke-8)
   - Slot sepulang sekolah
   - Aktifkan/nonaktifkan slot tertentu

6. **Manajemen Data Siswa**
   - Lihat daftar semua siswa
   - Lihat detail profil dan riwayat konseling siswa

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Next.js 14** - React framework dengan App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **NextAuth.js v5** - Authentication & authorization
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Production database (SQLite untuk development)

### Tools & Libraries
- **bcryptjs** - Password hashing
- **date-fns** - Date manipulation
- **clsx** - Conditional class names

---

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** (versi 18 atau lebih baru)
- **npm** atau **yarn** atau **pnpm**
- **Git**

---

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd bk_connect
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Setup Environment Variables

Copy file `.env.example` dan rename menjadi `.env`:

```bash
cp .env.example .env
```

Untuk development lokal, gunakan SQLite:

```env
# Database (Development - SQLite)
DATABASE_URL="file:./dev.db"

# NextAuth
AUTH_SECRET="your-secret-key-here" # Generate dengan: openssl rand -base64 32
AUTH_TRUST_HOST=true
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push

# Seed database dengan data awal
npm run db:seed
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

---

### 🚀 Production Deployment

Untuk deployment production dengan PostgreSQL, lihat panduan lengkap di:

📖 **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Panduan deployment production dengan PostgreSQL

**Quick Overview Production:**

1. **Setup PostgreSQL Database**
   - Cloud: Supabase, Neon, Railway (recommended)
   - Self-hosted: VPS dengan PostgreSQL

2. **Update Environment Variables**
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   AUTH_SECRET="generate-new-secret"
   NEXTAUTH_URL="https://yourdomain.com"
   ```

3. **Deploy Platform**
   - Vercel (recommended untuk Next.js)
   - Railway
   - Render
   - VPS (Digital Ocean, AWS, GCP)

4. **Migrate & Seed Database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

Lihat [DEPLOYMENT.md](docs/DEPLOYMENT.md) untuk instruksi lengkap step-by-step.

---

## 📖 Penggunaan

### Login

Setelah menjalankan seed database, Anda dapat login dengan akun berikut:

**Guru BK:**
- Email: `guru.bk@sekolah.id`
- Password: `password123`

**Siswa:**
- Email: `ani@siswa.sekolah.id` (Kelas 10 IPA 1)
- Email: `budi@siswa.sekolah.id` (Kelas 10 IPA 2)
- Email: `citra@siswa.sekolah.id` (Kelas 11 IPS 1)
- Password: `password123` (untuk semua)

> ⚠️ **Penting**: Ganti password default untuk keamanan di production!

### Flow Booking (Siswa)

1. Login sebagai siswa
2. Klik "Buat Booking Baru" di dashboard
3. Pilih kategori konseling (Akademik/Karir/Pribadi)
4. Pilih tanggal yang diinginkan
5. Pilih slot waktu yang tersedia
6. Isi form keluhan dan upload file pendukung (opsional)
7. Review dan konfirmasi booking
8. Simpan kode booking yang diberikan

### Flow Konseling (Guru BK)

1. Login sebagai Guru BK
2. Lihat antrian di dashboard atau halaman "Antrian"
3. Klik booking yang ingin diproses
4. Update status booking sesuai progress
5. Setelah konseling selesai, input hasil konseling:
   - Ringkasan masalah
   - Solusi yang diberikan
   - Tindak lanjut (jika ada)
   - Status hasil (Completed/Follow-up Needed/Referred External)

---

## 📁 Struktur Project

```
bk_connect/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Database seeder
│   └── dev.db             # SQLite database (auto-generated)
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── guru/          # Halaman untuk Guru BK
│   │   │   ├── dashboard/
│   │   │   ├── antrian/
│   │   │   ├── konseling/
│   │   │   ├── laporan/
│   │   │   ├── slots/
│   │   │   └── siswa/
│   │   ├── siswa/         # Halaman untuk Siswa
│   │   │   ├── dashboard/
│   │   │   ├── booking/
│   │   │   ├── history/
│   │   │   └── profile/
│   │   └── login/         # Halaman login
│   ├── actions/           # Server actions
│   ├── components/        # React components
│   │   ├── layouts/       # Layout components
│   │   └── ui/            # UI components
│   ├── lib/               # Utility libraries
│   │   ├── auth.ts        # NextAuth configuration
│   │   ├── prisma.ts      # Prisma client
│   │   └── utils.ts       # Helper functions
│   └── types/             # TypeScript type definitions
├── .env                   # Environment variables
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

---

## 🗄️ Database Schema

### Model Utama

1. **User** - Data pengguna (Siswa, Guru BK, Admin)
   - Informasi: NIS/NISN/NIP, nama, email, password, kelas
   - Role-based access control

2. **SlotTemplate** - Template slot waktu konseling
   - Hari dalam seminggu (Senin-Jumat)
   - Slot jam pelajaran (1-8) atau sepulang sekolah
   - Waktu mulai dan selesai

3. **Booking** - Data pemesanan konseling
   - Kode booking unik
   - Tanggal dan slot waktu
   - Kategori dan keluhan siswa
   - Status booking

4. **ConsultationResult** - Hasil konseling
   - Ringkasan masalah
   - Solusi yang diberikan
   - Tindak lanjut
   - Status hasil

5. **SchoolSettings** - Pengaturan sekolah
   - Nama sekolah
   - Durasi slot
   - Konfigurasi jam pelajaran

### Status Booking

- `PENDING` - Menunggu konfirmasi
- `CONFIRMED` - Sudah dikonfirmasi
- `IN_PROGRESS` - Sedang berlangsung
- `COMPLETED` - Selesai
- `CANCELLED` - Dibatalkan

### Kategori Konseling

- `AKADEMIK` - Masalah akademik
- `KARIR` - Bimbingan karir
- `PRIBADI` - Masalah pribadi

---

## 🔧 Scripts yang Tersedia

```bash
# Development
npm run dev          # Jalankan development server

# Production
npm run build        # Build untuk production
npm run start        # Jalankan production server

# Database
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema ke database
npm run db:seed      # Seed database dengan data awal
npm run db:studio    # Buka Prisma Studio (GUI untuk database)
npm run db:reset     # Reset database dan seed ulang

# Linting
npm run lint         # Jalankan ESLint
```

---

## 🔐 Keamanan

- Password di-hash menggunakan bcryptjs
- Authentication menggunakan NextAuth.js
- Role-based access control (RBAC)
- Session management yang aman
- Input validation pada form

---

## 🎨 UI/UX Features

- **Responsive Design** - Dapat diakses dari desktop dan mobile
- **Modern UI** - Menggunakan Tailwind CSS dengan design system yang konsisten
- **User-friendly** - Interface yang intuitif dan mudah digunakan
- **Real-time Updates** - Status booking dan antrian update secara real-time
- **Visual Feedback** - Badge, alert, dan notifikasi untuk status penting

---

## 📊 Fitur Khusus

### Alert System untuk Kata-Kata Sensitif

Sistem secara otomatis mendeteksi kata-kata sensitif dalam keluhan siswa (seperti "depresi", "bunuh diri", dll) dan menampilkan alert khusus di dashboard Guru BK untuk penanganan prioritas.

### Kode Booking Unik

Setiap booking mendapatkan kode unik dengan format `BK-YYYY-XXX` yang memudahkan tracking dan referensi.

### Slot Management

Fleksibilitas dalam mengatur slot waktu konseling:
- Slot jam pelajaran (jam ke-1 sampai jam ke-8)
- Slot sepulang sekolah
- Dapat diaktifkan/nonaktifkan per slot

---

## 📚 Dokumentasi Tambahan

- 📖 **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Panduan lengkap deployment production dengan PostgreSQL
- ⚡ **[QUICK-START-PRODUCTION.md](docs/QUICK-START-PRODUCTION.md)** - Quick start deploy dalam 15 menit
- 🔄 **[MIGRATION-GUIDE.md](docs/MIGRATION-GUIDE.md)** - Panduan migrasi dari SQLite ke PostgreSQL

---

## 🚧 Roadmap & Pengembangan Selanjutnya

- [ ] Notifikasi email untuk reminder jadwal konseling
- [ ] Export laporan ke PDF/Excel
- [ ] Integrasi dengan sistem akademik sekolah
- [ ] Mobile app (React Native)
- [ ] Chat/messaging antara siswa dan Guru BK
- [ ] Kalender integrasi untuk melihat jadwal
- [ ] Multi-language support
- [ ] Dark mode

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda ingin berkontribusi:

1. Fork repository
2. Buat branch untuk fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📝 Lisensi

Proyek ini menggunakan lisensi ISC.

---

## 👥 Tim Pengembang

Dikembangkan untuk memudahkan proses konseling di sekolah.

---

## 📞 Support & Bantuan

Jika Anda memiliki pertanyaan atau membutuhkan bantuan:

1. Buka issue di repository
2. Hubungi tim pengembang
3. Konsultasikan dengan administrator sistem

---

## 🙏 Ucapan Terima Kasih

Terima kasih telah menggunakan BK-Connect! Kami berharap sistem ini dapat membantu meningkatkan efisiensi dan kualitas layanan konseling di sekolah Anda.

---

**BK-Connect** - *Membantu setiap siswa mendapatkan dukungan yang mereka butuhkan* 💙
