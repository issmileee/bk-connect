import { auth } from "@/lib/auth";
import { getStudentBookings } from "@/actions/bookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
<<<<<<< HEAD
=======
import Button from "@/components/ui/Button";
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
import Badge from "@/components/ui/Badge";
import { History, Calendar, FileText } from "lucide-react";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";
import Link from "next/link";
<<<<<<< HEAD

export default async function HistoryPage() {
=======
import { getTranslations } from "@/lib/getTranslations";

export default async function HistoryPage() {
    const { t, language } = await getTranslations();
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
    const session = await auth();
    const bookings = await getStudentBookings(session!.user.id);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PENDING":
<<<<<<< HEAD
                return <Badge variant="warning">Menunggu</Badge>;
            case "CONFIRMED":
                return <Badge variant="info">Dikonfirmasi</Badge>;
            case "IN_PROGRESS":
                return <Badge variant="info">Sedang Berlangsung</Badge>;
            case "COMPLETED":
                return <Badge variant="success">Selesai</Badge>;
            case "CANCELLED":
                return <Badge variant="default">Dibatalkan</Badge>;
=======
                return <Badge variant="warning">{t.common.waiting}</Badge>;
            case "CONFIRMED":
                return <Badge variant="info">{t.common.confirmed}</Badge>;
            case "IN_PROGRESS":
                return <Badge variant="info">{t.common.inProgress}</Badge>;
            case "COMPLETED":
                return <Badge variant="success">{t.common.completed}</Badge>;
            case "CANCELLED":
                return <Badge variant="default">{t.common.cancelled}</Badge>;
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
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
<<<<<<< HEAD
                    Riwayat Konseling
                </h1>
                <p className="text-gray-600 mt-1">
                    Lihat semua catatan konseling yang pernah dilakukan
=======
                    {t.siswa.history.title}
                </h1>
                <p className="text-gray-600 mt-1">
                    {t.siswa.history.desc}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                </p>
            </div>

            {/* Bookings List */}
            {bookings.length > 0 ? (
                <div className="space-y-4">
                    {bookings.map((booking) => (
<<<<<<< HEAD
                        <Card key={booking.id} className="overflow-hidden">
=======
                        <Card key={booking.id} className="overflow-hidden border-2 hover:border-blue-100 transition-colors">
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                            <div className="flex">
                                {/* Left colored bar based on category */}
                                <div
                                    className={`w-1.5 ${booking.category === "AKADEMIK"
<<<<<<< HEAD
                                            ? "bg-red-500"
                                            : booking.category === "KARIR"
                                                ? "bg-amber-500"
                                                : "bg-emerald-500"
=======
                                        ? "bg-red-500"
                                        : booking.category === "KARIR"
                                            ? "bg-amber-500"
                                            : "bg-emerald-500"
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        }`}
                                />
                                <CardContent className="p-5 flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge
                                                    variant={booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"}
                                                >
<<<<<<< HEAD
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
=======
                                                    {t.common[booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"] || booking.category}
                                                </Badge>
                                                <span className="text-sm font-bold text-gray-400">
                                                    {booking.bookingCode}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-700 font-bold">
                                                <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                                                {formatDate(new Date(booking.date), language === "en" ? "en-US" : "id-ID")}
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {booking.slot.startTime} - {booking.slot.endTime} • {getSlotTypeLabel(booking.slot.slotType, booking.slot.slotNumber, t)}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                            </p>
                                        </div>
                                        {getStatusBadge(booking.status)}
                                    </div>

                                    {/* Complaint Preview */}
<<<<<<< HEAD
                                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                        <p className="text-sm text-gray-700 line-clamp-2">
                                            <FileText className="w-4 h-4 inline mr-1 text-gray-400" />
                                            {booking.complaint}
=======
                                    <div className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100 italic text-gray-600">
                                        <p className="text-sm line-clamp-2">
                                            <FileText className="w-4 h-4 inline mr-2 text-gray-400" />
                                            "{booking.complaint}"
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        </p>
                                    </div>

                                    {/* Consultation Result */}
                                    {booking.result && (
<<<<<<< HEAD
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
=======
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">
                                                {t.siswa.history.resultTitle}
                                            </p>
                                            <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                                                <p className="text-sm text-emerald-900 font-bold mb-1">
                                                    {booking.result.summary}
                                                </p>
                                                <p className="text-sm text-emerald-800 leading-relaxed">
                                                    {booking.result.solution}
                                                </p>
                                                {booking.result.followUp && (
                                                    <div className="mt-3 flex items-start gap-2 text-blue-800 bg-white/50 p-2 rounded-lg border border-blue-50">
                                                        <span className="text-xs font-bold uppercase shrink-0 mt-0.5">{t.siswa.history.followUp}:</span>
                                                        <p className="text-sm italic">
                                                            {booking.result.followUp}
                                                        </p>
                                                    </div>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
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
<<<<<<< HEAD
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
=======
                <Card className="p-16 text-center border-dashed border-2">
                    <History className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t.siswa.history.noHistory}
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-[280px] mx-auto">
                        {t.siswa.history.noHistoryDesc}
                    </p>
                    <Link
                        href="/siswa/booking/kategori"
                    >
                        <Button className="rounded-xl px-12 h-12 shadow-lg shadow-blue-100">
                            {t.siswa.history.createFirst}
                        </Button>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                    </Link>
                </Card>
            )}
        </div>
    );
}
