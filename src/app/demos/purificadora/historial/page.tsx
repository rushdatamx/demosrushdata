"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import data from "../../../../../public/data/purificadora.json";
import { GarrafonesChart } from "@/components/purificadora/garrafones-chart";

export default function HistorialPage() {
  const [search, setSearch] = useState("");
  const { historial, garrafones_por_semana } = data;

  const filtered = useMemo(() => {
    if (!search) return historial.slice(0, 50);
    const q = search.toLowerCase();
    return historial
      .filter(
        (v) =>
          v.cliente_nombre.toLowerCase().includes(q) ||
          v.cliente_colonia.toLowerCase().includes(q) ||
          v.producto_nombre.toLowerCase().includes(q) ||
          v.fecha_ruta.includes(q) ||
          String(v.numero_venta).includes(q)
      )
      .slice(0, 50);
  }, [search, historial]);

  const totalIngresos = historial.reduce((s, v) => s + v.monto_total, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Historial de Entregas</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {historial.length} entregas completadas · ${totalIngresos.toLocaleString("es-MX")} en ingresos
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base font-medium">Garrafones por Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <GarrafonesChart data={garrafones_por_semana} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Entregas</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, producto, fecha..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]"># Venta</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead>Fuente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((venta) => (
                <TableRow key={venta.id}>
                  <TableCell className="font-mono text-xs">{venta.numero_venta}</TableCell>
                  <TableCell className="text-sm">{venta.fecha_ruta}</TableCell>
                  <TableCell className="text-sm font-medium">{venta.cliente_nombre}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{venta.producto_nombre}</TableCell>
                  <TableCell className="text-right text-sm">{venta.cantidad} {venta.unidad}</TableCell>
                  <TableCell className="text-right text-sm font-medium">${venta.monto_total.toLocaleString("es-MX")}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {venta.metodo_pago === "efectivo" ? "Efectivo" : venta.metodo_pago === "transferencia" ? "Transferencia" : "Credito"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px]">
                      {venta.fuente === "tiburcio" ? "WhatsApp" : "Admin"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 50 && (
            <p className="text-xs text-muted-foreground text-center mt-4">
              Mostrando los primeros 50 resultados
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
