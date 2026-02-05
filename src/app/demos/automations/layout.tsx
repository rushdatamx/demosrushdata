"use client";

import { DemoSidebar } from "@/components/shared/demo-sidebar";
import { Bell, FileText, TrendingUp } from "lucide-react";

const navigation = [
  {
    name: "Alertas",
    href: "/demos/automations",
    icon: Bell,
    description: "Centro de notificaciones y alertas",
  },
  {
    name: "Reporte",
    href: "/demos/automations/reports",
    icon: FileText,
    description: "Reporte ejecutivo generado",
  },
  {
    name: "Costos",
    href: "/demos/automations/costs",
    icon: TrendingUp,
    description: "Seguimiento de costos de materiales",
  },
];

export default function AutomationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DemoSidebar
        navigation={navigation}
        title="CONSTRUPLAN"
        subtitle="Reportes y Alertas IA"
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
