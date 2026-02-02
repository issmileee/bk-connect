import { auth } from "@/lib/auth";
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
                </div>
            </div>
        </div>
    );
}
