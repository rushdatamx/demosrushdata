"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingDown,
  DollarSign,
  Trash2,
  Sparkles,
} from "lucide-react";
import forecastData from "../../../../../public/data/forecasting.json";
import { WasteChart } from "@/components/forecasting/waste-chart";

export default function WastePage() {
  const { kpis, desperdicio_historico } = forecastData;

  const last30 = desperdicio_historico.slice(-30);
  const totalWasteCost = last30.reduce((s, d) => s + d.costo_desperdicio, 0);
  const totalKg = last30.reduce((s, d) => s + d.kg_desperdiciados, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Tracker de Desperdicio</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Seguimiento de merma y ahorro por prediccion de demanda
        </p>
      </div>

      {/* Hero KPI */}
      <Card className="mb-8 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-5 w-5 text-green-600" />
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Impacto IA</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            <div>
              <p className="text-5xl font-bold text-green-600">{kpis.reduccion_desperdicio}%</p>
              <p className="text-sm text-green-800 dark:text-green-200 mt-1">Reduccion de Desperdicio</p>
              <p className="text-xs text-muted-foreground">{kpis.desperdicio_anterior}% → {kpis.desperdicio_actual}%</p>
            </div>
            <div>
              <p className="text-3xl font-bold">${kpis.ahorro_mensual.toLocaleString("es-MX")}</p>
              <p className="text-sm text-muted-foreground mt-1">Ahorro Mensual Estimado</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{kpis.precision_forecast}%</p>
              <p className="text-sm text-muted-foreground mt-1">Precision del Forecast</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Desperdicio Actual</CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.desperdicio_actual}%</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              vs {kpis.desperdicio_anterior}% hace 3 meses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Costo Desperdicio (30d)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalWasteCost.toLocaleString("es-MX", { maximumFractionDigits: 0 })}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Kg Desperdiciados (30d)</CardTitle>
            <Trash2 className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalKg.toFixed(0)} kg</div>
          </CardContent>
        </Card>
      </div>

      {/* Waste Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Tendencia de Desperdicio (90 dias)</CardTitle>
          <p className="text-xs text-muted-foreground">La linea muestra la reduccion progresiva gracias a la prediccion de demanda</p>
        </CardHeader>
        <CardContent>
          <WasteChart data={desperdicio_historico} />
        </CardContent>
      </Card>
    </div>
  );
}
