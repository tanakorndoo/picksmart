"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", students: 180 },
  { month: "Feb", students: 220 },
  { month: "Mar", students: 310 },
  { month: "Apr", students: 280 },
  { month: "May", students: 390 },
  { month: "Jun", students: 420 },
  { month: "Jul", students: 480 },
  { month: "Aug", students: 520 },
  { month: "Sep", students: 490 },
  { month: "Oct", students: 560 },
  { month: "Nov", students: 610 },
  { month: "Dec", students: 680 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm">
      <p className="font-medium text-slate-900">{label}</p>
      <p className="text-indigo-600">{payload[0].value} students</p>
    </div>
  );
}

export default function EnrollmentChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Enrollment Trend</h3>
          <p className="text-sm text-slate-500 mt-0.5">Monthly new enrollments</p>
        </div>
        <div className="flex gap-2">
          {["6M", "1Y", "All"].map((period) => (
            <button
              key={period}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                period === "1Y"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="enrollGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94A3B8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94A3B8" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="students"
              stroke="#6366F1"
              strokeWidth={2}
              fill="url(#enrollGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
