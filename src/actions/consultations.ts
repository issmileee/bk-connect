"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

interface CreateConsultationResultData {
    bookingId: string;
    guruBkId: string;
    summary: string;
    solution: string;
    followUp?: string;
    resultStatus: "COMPLETED" | "FOLLOW_UP_NEEDED" | "REFERRED_EXTERNAL";
}

// Create consultation result and complete booking
export async function createConsultationResult(data: CreateConsultationResultData) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "GURU_BK") {
        throw new Error("Unauthorized");
    }

    // Create result and update booking in transaction
    const result = await prisma.$transaction(async (tx) => {
        const consultationResult = await tx.consultationResult.create({
            data: {
                bookingId: data.bookingId,
                guruBkId: session.user.id,
                summary: data.summary,
                solution: data.solution,
                followUp: data.followUp,
                resultStatus: data.resultStatus,
            },
        });

        // Update booking status to completed
        await tx.booking.update({
            where: { id: data.bookingId },
            data: { status: "COMPLETED" },
        });

        return consultationResult;
    });

    revalidatePath("/guru/antrian");
    revalidatePath("/guru/siswa");
    revalidatePath("/siswa/history");

    return result;
}

// Get consultation stats for a date range
export async function getConsultationStats(startDate: Date, endDate: Date) {
    const bookings = await prisma.booking.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate,
            },
            status: { not: "CANCELLED" },
        },
        include: {
            result: true,
        },
    });

    const total = bookings.length;
    const completed = bookings.filter((b) => b.status === "COMPLETED").length;
    const pending = bookings.filter((b) => b.status === "PENDING" || b.status === "CONFIRMED").length;

    const categoryBreakdown = {
        akademik: bookings.filter((b) => b.category === "AKADEMIK").length,
        karir: bookings.filter((b) => b.category === "KARIR").length,
        pribadi: bookings.filter((b) => b.category === "PRIBADI").length,
    };

    const completedBookings = bookings.filter((b) => b.result);
    const resultBreakdown = {
        completed: completedBookings.filter((b) => b.result?.resultStatus === "COMPLETED").length,
        followUp: completedBookings.filter((b) => b.result?.resultStatus === "FOLLOW_UP_NEEDED").length,
        referred: completedBookings.filter((b) => b.result?.resultStatus === "REFERRED_EXTERNAL").length,
    };

    return {
        total,
        completed,
        pending,
        categoryBreakdown,
        resultBreakdown,
    };
}

// Get students with their consultation count
export async function getStudentsWithConsultationCount() {
    const students = await prisma.user.findMany({
        where: { role: "SISWA" },
        select: {
            id: true,
            name: true,
            email: true,
            kelas: true,
            bookings: {
                where: { status: { not: "CANCELLED" } },
                orderBy: { date: "desc" },
                take: 1,
                select: {
                    date: true,
                    category: true,
                },
            },
            _count: {
                select: { bookings: true },
            },
        },
    });

    return students.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        kelas: s.kelas,
        totalConsultations: s._count.bookings,
        lastConsultation: s.bookings[0] || null,
    }));
}

// Get detailed consultation history for a student
export async function getStudentConsultationHistory(studentId: string) {
    const bookings = await prisma.booking.findMany({
        where: { siswaId: studentId },
        include: {
            slot: true,
            result: true,
        },
        orderBy: { date: "desc" },
    });

    return bookings;
}
