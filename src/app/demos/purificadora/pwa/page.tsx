"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  CheckCircle2,
  CircleDot,
  MapPin,
  Phone,
  Droplets,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import data from "../../../../../public/data/purificadora.json";

type TabType = "manana" | "tarde";

export default function PWAPage() {
  const [activeTab, setActiveTab] = useState<TabType>("manana");
  const { pedidos_ruta_manana, pedidos_ruta_tarde, empresa } = data;

  const pedidos = activeTab === "manana" ? pedidos_ruta_manana : pedidos_ruta_tarde;
  const entregados = pedidos.filter((p) => p.estado === "entregado").length;
  const progreso = pedidos.length > 0 ? Math.round((entregados / pedidos.length) * 100) : 0;

  return (
    <div className="flex flex-col min-h-[calc(100vh-36px)]">
      {/* Header */}
      <div className="bg-sky-500 text-white px-4 py-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-lg font-bold">Hola, {empresa.repartidor}</h1>
          <Droplets className="h-5 w-5 opacity-80" />
        </div>
        <p className="text-sky-100 text-sm">Lunes 9 de Marzo, 2026</p>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setActiveTab("manana")}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "manana"
                ? "bg-white text-sky-600"
                : "bg-sky-400/50 text-sky-100"
            }`}
          >
            10:00 AM ({pedidos_ruta_manana.length})
          </button>
          <button
            onClick={() => setActiveTab("tarde")}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "tarde"
                ? "bg-white text-sky-600"
                : "bg-sky-400/50 text-sky-100"
            }`}
          >
            3:00 PM ({pedidos_ruta_tarde.length})
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-sky-100 mb-1">
            <span>{entregados} de {pedidos.length} entregas</span>
            <span>{progreso}%</span>
          </div>
          <div className="h-2 bg-sky-400/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lista de entregas */}
      <div className="flex-1 overflow-auto px-4 py-3 space-y-2 pb-24">
        {pedidos.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            <Truck className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No hay entregas en esta ruta</p>
          </div>
        ) : (
          pedidos.map((pedido, index) => (
            <div
              key={pedido.id}
              className={`rounded-xl border p-3 transition-colors ${
                pedido.estado === "entregado"
                  ? "bg-green-50/50 border-green-100"
                  : pedido.estado === "en_camino"
                    ? "bg-sky-50/50 border-sky-100"
                    : "bg-white border-neutral-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-0.5"
                  style={{
                    backgroundColor:
                      pedido.estado === "entregado"
                        ? "#dcfce7"
                        : pedido.estado === "en_camino"
                          ? "#e0f2fe"
                          : "#f5f5f4",
                  }}
                >
                  {pedido.estado === "entregado" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : pedido.estado === "en_camino" ? (
                    <Truck className="h-4 w-4 text-sky-500" />
                  ) : (
                    <CircleDot className="h-4 w-4 text-neutral-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-900">
                      {pedido.cliente_nombre}
                    </span>
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
                          : "Pendiente"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-neutral-400 shrink-0" />
                    <span className="text-xs text-neutral-500 truncate">
                      {pedido.cliente_direccion}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-neutral-700">
                        {pedido.cantidad_garrafones} garrafon{pedido.cantidad_garrafones > 1 ? "es" : ""}
                      </span>
                      <span className="text-xs font-bold text-sky-600">
                        ${pedido.monto_total}
                      </span>
                    </div>
                    <a
                      href={`tel:${pedido.cliente_telefono}`}
                      className="flex items-center gap-1 text-xs text-sky-500"
                    >
                      <Phone className="h-3 w-3" />
                      Llamar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Boton flotante de escaneo */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <div className="max-w-md mx-auto">
          <Link
            href="/demos/purificadora/pwa/escanear"
            className="flex items-center justify-center gap-2 w-full py-4 bg-sky-500 text-white rounded-2xl text-base font-bold shadow-lg hover:bg-sky-600 transition-colors active:scale-[0.98]"
          >
            <QrCode className="h-5 w-5" />
            ESCANEAR QR
          </Link>
        </div>
      </div>
    </div>
  );
}
