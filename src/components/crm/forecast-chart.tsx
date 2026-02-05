"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ForecastChartProps {
  data: Array<{
    mes: string;
    pipeline: number;
    forecast_ia: number;
    meta: number;
  }>;
}

export function ForecastChart({ data }: ForecastChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    pipeline: Math.round(d.pipeline / 1000),
    forecast_ia: Math.round(d.forecast_ia / 1000),
    meta: Math.round(d.meta / 1000),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formatted}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
        <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v}k`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value) => [`$${value}k`]}
        />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="meta" name="Meta" fill="#94a3b8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="pipeline" name="Pipeline Weighted" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="forecast_ia" name="Forecast IA" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
