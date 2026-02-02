import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // === SCHOOL SETTINGS ===
    const settings = await prisma.schoolSettings.upsert({
        where: { id: "default-settings" },
        update: {},
        create: {
            id: "default-settings",
            schoolName: "SMA Negeri 1 Contoh",
            slotDuration: 45,
            afterSchoolStart: "14:00",
            afterSchoolEnd: "15:00",
            lesson1Start: "07:00",
            lesson2Start: "07:45",
            lesson3Start: "08:30",
            lesson4Start: "09:15",
            lesson5Start: "10:15",
            lesson6Start: "11:00",
            lesson7Start: "11:45",
            lesson8Start: "12:30",
        },
    });
    console.log("✅ School settings created");

    // === USERS ===
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Guru BK
    const guruBk = await prisma.user.upsert({
        where: { email: "guru.bk@sekolah.id" },
        update: {},
        create: {
            nip: "198501152010011001",
            name: "Ibu Sari Dewi, S.Pd",
            email: "guru.bk@sekolah.id",
            password: hashedPassword,
            role: "GURU_BK",
        },
    });
    console.log("✅ Guru BK created:", guruBk.name);

    // Siswa
    const siswa1 = await prisma.user.upsert({
        where: { email: "ani@siswa.sekolah.id" },
        update: {},
        create: {
            nisn: "0012345678",
            name: "Ani Safitri",
            email: "ani@siswa.sekolah.id",
            password: hashedPassword,
            role: "SISWA",
            kelas: "10 IPA 1",
        },
    });

    const siswa2 = await prisma.user.upsert({
        where: { email: "budi@siswa.sekolah.id" },
        update: {},
        create: {
            nisn: "0012345679",
            name: "Budi Santoso",
            email: "budi@siswa.sekolah.id",
            password: hashedPassword,
            role: "SISWA",
            kelas: "10 IPA 2",
        },
    });

    const siswa3 = await prisma.user.upsert({
        where: { email: "citra@siswa.sekolah.id" },
        update: {},
        create: {
            nisn: "0012345680",
            name: "Citra Maharani",
            email: "citra@siswa.sekolah.id",
            password: hashedPassword,
            role: "SISWA",
            kelas: "11 IPS 1",
        },
    });
    console.log("✅ 3 Siswa created");

    // === SLOT TEMPLATES ===
    // Buat slot untuk Senin-Jumat
    const days = [1, 2, 3, 4, 5]; // Senin sampai Jumat
    const lessonTimes = [
        { start: "07:00", end: "07:45" },
        { start: "07:45", end: "08:30" },
        { start: "08:30", end: "09:15" },
        { start: "09:15", end: "10:00" },
        { start: "10:15", end: "11:00" },
        { start: "11:00", end: "11:45" },
        { start: "11:45", end: "12:30" },
        { start: "12:30", end: "13:15" },
    ];

    let slotCount = 0;

    for (const day of days) {
        // Slot jam pelajaran (1-8)
        for (let i = 0; i < 8; i++) {
            await prisma.slotTemplate.upsert({
                where: {
                    dayOfWeek_slotNumber_slotType: {
                        dayOfWeek: day,
                        slotNumber: i + 1,
                        slotType: "JAM_PELAJARAN",
                    },
                },
                update: {},
                create: {
                    dayOfWeek: day,
                    slotNumber: i + 1,
                    slotType: "JAM_PELAJARAN",
                    startTime: lessonTimes[i].start,
                    endTime: lessonTimes[i].end,
                    isActive: true,
                },
            });
            slotCount++;
        }

        // Slot sepulang sekolah (1 per hari)
        await prisma.slotTemplate.upsert({
            where: {
                dayOfWeek_slotNumber_slotType: {
                    dayOfWeek: day,
                    slotNumber: 0, // Using 0 for after school
                    slotType: "SEPULANG_SEKOLAH",
                },
            },
            update: {},
            create: {
                dayOfWeek: day,
                slotNumber: null,
                slotType: "SEPULANG_SEKOLAH",
                startTime: "14:00",
                endTime: "15:00",
                isActive: true,
            },
        });
        slotCount++;
    }
    console.log(`✅ ${slotCount} Slot templates created`);

    console.log("\n🎉 Seeding completed!");
    console.log("\n📋 Login credentials:");
    console.log("   Guru BK: guru.bk@sekolah.id / password123");
    console.log("   Siswa 1: ani@siswa.sekolah.id / password123");
    console.log("   Siswa 2: budi@siswa.sekolah.id / password123");
    console.log("   Siswa 3: citra@siswa.sekolah.id / password123");
    console.log("\n⚠️  PENTING: Untuk production, segera ganti password default ini!");
    console.log("   Buat akun baru dengan data sekolah yang sebenarnya.\n");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
