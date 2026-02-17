# BK-Connect 📚

**Platform Booking Konseling Digital untuk Sekolah**

BK-Connect adalah solusi modern untuk mengelola jadwal konseling antara siswa dan Guru Bimbingan Konseling (BK). Sistem ini dirancang untuk mempermudah akses bagi siswa dan meningkatkan efisiensi kerja Guru BK melalui otomasi dan digitalisasi.

## ✨ Fitur Unggulan

- **Booking Mandiri**: Siswa dapat memilih kategori konseling, tanggal, dan slot waktu yang tersedia secara real-time.
- **Sistem Antrean Cerdas**: Guru BK dapat mengelola antrean masuk dengan status yang jelas (Pending, Confirmed, In Progress, dll).
- **Deteksi Kata Sensitif**: Sistem otomatis memberikan peringatan pada keluhan siswa yang mengandung kata-kata sensitif untuk penanganan prioritas.
- **Rekam Medis Konseling**: Pencatatan hasil konseling, solusi, dan tindak lanjut yang terorganisir.
- **Manajemen Slot Fleksibel**: Pengaturan slot waktu konseling yang dapat disesuaikan dengan jam pelajaran sekolah.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: Next.js API Routes, [NextAuth.js v5](https://authjs.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) ([Prisma ORM](https://www.prisma.io/))
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Memulai (Quick Start)

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd bk-connect
   ```

2. **Instalasi Dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**
   Salin `.env.example` menjadi `.env` dan atur `DATABASE_URL` serta `AUTH_SECRET`. Untuk lokal, Anda bisa menggunakan SQLite (`file:./dev.db`).

4. **Setup Database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000`. Login menggunakan akun default dari file seed (misal: `guru.bk@sekolah.id` / `password123`).



Dibuat dengan ❤️ untuk meningkatkan kualitas bimbingan konseling di sekolah.
Lisensi: ISC
