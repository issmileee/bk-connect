"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
    User,
    Mail,
    Phone,
    Lock,
    Camera,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
    Hash
} from "lucide-react";
import { getProfile, updateProfile, changePassword } from "@/actions/profile";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GuruProfilePage() {
    const { t } = useLanguage();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form states
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const data = await getProfile();
        setProfile(data);
        setLoading(false);
    };

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdating(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        if (profile.image) formData.append("image", profile.image);

        const result = await updateProfile(formData);
        if (result.success) {
            setMessage({ type: "success", text: t.guru.profile.successUpdate });
        } else {
            setMessage({ type: "error", text: result.error || t.guru.profile.errorUpdate });
        }
        setUpdating(false);
    };

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: "error", text: t.guru.profile.passwordMismatch });
            return;
        }

        setUpdating(true);
        const formData = new FormData();
        formData.append("currentPassword", passwordData.currentPassword);
        formData.append("newPassword", passwordData.newPassword);

        const result = await changePassword(formData);
        if (result.success) {
            setMessage({ type: "success", text: t.guru.profile.successPassword });
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } else {
            setMessage({ type: "error", text: result.error || t.guru.profile.errorPassword });
        }
        setUpdating(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.guru.profile.title}</h1>
                <p className="text-gray-600">{t.guru.profile.desc}</p>
            </div>

            {message && (
                <div className={cn(
                    "p-4 rounded-xl flex items-center gap-3",
                    message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
                )}>
                    {message.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <p className="text-sm font-medium">{message.text}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 mx-auto">
                                    {profile?.image ? (
                                        <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-600 text-4xl font-bold">
                                            {profile?.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="mt-4">
                                <h2 className="text-lg font-bold text-gray-900">{profile?.name}</h2>
                                <p className="text-sm text-gray-500">{t.guru.profile.role}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500 uppercase flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                {t.guru.profile.identity}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">NIP</span>
                                <span className="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-xs select-all">
                                    {profile?.nip || "-"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Info & Password Forms */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t.guru.profile.generalInfo}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label={t.guru.profile.name}
                                        name="name"
                                        defaultValue={profile?.name}
                                        icon={<User className="w-4 h-4" />}
                                        required
                                    />
                                    <Input
                                        label={t.guru.profile.email}
                                        name="email"
                                        type="email"
                                        defaultValue={profile?.email}
                                        icon={<Mail className="w-4 h-4" />}
                                        required
                                    />
                                    <Input
                                        label={t.guru.profile.phone}
                                        name="phone"
                                        defaultValue={profile?.phone}
                                        icon={<Phone className="w-4 h-4" />}
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            NIP ({t.guru.profile.readonly})
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                <Hash className="w-4 h-4" />
                                            </div>
                                            <div className="w-full px-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed">
                                                {profile?.nip || "-"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-2">
                                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={updating}>
                                        {updating ? t.common.saving : t.common.saveChanges}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t.guru.profile.changePassword}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <Input
                                            label={t.guru.profile.currentPassword}
                                            type="password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            icon={<Lock className="w-4 h-4" />}
                                            required
                                        />
                                    </div>
                                    <Input
                                        label={t.guru.profile.newPassword}
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        icon={<Lock className="w-4 h-4" />}
                                        required
                                    />
                                    <Input
                                        label={t.guru.profile.confirmPassword}
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        icon={<Lock className="w-4 h-4" />}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end pt-2">
                                    <Button type="submit" variant="outline" disabled={updating}>
                                        {updating ? t.common.processing : t.guru.profile.changePassword}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
