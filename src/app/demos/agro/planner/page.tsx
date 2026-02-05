"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import agroData from "../../../../../public/data/agro.json";

export default function PlannerPage() {
  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "programado":
        return (
          <Badge variant="default">
            <Clock className="w-3 h-3 mr-1" />
            Programado
          </Badge>
        );
      case "pendiente":
        return (
          <Badge variant="secondary">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        );
      case "completado":
        return (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completado
          </Badge>
        );
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const getActivityIcon = (actividad: string) => {
    if (actividad.toLowerCase().includes("cosecha")) {
      return "🌾";
    }
    if (actividad.toLowerCase().includes("riego")) {
      return "💧";
    }
    if (actividad.toLowerCase().includes("fertilizacion")) {
      return "🌱";
    }
    if (actividad.toLowerCase().includes("poda")) {
      return "✂️";
    }
    if (actividad.toLowerCase().includes("insecticida") || actividad.toLowerCase().includes("aplicacion")) {
      return "🛡️";
    }
    return "📋";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-MX", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const getDateDiff = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date("2026-02-04");
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Manana";
    if (diffDays < 0) return `Hace ${Math.abs(diffDays)} dias`;
    return `En ${diffDays} dias`;
  };

  // Group activities by status
  const actividadesProgramadas = agroData.plan_actividades.filter(
    (a) => a.estado === "programado"
  );
  const actividadesPendientes = agroData.plan_actividades.filter(
    (a) => a.estado === "pendiente"
  );

  // Calculate total personnel needed
  const totalPersonal = agroData.plan_actividades.reduce(
    (sum, a) => sum + a.personal,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Planificador de Actividades
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Calendario de actividades agricolas y asignacion de recursos
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Actividades</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agroData.plan_actividades.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Programadas</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {actividadesProgramadas.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {actividadesPendientes.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Personal Total</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPersonal}</div>
            <p className="text-xs text-muted-foreground mt-1">jornaleros requeridos</p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline View - Programmed Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Actividades Programadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {actividadesProgramadas.map((actividad, idx) => (
              <div
                key={idx}
                className="relative pl-8 pb-8 border-l-2 border-border last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background"></div>

                {/* Activity card */}
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getActivityIcon(actividad.actividad)}</span>
                          <h4 className="font-semibold text-lg">
                            {actividad.actividad}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(actividad.fecha)}</span>
                          </div>
                          <Badge variant="outline" className="font-semibold">
                            {getDateDiff(actividad.fecha)}
                          </Badge>
                        </div>
                      </div>
                      {getEstadoBadge(actividad.estado)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Parcelas
                          </p>
                          <p className="text-sm font-medium">{actividad.parcelas}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Personal
                          </p>
                          <p className="text-sm font-medium">
                            {actividad.personal} jornaleros
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Activities */}
      {actividadesPendientes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Actividades Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actividadesPendientes.map((actividad, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 pb-8 border-l-2 border-yellow-300 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-600 border-2 border-background"></div>

                  {/* Activity card */}
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">
                              {getActivityIcon(actividad.actividad)}
                            </span>
                            <h4 className="font-semibold text-lg">
                              {actividad.actividad}
                            </h4>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(actividad.fecha)}</span>
                            </div>
                            <Badge variant="outline" className="font-semibold">
                              {getDateDiff(actividad.fecha)}
                            </Badge>
                          </div>
                        </div>
                        {getEstadoBadge(actividad.estado)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Parcelas
                            </p>
                            <p className="text-sm font-medium">{actividad.parcelas}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Personal
                            </p>
                            <p className="text-sm font-medium">
                              {actividad.personal} jornaleros
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resource Planning Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Resumen de Recursos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">
                Actividades por Tipo
              </h4>
              <div className="space-y-2">
                {Object.entries(
                  agroData.plan_actividades.reduce((acc, act) => {
                    const tipo = act.actividad.split(" ")[0];
                    acc[tipo] = (acc[tipo] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([tipo, count]) => (
                  <div key={tipo} className="flex justify-between items-center">
                    <span className="text-sm">{tipo}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Proximas 3 Actividades
              </h4>
              <div className="space-y-2">
                {agroData.plan_actividades
                  .filter((a) => a.estado === "programado")
                  .slice(0, 3)
                  .map((act, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/50 rounded-lg p-3 border"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium">{act.actividad}</span>
                        <Badge variant="outline" className="text-xs">
                          {getDateDiff(act.fecha)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {act.parcelas}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {act.personal}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
