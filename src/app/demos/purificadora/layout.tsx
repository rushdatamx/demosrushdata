"use client";

import { DemoSidebar } from "@/components/shared/demo-sidebar";
import {
  LayoutDashboard,
  Route,
  History,
  Users,
  QrCode,
  Smartphone,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/demos/purificadora",
    icon: LayoutDashboard,
    description: "KPIs e ingresos del dia",
  },
  {
    name: "Rutas",
    href: "/demos/purificadora/rutas",
    icon: Route,
    description: "Rutas de entrega activas",
  },
  {
    name: "Historial",
    href: "/demos/purificadora/historial",
    icon: History,
    description: "Entregas completadas",
  },
  {
    name: "Clientes",
    href: "/demos/purificadora/clientes",
    icon: Users,
    description: "Base de clientes",
  },
  {
    name: "Imprimir QRs",
    href: "/demos/purificadora/imprimir-qr",
    icon: QrCode,
    description: "QRs de la ruta del dia",
  },
  {
    name: "PWA Repartidor",
    href: "/demos/purificadora/pwa",
    icon: Smartphone,
    description: "Vista movil de Tiburcio",
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
