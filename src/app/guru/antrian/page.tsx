import { getTodayBookings, updateBookingStatus } from "@/actions/bookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
    ClipboardList,
    Clock,
    User,
    FileText,
    AlertTriangle,
    ChevronRight,
    BookOpen,
    Briefcase,
    Heart
} from "lucide-react";
import Link from "next/link";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";

export default async function AntrianPage() {
    const bookings = await getTodayBookings();

    // Check for urgent keywords
    const urgentKeywords = ["depresi", "bunuh diri", "menyakiti", "putus asa", "tidak mau hidup"];

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

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Badge variant="warning">Menunggu</Badge>;
            case "CONFIRMED":
                return <Badge variant="info">Dikonfirmasi</Badge>;
            case "IN_PROGRESS":
                return <Badge variant="info">Sedang Berlangsung</Badge>;
            case "COMPLETED":
                return <Badge variant="success">Selesai</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    // Group by status
    const pending = bookings.filter((b) => b.status === "PENDING" || b.status === "CONFIRMED");
    const inProgress = bookings.filter((b) => b.status === "IN_PROGRESS");
    const completed = bookings.filter((b) => b.status === "COMPLETED");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <ClipboardList className="w-6 h-6 mr-2 text-blue-600" />
                    Antrian Hari Ini
                </h1>
                <p className="text-gray-600 mt-1">
                    {formatDate(new Date())} • {bookings.length} total booking
                </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-yellow-700">{pending.length}</p>
                        <p className="text-sm text-yellow-600">Menunggu</p>
                    </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-blue-700">{inProgress.length}</p>
                        <p className="text-sm text-blue-600">Berlangsung</p>
                    </CardContent>
                </Card>
                <Card className="bg-emerald-50 border-emerald-200">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-700">{completed.length}</p>
                        <p className="text-sm text-emerald-600">Selesai</p>
                    </CardContent>
                </Card>
            </div>

            {/* Booking List */}
            {bookings.length > 0 ? (
                <div className="space-y-4">
                    {bookings.map((booking) => {
                        const isUrgent = urgentKeywords.some((keyword) =>
                            booking.complaint.toLowerCase().includes(keyword)
                        );

                        return (
                            <Card
                                key={booking.id}
                                className={`overflow-hidden ${isUrgent ? "ring-2 ring-red-500" : ""
                                    }`}
                            >
                                <div className="flex">
                                    {/* Category Color Bar */}
                                    <div
                                        className={`w-2 ${booking.category === "AKADEMIK"
                                                ? "bg-red-500"
                                                : booking.category === "KARIR"
                                                    ? "bg-amber-500"
                                                    : "bg-emerald-500"
                                            }`}
                                    />

                                    <CardContent className="p-5 flex-1">
                                        {/* Urgent Warning */}
                                        {isUrgent && (
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center">
                                                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                                                <span className="text-red-700 text-sm font-medium">
                                                    ⚠️ Ditemukan kata-kata sensitif - Perlu penanganan segera
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                {/* Header */}
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div
                                                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${booking.category === "AKADEMIK"
                                                                ? "bg-red-100"
                                                                : booking.category === "KARIR"
                                                                    ? "bg-amber-100"
                                                                    : "bg-emerald-100"
                                                            }`}
                                                    >
                                                        {getCategoryIcon(booking.category)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                            {booking.siswa.name}
                                                            <Badge
                                                                variant={booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"}
                                                                size="sm"
                                                            >
                                                                {booking.category}
                                                            </Badge>
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {booking.siswa.kelas && `Kelas ${booking.siswa.kelas} • `}
                                                            {booking.bookingCode}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Time */}
                                                <div className="flex items-center text-gray-600 mb-3">
                                                    <Clock className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">
                                                        {getSlotTypeLabel(booking.slot.slotType, booking.slot.slotNumber)} • {booking.slot.startTime} - {booking.slot.endTime}
                                                    </span>
                                                </div>

                                                {/* Complaint Preview */}
                                                <div className="bg-gray-50 rounded-lg p-3">
                                                    <div className="flex items-start">
                                                        <FileText className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                                        <p className="text-sm text-gray-700 line-clamp-2">
                                                            {booking.complaint}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Side */}
                                            <div className="ml-4 flex flex-col items-end gap-2">
                                                {getStatusBadge(booking.status)}
                                                <Link href={`/guru/konseling/${booking.id}`}>
                                                    <Button size="sm">
                                                        {booking.status === "COMPLETED" ? "Lihat Detail" : "Proses"}
                                                        <ChevronRight className="w-4 h-4 ml-1" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <Card className="p-12 text-center">
                    <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Tidak Ada Antrian
                    </h3>
                    <p className="text-gray-500">
                        Belum ada siswa yang booking konseling untuk hari ini
                    </p>
                </Card>
            )}
        </div>
    );
}
