import { getStudentsWithConsultationCount } from "@/actions/consultations";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Users, Search, User, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function SiswaListPage() {
    const students = await getStudentsWithConsultationCount();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Users className="w-6 h-6 mr-2 text-blue-600" />
                        Data Siswa
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Lihat riwayat dan perkembangan konseling siswa
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari nama siswa..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
            </div>

            {/* Students List */}
            {students.length > 0 ? (
                <div className="grid gap-4">
                    {students.map((student) => (
                        <Link key={student.id} href={`/guru/siswa/${student.id}`}>
                            <Card hover>
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                                                <User className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {student.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {student.kelas && `Kelas ${student.kelas} • `}
                                                    {student.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {student.totalConsultations}
                                                </p>
                                                <p className="text-xs text-gray-500">Konsultasi</p>
                                            </div>

                                            {student.lastConsultation && (
                                                <div className="text-right hidden md:block">
                                                    <Badge
                                                        variant={student.lastConsultation.category.toLowerCase() as "akademik" | "karir" | "pribadi"}
                                                        size="sm"
                                                    >
                                                        {student.lastConsultation.category}
                                                    </Badge>
                                                    <p className="text-xs text-gray-500 mt-1 flex items-center justify-end">
                                                        <Calendar className="w-3 h-3 mr-1" />
                                                        {formatDate(new Date(student.lastConsultation.date))}
                                                    </p>
                                                </div>
                                            )}

                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <Card className="p-12 text-center">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Belum Ada Data Siswa
                    </h3>
                    <p className="text-gray-500">
                        Data siswa akan muncul setelah mereka melakukan booking
                    </p>
                </Card>
            )}
        </div>
    );
}
