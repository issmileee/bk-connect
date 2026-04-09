"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, UserCheck, Check } from "lucide-react";
import { getGuruBKList } from "@/actions/bookings";
import { useLanguage } from "@/contexts/LanguageContext";

interface GuruBK {
    id: string;
    name: string;
    email: string;
    image: string | null;
}

export default function PilihGuruPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const { t } = useLanguage();

    const [guruList, setGuruList] = useState<GuruBK[]>([]);
    const [selectedGuru, setSelectedGuru] = useState<GuruBK | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGuruBKList().then((list) => {
            setGuruList(list);
            setLoading(false);
        });
    }, []);

    const handleContinue = () => {
        if (!selectedGuru) return;
        sessionStorage.setItem("temp_guru", JSON.stringify({ id: selectedGuru.id, name: selectedGuru.name }));
        router.push(`/siswa/booking/jadwal?category=${category}`);
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
                <h1 className="text-2xl font-bold text-gray-900">Pilih Guru BK</h1>
                <p className="text-gray-600 mt-2">Pilih konselor yang ingin kamu temui</p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                step === 3
                                    ? "bg-blue-600 text-white"
                                    : step < 3
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            {step < 3 ? <Check className="w-4 h-4" /> : step}
                        </div>
                        {step < 5 && <div className="w-8 h-1 bg-gray-200 mx-1" />}
                    </div>
                ))}
            </div>

            {/* Guru List */}
            {loading ? (
                <div className="py-10 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">{t.common.loading}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {guruList.map((guru) => {
                        const isSelected = selectedGuru?.id === guru.id;
                        return (
                            <button
                                key={guru.id}
                                onClick={() => setSelectedGuru(guru)}
                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                                    isSelected
                                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                                        : "border-gray-100 bg-white hover:border-gray-200"
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-blue-100" : "bg-gray-100"}`}>
                                    <UserCheck className={`w-6 h-6 ${isSelected ? "text-blue-600" : "text-gray-500"}`} />
                                </div>
                                <div className="flex-1">
                                    <p className={`font-semibold ${isSelected ? "text-blue-700" : "text-gray-900"}`}>
                                        {guru.name}
                                    </p>
                                    <p className={`text-sm ${isSelected ? "text-blue-500" : "text-gray-500"}`}>
                                        Guru Bimbingan Konseling
                                    </p>
                                </div>
                                {isSelected && (
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-10">
                <div className="max-w-2xl mx-auto">
                    <Button
                        disabled={!selectedGuru}
                        onClick={handleContinue}
                        className="w-full h-12 rounded-xl shadow-lg shadow-blue-200"
                    >
                        {t.common.continue}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
