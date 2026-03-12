"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
  Droplets,
  MessageCircle,
  Monitor,
} from "lucide-react";
import data from "../../../../../public/data/purificadora.json";

export default function VentasPage() {
  const { clientes, empresa, ventas_hoy } = data;
  const productos = empresa.productos;

  const [clienteId, setClienteId] = useState("");
  const [productoId, setProductoId] = useState(productos[0].id);
  const [cantidad, setCantidad] = useState(1);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [clienteSearch, setClienteSearch] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const productoSeleccionado = productos.find((p: { id: string }) => p.id === productoId);
  const montoTotal = productoSeleccionado ? cantidad * productoSeleccionado.precio : 0;

  const clientesFiltrados = clienteSearch.length > 0
    ? clientes.filter((c: { nombre: string }) =>
        c.nombre.toLowerCase().includes(clienteSearch.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleRegistrar = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setClienteId("");
      setClienteSearch("");
      setCantidad(1);
    }, 2000);
  };

  const clienteSeleccionado = clientes.find((c: { id: string }) => c.id === clienteId);

  // Resumen de ventas del dia
  const ventasEntregadas = ventas_hoy.filter((v: { estado: string }) => v.estado === "entregado");
  const totalDia = ventasEntregadas.reduce((s: number, v: { monto_total: number }) => s + v.monto_total, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Registro de Ventas</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Registra las ventas del dia · {empresa.nombre}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Formulario de registro */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-sky-500" />
              Nueva Venta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-sm font-medium text-green-700">Venta registrada</p>
              </div>
            ) : (
              <>
                {/* Cliente */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Cliente</label>
                  {clienteSeleccionado ? (
                    <div className="flex items-center justify-between p-3 bg-sky-50 rounded-lg border border-sky-100">
                      <div>
                        <p className="text-sm font-medium">{clienteSeleccionado.nombre}</p>
                        <p className="text-xs text-muted-foreground">{clienteSeleccionado.direccion}</p>
                      </div>
                      <button
                        onClick={() => { setClienteId(""); setClienteSearch(""); }}
                        className="text-xs text-sky-600 hover:text-sky-700"
                      >
                        Cambiar
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={clienteSearch}
                        onChange={(e) => setClienteSearch(e.target.value)}
                        placeholder="Buscar cliente por nombre..."
                        className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                      {clientesFiltrados.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                          {clientesFiltrados.map((c: { id: string; nombre: string; colonia: string }) => (
                            <button
                              key={c.id}
                              onClick={() => { setClienteId(c.id); setClienteSearch(""); }}
                              className="w-full text-left px-3 py-2 hover:bg-muted/50 transition-colors"
                            >
                              <p className="text-sm font-medium">{c.nombre}</p>
                              <p className="text-xs text-muted-foreground">{c.colonia}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Producto */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Producto</label>
                  <select
                    value={productoId}
                    onChange={(e) => { setProductoId(e.target.value); setCantidad(1); }}
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 appearance-none"
                  >
                    {productos.map((p: { id: string; nombre: string; precio: number; unidad: string }) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre} — ${p.precio}/{p.unidad}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cantidad */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Cantidad ({productoSeleccionado?.unidad || "pza"})
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-2xl font-bold w-16 text-center">{cantidad}</span>
                    <button
                      onClick={() => setCantidad(cantidad + 1)}
                      className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Metodo de pago */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Metodo de Pago</label>
                  <div className="flex gap-2">
                    {[
                      { id: "efectivo", label: "Efectivo" },
                      { id: "transferencia", label: "Transferencia" },
                      { id: "credito", label: "Credito" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMetodoPago(m.id)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          metodoPago === m.id
                            ? "bg-sky-500 text-white border-sky-500"
                            : "bg-background text-muted-foreground border-border hover:border-sky-200"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-2xl font-bold text-sky-600">
                      ${montoTotal.toLocaleString("es-MX")}
                    </span>
                  </div>
                </div>

                {/* Boton registrar */}
                <button
                  onClick={handleRegistrar}
                  disabled={!clienteId}
                  className="w-full py-3 bg-sky-500 text-white rounded-lg text-sm font-bold hover:bg-sky-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Registrar Venta
                </button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Ventas del dia */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Ventas de Hoy</CardTitle>
              <div className="text-right">
                <span className="text-lg font-bold text-sky-600">${totalDia.toLocaleString("es-MX")}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {ventasEntregadas.length} ventas
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-auto">
              {ventas_hoy.map((venta: {
                id: string;
                numero_venta: number;
                cliente_nombre: string;
                producto_nombre: string;
                cantidad: number;
                unidad: string;
                monto_total: number;
                metodo_pago: string;
                estado: string;
                fuente: string;
              }) => (
                <div
                  key={venta.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-50 shrink-0">
                      {venta.fuente === "tiburcio" ? (
                        <MessageCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Monitor className="h-4 w-4 text-sky-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{venta.cliente_nombre}</span>
                        <Badge variant="outline" className="text-[9px]">
                          {venta.fuente === "tiburcio" ? "WhatsApp" : "Admin"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {venta.cantidad} {venta.unidad} {venta.producto_nombre} · {venta.metodo_pago}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium">${venta.monto_total.toLocaleString("es-MX")}</p>
                    <Badge
                      variant={venta.estado === "entregado" ? "secondary" : "outline"}
                      className="text-[9px]"
                    >
                      {venta.estado === "entregado" ? "Entregado" : venta.estado === "en_camino" ? "En camino" : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
