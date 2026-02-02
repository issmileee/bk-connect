"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { BookOpen, Briefcase, Heart, ArrowRight } from "lucide-react";

export default function KategoriPage() {
    const categories = [
        {
            id: "AKADEMIK",
            title: "Akademik",
            description: "Nilai turun, kesulitan belajar, masalah dengan pelajaran tertentu",
            icon: BookOpen,
            color: "red",
            bgColor: "bg-red-50 hover:bg-red-100",
            borderColor: "border-red-200",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
        },
        {
            id: "KARIR",
            title: "Karir",
            description: "Bingung pilihan kuliah/jurusan, minat bakat, peluang kerja",
            icon: Briefcase,
            color: "amber",
            bgColor: "bg-amber-50 hover:bg-amber-100",
            borderColor: "border-amber-200",
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
        },
        {
            id: "PRIBADI",
            title: "Pribadi",
            description: "Masalah keluarga, pertemanan, hubungan, atau kesehatan mental",
            icon: Heart,
            color: "emerald",
            bgColor: "bg-emerald-50 hover:bg-emerald-100",
            borderColor: "border-emerald-200",
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
        },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Pilih Kategori Konseling</h1>
                <p className="text-gray-600 mt-2">
                    Apa yang ingin kamu konsultasikan dengan Guru BK?
                </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                        >
                            {step}
                        </div>
                        {step < 4 && <div className="w-8 h-1 bg-gray-200 mx-1" />}
                    </div>
                ))}
            </div>

            {/* Category Cards */}
            <div className="space-y-4">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/siswa/booking/keluhan?category=${cat.id}`}
                    >
                        <Card
                            className={`${cat.bgColor} ${cat.borderColor} border-2 transition-all cursor-pointer mb-4`}
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center">
                                    <div
                                        className={`w-14 h-14 ${cat.iconBg} rounded-xl flex items-center justify-center mr-4`}
                                    >
                                        <cat.icon className={`w-7 h-7 ${cat.iconColor}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 text-lg">
                                            {cat.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {cat.description}
                                        </p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Info */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                <p className="text-sm text-blue-700">
                    💡 Pemilihan kategori membantu Guru BK mempersiapkan sesi konseling
                    yang lebih tepat untukmu.
                </p>
            </div>
        </div>
    );
}
