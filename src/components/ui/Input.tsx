import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, id, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {icon}
                        </div>
                    )}
                    <input
                        id={id}
                        ref={ref}
                        className={cn(
                            "w-full px-4 py-3 border rounded-xl transition-all duration-200 outline-none",
                            "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            "placeholder:text-gray-400",
                            icon && "pl-11",
                            error
                                ? "border-red-300 bg-red-50 focus:ring-red-500"
                                : "border-gray-200 bg-white",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1.5 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
