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

interface RiskDistributionChartProps {
  alto: number;
  medio: number;
  bajo: number;
}

const COLORS = {
  Alto: "#ef4444",
  Medio: "#f59e0b",
  Bajo: "#22c55e",
};

export function RiskDistributionChart({ alto, medio, bajo }: RiskDistributionChartProps) {
  const data = [
    { nivel: "Alto", empleados: alto },
    { nivel: "Medio", empleados: medio },
    { nivel: "Bajo", empleados: bajo },
  ];

  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 85%)" vertical={false} />
          <XAxis
            dataKey="nivel"
            tick={{ fontSize: 12, fill: "hsl(220, 10%, 45%)" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid hsl(220, 20%, 85%)",
              borderRadius: "12px",
              fontSize: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
            formatter={(value) => [`${value} empleados`, "Cantidad"]}
          />
          <Bar dataKey="empleados" radius={[6, 6, 0, 0]} barSize={60}>
            {data.map((entry) => (
              <Cell key={entry.nivel} fill={COLORS[entry.nivel as keyof typeof COLORS]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
