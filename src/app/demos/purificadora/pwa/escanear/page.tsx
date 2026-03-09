"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  CheckCircle2,
  Truck,
  ArrowLeft,
  Droplets,
  MapPin,
  X,
} from "lucide-react";
import Link from "next/link";
import data from "../../../../../../public/data/purificadora.json";

export default function EscanearPage() {
  const [scanned, setScanned] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Simular escaneo con el primer pedido en_camino o asignado
  const { pedidos_ruta_manana } = data;
  const pedidoActivo = pedidos_ruta_manana.find(
    (p) => p.estado === "en_camino" || p.estado === "asignado"
  );

  const handleScan = () => {
    setScanned(true);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setScanned(false);
      setConfirmed(false);
    }, 3000);
  };

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-36px)] bg-green-50 px-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-bounce">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-green-700 mb-1">Entrega Confirmada</h2>
        <p className="text-sm text-green-600 text-center">
          {pedidoActivo?.cliente_nombre} — {pedidoActivo?.cantidad_garrafones} garrafones
        </p>
        <p className="text-xs text-green-500 mt-2">
          Se notifico al cliente por WhatsApp
        </p>
        <Link
          href="/demos/purificadora/pwa"
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-xl text-sm font-medium"
        >
          Volver a la ruta
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-36px)]">
      {/* Header */}
      <div className="bg-neutral-900 text-white px-4 py-3 flex items-center justify-between">
        <Link href="/demos/purificadora/pwa" className="flex items-center gap-2 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Ruta
        </Link>
        <span className="text-sm font-medium">Escanear QR</span>
        <div className="w-16" />
      </div>

      {/* Area de camara (simulacion) */}
      <div className="flex-1 bg-neutral-900 flex flex-col items-center justify-center relative">
        {!scanned ? (
          <>
            {/* Marco de escaneo */}
            <div className="relative w-64 h-64">
              {/* Esquinas del marco */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-sky-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-sky-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-sky-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-sky-400 rounded-br-lg" />

              {/* Linea de escaneo animada */}
              <div className="absolute left-4 right-4 h-0.5 bg-sky-400/80 animate-pulse top-1/2" />

              {/* Icono central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-12 w-12 text-white/30" />
              </div>
            </div>

            <p className="text-white/60 text-sm mt-6">
              Apunta la camara al codigo QR del garrafon
            </p>

            {/* Boton para simular escaneo */}
            <button
              onClick={handleScan}
              className="mt-8 px-8 py-3 bg-sky-500 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-sky-600 transition-colors"
            >
              Simular Escaneo
            </button>
          </>
        ) : (
          /* Modal de confirmacion */
          <div className="absolute inset-0 bg-white flex flex-col">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <h3 className="text-base font-semibold">Confirmar Entrega</h3>
              <button onClick={() => setScanned(false)}>
                <X className="h-5 w-5 text-neutral-400" />
              </button>
            </div>

            {pedidoActivo ? (
              <div className="flex-1 px-4 py-6">
                {/* Datos del pedido */}
                <div className="bg-sky-50 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-sky-500 font-medium">
                      Pedido #{pedidoActivo.numero_pedido}
                    </span>
                    <Badge variant="default" className="text-[10px]">
                      {pedidoActivo.estado === "en_camino" ? "En camino" : "Asignado"}
                    </Badge>
                  </div>

                  <h4 className="text-lg font-bold text-neutral-900 mb-1">
                    {pedidoActivo.cliente_nombre}
                  </h4>

                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="h-3 w-3 text-neutral-400" />
                    <span className="text-xs text-neutral-500">
                      {pedidoActivo.cliente_direccion}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-3 text-center">
                      <Droplets className="h-5 w-5 text-sky-500 mx-auto mb-1" />
                      <div className="text-xl font-bold">{pedidoActivo.cantidad_garrafones}</div>
                      <div className="text-[10px] text-neutral-500">garrafones</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-sky-600">
                        ${pedidoActivo.monto_total}
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-1">
                        {pedidoActivo.metodo_pago === "efectivo" ? "Efectivo" : "Transferencia"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Boton de accion */}
                {pedidoActivo.estado === "en_camino" ? (
                  <button
                    onClick={handleConfirm}
                    className="w-full py-4 bg-green-500 text-white rounded-2xl text-base font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-green-600 transition-colors active:scale-[0.98]"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    MARCAR ENTREGADO
                  </button>
                ) : (
                  <button
                    onClick={handleConfirm}
                    className="w-full py-4 bg-sky-500 text-white rounded-2xl text-base font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-sky-600 transition-colors active:scale-[0.98]"
                  >
                    <Truck className="h-5 w-5" />
                    MARCAR EN CAMINO
                  </button>
                )}

                <p className="text-[11px] text-neutral-400 text-center mt-3">
                  Se notificara al cliente por WhatsApp
                </p>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-3" />
                  <p className="text-sm text-neutral-500">
                    Todas las entregas de esta ruta estan completadas
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
