"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
    AlertCircle,
    Home,
    History
} from "lucide-react";
import Link from "next/link";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
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
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get("category") as Category;
    const { t, language } = useLanguage();

    const [bookingData, setBookingData] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [bookingCode, setBookingCode] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
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
            sessionStorage.removeItem("temp_booking");
            localStorage.removeItem("temp_complaint");
        } catch (err: any) {
            setError(err.message || t.common.error);
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

    // Success State
    if (success) {
        return (
            <div className="max-w-md mx-auto text-center py-12 animate-in fade-in slide-in-from-bottom-4">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
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
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

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
                <h1 className="text-2xl font-bold text-gray-900">{t.siswa.booking.confirmationTitle}</h1>
                <p className="text-gray-600 mt-2">
                    {t.siswa.booking.confirmationDesc}
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
                        <p className="text-red-800 font-medium">{t.common.error}</p>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Booking Summary */}
            <Card className="border-2">
                <CardContent className="p-6 space-y-4">
                    {/* Category */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <FileText className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">{t.common.category}</span>
                        </div>
                        <Badge variant={bookingData.category.toLowerCase() as any} size="lg">
                            {t.common[bookingData.category.toLowerCase() as "akademik" | "karir" | "pribadi"] || bookingData.category}
                        </Badge>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">{t.common.date}</span>
                        </div>
                        <span className="font-bold text-gray-900">
                            {formatDate(new Date(bookingData.date), language === "en" ? "en-US" : "id-ID")}
                        </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <Clock className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">{t.common.time}</span>
                        </div>
                        <span className="font-bold text-gray-900">
                            {bookingData.slotDetail.startTime} - {bookingData.slotDetail.endTime}
                            <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full uppercase">
                                {getSlotTypeLabel(bookingData.slotDetail.slotType, bookingData.slotDetail.slotNumber, t)}
                            </span>
                        </span>
                    </div>

                    {/* Complaint */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm font-medium text-gray-500 mb-2">{t.siswa.booking.complaintLabel}</p>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap italic bg-white p-3 rounded-lg border border-gray-100">
                            "{bookingData.complaint}"
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Important Notice */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700">
                    ℹ️ {t.siswa.booking.confirmationInfo}
                </p>
            </div>

            {/* Submit Button */}
            <Button
                onClick={handleSubmit}
                loading={loading}
                className="w-full h-12 text-lg rounded-xl shadow-lg shadow-blue-200"
            >
                <Check className="w-5 h-5 mr-2" />
                {t.siswa.booking.confirmButton}
            </Button>
        </div>
    );
}
