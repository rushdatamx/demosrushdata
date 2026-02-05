"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Download, Sparkles, Calendar } from "lucide-react";
import data from "../../../../../public/data/automations.json";

export default function ReportsPage() {
  const { reporte } = data;

  const handleCopy = () => {
    const reportText = `
${reporte.titulo}
${reporte.subtitulo}
Generado: ${reporte.generado}

RESUMEN EJECUTIVO
${reporte.resumen}

${reporte.secciones.map(seccion => `
${seccion.titulo.toUpperCase()}
${seccion.contenido.map(item => `• ${item}`).join('\n')}
`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(reportText);
  };

  const handleExport = () => {
    const reportText = `
${reporte.titulo}
${reporte.subtitulo}
Generado: ${reporte.generado}

RESUMEN EJECUTIVO
${reporte.resumen}

${reporte.secciones.map(seccion => `
${seccion.titulo.toUpperCase()}
${seccion.contenido.map(item => `• ${item}`).join('\n')}
`).join('\n')}
    `.trim();

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte-ejecutivo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-foreground">
                {reporte.titulo}
              </h1>
              <Badge className="bg-purple-600 hover:bg-purple-700">
                <Sparkles className="h-3 w-3 mr-1" />
                Generado automáticamente
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              {reporte.subtitulo}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copiar
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {reporte.generado}
        </div>
      </div>

      <Separator />

      {/* Executive Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-900">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            Resumen Ejecutivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{reporte.resumen}</p>
        </CardContent>
      </Card>

      {/* Report Sections - Document Style */}
      <div className="space-y-8 bg-white dark:bg-gray-950 p-8 rounded-lg border shadow-sm">
        {reporte.secciones.map((seccion, index) => (
          <div key={index} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2">
                {seccion.titulo}
              </h2>
            </div>
            <div className="space-y-2 pl-4">
              {seccion.contenido.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex gap-3 text-sm leading-relaxed"
                >
                  <span className="text-muted-foreground mt-0.5">•</span>
                  <span className="flex-1">{item}</span>
                </div>
              ))}
            </div>
            {index < reporte.secciones.length - 1 && (
              <Separator className="mt-6" />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3" />
          <span>Este reporte fue generado automáticamente por CONSTRUPLAN</span>
        </div>
        <span>{reporte.generado}</span>
      </div>
    </div>
  );
}
