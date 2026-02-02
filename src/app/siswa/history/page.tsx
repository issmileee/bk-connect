import { auth } from "@/lib/auth";
import { getStudentBookings } from "@/actions/bookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { History, Calendar, FileText } from "lucide-react";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";
import Link from "next/link";

export default async function HistoryPage() {
    const session = await auth();
    const bookings = await getStudentBookings(session!.user.id);

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
            case "CANCELLED":
                return <Badge variant="default">Dibatalkan</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <History className="w-6 h-6 mr-2 text-blue-600" />
                    Riwayat Konseling
                </h1>
                <p className="text-gray-600 mt-1">
                    Lihat semua catatan konseling yang pernah dilakukan
                </p>
            </div>

            {/* Bookings List */}
            {bookings.length > 0 ? (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <Card key={booking.id} className="overflow-hidden">
                            <div className="flex">
                                {/* Left colored bar based on category */}
                                <div
                                    className={`w-1.5 ${booking.category === "AKADEMIK"
                                            ? "bg-red-500"
                                            : booking.category === "KARIR"
                                                ? "bg-amber-500"
                                                : "bg-emerald-500"
                                        }`}
                                />
                                <CardContent className="p-5 flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge
                                                    variant={booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"}
                                                >
                                                    {booking.category}
                                                </Badge>
                                                <span className="text-sm text-gray-500">
                                                    {booking.bookingCode}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {formatDate(new Date(booking.date))}
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {getSlotTypeLabel(booking.slot.slotType, booking.slot.slotNumber)} • {booking.slot.startTime} - {booking.slot.endTime}
                                            </p>
                                        </div>
                                        {getStatusBadge(booking.status)}
                                    </div>

                                    {/* Complaint Preview */}
                                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                        <p className="text-sm text-gray-700 line-clamp-2">
                                            <FileText className="w-4 h-4 inline mr-1 text-gray-400" />
                                            {booking.complaint}
                                        </p>
                                    </div>

                                    {/* Consultation Result */}
                                    {booking.result && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                                                Hasil Konseling
                                            </p>
                                            <div className="bg-emerald-50 rounded-lg p-3">
                                                <p className="text-sm text-emerald-800 font-medium mb-1">
                                                    {booking.result.summary}
                                                </p>
                                                <p className="text-sm text-emerald-700">
                                                    {booking.result.solution}
                                                </p>
                                                {booking.result.followUp && (
                                                    <p className="text-sm text-emerald-600 mt-2 italic">
                                                        📌 Tindak lanjut: {booking.result.followUp}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-12 text-center">
                    <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Belum Ada Riwayat
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Kamu belum pernah melakukan konseling
                    </p>
                    <Link
                        href="/siswa/booking/kategori"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Buat booking pertamamu →
                    </Link>
                </Card>
            )}
        </div>
    );
}
