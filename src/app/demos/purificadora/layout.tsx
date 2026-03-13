"use client";

import { DemoSidebar } from "@/components/shared/demo-sidebar";
import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  Users,
  MapPin,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/demos/purificadora",
    icon: LayoutDashboard,
    description: "KPIs e ingresos del dia",
  },
  {
    name: "Registro de Ventas",
    href: "/demos/purificadora/ventas",
    icon: ShoppingCart,
    description: "Registrar ventas del dia",
  },
  {
    name: "Ventas",
    href: "/demos/purificadora/todas-ventas",
    icon: ClipboardList,
    description: "Consulta y filtra ventas",
  },
  {
    name: "GPS Tiburcio",
    href: "/demos/purificadora/gps",
    icon: MapPin,
    description: "Ubicacion en tiempo real",
  },
  {
    name: "Clientes",
    href: "/demos/purificadora/clientes",
    icon: Users,
    description: "Base de clientes",
  },
];

export default function PurificadoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DemoSidebar
        navigation={navigation}
        title="PURIFICADORA EL BALUARTE"
        subtitle="Gestion de entregas con IA"
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
