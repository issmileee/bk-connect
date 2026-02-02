"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { createBooking } from "@/actions/bookings";
import {
    ArrowLeft,
    Check,
    Calendar,
    Clock,
    FileText,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";
import type { Category } from "@/types";

interface BookingData {
    category: Category;
    complaint: string;
    date: string;
    slotId: string;
    slotInfo: {
        slotNumber: number | null;
        slotType: string;
        startTime: string;
        endTime: string;
    };
}

export default function KonfirmasiPage() {
    const router = useRouter();
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [bookingCode, setBookingCode] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const data = sessionStorage.getItem("bookingData");
        if (!data) {
            router.push("/siswa/booking/kategori");
            return;
        }
        setBookingData(JSON.parse(data));
    }, [router]);

    const getCategoryInfo = (category: string) => {
        switch (category) {
            case "AKADEMIK":
                return { label: "Akademik", color: "akademik" as const };
            case "KARIR":
                return { label: "Karir", color: "karir" as const };
            case "PRIBADI":
                return { label: "Pribadi", color: "pribadi" as const };
            default:
                return { label: category, color: "default" as const };
        }
    };

    const handleSubmit = async () => {
        if (!bookingData) return;

        setLoading(true);
        setError("");

        try {
            const result = await createBooking({
                slotId: bookingData.slotId,
                date: new Date(bookingData.date),
                category: bookingData.category,
                complaint: bookingData.complaint,
            });

            setBookingCode(result.bookingCode);
            setSuccess(true);
            sessionStorage.removeItem("bookingData");
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan saat membuat booking");
        } finally {
            setLoading(false);
        }
    };

    if (!bookingData) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    const catInfo = getCategoryInfo(bookingData.category);

    // Success State
    if (success) {
        return (
            <div className="max-w-md mx-auto text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Booking Berhasil! 🎉
                </h1>
                <p className="text-gray-600 mb-6">
                    Jadwal konseling kamu sudah tercatat
                </p>

                <Card className="mb-6">
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-500 mb-1">Kode Booking</p>
                        <p className="text-3xl font-bold text-blue-600">{bookingCode}</p>
                    </CardContent>
                </Card>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
                    <p className="text-sm text-amber-800">
                        📌 <strong>Ingat!</strong> Datang ke Ruang BK 5 menit sebelum jadwal.
                        Jangan lupa bawa kode booking ini.
                    </p>
                </div>

                <div className="space-y-3">
                    <Link href="/siswa/dashboard">
                        <Button className="w-full">Ke Dashboard</Button>
                    </Link>
                    <Link href="/siswa/history">
                        <Button variant="outline" className="w-full">
                            Lihat Riwayat
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <Link
                    href="/siswa/booking/jadwal"
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Kembali
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Konfirmasi Booking</h1>
                <p className="text-gray-600 mt-2">
                    Periksa kembali data booking sebelum melanjutkan
                </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {step < 4 ? <Check className="w-4 h-4" /> : step}
                        </div>
                        {step < 4 && <div className="w-8 h-1 mx-1 bg-blue-600" />}
                    </div>
                ))}
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-red-800 font-medium">Gagal membuat booking</p>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Booking Summary */}
            <Card>
                <CardContent className="p-6 space-y-4">
                    {/* Category */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <FileText className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">Kategori</span>
                        </div>
                        <Badge variant={catInfo.color} size="lg">
                            {catInfo.label}
                        </Badge>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">Tanggal</span>
                        </div>
                        <span className="font-medium text-gray-900">
                            {formatDate(new Date(bookingData.date))}
                        </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">Waktu</span>
                        </div>
                        <span className="font-medium text-gray-900">
                            {getSlotTypeLabel(
                                bookingData.slotInfo.slotType,
                                bookingData.slotInfo.slotNumber
                            )}{" "}
                            ({bookingData.slotInfo.startTime} - {bookingData.slotInfo.endTime})
                        </span>
                    </div>

                    {/* Complaint */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500 mb-2">Keluhan</p>
                        <p className="text-gray-700">{bookingData.complaint}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Important Notice */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700">
                    ℹ️ Dengan mengklik tombol di bawah, kamu menyetujui jadwal konseling ini.
                    Pastikan kamu datang tepat waktu.
                </p>
            </div>

            {/* Submit Button */}
            <Button onClick={handleSubmit} loading={loading} className="w-full py-3">
                <Check className="w-4 h-4 mr-2" />
                Konfirmasi Booking
            </Button>
        </div>
    );
}
