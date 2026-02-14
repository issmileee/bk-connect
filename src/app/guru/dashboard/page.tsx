import { getTodayBookings } from "@/actions/bookings";
import { getConsultationStats } from "@/actions/consultations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
    Users,
    CalendarCheck,
    Clock,
    CheckCircle2,
    BookOpen,
    Briefcase,
    Heart,
    AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";
<<<<<<< HEAD

export default async function GuruDashboard() {
=======
import { getTranslations } from "@/lib/getTranslations";

export default async function GuruDashboard() {
    const { t, language } = await getTranslations();
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
    const todayBookings = await getTodayBookings();

    // Get stats for current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const stats = await getConsultationStats(startOfMonth, endOfMonth);

    // Check for urgent keywords in complaints
    const urgentKeywords = ["depresi", "bunuh diri", "menyakiti", "putus asa", "tidak mau hidup"];
    const urgentBookings = todayBookings.filter((b) =>
        urgentKeywords.some((keyword) => b.complaint.toLowerCase().includes(keyword))
    );

    const pendingCount = todayBookings.filter((b) => b.status === "PENDING").length;

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 text-white">
<<<<<<< HEAD
                <h1 className="text-2xl font-bold mb-2">Dashboard Guru BK</h1>
                <p className="text-slate-300">
                    {formatDate(new Date())} • {todayBookings.length} booking hari ini
=======
                <h1 className="text-2xl font-bold mb-2">{t.guru.dashboard.title}</h1>
                <p className="text-slate-300">
                    {formatDate(new Date(), language === "en" ? "en-US" : "id-ID")} • {todayBookings.length} {t.guru.dashboard.todayBooking}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                </p>
            </div>

            {/* Urgent Alert */}
            {urgentBookings.length > 0 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start animate-pulse-glow">
                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-red-800">
<<<<<<< HEAD
                            ⚠️ Perhatian! {urgentBookings.length} siswa membutuhkan penanganan segera
                        </h3>
                        <p className="text-red-700 text-sm mt-1">
                            Ditemukan kata-kata sensitif dalam keluhan siswa
=======
                            ⚠️ {t.common.urgent} {urgentBookings.length} {t.common.needsImmediate}
                        </h3>
                        <p className="text-red-700 text-sm mt-1">
                            {t.common.sensitiveKeywords}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </p>
                        <Link
                            href="/guru/antrian"
                            className="text-red-800 font-medium hover:underline text-sm mt-2 inline-block"
                        >
<<<<<<< HEAD
                            Lihat detail →
=======
                            {t.common.viewDetail} →
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </Link>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
<<<<<<< HEAD
                                <p className="text-sm text-gray-500">Hari Ini</p>
=======
                                <p className="text-sm text-gray-500">{t.common.today}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                <p className="text-2xl font-bold text-gray-900">{todayBookings.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <CalendarCheck className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
<<<<<<< HEAD
                                <p className="text-sm text-gray-500">Menunggu</p>
=======
                                <p className="text-sm text-gray-500">{t.common.waiting}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
<<<<<<< HEAD
                                <p className="text-sm text-gray-500">Selesai Bulan Ini</p>
=======
                                <p className="text-sm text-gray-500">{t.common.completedThisMonth}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
<<<<<<< HEAD
                                <p className="text-sm text-gray-500">Total Bulan Ini</p>
=======
                                <p className="text-sm text-gray-500">{t.common.totalThisMonth}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Today's Queue */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-blue-600" />
<<<<<<< HEAD
                                Antrian Hari Ini
                            </span>
                            <Link href="/guru/antrian" className="text-sm text-blue-600 hover:underline font-normal">
                                Lihat semua
=======
                                {t.guru.dashboard.todayQueue}
                            </span>
                            <Link href="/guru/antrian" className="text-sm text-blue-600 hover:underline font-normal">
                                {t.common.seeAll}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {todayBookings.length > 0 ? (
                            <div className="space-y-3">
                                {todayBookings.slice(0, 5).map((booking) => {
                                    const isUrgent = urgentKeywords.some((keyword) =>
                                        booking.complaint.toLowerCase().includes(keyword)
                                    );

                                    return (
                                        <Link
                                            key={booking.id}
                                            href={`/guru/konseling/${booking.id}`}
                                            className={`block p-3 rounded-xl border transition-all hover:shadow-md ${isUrgent
<<<<<<< HEAD
                                                    ? "bg-red-50 border-red-200"
                                                    : "bg-gray-50 border-gray-100 hover:bg-gray-100"
=======
                                                ? "bg-red-50 border-red-200"
                                                : "bg-gray-50 border-gray-100 hover:bg-gray-100"
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">
                                                        {booking.siswa.name}
                                                    </span>
                                                    {isUrgent && (
                                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                                    )}
                                                </div>
                                                <Badge
                                                    variant={booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"}
                                                    size="sm"
                                                >
<<<<<<< HEAD
                                                    {booking.category}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {getSlotTypeLabel(booking.slot.slotType, booking.slot.slotNumber)} • {booking.slot.startTime}
=======
                                                    {t.common[booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"] || booking.category}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {getSlotTypeLabel(booking.slot.slotType, booking.slot.slotNumber, t)} • {booking.slot.startTime}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <CalendarCheck className="w-12 h-12 mx-auto mb-3 text-gray-300" />
<<<<<<< HEAD
                                <p>Tidak ada jadwal konseling hari ini</p>
=======
                                <p>{t.common.noScheduleToday}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Category Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Users className="w-5 h-5 mr-2 text-emerald-600" />
<<<<<<< HEAD
                            Statistik Kategori (Bulan Ini)
=======
                            {t.guru.dashboard.statsTitle}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Akademik */}
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                    <BookOpen className="w-5 h-5 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
<<<<<<< HEAD
                                        <span className="text-sm font-medium text-gray-700">Akademik</span>
=======
                                        <span className="text-sm font-medium text-gray-700">{t.common.akademik}</span>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        <span className="text-sm text-gray-500">{stats.categoryBreakdown.akademik}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500 rounded-full transition-all"
                                            style={{
                                                width: `${stats.total > 0 ? (stats.categoryBreakdown.akademik / stats.total) * 100 : 0}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Karir */}
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                                    <Briefcase className="w-5 h-5 text-amber-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
<<<<<<< HEAD
                                        <span className="text-sm font-medium text-gray-700">Karir</span>
=======
                                        <span className="text-sm font-medium text-gray-700">{t.common.karir}</span>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        <span className="text-sm text-gray-500">{stats.categoryBreakdown.karir}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 rounded-full transition-all"
                                            style={{
                                                width: `${stats.total > 0 ? (stats.categoryBreakdown.karir / stats.total) * 100 : 0}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pribadi */}
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                                    <Heart className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
<<<<<<< HEAD
                                        <span className="text-sm font-medium text-gray-700">Pribadi</span>
=======
                                        <span className="text-sm font-medium text-gray-700">{t.common.pribadi}</span>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        <span className="text-sm text-gray-500">{stats.categoryBreakdown.pribadi}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full transition-all"
                                            style={{
                                                width: `${stats.total > 0 ? (stats.categoryBreakdown.pribadi / stats.total) * 100 : 0}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
