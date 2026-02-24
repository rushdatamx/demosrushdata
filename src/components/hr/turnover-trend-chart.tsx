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

interface TurnoverTrendChartProps {
  data: Array<{
    mes: string;
    tasa_mensual: number;
    bajas: number;
  }>;
}

export function TurnoverTrendChart({ data }: TurnoverTrendChartProps) {
  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTurnover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 85%)" vertical={false} />
          <XAxis
            dataKey="mes"
            tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            width={45}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid hsl(220, 20%, 85%)",
              borderRadius: "12px",
              fontSize: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              backdropFilter: "blur(8px)",
            }}
            formatter={(value) => [`${value}%`, "Tasa"]}
            labelFormatter={(label) => `Mes: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="tasa_mensual"
            stroke="#4f46e5"
            strokeWidth={2.5}
            fill="url(#colorTurnover)"
            dot={false}
            activeDot={{ r: 5, fill: "#3730a3", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
