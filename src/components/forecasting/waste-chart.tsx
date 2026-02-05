"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WasteChartProps {
  data: Array<{
    fecha: string;
    desperdicio_pct: number;
    costo_desperdicio: number;
  }>;
}

export function WasteChart({ data }: WasteChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis
          dataKey="fecha"
          tickFormatter={(v) => v.slice(5)}
          tick={{ fontSize: 10 }}
          stroke="hsl(var(--muted-foreground))"
          interval={9}
        />
        <YAxis
          tick={{ fontSize: 11 }}
          stroke="hsl(var(--muted-foreground))"
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value) => [`${value}%`]}
        />
        <Area
          type="monotone"
          dataKey="desperdicio_pct"
          name="Desperdicio"
          stroke="#ef4444"
          fill="url(#colorWaste)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
