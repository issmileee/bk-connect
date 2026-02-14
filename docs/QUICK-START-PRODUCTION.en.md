# ⚡ Quick Start Production - BK-Connect

A quick guide to production deployment in just 15 minutes!

---

## 🎯 Choose Your Platform

### Option A: Vercel + Supabase (Fastest & Free Tier) ⭐ Recommended

**Time: ~10 minutes**

#### 1. Setup Database (Supabase)

1. Go to [supabase.com](https://supabase.com) → Sign up.
2. **New Project**.
3. Select the nearest region.
4. Wait for database provisioning (~2 minutes).
5. **Settings** → **Database** → Copy the **Connection Pooling** string.
    ```
    postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
    ```

#### 2. Deploy App (Vercel)

1. Push code to GitHub:
    ```bash
    git add .
    git commit -m "Ready for production"
    git push origin main
    ```

2. Go to [vercel.com](https://vercel.com) → Sign up with GitHub.

3. **Add New Project** → Import the BK-Connect repository.

4. **Configure Project:**
    - Framework Preset: **Next.js** (auto-detect).
    - Root Directory: `./`.
    - Build Command: `npm run build` (auto).
    - Install Command: `npm install` (auto).

5. **Environment Variables** - Add:
    ```
    DATABASE_URL=postgresql://postgres.[PROJECT]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
    AUTH_SECRET=<generate-new>
    AUTH_TRUST_HOST=true
    NEXTAUTH_URL=https://your-project.vercel.app
    ```

    Generate AUTH_SECRET:
    ```bash
    openssl rand -base64 32
    ```

6. **Deploy** → Wait ~2 minutes.

#### 3. Setup Database

Open your local terminal and set the connection string:

```bash
# Set environment variable
export DATABASE_URL="postgresql://..."

# Push schema
npm run db:push

# Seed data
npm run db:seed
```

#### 4. Verify

1. Open your Vercel app URL.
2. Login with: `guru.bk@sekolah.id` / `password123`.
3. ✅ Done!

**Cost:** $0/month (Free tier).

---

### Option B: Railway (All-in-One, Easiest) ⭐

**Time: ~15 minutes**

#### 1. Deploy

1. Go to [railway.app](https://railway.app) → Login with GitHub.

2. **New Project** → **Deploy from GitHub repo** → Select bk_connect.

3. Railway will auto-detect Next.js and deploy.

#### 2. Add PostgreSQL

1. In the project dashboard → **New** → **Database** → **PostgreSQL**.

2. Copy the `DATABASE_URL` from the PostgreSQL service.

#### 3. Add Environment Variables

Click the app service → **Variables** tab:

```
DATABASE_URL=<from-postgresql-service>
AUTH_SECRET=<generate-new>
AUTH_TRUST_HOST=true
NEXTAUTH_URL=<URL-from-railway>
```

Generate AUTH_SECRET:
```bash
openssl rand -base64 32
```

#### 4. Setup Database

```bash
# Set local DB URL
export DATABASE_URL="postgresql://..."

# Push & Seed
npm run db:push
npm run db:seed
```

#### 5. Redeploy

Click **Deploy** or push to Git.

**Cost:** $5/month after the free trial.

---

### Option C: Render (Free Tier Available)

**Time: ~15 minutes**

#### 1. Create Database

1. Go to [render.com](https://render.com) → Sign up.
2. **New** → **PostgreSQL**.
3. Name: `bk-connect-db`.
4. Region: Choose the nearest one.
5. Instance Type: **Free**.
6. Create Database.
7. Copy the **Internal Database URL**.

#### 2. Create Web Service

1. **New** → **Web Service**.
2. Connect the GitHub repo.
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

Wait for deployment to complete, then:

```bash
export DATABASE_URL="<internal-db-url>"
npm run db:push
npm run db:seed
```

**Cost:** $0/month (Free tier, auto-sleeps after inactivity).

---

## 🔐 Security Checklist

Immediately after deployment:

- [ ] Generate & update a new `AUTH_SECRET`.
- [ ] Update `NEXTAUTH_URL` with the production domain.
- [ ] Login and **change the default password**.
- [ ] Create a new Guidance Counselor account with actual data.
- [ ] Delete or disable demo accounts if not needed.
- [ ] Verify HTTPS is active (usually automatic).
- [ ] Test creating a booking.
- [ ] Test the counseling process.

---

## 🎨 Custom Domain (Optional)

### Vercel

1. Project **Settings** → **Domains**.
2. Add your domain.
3. Update DNS records with your domain provider:
    ```
    Type: CNAME
    Name: @
    Value: cname.vercel-dns.com
    ```

### Railway

1. Project → Settings → **Domains**.
2. Add custom domain.
3. Update DNS:
    ```
    Type: CNAME
    Name: @
    Value: <provided-by-railway>
    ```

### Render

1. Service → Settings → **Custom Domain**.
2. Add domain.
3. Update DNS as instructed.

---

## 📊 Monitoring

### Vercel
- **Analytics:** Dashboard → Analytics.
- **Logs:** Deployments → Function Logs.
- **Speed Insights:** Built-in.

### Railway
- **Metrics:** Project → Metrics tab.
- **Logs:** Service → View Logs.
- **Observability:** Built-in graphs.

### Render
- **Logs:** Service → Logs tab.
- **Metrics:** Service → Metrics.
- **Alerts:** Dashboard.

---

## 🆘 Troubleshooting

### App Not Accessible

1. Check deployment status.
2. Check logs for errors.
3. Verify environment variables are set correctly.

### Database Connection Error

1. Verify `DATABASE_URL` is correct.
2. Check if the database service is running.
3. Test connection with Prisma Studio locally.

### Auth Error / Infinite Redirect

1. Verify `AUTH_SECRET` is set.
2. Check if `NEXTAUTH_URL` matches the domain.
3. Set `AUTH_TRUST_HOST=true`.

### Build Failed

1. Check logs for error details.
2. Test `npm run build` locally.
3. Verify all dependencies in `package.json`.

---

## 📈 Next Steps

After successful deployment:

1. **Setup Backup** - Enable automatic backups in the database provider.
2. **Training** - Train counselors and students on how to use it.
3. **Monitoring** - Setup uptime monitoring (UptimeRobot, etc.).
4. **Analytics** - Track usage with Vercel Analytics.
5. **Feedback** - Collect user feedback for improvements.

---

## 💡 Production Tips

1. **Use Connection Pooling** for PostgreSQL (automatic with Supabase/Neon).
2. **Monitor Database Size** - Free tiers have limits.
3. **Regular Backups** - Setup automated backups.
4. **Error Tracking** - Consider Sentry for error monitoring.
5. **Performance** - Monitor with Vercel Speed Insights.

---

**Congratulations! 🎉 Your BK-Connect is now production-ready!**

Need help? Read [DEPLOYMENT.en.md](DEPLOYMENT.en.md) for the full guide.
