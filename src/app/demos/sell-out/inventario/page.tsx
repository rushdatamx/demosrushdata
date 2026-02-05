"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, AlertTriangle, CheckCircle, ChevronDown } from "lucide-react";
import dashboardData from "../../../../../public/data/sell-out.json";

type StatusFilter = "all" | "ok" | "bajo" | "critico" | "agotado";

const uniqueStores = Array.from(new Set(dashboardData.inventario.map(i => i.tienda))).sort();

const statusConfig = {
  ok: { label: "OK", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  bajo: { label: "Bajo", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  critico: { label: "Critico", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
  agotado: { label: "Agotado", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
};

export default function InventarioPage() {
  const { inventario } = dashboardData;
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState<string>("all");

  const stats = useMemo(() => ({
    ok: inventario.filter((i) => i.estado === "ok").length,
    bajo: inventario.filter((i) => i.estado === "bajo").length,
    critico: inventario.filter((i) => i.estado === "critico").length,
    agotado: inventario.filter((i) => i.estado === "agotado").length,
  }), [inventario]);

  const filteredData = useMemo(() => {
    return inventario.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.estado === statusFilter;
      const matchesStore = selectedStore === "all" || item.tienda === selectedStore;
      const matchesSearch = searchTerm === "" || item.producto.toLowerCase().includes(searchTerm.toLowerCase()) || item.tienda.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesStore && matchesSearch;
    });
  }, [inventario, statusFilter, selectedStore, searchTerm]);

  const filteredTotalValue = useMemo(() => filteredData.reduce((sum, item) => sum + item.costo, 0), [filteredData]);

  const formatProductName = (fullName: string) => {
    const parts = fullName.split(" ");
    if (/^\d+$/.test(parts[0])) return parts.slice(1).join(" ");
    return fullName;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Inventario</h1>
        <p className="text-muted-foreground text-sm mt-1">Stock actual por tienda y producto · {inventario.length} registros</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className={`cursor-pointer transition-all ${statusFilter === "ok" ? "ring-2 ring-green-500" : ""}`} onClick={() => setStatusFilter(statusFilter === "ok" ? "all" : "ok")}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div><p className="text-2xl font-bold text-green-600">{stats.ok}</p><p className="text-xs text-muted-foreground">Stock OK</p></div>
            </div>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-all ${statusFilter === "bajo" ? "ring-2 ring-yellow-500" : ""}`} onClick={() => setStatusFilter(statusFilter === "bajo" ? "all" : "bajo")}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div><p className="text-2xl font-bold text-yellow-600">{stats.bajo}</p><p className="text-xs text-muted-foreground">Stock Bajo</p></div>
            </div>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-all ${statusFilter === "critico" ? "ring-2 ring-orange-500" : ""}`} onClick={() => setStatusFilter(statusFilter === "critico" ? "all" : "critico")}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div><p className="text-2xl font-bold text-orange-600">{stats.critico}</p><p className="text-xs text-muted-foreground">Critico</p></div>
            </div>
          </CardContent>
        </Card>
        <Card className={`cursor-pointer transition-all ${statusFilter === "agotado" ? "ring-2 ring-red-500" : ""}`} onClick={() => setStatusFilter(statusFilter === "agotado" ? "all" : "agotado")}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div><p className="text-2xl font-bold text-red-600">{stats.agotado}</p><p className="text-xs text-muted-foreground">Agotado</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="text" placeholder="Buscar por producto..." className="flex h-10 w-full sm:w-64 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <div className="relative">
            <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} className="flex h-10 w-full sm:w-64 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none cursor-pointer">
              <option value="all">Todas las tiendas</option>
              {uniqueStores.map((store) => (<option key={store} value={store}>{store}</option>))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-md">
            <span className="text-sm text-muted-foreground">Valor filtrado:</span>
            <span className="text-sm font-semibold">${filteredTotalValue.toLocaleString("es-MX")}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant={statusFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setStatusFilter("all")}>Todos</Button>
          {(["agotado", "critico", "bajo", "ok"] as const).map((status) => (
            <Button key={status} variant={statusFilter === status ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(status)}>{statusConfig[status].label}</Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tienda</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Unidades</TableHead>
                  <TableHead className="text-right">Costo</TableHead>
                  <TableHead className="text-right">DOS</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.slice(0, 100).map((item, index) => {
                  const config = statusConfig[item.estado as keyof typeof statusConfig];
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-sm">{item.tienda}</TableCell>
                      <TableCell className="text-sm">{formatProductName(item.producto)}</TableCell>
                      <TableCell className="text-right tabular-nums">{item.unidades.toLocaleString()}</TableCell>
                      <TableCell className="text-right tabular-nums">${item.costo.toLocaleString("es-MX")}</TableCell>
                      <TableCell className="text-right tabular-nums">{item.dos} dias</TableCell>
                      <TableCell className="text-center"><Badge className={config.color}>{config.label}</Badge></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredData.length > 100 && (
        <p className="text-center text-sm text-muted-foreground mt-4">Mostrando 100 de {filteredData.length} registros</p>
      )}
    </div>
  );
}
