# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

**BK-Connect** is a school counseling (Bimbingan Konseling) management system for Indonesian schools. It allows students (Siswa) to book counseling sessions and teachers (Guru BK) to manage appointments, conduct consultations, and generate reports.

## Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint

# Database
npm run db:generate  # Regenerate Prisma client after schema changes
npm run db:push      # Push schema changes without migration (dev)
npm run db:migrate   # Create and run migration
npm run db:seed      # Seed database with test data
npm run db:studio    # Open Prisma Studio GUI
npm run db:reset     # Force reset DB and re-seed
```

## Architecture

### Role-Based Routing

Two distinct user roles with separate route trees:
- **SISWA** (students) → `/siswa/*` with `SiswaLayout`
- **GURU_BK** (counselors) → `/guru/*` with `GuruLayout`

The root `/` redirects based on the authenticated user's role. Auth is handled by NextAuth v5 (beta) using a credentials provider (email/NISN/NIP + bcrypt password), JWT sessions.

### Data Flow Pattern

The app uses Next.js App Router with **Server Components for reads** and **Server Actions for writes**:
- Pages fetch data directly as async Server Components (no API routes for reads)
- Mutations go through `src/actions/` (Server Actions with `"use server"`)
- After mutations, `revalidatePath()` invalidates the relevant page cache

### Key Domain Models (Prisma)

- **User** — roles: `SISWA`, `GURU_BK`, `ADMIN`
- **SlotTemplate** — consultation time slots (by `dayOfWeek` + `slotNumber` + `slotType`)
- **Booking** — student appointment with `status`: `PENDING → CONFIRMED → IN_PROGRESS → COMPLETED/CANCELLED`
- **ConsultationResult** — post-session notes linked to a Booking
- **SchoolSettings** — singleton config for school name, slot durations, etc.

### Internationalization

Dual language (Indonesian/English) via a custom context in `src/contexts/LanguageContext.tsx`. Language is stored in `localStorage` client-side and also set as an HTTP cookie for server-side access via `src/lib/getTranslations.ts`. All translation strings live in `src/lib/translations.ts`.

### Path Alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## Environment Setup

Copy `.env.example` to `.env.local` and fill in:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_URL` — App base URL
- `NEXTAUTH_SECRET` — Random secret for JWT signing

Docker Compose is available for local PostgreSQL: `docker-compose up -d`

## Sensitive Logic

Booking validation in `src/actions/bookings.ts` includes keyword detection for crisis indicators (e.g., "bunuh diri", "depresi") that flag bookings for urgent attention.
