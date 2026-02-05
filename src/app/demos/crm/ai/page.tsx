"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bot,
  AlertTriangle,
  Mail,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Building2,
  User,
  Calendar,
  TrendingDown,
} from "lucide-react";
import crmData from "../../../../../public/data/crm.json";

export default function AIAssistantPage() {
  const { ai_insights } = crmData;
  const [selectedInsight, setSelectedInsight] = useState(0);
  const [copied, setCopied] = useState(false);

  const insight = ai_insights[selectedInsight];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(insight.email_borrador);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            IA Assistant
          </Badge>
        </div>
        <h1 className="text-2xl font-semibold text-foreground">Asistente de Ventas IA</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {ai_insights.length} clientes en riesgo detectados que requieren atencion
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground mb-3">Clientes en Riesgo</p>
          {ai_insights.map((ins, index) => (
            <button
              key={ins.cuenta_id}
              onClick={() => setSelectedInsight(index)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedInsight === index
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                  : "border-border hover:border-purple-300 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{ins.empresa}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={`text-[10px] ${
                        ins.health_score < 30
                          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      Score: {ins.health_score}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{ins.vendedor}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
            </button>
          ))}
        </div>

        {/* AI Analysis Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-lg font-bold">{insight.empresa}</h2>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{insight.vendedor}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${
                    insight.health_score < 30 ? "text-red-600" : "text-yellow-600"
                  }`}>
                    {insight.health_score}
                  </div>
                  <p className="text-xs text-muted-foreground">Health Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                Analisis IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 mb-4">
                <p className="text-sm leading-relaxed">{insight.resumen}</p>
              </div>

              <Separator className="my-4" />

              {/* Suggested Action */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Accion Sugerida</p>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-1.5 bg-green-100 rounded dark:bg-green-900">
                    <ArrowRight className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm leading-relaxed">{insight.accion_sugerida}</p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Email Draft */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Borrador de Email
                  </p>
                  <Button variant="outline" size="sm" onClick={handleCopyEmail} className="gap-1 text-xs">
                    {copied ? <><Check className="h-3 w-3 text-green-600" />Copiado</> : <><Copy className="h-3 w-3" />Copiar</>}
                  </Button>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 border border-dashed">
                  <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">{insight.email_borrador}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
