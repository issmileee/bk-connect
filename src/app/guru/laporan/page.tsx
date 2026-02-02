"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getConsultationStats } from "@/actions/consultations";
import {
    FileBarChart,
    Calendar,
    Download,
    BookOpen,
    Briefcase,
    Heart,
    TrendingUp,
    Users,
    CheckCircle2
} from "lucide-react";

export default function LaporanPage() {
    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(1); // First day of month
        return date.toISOString().split("T")[0];
    });
    const [endDate, setEndDate] = useState(() => {
        return new Date().toISOString().split("T")[0];
    });
    const [stats, setStats] = useState<{
        total: number;
        completed: number;
        pending: number;
        categoryBreakdown: { akademik: number; karir: number; pribadi: number };
        resultBreakdown: { completed: number; followUp: number; referred: number };
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerateReport = async () => {
        setLoading(true);
        try {
            const data = await getConsultationStats(
                new Date(startDate),
                new Date(endDate)
            );
            setStats(data);
        } catch (error) {
            console.error("Error generating report:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatPeriod = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return `${start.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} - ${end.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FileBarChart className="w-6 h-6 mr-2 text-blue-600" />
                    Laporan Konseling
                </h1>
                <p className="text-gray-600 mt-1">
                    Generate laporan statistik konseling berdasarkan periode
                </p>
            </div>

            {/* Period Selector */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Pilih Periode
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Mulai
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Akhir
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <Button onClick={handleGenerateReport} loading={loading}>
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Generate Laporan
                        </Button>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        <button
                            onClick={() => {
                                const today = new Date();
                                const start = new Date(today.getFullYear(), today.getMonth(), 1);
                                setStartDate(start.toISOString().split("T")[0]);
                                setEndDate(today.toISOString().split("T")[0]);
                            }}
                            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Bulan Ini
                        </button>
                        <button
                            onClick={() => {
                                const today = new Date();
                                const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                                const end = new Date(today.getFullYear(), today.getMonth(), 0);
                                setStartDate(start.toISOString().split("T")[0]);
                                setEndDate(end.toISOString().split("T")[0]);
                            }}
                            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Bulan Lalu
                        </button>
                        <button
                            onClick={() => {
                                const today = new Date();
                                // Assume semester 1: July-Dec, semester 2: Jan-June
                                const month = today.getMonth();
                                let start: Date, end: Date;
                                if (month >= 6) {
                                    // Semester 1
                                    start = new Date(today.getFullYear(), 6, 1);
                                    end = new Date(today.getFullYear(), 11, 31);
                                } else {
                                    // Semester 2
                                    start = new Date(today.getFullYear(), 0, 1);
                                    end = new Date(today.getFullYear(), 5, 30);
                                }
                                setStartDate(start.toISOString().split("T")[0]);
                                setEndDate(end.toISOString().split("T")[0]);
                            }}
                            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Semester Ini
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* Report Results */}
            {stats && (
                <>
                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600">Total Konseling</p>
                                        <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
                                    </div>
                                    <Users className="w-10 h-10 text-blue-400" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-50 border-emerald-200">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-emerald-600">Selesai</p>
                                        <p className="text-3xl font-bold text-emerald-700">{stats.completed}</p>
                                    </div>
                                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-yellow-50 border-yellow-200">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-yellow-600">Menunggu</p>
                                        <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
                                    </div>
                                    <Calendar className="w-10 h-10 text-yellow-400" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-purple-50 border-purple-200">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-purple-600">Tingkat Penyelesaian</p>
                                        <p className="text-3xl font-bold text-purple-700">
                                            {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                                        </p>
                                    </div>
                                    <TrendingUp className="w-10 h-10 text-purple-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Category Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Breakdown per Kategori</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Akademik */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                                        <BookOpen className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium text-gray-700">Akademik</span>
                                            <span className="text-gray-900 font-bold">{stats.categoryBreakdown.akademik}</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-red-500 rounded-full transition-all"
                                                style={{
                                                    width: `${stats.total > 0 ? (stats.categoryBreakdown.akademik / stats.total) * 100 : 0}%`,
                                                }}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {stats.total > 0 ? Math.round((stats.categoryBreakdown.akademik / stats.total) * 100) : 0}% dari total
                                        </p>
                                    </div>
                                </div>

                                {/* Karir */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                                        <Briefcase className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium text-gray-700">Karir</span>
                                            <span className="text-gray-900 font-bold">{stats.categoryBreakdown.karir}</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-amber-500 rounded-full transition-all"
                                                style={{
                                                    width: `${stats.total > 0 ? (stats.categoryBreakdown.karir / stats.total) * 100 : 0}%`,
                                                }}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {stats.total > 0 ? Math.round((stats.categoryBreakdown.karir / stats.total) * 100) : 0}% dari total
                                        </p>
                                    </div>
                                </div>

                                {/* Pribadi */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                                        <Heart className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium text-gray-700">Pribadi</span>
                                            <span className="text-gray-900 font-bold">{stats.categoryBreakdown.pribadi}</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full transition-all"
                                                style={{
                                                    width: `${stats.total > 0 ? (stats.categoryBreakdown.pribadi / stats.total) * 100 : 0}%`,
                                                }}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {stats.total > 0 ? Math.round((stats.categoryBreakdown.pribadi / stats.total) * 100) : 0}% dari total
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Export Button */}
                    <Card className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">Ekspor Laporan</h3>
                                <p className="text-sm text-gray-500">
                                    Periode: {formatPeriod()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                                <Button variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Excel
                                </Button>
                            </div>
                        </div>
                    </Card>
                </>
            )}

            {/* Empty State */}
            {!stats && !loading && (
                <Card className="p-12 text-center">
                    <FileBarChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Generate Laporan
                    </h3>
                    <p className="text-gray-500">
                        Pilih periode tanggal dan klik "Generate Laporan" untuk melihat statistik
                    </p>
                </Card>
            )}
        </div>
    );
}
