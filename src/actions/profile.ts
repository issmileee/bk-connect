"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getProfile() {
    const session = await auth();
    if (!session?.user?.id) return null;

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                kelas: true,
                nis: true,
                nisn: true,
                nip: true,
                phone: true,
                image: true,
            },
        });
        return user;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}

export async function updateProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const image = formData.get("image") as string; // Expecting base64 or URL

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                email,
                phone,
                image: image || undefined,
            },
        });

        revalidatePath("/(siswa)/profile");
        revalidatePath("/(guru)/profile");
        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { error: "Gagal memperbarui profil" };
    }
}

export async function changePassword(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) return { error: "User tidak ditemukan" };

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return { error: "Password saat ini salah" };
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedNewPassword },
        });

        return { success: true };
    } catch (error) {
        console.error("Error changing password:", error);
        return { error: "Gagal mengganti password" };
    }
}
