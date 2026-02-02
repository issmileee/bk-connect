import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    children: React.ReactNode;
}

export function Card({ className, hover, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-xl border border-gray-100 shadow-sm",
                hover && "transition-all hover:shadow-md hover:border-gray-200",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
    return (
        <div
            className={cn("p-5 border-b border-gray-100", className)}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
    return (
        <h3
            className={cn("font-semibold text-gray-900 flex items-center", className)}
            {...props}
        >
            {children}
        </h3>
    );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function CardContent({ className, children, ...props }: CardContentProps) {
    return (
        <div className={cn("p-5", className)} {...props}>
            {children}
        </div>
    );
}
