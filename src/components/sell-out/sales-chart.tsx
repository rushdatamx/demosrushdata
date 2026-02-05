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

interface SalesChartProps {
  data: Array<{
    fecha: string;
    monto: number;
    unidades: number;
  }>;
}

export function SalesChart({ data }: SalesChartProps) {
  const chartData = data.slice(-30).map((item) => ({
    ...item,
    fecha: item.fecha.split("-").slice(1).join("/"),
  }));

  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorMonto" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1E90FF" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1E90FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 85%)" vertical={false} />
          <XAxis
            dataKey="fecha"
            tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            width={50}
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
            formatter={(value) => [
              `$${Number(value).toLocaleString("es-MX")}`,
              "Ventas",
            ]}
            labelFormatter={(label) => `Fecha: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="monto"
            stroke="#1E90FF"
            strokeWidth={2.5}
            fill="url(#colorMonto)"
            dot={false}
            activeDot={{ r: 5, fill: "#2B4C7E", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
