"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    ClipboardList,
    CalendarCog,
    Users,
    FileBarChart,
    LogOut,
    BookOpen,
    Menu,
    X,
    User
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface GuruNavbarProps {
    user: {
        name?: string | null;
        email?: string | null;
    };
}

export default function GuruNavbar({ user }: GuruNavbarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { t } = useLanguage();

    const navItems = [
        { href: "/guru/dashboard", label: t.guru.nav.dashboard, icon: LayoutDashboard },
        { href: "/guru/antrian", label: t.guru.nav.antrian, icon: ClipboardList },
        { href: "/guru/slots", label: t.guru.nav.jadwal, icon: CalendarCog },
        { href: "/guru/siswa", label: t.guru.nav.siswa, icon: Users },
        { href: "/guru/laporan", label: t.guru.nav.laporan, icon: FileBarChart },
        { href: "/guru/profile", label: t.guru.nav.profil, icon: User },
    ];

    const isActive = (href: string) => pathname.startsWith(href);

    return (
        <nav className="bg-slate-800 text-white sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/guru/dashboard" className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <p className="font-bold">BK-Connect</p>
                            <p className="text-xs text-slate-400">{t.guru.nav.panel}</p>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                    isActive(item.href)
                                        ? "bg-slate-700 text-white"
                                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* User Info & Logout */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-slate-400">{t.login.teacher}</p>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: window.location.origin + "/login" })}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-xl transition-all"
                            title={t.common.logout}
                        >
                            <LogOut className="w-5 h-5" />
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 text-slate-300 hover:bg-slate-700 rounded-xl"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {mobileOpen && (
                    <div className="lg:hidden py-4 border-t border-slate-700">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                    isActive(item.href)
                                        ? "bg-slate-700 text-white"
                                        : "text-slate-300 hover:bg-slate-700/50"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
