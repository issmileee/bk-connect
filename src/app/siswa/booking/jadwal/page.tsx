"use client";

import { useState, useEffect } from "react";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getAvailableSlotsForDate } from "@/actions/slots";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock,
    ChevronLeft,
    ChevronRight,
    Sun,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { getDayName, getSlotTypeLabel } from "@/lib/utils";

interface AvailableSlot {
    id: string;
    slotNumber: number | null;
    slotType: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

export default function JadwalPage() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
    const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [weekStart, setWeekStart] = useState(() => {
        const today = new Date();
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(today.setDate(diff));
    });

    // Generate week days (Mon-Fri)
    const weekDays = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        return date;
    });

    // Check if date is in the past
    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    // Load slots when date is selected
=======
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
    ArrowLeft,
    Calendar as CalendarIcon,
    Clock,
    AlertCircle,
    ArrowRight
} from "lucide-react";
import { getAvailableSlotsForDate } from "@/actions/slots";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate, getSlotTypeLabel, getDayName } from "@/lib/utils";

export default function JadwalPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const { t, language } = useLanguage();

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableSlots, setAvailableSlots] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    // Get current week dates
    const getCurrentWeek = () => {
        const curr = new Date();
        const week = [];
        for (let i = 0; i < 14; i++) {
            const next = new Date(curr);
            next.setDate(curr.getDate() + i);
            // Skip Sunday
            if (next.getDay() !== 0) {
                week.push(next);
            }
        }
        return week;
    };

    const weekDates = getCurrentWeek();

