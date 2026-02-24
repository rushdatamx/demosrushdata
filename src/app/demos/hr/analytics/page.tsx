import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Shield,
  TrendingUp,
  Target,
} from "lucide-react";
import dashboardData from "../../../../../public/data/hr.json";
import { DepartmentTurnoverChart } from "@/components/hr/department-turnover-chart";
import { HiringVsDeparturesChart } from "@/components/hr/hiring-vs-departures-chart";

export default function AnalyticsPage() {
  const { costo_analysis, rotacion_por_departamento, rotacion_por_antiguedad, rotacion_mensual } = dashboardData;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Analisis de costos, tendencias y ROI del modelo predictivo
        </p>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Costo por Reemplazo</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(costo_analysis.costo_promedio_reemplazo / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground mt-1">Promedio por empleado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bajas Evitadas (6m)</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{costo_analysis.bajas_evitadas_6_meses}</div>
            <p className="text-xs text-muted-foreground mt-1">Gracias a intervenciones del modelo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ahorro Acumulado</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">${(costo_analysis.ahorro_acumulado / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground mt-1">Retencion exitosa vs costo reemplazo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ROI del Modelo</CardTitle>
            <Target className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{costo_analysis.roi_modelo}x</div>
            <p className="text-xs text-muted-foreground mt-1">Retorno sobre inversion en IA</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Rotacion por Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            <DepartmentTurnoverChart data={rotacion_por_departamento} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Rotacion por Antiguedad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rotacion_por_antiguedad.map((rango, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-muted-foreground shrink-0">{rango.rango}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-100 rounded-full h-5 relative">
                      <div
                        className="bg-indigo-500 rounded-full h-5 flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${Math.min(rango.porcentaje * 3, 100)}%`, minWidth: rango.porcentaje > 0 ? "40px" : "0" }}
                      >
                        <span className="text-[10px] font-medium text-white">{rango.porcentaje}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-20 text-right">
                    <span className="text-xs text-muted-foreground">{rango.empleados} emp.</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Contrataciones vs Bajas (12 meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <HiringVsDeparturesChart data={rotacion_mensual} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Desglose de Costos por Reemplazo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 pt-2">
              {Object.entries(costo_analysis.costos_desglose).map(([key, value]) => {
                const labels: Record<string, string> = {
                  reclutamiento: "Reclutamiento",
                  capacitacion: "Capacitacion",
                  productividad_perdida: "Productividad Perdida",
                  administrativo: "Administrativo",
                };
                const colors: Record<string, string> = {
                  reclutamiento: "bg-indigo-500",
                  capacitacion: "bg-violet-500",
                  productividad_perdida: "bg-amber-500",
                  administrativo: "bg-gray-400",
                };
                const pct = Math.round((value / costo_analysis.costo_promedio_reemplazo) * 100);
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{labels[key] || key}</span>
                      <span className="text-sm font-medium">${(value / 1000).toFixed(0)}K <span className="text-muted-foreground font-normal">({pct}%)</span></span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${colors[key] || "bg-gray-400"} rounded-full h-2 transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                <span className="text-sm font-medium">Total por Reemplazo</span>
                <span className="text-sm font-bold">${(costo_analysis.costo_promedio_reemplazo / 1000).toFixed(1)}K</span>
              </div>
            </div>

            {/* ROI Summary */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-xs font-medium text-indigo-800 mb-2">ROI del Modelo Predictivo</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Inversion anual</p>
                  <p className="font-medium">${(costo_analysis.inversion_modelo_anual / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ahorro generado</p>
                  <p className="font-medium text-green-600">${(costo_analysis.ahorro_acumulado / 1000000).toFixed(2)}M</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bajas evitadas</p>
                  <p className="font-medium">{costo_analysis.bajas_evitadas_6_meses} empleados</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ROI</p>
                  <p className="font-bold text-indigo-700">{costo_analysis.roi_modelo}x</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
