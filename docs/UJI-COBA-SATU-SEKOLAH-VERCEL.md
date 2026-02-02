# Uji Coba Satu Sekolah di Vercel (Production)

Panduan singkat untuk menjalankan **BK-Connect** dengan **satu sekolah** di tahap produksi menggunakan **Vercel + Supabase**.

---

## Yang Anda Dapat

- **1 sekolah** (nama & jadwal bisa disesuaikan)
- **1 akun Guru BK** + **3 akun Siswa demo** untuk uji coba
- **Slot jadwal** Senin–Jumat (jam pelajaran + sepulang sekolah)
- **Free tier** Vercel + Supabase ($0/bulan)

---

## Persiapan (5 menit)

1. **GitHub** – Repo BK-Connect sudah di-push ke GitHub
2. **Supabase** – Akun di [supabase.com](https://supabase.com)
3. **Vercel** – Akun di [vercel.com](https://vercel.com) (login dengan GitHub)

---

## Langkah 1: Database (Supabase)

1. Buka [supabase.com](https://supabase.com) → **New Project**
2. Nama project: `bk-connect-sekolah-satu` (atau bebas)
3. Pilih **region** terdekat (mis. Singapore)
4. Set **Database Password** → simpan di tempat aman
5. Tunggu provisioning (±2 menit)
6. **Project Settings** → **Database** → **Connection string** → pilih **URI** → **Connection pooling**
7. Copy connection string, format:
   ```text
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
   Ganti `[PASSWORD]` dengan password database yang Anda set.

---

## Langkah 2: Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) → **Add New Project**
2. **Import** repository GitHub BK-Connect
3. **Configure Project:**
   - Framework: **Next.js** (otomatis)
   - Root Directory: `./`
   - Build: `npm run build`
   - Install: `npm install`

4. **Environment Variables** – tambahkan:

   | Name           | Value |
   |----------------|--------|
   | `DATABASE_URL` | Connection string Supabase (pooling) dari Langkah 1 |
   | `AUTH_SECRET`  | Hasil dari `openssl rand -base64 32` |
   | `AUTH_TRUST_HOST` | `true` |
   | `NEXTAUTH_URL` | `https://[nama-project-anda].vercel.app` |

   Generate `AUTH_SECRET` di terminal:
   ```bash
   openssl rand -base64 32
   ```

5. Klik **Deploy** → tunggu build selesai (±2–3 menit).

6. Catat **URL production**, misalnya: `https://bk-connect-xxx.vercel.app`

---

## Langkah 3: Setup Database (Schema + Data Satu Sekolah)

Setelah deploy pertama berhasil, jalankan dari **komputer lokal** (dengan repo BK-Connect dan Node terpasang):

1. Set environment variable (gunakan connection string yang sama dengan di Vercel):
   ```bash
   export DATABASE_URL="postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres"
   ```

2. Push schema ke database:
   ```bash
   npm run db:push
   ```

3. Seed data **satu sekolah** (1 Guru BK, 3 Siswa demo, slot jadwal):
   ```bash
   npm run db:seed
   ```

4. Selesai. Data yang dibuat:
   - **SchoolSettings:** 1 sekolah (nama default: "SMA Negeri 1 Contoh")
   - **User:** 1 Guru BK + 3 Siswa
   - **SlotTemplate:** Senin–Jumat (jam pelajaran + sepulang sekolah)

---

## Langkah 4: Verifikasi Uji Coba

1. Buka **URL Vercel** Anda (mis. `https://bk-connect-xxx.vercel.app`).
2. **Login Guru BK:**
   - Email: `guru.bk@sekolah.id`
   - Password: `password123`
3. **Login Siswa** (untuk uji alur booking):
   - Email: `ani@siswa.sekolah.id` / Password: `password123`
   - Atau: `budi@siswa.sekolah.id`, `citra@siswa.sekolah.id` (password sama)

**Uji singkat:**
- Guru: buat/lihat slot, lihat antrian, buat laporan konseling
- Siswa: booking konseling (pilih kategori → jadwal → konfirmasi)

---

## Mengganti Nama Sekolah / Data Sekolah

Data sekolah (nama, jam) disimpan di tabel **SchoolSettings** dan diisi oleh seed. Untuk **satu sekolah** dengan nama/jadwal real:

**Opsi A – Ubah seed lalu seed ulang (development/staging):**

1. Edit `prisma/seed.ts`:
   - Ganti `schoolName: "SMA Negeri 1 Contoh"` dengan nama sekolah Anda
   - Sesuaikan `afterSchoolStart`, `afterSchoolEnd`, `lesson1Start`, dll jika perlu
2. (Opsional) Ganti email/nama Guru BK dan siswa di `seed.ts`
3. Jalankan lagi:
   ```bash
   npm run db:push
   npm run db:seed
   ```
   Catatan: `upsert` di seed akan update record yang sudah ada (by id/email).

**Opsi B – Ubah langsung di database (production):**

1. Buka **Supabase** → **Table Editor** → tabel `SchoolSettings`
2. Edit baris `default-settings`: ubah `schoolName` dan kolom waktu jika perlu
3. Simpan

Setelah itu, aplikasi di Vercel akan menampilkan nama sekolah dan jadwal yang baru.

---

## Checklist Keamanan (Satu Sekolah Production)

- [ ] `AUTH_SECRET` unik dan rahasia (tidak dipakai di dev)
- [ ] `NEXTAUTH_URL` = URL production Vercel (tanpa trailing slash)
- [ ] Login dan **ganti password default** Guru BK & akun demo
- [ ] Buat akun Guru BK/Siswa real jika dipakai untuk production
- [ ] Nonaktifkan atau hapus akun demo jika tidak dipakai
- [ ] Pastikan HTTPS (Vercel menyediakan otomatis)

---

## Troubleshooting

| Masalah | Solusi |
|--------|--------|
| Build gagal di Vercel | Cek **Deployments → Logs**. Pastikan `npm run build` sukses di lokal. |
| Error database / connection | Pastikan `DATABASE_URL` di Vercel sama dengan yang dipakai untuk `db:push` (connection **pooling**). |
| Login redirect loop | Pastikan `NEXTAUTH_URL` = URL production dan `AUTH_TRUST_HOST=true`. |
| Server Action gagal | Pastikan `next.config.js` punya `allowedOrigins` yang mencakup `*.vercel.app` (sudah disiapkan di repo). |

---

## Ringkasan Alur

```text
Supabase (buat project → dapat DATABASE_URL)
    → Vercel (import repo → set env → deploy)
    → Lokal (export DATABASE_URL → db:push → db:seed)
    → Buka URL Vercel → login Guru/Siswa → uji coba satu sekolah
```

Setelah langkah ini, Anda punya **satu instance production** untuk satu sekolah di Vercel dan siap dipakai uji coba atau rollout terbatas.
