"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all slot templates
export async function getSlotTemplates() {
    const slots = await prisma.slotTemplate.findMany({
        orderBy: [
            { dayOfWeek: "asc" },
            { slotType: "asc" },
            { slotNumber: "asc" },
        ],
    });
    return slots;
}

// Get available slots for a specific date
export async function getAvailableSlotsForDate(date: Date) {
    const dayOfWeek = date.getDay();

    // Get all active slots for this day
    const templates = await prisma.slotTemplate.findMany({
        where: {
            dayOfWeek,
            isActive: true,
        },
        orderBy: [
            { slotType: "asc" },
            { slotNumber: "asc" },
        ],
    });

    // Get all bookings for this date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await prisma.booking.findMany({
        where: {
            date: {
                gte: startOfDay,
                lte: endOfDay,
            },
            status: { not: "CANCELLED" },
        },
        select: { slotId: true },
    });

    const bookedSlotIds = new Set(bookings.map((b) => b.slotId));

    // Return slots with availability status
    return templates.map((slot) => ({
        ...slot,
        isAvailable: !bookedSlotIds.has(slot.id),
    }));
}

// Toggle slot active status
export async function toggleSlot(slotId: string, isActive: boolean) {
    const slot = await prisma.slotTemplate.update({
        where: { id: slotId },
        data: { isActive },
    });

    revalidatePath("/guru/slots");
    revalidatePath("/siswa/booking/jadwal");

    return slot;
}

// Get school settings
export async function getSchoolSettings() {
    const settings = await prisma.schoolSettings.findFirst();
    return settings;
}

// Update school settings
export async function updateSchoolSettings(data: {
    schoolName?: string;
<<<<<<< HEAD
    slotDuration?: number;
}) {
    const settings = await prisma.schoolSettings.upsert({
        where: { id: "default-settings" },
        update: {
            schoolName: data.schoolName,
            slotDuration: data.slotDuration,
        },
        create: {
            id: "default-settings",
            schoolName: data.schoolName || "SMA BK Connect",
            slotDuration: data.slotDuration || 45,
=======
    slotDurationMinutes?: number;
    defaultStartTime?: string;
}) {
    const settings = await prisma.schoolSettings.upsert({
        where: { id: "default" },
        update: data,
        create: {
            id: "default",
            schoolName: data.schoolName || "SMA BK Connect",
            slotDurationMinutes: data.slotDurationMinutes || 45,
            defaultStartTime: data.defaultStartTime || "07:00",
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
        },
    });

    revalidatePath("/");
    return settings;
}
