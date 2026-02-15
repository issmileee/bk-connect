import { auth } from "@/lib/auth";
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
                </div>
            </div>
        </div>
    );
}
