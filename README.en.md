# BK-Connect 📚

**Digital Counseling Booking System for Schools**

BK-Connect is a digital platform designed to facilitate the booking process and counseling management between students and Guidance Counselors (BK) in schools. This system automates the counseling schedule booking process, queue management, and counseling results recording in an efficient and structured manner.

---

## 🎯 Objectives

BK-Connect was built with the goal to:

- **Empower Students**: Provide ease for students in booking counseling schedules without having to come directly to the BK room.
- **Support Counselor Efficiency**: Help Guidance Counselors manage counseling schedules, queues, and counseling results in a more organized way.
- **Digitize Processes**: Transform manual processes into faster, more accurate, and anytime-accessible digital workflows.
- **Ensure Transparency**: Provide clear visibility into booking status and counseling results.

---

## ✨ Main Features

### 👨‍🎓 For Students

1. **Student Dashboard**
   - Summary display of active counseling schedules.
   - Statistics of completed counseling sessions.
   - Quick access to create new bookings.

2. **Booking System**
   - Select counseling category (Academic, Career, or Personal).
   - Select available dates and time slots.
   - Input complaints and upload supporting files (optional).
   - Receive a unique booking code (e.g., BK-2024-001).

3. **Schedule Management**
   - View all active and upcoming counseling schedules.
   - View history of completed counseling sessions.
   - Notifications for upcoming schedules.

4. **Student Profile**
   - Manage personal information.
   - View counseling statistics.

### 👨‍🏫 For Guidance Counselors

1. **Counselor Dashboard**
   - Overview of today's bookings.
   - Counseling statistics for this month.
   - Counseling category breakdown (Academic, Career, Personal).
   - **Alert System**: Automatic detection of sensitive words in student complaints for priority handling.

2. **Queue Management**
   - View all incoming bookings.
   - Filter by status (Pending, Confirmed, In Progress, Completed, Cancelled).
   - Sort by date and time.

3. **Counseling Process**
   - Input counseling results (problem summary, solution, follow-up).
   - Mark counseling results status (Completed, Follow-up Needed, Referred External).
   - Real-time booking status updates.

4. **Reports & Statistics**
   - Counseling reports per period.
   - Statistics based on categories.
   - Export data for administrative purposes.

5. **Time Slot Management**
   - Configure counseling time slots.
   - School hour slots (1st period - 8th period).
   - After school slots.
   - Enable/disable specific slots.

6. **Student Data Management**
   - View full student list.
   - View detailed profiles and student counseling history.

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **NextAuth.js v5** - Authentication & authorization
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Production database (SQLite for development)

### Tools & Libraries
- **bcryptjs** - Password hashing
- **date-fns** - Date manipulation
- **clsx** - Conditional class names

---

## 📋 Prerequisites

Before starting, make sure you have installed:

- **Node.js** (version 18 or newer)
- **npm** or **yarn** or **pnpm**
- **Git**

---

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd bk_connect
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup Environment Variables

Copy the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

For local development, use SQLite:

```env
# Database (Development - SQLite)
DATABASE_URL="file:./dev.db"

# NextAuth
AUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32
AUTH_TRUST_HOST=true
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with initial data
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

The application will run at [http://localhost:3000](http://localhost:3000)

---

### 🚀 Production Deployment

For production deployment with PostgreSQL, see the full guide at:

📖 **[DEPLOYMENT.en.md](docs/DEPLOYMENT.en.md)** - Production deployment guide with PostgreSQL

**Quick Production Overview:**

1. **Setup PostgreSQL Database**
   - Cloud: Supabase, Neon, Railway (recommended)
   - Self-hosted: VPS with PostgreSQL

2. **Update Environment Variables**
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   AUTH_SECRET="generate-new-secret"
   NEXTAUTH_URL="https://yourdomain.com"
   ```

3. **Deploy Platform**
   - Vercel (recommended for Next.js)
   - Railway
   - Render
   - VPS (Digital Ocean, AWS, GCP)

4. **Migrate & Seed Database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

See [DEPLOYMENT.en.md](docs/DEPLOYMENT.en.md) for full step-by-step instructions.

---

## 📖 Usage

### Login

After running the database seed, you can login with the following accounts:

**Guidance Counselor (BK):**
- Email: `guru.bk@sekolah.id`
- Password: `password123`

**Student:**
- Email: `ani@siswa.sekolah.id` (10th Grade Science 1)
- Email: `budi@siswa.sekolah.id` (10th Grade Science 2)
- Email: `citra@siswa.sekolah.id` (11th Grade Social 1)
- Password: `password123` (for all)

> ⚠️ **Important**: Change default passwords for security in production!

### Booking Flow (Student)

1. Login as a student.
2. Click "Create New Booking" on the dashboard.
3. Select counseling category (Academic/Career/Personal).
4. Select the desired date.
5. Select an available time slot.
6. Fill in the complaint form and upload supporting files (optional).
7. Review and confirm your booking.
8. Save the provided booking code.

### Counseling Flow (Guidance Counselor)

