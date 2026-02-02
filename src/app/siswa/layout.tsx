import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SiswaNavbar from "@/components/layouts/SiswaNavbar";

export default async function SiswaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "SISWA") {
        redirect("/guru/dashboard");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <SiswaNavbar user={session.user} />
            <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
        </div>
    );
}
