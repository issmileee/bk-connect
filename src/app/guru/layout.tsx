import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import GuruNavbar from "@/components/layouts/GuruNavbar";

export default async function GuruLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "GURU_BK") {
        redirect("/siswa/dashboard");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <GuruNavbar user={session.user} />
            <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        </div>
    );
}
