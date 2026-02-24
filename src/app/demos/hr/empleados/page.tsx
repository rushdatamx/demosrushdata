"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  AlertCircle,
  Shield,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  Lightbulb,
} from "lucide-react";
import dashboardData from "../../../../../public/data/hr.json";

const riskColors = {
  alto: "bg-red-100 text-red-700",
  medio: "bg-amber-100 text-amber-700",
  bajo: "bg-green-100 text-green-700",
};

const riskIcons = {
  alto: AlertCircle,
  medio: AlertTriangle,
  bajo: Shield,
};

type RiskFilter = "todos" | "alto" | "medio" | "bajo";

export default function EmpleadosPage() {
  const { empleados, kpis } = dashboardData;
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("todos");
  const [deptoFilter, setDeptoFilter] = useState("todos");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const departamentos = useMemo(() => {
    const deptos = [...new Set(empleados.map((e) => e.departamento))];
    return deptos.sort();
  }, []);

  const filtered = useMemo(() => {
    return empleados.filter((e) => {
      const matchSearch = search === "" || e.nombre.toLowerCase().includes(search.toLowerCase()) || e.puesto.toLowerCase().includes(search.toLowerCase());
      const matchRisk = riskFilter === "todos" || e.risk_level === riskFilter;
      const matchDepto = deptoFilter === "todos" || e.departamento === deptoFilter;
      return matchSearch && matchRisk && matchDepto;
    });
  }, [search, riskFilter, deptoFilter]);

  const formatAntiguedad = (meses: number) => {
    if (meses < 12) return `${meses} meses`;
    const anios = Math.floor(meses / 12);
    const restante = meses % 12;
    if (restante === 0) return `${anios} ${anios === 1 ? "anio" : "anios"}`;
    return `${anios}a ${restante}m`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Empleados</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Nivel de riesgo por empleado · {empleados.length} registros
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card
          className={`cursor-pointer transition-all ${riskFilter === "alto" ? "ring-2 ring-red-400" : "hover:border-red-200"}`}
          onClick={() => setRiskFilter(riskFilter === "alto" ? "todos" : "alto")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Riesgo Alto</p>
                <p className="text-3xl font-bold text-red-600">{kpis.empleados_riesgo_alto}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-200" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Accion inmediata requerida</p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${riskFilter === "medio" ? "ring-2 ring-amber-400" : "hover:border-amber-200"}`}
          onClick={() => setRiskFilter(riskFilter === "medio" ? "todos" : "medio")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Riesgo Medio</p>
                <p className="text-3xl font-bold text-amber-600">{kpis.empleados_riesgo_medio}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-200" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Monitoreo cercano</p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${riskFilter === "bajo" ? "ring-2 ring-green-400" : "hover:border-green-200"}`}
          onClick={() => setRiskFilter(riskFilter === "bajo" ? "todos" : "bajo")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Riesgo Bajo</p>
                <p className="text-3xl font-bold text-green-600">{kpis.empleados_riesgo_bajo}</p>
              </div>
              <Shield className="h-8 w-8 text-green-200" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Estable</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o puesto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={deptoFilter}
          onChange={(e) => setDeptoFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="todos">Todos los departamentos</option>
          {departamentos.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {(riskFilter !== "todos" || deptoFilter !== "todos" || search) && (
          <button
            onClick={() => { setRiskFilter("todos"); setDeptoFilter("todos"); setSearch(""); }}
            className="h-9 px-3 rounded-md text-sm text-muted-foreground hover:text-foreground border border-input"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground mb-3">
        Mostrando {filtered.length} de {empleados.length} empleados
      </p>

      {/* Employee Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Nombre</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Departamento</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Planta</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Antiguedad</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Evaluacion</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Riesgo</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 50).map((emp) => {
                  const isExpanded = expandedId === emp.id;
                  const RiskIcon = riskIcons[emp.risk_level as keyof typeof riskIcons];
                  return (
                    <tr key={emp.id} className="group">
                      <td colSpan={7} className="p-0">
                        <div
                          className="flex items-center cursor-pointer hover:bg-accent/50 transition-colors"
                          onClick={() => setExpandedId(isExpanded ? null : emp.id)}
                        >
                          <div className="flex-1 grid grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_1fr_1fr_auto] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] items-center">
                            <div className="px-4 py-3">
                              <p className="text-sm font-medium">{emp.nombre}</p>
                              <p className="text-xs text-muted-foreground">{emp.puesto}</p>
                            </div>
                            <div className="px-4 py-3">
                              <p className="text-sm">{emp.departamento}</p>
                            </div>
                            <div className="px-4 py-3 hidden md:block">
                              <p className="text-sm text-muted-foreground">{emp.planta}</p>
                            </div>
                            <div className="px-4 py-3 hidden lg:block">
                              <p className="text-sm text-muted-foreground">{formatAntiguedad(emp.antiguedad_meses)}</p>
                            </div>
                            <div className="px-4 py-3 hidden lg:block">
                              <p className="text-sm">{emp.evaluacion_desempeno}/5.0</p>
                            </div>
                            <div className="px-4 py-3 flex items-center gap-2">
                              <Badge className={`text-xs ${riskColors[emp.risk_level as keyof typeof riskColors]}`}>
                                {Math.round(emp.risk_score * 100)}%
                              </Badge>
                            </div>
                          </div>
                          <div className="px-4 py-3">
                            {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </div>

                        {/* Expanded Detail */}
                        {isExpanded && (
                          <div className="px-4 pb-4 border-b border-border/30">
                            <div className="ml-0 p-4 bg-accent/30 rounded-lg space-y-3">
                              {emp.risk_factors.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" /> Factores de Riesgo
                                  </p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {emp.risk_factors.map((f, i) => (
                                      <Badge key={i} variant="secondary" className="text-xs">{f}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {emp.accion_recomendada && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                                    <Lightbulb className="h-3 w-3" /> Accion Recomendada
                                  </p>
                                  <p className="text-sm text-indigo-600 font-medium">{emp.accion_recomendada}</p>
                                </div>
                              )}
                              {emp.dias_prediccion_salida && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> Prediccion de Salida
                                  </p>
                                  <p className="text-sm">
                                    Salida estimada en <span className="font-bold text-red-600">{emp.dias_prediccion_salida} dias</span>
                                  </p>
                                </div>
                              )}
                              <div className="flex gap-4 text-xs text-muted-foreground pt-1">
                                <span>Salario: ${emp.salario_mensual.toLocaleString("es-MX")}/mes</span>
                                <span>Ingreso: {emp.fecha_ingreso}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length > 50 && (
            <div className="p-4 text-center text-xs text-muted-foreground border-t border-border/50">
              Mostrando 50 de {filtered.length} resultados. Usa los filtros para refinar.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
