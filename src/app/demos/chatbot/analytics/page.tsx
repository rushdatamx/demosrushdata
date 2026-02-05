"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  MessageCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Bot,
  Users,
  Zap,
  Star,
} from "lucide-react";
import chatbotData from "../../../../../public/data/chatbot.json";
import { ChatAnalyticsChart } from "@/components/chatbot/chat-analytics-chart";
import { HoursChart } from "@/components/chatbot/hours-chart";

export default function AnalyticsPage() {
  const { kpis, top_categorias, top_productos_consultados, conversaciones, tendencia, conversaciones_por_hora } = chatbotData;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Metricas de rendimiento del chatbot WhatsApp
        </p>
      </div>

      {/* KPIs Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpis.ventas_totales.toLocaleString("es-MX")}</div>
            <p className="text-xs text-muted-foreground mt-1">Generadas via chatbot</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ticket Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpis.ticket_promedio.toLocaleString("es-MX")}</div>
            <p className="text-xs text-muted-foreground mt-1">Por venta cerrada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Satisfaccion</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{kpis.satisfaccion}/5.0</div>
            <p className="text-xs text-muted-foreground mt-1">Calificacion promedio</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cotizaciones Pendientes</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{kpis.cotizaciones_pendientes}</div>
            <p className="text-xs text-muted-foreground mt-1">Por dar seguimiento</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Conversaciones y Ventas (30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChatAnalyticsChart data={tendencia} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Conversaciones por Hora</CardTitle>
            <p className="text-xs text-muted-foreground">Horario laboral: 8:00 - 20:00</p>
          </CardHeader>
          <CardContent>
            <HoursChart data={conversaciones_por_hora} />
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Top Categorias Consultadas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Consultas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top_categorias.map((cat, i) => (
                  <TableRow key={cat.categoria}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell className="font-medium capitalize">{cat.categoria}</TableCell>
                    <TableCell className="text-right tabular-nums">{cat.consultas}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Productos Mas Consultados</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Consultas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top_productos_consultados.slice(0, 8).map((prod, i) => (
                  <TableRow key={prod.producto}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell className="font-medium text-sm">{prod.producto}</TableCell>
                    <TableCell className="text-right tabular-nums">{prod.consultas}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Conversaciones Recientes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Historial de Conversaciones</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-center">Horario</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversaciones.slice(0, 20).map((conv) => (
                  <TableRow key={conv.id}>
                    <TableCell className="font-medium text-sm">{conv.cliente}</TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">{conv.producto_consultado}</TableCell>
                    <TableCell className="text-sm tabular-nums">{conv.fecha}</TableCell>
                    <TableCell className="text-center">
                      {conv.fuera_horario && (
                        <Badge variant="outline" className="text-xs text-purple-600 border-purple-200">
                          <Clock className="h-3 w-3 mr-1" />
                          Fuera
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={conv.estado === "completada" ? "default" : conv.estado === "cotizada" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {conv.estado === "completada" ? "Venta" : conv.estado === "cotizada" ? "Cotizada" : conv.estado === "en_proceso" ? "Activa" : "Sin resp."}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-sm">
                      {conv.monto_venta > 0 ? `$${conv.monto_venta.toLocaleString("es-MX")}` : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
