"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { BookOpen, User, Lock, Loader2 } from "lucide-react";
<<<<<<< HEAD

export default function LoginPage() {
=======
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
    const { language, setLanguage, t } = useLanguage();
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
<<<<<<< HEAD
=======

>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
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
<<<<<<< HEAD
                setError("Email atau password salah");
=======
                setError(t.login.errorAuth);
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (error) {
<<<<<<< HEAD
            setError("Terjadi kesalahan. Silakan coba lagi.");
=======
            setError(t.login.errorGeneral);
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
        } finally {
            setLoading(false);
        }
    };

    return (
<<<<<<< HEAD
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4">
=======
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4 relative">
            <div className="absolute top-4 right-4 z-10">
                <div className="bg-white rounded-lg shadow-md p-1 flex gap-1">
                    <button
                        onClick={() => setLanguage('id')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${language === 'id' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        ID
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        EN
                    </button>
                </div>
            </div>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
            <div className="w-full max-w-md animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <BookOpen className="w-10 h-10 text-white" />
                    </div>
<<<<<<< HEAD
                    <h1 className="text-3xl font-bold gradient-text">BK-Connect</h1>
                    <p className="text-gray-600 mt-2">Sistem Booking Konseling Digital</p>
=======
                    <h1 className="text-3xl font-bold gradient-text">{t.login.title}</h1>
                    <p className="text-gray-600 mt-2">{t.login.subtitle}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
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
<<<<<<< HEAD
                                    Email / NISN
=======
                                    {t.login.emailLabel}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
<<<<<<< HEAD
                                        placeholder="Masukkan email atau NISN"
=======
                                        placeholder={t.login.emailPlaceholder}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
<<<<<<< HEAD
                                    Password
=======
                                    {t.login.passwordLabel}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
<<<<<<< HEAD
                                        placeholder="Masukkan password"
=======
                                        placeholder={t.login.passwordPlaceholder}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <Button type="submit" className="w-full py-3" loading={loading}>
<<<<<<< HEAD
                                Masuk
                            </Button>
                        </form>


=======
                                {loading ? t.login.loading : t.login.loginButton}
                            </Button>
                        </form>

>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
<<<<<<< HEAD
                    © 2026 BK-Connect. All rights reserved.
=======
                    {t.login.footer}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                </p>
            </div>
        </div>
    );
}
