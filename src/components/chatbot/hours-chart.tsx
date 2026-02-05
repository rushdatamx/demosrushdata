"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface HoursChartProps {
  data: Array<{
    hora: string;
    conversaciones: number;
  }>;
}

export function HoursChart({ data }: HoursChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis
          dataKey="hora"
          tick={{ fontSize: 10 }}
          stroke="hsl(var(--muted-foreground))"
          interval={2}
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
        <Bar dataKey="conversaciones" name="Conversaciones" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => {
            const hour = parseInt(entry.hora);
            const isWorkHours = hour >= 8 && hour < 20;
            return (
              <Cell
                key={index}
                fill={isWorkHours ? "#22c55e" : "#8b5cf6"}
                fillOpacity={0.8}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
