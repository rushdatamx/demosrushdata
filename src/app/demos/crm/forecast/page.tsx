"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DollarSign,
  TrendingUp,
  Target,
  Users,
} from "lucide-react";
import crmData from "../../../../../public/data/crm.json";
import { ForecastChart } from "@/components/crm/forecast-chart";

export default function ForecastPage() {
  const { forecast_revenue, vendedores, oportunidades, kpis } = crmData;

  // Per-seller stats
  const vendedorStats = vendedores.map((v) => {
    const oppsByVendor = oportunidades.filter((o) => o.vendedor === v.nombre);
    const cierres = oppsByVendor.filter((o) => o.etapa === "Cierre");
    const pipeline = oppsByVendor.filter((o) => !["Cierre", "Perdido"].includes(o.etapa));
    return {
      ...v,
      pipeline_count: pipeline.length,
      pipeline_valor: pipeline.reduce((s, o) => s + o.valor, 0),
      cierres_count: cierres.length,
      cierres_valor: cierres.reduce((s, o) => s + o.valor, 0),
      weighted: pipeline.reduce((s, o) => s + o.valor * o.probabilidad / 100, 0),
    };
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Forecast de Revenue</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Pronostico de ingresos basado en pipeline y modelo IA
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {forecast_revenue.map((f) => (
          <Card key={f.mes}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{f.mes}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(f.forecast_ia / 1000000).toFixed(2)}M</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">Meta: ${(f.meta / 1000000).toFixed(1)}M</Badge>
                <Badge variant="secondary" className="text-xs">
                  Pipeline: ${(f.pipeline / 1000000).toFixed(2)}M
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Forecast Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base font-medium">Comparativa: Meta vs Pipeline vs Forecast IA</CardTitle>
        </CardHeader>
        <CardContent>
          <ForecastChart data={forecast_revenue} />
        </CardContent>
      </Card>

      {/* Vendedor Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Rendimiento por Vendedor
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-right">Oportunidades</TableHead>
                <TableHead className="text-right">Pipeline</TableHead>
                <TableHead className="text-right">Weighted Pipeline</TableHead>
                <TableHead className="text-right">Cierres</TableHead>
                <TableHead className="text-right">Revenue Cerrado</TableHead>
                <TableHead className="text-right">Meta Mensual</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendedorStats.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.nombre}</TableCell>
                  <TableCell className="text-right tabular-nums">{v.pipeline_count}</TableCell>
                  <TableCell className="text-right tabular-nums">${(v.pipeline_valor / 1000).toFixed(0)}k</TableCell>
                  <TableCell className="text-right tabular-nums">${(v.weighted / 1000).toFixed(0)}k</TableCell>
                  <TableCell className="text-right tabular-nums">{v.cierres_count}</TableCell>
                  <TableCell className="text-right tabular-nums font-medium">${(v.cierres_valor / 1000).toFixed(0)}k</TableCell>
                  <TableCell className="text-right tabular-nums">${(v.meta_mensual / 1000).toFixed(0)}k</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
