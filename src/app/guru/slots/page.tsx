"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getSlotTemplates, toggleSlot } from "@/actions/slots";
import {
    CalendarCog,
    ChevronLeft,
    ChevronRight,
    Power,
    Clock,
    Sun,
    Loader2
} from "lucide-react";
import { getDayName, getSlotTypeLabel } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface SlotTemplate {
    id: string;
    dayOfWeek: number;
    slotNumber: number | null;
    slotType: "JAM_PELAJARAN" | "SEPULANG_SEKOLAH";
    startTime: string;
    endTime: string;
    isActive: boolean;
}

export default function SlotsPage() {
    const { t, language } = useLanguage();
    const [slots, setSlots] = useState<SlotTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [togglingSlot, setTogglingSlot] = useState<string | null>(null);

    useEffect(() => {
        loadSlots();
    }, []);

    const loadSlots = async () => {
        setLoading(true);
        try {
            const data = await getSlotTemplates();
            setSlots(data);
        } catch (error) {
            console.error("Error loading slots:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (slotId: string, currentStatus: boolean) => {
        setTogglingSlot(slotId);
        try {
            await toggleSlot(slotId, !currentStatus);
            setSlots((prev) =>
                prev.map((s) =>
                    s.id === slotId ? { ...s, isActive: !currentStatus } : s
                )
            );
        } catch (error) {
            console.error("Error toggling slot:", error);
        } finally {
            setTogglingSlot(null);
        }
    };

    const days = [1, 2, 3, 4, 5]; // Monday - Friday

    const getSlotsByDay = (dayOfWeek: number) => {
        return slots
            .filter((s) => s.dayOfWeek === dayOfWeek)
            .sort((a, b) => {
                // Sort by slot type first (JAM_PELAJARAN before SEPULANG_SEKOLAH)
                if (a.slotType !== b.slotType) {
                    return a.slotType === "JAM_PELAJARAN" ? -1 : 1;
                }
                // Then by slot number
                return (a.slotNumber || 99) - (b.slotNumber || 99);
            });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <CalendarCog className="w-6 h-6 mr-2 text-blue-600" />
                        {t.guru.slots.title}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {t.guru.slots.desc}
                    </p>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                    <span className="text-gray-600">{t.guru.slots.active}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <span className="text-gray-600">{t.guru.slots.inactive}</span>
                </div>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {days.map((day) => {
                    const daySlots = getSlotsByDay(day);
                    const activeCount = daySlots.filter((s) => s.isActive).length;

                    return (
                        <Card key={day}>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center justify-between">
                                    <span>{getDayName(day, t)}</span>
                                    <span className="text-sm font-normal text-gray-500">
                                        {activeCount}/{daySlots.length}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {daySlots.map((slot) => (
                                    <button
                                        key={slot.id}
                                        onClick={() => handleToggle(slot.id, slot.isActive)}
                                        disabled={togglingSlot === slot.id}
                                        className={`w-full p-3 rounded-xl text-left transition-all ${slot.isActive
                                            ? "bg-emerald-50 border-2 border-emerald-200 hover:bg-emerald-100"
                                            : "bg-gray-50 border-2 border-gray-200 hover:bg-gray-100"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span
                                                className={`text-sm font-medium ${slot.isActive ? "text-emerald-700" : "text-gray-500"
                                                    }`}
                                            >
                                                {slot.slotType === "SEPULANG_SEKOLAH" ? (
                                                    <span className="flex items-center">
                                                        <Sun className="w-3 h-3 mr-1" />
                                                        {t.common.slotTypes.sepulangSekolah}
                                                    </span>
                                                ) : (
                                                    t.common.slotTypes.jamPelajaran.replace("{n}", slot.slotNumber?.toString() || "")
                                                )}
                                            </span>
                                            {togglingSlot === slot.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                            ) : (
                                                <Power
                                                    className={`w-4 h-4 ${slot.isActive ? "text-emerald-600" : "text-gray-400"
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <div
                                            className={`text-xs flex items-center ${slot.isActive ? "text-emerald-600" : "text-gray-400"
                                                }`}
                                        >
                                            <Clock className="w-3 h-3 mr-1" />
                                            {slot.startTime} - {slot.endTime}
                                        </div>
                                    </button>
                                ))}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <Card className="p-4">
                <div className="flex flex-wrap gap-3">
                    <Button
                        variant="outline"
                        onClick={async () => {
                            const allSlotIds = slots.map((s) => s.id);
                            for (const id of allSlotIds) {
                                await toggleSlot(id, true);
                            }
                            loadSlots();
                        }}
                    >
                        {t.guru.slots.activateAll}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={async () => {
                            const allSlotIds = slots.map((s) => s.id);
                            for (const id of allSlotIds) {
                                await toggleSlot(id, false);
                            }
                            loadSlots();
                        }}
                    >
                        {t.guru.slots.deactivateAll}
                    </Button>
                </div>
            </Card>

            {/* Info */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700">
                    💡 <strong>{language === "en" ? "Tips" : "Tips"}:</strong> {t.guru.slots.tips}
                </p>
            </div>
        </div>
    );
}
