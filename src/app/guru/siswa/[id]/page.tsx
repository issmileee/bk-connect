import { getStudentConsultationHistory } from "@/actions/consultations";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
    ArrowLeft,
    User,
    Calendar,
    FileText,
    TrendingUp,
    CheckCircle2,
    Clock
} from "lucide-react";
import Link from "next/link";
import { formatDate, getSlotTypeLabel } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getTranslations } from "@/lib/getTranslations";

export default async function SiswaDetailPage({ params }: { params: { id: string } }) {
    const { t, language } = await getTranslations();
    const siswa = await prisma.user.findUnique({
        where: { id: params.id, role: "SISWA" },
    });

    if (!siswa) {
        notFound();
    }

    const history = await getStudentConsultationHistory(params.id);

    // Calculate stats
    const totalConsultations = history.length;
    const completedConsultations = history.filter((h) => h.status === "COMPLETED").length;
    const categoryStats = {
        akademik: history.filter((h) => h.category === "AKADEMIK").length,
        karir: history.filter((h) => h.category === "KARIR").length,
        pribadi: history.filter((h) => h.category === "PRIBADI").length,
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Back Button */}
            <Link
                href="/guru/siswa"
                className="flex items-center text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t.common.back}
            </Link>

            {/* Student Header */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardContent className="p-6">
                    <div className="flex items-center">
                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{siswa.name}</h1>
                            <p className="text-blue-100">
                                {siswa.kelas && `${t.siswa.profile.kelas} ${siswa.kelas} • `}
                                {siswa.email}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-gray-900">{totalConsultations}</p>
                        <p className="text-sm text-gray-500">{t.guru.siswa.consultations}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-emerald-600">{completedConsultations}</p>
                        <p className="text-sm text-gray-500">{t.common.completed}</p>
                    </CardContent>
                </Card>
                <Card className="bg-red-50">
                    <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-red-600">{categoryStats.akademik}</p>
                        <p className="text-sm text-red-500">{t.common.akademik}</p>
                    </CardContent>
                </Card>
                <Card className="bg-emerald-50">
                    <CardContent className="p-4 text-center">
                        <p className="text-3xl font-bold text-emerald-600">{categoryStats.pribadi}</p>
                        <p className="text-sm text-emerald-500">{t.common.pribadi}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Timeline */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                        {t.guru.dashboard.statsTitle}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {history.length > 0 ? (
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                            <div className="space-y-6">
                                {history.map((booking, index) => (
                                    <div key={booking.id} className="relative pl-14">
                                        {/* Dot */}
                                        <div
                                            className={`absolute left-4 w-5 h-5 rounded-full border-4 ${booking.status === "COMPLETED"
                                                ? "bg-emerald-500 border-emerald-100"
                                                : booking.status === "CANCELLED"
                                                    ? "bg-gray-400 border-gray-100"
                                                    : "bg-yellow-500 border-yellow-100"
                                                }`}
                                        />

                                        <div
                                            className={`p-4 rounded-xl border ${booking.status === "COMPLETED"
                                                ? "bg-emerald-50 border-emerald-200"
                                                : booking.status === "CANCELLED"
                                                    ? "bg-gray-50 border-gray-200"
                                                    : "bg-yellow-50 border-yellow-200"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant={booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"}
                                                        size="sm"
                                                    >
                                                        {t.common[booking.category.toLowerCase() as "akademik" | "karir" | "pribadi"] || booking.category}
                                                    </Badge>
                                                    <span className="text-xs text-gray-500">
                                                        {booking.bookingCode}
                                                    </span>
                                                </div>
                                                <Badge
                                                    variant={booking.status === "COMPLETED" ? "success" : "warning"}
                                                    size="sm"
                                                >
                                                    {booking.status === "COMPLETED" ? t.common.completed : t.common[booking.status.toLowerCase() as "waiting" | "confirmed" | "inProgress" | "cancelled"] || booking.status}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {formatDate(new Date(booking.date), language === "en" ? "en-US" : "id-ID")}
                                                <span className="mx-2">•</span>
                                                <Clock className="w-4 h-4 mr-1" />
                                                {getSlotTypeLabel(booking.slot.slotType, booking.slot.slotNumber, t)}
                                            </div>

                                            <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                                                <FileText className="w-4 h-4 inline mr-1 text-gray-400" />
                                                {booking.complaint}
                                            </p>

                                            {booking.result && (
                                                <div className="mt-3 pt-3 border-t border-current/10">
                                                    <p className="text-xs font-medium text-emerald-700 mb-1 flex items-center">
                                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                                        {t.guru.konseling.resultTitle}
                                                    </p>
                                                    <p className="text-sm text-emerald-800">
                                                        {booking.result.solution}
                                                    </p>
                                                    {booking.result.followUp && (
                                                        <p className="text-xs text-emerald-600 mt-1 italic">
                                                            {t.guru.konseling.followUp}: {booking.result.followUp}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>{t.siswa.history.noHistory}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
