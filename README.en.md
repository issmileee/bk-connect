# BK-Connect 📚

**Digital Counseling Booking Platform for Schools**

BK-Connect is a modern solution for managing counseling schedules between students and Guidance Counselors (BK). Designed to simplify student access and boost counselor efficiency through automation and digitization.

## ✨ Key Features

- **Self-Service Booking**: Students can choose counseling categories, dates, and available time slots in real-time.
- **Smart Queue Management**: Counselors can manage incoming bookings with clear statuses (Pending, Confirmed, In Progress, etc.).
- **Sensitive Keyword Detection**: Automatic alerts for student complaints containing sensitive words to ensure priority handling.
- **Digital Counseling Records**: Organized logging of consultation results, solutions, and follow-up actions.
- **Flexible Slot Management**: Customizable time slots that align with school periods.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: Next.js API Routes, [NextAuth.js v5](https://authjs.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) ([Prisma ORM](https://www.prisma.io/))
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Quick Start

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd bk-connect
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Copy `.env.example` to `.env` and set your `DATABASE_URL` and `AUTH_SECRET`. For local development, you can use SQLite (`file:./dev.db`).

4. **Setup Database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Run Application**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`. Login using default credentials from the seed file (e.g., `guru.bk@sekolah.id` / `password123`).

---

Developed with ❤️ to improve school counseling services.
License: ISC
