"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChatAnalyticsChartProps {
  data: Array<{
    fecha: string;
    conversaciones: number;
    ventas: number;
    monto: number;
  }>;
}

export function ChatAnalyticsChart({ data }: ChatAnalyticsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis
          dataKey="fecha"
          tickFormatter={(v) => v.slice(5)}
          tick={{ fontSize: 11 }}
          stroke="hsl(var(--muted-foreground))"
        />
        <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
        <Area
          type="monotone"
          dataKey="conversaciones"
          name="Conversaciones"
          stroke="#22c55e"
          fill="url(#colorConv)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="ventas"
          name="Ventas"
          stroke="#8b5cf6"
          fill="url(#colorVentas)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
