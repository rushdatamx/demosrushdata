"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ErrorBar,
} from "recharts";

interface ForecastChartProps {
  items: Array<{
    ingrediente: string;
    predicho: number;
    real: number | null;
    banda_inferior: number;
    banda_superior: number;
    unidad: string;
  }>;
}

export function ForecastChart({ items }: ForecastChartProps) {
  const data = items.slice(0, 10).map((item) => ({
    name: item.ingrediente.length > 12 ? item.ingrediente.slice(0, 12) + "..." : item.ingrediente,
    predicho: item.predicho,
    real: item.real,
    errorLow: item.predicho - item.banda_inferior,
    errorHigh: item.banda_superior - item.predicho,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={110} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Bar dataKey="predicho" name="Predicho" fill="#f97316" radius={[0, 4, 4, 0]} fillOpacity={0.8} />
        {data[0]?.real !== null && (
          <Bar dataKey="real" name="Real" fill="#22c55e" radius={[0, 4, 4, 0]} fillOpacity={0.6} />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
