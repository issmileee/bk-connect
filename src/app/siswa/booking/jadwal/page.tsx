"use client";

import { useState, useEffect } from "react";
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
                </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= 3
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                        >
                            {step}
                        </div>
                        {step < 4 && (
                            <div
                                className={`w-8 h-1 mx-1 ${step < 3 ? "bg-blue-600" : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>

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
        </div>
    );
}
