"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    GraduationCap,
    LayoutDashboard,
    CalendarPlus,
    History,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SiswaLayoutProps {
    children: React.ReactNode;
    user: {
        name: string;
        kelas?: string;
    };
}

export default function SiswaLayout({ children, user }: SiswaLayoutProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { t } = useLanguage();

    const navigation = [
        { name: t.siswa.nav.dashboard, href: "/siswa/dashboard", icon: LayoutDashboard },
        { name: t.siswa.nav.booking, href: "/siswa/booking/kategori", icon: CalendarPlus },
        { name: t.siswa.nav.riwayat, href: "/siswa/history", icon: History },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
                        <Link href="/siswa/dashboard" className="flex items-center space-x-2">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold gradient-text">BK-Connect</span>
                        </Link>
                        <button
                            className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="p-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl">
                            <p className="font-medium text-gray-900">{user.name}</p>
                            {user.kelas && (
                                <p className="text-sm text-gray-500">{t.siswa.nav.kelas} {user.kelas}</p>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    )}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="flex items-center w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            {t.common.logout}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Mobile Header */}
                <header className="sticky top-0 z-30 flex items-center h-16 px-4 bg-white/80 backdrop-blur-md border-b border-gray-200 lg:hidden">
                    <button
                        className="p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="ml-4 font-semibold gradient-text">BK-Connect</span>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
