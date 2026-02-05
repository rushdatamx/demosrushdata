"use client";

import { DemoSidebar } from "@/components/shared/demo-sidebar";
import {
  LayoutDashboard,
  AlertTriangle,
  Package,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/demos/sell-out",
    icon: LayoutDashboard,
    description: "Vista general de KPIs",
  },
  {
    name: "Alertas",
    href: "/demos/sell-out/alertas",
    icon: AlertTriangle,
    description: "Quiebres y oportunidades",
  },
  {
    name: "Inventario",
    href: "/demos/sell-out/inventario",
    icon: Package,
    description: "Stock por tienda",
  },
  {
    name: "Ventas",
    href: "/demos/sell-out/ventas",
    icon: TrendingUp,
    description: "Analisis de sell-out",
  },
  {
    name: "Insights",
    href: "/demos/sell-out/insights",
    icon: MessageSquare,
    description: "Que hablar con el comprador",
  },
];

export default function SellOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DemoSidebar
        navigation={navigation}
        title="GALLETAS CRUNCH"
        subtitle="Demo de analisis comercial"
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
