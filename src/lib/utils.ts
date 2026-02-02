import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

// Generate booking code
export function generateBookingCode(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    const timestamp = Date.now().toString().slice(-4);
    return `BK-${year}-${timestamp}${random}`;
}

// Format date to Indonesian locale
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

// Format time
export function formatTime(time: string): string {
    return time;
}

// Get day name in Indonesian
export function getDayName(dayOfWeek: number): string {
    const days = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    return days[dayOfWeek] || "";
}

// Get category color
export function getCategoryColor(category: string): string {
    switch (category) {
        case "AKADEMIK":
            return "bg-red-100 text-red-800 border-red-200";
        case "KARIR":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "PRIBADI":
            return "bg-green-100 text-green-800 border-green-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
}

// Get status color
export function getStatusColor(status: string): string {
    switch (status) {
        case "PENDING":
            return "bg-yellow-100 text-yellow-800";
        case "CONFIRMED":
            return "bg-blue-100 text-blue-800";
        case "IN_PROGRESS":
            return "bg-purple-100 text-purple-800";
        case "COMPLETED":
            return "bg-green-100 text-green-800";
        case "CANCELLED":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

// Check if date is weekday (Senin-Jumat)
export function isWeekday(date: Date): boolean {
    const day = date.getDay();
    return day >= 1 && day <= 5;
}

// Get slot type label
export function getSlotTypeLabel(slotType: string, slotNumber: number | null): string {
    if (slotType === "SEPULANG_SEKOLAH") {
        return "Sepulang Sekolah";
    }
    return `Jam ke-${slotNumber}`;
}
