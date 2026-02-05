"use client";

import { DemoSidebar } from "@/components/shared/demo-sidebar";
import { LayoutDashboard, Smartphone } from "lucide-react";

const navigation = [
  {
    name: "Vista Gerente",
    href: "/demos/field-sales",
    icon: LayoutDashboard,
    description: "Dashboard del gerente con metricas y mapa de tiendas",
  },
  {
    name: "Vista Movil",
    href: "/demos/field-sales/mobile",
    icon: Smartphone,
    description: "Vista del vendedor en su dispositivo movil",
  },
];

export default function FieldSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DemoSidebar
        navigation={navigation}
        title="DISTRIBUGO"
        subtitle="App de Vendedores en Campo"
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
