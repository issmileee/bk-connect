"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateBookingCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import type { Category } from "@/types";

interface CreateBookingData {
    slotId: string;
    date: Date;
    category: Category;
    complaint: string;
    attachmentUrl?: string;
}

// Check if slot is available
export async function checkSlotAvailability(slotId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingBooking = await prisma.booking.findFirst({
        where: {
            slotId,
            date: {
                gte: startOfDay,
                lte: endOfDay,
            },
            status: { not: "CANCELLED" },
        },
    });

    return !existingBooking;
}

// Check if student already has a booking on the same day
export async function checkStudentDailyBooking(siswaId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingBooking = await prisma.booking.findFirst({
        where: {
            siswaId,
            date: {
                gte: startOfDay,
                lte: endOfDay,
            },
            status: { not: "CANCELLED" },
        },
    });

    return existingBooking;
}

// Create a new booking with race condition handling
export async function createBooking(data: CreateBookingData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }
    const siswaId = session.user.id;

    const startOfDay = new Date(data.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(data.date);
    endOfDay.setHours(23, 59, 59, 999);

    // Use transaction for race condition handling
    const booking = await prisma.$transaction(async (tx) => {
        // Check if slot is still available
        const existingSlotBooking = await tx.booking.findFirst({
            where: {
                slotId: data.slotId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                status: { not: "CANCELLED" },
            },
        });

        if (existingSlotBooking) {
            throw new Error("Maaf, slot ini baru saja dipesan orang lain");
        }

        // Check if student already has booking today
        const existingStudentBooking = await tx.booking.findFirst({
            where: {
                siswaId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                status: { not: "CANCELLED" },
            },
        });

        if (existingStudentBooking) {
            throw new Error("Kamu sudah memiliki jadwal konseling hari ini");
        }

        // Create the booking
        const newBooking = await tx.booking.create({
            data: {
                bookingCode: generateBookingCode(),
                siswaId,
                slotId: data.slotId,
                date: data.date,
                category: data.category,
                complaint: data.complaint,
                attachmentUrl: data.attachmentUrl,
                status: "PENDING",
            },
            include: {
                slot: true,
                siswa: true,
            },
        });

        return newBooking;
    });

    revalidatePath("/siswa/dashboard");
    revalidatePath("/siswa/history");
    revalidatePath("/guru/antrian");

    return booking;
}

// Get bookings for a student
export async function getStudentBookings(siswaId: string) {
    const bookings = await prisma.booking.findMany({
        where: { siswaId },
        include: {
            slot: true,
            result: true,
        },
        orderBy: { date: "desc" },
    });
    return bookings;
}

// Get today's bookings for Guru BK
export async function getTodayBookings() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const bookings = await prisma.booking.findMany({
        where: {
            date: {
                gte: today,
                lt: tomorrow,
            },
            status: { not: "CANCELLED" },
        },
        include: {
            siswa: true,
            slot: true,
            result: true,
        },
        orderBy: [{ slot: { slotNumber: "asc" } }],
    });

    return bookings;
}

// Cancel booking
export async function cancelBooking(bookingId: string, siswaId: string) {
    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
    });

    if (!booking) {
        throw new Error("Booking tidak ditemukan");
    }

    if (booking.siswaId !== siswaId) {
        throw new Error("Tidak berhak membatalkan booking ini");
    }

    // Check if booking is today (H-0)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(booking.date);
    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate.getTime() === today.getTime()) {
        throw new Error("Pembatalan di hari yang sama memerlukan konfirmasi Guru BK");
    }

    const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELLED" },
    });

    revalidatePath("/siswa/dashboard");
    revalidatePath("/siswa/history");
    revalidatePath("/guru/antrian");

    return updatedBooking;
}

// Update booking status (for Guru BK)
export async function updateBookingStatus(bookingId: string, status: string) {
    const booking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: status as "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" },
    });

    revalidatePath("/guru/antrian");
    revalidatePath("/siswa/dashboard");

    return booking;
}
