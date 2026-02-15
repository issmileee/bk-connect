import { auth } from "@/lib/auth";
import { getStudentBookings } from "@/actions/bookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
    History,
    Calendar,
    FileText,
    CheckCircle2,
    Clock
} from "lucide-react";
import Link from "next/link";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";
import { getTranslations } from "@/lib/getTranslations";

export default async function HistoryPage() {
    const { t, language } = await getTranslations();
    const session = await auth();
    const bookings = await getStudentBookings(session!.user.id);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Badge variant="warning">{t.common.waiting}</Badge>;
            case "CONFIRMED":
                return <Badge variant="info">{t.common.confirmed}</Badge>;
            case "IN_PROGRESS":
                return <Badge variant="info">{t.common.inProgress}</Badge>;
            case "COMPLETED":
                return <Badge variant="success">{t.common.completed}</Badge>;
            case "CANCELLED":
                return <Badge variant="default">{t.common.cancelled}</Badge>;
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
                    {t.siswa.history.title}
                </h1>
                <p className="text-gray-600 mt-1">
                    {t.siswa.history.desc}
                </p>
            </div>

            {/* Bookings List */}
            {bookings.length > 0 ? (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <Card key={booking.id} className="overflow-hidden border-2 hover:border-blue-100 transition-colors">
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
                                            </p>
                                        </div>
                                        {getStatusBadge(booking.status)}
                                    </div>

                                    {/* Complaint Preview */}
                                    <div className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100 italic text-gray-600">
                                        <p className="text-sm line-clamp-2">
                                            <FileText className="w-4 h-4 inline mr-2 text-gray-400" />
                                            "{booking.complaint}"
                                        </p>
                                    </div>

                                    {/* Consultation Result */}
                                    {booking.result && (
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
                    </Link>
                </Card>
            )}
        </div>
    );
}
