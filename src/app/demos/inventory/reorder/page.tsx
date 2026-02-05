"use client";

import {
  RefreshCw,
  Package,
  TrendingUp,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import data from "../../../../../public/data/inventory.json";

const getPrioridadBadgeVariant = (prioridad: string) => {
  switch (prioridad) {
    case "alta":
      return "destructive";
    case "media":
      return "outline";
    case "baja":
      return "secondary";
    default:
      return "default";
  }
};

const getPrioridadColor = (prioridad: string) => {
  switch (prioridad) {
    case "alta":
      return "bg-red-50";
    case "media":
      return "bg-yellow-50";
    default:
      return "";
  }
};

export default function ReorderPage() {
  const { reorden } = data;

  // Sort by priority and days of coverage
  const sortedReorden = [...reorden].sort((a, b) => {
    const priorityOrder = { alta: 0, media: 1, baja: 2 };
    const aPriority = priorityOrder[a.prioridad as keyof typeof priorityOrder] ?? 3;
    const bPriority = priorityOrder[b.prioridad as keyof typeof priorityOrder] ?? 3;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    return a.dias_cobertura - b.dias_cobertura;
  });

  const itemsNeedingReorder = reorden.filter((item) => item.necesita_reorden).length;
  const itemsWithSeasonalAdjustment = reorden.filter(
    (item) => item.nota_estacional !== null
  ).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Reorden Inteligente</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Sugerencias de compra basadas en consumo y tendencias estacionales
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total de Productos
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">
              {reorden.length}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Medicamentos monitoreados
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">
              Requieren Reorden
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700">
              {itemsNeedingReorder}
            </div>
            <p className="text-xs text-orange-600 mt-1">
              Items bajo punto de reorden
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Ajuste Estacional
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">
              {itemsWithSeasonalAdjustment}
            </div>
            <p className="text-xs text-green-600 mt-1">
              Items con predicción estacional
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reorder Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-blue-600" />
            Análisis de Reorden
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Recomendaciones de compra priorizadas por cobertura y demanda
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicamento</TableHead>
                  <TableHead className="text-right">Stock Actual</TableHead>
                  <TableHead className="text-right">Consumo Diario</TableHead>
                  <TableHead className="text-right">Días Cobertura</TableHead>
                  <TableHead className="text-right">Punto Reorden</TableHead>
                  <TableHead className="text-right">Cant. Sugerida</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Notas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedReorden.map((item, index) => (
                  <TableRow key={index} className={getPrioridadColor(item.prioridad)}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.medicamento}</span>
                        <span className="text-xs text-muted-foreground">{item.categoria}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {item.stock_actual.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.consumo_diario.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-semibold ${
                          item.dias_cobertura < 30
                            ? "text-red-600"
                            : item.dias_cobertura < 60
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {item.dias_cobertura.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.punto_reorden}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-semibold ${
                          item.cantidad_sugerida > 0
                            ? "text-blue-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.cantidad_sugerida > 0
                          ? item.cantidad_sugerida.toLocaleString()
                          : "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPrioridadBadgeVariant(item.prioridad)}>
                        {item.prioridad}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.nota_estacional ? (
                        <div className="flex items-start gap-2 max-w-xs">
                          <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                            {item.nota_estacional}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-blue-900">
              <p className="font-semibold">Cómo funciona el sistema de reorden:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>
                  <strong>Días de cobertura:</strong> Calculado como stock actual / consumo diario promedio
                </li>
                <li>
                  <strong>Punto de reorden:</strong> Umbral dinámico basado en lead time y variabilidad
                </li>
                <li>
                  <strong>Ajuste estacional:</strong> Incrementa pedidos anticipando temporadas de alta demanda
                </li>
                <li>
                  <strong>Prioridad alta:</strong> Medicamentos con menos de 30 días de cobertura
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
