import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string;
        role: string;
        kelas?: string | null;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            kelas?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
        kelas?: string;
    }
}

// App-specific types
export type Role = "SISWA" | "GURU_BK" | "ADMIN";
export type Category = "AKADEMIK" | "KARIR" | "PRIBADI";
export type BookingStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type ResultStatus = "COMPLETED" | "FOLLOW_UP_NEEDED" | "REFERRED_EXTERNAL";
export type SlotType = "JAM_PELAJARAN" | "SEPULANG_SEKOLAH";

export interface SlotWithAvailability {
    id: string;
    dayOfWeek: number;
    slotNumber: number | null;
    slotType: SlotType;
    startTime: string;
    endTime: string;
    isActive: boolean;
    isBooked: boolean;
    bookedBy?: string;
}

export interface BookingWithDetails {
    id: string;
    bookingCode: string;
    date: Date;
    category: Category;
    complaint: string;
    status: BookingStatus;
    siswa: {
        id: string;
        name: string;
        kelas: string | null;
    };
    slot: {
        slotNumber: number | null;
        slotType: SlotType;
        startTime: string;
        endTime: string;
    };
    result?: {
        summary: string;
        solution: string;
        followUp: string | null;
        resultStatus: ResultStatus;
    };
}

export interface DashboardStats {
    totalBookingsToday: number;
    pendingBookings: number;
    completedThisMonth: number;
    categoryBreakdown: {
        akademik: number;
        karir: number;
        pribadi: number;
    };
}
