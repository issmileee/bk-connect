# 🔄 Panduan Migrasi dari SQLite ke PostgreSQL

Panduan ini menjelaskan cara migrasi data dari SQLite (development) ke PostgreSQL (production).

---

## 📋 Opsi Migrasi

### Opsi 1: Fresh Start (Recommended untuk Production Baru)

Jika aplikasi belum digunakan atau Anda ingin mulai dengan data fresh:

#### Step 1: Update Schema

Schema sudah diupdate untuk PostgreSQL. Pastikan `prisma/schema.prisma` menggunakan:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### Step 2: Update Environment

Update `.env` dengan PostgreSQL connection string:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

#### Step 3: Push Schema & Seed

```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke PostgreSQL
npm run db:push

# Seed data awal
npm run db:seed
```

✅ **Done!** Database PostgreSQL siap dengan data fresh.

---

### Opsi 2: Migrasi Data dari SQLite

Jika Anda sudah memiliki data di SQLite dan ingin migrasi ke PostgreSQL:

#### Menggunakan Prisma Migrate

##### Step 1: Backup SQLite Database

```bash
cp prisma/dev.db prisma/dev.db.backup
```

##### Step 2: Export Data dari SQLite

```bash
# Install sqlite3 jika belum ada
sudo apt install sqlite3

# Export ke SQL
sqlite3 prisma/dev.db .dump > backup-sqlite.sql
```

##### Step 3: Setup PostgreSQL Database Baru

```bash
# Pastikan PostgreSQL sudah running
# Buat database baru
createdb bk_connect
```

##### Step 4: Update Schema untuk PostgreSQL

Schema sudah diupdate. Verify di `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

##### Step 5: Update Environment Variables

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/bk_connect"
```

##### Step 6: Create Migration

```bash
# Reset prisma migrations folder
rm -rf prisma/migrations

# Create new migration for PostgreSQL
npx prisma migrate dev --name init
```

##### Step 7: Manual Data Migration

Karena SQLite dan PostgreSQL memiliki perbedaan syntax, cara paling aman adalah:

**A. Export data ke JSON:**

Create file `scripts/export-data.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./dev.db"
    }
  }
});

async function exportData() {
  const users = await prisma.user.findMany();
  const slots = await prisma.slotTemplate.findMany();
  const bookings = await prisma.booking.findMany({
    include: {
      slot: true,
      siswa: true,
      result: true
    }
  });
  const results = await prisma.consultationResult.findMany();
  const settings = await prisma.schoolSettings.findMany();

  const data = {
    users,
    slots,
    bookings,
    results,
    settings
  };

  fs.writeFileSync("data-export.json", JSON.stringify(data, null, 2));
  console.log("✅ Data exported to data-export.json");
  
  await prisma.$disconnect();
}

exportData();
```

Run export:

```bash
npx tsx scripts/export-data.ts
```

**B. Import data ke PostgreSQL:**

Create file `scripts/import-data.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function importData() {
  const data = JSON.parse(fs.readFileSync("data-export.json", "utf-8"));
  
  console.log("🔄 Importing data...");

  // Import Settings
  for (const setting of data.settings) {
    await prisma.schoolSettings.create({ data: setting });
  }
  console.log("✅ Settings imported");

  // Import Users
  for (const user of data.users) {
    await prisma.user.create({ data: user });
  }
  console.log("✅ Users imported");

  // Import Slots
  for (const slot of data.slots) {
    await prisma.slotTemplate.create({ data: slot });
  }
  console.log("✅ Slots imported");

  // Import Bookings (without relations first)
  for (const booking of data.bookings) {
    const { slot, siswa, result, ...bookingData } = booking;
    await prisma.booking.create({ data: bookingData });
  }
  console.log("✅ Bookings imported");

  // Import Results
  for (const result of data.results) {
    await prisma.consultationResult.create({ data: result });
  }
  console.log("✅ Results imported");

  await prisma.$disconnect();
  console.log("🎉 Import completed!");
}

importData();
```

Update DATABASE_URL ke PostgreSQL, then run:

```bash
npx tsx scripts/import-data.ts
```

---

### Opsi 3: Menggunakan pgloader (Advanced)

`pgloader` adalah tool untuk migrasi database otomatis.

#### Install pgloader

```bash
# Ubuntu/Debian
sudo apt install pgloader

# Mac
brew install pgloader
```

#### Create Migration Config

Create file `migration.load`:

```
LOAD DATABASE
     FROM sqlite://prisma/dev.db
     INTO postgresql://user:password@localhost/bk_connect

WITH include drop, create tables, create indexes, reset sequences

SET work_mem to '16MB', maintenance_work_mem to '512 MB';
```

#### Run Migration

```bash
pgloader migration.load
```

⚠️ **Note**: Mungkin perlu adjustment manual untuk constraints dan indexes.

---

## ✅ Verifikasi Migrasi

Setelah migrasi, verify data:

```bash
# Buka Prisma Studio
npm run db:studio

# Test aplikasi
npm run dev
```

**Checklist:**
- [ ] Semua users ter-migrate
- [ ] Slot templates lengkap
- [ ] Bookings ter-migrate dengan relasi yang benar
- [ ] Consultation results lengkap
- [ ] Login berfungsi
- [ ] Create booking berfungsi
- [ ] Guru BK dashboard menampilkan data yang benar

---

## 🔙 Rollback Plan

Jika terjadi masalah:

### Rollback ke SQLite

1. **Restore backup:**
   ```bash
   cp prisma/dev.db.backup prisma/dev.db
   ```

2. **Update schema:**
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

3. **Update .env:**
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Regenerate client:**
   ```bash
   npm run db:generate
   ```

---

## 📊 Perbandingan Performa

### SQLite vs PostgreSQL

| Aspek | SQLite | PostgreSQL |
|-------|--------|------------|
| Concurrent Writes | ❌ Limited | ✅ Excellent |
| Max Database Size | ~140 TB (theoretical) | ~32 TB per table |
| Concurrent Reads | ✅ Good | ✅ Excellent |
| ACID Compliance | ✅ Yes | ✅ Yes |
| Network Access | ❌ No | ✅ Yes |
| User Management | ❌ No | ✅ Yes |
| Full-text Search | Basic | ✅ Advanced |
| JSON Support | Basic | ✅ Advanced (JSONB) |
| Best for | Development, Testing | Production, Multi-user |

---

## 🆘 Troubleshooting

### Error: relation does not exist

**Solusi:**
```bash
npx prisma migrate reset
npm run db:seed
```

### Error: duplicate key value

Database masih ada data lama. Reset database:

```bash
npx prisma migrate reset --force
```

### Data tidak muncul setelah migrasi

Check dengan Prisma Studio:
```bash
npm run db:studio
```

Atau query manual:
```bash
psql $DATABASE_URL -c "SELECT * FROM \"User\";"
```

### Connection timeout

Check:
1. PostgreSQL server running?
2. Firewall rules allow connection?
3. Connection string benar?
4. Database exists?

---

## 📚 Resources

- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [PostgreSQL Migration Best Practices](https://www.postgresql.org/docs/current/migration.html)
- [pgloader Documentation](https://pgloader.readthedocs.io/)

---

**Tips:** Selalu test migrasi di staging environment dulu sebelum production!
