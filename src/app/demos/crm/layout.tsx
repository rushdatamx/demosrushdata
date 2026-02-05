"use client";

import { DemoSidebar } from "@/components/shared/demo-sidebar";
import {
  Kanban,
  Users,
  Bot,
  TrendingUp,
} from "lucide-react";

const navigation = [
  {
    name: "Pipeline",
    href: "/demos/crm",
    icon: Kanban,
    description: "Tablero de oportunidades",
  },
  {
    name: "Clientes",
    href: "/demos/crm/clients",
    icon: Users,
    description: "Health score y riesgo",
  },
  {
    name: "IA Assistant",
    href: "/demos/crm/ai",
    icon: Bot,
    description: "Insights y acciones",
  },
  {
    name: "Forecast",
    href: "/demos/crm/forecast",
    icon: TrendingUp,
    description: "Pronostico de revenue",
  },
];

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DemoSidebar
        navigation={navigation}
        title="VENTAMAX"
        subtitle="CRM con Inteligencia Artificial"
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
