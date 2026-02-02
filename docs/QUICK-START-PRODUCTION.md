# ⚡ Quick Start Production - BK-Connect

Panduan cepat untuk deployment production dalam 15 menit!

---

## 🎯 Pilih Platform Anda

### Opsi A: Vercel + Supabase (Tercepat & Free Tier) ⭐ Recommended

**Time: ~10 menit**

#### 1. Setup Database (Supabase)

1. Buka [supabase.com](https://supabase.com) → Sign up
2. **New Project**
3. Pilih region terdekat
4. Tunggu database provisioning (~2 menit)
5. **Settings** → **Database** → Copy **Connection Pooling** string
   ```
   postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```

#### 2. Deploy App (Vercel)

1. Push code ke GitHub:
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. Buka [vercel.com](https://vercel.com) → Sign up dengan GitHub

3. **Add New Project** → Import repository BK-Connect

4. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detect)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto)
   - Install Command: `npm install` (auto)

5. **Environment Variables** - Add:
   ```
   DATABASE_URL=postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   AUTH_SECRET=<generate-baru>
   AUTH_TRUST_HOST=true
   NEXTAUTH_URL=https://your-project.vercel.app
   ```

   Generate AUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

6. **Deploy** → Tunggu ~2 menit

#### 3. Setup Database

Buka terminal lokal dan set connection string:

```bash
# Set environment variable
export DATABASE_URL="postgresql://..."

# Push schema
npm run db:push

# Seed data
npm run db:seed
```

#### 4. Verify

1. Buka URL Vercel app Anda
2. Login dengan: `guru.bk@sekolah.id` / `password123`
3. ✅ Done!

**Cost:** $0/bulan (Free tier)

---

### Opsi B: Railway (All-in-One, Easiest) ⭐

**Time: ~15 menit**

#### 1. Deploy

1. Buka [railway.app](https://railway.app) → Login dengan GitHub

2. **New Project** → **Deploy from GitHub repo** → Pilih bk_connect

3. Railway auto-detect Next.js dan deploy

#### 2. Add PostgreSQL

1. Di project dashboard → **New** → **Database** → **PostgreSQL**

2. Copy `DATABASE_URL` dari PostgreSQL service

#### 3. Add Environment Variables

Klik service app → **Variables** tab:

```
DATABASE_URL=<dari-postgresql-service>
AUTH_SECRET=<generate-baru>
AUTH_TRUST_HOST=true
NEXTAUTH_URL=<URL-dari-railway>
```

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

#### 4. Setup Database

```bash
# Set DB URL lokal
export DATABASE_URL="postgresql://..."

# Push & Seed
npm run db:push
npm run db:seed
```

#### 5. Redeploy

Klik **Deploy** atau push ke Git

**Cost:** $5/bulan setelah free trial

---

### Opsi C: Render (Free Tier Available)

**Time: ~15 menit**

#### 1. Create Database

1. Buka [render.com](https://render.com) → Sign up
2. **New** → **PostgreSQL**
3. Name: `bk-connect-db`
4. Region: pilih terdekat
5. Instance Type: **Free**
6. Create Database
7. Copy **Internal Database URL**

#### 2. Create Web Service

1. **New** → **Web Service**
2. Connect GitHub repo
3. Configure:
   - **Name:** bk-connect
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

4. **Environment Variables:**
   ```
   DATABASE_URL=<internal-db-url>
   AUTH_SECRET=<generate>
   AUTH_TRUST_HOST=true
   NODE_ENV=production
   ```

5. **Create Web Service**

#### 3. Setup Database

Wait for deploy to complete, then:

```bash
export DATABASE_URL="<internal-db-url>"
npm run db:push
npm run db:seed
```

**Cost:** $0/bulan (Free tier, auto-sleep after inactivity)

---

## 🔐 Security Checklist

Setelah deploy, SEGERA lakukan:

- [ ] Generate & update `AUTH_SECRET` baru
- [ ] Update `NEXTAUTH_URL` dengan domain production
- [ ] Login dan **ganti password default**
- [ ] Buat akun Guru BK baru dengan data sebenarnya
- [ ] Hapus atau disable akun demo jika tidak diperlukan
- [ ] Verify HTTPS aktif (biasanya otomatis)
- [ ] Test create booking
- [ ] Test proses konseling

---

## 🎨 Custom Domain (Opsional)

### Vercel

1. Project **Settings** → **Domains**
2. Add domain Anda
3. Update DNS records di domain provider:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### Railway

1. Project → Settings → **Domains**
2. Add custom domain
3. Update DNS:
   ```
   Type: CNAME
   Name: @
   Value: <provided-by-railway>
   ```

### Render

1. Service → Settings → **Custom Domain**
2. Add domain
3. Update DNS sesuai instruksi

---

## 📊 Monitoring

### Vercel
- **Analytics:** Dashboard → Analytics
- **Logs:** Deployments → Function Logs
- **Speed Insights:** Built-in

### Railway
- **Metrics:** Project → Metrics tab
- **Logs:** Service → View Logs
- **Observability:** Built-in graphs

### Render
- **Logs:** Service → Logs tab
- **Metrics:** Service → Metrics
- **Alerts:** Dashboard

---

## 🆘 Troubleshooting

### App tidak bisa diakses

1. Check deployment status
2. Check logs untuk error
3. Verify environment variables set correctly

### Database connection error

1. Verify `DATABASE_URL` benar
2. Check database service running
3. Test connection dengan Prisma Studio lokal

### Auth error / Infinite redirect

1. Verify `AUTH_SECRET` set
2. Check `NEXTAUTH_URL` match dengan domain
3. Set `AUTH_TRUST_HOST=true`

### Build failed

1. Check logs untuk error detail
2. Test `npm run build` locally
3. Verify all dependencies di `package.json`

---

## 📈 Next Steps

Setelah deploy berhasil:

1. **Setup Backup** - Enable automatic backups di database provider
2. **Training** - Latih Guru BK dan siswa cara pakai
3. **Monitoring** - Setup uptime monitoring (UptimeRobot, etc)
4. **Analytics** - Track usage dengan Vercel Analytics
5. **Feedback** - Collect user feedback untuk improvement

---

## 💡 Tips Production

1. **Gunakan Connection Pooling** untuk PostgreSQL (Supabase/Neon auto)
2. **Monitor Database Size** - Free tier ada limit
3. **Regular Backups** - Setup automated backup
4. **Error Tracking** - Pertimbangkan Sentry untuk error monitoring
5. **Performance** - Monitor dengan Vercel Speed Insights

---

**Selamat! 🎉 BK-Connect Anda sudah production-ready!**

Perlu bantuan? Buka [DEPLOYMENT.md](DEPLOYMENT.md) untuk panduan lengkap.
