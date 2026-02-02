import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "akademik" | "karir" | "pribadi" | "success" | "warning" | "info";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    children: React.ReactNode;
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    default: "bg-gray-100 text-gray-700",
    akademik: "bg-red-100 text-red-700",
    karir: "bg-amber-100 text-amber-700",
    pribadi: "bg-emerald-100 text-emerald-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
};

const sizeClasses: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-sm",
};

export default function Badge({
    variant = "default",
    size = "md",
    children,
    className,
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center font-medium rounded-full",
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
        >
            {children}
        </span>
    );
}
