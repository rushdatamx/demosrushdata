"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";
import data from "../../../../public/data/field-sales.json";

export default function FieldSalesDashboard() {
  const { kpis, vendedores, tiendas_sin_visita, ruta_del_dia } = data;

  // Calculate percentage achievement
  const metaAchievement = ((kpis.monto_hoy / kpis.meta_diaria_equipo) * 100).toFixed(1);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard del Gerente</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitoreo en tiempo real de vendedores y cobertura</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendedores Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.vendedores_activos}</div>
            <p className="text-xs text-muted-foreground">En ruta hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cobertura 7 dias</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.cobertura_7d.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {kpis.tiendas_totales - kpis.tiendas_sin_visita_7d} de {kpis.tiendas_totales} tiendas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Hoy</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.pedidos_hoy}</div>
            <p className="text-xs text-muted-foreground">Pedidos registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monto Hoy vs Meta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(kpis.monto_hoy / 1000).toFixed(1)}k
            </div>
            <p className="text-xs text-muted-foreground">
              {metaAchievement}% de meta (${(kpis.meta_diaria_equipo / 1000).toFixed(0)}k)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Map and Stores Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mapa de Tiendas - Cobertura Semanal</CardTitle>
            <p className="text-sm text-muted-foreground">
              Verde: visitadas en 7 dias | Rojo: sin visita 7+ dias
            </p>
          </CardHeader>
          <CardContent>
            <svg viewBox="0 0 800 500" className="w-full border rounded-lg bg-slate-50">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="800" height="500" fill="url(#grid)" />

              {/* Tiendas sin visita (red dots) */}
              {tiendas_sin_visita.slice(0, 30).map((tienda) => (
                <circle
                  key={`no-visit-${tienda.id}`}
                  cx={tienda.x}
                  cy={tienda.y}
                  r="5"
                  fill="#ef4444"
                  opacity="0.7"
                  stroke="#dc2626"
                  strokeWidth="1"
                >
                  <title>{tienda.nombre} - Sin visita {tienda.ultima_visita_dias} dias</title>
                </circle>
              ))}

              {/* Ruta del dia (green dots for visited, orange for pending) */}
              {ruta_del_dia.map((stop) => (
                <circle
                  key={`route-${stop.orden}`}
                  cx={stop.x}
                  cy={stop.y}
                  r="6"
                  fill={stop.visitada ? "#22c55e" : "#f59e0b"}
                  opacity="0.8"
                  stroke={stop.visitada ? "#16a34a" : "#d97706"}
                  strokeWidth="2"
                >
                  <title>{stop.tienda} - {stop.visitada ? `Visitada ${stop.hora_visita}` : 'Pendiente'}</title>
                </circle>
              ))}

              {/* Route lines for Juan Perez's route */}
              {ruta_del_dia.slice(0, -1).map((stop, idx) => {
                const nextStop = ruta_del_dia[idx + 1];
                return (
                  <line
                    key={`line-${idx}`}
                    x1={stop.x}
                    y1={stop.y}
                    x2={nextStop.x}
                    y2={nextStop.y}
                    stroke="#3b82f6"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    opacity="0.4"
                  />
                );
              })}
            </svg>
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Visitadas (7d)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Sin visita (7+ dias)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Ruta pendiente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tiendas sin visita list */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Tiendas Sin Visita
            </CardTitle>
            <p className="text-sm text-muted-foreground">7+ dias sin cobertura</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {tiendas_sin_visita.slice(0, 15).map((tienda) => {
                const vendedor = vendedores.find(v => v.id === tienda.vendedor_id);
                return (
                  <div key={tienda.id} className="border-b pb-2 last:border-b-0">
                    <div className="font-medium text-sm">{tienda.nombre}</div>
                    <div className="text-xs text-muted-foreground">{tienda.direccion}</div>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">
                        {vendedor?.nombre}
                      </Badge>
                      <span className="text-xs text-red-600 font-medium">
                        {tienda.ultima_visita_dias}d
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendedor Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rendimiento de Vendedores</CardTitle>
          <p className="text-sm text-muted-foreground">Metricas de cobertura y ventas por vendedor</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead>Zona</TableHead>
                <TableHead className="text-right">Tiendas Asignadas</TableHead>
                <TableHead className="text-right">Visitadas (7d)</TableHead>
                <TableHead className="text-right">Cobertura</TableHead>
                <TableHead className="text-right">Pedidos Hoy</TableHead>
                <TableHead className="text-right">Monto Hoy</TableHead>
                <TableHead className="text-right">vs Meta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendedores
                .sort((a, b) => b.cobertura_pct - a.cobertura_pct)
                .map((vendedor) => {
                  const metaPct = (vendedor.monto_hoy / vendedor.meta_diaria) * 100;
                  const coberturaColor =
                    vendedor.cobertura_pct >= 60 ? "text-green-600" :
                    vendedor.cobertura_pct >= 45 ? "text-yellow-600" :
                    "text-red-600";

                  return (
                    <TableRow key={vendedor.id}>
                      <TableCell className="font-medium">{vendedor.nombre}</TableCell>
                      <TableCell>{vendedor.zona}</TableCell>
                      <TableCell className="text-right">{vendedor.tiendas_asignadas}</TableCell>
                      <TableCell className="text-right">
                        {vendedor.visitadas_7d}
                        <span className="text-muted-foreground text-xs ml-1">
                          ({vendedor.no_visitadas_7d} sin)
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-medium ${coberturaColor}`}>
                          {vendedor.cobertura_pct.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{vendedor.pedidos_hoy}</TableCell>
                      <TableCell className="text-right">
                        ${vendedor.monto_hoy.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={metaPct >= 100 ? "default" : metaPct >= 75 ? "secondary" : "outline"}>
                          {metaPct.toFixed(0)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
