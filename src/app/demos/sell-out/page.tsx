import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Package,
  AlertTriangle,
  Clock,
  TrendingUp,
  Store,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import dashboardData from "../../../../public/data/sell-out.json";
import { SalesChart } from "@/components/sell-out/sales-chart";
import { TopProductsTable } from "@/components/sell-out/top-products-table";

export default function SellOutDashboard() {
  const { kpis, ventas_tendencia, top_productos, alertas } = dashboardData;

  const alertasQuiebre = alertas.filter((a) => a.tipo === "quiebre").length;
  const alertasCritico = alertas.filter((a) => a.tipo === "stock_critico").length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Vista general de GALLETAS CRUNCH · Actualizado: {kpis.fecha_actualizacion}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventas (30 dias)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpis.ventas_totales.toLocaleString("es-MX")}</div>
            <div className="flex items-center gap-1 mt-1">
              {kpis.variacion_ventas >= 0 ? <ArrowUpRight className="h-3 w-3 text-green-600" /> : <ArrowDownRight className="h-3 w-3 text-red-600" />}
              <span className={`text-xs font-medium ${kpis.variacion_ventas >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kpis.variacion_ventas >= 0 ? '+' : ''}{kpis.variacion_ventas}%
              </span>
              <span className="text-xs text-muted-foreground">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unidades Vendidas</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.unidades_vendidas.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1">
              {kpis.variacion_unidades >= 0 ? <ArrowUpRight className="h-3 w-3 text-green-600" /> : <ArrowDownRight className="h-3 w-3 text-red-600" />}
              <span className={`text-xs font-medium ${kpis.variacion_unidades >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kpis.variacion_unidades >= 0 ? '+' : ''}{kpis.variacion_unidades}%
              </span>
              <span className="text-xs text-muted-foreground">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{alertas.length}</div>
            <div className="flex gap-2 mt-1">
              <Badge variant="destructive" className="text-xs">{alertasQuiebre} quiebres</Badge>
              <Badge variant="secondary" className="text-xs">{alertasCritico} criticos</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">DOS Promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.dos_promedio} dias</div>
            <p className="text-xs text-muted-foreground mt-1">Dias de inventario disponible</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tiendas con Quiebre</CardTitle>
            <Store className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-600">{kpis.tiendas_con_quiebre}</span>
              <span className="text-sm text-muted-foreground">/ {kpis.total_tiendas}</span>
            </div>
            <p className="text-xs text-red-600 mt-1">{kpis.pct_tiendas_quiebre}% de tiendas afectadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Productos en Catalogo</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.total_productos}</div>
            <p className="text-xs text-muted-foreground mt-1">{kpis.productos_con_quiebre} con quiebre en alguna tienda</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cobertura de Tiendas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.total_tiendas}</div>
            <p className="text-xs text-muted-foreground mt-1">Tiendas activas en la cadena</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Tendencia de Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart data={ventas_tendencia} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Top Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProductsTable products={top_productos} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
