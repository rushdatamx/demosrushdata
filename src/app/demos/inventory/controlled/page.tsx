"use client";

import {
  Shield,
  AlertTriangle,
  Activity,
  FileText,
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

const getTipoBadgeVariant = (tipo: string) => {
  switch (tipo) {
    case "Dispensacion":
      return "default";
    case "Entrada":
      return "outline";
    case "Ajuste":
      return "secondary";
    default:
      return "secondary";
  }
};

export default function ControlledPage() {
  const { kpis, log_controlados } = data;

  const totalAnomalias = log_controlados.filter((log) => log.anomalia).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Medicamentos Controlados</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Registro de auditoría y detección de anomalías en sustancias controladas
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total Controlados
            </CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">
              {kpis.controlados_monitoreados}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Medicamentos bajo monitoreo
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-900">
              Anomalías Detectadas
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">
              {totalAnomalias}
            </div>
            <p className="text-xs text-red-600 mt-1">
              Requieren investigación
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Registros Totales
            </CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">
              {log_controlados.length}
            </div>
            <p className="text-xs text-green-600 mt-1">
              Movimientos registrados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Registro de Auditoría
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Historial completo de movimientos de sustancias controladas
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Medicamento</TableHead>
                  <TableHead>Sucursal</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Receta</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {log_controlados.map((log, index) => (
                  <TableRow
                    key={index}
                    className={log.anomalia ? "bg-red-50 border-l-4 border-red-500" : ""}
                  >
                    <TableCell className="font-medium text-sm">
                      {log.fecha}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-blue-900">{log.medicamento}</span>
                    </TableCell>
                    <TableCell className="text-sm">{log.sucursal}</TableCell>
                    <TableCell>
                      <Badge variant={getTipoBadgeVariant(log.tipo)}>
                        {log.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {log.cantidad}
                    </TableCell>
                    <TableCell className="text-sm">{log.responsable}</TableCell>
                    <TableCell>
                      {log.receta ? (
                        <span className="font-mono text-xs text-muted-foreground">
                          {log.receta}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Sin receta</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {log.anomalia ? (
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <Badge variant="destructive" className="text-xs">
                              Anomalía
                            </Badge>
                          </div>
                          {log.nota_anomalia && (
                            <div className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded border border-red-300 mt-1 max-w-xs">
                              {log.nota_anomalia}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          Normal
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Warning Box */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-red-900">
              <p className="font-semibold">Sistema de Detección de Anomalías</p>
              <ul className="list-disc list-inside space-y-1 text-red-800">
                <li>
                  <strong>Patrón de consumo:</strong> Detecta consumos fuera del rango estadístico normal (±2 desviaciones estándar)
                </li>
                <li>
                  <strong>Receta faltante:</strong> Señala movimientos sin receta asociada
                </li>
                <li>
                  <strong>Frecuencia inusual:</strong> Identifica ajustes repetitivos en corto período
                </li>
                <li>
                  <strong>Auditoría completa:</strong> Todos los movimientos son rastreables por responsable, fecha y sucursal
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-blue-900">
              <p className="font-semibold">Medicamentos controlados en el sistema:</p>
              <div className="grid grid-cols-2 gap-4 text-blue-800 mt-3">
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="font-semibold text-blue-900">Clonazepam 2mg</p>
                  <p className="text-xs text-blue-700">Ansiolítico - Tabla II COFEPRIS</p>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="font-semibold text-blue-900">Tramadol 50mg</p>
                  <p className="text-xs text-blue-700">Analgésico - Tabla III COFEPRIS</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
