"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { course: "UI/UX Design", completion: 92, enrolled: 340 },
  { course: "Web Dev", completion: 85, enrolled: 520 },
  { course: "Data Science", completion: 78, enrolled: 280 },
  { course: "Marketing", completion: 71, enrolled: 190 },
  { course: "Mobile Dev", completion: 68, enrolled: 310 },
  { course: "DevOps", completion: 64, enrolled: 150 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm">
      <p className="font-medium text-slate-900">{label}</p>
      <p className="text-indigo-600">{payload[0].value}% completion</p>
      {payload[0]?.payload?.enrolled && (
        <p className="text-slate-500">{payload[0].payload.enrolled} enrolled</p>
      )}
    </div>
  );
}

export default function CoursePerformance() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900">Course Performance</h3>
        <p className="text-sm text-slate-500 mt-0.5">Completion rate by course</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="course"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94A3B8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94A3B8" }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="completion"
              fill="#6366F1"
              radius={[6, 6, 0, 0]}
              barSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
