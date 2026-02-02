"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ArrowLeft, ArrowRight, FileText, Paperclip } from "lucide-react";
import Link from "next/link";

export default function KeluhanPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get("category") || "AKADEMIK";

    const [complaint, setComplaint] = useState("");
    const [error, setError] = useState("");

    const handleContinue = () => {
        if (!complaint.trim()) {
            setError("Mohon tuliskan keluhan atau permasalahanmu");
            return;
        }
        if (complaint.trim().length < 20) {
            setError("Mohon jelaskan lebih detail (minimal 20 karakter)");
            return;
        }

        // Store in sessionStorage and move to next step
        sessionStorage.setItem(
            "bookingData",
            JSON.stringify({ category, complaint })
        );
        router.push("/siswa/booking/jadwal");
    };

    const getCategoryInfo = () => {
        switch (category) {
            case "AKADEMIK":
                return { label: "Akademik", color: "akademik" as const };
            case "KARIR":
                return { label: "Karir", color: "karir" as const };
            case "PRIBADI":
                return { label: "Pribadi", color: "pribadi" as const };
            default:
                return { label: category, color: "default" as const };
        }
    };

    const catInfo = getCategoryInfo();

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <Link
                    href="/siswa/booking/kategori"
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Kembali
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900">Ceritakan Keluhanmu</h1>
                    <Badge variant={catInfo.color}>{catInfo.label}</Badge>
                </div>
                <p className="text-gray-600 mt-2">
                    Jelaskan permasalahan yang ingin kamu konsultasikan
                </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= 2
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                        >
                            {step}
                        </div>
                        {step < 4 && (
                            <div
                                className={`w-8 h-1 mx-1 ${step < 2 ? "bg-blue-600" : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Form */}
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <FileText className="w-4 h-4 mr-2" />
                                Jelaskan Permasalahanmu
                            </label>
                            <textarea
                                value={complaint}
                                onChange={(e) => {
                                    setComplaint(e.target.value);
                                    setError("");
                                }}
                                placeholder="Tuliskan apa yang sedang kamu rasakan atau alami. Ceritakan selengkap mungkin agar Guru BK dapat membantumu dengan lebih baik..."
                                rows={6}
                                className={`w-full px-4 py-3 border rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${error ? "border-red-300" : "border-gray-200"
                                    }`}
                            />
                            <div className="flex justify-between items-center mt-2">
                                {error ? (
                                    <p className="text-sm text-red-500">{error}</p>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        Minimal 20 karakter
                                    </p>
                                )}
                                <p
                                    className={`text-sm ${complaint.length >= 20 ? "text-emerald-500" : "text-gray-400"
                                        }`}
                                >
                                    {complaint.length} karakter
                                </p>
                            </div>
                        </div>

                        {/* Upload (optional) */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <Paperclip className="w-4 h-4 mr-2" />
                                Lampiran (Opsional)
                            </label>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors cursor-pointer">
                                <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">
                                    Klik untuk upload file pendukung
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Gambar, PDF, atau dokumen (maks. 5MB)
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Privacy Notice */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-sm text-emerald-700">
                    🔒 <strong>Privasi Terjaga:</strong> Informasi yang kamu sampaikan bersifat
                    rahasia dan hanya dapat diakses oleh Guru BK.
                </p>
            </div>

            {/* Continue Button */}
            <Button onClick={handleContinue} className="w-full py-3">
                Lanjutkan
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );
}
