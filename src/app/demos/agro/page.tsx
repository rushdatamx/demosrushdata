"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  CloudRain,
  Droplets,
  Leaf,
  MapPin,
  Thermometer,
  TrendingUp,
  Wind,
  Sun,
  CloudSnow,
  Activity,
} from "lucide-react";
import agroData from "../../../../public/data/agro.json";

type Parcela = {
  id: number;
  nombre: string;
  hectareas: number;
  cultivo: string;
  etapa: string;
  salud_index: number;
  estado: string;
  ndvi: number;
  humedad_suelo: number;
  temperatura_suelo: number;
  rendimiento_estimado: number;
  rendimiento_anterior: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function AgroMapPage() {
  const [selectedParcela, setSelectedParcela] = useState<Parcela | null>(null);

  const getParcelaColor = (estado: string) => {
    switch (estado) {
      case "sano":
        return "#22c55e";
      case "estres":
        return "#eab308";
      case "critico":
        return "#ef4444";
      default:
        return "#9ca3af";
    }
  };

  const getEstadoBadgeVariant = (estado: string) => {
    switch (estado) {
      case "sano":
        return "default";
      case "estres":
        return "secondary";
      case "critico":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPrioridadBadgeVariant = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return "destructive";
      case "media":
        return "secondary";
      case "baja":
        return "outline";
      default:
        return "outline";
    }
  };

  const getWeatherIcon = (condicion: string) => {
    if (condicion.toLowerCase().includes("helada")) {
      return <CloudSnow className="w-6 h-6 text-blue-500" />;
    }
    if (condicion.toLowerCase().includes("lluvia")) {
      return <CloudRain className="w-6 h-6 text-blue-500" />;
    }
    if (condicion.toLowerCase().includes("soleado")) {
      return <Sun className="w-6 h-6 text-yellow-500" />;
    }
    return <CloudRain className="w-6 h-6 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Hectareas</p>
            </div>
            <p className="text-2xl font-bold">{agroData.kpis.total_hectareas}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-4 h-4 text-green-600" />
              <p className="text-sm text-muted-foreground">Sanas</p>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {agroData.kpis.parcelas_sanas}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <p className="text-sm text-muted-foreground">Estres</p>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {agroData.kpis.parcelas_estres}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="text-sm text-muted-foreground">Criticas</p>
            </div>
            <p className="text-2xl font-bold text-red-600">
              {agroData.kpis.parcelas_criticas}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">NDVI Prom.</p>
            </div>
            <p className="text-2xl font-bold">
              {agroData.kpis.ndvi_promedio.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <p className="text-sm text-muted-foreground">Alertas</p>
            </div>
            <p className="text-2xl font-bold text-orange-600">
              {agroData.kpis.alertas_activas}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Map Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Mapa de Parcelas - Estado de Salud
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* SVG Map */}
            <div className="flex-1">
              <div className="bg-muted/50 rounded-lg p-4 border">
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-auto max-h-[500px]"
                  style={{ maxWidth: "800px" }}
                >
                  {/* Background */}
                  <rect width="800" height="500" fill="hsl(var(--muted))" opacity="0.3" />

                  {/* Grid lines for reference */}
                  <defs>
                    <pattern
                      id="grid"
                      width="50"
                      height="50"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 50 0 L 0 0 0 50"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="800" height="500" fill="url(#grid)" />

                  {/* Parcelas */}
                  {agroData.parcelas.map((parcela) => (
                    <g
                      key={parcela.id}
                      onClick={() => setSelectedParcela(parcela)}
                      className="cursor-pointer transition-all hover:opacity-80"
                    >
                      <rect
                        x={parcela.x}
                        y={parcela.y}
                        width={parcela.width}
                        height={parcela.height}
                        fill={getParcelaColor(parcela.estado)}
                        stroke="#fff"
                        strokeWidth="3"
                        rx="4"
                        opacity={
                          selectedParcela?.id === parcela.id ? 1 : 0.85
                        }
                      />
                      <text
                        x={parcela.x + parcela.width / 2}
                        y={parcela.y + parcela.height / 2 - 8}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="11"
                        fontWeight="600"
                      >
                        {parcela.nombre}
                      </text>
                      <text
                        x={parcela.x + parcela.width / 2}
                        y={parcela.y + parcela.height / 2 + 8}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="10"
                      >
                        {parcela.salud_index.toFixed(1)}%
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500"></div>
                    <span className="text-sm font-medium">Sano</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-500"></div>
                    <span className="text-sm font-medium">Estres</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-500"></div>
                    <span className="text-sm font-medium">Critico</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parcela Detail Panel (when selected) */}
            {selectedParcela && (
              <div className="lg:w-80">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedParcela.nombre}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={getEstadoBadgeVariant(selectedParcela.estado)}>
                        {selectedParcela.estado.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{selectedParcela.etapa}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold">
                        {selectedParcela.cultivo}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedParcela.hectareas} hectareas
                      </p>
                    </div>

                    <div className="space-y-2 border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Indice de Salud
                        </span>
                        <span className="font-semibold">
                          {selectedParcela.salud_index.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          NDVI
                        </span>
                        <span className="font-semibold">
                          {selectedParcela.ndvi.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Droplets className="w-3 h-3" />
                          Humedad Suelo
                        </span>
                        <span className="font-semibold">
                          {selectedParcela.humedad_suelo.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Thermometer className="w-3 h-3" />
                          Temp. Suelo
                        </span>
                        <span className="font-semibold">
                          {selectedParcela.temperatura_suelo.toFixed(1)}°C
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Rendimiento Est.
                        </span>
                        <span className="font-semibold">
                          {selectedParcela.rendimiento_estimado.toFixed(1)} ton/ha
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Rendimiento Anterior
                        </span>
                        <span className="text-sm">
                          {selectedParcela.rendimiento_anterior.toFixed(1)} ton/ha
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertas Activas ({agroData.alertas.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agroData.alertas.map((alerta, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getPrioridadBadgeVariant(alerta.prioridad)}>
                        {alerta.prioridad.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{alerta.tipo}</Badge>
                    </div>
                    <h4 className="font-semibold text-sm">{alerta.titulo}</h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {alerta.descripcion}
                </p>
                <div className="bg-accent rounded p-2 mt-2">
                  <p className="text-sm font-medium">
                    Accion: {alerta.accion}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Parcelas afectadas: {alerta.parcelas_afectadas.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Climate Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="w-5 h-5" />
            Pronostico Climatico - 7 Dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {agroData.clima.map((dia, idx) => (
              <Card
                key={idx}
                className={`${
                  dia.riesgo_helada
                    ? "bg-blue-50 border-blue-300 dark:bg-blue-950/20 dark:border-blue-800"
                    : ""
                }`}
              >
                <CardContent className="pt-4 text-center">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    {dia.dia}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(dia.fecha).toLocaleDateString("es-MX", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(dia.condicion)}
                  </div>
                  <p className="text-xs mb-2">{dia.condicion}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max:</span>
                      <span className="font-semibold">{dia.temp_max}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min:</span>
                      <span className="font-semibold">{dia.temp_min}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        <Droplets className="w-3 h-3 inline" />
                      </span>
                      <span>{dia.humedad}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        <Wind className="w-3 h-3 inline" />
                      </span>
                      <span>{dia.viento_kmh} km/h</span>
                    </div>
                  </div>
                  {dia.riesgo_helada && (
                    <Badge variant="destructive" className="mt-2 text-xs">
                      Riesgo Helada
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IoT Sensors Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Lecturas de Sensores IoT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parcela</TableHead>
                <TableHead>Humedad Suelo</TableHead>
                <TableHead>Temp. Suelo</TableHead>
                <TableHead>Humedad Amb.</TableHead>
                <TableHead>Temp. Amb.</TableHead>
                <TableHead>Radiacion Solar</TableHead>
                <TableHead>pH Suelo</TableHead>
                <TableHead>Ultima Lectura</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agroData.sensores.map((sensor) => (
                <TableRow key={sensor.parcela_id}>
                  <TableCell className="font-medium">{sensor.parcela}</TableCell>
                  <TableCell>{sensor.humedad_suelo.toFixed(1)}%</TableCell>
                  <TableCell>{sensor.temperatura_suelo.toFixed(1)}°C</TableCell>
                  <TableCell>{sensor.humedad_ambiente.toFixed(1)}%</TableCell>
                  <TableCell>{sensor.temperatura_ambiente.toFixed(1)}°C</TableCell>
                  <TableCell>{sensor.radiacion_solar.toFixed(0)} W/m²</TableCell>
                  <TableCell>{sensor.ph_suelo.toFixed(1)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {sensor.ultima_lectura}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
