"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
  Store,
} from "lucide-react";
import dashboardData from "../../../../../public/data/sell-out.json";

type AlertType = "all" | "quiebre" | "stock_critico" | "oportunidad" | "sugerido_compra";

const alertIcons = {
  quiebre: AlertCircle,
  stock_critico: AlertTriangle,
  oportunidad: TrendingUp,
  sugerido_compra: ShoppingCart,
};

const alertColors = {
  quiebre: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
  stock_critico: "bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800",
  oportunidad: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
  sugerido_compra: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
};

export default function AlertasPage() {
  const { alertas } = dashboardData;
  const [selectedType, setSelectedType] = useState<AlertType>("all");

  const alertasPorTipo = {
    quiebre: alertas.filter((a) => a.tipo === "quiebre"),
    stock_critico: alertas.filter((a) => a.tipo === "stock_critico"),
    oportunidad: alertas.filter((a) => a.tipo === "oportunidad"),
    sugerido_compra: alertas.filter((a) => a.tipo === "sugerido_compra"),
  };

  const filteredAlertas =
    selectedType === "all"
      ? alertas
      : alertas.filter((a) => a.tipo === selectedType);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Alertas</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {alertas.length} alertas activas que requieren atencion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card
          className={`cursor-pointer transition-all ${selectedType === "quiebre" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setSelectedType(selectedType === "quiebre" ? "all" : "quiebre")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{alertasPorTipo.quiebre.length}</p>
                <p className="text-xs text-muted-foreground">Quiebres</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${selectedType === "stock_critico" ? "ring-2 ring-orange-500" : ""}`}
          onClick={() => setSelectedType(selectedType === "stock_critico" ? "all" : "stock_critico")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{alertasPorTipo.stock_critico.length}</p>
                <p className="text-xs text-muted-foreground">Stock Critico</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${selectedType === "oportunidad" ? "ring-2 ring-green-500" : ""}`}
          onClick={() => setSelectedType(selectedType === "oportunidad" ? "all" : "oportunidad")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{alertasPorTipo.oportunidad.length}</p>
                <p className="text-xs text-muted-foreground">Oportunidades</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${selectedType === "sugerido_compra" ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => setSelectedType(selectedType === "sugerido_compra" ? "all" : "sugerido_compra")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{alertasPorTipo.sugerido_compra.length}</p>
                <p className="text-xs text-muted-foreground">Sugeridos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <Button variant={selectedType === "all" ? "default" : "outline"} size="sm" onClick={() => setSelectedType("all")}>Todas ({alertas.length})</Button>
        <Button variant={selectedType === "quiebre" ? "default" : "outline"} size="sm" onClick={() => setSelectedType("quiebre")} className="text-red-600 border-red-200 hover:bg-red-50">Quiebres ({alertasPorTipo.quiebre.length})</Button>
        <Button variant={selectedType === "stock_critico" ? "default" : "outline"} size="sm" onClick={() => setSelectedType("stock_critico")} className="text-orange-600 border-orange-200 hover:bg-orange-50">Criticos ({alertasPorTipo.stock_critico.length})</Button>
        <Button variant={selectedType === "oportunidad" ? "default" : "outline"} size="sm" onClick={() => setSelectedType("oportunidad")} className="text-green-600 border-green-200 hover:bg-green-50">Oportunidades ({alertasPorTipo.oportunidad.length})</Button>
        <Button variant={selectedType === "sugerido_compra" ? "default" : "outline"} size="sm" onClick={() => setSelectedType("sugerido_compra")} className="text-blue-600 border-blue-200 hover:bg-blue-50">Sugeridos ({alertasPorTipo.sugerido_compra.length})</Button>
      </div>

      <div className="space-y-3">
        {filteredAlertas.slice(0, 50).map((alerta, index) => {
          const Icon = alertIcons[alerta.tipo as keyof typeof alertIcons] || AlertCircle;
          const colorClass = alertColors[alerta.tipo as keyof typeof alertColors] || "";

          return (
            <Card key={index} className={`border ${colorClass}`}>
              <CardContent className="py-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <Icon className={`h-5 w-5 ${alerta.tipo === "quiebre" ? "text-red-600" : alerta.tipo === "stock_critico" ? "text-orange-600" : alerta.tipo === "oportunidad" ? "text-green-600" : "text-blue-600"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{alerta.titulo}</span>
                      <Badge variant={alerta.prioridad === "alta" ? "destructive" : alerta.prioridad === "media" ? "secondary" : "outline"} className="text-xs">{alerta.prioridad}</Badge>
                    </div>
                    <p className="text-sm text-foreground">{alerta.descripcion}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      {alerta.tienda && (
                        <span className="flex items-center gap-1">
                          <Store className="h-3 w-3" />
                          {alerta.tienda}
                        </span>
                      )}
                      {alerta.impacto && <span>{alerta.impacto}</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAlertas.length > 50 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Mostrando 50 de {filteredAlertas.length} alertas
        </p>
      )}
    </div>
  );
}