1. Login as a Guidance Counselor.
2. View the queue on the dashboard or "Queue" page.
3. Click the booking you want to process.
4. Update booking status according to progress.
5. After the counseling is complete, input counseling results:
   - Problem summary.
   - Provided solution.
   - Follow-up (if any).
   - Result status (Completed/Follow-up Needed/Referred External).

---

## 📁 Project Structure

```
bk_connect/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Database seeder
│   └── dev.db             # SQLite database (auto-generated)
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── guru/          # Pages for Guidance Counselor
│   │   ├── siswa/         # Pages for Student
│   │   └── login/         # Login page
│   ├── actions/           # Server actions
│   ├── components/        # React components
│   │   ├── layouts/       # Layout components
│   │   └── ui/            # UI components
│   ├── lib/               # Utility libraries
│   │   ├── auth.ts        # NextAuth configuration
│   │   ├── prisma.ts      # Prisma client
│   │   ├── translations.ts# Multi-language translations
│   │   └── utils.ts       # Helper functions
│   └── types/             # TypeScript type definitions
├── .env                   # Environment variables
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

---

## 🗄️ Database Schema

### Main Models

1. **User** - User data (Student, Counselor, Admin)
   - Information: Identification (NIS/NISN/NIP), name, email, password, grade/class.
   - Role-based access control.

2. **SlotTemplate** - Counseling time slot templates
   - Day of the week (Monday-Friday).
   - School hour slot (1-8) or after school.
   - Start and end time.

3. **Booking** - Counseling booking data
   - Unique booking code.
   - Date and time slot.
   - Student category and complaint.
   - Booking status.

4. **ConsultationResult** - Counseling results
   - Problem summary.
   - Provided solution.
   - Follow-up.
   - Result status.

5. **SchoolSettings** - School configurations
   - School name.
   - Slot duration.
   - School hour configurations.

### Booking Statuses

- `PENDING` - Waiting for confirmation.
- `CONFIRMED` - Confirmed.
- `IN_PROGRESS` - In progress.
- `COMPLETED` - Completed.
- `CANCELLED` - Cancelled.

### Counseling Categories

- `AKADEMIK` - Academic issues.
- `KARIR` - Career guidance.
- `PRIBADI` - Personal issues.

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Run development server

# Production
npm run build        # Build for production
npm run start        # Run production server

# Database
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with initial data
npm run db:studio    # Open Prisma Studio (DB GUI)
npm run db:reset     # Reset database and re-seed

# Linting
npm run lint         # Run ESLint
```

---

## 🔐 Security

- Passwords are hashed using bcryptjs.
- Authentication using NextAuth.js.
- Role-based access control (RBAC).
- Secure session management.
- Input validation on forms.

---

## 🎨 UI/UX Features

- **Responsive Design** - Accessible from desktop and mobile.
- **Modern UI** - Built with Tailwind CSS and a consistent design system.
- **User-friendly** - Intuitive and easy-to-use interface.
- **Real-time Updates** - Booking and queue statuses update in real-time.
- **Visual Feedback** - Badges, alerts, and notifications for critical statuses.

---

## 📊 Special Features

### Sensitive Word Alert System

The system automatically detects sensitive words in student complaints (such as "depression", "suicide", etc.) and displays special alerts on the Counselor dashboard for priority handling.

### Unique Booking Code

Each booking receives a unique code in the format `BK-YYYY-XXX` for easy tracking and reference.

### Slot Management

Flexibility in managing counseling time slots:
- School hour slots (1st period - 8th period).
- After school slots.
- Can be enabled/disabled per slot.

---

## 📚 Additional Documentation

- 📖 **[DEPLOYMENT.en.md](docs/DEPLOYMENT.en.md)** - Full production deployment guide with PostgreSQL
- ⚡ **[QUICK-START-PRODUCTION.en.md](docs/QUICK-START-PRODUCTION.en.md)** - 15-minute quick start deployment guide
- 🔄 **[MIGRATION-GUIDE.en.md](docs/MIGRATION-GUIDE.en.md)** - Guide for migrating from SQLite to PostgreSQL

---

## 🚧 Roadmap & Future Development

- [x] Multi-language support (English & Indonesian)
- [ ] Email notifications for counselor schedule reminders
- [ ] Export reports to PDF/Excel
- [ ] Integration with school academic systems
- [ ] Mobile app (React Native)
- [ ] Chat/messaging between students and Counselors
- [ ] Calendar integration to view schedules
- [ ] Dark mode

---

## 🤝 Contributing

Contributions are very welcome! If you want to contribute:

1. Fork the repository.
2. Create a branch for your new feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📝 License

This project is licensed under the ISC license.

---

## 👥 Development Team

Developed to facilitate the counseling process in schools.

---

## 📞 Support & Help

If you have questions or need help:

1. Open an issue on the repository.
2. Contact the development team.
3. Consult with your system administrator.

---

## 🙏 Acknowledgements

Thank you for using BK-Connect! We hope this system helps improve the efficiency and quality of counseling services in your school.

---

**BK-Connect** - *Helping every student get the support they need* 💙
