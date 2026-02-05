"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import data from "../../../../../public/data/automations.json";

export default function CostsPage() {
  const { materiales } = data;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getTrendIcon = (variacion: number) => {
    if (variacion > 0.5) {
      return <TrendingUp className="h-4 w-4 text-red-600" />;
    } else if (variacion < -0.5) {
      return <TrendingDown className="h-4 w-4 text-green-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getVariationColor = (variacion: number) => {
    if (Math.abs(variacion) > 5) {
      return "text-red-600 font-bold";
    } else if (variacion > 0) {
      return "text-red-600";
    } else if (variacion < 0) {
      return "text-green-600";
    }
    return "text-muted-foreground";
  };

  const getVariationBadge = (variacion: number) => {
    const absVariacion = Math.abs(variacion);
    if (absVariacion > 10) {
      return <Badge variant="destructive">Alerta Alta</Badge>;
    } else if (absVariacion > 5) {
      return <Badge className="bg-orange-500 hover:bg-orange-600">Alerta Media</Badge>;
    }
    return null;
  };

  const highVariationMaterials = materiales.filter(
    (m) => Math.abs(m.variacion_semanal) > 5 || Math.abs(m.variacion_mensual) > 5
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Costos de Materiales</h1>
        <p className="text-muted-foreground">
          Seguimiento y análisis de precios de materiales de construcción
        </p>
      </div>

      {/* High Variation Alert */}
      {highVariationMaterials.length > 0 && (
        <Card className="border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Materiales con Alta Variación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              {highVariationMaterials.length} material(es) con variación mayor a 5%
            </p>
            <div className="space-y-2">
              {highVariationMaterials.map((material, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm bg-white dark:bg-gray-950 p-2 rounded"
                >
                  <span className="font-medium">{material.nombre}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      Semanal: <span className={getVariationColor(material.variacion_semanal)}>
                        {material.variacion_semanal > 0 ? "+" : ""}
                        {material.variacion_semanal.toFixed(1)}%
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Mensual: <span className={getVariationColor(material.variacion_mensual)}>
                        {material.variacion_mensual > 0 ? "+" : ""}
                        {material.variacion_mensual.toFixed(1)}%
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Materials Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tabla de Precios de Materiales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead className="text-right">Precio Actual</TableHead>
                <TableHead className="text-right">Var. Semanal</TableHead>
                <TableHead className="text-right">Var. Mensual</TableHead>
                <TableHead>Tendencia</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materiales.map((material, index) => {
                const isHighVariation =
                  Math.abs(material.variacion_semanal) > 5 ||
                  Math.abs(material.variacion_mensual) > 5;

                return (
                  <TableRow
                    key={index}
                    className={isHighVariation ? "bg-red-50 dark:bg-red-950/10" : ""}
                  >
                    <TableCell className="font-medium">
                      {material.nombre}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {material.unidad}
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      {formatCurrency(material.precio_actual)}
                    </TableCell>
                    <TableCell
                      className={`text-right font-mono ${getVariationColor(
                        material.variacion_semanal
                      )}`}
                    >
                      <div className="flex items-center justify-end gap-1">
                        {getTrendIcon(material.variacion_semanal)}
                        {material.variacion_semanal > 0 ? "+" : ""}
                        {material.variacion_semanal.toFixed(1)}%
                      </div>
                    </TableCell>
                    <TableCell
                      className={`text-right font-mono ${getVariationColor(
                        material.variacion_mensual
                      )}`}
                    >
                      <div className="flex items-center justify-end gap-1">
                        {getTrendIcon(material.variacion_mensual)}
                        {material.variacion_mensual > 0 ? "+" : ""}
                        {material.variacion_mensual.toFixed(1)}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {material.precios_6m.slice(-10).map((precio, i) => {
                          const prev = i > 0 ? material.precios_6m.slice(-10)[i - 1].precio : precio.precio;
                          const diff = precio.precio - prev;
                          const color = diff > 0 ? "bg-red-400" : diff < 0 ? "bg-green-400" : "bg-gray-300";
                          const height = Math.min(Math.abs(diff / prev) * 100 + 10, 24);

                          return (
                            <div
                              key={i}
                              className={`w-1 rounded-sm ${color}`}
                              style={{ height: `${height}px` }}
                              title={`${formatCurrency(precio.precio)}`}
                            />
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getVariationBadge(material.variacion_semanal) ||
                        getVariationBadge(material.variacion_mensual)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Materiales en Alza
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {materiales.filter((m) => m.variacion_semanal > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Con incremento semanal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Materiales a la Baja
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {materiales.filter((m) => m.variacion_semanal < 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Con decremento semanal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Alertas Activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {highVariationMaterials.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Variación mayor a 5%
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
