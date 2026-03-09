"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  CheckCircle2,
  CircleDot,
  Clock,
  Droplets,
  MapPin,
} from "lucide-react";
import data from "../../../../../public/data/purificadora.json";

type TabType = "manana" | "tarde";

export default function RutasPage() {
  const [activeTab, setActiveTab] = useState<TabType>("manana");
  const { pedidos_ruta_manana, pedidos_ruta_tarde, rutas, empresa } = data;

  const pedidos = activeTab === "manana" ? pedidos_ruta_manana : pedidos_ruta_tarde;

  const rutaHoy = rutas.find(
    (r) => r.fecha === "2026-03-09" && r.tipo === activeTab
  );

  const entregados = pedidos.filter((p) => p.estado === "entregado").length;
  const enCamino = pedidos.filter((p) => p.estado === "en_camino").length;
  const pendientes = pedidos.filter(
    (p) => p.estado === "pendiente" || p.estado === "asignado"
  ).length;
  const progreso = pedidos.length > 0 ? Math.round((entregados / pedidos.length) * 100) : 0;

  const totalGarrafones = pedidos.reduce((s, p) => s + p.cantidad_garrafones, 0);
  const totalMonto = pedidos.reduce((s, p) => s + p.monto_total, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Rutas de Hoy</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {empresa.nombre} · Lunes 9 de Marzo, 2026
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("manana")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "manana"
              ? "bg-sky-500 text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Ruta 10:00 AM ({pedidos_ruta_manana.length})
        </button>
        <button
          onClick={() => setActiveTab("tarde")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "tarde"
              ? "bg-sky-500 text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Ruta 3:00 PM ({pedidos_ruta_tarde.length})
        </button>
      </div>

      {/* Resumen de ruta */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="h-4 w-4 text-sky-500" />
              <span className="text-sm text-muted-foreground">Progreso</span>
            </div>
            <div className="text-xl font-bold">{entregados} / {pedidos.length}</div>
            <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-sky-500 rounded-full transition-all"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="h-4 w-4 text-sky-500" />
              <span className="text-sm text-muted-foreground">Garrafones</span>
            </div>
            <div className="text-xl font-bold">{totalGarrafones}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-muted-foreground">Monto Total</span>
            </div>
            <div className="text-xl font-bold">${totalMonto.toLocaleString("es-MX")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Estado</span>
            </div>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">{enCamino} en camino</Badge>
              <Badge variant="outline" className="text-xs">{pendientes} pendientes</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de pedidos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Entregas - Ruta {activeTab === "manana" ? "10:00 AM" : "3:00 PM"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pedidos.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No hay pedidos asignados a esta ruta
            </p>
          ) : (
            <div className="space-y-2">
              {pedidos.map((pedido, index) => (
                <div
                  key={pedido.id}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{
                    backgroundColor: pedido.estado === "entregado" ? "#dcfce7" : pedido.estado === "en_camino" ? "#e0f2fe" : "#f5f5f4"
                  }}>
                    {pedido.estado === "entregado" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : pedido.estado === "en_camino" ? (
                      <Truck className="h-4 w-4 text-sky-500" />
                    ) : (
                      <CircleDot className="h-4 w-4 text-neutral-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">#{index + 1}</span>
                      <span className="text-sm font-medium truncate">{pedido.cliente_nombre}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground truncate">{pedido.cliente_direccion}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-medium">{pedido.cantidad_garrafones} garr.</div>
                    <div className="text-xs text-muted-foreground">${pedido.monto_total}</div>
                  </div>

                  <Badge
                    variant={
                      pedido.estado === "entregado"
                        ? "secondary"
                        : pedido.estado === "en_camino"
                          ? "default"
                          : "outline"
                    }
                    className="text-[10px] shrink-0"
                  >
                    {pedido.estado === "entregado"
                      ? "Entregado"
                      : pedido.estado === "en_camino"
                        ? "En camino"
                        : pedido.estado === "asignado"
                          ? "Asignado"
                          : "Pendiente"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
