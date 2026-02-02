import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: params.id },
            include: {
                siswa: {
                    select: {
                        id: true,
                        name: true,
                        kelas: true,
                        email: true,
                    },
                },
                slot: {
                    select: {
                        slotNumber: true,
                        slotType: true,
                        startTime: true,
                        endTime: true,
                    },
                },
                result: true,
            },
        });

        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
