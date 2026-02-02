# 🚀 Panduan Deployment Production - BK-Connect

Panduan lengkap untuk deploy BK-Connect ke production dengan PostgreSQL.

---

## 📋 Daftar Isi

1. [Persiapan](#persiapan)
2. [Setup PostgreSQL](#setup-postgresql)
3. [Konfigurasi Environment](#konfigurasi-environment)
4. [Database Migration](#database-migration)
5. [Platform Deployment](#platform-deployment)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## 1. Persiapan

### Checklist Sebelum Deploy

- [ ] Development sudah selesai dan tested
- [ ] Semua fitur berjalan dengan baik di lokal
- [ ] Code sudah di push ke Git repository
- [ ] Environment variables sudah disiapkan
- [ ] PostgreSQL database sudah ready

### Tools yang Dibutuhkan

- Git repository (GitHub, GitLab, dll)
- PostgreSQL database (lokal atau cloud)
- Platform deployment (Vercel, Railway, Render, dll)
- Terminal/Command Line

---

## 2. Setup PostgreSQL

### Opsi A: PostgreSQL Cloud (Recommended)

#### 2.1 Supabase (Free Tier Available) ⭐

1. Buka [https://supabase.com](https://supabase.com)
2. Sign up dan buat project baru
3. Tunggu database provisioning selesai
4. Copy connection string dari **Settings** → **Database**
5. Gunakan format "Connection Pooling" untuk production:
   ```
   postgresql://postgres.[PROJECT_ID]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

**Kelebihan:**
- Free tier 500MB storage
- Auto backup
- Dashboard yang bagus
- Connection pooling built-in

#### 2.2 Neon (Serverless PostgreSQL) ⭐

1. Buka [https://neon.tech](https://neon.tech)
2. Sign up dan buat project baru
3. Copy connection string
4. Format:
   ```
   postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require
   ```

**Kelebihan:**
- Free tier 3GB storage
- Auto-scaling
- Serverless (hemat biaya)
- Branch database untuk testing

#### 2.3 Railway

1. Buka [https://railway.app](https://railway.app)
2. Sign up dan buat project baru
3. Add PostgreSQL service
4. Copy connection string dari **Connect** tab
5. Format:
   ```
   postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/railway
   ```

**Kelebihan:**
- Easy setup
- Dashboard monitoring
- $5 credit gratis

### Opsi B: PostgreSQL Lokal (VPS/Server Sendiri)

#### Install PostgreSQL di Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Akses PostgreSQL
sudo -u postgres psql
```

#### Buat Database dan User

```sql
-- Buat user baru
CREATE USER bk_connect WITH PASSWORD 'your_secure_password';

-- Buat database
CREATE DATABASE bk_connect;

-- Berikan akses penuh ke user
GRANT ALL PRIVILEGES ON DATABASE bk_connect TO bk_connect;

-- Keluar
\q
```

#### Connection String Format

```
postgresql://bk_connect:your_secure_password@localhost:5432/bk_connect
```

---

## 3. Konfigurasi Environment

### 3.1 Update .env untuk Production

Copy `.env.example` ke `.env` dan sesuaikan:

```env
# Database - ganti dengan connection string PostgreSQL Anda
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# NextAuth Secret - WAJIB GANTI!
# Generate dengan: openssl rand -base64 32
AUTH_SECRET="generate-new-secret-key-here-minimum-32-characters"

# Trust host untuk production
AUTH_TRUST_HOST=true

# URL Production Anda
NEXTAUTH_URL="https://bk-connect.yourdomain.com"
```

### 3.2 Generate Auth Secret Baru

```bash
# Linux/Mac
openssl rand -base64 32

# Atau gunakan online generator:
# https://generate-secret.vercel.app/32
```

⚠️ **PENTING**: Jangan gunakan `AUTH_SECRET` yang sama dengan development!

---

## 4. Database Migration

### 4.1 Generate Prisma Client

```bash
npm run db:generate
```

### 4.2 Push Schema ke PostgreSQL

```bash
# Push schema (untuk pertama kali atau development)
npm run db:push

# Atau gunakan migrate untuk production tracking
npx prisma migrate dev --name init
```

### 4.3 Seed Data Production

```bash
# Seed dengan data awal
npm run db:seed
```

⚠️ **Catatan**: Pastikan ganti password default setelah seed!

### 4.4 Verify Database

```bash
# Buka Prisma Studio untuk cek data
npm run db:studio
```

---

## 5. Platform Deployment

### Opsi A: Vercel (Recommended untuk Next.js) ⭐

#### Setup

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Deploy ke preview
   vercel

   # Deploy ke production
   vercel --prod
   ```

#### Environment Variables di Vercel Dashboard

1. Buka project di [vercel.com/dashboard](https://vercel.com/dashboard)
2. Pilih project → **Settings** → **Environment Variables**
3. Tambahkan:
   - `DATABASE_URL` → Connection string PostgreSQL
   - `AUTH_SECRET` → Secret key baru
   - `AUTH_TRUST_HOST` → `true`
   - `NEXTAUTH_URL` → URL production Anda

4. Redeploy setelah menambahkan env vars

#### Custom Domain

1. **Settings** → **Domains**
2. Add domain Anda
3. Update DNS records sesuai instruksi

**Kelebihan Vercel:**
- Auto deploy dari Git
- Edge functions
- Free SSL
- Analytics built-in
- Free untuk personal projects

---

### Opsi B: Railway

#### Setup

1. Buka [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo**
3. Connect repository BK-Connect
4. Railway akan auto-detect Next.js

#### Environment Variables

1. Pilih project → **Variables**
2. Add:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_TRUST_HOST=true`
   - `NEXTAUTH_URL`

#### Database Connection

Jika menggunakan Railway PostgreSQL:
1. Add **PostgreSQL** service ke project
2. Copy `DATABASE_URL` dari PostgreSQL service
3. Paste ke app environment variables

**Kelebihan Railway:**
- Database + App dalam satu platform
- Easy setup
- Monitoring dashboard

---

### Opsi C: Render

#### Setup

1. Buka [render.com](https://render.com)
2. **New** → **Web Service**
3. Connect GitHub repository
4. Konfigurasi:
   - **Name**: bk-connect
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

#### Environment Variables

Add di **Environment** tab:
```
DATABASE_URL=postgresql://...
AUTH_SECRET=...
AUTH_TRUST_HOST=true
NEXTAUTH_URL=https://bk-connect.onrender.com
```

**Kelebihan Render:**
- Free tier available
- Auto SSL
- Easy database management

---

### Opsi D: VPS (DigitalOcean, AWS, GCP, dll)

#### Requirement

- Ubuntu 22.04 LTS
- Node.js 18+
- PostgreSQL 14+
- Nginx
- PM2

#### Setup Steps

1. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs

   # Install PM2
   sudo npm install -g pm2

   # Install Nginx
   sudo apt install nginx
   ```

2. **Clone & Setup Project**
   ```bash
   cd /var/www
   git clone <your-repo-url> bk-connect
   cd bk-connect
   npm install
   ```

3. **Setup .env**
   ```bash
   nano .env
   # Paste konfigurasi production
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Start with PM2**
   ```bash
   pm2 start npm --name "bk-connect" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/bk-connect
   ```

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/bk-connect /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

7. **Setup SSL dengan Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 6. Post-Deployment

### 6.1 Checklist Setelah Deploy

- [ ] Website dapat diakses
- [ ] Login berfungsi (test dengan akun seed)
- [ ] Database terkoneksi dengan baik
- [ ] Booking dapat dibuat
- [ ] Dashboard Guru BK berfungsi
- [ ] Mobile responsive works

### 6.2 Monitoring

#### Vercel
- Analytics: Dashboard → Analytics
- Logs: Dashboard → Deployments → Logs

#### Railway
- Metrics: Project → Metrics
- Logs: Project → Deployments → View Logs

#### VPS (PM2)
```bash
# Monitor logs
pm2 logs bk-connect

# Monitor metrics
pm2 monit

# Check status
pm2 status
```

### 6.3 Security Checklist

- [ ] AUTH_SECRET sudah diganti dengan yang baru
- [ ] Password default sudah diubah
- [ ] Database tidak accessible dari public
- [ ] HTTPS sudah aktif
- [ ] Environment variables tidak ter-commit ke Git
- [ ] CORS configured properly
- [ ] Rate limiting (jika perlu)

### 6.4 Backup Strategy

#### Automated Backup (Recommended)

**Supabase/Neon**: Backup otomatis included

**Railway/Custom PostgreSQL**:
```bash
# Buat backup script
nano backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > /backups/bk_connect_$DATE.sql
```

```bash
chmod +x backup.sh

# Setup cron untuk backup harian
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

---

## 7. Troubleshooting

### Error: Connection Timeout

**Solusi:**
1. Check apakah database accessible dari server
2. Verify connection string benar
3. Check firewall rules
4. Test dengan `psql` manual

### Error: Auth Secret Invalid

**Solusi:**
1. Generate secret baru dengan `openssl rand -base64 32`
2. Update environment variable
3. Redeploy

### Error: Prisma Client Not Found

**Solusi:**
```bash
npm run db:generate
npm run build
```

### Error: Database Migration Failed

**Solusi:**
```bash
# Reset dan migrate ulang
npx prisma migrate reset
npx prisma migrate dev
npm run db:seed
```

### Slow Performance

**Solusi:**
1. Enable connection pooling (Supabase, Neon)
2. Add database indexes:
   ```prisma
   @@index([siswaId])
   @@index([date, slotId])
   ```
3. Monitor dengan `prisma studio`

---

## 📚 Resource Tambahan

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [NextAuth.js Production Checklist](https://next-auth.js.org/deployment)

---

## 🎉 Selamat!

Aplikasi BK-Connect Anda sekarang sudah production-ready! 

**Next Steps:**
1. Share URL ke stakeholders
2. Conduct user training
3. Monitor performance
4. Collect feedback
5. Iterate improvements

---

**Need Help?** Buka issue di repository atau hubungi tim development.
