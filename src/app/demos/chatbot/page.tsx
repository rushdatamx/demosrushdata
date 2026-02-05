"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Clock,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Bot,
  Send,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
} from "lucide-react";
import chatbotData from "../../../../public/data/chatbot.json";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function ChatbotPage() {
  const { kpis, conversation_flows, conversaciones } = chatbotData;
  const [selectedFlow, setSelectedFlow] = useState<number | null>(null);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, isTyping]);

  const startConversation = (flowIndex: number) => {
    setSelectedFlow(flowIndex);
    setVisibleMessages([]);
    setMessageIndex(0);
    setIsTyping(false);

    // Show first user message immediately
    const flow = conversation_flows[flowIndex];
    setTimeout(() => {
      setVisibleMessages([flow.messages[0] as Message]);
      setMessageIndex(1);
      // Then show bot typing and response
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages([flow.messages[0] as Message, flow.messages[1] as Message]);
          setMessageIndex(2);
        }, 1500);
      }, 500);
    }, 300);
  };

  const sendNextMessage = () => {
    if (selectedFlow === null) return;
    const flow = conversation_flows[selectedFlow];
    if (messageIndex >= flow.messages.length) return;

    const nextMsg = flow.messages[messageIndex] as Message;
    setVisibleMessages((prev) => [...prev, nextMsg]);
    setMessageIndex((prev) => prev + 1);

    // If next is a bot message, show typing indicator first
    if (messageIndex + 1 < flow.messages.length) {
      const followUp = flow.messages[messageIndex + 1] as Message;
      if (followUp.role === "bot") {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setVisibleMessages((prev) => [...prev, followUp]);
            setMessageIndex((prev) => prev + 1);
          }, 1200 + Math.random() * 800);
        }, 400);
      }
    }
  };

  const hasNextMessage = () => {
    if (selectedFlow === null) return false;
    const flow = conversation_flows[selectedFlow];
    return messageIndex < flow.messages.length;
  };

  const getNextMessagePreview = () => {
    if (selectedFlow === null) return "";
    const flow = conversation_flows[selectedFlow];
    if (messageIndex >= flow.messages.length) return "";
    return flow.messages[messageIndex].text;
  };

  const currentTime = "11:47 PM";

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Chatbot WhatsApp</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Simulador interactivo del asistente de ventas con IA
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversaciones</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.total_conversaciones}</div>
            <p className="text-xs text-muted-foreground mt-1">Ultimos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasa de Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpis.tasa_conversion}%</div>
            <p className="text-xs text-muted-foreground mt-1">Consulta a venta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventas Fuera de Horario</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${kpis.ventas_fuera_horario.toLocaleString("es-MX")}</div>
            <p className="text-xs text-muted-foreground mt-1">{kpis.pct_fuera_horario}% de conversaciones</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resp. Promedio</CardTitle>
            <Bot className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{kpis.tiempo_respuesta_promedio}</div>
            <p className="text-xs text-muted-foreground mt-1">Tiempo de respuesta IA</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content: Phone + Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Phone Mockup */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="w-[340px]">
            {/* Phone Frame */}
            <div className="bg-zinc-900 rounded-[2.5rem] p-3 shadow-2xl">
              {/* Screen */}
              <div className="bg-[#0b141a] rounded-[2rem] overflow-hidden flex flex-col" style={{ height: "600px" }}>
                {/* WhatsApp Header */}
                <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">AutoPartes Express</p>
                    <p className="text-green-400 text-xs">en linea</p>
                  </div>
                  <Video className="h-5 w-5 text-gray-400" />
                  <Phone className="h-5 w-5 text-gray-400 ml-2" />
                  <MoreVertical className="h-5 w-5 text-gray-400 ml-2" />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }}>
                  {selectedFlow === null ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center px-6">
                        <Bot className="h-12 w-12 text-green-500 mx-auto mb-3 opacity-60" />
                        <p className="text-gray-400 text-sm">Selecciona una conversacion para simular</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-center">
                        <Badge className="bg-[#1d2b36] text-gray-300 text-xs border-0">{currentTime}</Badge>
                      </div>
                      {visibleMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                              msg.role === "user"
                                ? "bg-[#005c4b] text-white"
                                : "bg-[#1f2c34] text-gray-200"
                            }`}
                          >
                            <div className="whitespace-pre-line text-[13px] leading-relaxed">{msg.text}</div>
                            <div className={`flex items-center gap-1 justify-end mt-1 ${msg.role === "user" ? "text-green-300" : "text-gray-500"}`}>
                              <span className="text-[10px]">{currentTime}</span>
                              {msg.role === "user" && <CheckCheck className="h-3 w-3" />}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-[#1f2c34] rounded-lg px-4 py-3">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Input Bar */}
                <div className="bg-[#1f2c34] px-3 py-2 flex items-center gap-2">
                  {hasNextMessage() && !isTyping ? (
                    <button
                      onClick={sendNextMessage}
                      className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-left text-sm text-gray-400 hover:bg-[#3a4952] transition-colors truncate"
                    >
                      {getNextMessagePreview().substring(0, 40)}...
                    </button>
                  ) : (
                    <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-sm text-gray-500">
                      {selectedFlow === null ? "Selecciona un flujo..." : isTyping ? "Esperando..." : "Conversacion finalizada"}
                    </div>
                  )}
                  <button
                    onClick={hasNextMessage() && !isTyping ? sendNextMessage : undefined}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      hasNextMessage() && !isTyping
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-600"
                    } transition-colors`}
                  >
                    <Send className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Flow Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Flujos de Conversacion</CardTitle>
              <p className="text-sm text-muted-foreground">Selecciona un escenario para simular</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {conversation_flows.map((flow, index) => (
                <button
                  key={flow.id}
                  onClick={() => startConversation(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedFlow === index
                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                      : "border-border hover:border-green-300 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${selectedFlow === index ? "bg-green-100 dark:bg-green-900" : "bg-muted"}`}>
                        <MessageCircle className={`h-4 w-4 ${selectedFlow === index ? "text-green-600" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{flow.title}</p>
                        <p className="text-xs text-muted-foreground">{flow.messages.length} mensajes</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Conversaciones Recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {conversaciones.slice(0, 8).map((conv) => (
                <div key={conv.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">{conv.cliente.split(" ").map((n) => n[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{conv.cliente}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{conv.producto_consultado}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={conv.estado === "completada" ? "default" : conv.estado === "cotizada" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {conv.estado === "completada" ? "Venta" : conv.estado === "cotizada" ? "Cotizada" : conv.estado === "en_proceso" ? "Activa" : "Sin resp."}
                    </Badge>
                    {conv.monto_venta > 0 && (
                      <p className="text-xs font-medium text-green-600 mt-1">${conv.monto_venta.toLocaleString("es-MX")}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
