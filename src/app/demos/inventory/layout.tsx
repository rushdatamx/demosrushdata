"use client";

import { CircleDot, RefreshCw, Shield } from "lucide-react";
import { DemoSidebar } from "@/components/shared/demo-sidebar";

const navigation = [
  {
    name: "Radar",
    href: "/demos/inventory",
    icon: CircleDot,
    description: "Vista general del inventario",
  },
  {
    name: "Reorden",
    href: "/demos/inventory/reorder",
    icon: RefreshCw,
    description: "Sugerencias de reorden inteligente",
  },
  {
    name: "Controlados",
    href: "/demos/inventory/controlled",
    icon: Shield,
    description: "Registro de medicamentos controlados",
  },
];

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DemoSidebar
        navigation={navigation}
        title="MEDISTOCK"
        subtitle="Inventario Inteligente Farmacias"
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
