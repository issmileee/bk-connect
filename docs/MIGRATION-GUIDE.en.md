# 🔄 Migration Guide from SQLite to PostgreSQL

This guide explains how to migrate data from SQLite (development) to PostgreSQL (production).

---

## 📋 Migration Options

### Option 1: Fresh Start (Recommended for New Production)

If the application has not been used or you want to start with fresh data:

#### Step 1: Update Schema

The schema is already updated for PostgreSQL. Ensure `prisma/schema.prisma` uses:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### Step 2: Update Environment

Update your `.env` file with the PostgreSQL connection string:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

#### Step 3: Push Schema & Seed

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to PostgreSQL
npm run db:push

# Seed initial data
npm run db:seed
```

✅ **Done!** The PostgreSQL database is ready with fresh data.

---

### Option 2: Migrating Data from SQLite

If you already have data in SQLite and want to migrate it to PostgreSQL:

#### Using Prisma Migrate

##### Step 1: Backup SQLite Database

```bash
cp prisma/dev.db prisma/dev.db.backup
```

##### Step 2: Export Data from SQLite

```bash
# Install sqlite3 if not already present
sudo apt install sqlite3

# Export to SQL
sqlite3 prisma/dev.db .dump > backup-sqlite.sql
```

##### Step 3: Setup New PostgreSQL Database

```bash
# Ensure PostgreSQL is running
# Create a new database
createdb bk_connect
```

##### Step 4: Update Schema for PostgreSQL

The schema is already updated. Verify in `prisma/schema.prisma`:

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

Since SQLite and PostgreSQL have syntax differences, the safest way is:

**A. Export data to JSON:**

Create a file `scripts/export-data.ts`:

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

**B. Import data to PostgreSQL:**

Create a file `scripts/import-data.ts`:

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

Update `DATABASE_URL` to PostgreSQL, then run:

```bash
npx tsx scripts/import-data.ts
```

---

### Option 3: Using pgloader (Advanced)

`pgloader` is a tool for automated database migration.

#### Install pgloader

```bash
# Ubuntu/Debian
sudo apt install pgloader

# Mac
brew install pgloader
```

#### Create Migration Config

Create a file `migration.load`:

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

⚠️ **Note**: Manual adjustments for constraints and indexes may be needed.

---

## ✅ Verifying Migration

After migration, verify the data:

```bash
# Open Prisma Studio
npm run db:studio

# Test the application
npm run dev
```

**Checklist:**
- [ ] All users migrated.
- [ ] Slot templates complete.
- [ ] Bookings migrated with correct relations.
- [ ] Consultation results complete.
- [ ] Login works.
- [ ] Create booking works.
- [ ] Counselor dashboard displays correct data.

---

## 🔙 Rollback Plan

If issues occur:

### Rollback to SQLite

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

## 📊 Performance Comparison

### SQLite vs PostgreSQL

| Aspect | SQLite | PostgreSQL |
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

**Solution:**
```bash
npx prisma migrate reset
npm run db:seed
```

### Error: duplicate key value

The database still contains old data. Reset the database:

```bash
npx prisma migrate reset --force
```

### Data Not Appearing After Migration

Check with Prisma Studio:
```bash
npm run db:studio
```

Or run a manual query:
```bash
psql $DATABASE_URL -c "SELECT * FROM \"User\";"
```

### Connection Timeout

Check:
1. Is the PostgreSQL server running?
2. Do firewall rules allow connections?
3. Is the connection string correct?
4. Does the database exist?

---

## 📚 Resources

- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [PostgreSQL Migration Best Practices](https://www.postgresql.org/docs/current/migration.html)
- [pgloader Documentation](https://pgloader.readthedocs.io/)

---

**Tips:** Always test migration in a staging environment before moving to production!
