import { auth } from "@/lib/auth";
<<<<<<< HEAD
import { getStudentBookings } from "@/actions/bookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
    CalendarPlus,
    Clock,
    Calendar,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";

export default async function SiswaDashboard() {
    const session = await auth();
    const bookings = await getStudentBookings(session!.user.id);

    // Get active (upcoming) bookings
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeBookings = bookings.filter((b) => {
        const bookingDate = new Date(b.date);
        bookingDate.setHours(0, 0, 0, 0);
        return bookingDate >= today && b.status !== "CANCELLED" && b.status !== "COMPLETED";
    });

    const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <h1 className="text-2xl font-bold mb-1">
                    Halo, {session?.user?.name?.split(" ")[0]}! 👋
                </h1>
                <p className="text-blue-100">
                    {session?.user?.kelas ? `Kelas ${session.user.kelas}` : "Selamat datang di BK-Connect"}
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4 flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                            <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{activeBookings.length}</p>
                            <p className="text-sm text-gray-500">Jadwal Aktif</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                            <p className="text-sm text-gray-500">Selesai</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Active Bookings */}
            {activeBookings.length > 0 ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                            Jadwal Mendatang
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {activeBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="p-4 bg-blue-50 rounded-xl border border-blue-100"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant={booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"}>
                                        {booking.category}
                                    </Badge>
                                    <span className="text-sm font-medium text-blue-600">
                                        {booking.bookingCode}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span className="font-medium">
                                        {formatDate(new Date(booking.date))}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600 mt-1">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>
                                        {getSlotTypeLabel(booking.slot.slotType, booking.slot.slotNumber)} •{" "}
                                        {booking.slot.startTime} - {booking.slot.endTime}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ) : (
                <Card className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Belum Ada Jadwal
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Kamu belum memiliki jadwal konseling yang akan datang
                    </p>
                    <Link href="/siswa/booking/kategori">
                        <Button>
                            <CalendarPlus className="w-4 h-4 mr-2" />
                            Buat Booking Baru
                        </Button>
                    </Link>
                </Card>
            )}

            {/* Quick Action */}
            {activeBookings.length > 0 && (
                <Link href="/siswa/booking/kategori">
                    <Card hover className="p-5 cursor-pointer">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                <CalendarPlus className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">Buat Booking Baru</h3>
                                <p className="text-sm text-gray-500">
                                    Jadwalkan sesi konseling dengan Guru BK
                                </p>
                            </div>
                        </div>
                    </Card>
                </Link>
            )}

            {/* Tips */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-amber-800">Tips</p>
                        <p className="text-sm text-amber-700 mt-1">
                            Datang 5 menit sebelum jadwal dan bawa kode booking-mu. Jika perlu
                            membatalkan, lakukan H-1 atau hubungi Guru BK.
                        </p>
                    </div>
=======
import { getCurrentBooking } from "@/actions/bookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
    Calendar as CalendarIcon,
    Clock,
    PlusCircle,
    History,
    FileText,
    AlertCircle,
    BookOpen,
    Briefcase,
    Heart,
    ChevronRight,
    Star,
    Info
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getTranslations } from "@/lib/getTranslations";

export default async function SiswaDashboard() {
    const { t, language } = await getTranslations();
    const session = await auth();
    const currentBooking = await getCurrentBooking();

    const menuItems = [
        {
            title: t.siswa.nav.booking,
            desc: t.siswa.booking.newBookingDesc,
            icon: PlusCircle,
            href: "/siswa/booking/kategori",
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: t.siswa.nav.riwayat,
            desc: t.siswa.history.desc,
            icon: History,
            href: "/siswa/history",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
    ];

    return (
        <div className="space-y-6">
            {/* User Hello */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                        {t.common.hello}, <span className="text-blue-600">{session?.user?.name}</span> 👋
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {t.common.welcome}
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Active Booking */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="overflow-hidden border-2">
                        <CardHeader className="bg-gray-50 border-b">
                            <CardTitle className="flex items-center text-gray-900">
                                <PlusCircle className="w-5 h-5 mr-2 text-blue-600" />
                                {t.common.activeSchedule}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {currentBooking ? (
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                                                <CalendarIcon className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">{t.common.date}</p>
                                                <p className="font-bold text-gray-900">
                                                    {formatDate(currentBooking.date, language === "en" ? "en-US" : "id-ID")}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant="info">
                                            {t.common.confirmed}
                                        </Badge>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                            <div className="flex items-center text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                                                <Clock className="w-3.5 h-3.5 mr-1.5" />
                                                {t.common.time}
                                            </div>
                                            <p className="font-bold text-gray-900">
                                                {currentBooking.slot.startTime} - {currentBooking.slot.endTime}
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                            <div className="flex items-center text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                                                <FileText className="w-3.5 h-3.5 mr-1.5" />
                                                {t.common.category}
                                            </div>
                                            <p className="font-bold text-gray-900">
                                                {t.common[currentBooking.category.toLowerCase() as "akademik" | "karir" | "pribadi"] || currentBooking.category}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start">
                                        <div className="p-1.5 bg-blue-100 rounded-lg mr-3">
                                            <Info className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-blue-900 mb-0.5">{t.common.ingat}</p>
                                            <p className="text-xs text-blue-800 leading-relaxed">
                                                {t.siswa.dashboard.tipsContent}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CalendarIcon className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                        {t.common.noUpcomingSchedule}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-6 max-w-[240px] mx-auto">
                                        {t.common.noUpcomingScheduleDesc}
                                    </p>
                                    <Link href="/siswa/booking/kategori">
                                        <Button className="rounded-xl px-8 h-12 shadow-lg shadow-blue-100">
                                            {t.common.newBooking}
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Access Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {menuItems.map((item) => (
                            <Link key={item.title} href={item.href}>
                                <Card className="hover:border-blue-200 transition-all group cursor-pointer h-full">
                                    <CardContent className="p-6 flex items-center">
                                        <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                                            <item.icon className={`w-6 h-6 ${item.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{item.title}</h3>
                                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                                {item.desc}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none shadow-xl shadow-blue-200">
                        <CardContent className="p-6">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <Star className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{t.common.tips}</h3>
                            <p className="text-blue-100 text-sm leading-relaxed mb-4">
                                {t.siswa.booking.categoryInfo}
                            </p>
                            <Link href="/siswa/booking/kategori">
                                <Button variant="secondary" className="w-full h-10 text-blue-700 bg-white hover:bg-blue-50 border-none shadow-sm rounded-lg font-bold text-xs uppercase tracking-wider">
                                    {t.siswa.nav.booking}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-bold flex items-center uppercase tracking-widest text-gray-400">
                                <Info className="w-4 h-4 mr-2" />
                                {t.common.important}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0">
                            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                                <p className="text-xs text-amber-800 leading-relaxed">
                                    {t.common.privacyNotice}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                </div>
            </div>
        </div>
    );
}
