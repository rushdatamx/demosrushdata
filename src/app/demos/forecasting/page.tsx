"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Target,
  DollarSign,
} from "lucide-react";
import forecastData from "../../../../public/data/forecasting.json";
import { ForecastChart } from "@/components/forecasting/forecast-chart";

export default function ForecastPage() {
  const { kpis, forecast_7d, alertas, eventos } = forecastData;
  const [selectedDay, setSelectedDay] = useState(0);

  const day = forecast_7d[selectedDay];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Precision Forecast</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpis.precision_forecast}%</div>
            <p className="text-xs text-muted-foreground mt-1">Ultimos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Desperdicio Reducido</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpis.reduccion_desperdicio}%</div>
            <p className="text-xs text-muted-foreground mt-1">{kpis.desperdicio_anterior}% → {kpis.desperdicio_actual}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ahorro Mensual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpis.ahorro_mensual.toLocaleString("es-MX")}</div>
            <p className="text-xs text-muted-foreground mt-1">Vs. sin prediccion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{alertas.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Requieren atencion</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      {alertas.length > 0 && (
        <div className="space-y-3 mb-8">
          {alertas.map((alerta, i) => (
            <Card key={i} className={`border ${
              alerta.prioridad === "alta" ? "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
              : alerta.prioridad === "media" ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800"
              : "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
            }`}>
              <CardContent className="py-3">
                <div className="flex items-start gap-3">
                  <Sparkles className={`h-4 w-4 mt-0.5 ${
                    alerta.prioridad === "alta" ? "text-red-600" : alerta.prioridad === "media" ? "text-yellow-600" : "text-green-600"
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{alerta.titulo}</span>
                      <Badge variant={alerta.prioridad === "alta" ? "destructive" : "secondary"} className="text-xs">{alerta.prioridad}</Badge>
                    </div>
                    <p className="text-sm text-foreground/80">{alerta.descripcion}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <ArrowRight className="h-3 w-3" />
                      {alerta.accion}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Day Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {forecast_7d.map((d, i) => (
          <Button
            key={d.fecha}
            variant={selectedDay === i ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDay(i)}
            className="shrink-0"
          >
            <div className="text-center">
              <div className="text-xs">{d.fecha.slice(5)}</div>
              {d.evento && <div className="text-[10px] opacity-70">★</div>}
            </div>
          </Button>
        ))}
      </div>

      {/* Selected Day Detail */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">
                Forecast: {day.fecha} ({day.dia_semana})
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Factor de demanda: {day.factor_demanda}x
                {day.evento && ` · ${day.evento}`}
              </p>
            </div>
            {day.evento && (
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                <Calendar className="h-3 w-3 mr-1" />
                {day.evento}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ForecastChart items={day.items} />
        </CardContent>
      </Card>

      {/* Detail Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Detalle por Ingrediente — {day.fecha}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-muted-foreground">Ingrediente</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Predicho</th>
                  {day.items[0]?.real !== null && <th className="text-right p-3 font-medium text-muted-foreground">Real</th>}
                  <th className="text-right p-3 font-medium text-muted-foreground">Banda Inf.</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Banda Sup.</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Costo Est.</th>
                </tr>
              </thead>
              <tbody>
                {day.items.map((item) => (
                  <tr key={item.ingrediente} className="border-b border-border/50">
                    <td className="p-3 font-medium">{item.ingrediente}</td>
                    <td className="p-3 text-right tabular-nums">{item.predicho} {item.unidad}</td>
                    {item.real !== null && (
                      <td className="p-3 text-right tabular-nums">
                        <span className={
                          Math.abs((item.real ?? 0) - item.predicho) / item.predicho > 0.15
                            ? "text-red-600 font-medium" : "text-green-600"
                        }>
                          {item.real} {item.unidad}
                        </span>
                      </td>
                    )}
                    <td className="p-3 text-right tabular-nums text-muted-foreground">{item.banda_inferior}</td>
                    <td className="p-3 text-right tabular-nums text-muted-foreground">{item.banda_superior}</td>
                    <td className="p-3 text-right tabular-nums">${item.costo_estimado.toLocaleString("es-MX")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
