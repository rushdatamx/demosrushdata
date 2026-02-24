import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Brain,
  UserMinus,
  UserPlus,
  Clock,
  ArrowDownRight,
  ArrowUpRight,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import dashboardData from "../../../../public/data/hr.json";
import { TurnoverTrendChart } from "@/components/hr/turnover-trend-chart";
import { RiskDistributionChart } from "@/components/hr/risk-distribution-chart";

const alertaIcons = {
  critico: AlertCircle,
  advertencia: AlertTriangle,
  info: Info,
  exito: CheckCircle,
};

const alertaColors = {
  critico: "text-red-600 bg-red-50",
  advertencia: "text-amber-600 bg-amber-50",
  info: "text-blue-600 bg-blue-50",
  exito: "text-green-600 bg-green-50",
};

const prioridadBadge = {
  alta: "bg-red-100 text-red-700",
  media: "bg-amber-100 text-amber-700",
  baja: "bg-green-100 text-green-700",
};

export default function HRDashboard() {
  const { kpis, rotacion_mensual, alertas } = dashboardData;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Prediccion de Rotacion · GrupoNova · Actualizado: {kpis.fecha_actualizacion}
        </p>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasa de Rotacion</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.tasa_rotacion_anual}%</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-3 w-3 text-green-600" />
              <span className="text-xs font-medium text-green-600">
                {kpis.variacion_rotacion}pp
              </span>
              <span className="text-xs text-muted-foreground">vs anio anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Empleados Riesgo Alto</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{kpis.empleados_riesgo_alto}</div>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">{kpis.empleados_riesgo_medio} medio</Badge>
              <Badge variant="secondary" className="text-xs">{kpis.empleados_riesgo_bajo} bajo</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Costo Rotacion Anual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(kpis.costo_rotacion_anual / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground mt-1">Costo total de reemplazo 12 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Precision del Modelo</CardTitle>
            <Brain className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{kpis.precision_modelo}%</div>
            <p className="text-xs text-muted-foreground mt-1">Accuracy en prediccion de salida</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tendencia de Rotacion (12 meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <TurnoverTrendChart data={rotacion_mensual} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Distribucion por Nivel de Riesgo</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskDistributionChart
              alto={kpis.empleados_riesgo_alto}
              medio={kpis.empleados_riesgo_medio}
              bajo={kpis.empleados_riesgo_bajo}
            />
          </CardContent>
        </Card>
      </div>

      {/* Mini Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bajas Este Mes</CardTitle>
            <UserMinus className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.bajas_mes_actual}</div>
            <p className="text-xs text-muted-foreground mt-1">Salidas registradas en Feb 2026</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contrataciones</CardTitle>
            <UserPlus className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpis.contrataciones_mes_actual}</div>
            <p className="text-xs text-muted-foreground mt-1">Nuevos ingresos en Feb 2026</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dias Anticipacion</CardTitle>
            <Clock className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.dias_anticipacion_promedio} dias</div>
            <p className="text-xs text-muted-foreground mt-1">Promedio antes de la renuncia</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertas.slice(0, 3).map((alerta, i) => {
              const Icon = alertaIcons[alerta.tipo as keyof typeof alertaIcons] || Info;
              const colorClass = alertaColors[alerta.tipo as keyof typeof alertaColors] || "text-gray-600 bg-gray-50";
              const badgeClass = prioridadBadge[alerta.prioridad as keyof typeof prioridadBadge] || "bg-gray-100 text-gray-700";

              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                  <div className={`p-1.5 rounded-md ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium">{alerta.titulo}</p>
                      <Badge className={`text-[10px] ${badgeClass}`}>{alerta.prioridad}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{alerta.descripcion}</p>
                    <p className="text-xs text-indigo-600 font-medium mt-1">{alerta.accion}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
