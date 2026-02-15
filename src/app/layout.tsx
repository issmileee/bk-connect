import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
                <LanguageProvider>
                    <AuthProvider>{children}</AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
