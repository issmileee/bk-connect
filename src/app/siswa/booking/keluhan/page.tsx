"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowLeft, Info, Upload, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KeluhanPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get("category") || "AKADEMIK";
    const { t } = useLanguage();

    const [complaint, setComplaint] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (complaint.length < 20) {
            alert(t.siswa.booking.errorMinChar);
            return;
        }
        // Save to local storage for now or pass via URL
        localStorage.setItem("temp_complaint", complaint);
        router.push(`/siswa/booking/guru?category=${category}`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    {t.common.back}
                </button>
            </div>

            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">{t.siswa.booking.tellComplaint}</h1>
                <p className="text-gray-600 mt-2">
                    {t.siswa.booking.categoryQuestion}
                </p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 2
                                ? "bg-blue-600 text-white"
                                : step < 2
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                        >
                            {step}
                        </div>
                        {step < 5 && <div className="w-8 h-1 bg-gray-200 mx-1" />}
                    </div>
                ))}
            </div>

            <Card className="border-2">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t.siswa.booking.complaintLabel}
                            </label>
                            <div className="relative">
                                <textarea
                                    required
                                    value={complaint}
                                    onChange={(e) => setComplaint(e.target.value)}
                                    placeholder={t.siswa.booking.complaintPlaceholder}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[200px] resize-none"
                                />
                                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                    {complaint.length} {t.siswa.booking.complaintMinChar}
                                </div>
                            </div>
                        </div>

                        {/* File Upload (Optional) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t.siswa.booking.attachment}
                            </label>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-blue-400 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                />
                                {file ? (
                                    <div className="flex items-center justify-center text-blue-600">
                                        <Info className="w-4 h-4 mr-2" />
                                        <span className="text-sm font-medium">{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => setFile(null)}
                                            className="ml-2 text-gray-400 hover:text-red-500"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-gray-500">
                                        <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                                        <p className="text-sm">{t.siswa.booking.attachmentClick}</p>
                                        <p className="text-xs mt-1">
                                            {t.siswa.booking.attachmentDesc}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Privacy Notice */}
                        <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                            <div className="p-1.5 bg-emerald-100 rounded-lg">
                                <Info className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-emerald-900">
                                    {t.common.privacyNotice}
                                </h4>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg rounded-xl shadow-lg shadow-blue-200"
                        >
                            {t.common.continue}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
