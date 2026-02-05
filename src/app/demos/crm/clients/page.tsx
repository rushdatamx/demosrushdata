"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Users,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Minus,
  Search,
} from "lucide-react";
import crmData from "../../../../../public/data/crm.json";

type RiskFilter = "all" | "high" | "medium" | "healthy";

export default function ClientsPage() {
  const { cuentas, kpis } = crmData;
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = useMemo(() => ({
    high: cuentas.filter((c) => c.health_score < 30).length,
    medium: cuentas.filter((c) => c.health_score >= 30 && c.health_score < 60).length,
    healthy: cuentas.filter((c) => c.health_score >= 60).length,
  }), [cuentas]);

  const filteredClients = useMemo(() => {
    return cuentas.filter((c) => {
      const matchesRisk = riskFilter === "all"
        || (riskFilter === "high" && c.health_score < 30)
        || (riskFilter === "medium" && c.health_score >= 30 && c.health_score < 60)
        || (riskFilter === "healthy" && c.health_score >= 60);
      const matchesSearch = !searchTerm || c.empresa.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRisk && matchesSearch;
    });
  }, [cuentas, riskFilter, searchTerm]);

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-red-600 bg-red-100 dark:bg-red-900";
    if (score < 60) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900";
    return "text-green-600 bg-green-100 dark:bg-green-900";
  };

  const getTendenciaIcon = (tendencia: string) => {
    if (tendencia === "creciente") return <TrendingUp className="h-3 w-3 text-green-600" />;
    if (tendencia === "decreciente") return <TrendingDown className="h-3 w-3 text-red-600" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Clientes</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Health score y riesgo de churn · {kpis.total_cuentas} cuentas
        </p>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card
          className={`cursor-pointer transition-all ${riskFilter === "high" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setRiskFilter(riskFilter === "high" ? "all" : "high")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.high}</p>
                <p className="text-xs text-muted-foreground">Riesgo Alto (&lt;30)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all ${riskFilter === "medium" ? "ring-2 ring-yellow-500" : ""}`}
          onClick={() => setRiskFilter(riskFilter === "medium" ? "all" : "medium")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.medium}</p>
                <p className="text-xs text-muted-foreground">Riesgo Medio (30-59)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all ${riskFilter === "healthy" ? "ring-2 ring-green-500" : ""}`}
          onClick={() => setRiskFilter(riskFilter === "healthy" ? "all" : "healthy")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.healthy}</p>
                <p className="text-xs text-muted-foreground">Saludable (60+)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar empresa..."
            className="flex h-10 w-full sm:w-72 rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant={riskFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setRiskFilter("all")}>Todos</Button>
          <Button variant={riskFilter === "high" ? "default" : "outline"} size="sm" onClick={() => setRiskFilter("high")} className="text-red-600">Alto Riesgo</Button>
          <Button variant={riskFilter === "medium" ? "default" : "outline"} size="sm" onClick={() => setRiskFilter("medium")} className="text-yellow-600">Medio</Button>
          <Button variant={riskFilter === "healthy" ? "default" : "outline"} size="sm" onClick={() => setRiskFilter("healthy")} className="text-green-600">Saludable</Button>
        </div>
      </div>

      {/* Clients Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead className="text-center">Health Score</TableHead>
                  <TableHead className="text-center">Tendencia</TableHead>
                  <TableHead className="text-right">Ultimo Pedido</TableHead>
                  <TableHead className="text-right">Ticket Prom.</TableHead>
                  <TableHead className="text-right">Compras 12m</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{cliente.empresa}</p>
                        <p className="text-xs text-muted-foreground">{cliente.contacto}</p>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{cliente.sector}</Badge></TableCell>
                    <TableCell className="text-sm">{cliente.vendedor}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={`${getScoreColor(cliente.health_score)} text-xs font-bold`}>
                        {cliente.health_score}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {getTendenciaIcon(cliente.tendencia)}
                        <span className="text-xs capitalize">{cliente.tendencia}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-sm tabular-nums">
                      {cliente.ultimo_pedido_dias === 0 ? "Hoy" : `Hace ${cliente.ultimo_pedido_dias}d`}
                    </TableCell>
                    <TableCell className="text-right text-sm tabular-nums">
                      ${cliente.ticket_promedio.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell className="text-right text-sm tabular-nums font-medium">
                      ${cliente.total_compras_12m.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
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
