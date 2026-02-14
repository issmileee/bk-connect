# 🚀 Production Deployment Guide - BK-Connect

Complete guide to deploying BK-Connect to production with PostgreSQL.

---

## 📋 Table of Contents

1. [Preparation](#preparation)
2. [PostgreSQL Setup](#postgresql-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Migration](#database-migration)
5. [Deployment Platforms](#deployment-platforms)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## 1. Preparation

### Pre-Deployment Checklist

- [ ] Development is complete and tested.
- [ ] All features are running well locally.
- [ ] Code has been pushed to a Git repository.
- [ ] Environment variables are prepared.
- [ ] PostgreSQL database is ready.

### Required Tools

- Git repository (GitHub, GitLab, etc.).
- PostgreSQL database (local or cloud).
- Deployment platform (Vercel, Railway, Render, etc.).
- Terminal/Command Line.

---

## 2. PostgreSQL Setup

### Option A: Cloud PostgreSQL (Recommended)

#### 2.1 Supabase (Free Tier Available) ⭐

1. Go to [https://supabase.com](https://supabase.com).
2. Sign up and create a new project.
3. Wait for database provisioning to complete.
4. Copy the connection string from **Settings** → **Database**.
5. Use the "Connection Pooling" format for production:
   ```
   postgresql://postgres.[PROJECT_ID]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

**Advantages:**
- Free tier with 500MB storage.
- Auto-backup.
- Excellent dashboard.
- Built-in connection pooling.

#### 2.2 Neon (Serverless PostgreSQL) ⭐

1. Go to [https://neon.tech](https://neon.tech).
2. Sign up and create a new project.
3. Copy the connection string.
4. Format:
   ```
   postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require
   ```

**Advantages:**
- Free tier with 3GB storage.
- Auto-scaling.
- Serverless (cost-effective).
- Database branching for testing.

#### 2.3 Railway

1. Go to [https://railway.app](https://railway.app).
2. Sign up and create a new project.
3. Add the PostgreSQL service.
4. Copy the connection string from the **Connect** tab.
5. Format:
   ```
   postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/railway
   ```

**Advantages:**
- Easy setup.
- Monitoring dashboard.
- $5 free credit.

### Option B: Local PostgreSQL (VPS/Self-Hosted)

#### Install PostgreSQL on Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Access PostgreSQL
sudo -u postgres psql
```

#### Create Database and User

```sql
-- Create a new user
CREATE USER bk_connect WITH PASSWORD 'your_secure_password';

-- Create the database
CREATE DATABASE bk_connect;

-- Grant full privileges to the user
GRANT ALL PRIVILEGES ON DATABASE bk_connect TO bk_connect;

-- Exit
\q
```

#### Connection String Format

```
postgresql://bk_connect:your_secure_password@localhost:5432/bk_connect
```

---

## 3. Environment Configuration

### 3.1 Update .env for Production

Copy `.env.example` to `.env` and adjust the following:

```env
# Database - replace with your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# NextAuth Secret - MUST CHANGE!
# Generate with: openssl rand -base64 32
AUTH_SECRET="generate-new-secret-key-here-minimum-32-characters"

# Trust host for production
AUTH_TRUST_HOST=true

# Your Production URL
NEXTAUTH_URL="https://bk-connect.yourdomain.com"
```

### 3.2 Generate a New Auth Secret

```bash
# Linux/Mac
openssl rand -base64 32

# Or use an online generator:
# https://generate-secret.vercel.app/32
```

⚠️ **IMPORTANT**: Do not use the same `AUTH_SECRET` as development!

---

## 4. Database Migration

### 4.1 Generate Prisma Client

```bash
npm run db:generate
```

### 4.2 Push Schema to PostgreSQL

```bash
# Push schema (for first time or development)
npm run db:push

# Or use migrate for production tracking
npx prisma migrate dev --name init
```

### 4.3 Seed Production Data

```bash
# Seed with initial data
npm run db:seed
```

⚠️ **Note**: Make sure to change default passwords after seeding!

### 4.4 Verify Database

```bash
# Open Prisma Studio to check data
npm run db:studio
```

---

## 5. Deployment Platforms

### Option A: Vercel (Recommended for Next.js) ⭐

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
   # Deploy to preview
   vercel

   # Deploy to production
   vercel --prod
   ```

#### Environment Variables in Vercel Dashboard

1. Open your project at [vercel.com/dashboard](https://vercel.com/dashboard).
2. Select your project → **Settings** → **Environment Variables**.
3. Add:
   - `DATABASE_URL` → PostgreSQL connection string.
   - `AUTH_SECRET` → Your new secret key.
   - `AUTH_TRUST_HOST` → `true`.
   - `NEXTAUTH_URL` → Your production URL.

4. Redeploy after adding environment variables.

#### Custom Domain

1. **Settings** → **Domains**.
2. Add your domain.
3. Update DNS records as instructed.

**Advantages of Vercel:**
- Auto-deploy from Git.
- Edge functions.
- Free SSL.
- Built-in analytics.
- Free for personal projects.

---

### Option B: Railway

#### Setup

1. Go to [railway.app](https://railway.app).
2. **New Project** → **Deploy from GitHub repo**.
3. Connect the BK-Connect repository.
4. Railway will auto-detect Next.js.

#### Environment Variables

1. Select project → **Variables**.
2. Add:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_TRUST_HOST=true`
   - `NEXTAUTH_URL`

#### Database Connection

If using Railway PostgreSQL:
1. Add the **PostgreSQL** service to your project.
2. Copy `DATABASE_URL` from the PostgreSQL service.
3. Paste it into the app environment variables.

**Advantages of Railway:**
- Database + App on one platform.
- Easy setup.
- Monitoring dashboard.

---

### Option C: Render

#### Setup

1. Go to [render.com](https://render.com).
2. **New** → **Web Service**.
3. Connect the GitHub repository.
4. Configuration:
   - **Name**: bk-connect
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

#### Environment Variables

Add in the **Environment** tab:
```
DATABASE_URL=postgresql://...
AUTH_SECRET=...
AUTH_TRUST_HOST=true
NEXTAUTH_URL=https://bk-connect.onrender.com
```

**Advantages of Render:**
- Free tier available.
- Auto SSL.
- Easy database management.

---

### Option D: VPS (DigitalOcean, AWS, GCP, etc.)

#### Requirements

- Ubuntu 22.04 LTS.
- Node.js 18+.
- PostgreSQL 14+.
- Nginx.
- PM2.

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
   # Paste production configuration
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

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 6. Post-Deployment

### 6.1 Post-Deployment Checklist

- [ ] Website is accessible.
- [ ] Login works (test with a seeded account).
- [ ] Database connects correctly.
- [ ] Bookings can be created.
- [ ] Counselor dashboard works.
- [ ] Mobile responsive layout works.

### 6.2 Monitoring

#### Vercel
- Analytics: Dashboard → Analytics.
- Logs: Dashboard → Deployments → Logs.

#### Railway
- Metrics: Project → Metrics.
- Logs: Project → Deployments → View Logs.

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

- [ ] `AUTH_SECRET` has been replaced with a new one.
- [ ] Default passwords have been changed.
- [ ] Database is not publicly accessible.
- [ ] HTTPS is active.
- [ ] Environment variables are not committed to Git.
- [ ] CORS is configured properly.
- [ ] Rate limiting (if necessary).

### 6.4 Backup Strategy

#### Automated Backup (Recommended)

**Supabase/Neon**: Automatic backups included.

**Railway/Custom PostgreSQL**:
```bash
# Create a backup script
nano backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > /backups/bk_connect_$DATE.sql
```

```bash
chmod +x backup.sh

# Setup cron for daily backups
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

---

## 7. Troubleshooting

### Error: Connection Timeout

**Solution:**
1. Check if the database is accessible from the server.
2. Verify the connection string is correct.
3. Check firewall rules.
4. Test with `psql` manually.

### Error: Auth Secret Invalid

**Solution:**
1. Generate a new secret with `openssl rand -base64 32`.
2. Update environment variables.
3. Redeploy.

### Error: Prisma Client Not Found

**Solution:**
```bash
npm run db:generate
npm run build
```

### Error: Database Migration Failed

**Solution:**
```bash
# Reset and re-migrate
npx prisma migrate reset
npx prisma migrate dev
npm run db:seed
```

### Slow Performance

**Solution:**
1. Enable connection pooling (Supabase, Neon).
2. Add database indexes:
   ```prisma
   @@index([siswaId])
   @@index([date, slotId])
   ```
3. Monitor with `prisma studio`.

---

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [NextAuth.js Production Checklist](https://next-auth.js.org/deployment)

---

## 🎉 Congratulations!

Your BK-Connect application is now production-ready!

**Next Steps:**
1. Share the URL with stakeholders.
2. Conduct user training.
3. Monitor performance.
4. Collect feedback.
5. Iterate improvements.

---

**Need Help?** Open an issue on the repository or contact the development team.
