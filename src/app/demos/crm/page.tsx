"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DollarSign,
  Target,
  TrendingUp,
  AlertTriangle,
  Clock,
  Building2,
  User,
} from "lucide-react";
import crmData from "../../../../public/data/crm.json";

const etapaColors: Record<string, string> = {
  Prospecto: "bg-slate-100 border-slate-300 dark:bg-slate-900 dark:border-slate-700",
  Cotizacion: "bg-blue-50 border-blue-300 dark:bg-blue-950 dark:border-blue-800",
  Negociacion: "bg-yellow-50 border-yellow-300 dark:bg-yellow-950 dark:border-yellow-800",
  Cierre: "bg-green-50 border-green-300 dark:bg-green-950 dark:border-green-800",
  Perdido: "bg-red-50 border-red-300 dark:bg-red-950 dark:border-red-800",
};

const etapaHeaderColors: Record<string, string> = {
  Prospecto: "text-slate-600",
  Cotizacion: "text-blue-600",
  Negociacion: "text-yellow-600",
  Cierre: "text-green-600",
  Perdido: "text-red-600",
};

export default function PipelinePage() {
  const { kpis, oportunidades, pipeline_por_etapa } = crmData;
  const [selectedOpp, setSelectedOpp] = useState<number | null>(null);

  const etapas = ["Prospecto", "Cotizacion", "Negociacion", "Cierre", "Perdido"];

  const selectedOportunidad = selectedOpp !== null
    ? oportunidades.find((o) => o.id === selectedOpp)
    : null;

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Pipeline de Ventas</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {kpis.oportunidades_activas} oportunidades activas · Pipeline: ${kpis.pipeline_total.toLocaleString("es-MX")}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pipeline Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(kpis.pipeline_total / 1000000).toFixed(1)}M</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasa de Cierre</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpis.tasa_cierre}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ticket Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpis.ticket_promedio.toLocaleString("es-MX")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clientes en Riesgo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{kpis.clientes_riesgo}</div>
            <p className="text-xs text-muted-foreground mt-1">Health score &lt; 40</p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {etapas.map((etapa) => {
          const etapaData = pipeline_por_etapa.find((p) => p.etapa === etapa);
          const opps = oportunidades.filter((o) => o.etapa === etapa);

          return (
            <div key={etapa} className="min-w-[260px] flex-1">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${etapaHeaderColors[etapa]}`}>{etapa}</span>
                  <Badge variant="secondary" className="text-xs">{opps.length}</Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  ${((etapaData?.valor || 0) / 1000).toFixed(0)}k
                </span>
              </div>

              {/* Cards */}
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 pr-2">
                  {opps.slice(0, 15).map((opp) => (
                    <div
                      key={opp.id}
                      onClick={() => setSelectedOpp(opp.id === selectedOpp ? null : opp.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        etapaColors[etapa]
                      } ${selectedOpp === opp.id ? "ring-2 ring-primary" : ""}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-sm leading-tight line-clamp-2">{opp.empresa}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 truncate">{opp.producto}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">${(opp.valor / 1000).toFixed(0)}k</span>
                        <div className="flex items-center gap-2">
                          {opp.probabilidad > 0 && (
                            <Badge variant="outline" className="text-[10px]">{opp.probabilidad}%</Badge>
                          )}
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span className="text-[10px]">{opp.dias_en_etapa}d</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {opp.vendedor}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          );
        })}
      </div>

      {/* Detail Panel */}
      {selectedOportunidad && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Detalle de Oportunidad</CardTitle>
              <Badge>{selectedOportunidad.etapa}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Empresa</p>
                <p className="text-sm font-medium flex items-center gap-1"><Building2 className="h-3 w-3" />{selectedOportunidad.empresa}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Producto</p>
                <p className="text-sm font-medium">{selectedOportunidad.producto}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Valor</p>
                <p className="text-sm font-bold">${selectedOportunidad.valor.toLocaleString("es-MX")}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Probabilidad IA</p>
                <p className="text-sm font-bold text-green-600">{selectedOportunidad.probabilidad}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Vendedor</p>
                <p className="text-sm">{selectedOportunidad.vendedor}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Dias en Etapa</p>
                <p className="text-sm">{selectedOportunidad.dias_en_etapa} dias</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Creacion</p>
                <p className="text-sm tabular-nums">{selectedOportunidad.fecha_creacion}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Cierre Estimado</p>
                <p className="text-sm tabular-nums">{selectedOportunidad.fecha_cierre_estimada}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
