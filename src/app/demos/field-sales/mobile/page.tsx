"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Package, Store, User, Check, Clock, Sparkles, ChevronRight } from "lucide-react";
import data from "../../../../../public/data/field-sales.json";

export default function FieldSalesMobilePage() {
  const { ruta_del_dia } = data;
  const [selectedStop, setSelectedStop] = useState<number | null>(null);

  const completedStops = ruta_del_dia.filter(s => s.visitada).length;
  const totalStops = ruta_del_dia.length;

  const selectedStopData = selectedStop !== null ? ruta_del_dia[selectedStop] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8 flex items-center justify-center">
      {/* Phone Frame */}
      <div className="w-[340px] h-[700px] bg-slate-900 rounded-[2.5rem] shadow-2xl border-8 border-slate-800 relative overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10"></div>

        {/* Screen Content */}
        <div className="h-full bg-slate-950 text-white overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 pt-8 pb-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-lg font-bold">Ruta del dia</h1>
                <p className="text-sm text-blue-100">Juan Perez</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{completedStops}/{totalStops}</div>
                <div className="text-xs text-blue-100">completadas</div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-blue-800 rounded-full h-2 mt-3">
              <div
                className="bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedStops / totalStops) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {!selectedStopData ? (
              /* Route List */
              <div className="p-4 space-y-3">
                {ruta_del_dia.map((stop, idx) => (
                  <Card
                    key={stop.orden}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      stop.visitada ? 'bg-slate-800 border-green-500/30' : 'bg-slate-900 border-slate-700'
                    }`}
                    onClick={() => setSelectedStop(idx)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Number Badge */}
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            stop.visitada
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-500 text-white'
                          }`}
                        >
                          {stop.visitada ? <Check className="w-4 h-4" /> : stop.orden}
                        </div>

                        {/* Stop Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-sm text-white truncate">
                              {stop.tienda}
                            </h3>
                            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          </div>
                          <p className="text-xs text-slate-400 mb-2">{stop.direccion}</p>

                          <div className="flex items-center gap-2">
                            {stop.visitada ? (
                              <Badge className="bg-green-600 text-white text-xs">
                                <Check className="w-3 h-3 mr-1" />
                                Visitada {stop.hora_visita}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-orange-400 border-orange-400 text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                Pendiente
                              </Badge>
                            )}
                            {stop.sugerido_ia.length > 0 && (
                              <Badge variant="outline" className="text-blue-300 border-blue-300 text-xs">
                                <Sparkles className="w-3 h-3 mr-1" />
                                IA
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* Store Detail View */
              <div className="p-4 space-y-4">
                {/* Back Button */}
                <Button
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300 hover:bg-slate-800 -ml-2"
                  onClick={() => setSelectedStop(null)}
                >
                  ← Volver a ruta
                </Button>

                {/* Store Header */}
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Store className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-bold text-white">{selectedStopData.tienda}</h2>
                      <p className="text-xs text-slate-400">{selectedStopData.direccion}</p>
                    </div>
                  </div>
                  {selectedStopData.visitada && (
                    <Badge className="bg-green-600 text-white">
                      <Check className="w-3 h-3 mr-1" />
                      Visitada a las {selectedStopData.hora_visita}
                    </Badge>
                  )}
                </div>

                {/* AI Suggestions */}
                {selectedStopData.sugerido_ia.length > 0 && (
                  <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg p-4 border border-blue-700/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-blue-300" />
                      <h3 className="font-bold text-white">Pedido Sugerido por IA</h3>
                    </div>
                    <div className="space-y-2">
                      {selectedStopData.sugerido_ia.map((item, idx) => (
                        <div key={idx} className="bg-slate-900/50 rounded p-3 border border-slate-700">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-white text-sm">{item.producto}</span>
                            <span className="text-blue-300 font-bold">{item.cajas_sugeridas} cajas</span>
                          </div>
                          <p className="text-xs text-slate-400 italic">{item.razon}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actual Order (if visited) */}
                {selectedStopData.visitada && selectedStopData.pedido.length > 0 && (
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-5 h-5 text-green-400" />
                      <h3 className="font-bold text-white">Pedido Realizado</h3>
                    </div>
                    <div className="space-y-2 mb-3">
                      {selectedStopData.pedido.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="text-slate-300">
                            <span className="font-medium">{item.producto}</span>
                            <span className="text-slate-500 ml-2">x{item.cajas} cajas</span>
                          </div>
                          <span className="text-white font-medium">
                            ${item.total.toLocaleString('es-MX')}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
                      <span className="font-bold text-white">Total</span>
                      <span className="text-xl font-bold text-green-400">
                        ${selectedStopData.total_pedido.toLocaleString('es-MX')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {!selectedStopData.visitada && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold">
                    Iniciar Visita
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="bg-slate-900 border-t border-slate-800 px-2 py-3 flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-blue-600">
              <MapPin className="w-5 h-5 text-white" />
              <span className="text-xs text-white font-medium">Ruta</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Package className="w-5 h-5 text-slate-400" />
              <span className="text-xs text-slate-400">Pedido</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Store className="w-5 h-5 text-slate-400" />
              <span className="text-xs text-slate-400">Tienda</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
              <User className="w-5 h-5 text-slate-400" />
              <span className="text-xs text-slate-400">Perfil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
