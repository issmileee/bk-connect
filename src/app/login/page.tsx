"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { BookOpen, User, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError("Email atau password salah");
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (error) {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4">
            <div className="w-full max-w-md animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold gradient-text">BK-Connect</h1>
                    <p className="text-gray-600 mt-2">Sistem Booking Konseling Digital</p>
                </div>

                {/* Login Card */}
                <Card className="shadow-xl">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email / NISN
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        placeholder="Masukkan email atau NISN"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        placeholder="Masukkan password"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <Button type="submit" className="w-full py-3" loading={loading}>
                                Masuk
                            </Button>
                        </form>

                        {/* Demo Accounts */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-500 text-center mb-3">
                                Demo Akun (Password: <span className="font-mono font-medium">password123</span>):
                            </p>
                            <div className="flex flex-col gap-3 text-xs">
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <p className="font-semibold text-blue-700 mb-1">Guru BK</p>
                                    <div className="space-y-1">
                                        <p className="text-blue-600"><span className="font-medium">Email:</span> guru.bk@sekolah.id</p>
                                        <p className="text-blue-600"><span className="font-medium">NIP:</span> 198501152010011001</p>
                                    </div>
                                </div>
                                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                    <p className="font-semibold text-emerald-700 mb-1">Siswa (Ani)</p>
                                    <div className="space-y-1">
                                        <p className="text-emerald-600"><span className="font-medium">Email:</span> ani@siswa.sekolah.id</p>
                                        <p className="text-emerald-600"><span className="font-medium">NISN:</span> 0012345678</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2024 BK-Connect. All rights reserved.
                </p>
            </div>
        </div>
    );
}
