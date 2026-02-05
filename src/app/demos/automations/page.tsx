"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, TrendingUp, TrendingDown, Building2, Clock } from "lucide-react";
import data from "../../../../public/data/automations.json";

export default function AutomationsPage() {
  const { kpis, alertas, proyectos } = data;

  // Sort alerts by priority (alta > media > baja) then by date
  const priorityOrder = { alta: 1, media: 2, baja: 3 };
  const sortedAlertas = [...alertas].sort((a, b) => {
    const priorityDiff = priorityOrder[a.prioridad as keyof typeof priorityOrder] - priorityOrder[b.prioridad as keyof typeof priorityOrder];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return "border-l-red-500";
      case "media":
        return "border-l-orange-500";
      case "baja":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  const getPriorityBadge = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>;
      case "media":
        return <Badge className="bg-orange-500 hover:bg-orange-600">Media</Badge>;
      case "baja":
        return <Badge variant="secondary">Baja</Badge>;
      default:
        return <Badge variant="outline">Desconocida</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Alertas</h1>
        <p className="text-muted-foreground">
          Centro de notificaciones y alertas inteligentes
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Presupuesto Total
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(kpis.presupuesto_total)}
            </div>
            <p className="text-xs text-muted-foreground">
              {proyectos.length} proyectos activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ejercido
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(kpis.ejercido_total)}
            </div>
            <p className="text-xs text-muted-foreground">
              {((kpis.ejercido_total / kpis.presupuesto_total) * 100).toFixed(1)}% del presupuesto
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avance Promedio
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpis.avance_promedio.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas Activas
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {kpis.alertas_activas}
            </div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Feed */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Feed de Alertas</h2>
          <p className="text-muted-foreground">
            Notificaciones y acciones recomendadas
          </p>
        </div>

        <div className="space-y-3">
          {sortedAlertas.map((alerta, index) => (
            <Card
              key={index}
              className={`border-l-4 ${getPriorityColor(alerta.prioridad)}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{alerta.titulo}</CardTitle>
                      {getPriorityBadge(alerta.prioridad)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {alerta.descripcion}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDate(alerta.fecha)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Proyecto
                    </p>
                    <p className="text-sm font-medium">{alerta.proyecto}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Impacto
                    </p>
                    <p className="text-sm font-medium">{alerta.impacto}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Tipo
                    </p>
                    <p className="text-sm font-medium capitalize">{alerta.tipo}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Acción Sugerida
                  </p>
                  <p className="text-sm">{alerta.accion}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Summary Cards */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Resumen de Proyectos</h2>
          <p className="text-muted-foreground">
            Estado actual de todos los proyectos activos
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {proyectos.map((proyecto) => {
            const variacionPct = proyecto.variacion_presupuesto;
            const isOverBudget = variacionPct > 5;

            return (
              <Card key={proyecto.id}>
                <CardHeader>
                  <CardTitle className="text-base">{proyecto.nombre}</CardTitle>
                  <p className="text-xs text-muted-foreground">{proyecto.tipo}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Avance</span>
                      <span className="font-bold">{proyecto.avance_pct}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${proyecto.avance_pct}%` }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Presupuesto</span>
                      <span className="font-medium">
                        {formatCurrency(proyecto.presupuesto)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Ejercido</span>
                      <span className="font-medium">
                        {formatCurrency(proyecto.ejercido)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Variación</span>
                      <span
                        className={`font-medium ${
                          isOverBudget ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {isOverBudget ? "+" : ""}
                        {variacionPct.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
