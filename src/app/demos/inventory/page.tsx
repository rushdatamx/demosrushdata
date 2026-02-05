"use client";

import {
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Activity,
  Calendar,
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
import data from "../../../../public/data/inventory.json";

const getZonaBadgeVariant = (zona: string) => {
  switch (zona) {
    case "rojo":
      return "destructive";
    case "amarillo":
      return "outline";
    case "verde":
      return "default";
    default:
      return "secondary";
  }
};

const getZonaBadgeLabel = (zona: string) => {
  switch (zona) {
    case "rojo":
      return "7 días";
    case "amarillo":
      return "30 días";
    case "verde":
      return "3 meses";
    default:
      return zona;
  }
};

export default function InventoryRadarPage() {
  const { kpis, radar_stats, inventario_critico, prediccion_estacional } = data;

  // Generate radar dots based on zones
  const generateRadarDots = () => {
    const dots: Array<{x: number; y: number; color: string; id: number}> = [];
    const zones = [
      { count: radar_stats.rojo, radius: 70, color: "#ef4444" },
      { count: radar_stats.amarillo, radius: 130, color: "#eab308" },
      { count: radar_stats.verde, radius: 190, color: "#22c55e" },
    ];

    let dotId = 0;
    zones.forEach(({ count, radius, color }) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI + Math.random() * 0.3;
        const radiusVariation = radius + (Math.random() - 0.5) * 20;
        const x = 250 + radiusVariation * Math.cos(angle);
        const y = 250 + radiusVariation * Math.sin(angle);
        dots.push({ x, y, color, id: dotId++ });
      }
    });

    return dots;
  };

  const radarDots = generateRadarDots();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Radar de Inventario</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Monitoreo en tiempo real de caducidades y riesgos
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-900">
              Lotes por Caducar 7d
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">
              {kpis.lotes_por_caducar_7d}
            </div>
            <p className="text-xs text-red-600 mt-1">
              ${kpis.lotes_por_caducar_7d > 0 ? radar_stats.valor_riesgo_rojo.toLocaleString() : 0} en riesgo
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">
              Lotes por Caducar 30d
            </CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-700">
              {kpis.lotes_por_caducar_30d}
            </div>
            <p className="text-xs text-yellow-600 mt-1">
              ${radar_stats.valor_riesgo_amarillo.toLocaleString()} en riesgo
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Valor en Riesgo
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">
              ${kpis.valor_en_riesgo.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              {((kpis.valor_en_riesgo / kpis.valor_inventario) * 100).toFixed(1)}% del inventario
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">
              Anomalías Detectadas
            </CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700">
              {kpis.anomalias_detectadas}
            </div>
            <p className="text-xs text-orange-600 mt-1">
              Controlados monitoreados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Radar Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Radar de Caducidad
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Distribución de lotes por zona de riesgo temporal
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <svg width="500" height="500" viewBox="0 0 500 500" className="max-w-full">
            {/* Background */}
            <rect width="500" height="500" fill="#f8fafc" />

            {/* Concentric circles */}
            <circle cx="250" cy="250" r="220" fill="none" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="250" cy="250" r="190" fill="#f0fdf4" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" />
            <circle cx="250" cy="250" r="130" fill="#fefce8" fillOpacity="0.3" stroke="#eab308" strokeWidth="2" strokeDasharray="5,5" />
            <circle cx="250" cy="250" r="70" fill="#fef2f2" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />

            {/* Center point */}
            <circle cx="250" cy="250" r="8" fill="#0ea5e9" />

            {/* Grid lines */}
            <line x1="250" y1="30" x2="250" y2="470" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
            <line x1="30" y1="250" x2="470" y2="250" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
            <line x1="105" y1="105" x2="395" y2="395" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
            <line x1="395" y1="105" x2="105" y2="395" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />

            {/* Radar dots */}
            {radarDots.map((dot) => (
              <circle
                key={dot.id}
                cx={dot.x}
                cy={dot.y}
                r="4"
                fill={dot.color}
                opacity="0.8"
                className="hover:opacity-100 transition-opacity"
              >
                <title>Lote en zona de riesgo</title>
              </circle>
            ))}

            {/* Labels */}
            <text x="250" y="60" textAnchor="middle" className="text-xs font-semibold" fill="#22c55e">
              3 meses ({radar_stats.verde})
            </text>
            <text x="250" y="130" textAnchor="middle" className="text-xs font-semibold" fill="#eab308">
              30 días ({radar_stats.amarillo})
            </text>
            <text x="250" y="185" textAnchor="middle" className="text-xs font-semibold" fill="#ef4444">
              7 días ({radar_stats.rojo})
            </text>
            <text x="250" y="245" textAnchor="middle" className="text-xs font-bold" fill="#0ea5e9">
              HOY
            </text>
          </svg>

          {/* Legend */}
          <div className="flex gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-foreground">Zona Roja (7d): {radar_stats.rojo} lotes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-foreground">Zona Amarilla (30d): {radar_stats.amarillo} lotes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-foreground">Zona Verde (3m): {radar_stats.verde} lotes</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Inventario Crítico
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Lotes que requieren atención inmediata
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sucursal</TableHead>
                  <TableHead>Medicamento</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead>Fecha Caducidad</TableHead>
                  <TableHead className="text-right">Días</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Zona</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventario_critico.map((item, index) => (
                  <TableRow key={index} className={item.zona_caducidad === "rojo" ? "bg-red-50" : item.zona_caducidad === "amarillo" ? "bg-yellow-50" : ""}>
                    <TableCell className="font-medium text-sm">{item.sucursal}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.medicamento}</span>
                        <span className="text-xs text-muted-foreground">{item.categoria}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.lote}</TableCell>
                    <TableCell className="text-sm">{item.fecha_caducidad}</TableCell>
                    <TableCell className="text-right">
                      <span className={`font-semibold ${item.dias_para_caducidad < 0 ? "text-red-600" : item.dias_para_caducidad <= 7 ? "text-red-500" : "text-yellow-600"}`}>
                        {item.dias_para_caducidad}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{item.stock}</TableCell>
                    <TableCell className="text-right">${item.valor.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getZonaBadgeVariant(item.zona_caducidad)}>
                        {getZonaBadgeLabel(item.zona_caducidad)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Predicción Estacional
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Proyecciones de demanda basadas en tendencias estacionales
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {prediccion_estacional.map((pred, index) => (
              <Card key={index} className="border-blue-200 bg-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-blue-900">
                    {pred.semana}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge className="bg-blue-600">{pred.temporada}</Badge>
                  <p className="text-sm text-blue-800 font-medium">
                    {pred.incremento_esperado}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-blue-700">
                    <Activity className="h-3 w-3" />
                    <span>Confianza: {pred.confianza}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
