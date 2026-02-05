"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Package, Store } from "lucide-react";
import dashboardData from "../../../../../public/data/sell-out.json";
import { SalesChart } from "@/components/sell-out/sales-chart";

export default function VentasPage() {
  const { ventas, ventas_tendencia, top_productos, top_tiendas, kpis } = dashboardData;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVentas = useMemo(() => {
    if (!searchTerm) return ventas;
    return ventas.filter(
      (v) => v.producto.toLowerCase().includes(searchTerm.toLowerCase()) || v.tienda.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [ventas, searchTerm]);

  const formatProductName = (fullName: string) => {
    const parts = fullName.split(" ");
    if (/^\d+$/.test(parts[0])) return parts.slice(1).join(" ");
    return fullName;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Ventas</h1>
        <p className="text-muted-foreground text-sm mt-1">Analisis de sell-out por tienda y producto</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventas Totales (30 dias)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">${kpis.ventas_totales.toLocaleString("es-MX")}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unidades Vendidas</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{kpis.unidades_vendidas.toLocaleString()}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tiendas Activas</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{kpis.total_tiendas}</div></CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader><CardTitle className="text-base font-medium">Tendencia de Ventas (ultimos 30 dias)</CardTitle></CardHeader>
        <CardContent><SalesChart data={ventas_tendencia} /></CardContent>
      </Card>

      <Tabs defaultValue="productos" className="mb-8">
        <TabsList>
          <TabsTrigger value="productos">Top Productos</TabsTrigger>
          <TabsTrigger value="tiendas">Top Tiendas</TabsTrigger>
        </TabsList>
        <TabsContent value="productos">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead className="text-right">Ventas</TableHead>
                    <TableHead className="text-right">Unidades</TableHead>
                    <TableHead className="text-right">% del Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {top_productos.map((producto, index) => (
                    <TableRow key={producto.upc}>
                      <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                      <TableCell className="font-medium">{formatProductName(producto.producto)}</TableCell>
                      <TableCell className="text-right tabular-nums">${producto.monto.toLocaleString("es-MX")}</TableCell>
                      <TableCell className="text-right tabular-nums">{producto.unidades.toLocaleString()}</TableCell>
                      <TableCell className="text-right"><Badge variant="secondary">{((producto.monto / kpis.ventas_totales) * 100).toFixed(1)}%</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tiendas">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Tienda</TableHead>
                    <TableHead className="text-right">Ventas</TableHead>
                    <TableHead className="text-right">Unidades</TableHead>
                    <TableHead className="text-right">% del Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {top_tiendas.map((tienda, index) => (
                    <TableRow key={tienda.id_tienda}>
                      <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                      <TableCell className="font-medium">{tienda.tienda}</TableCell>
                      <TableCell className="text-right tabular-nums">${tienda.monto.toLocaleString("es-MX")}</TableCell>
                      <TableCell className="text-right tabular-nums">{tienda.unidades.toLocaleString()}</TableCell>
                      <TableCell className="text-right"><Badge variant="secondary">{((tienda.monto / kpis.ventas_totales) * 100).toFixed(1)}%</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-base font-medium">Detalle de Ventas por Tienda-Producto</CardTitle>
            <input type="text" placeholder="Buscar..." className="flex h-9 w-full sm:w-64 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tienda</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="text-right">Unidades</TableHead>
                  <TableHead className="text-right">Precio Prom.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVentas.slice(0, 50).map((venta, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-sm">{venta.tienda}</TableCell>
                    <TableCell className="text-sm">{formatProductName(venta.producto)}</TableCell>
                    <TableCell className="text-right tabular-nums">${venta.monto.toLocaleString("es-MX")}</TableCell>
                    <TableCell className="text-right tabular-nums">{venta.unidades.toLocaleString()}</TableCell>
                    <TableCell className="text-right tabular-nums">${venta.precio_promedio.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredVentas.length > 50 && (
        <p className="text-center text-sm text-muted-foreground mt-4">Mostrando 50 de {filteredVentas.length} registros</p>
      )}
    </div>
  );
}
