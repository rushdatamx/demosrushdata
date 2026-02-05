"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Leaf,
} from "lucide-react";
import agroData from "../../../../../public/data/agro.json";

export default function ForecastPage() {
  // Group parcelas by cultivo
  const parcelasPorCultivo = agroData.parcelas.reduce((acc, parcela) => {
    if (!acc[parcela.cultivo]) {
      acc[parcela.cultivo] = [];
    }
    acc[parcela.cultivo].push(parcela);
    return acc;
  }, {} as Record<string, typeof agroData.parcelas>);

  const getTrendIcon = (estimado: number, anterior: number) => {
    const diff = estimado - anterior;
    if (diff > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (diff < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getTrendBadge = (estimado: number, anterior: number) => {
    const diff = estimado - anterior;
    const percentage = ((diff / anterior) * 100).toFixed(1);

    if (diff > 0) {
      return (
        <Badge variant="default">
          +{percentage}%
        </Badge>
      );
    }
    if (diff < 0) {
      return (
        <Badge variant="destructive">
          {percentage}%
        </Badge>
      );
    }
    return <Badge variant="outline">0%</Badge>;
  };

  // Calculate totals per cultivo
  const getCultivoStats = (parcelas: typeof agroData.parcelas) => {
    const totalHectareas = parcelas.reduce((sum, p) => sum + p.hectareas, 0);
    const totalEstimado = parcelas.reduce(
      (sum, p) => sum + p.rendimiento_estimado * p.hectareas,
      0
    );
    const totalAnterior = parcelas.reduce(
      (sum, p) => sum + p.rendimiento_anterior * p.hectareas,
      0
    );
    const avgEstimado = totalEstimado / totalHectareas;
    const avgAnterior = totalAnterior / totalHectareas;

    return {
      totalHectareas,
      totalEstimado,
      totalAnterior,
      avgEstimado,
      avgAnterior,
      numParcelas: parcelas.length,
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Forecast de Rendimiento
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Estimacion de rendimiento por parcela comparado con la temporada anterior
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rendimiento Total Estimado</CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agroData.kpis.rendimiento_estimado_ton.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">toneladas totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Parcelas</CardTitle>
            <Leaf className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agroData.parcelas.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {agroData.kpis.total_hectareas} hectareas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cultivos Activos</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(parcelasPorCultivo).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Object.keys(parcelasPorCultivo).join(", ")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Forecast by Cultivo */}
      {Object.entries(parcelasPorCultivo).map(([cultivo, parcelas]) => {
        const stats = getCultivoStats(parcelas);

        return (
          <Card key={cultivo}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  {cultivo}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Parcelas: </span>
                    <span className="font-semibold">{stats.numParcelas}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Hectareas: </span>
                    <span className="font-semibold">{stats.totalHectareas}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Prom. Estimado: </span>
                    <span className="font-semibold">
                      {stats.avgEstimado.toFixed(1)} ton/ha
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parcela</TableHead>
                    <TableHead>Hectareas</TableHead>
                    <TableHead>Etapa</TableHead>
                    <TableHead>Salud</TableHead>
                    <TableHead className="text-right">
                      Rend. Estimado (ton/ha)
                    </TableHead>
                    <TableHead className="text-right">
                      Rend. Anterior (ton/ha)
                    </TableHead>
                    <TableHead className="text-right">
                      Total Estimado (ton)
                    </TableHead>
                    <TableHead className="text-center">Tendencia</TableHead>
                    <TableHead className="text-center">Cambio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parcelas.map((parcela) => {
                    const totalEstimado = parcela.rendimiento_estimado * parcela.hectareas;

                    return (
                      <TableRow key={parcela.id}>
                        <TableCell className="font-medium">
                          {parcela.nombre}
                        </TableCell>
                        <TableCell>{parcela.hectareas}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{parcela.etapa}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              parcela.estado === "sano"
                                ? "default"
                                : parcela.estado === "estres"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {parcela.salud_index.toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {parcela.rendimiento_estimado.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {parcela.rendimiento_anterior.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {totalEstimado.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-center">
                          {getTrendIcon(
                            parcela.rendimiento_estimado,
                            parcela.rendimiento_anterior
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {getTrendBadge(
                            parcela.rendimiento_estimado,
                            parcela.rendimiento_anterior
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {/* Subtotal Row */}
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell>TOTAL {cultivo}</TableCell>
                    <TableCell>{stats.totalHectareas}</TableCell>
                    <TableCell colSpan={2}></TableCell>
                    <TableCell className="text-right">
                      {stats.avgEstimado.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      {stats.avgAnterior.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {stats.totalEstimado.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getTrendIcon(stats.avgEstimado, stats.avgAnterior)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getTrendBadge(stats.avgEstimado, stats.avgAnterior)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}

      {/* Analysis Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analisis de Rendimiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">
                Parcelas con Mayor Rendimiento Estimado
              </h4>
              <ul className="space-y-2">
                {agroData.parcelas
                  .sort((a, b) => b.rendimiento_estimado - a.rendimiento_estimado)
                  .slice(0, 3)
                  .map((parcela) => (
                    <li key={parcela.id} className="flex justify-between items-center">
                      <span className="text-sm">{parcela.nombre}</span>
                      <Badge variant="default">
                        {parcela.rendimiento_estimado.toFixed(1)} ton/ha
                      </Badge>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                Parcelas con Mayor Mejora vs Temporada Anterior
              </h4>
              <ul className="space-y-2">
                {agroData.parcelas
                  .sort(
                    (a, b) =>
                      b.rendimiento_estimado -
                      b.rendimiento_anterior -
                      (a.rendimiento_estimado - a.rendimiento_anterior)
                  )
                  .slice(0, 3)
                  .map((parcela) => {
                    const mejora = parcela.rendimiento_estimado - parcela.rendimiento_anterior;
                    const porcentaje = ((mejora / parcela.rendimiento_anterior) * 100).toFixed(1);

                    return (
                      <li key={parcela.id} className="flex justify-between items-center">
                        <span className="text-sm">{parcela.nombre}</span>
                        <Badge variant="default">
                          +{porcentaje}%
                        </Badge>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
