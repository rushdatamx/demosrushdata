"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  TrendingUp,
  Target,
  DollarSign,
  Clock,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import dashboardData from "../../../../../public/data/hr.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const categoriaColors = {
  operativo: "bg-blue-50 text-blue-700 border-blue-200",
  retencion: "bg-purple-50 text-purple-700 border-purple-200",
  compensacion: "bg-green-50 text-green-700 border-green-200",
  liderazgo: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function PrediccionesPage() {
  const { ai_insights, predicciones_trimestre, factores_rotacion, acciones_retencion } = dashboardData;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold text-foreground">Predicciones IA</h1>
          <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 gap-1">
            <Sparkles className="h-3 w-3" />
            Generado por IA
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">
          Insights profundos, predicciones y acciones de retencion recomendadas
        </p>
      </div>

      {/* AI Insights */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          Insights del Modelo
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {ai_insights.map((insight, i) => (
            <Card key={i} className="border-l-4 border-l-indigo-400">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-semibold leading-tight">{insight.titulo}</CardTitle>
                  <Badge className={`text-[10px] shrink-0 ml-2 ${categoriaColors[insight.categoria as keyof typeof categoriaColors] || "bg-gray-50 text-gray-700"}`}>
                    {insight.categoria}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{insight.contenido}</p>

                <div className="p-3 bg-indigo-50 rounded-lg">
                  <p className="text-xs font-medium text-indigo-800 flex items-center gap-1 mb-1">
                    <ArrowRight className="h-3 w-3" /> Accion Sugerida
                  </p>
                  <p className="text-sm text-indigo-700">{insight.accion_sugerida}</p>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-green-600">
                    <DollarSign className="h-3 w-3" />
                    <span>{insight.impacto_estimado}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Target className="h-3 w-3" />
                    <span>{insight.confianza}% confianza</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Predicciones Trimestrales */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-indigo-500" />
          Predicciones Proximos 3 Meses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {predicciones_trimestre.map((pred, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{pred.mes}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{pred.bajas_predichas}</div>
                <p className="text-xs text-muted-foreground">bajas predichas</p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Intervalo</span>
                    <span className="font-medium">{pred.intervalo_inferior} - {pred.intervalo_superior}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Costo estimado</span>
                    <span className="font-medium text-red-600">${(pred.costo_estimado / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Confianza</span>
                    <span className="font-medium">{pred.confianza}%</span>
                  </div>
                </div>
                {/* Confidence bar */}
                <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-indigo-500 rounded-full h-1.5 transition-all"
                    style={{ width: `${pred.confianza}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Factores de Rotacion */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-indigo-500" />
          Factores de Rotacion (Peso en el Modelo)
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={factores_rotacion}
                  layout="vertical"
                  margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 85%)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="factor"
                    tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }}
                    tickLine={false}
                    axisLine={false}
                    width={160}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid hsl(220, 20%, 85%)",
                      borderRadius: "12px",
                      fontSize: "12px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value) => [`${value}%`, "Impacto"]}
                  />
                  <Bar dataKey="impacto_pct" fill="#4f46e5" radius={[0, 6, 6, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones de Retencion */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-indigo-500" />
          Acciones de Retencion Recomendadas
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Empleado</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Departamento</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Riesgo</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Accion</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Costo Accion</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Costo Reemplazo</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">ROI</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">
                      <Clock className="h-3 w-3 inline" /> Dias
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {acciones_retencion.map((accion, i) => (
                    <tr key={i} className="border-b border-border/30 hover:bg-accent/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium">{accion.nombre}</p>
                        <p className="text-xs text-muted-foreground">{accion.puesto}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-sm">{accion.departamento}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-red-100 text-red-700 text-xs">
                          {Math.round(accion.risk_score * 100)}%
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-indigo-600">{accion.accion}</p>
                      </td>
                      <td className="px-4 py-3 text-right hidden lg:table-cell">
                        <p className="text-sm">${accion.costo_accion.toLocaleString("es-MX")}</p>
                      </td>
                      <td className="px-4 py-3 text-right hidden lg:table-cell">
                        <p className="text-sm text-red-600">${accion.costo_reemplazo.toLocaleString("es-MX")}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-bold text-green-600">{accion.roi}x</span>
                      </td>
                      <td className="px-4 py-3 text-right hidden md:table-cell">
                        <span className="text-sm font-medium text-red-600">{accion.dias_para_actuar}d</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
