"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
    className?: string;
    variant?: "default" | "minimal";
}

export default function LanguageSwitcher({ className, variant = "default" }: LanguageSwitcherProps) {
    const { language, setLanguage } = useLanguage();

    if (variant === "minimal") {
        return (
            <div className={cn("flex items-center gap-1 bg-white/10 rounded-lg p-1", className)}>
                <button
                    onClick={() => setLanguage('id')}
                    className={cn(
                        "px-2 py-1 rounded text-xs font-bold transition-all",
                        language === 'id'
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                >
                    ID
                </button>
                <button
                    onClick={() => setLanguage('en')}
                    className={cn(
                        "px-2 py-1 rounded text-xs font-bold transition-all",
                        language === 'en'
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                >
                    EN
                </button>
            </div>
        );
    }

    return (
        <div className={cn("bg-white rounded-lg shadow-sm border border-gray-100 p-1 flex gap-1", className)}>
            <button
                onClick={() => setLanguage('id')}
                className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                    language === 'id'
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
            >
                ID
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                    language === 'en'
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
            >
                EN
            </button>
        </div>
    );
}
