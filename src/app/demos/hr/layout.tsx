"use client";

import { DemoSidebar } from "@/components/shared/demo-sidebar";
import {
  LayoutDashboard,
  Users,
  Brain,
  BarChart3,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/demos/hr",
    icon: LayoutDashboard,
    description: "Vista general de rotacion",
  },
  {
    name: "Empleados",
    href: "/demos/hr/empleados",
    icon: Users,
    description: "Riesgo por empleado",
  },
  {
    name: "Predicciones IA",
    href: "/demos/hr/predicciones",
    icon: Brain,
    description: "Insights y acciones",
  },
  {
    name: "Analytics",
    href: "/demos/hr/analytics",
    icon: BarChart3,
    description: "Costos y tendencias",
  },
];

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DemoSidebar
        navigation={navigation}
        title="GRUPONOVA"
        subtitle="Prediccion de Rotacion"
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