>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
    useEffect(() => {
        if (selectedDate) {
            loadSlots(selectedDate);
        }
    }, [selectedDate]);

    const loadSlots = async (date: Date) => {
        setLoading(true);
        setSelectedSlot(null);
        try {
            const slots = await getAvailableSlotsForDate(date);
            setAvailableSlots(slots);
        } catch (error) {
            console.error("Error loading slots:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
<<<<<<< HEAD
        if (!selectedDate || !selectedSlot) return;

        const bookingData = sessionStorage.getItem("bookingData");
        if (!bookingData) {
            router.push("/siswa/booking/kategori");
            return;
        }

        const data = JSON.parse(bookingData);
        sessionStorage.setItem(
            "bookingData",
            JSON.stringify({
                ...data,
                date: selectedDate.toISOString(),
                slotId: selectedSlot.id,
                slotInfo: {
                    slotNumber: selectedSlot.slotNumber,
                    slotType: selectedSlot.slotType,
                    startTime: selectedSlot.startTime,
                    endTime: selectedSlot.endTime,
                },
            })
        );
        router.push("/siswa/booking/konfirmasi");
    };

    const prevWeek = () => {
        const prev = new Date(weekStart);
        prev.setDate(prev.getDate() - 7);
        setWeekStart(prev);
        setSelectedDate(null);
        setSelectedSlot(null);
    };

    const nextWeek = () => {
        const next = new Date(weekStart);
        next.setDate(next.getDate() + 7);
        setWeekStart(next);
        setSelectedDate(null);
        setSelectedSlot(null);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <Link
                    href="/siswa/booking/keluhan"
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Kembali
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Pilih Jadwal</h1>
                <p className="text-gray-600 mt-2">
                    Pilih tanggal dan jam yang tersedia untuk konsultasi
=======
        if (!selectedSlot || !selectedDate) return;

        sessionStorage.setItem(
            "temp_booking",
            JSON.stringify({
                date: selectedDate.toISOString(),
                slotId: selectedSlot.id,
                slotDetail: selectedSlot,
            })
        );

        router.push(`/siswa/booking/konfirmasi?category=${category}`);
    };

    const formatDateShort = (date: Date) => {
        return {
            dayName: getDayName(date.getDay(), t).slice(0, 3),
            dayNum: date.getDate(),
        };
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    {t.common.back}
                </button>
            </div>

            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">{t.siswa.booking.selectSchedule}</h1>
                <p className="text-gray-600 mt-2">
                    {t.siswa.booking.selectScheduleDesc}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
<<<<<<< HEAD
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= 3
                                    ? "bg-blue-600 text-white"
=======
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 3
                                ? "bg-blue-600 text-white"
                                : step < 3
                                    ? "bg-blue-100 text-blue-600"
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                    : "bg-gray-200 text-gray-500"
                                }`}
                        >
                            {step}
                        </div>
<<<<<<< HEAD
                        {step < 4 && (
                            <div
                                className={`w-8 h-1 mx-1 ${step < 3 ? "bg-blue-600" : "bg-gray-200"
                                    }`}
                            />
                        )}
=======
                        {step < 4 && <div className="w-8 h-1 bg-gray-200 mx-1" />}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                    </div>
                ))}
            </div>

<<<<<<< HEAD
            {/* Calendar */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                            <CalendarDays className="w-5 h-5 mr-2 text-blue-600" />
                            Pilih Tanggal
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevWeek}
                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={nextWeek}
                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-5 gap-2">
                        {weekDays.map((date) => {
                            const isPast = isPastDate(date);
                            const isSelected =
                                selectedDate?.toDateString() === date.toDateString();
                            const isToday =
                                new Date().toDateString() === date.toDateString();

                            return (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => !isPast && setSelectedDate(date)}
                                    disabled={isPast}
                                    className={`p-3 rounded-xl text-center transition-all ${isPast
                                            ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                                            : isSelected
                                                ? "bg-blue-600 text-white shadow-lg"
                                                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    <p className="text-xs font-medium">
                                        {getDayName(date.getDay()).slice(0, 3)}
                                    </p>
                                    <p className="text-xl font-bold mt-1">{date.getDate()}</p>
                                    {isToday && !isSelected && (
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mx-auto mt-1" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Time Slots */}
            {selectedDate && (
                <Card className="animate-fade-in">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-blue-600" />
                            Pilih Jam ({getDayName(selectedDate.getDay())},{" "}
                            {selectedDate.toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                            })}
                            )
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                            </div>
                        ) : availableSlots.length > 0 ? (
                            <div className="space-y-4">
                                {/* Jam Pelajaran */}
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-2">
                                        Jam Pelajaran
                                    </p>
                                    <div className="grid grid-cols-4 gap-2">
                                        {availableSlots
                                            .filter((s) => s.slotType === "JAM_PELAJARAN")
                                            .map((slot) => {
                                                const isSelected = selectedSlot?.id === slot.id;

                                                return (
                                                    <button
                                                        key={slot.id}
                                                        onClick={() =>
                                                            slot.isAvailable && setSelectedSlot(slot)
                                                        }
                                                        disabled={!slot.isAvailable}
                                                        className={`p-3 rounded-xl text-center transition-all ${!slot.isAvailable
                                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                                : isSelected
                                                                    ? "bg-blue-600 text-white shadow-lg"
                                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                                            }`}
                                                    >
                                                        <p className="font-semibold">Jam {slot.slotNumber}</p>
                                                        <p className="text-xs mt-1">{slot.startTime}</p>
                                                        {!slot.isAvailable && (
                                                            <Badge variant="default" size="sm" className="mt-1">
                                                                Penuh
                                                            </Badge>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                    </div>
                                </div>

                                {/* Sepulang Sekolah */}
                                {availableSlots.some(
                                    (s) => s.slotType === "SEPULANG_SEKOLAH"
                                ) && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-2">
                                                Sepulang Sekolah
                                            </p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {availableSlots
                                                    .filter((s) => s.slotType === "SEPULANG_SEKOLAH")
                                                    .map((slot) => {
                                                        const isSelected = selectedSlot?.id === slot.id;

                                                        return (
                                                            <button
                                                                key={slot.id}
                                                                onClick={() =>
                                                                    slot.isAvailable && setSelectedSlot(slot)
                                                                }
                                                                disabled={!slot.isAvailable}
                                                                className={`p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${!slot.isAvailable
                                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                                        : isSelected
                                                                            ? "bg-emerald-600 text-white shadow-lg"
                                                                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                                                                    }`}
                                                            >
                                                                <Sun className="w-4 h-4" />
                                                                <span className="font-semibold">
                                                                    {slot.startTime} - {slot.endTime}
                                                                </span>
                                                                {!slot.isAvailable && (
                                                                    <Badge variant="default" size="sm">
                                                                        Penuh
                                                                    </Badge>
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>Tidak ada slot tersedia untuk tanggal ini</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Continue Button */}
            <Button
                onClick={handleContinue}
                disabled={!selectedDate || !selectedSlot}
                className="w-full py-3"
            >
                Lanjutkan
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
=======
            {/* Date Selection */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                        {t.siswa.booking.selectDate}
                    </h3>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {weekDates.map((date) => {
                        const { dayName, dayNum } = formatDateShort(date);
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        const isToday = new Date().toDateString() === date.toDateString();

                        return (
                            <button
                                key={date.toISOString()}
                                onClick={() => setSelectedDate(date)}
                                className={`flex-shrink-0 w-16 h-24 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${isSelected
                                    ? "border-blue-600 bg-blue-50"
                                    : isToday
                                        ? "border-blue-200 bg-white"
                                        : "border-gray-100 bg-white hover:border-gray-200"
                                    }`}
                            >
                                <span className={`text-xs font-medium ${isSelected ? "text-blue-600" : "text-gray-500"}`}>
                                    {dayName}
                                </span>
                                <span className={`text-xl font-bold ${isSelected ? "text-blue-700" : "text-gray-900"}`}>
                                    {dayNum}
                                </span>
                                {isToday && <div className="w-1 h-1 rounded-full bg-blue-600" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-blue-600" />
                        {t.siswa.booking.selectTime}
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        {loading ? (
                            <div className="py-10 text-center">
                                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                                <p className="text-gray-500 text-sm">{t.common.loading}</p>
                            </div>
                        ) : availableSlots.length > 0 ? (
                            <>
                                {["JAM_PELAJARAN", "SEPULANG_SEKOLAH"].map((type) => {
                                    const typeSlots = availableSlots.filter(s => s.slotType === type);
                                    if (typeSlots.length === 0) return null;

                                    return (
                                        <div key={type} className="space-y-3">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
                                                {type === "JAM_PELAJARAN" ? t.siswa.booking.jamPelajaran : t.siswa.booking.sepulangSekolah}
                                            </p>
                                            <div className="grid grid-cols-2 gap-3">
                                                {typeSlots.map((slot) => {
                                                    const isSelected = selectedSlot?.id === slot.id;
                                                    const isAvailable = slot.isAvailable;

                                                    return (
                                                        <button
                                                            key={slot.id}
                                                            disabled={!isAvailable}
                                                            onClick={() => setSelectedSlot(slot)}
                                                            className={`p-4 rounded-xl border-2 transition-all text-left relative overflow-hidden group ${isSelected
                                                                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                                                                : !isAvailable
                                                                    ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60"
                                                                    : "border-gray-100 bg-white hover:border-gray-200"
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className={`text-sm font-bold ${isSelected ? "text-blue-700" : "text-gray-900"}`}>
                                                                    {slot.startTime} - {slot.endTime}
                                                                </span>
                                                                {!isAvailable && (
                                                                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded uppercase">
                                                                        Booked
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className={`text-xs ${isSelected ? "text-blue-600" : "text-gray-500"}`}>
                                                                {getSlotTypeLabel(slot.slotType, slot.slotNumber, t)}
                                                            </p>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <div className="p-8 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                                <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500">{t.siswa.booking.noSlots}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Bottom Action Area */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-10">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div className="hidden sm:block">
                        {selectedDate && selectedSlot && (
                            <div className="text-sm">
                                <p className="text-gray-500">{t.common.upcomingSchedule}</p>
                                <p className="font-bold text-gray-900">
                                    {formatDate(selectedDate, language === "en" ? "en-US" : "id-ID")} • {selectedSlot.startTime}
                                </p>
                            </div>
                        )}
                    </div>
                    <Button
                        disabled={!selectedSlot}
                        onClick={handleContinue}
                        className="w-full sm:w-auto px-12 h-12 rounded-xl shadow-lg shadow-blue-200"
                    >
                        {t.common.continue}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
        </div>
    );
}
