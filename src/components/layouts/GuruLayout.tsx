"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    GraduationCap,
    LayoutDashboard,
    CalendarCog,
    Users,
    ClipboardList,
    FileBarChart,
    LogOut,
    Menu,
    X,
    Bell,
} from "lucide-react";
import { useState } from "react";
<<<<<<< HEAD
=======
import { useLanguage } from "@/contexts/LanguageContext";
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))

interface GuruLayoutProps {
    children: React.ReactNode;
    user: {
        name: string;
    };
    notificationCount?: number;
}

<<<<<<< HEAD
const navigation = [
    { name: "Dashboard", href: "/guru/dashboard", icon: LayoutDashboard },
    { name: "Kelola Slot", href: "/guru/slots", icon: CalendarCog },
    { name: "Antrian Hari Ini", href: "/guru/antrian", icon: ClipboardList },
    { name: "Data Siswa", href: "/guru/siswa", icon: Users },
    { name: "Laporan", href: "/guru/laporan", icon: FileBarChart },
];

export default function GuruLayout({ children, user, notificationCount = 0 }: GuruLayoutProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
=======
export default function GuruLayout({ children, user, notificationCount = 0 }: GuruLayoutProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { t } = useLanguage();

    const navigation = [
        { name: t.guru.nav.dashboard, href: "/guru/dashboard", icon: LayoutDashboard },
        { name: t.guru.nav.jadwal, href: "/guru/slots", icon: CalendarCog },
        { name: t.guru.nav.antrian, href: "/guru/antrian", icon: ClipboardList },
        { name: t.guru.nav.siswa, href: "/guru/siswa", icon: Users },
        { name: t.guru.nav.laporan, href: "/guru/laporan", icon: FileBarChart },
    ];
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
                    "fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 transform transition-transform duration-300 lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
                        <Link href="/guru/dashboard" className="flex items-center space-x-2">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">BK-Connect</span>
                        </Link>
                        <button
                            className="lg:hidden p-1 rounded-lg hover:bg-slate-700 text-slate-400"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-4 border-b border-slate-700">
                        <div className="p-3 bg-slate-800/50 rounded-xl">
                            <p className="font-medium text-white">{user.name}</p>
<<<<<<< HEAD
                            <p className="text-sm text-slate-400">Guru BK</p>
=======
                            <p className="text-sm text-slate-400">{t.login.teacher}</p>
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
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
                                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20"
                                            : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                                    )}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
<<<<<<< HEAD
                                    {item.name === "Antrian Hari Ini" && notificationCount > 0 && (
=======
                                    {item.href === "/guru/antrian" && notificationCount > 0 && (
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                            {notificationCount}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-slate-700">
                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="flex items-center w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-all"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
<<<<<<< HEAD
                            Keluar
=======
                            {t.common.logout}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 lg:px-8 bg-white/80 backdrop-blur-md border-b border-gray-200">
                    <div className="flex items-center">
                        <button
                            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="ml-2 lg:ml-0 text-lg font-semibold text-gray-900">
<<<<<<< HEAD
                            Panel Guru BK
=======
                            {t.guru.nav.panel}
>>>>>>> 072066b (Feature: Adding tranlasi UI (English & Indonesia))
                        </h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Bell className="w-5 h-5 text-gray-600" />
                            {notificationCount > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            )}
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
