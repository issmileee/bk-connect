import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Home() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    // Redirect based on role
    if (session.user.role === "GURU_BK") {
        redirect("/guru/dashboard");
    } else {
        redirect("/siswa/dashboard");
    }
}
