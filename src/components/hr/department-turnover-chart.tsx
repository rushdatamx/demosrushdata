"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DepartmentTurnoverChartProps {
  data: Array<{
    departamento: string;
    tasa_rotacion: number;
    bajas_anuales: number;
  }>;
}

export function DepartmentTurnoverChart({ data }: DepartmentTurnoverChartProps) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 85%)" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            type="category"
            dataKey="departamento"
            tick={{ fontSize: 12, fill: "hsl(220, 10%, 45%)" }}
            tickLine={false}
            axisLine={false}
            width={110}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid hsl(220, 20%, 85%)",
              borderRadius: "12px",
              fontSize: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
            formatter={(value) => [`${value}%`, "Tasa Rotacion"]}
          />
          <Bar dataKey="tasa_rotacion" fill="#4f46e5" radius={[0, 6, 6, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
