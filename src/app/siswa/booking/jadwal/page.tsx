"use client";

import { useState, useEffect } from "react";
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
                </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 3
                                ? "bg-blue-600 text-white"
                                : step < 3
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                        >
                            {step}
                        </div>
                        {step < 4 && <div className="w-8 h-1 bg-gray-200 mx-1" />}
                    </div>
                ))}
            </div>

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
        </div>
    );
}
