"use client";

import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Printer } from "lucide-react";
import data from "../../../../../public/data/purificadora.json";

export default function ImprimirQRPage() {
  const { pedidos_ruta_manana, pedidos_ruta_tarde, empresa } = data;
  const allPedidos = [...pedidos_ruta_manana, ...pedidos_ruta_tarde];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Imprimir QRs</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {allPedidos.length} QRs para la ruta de hoy · Lunes 9 de Marzo
          </p>
        </div>
        <button
          onClick={() => typeof window !== "undefined" && window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors print:hidden"
        >
          <Printer className="h-4 w-4" />
          Imprimir
        </button>
      </div>

      {/* Ruta Manana */}
      {pedidos_ruta_manana.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Ruta 10:00 AM</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pedidos_ruta_manana.map((pedido) => (
              <Card key={pedido.id} className="break-inside-avoid">
                <CardContent className="pt-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-3 bg-neutral-100 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300">
                    <QrCode className="h-16 w-16 text-neutral-400" />
                  </div>
                  <p className="text-sm font-medium">{pedido.cliente_nombre}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {pedido.cantidad_garrafones} garrafon{pedido.cantidad_garrafones > 1 ? "es" : ""} · ${pedido.monto_total}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                    #{pedido.numero_pedido}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Ruta Tarde */}
      {pedidos_ruta_tarde.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Ruta 3:00 PM</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pedidos_ruta_tarde.map((pedido) => (
              <Card key={pedido.id} className="break-inside-avoid">
                <CardContent className="pt-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-3 bg-neutral-100 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300">
                    <QrCode className="h-16 w-16 text-neutral-400" />
                  </div>
                  <p className="text-sm font-medium">{pedido.cliente_nombre}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {pedido.cantidad_garrafones} garrafon{pedido.cantidad_garrafones > 1 ? "es" : ""} · ${pedido.monto_total}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                    #{pedido.numero_pedido}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center mt-8 print:hidden">
        En produccion, cada tarjeta tendra un QR real con codigo unico del pedido.
        Tiburcio escanea con su celular al salir y al entregar.
      </p>
    </div>
  );
}
