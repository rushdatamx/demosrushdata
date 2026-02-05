"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Download,
  Sparkles,
  Package,
} from "lucide-react";
import forecastData from "../../../../../public/data/forecasting.json";

export default function OrdersPage() {
  const { ordenes_compra } = forecastData;

  const totalCost = ordenes_compra.reduce((s, o) => s + o.costo_total, 0);
  const highPriority = ordenes_compra.filter((o) => o.prioridad === "alta");

  const prioridadColors = {
    alta: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    media: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    baja: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              Generado por IA
            </Badge>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Ordenes de Compra Sugeridas</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Basado en forecast de 7 dias y stock actual
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Orden
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Costo Total Estimado</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toLocaleString("es-MX")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Items a Ordenar</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordenes_compra.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prioridad Alta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highPriority.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Perecederos con stock bajo</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-muted-foreground">Ingrediente</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Stock Actual</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Demanda 7d</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Cant. Sugerida</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Precio/U</th>
                  <th className="text-right p-3 font-medium text-muted-foreground">Costo Total</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Proveedor</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {ordenes_compra.map((orden) => (
                  <tr key={orden.ingrediente} className="border-b border-border/50">
                    <td className="p-3 font-medium">{orden.ingrediente}</td>
                    <td className="p-3 text-right tabular-nums">
                      <span className={orden.stock_actual < 10 ? "text-red-600 font-medium" : ""}>
                        {orden.stock_actual} {orden.unidad}
                      </span>
                    </td>
                    <td className="p-3 text-right tabular-nums">{orden.demanda_7d} {orden.unidad}</td>
                    <td className="p-3 text-right tabular-nums font-medium">{orden.cantidad_sugerida} {orden.unidad}</td>
                    <td className="p-3 text-right tabular-nums">${orden.precio_unitario}</td>
                    <td className="p-3 text-right tabular-nums font-bold">${orden.costo_total.toLocaleString("es-MX")}</td>
                    <td className="p-3 text-sm text-muted-foreground">{orden.proveedor}</td>
                    <td className="p-3 text-center">
                      <Badge className={`text-xs ${prioridadColors[orden.prioridad as keyof typeof prioridadColors]}`}>
                        {orden.prioridad}
                      </Badge>
                    </td>
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
