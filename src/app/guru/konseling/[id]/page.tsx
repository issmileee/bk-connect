"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { createConsultationResult } from "@/actions/consultations";
import { updateBookingStatus } from "@/actions/bookings";
import {
    ArrowLeft,
    User,
    Clock,
    FileText,
    CheckCircle2,
    AlertTriangle,
    BookOpen,
    Briefcase,
    Heart,
    Save
} from "lucide-react";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";
<<<<<<< HEAD
=======
import { useLanguage } from "@/contexts/LanguageContext";
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))

interface BookingDetail {
    id: string;
    bookingCode: string;
    date: string;
    category: string;
    complaint: string;
    status: string;
    siswa: {
        id: string;
        name: string;
        kelas: string | null;
        email: string;
    };
    slot: {
        slotNumber: number | null;
        slotType: string;
        startTime: string;
        endTime: string;
    };
    result: {
        id: string;
        summary: string;
        solution: string;
        followUp: string | null;
        resultStatus: string;
    } | null;
}

export default function KonselingDetailPage() {
    const router = useRouter();
    const params = useParams();
    const bookingId = params.id as string;
<<<<<<< HEAD
=======
    const { t, language } = useLanguage();
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))

    const [booking, setBooking] = useState<BookingDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form state
    const [summary, setSummary] = useState("");
    const [solution, setSolution] = useState("");
    const [followUp, setFollowUp] = useState("");
    const [resultStatus, setResultStatus] = useState<"COMPLETED" | "FOLLOW_UP_NEEDED" | "REFERRED_EXTERNAL">("COMPLETED");

    useEffect(() => {
        loadBooking();
    }, [bookingId]);

    const loadBooking = async () => {
        try {
            const res = await fetch(`/api/bookings/${bookingId}`);
            if (res.ok) {
                const data = await res.json();
                setBooking(data);
                if (data.result) {
                    setSummary(data.result.summary);
                    setSolution(data.result.solution);
                    setFollowUp(data.result.followUp || "");
                    setResultStatus(data.result.resultStatus);
                }
            }
        } catch (error) {
            console.error("Error loading booking:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartConsultation = async () => {
        if (!booking) return;
        try {
            await updateBookingStatus(booking.id, "IN_PROGRESS");
            setBooking({ ...booking, status: "IN_PROGRESS" });
        } catch (error) {
            console.error("Error starting consultation:", error);
        }
    };

    const handleSubmit = async () => {
        if (!booking || !summary.trim() || !solution.trim()) {
<<<<<<< HEAD
            alert("Mohon isi ringkasan dan solusi");
=======
            alert(t.guru.konseling.alertRequired);
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
            return;
        }

        setSaving(true);
        try {
            await createConsultationResult({
                bookingId: booking.id,
                guruBkId: "", // Will be filled by server
                summary,
                solution,
                followUp: followUp || undefined,
                resultStatus,
            });

            router.push("/guru/antrian");
        } catch (error) {
            console.error("Error saving result:", error);
<<<<<<< HEAD
            alert("Gagal menyimpan hasil konseling");
=======
            alert(t.guru.konseling.errorSave);
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
        } finally {
            setSaving(false);
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "AKADEMIK":
                return <BookOpen className="w-5 h-5 text-red-600" />;
            case "KARIR":
                return <Briefcase className="w-5 h-5 text-amber-600" />;
            case "PRIBADI":
                return <Heart className="w-5 h-5 text-emerald-600" />;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="text-center py-20">
<<<<<<< HEAD
                <p className="text-gray-500">Booking tidak ditemukan</p>
                <Button variant="outline" onClick={() => router.back()} className="mt-4">
                    Kembali
=======
                <p className="text-gray-500">{t.guru.konseling.errorNotFound}</p>
                <Button variant="outline" onClick={() => router.back()} className="mt-4">
                    {t.common.back}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                </Button>
            </div>
        );
    }

    const urgentKeywords = ["depresi", "bunuh diri", "menyakiti", "putus asa"];
    const isUrgent = urgentKeywords.some((keyword) =>
        booking.complaint.toLowerCase().includes(keyword)
    );

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
<<<<<<< HEAD
                Kembali
=======
                {t.common.back}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
            </button>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
<<<<<<< HEAD
                    <h1 className="text-2xl font-bold text-gray-900">Detail Konseling</h1>
=======
                    <h1 className="text-2xl font-bold text-gray-900">{t.guru.konseling.detailTitle}</h1>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                    <p className="text-gray-600">{booking.bookingCode}</p>
                </div>
                <Badge
                    variant={
                        booking.status === "COMPLETED"
                            ? "success"
                            : booking.status === "IN_PROGRESS"
                                ? "info"
                                : "warning"
                    }
                    size="lg"
                >
<<<<<<< HEAD
                    {booking.status === "PENDING" && "Menunggu"}
                    {booking.status === "IN_PROGRESS" && "Berlangsung"}
                    {booking.status === "COMPLETED" && "Selesai"}
=======
                    {booking.status === "PENDING" && t.common.waiting}
                    {booking.status === "IN_PROGRESS" && t.common.inProgress}
                    {booking.status === "COMPLETED" && t.common.completed}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                </Badge>
            </div>

            {/* Urgent Warning */}
            {isUrgent && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                    <div>
<<<<<<< HEAD
                        <h3 className="font-semibold text-red-800">Perhatian!</h3>
                        <p className="text-red-700 text-sm">
                            Ditemukan kata-kata sensitif dalam keluhan siswa. Pastikan penanganan dilakukan dengan hati-hati.
=======
                        <h3 className="font-semibold text-red-800">{t.common.urgent}</h3>
                        <p className="text-red-700 text-sm">
                            {t.common.sensitiveKeywords}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </p>
                    </div>
                </div>
            )}

            {/* Student Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2 text-blue-600" />
<<<<<<< HEAD
                        Informasi Siswa
=======
                        {t.guru.konseling.infoStudent}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
<<<<<<< HEAD
                            <p className="text-sm text-gray-500">Nama</p>
                            <p className="font-medium text-gray-900">{booking.siswa.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Kelas</p>
                            <p className="font-medium text-gray-900">{booking.siswa.kelas || "-"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">{booking.siswa.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Kategori</p>
=======
                            <p className="text-sm text-gray-500">{t.common.name}</p>
                            <p className="font-medium text-gray-900">{booking.siswa.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t.common.class}</p>
                            <p className="font-medium text-gray-900">{booking.siswa.kelas || "-"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t.common.email}</p>
                            <p className="font-medium text-gray-900">{booking.siswa.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{t.common.category}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                            <Badge
                                variant={booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"}
                                size="lg"
                            >
<<<<<<< HEAD
                                {booking.category}
=======
                                {t.common[booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"] || booking.category}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Schedule Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-blue-600" />
<<<<<<< HEAD
                        Jadwal
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-medium text-gray-900">{formatDate(new Date(booking.date))}</p>
                    <p className="text-gray-600">
                        {getSlotTypeLabel(booking.slot.slotType, booking.slot.slotNumber)} • {booking.slot.startTime} - {booking.slot.endTime}
=======
                        {t.guru.konseling.infoSchedule}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-medium text-gray-900">{formatDate(new Date(booking.date), language === "en" ? "en-US" : "id-ID")}</p>
                    <p className="text-gray-600">
                        {getSlotTypeLabel(booking.slot.slotType, booking.slot.slotNumber, t)} • {booking.slot.startTime} - {booking.slot.endTime}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                    </p>
                </CardContent>
            </Card>

            {/* Complaint */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
<<<<<<< HEAD
                        Keluhan Siswa
=======
                        {t.guru.konseling.complaintStudent}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{booking.complaint}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Consultation Form or Result */}
            {booking.status === "COMPLETED" && booking.result ? (
                <Card className="bg-emerald-50 border-emerald-200">
                    <CardHeader>
                        <CardTitle className="flex items-center text-emerald-800">
                            <CheckCircle2 className="w-5 h-5 mr-2" />
<<<<<<< HEAD
                            Hasil Konseling
=======
                            {t.guru.konseling.resultTitle}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
<<<<<<< HEAD
                            <p className="text-sm text-emerald-600 mb-1">Ringkasan</p>
                            <p className="text-emerald-800">{booking.result.summary}</p>
                        </div>
                        <div>
                            <p className="text-sm text-emerald-600 mb-1">Solusi</p>
=======
                            <p className="text-sm text-emerald-600 mb-1">{t.guru.konseling.summary}</p>
                            <p className="text-emerald-800">{booking.result.summary}</p>
                        </div>
                        <div>
                            <p className="text-sm text-emerald-600 mb-1">{t.guru.konseling.solution}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                            <p className="text-emerald-800">{booking.result.solution}</p>
                        </div>
                        {booking.result.followUp && (
                            <div>
<<<<<<< HEAD
                                <p className="text-sm text-emerald-600 mb-1">Tindak Lanjut</p>
=======
                                <p className="text-sm text-emerald-600 mb-1">{t.guru.konseling.followUp}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                <p className="text-emerald-800">{booking.result.followUp}</p>
                            </div>
                        )}
                        <div>
<<<<<<< HEAD
                            <p className="text-sm text-emerald-600 mb-1">Status</p>
                            <Badge variant="success">{booking.result.resultStatus}</Badge>
=======
                            <p className="text-sm text-emerald-600 mb-1">{t.common.category}</p>
                            <Badge variant="success">
                                {booking.result.resultStatus === "COMPLETED" ? t.guru.konseling.statusOptions.completed :
                                    booking.result.resultStatus === "FOLLOW_UP_NEEDED" ? t.guru.konseling.statusOptions.followUp :
                                        t.guru.konseling.statusOptions.referred}
                            </Badge>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-blue-600" />
<<<<<<< HEAD
                            {booking.status === "PENDING" ? "Mulai Konseling" : "Form Hasil Konseling"}
=======
                            {booking.status === "PENDING" ? t.guru.konseling.startConsultation : t.guru.konseling.formResult}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {booking.status === "PENDING" ? (
                            <div className="text-center py-6">
                                <p className="text-gray-500 mb-4">
<<<<<<< HEAD
                                    Klik tombol di bawah untuk memulai sesi konseling
                                </p>
                                <Button onClick={handleStartConsultation}>
                                    Mulai Konseling
=======
                                    {t.guru.konseling.startConsultationDesc}
                                </p>
                                <Button onClick={handleStartConsultation}>
                                    {t.guru.konseling.startConsultation}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
                                        Ringkasan Masalah <span className="text-red-500">*</span>
=======
                                        {t.guru.konseling.summary} <span className="text-red-500">*</span>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                    </label>
                                    <textarea
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
<<<<<<< HEAD
                                        placeholder="Tuliskan ringkasan masalah siswa..."
=======
                                        placeholder={t.guru.konseling.summaryPlaceholder}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
                                        Solusi yang Diberikan <span className="text-red-500">*</span>
=======
                                        {t.guru.konseling.solution} <span className="text-red-500">*</span>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                    </label>
                                    <textarea
                                        value={solution}
                                        onChange={(e) => setSolution(e.target.value)}
<<<<<<< HEAD
                                        placeholder="Tuliskan solusi atau saran yang diberikan..."
=======
                                        placeholder={t.guru.konseling.solutionPlaceholder}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
                                        Tindak Lanjut (Opsional)
=======
                                        {t.guru.konseling.followUp}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                    </label>
                                    <textarea
                                        value={followUp}
                                        onChange={(e) => setFollowUp(e.target.value)}
<<<<<<< HEAD
                                        placeholder="Misalnya: Perlu konseling lanjutan minggu depan..."
=======
                                        placeholder={t.guru.konseling.followUpPlaceholder}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        rows={2}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
                                        Status Hasil
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { value: "COMPLETED", label: "Selesai", color: "bg-emerald-500" },
                                            { value: "FOLLOW_UP_NEEDED", label: "Butuh Follow-up", color: "bg-amber-500" },
                                            { value: "REFERRED_EXTERNAL", label: "Dirujuk", color: "bg-purple-500" },
=======
                                        {t.guru.konseling.statusResult}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { value: "COMPLETED", label: t.guru.konseling.statusOptions.completed, color: "bg-emerald-500" },
                                            { value: "FOLLOW_UP_NEEDED", label: t.guru.konseling.statusOptions.followUp, color: "bg-amber-500" },
                                            { value: "REFERRED_EXTERNAL", label: t.guru.konseling.statusOptions.referred, color: "bg-purple-500" },
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        ].map((status) => (
                                            <button
                                                key={status.value}
                                                onClick={() => setResultStatus(status.value as typeof resultStatus)}
                                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${resultStatus === status.value
<<<<<<< HEAD
                                                        ? `${status.color} text-white shadow-lg`
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
=======
                                                    ? `${status.color} text-white shadow-lg`
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                                    }`}
                                            >
                                                {status.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Button onClick={handleSubmit} loading={saving} className="w-full">
                                    <Save className="w-4 h-4 mr-2" />
<<<<<<< HEAD
                                    Simpan Hasil Konseling
=======
                                    {t.guru.konseling.saveResult}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
