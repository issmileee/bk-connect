"use client";

import { useState, useEffect } from "react";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
import { useRouter, useSearchParams } from "next/navigation";
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
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
<<<<<<< HEAD
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";
=======
    AlertCircle,
    Home,
    History
} from "lucide-react";
import Link from "next/link";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
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
<<<<<<< HEAD
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
=======
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get("category") as Category;
    const { t, language } = useLanguage();

    const [bookingData, setBookingData] = useState<any | null>(null);
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [bookingCode, setBookingCode] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
<<<<<<< HEAD
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
=======
        const tempBooking = sessionStorage.getItem("temp_booking");
        const tempComplaint = localStorage.getItem("temp_complaint");

        if (!tempBooking || !tempComplaint || !categoryQuery) {
            router.push("/siswa/booking/kategori");
            return;
        }

        const bookingJson = JSON.parse(tempBooking);
        setBookingData({
            ...bookingJson,
            complaint: tempComplaint,
            category: categoryQuery
        });
    }, [router, categoryQuery]);
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))

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
<<<<<<< HEAD
            sessionStorage.removeItem("bookingData");
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan saat membuat booking");
=======
            sessionStorage.removeItem("temp_booking");
            localStorage.removeItem("temp_complaint");
        } catch (err: any) {
            setError(err.message || t.common.error);
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
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

<<<<<<< HEAD
    const catInfo = getCategoryInfo(bookingData.category);

    // Success State
    if (success) {
        return (
            <div className="max-w-md mx-auto text-center py-12 animate-fade-in">
=======
    // Success State
    if (success) {
        return (
            <div className="max-w-md mx-auto text-center py-12 animate-in fade-in slide-in-from-bottom-4">
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
<<<<<<< HEAD
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
=======
                    {t.siswa.booking.successTitle} 🎉
                </h1>
                <p className="text-gray-600 mb-6">
                    {t.siswa.booking.successDesc}
                </p>

                <Card className="mb-6 border-2 border-emerald-100 bg-emerald-50/30">
                    <CardContent className="p-6">
                        <p className="text-sm text-emerald-600 font-medium mb-1 uppercase tracking-wider">{t.siswa.booking.bookingCodeLabel}</p>
                        <p className="text-4xl font-black text-emerald-700 tracking-widest">{bookingCode}</p>
                    </CardContent>
                </Card>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-8 text-left flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    <p className="text-sm text-blue-800 leading-relaxed">
                        {t.siswa.dashboard.tipsContent}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link href="/siswa/dashboard" className="w-full">
                        <Button variant="outline" className="w-full h-12 rounded-xl">
                            <Home className="w-4 h-4 mr-2" />
                            {t.siswa.nav.dashboard}
                        </Button>
                    </Link>
                    <Link href="/siswa/history" className="w-full">
                        <Button className="w-full h-12 rounded-xl shadow-lg shadow-blue-200">
                            <History className="w-4 h-4 mr-2" />
                            {t.siswa.nav.riwayat}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
<<<<<<< HEAD
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
=======
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
                <h1 className="text-2xl font-bold text-gray-900">{t.siswa.booking.confirmationTitle}</h1>
                <p className="text-gray-600 mt-2">
                    {t.siswa.booking.confirmationDesc}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
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
<<<<<<< HEAD
                        <p className="text-red-800 font-medium">Gagal membuat booking</p>
=======
                        <p className="text-red-800 font-medium">{t.common.error}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Booking Summary */}
<<<<<<< HEAD
            <Card>
=======
            <Card className="border-2">
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                <CardContent className="p-6 space-y-4">
                    {/* Category */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <FileText className="w-5 h-5 text-gray-400 mr-3" />
<<<<<<< HEAD
                            <span className="text-gray-600">Kategori</span>
                        </div>
                        <Badge variant={catInfo.color} size="lg">
                            {catInfo.label}
=======
                            <span className="text-gray-600">{t.common.category}</span>
                        </div>
                        <Badge variant={bookingData.category.toLowerCase() as any} size="lg">
                            {t.common[bookingData.category.toLowerCase() as "akademik" | "karir" | "pribadi"] || bookingData.category}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </Badge>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
<<<<<<< HEAD
                            <span className="text-gray-600">Tanggal</span>
                        </div>
                        <span className="font-medium text-gray-900">
                            {formatDate(new Date(bookingData.date))}
=======
                            <span className="text-gray-600">{t.common.date}</span>
                        </div>
                        <span className="font-bold text-gray-900">
                            {formatDate(new Date(bookingData.date), language === "en" ? "en-US" : "id-ID")}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 text-gray-400 mr-3" />
<<<<<<< HEAD
                            <span className="text-gray-600">Waktu</span>
                        </div>
                        <span className="font-medium text-gray-900">
                            {getSlotTypeLabel(
                                bookingData.slotInfo.slotType,
                                bookingData.slotInfo.slotNumber
                            )}{" "}
                            ({bookingData.slotInfo.startTime} - {bookingData.slotInfo.endTime})
=======
                            <span className="text-gray-600">{t.common.time}</span>
                        </div>
                        <span className="font-bold text-gray-900">
                            {bookingData.slotDetail.startTime} - {bookingData.slotDetail.endTime}
                            <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full uppercase">
                                {getSlotTypeLabel(bookingData.slotDetail.slotType, bookingData.slotDetail.slotNumber, t)}
                            </span>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </span>
                    </div>

                    {/* Complaint */}
                    <div className="p-4 bg-gray-50 rounded-xl">
<<<<<<< HEAD
                        <p className="text-sm text-gray-500 mb-2">Keluhan</p>
                        <p className="text-gray-700">{bookingData.complaint}</p>
=======
                        <p className="text-sm font-medium text-gray-500 mb-2">{t.siswa.booking.complaintLabel}</p>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap italic bg-white p-3 rounded-lg border border-gray-100">
                            "{bookingData.complaint}"
                        </p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                    </div>
                </CardContent>
            </Card>

            {/* Important Notice */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700">
<<<<<<< HEAD
                    ℹ️ Dengan mengklik tombol di bawah, kamu menyetujui jadwal konseling ini.
                    Pastikan kamu datang tepat waktu.
=======
                    ℹ️ {t.siswa.booking.confirmationInfo}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                </p>
            </div>

            {/* Submit Button */}
<<<<<<< HEAD
            <Button onClick={handleSubmit} loading={loading} className="w-full py-3">
                <Check className="w-4 h-4 mr-2" />
                Konfirmasi Booking
=======
            <Button
                onClick={handleSubmit}
                loading={loading}
                className="w-full h-12 text-lg rounded-xl shadow-lg shadow-blue-200"
            >
                <Check className="w-5 h-5 mr-2" />
                {t.siswa.booking.confirmButton}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
            </Button>
        </div>
    );
}
