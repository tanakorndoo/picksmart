"use client";

import { Users, BookOpen, TrendingUp, DollarSign } from "lucide-react";

const stats = [
  {
    label: "Total Students",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "indigo",
  },
  {
    label: "Active Courses",
    value: "34",
    change: "+3",
    trend: "up",
    icon: BookOpen,
    color: "emerald",
  },
  {
    label: "Completion Rate",
    value: "78.2%",
    change: "+4.1%",
    trend: "up",
    icon: TrendingUp,
    color: "amber",
  },
  {
    label: "Revenue",
    value: "$48,290",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    color: "violet",
  },
];

const colorMap = {
  indigo: {
    bg: "bg-indigo-50",
    icon: "text-indigo-500",
    badge: "text-indigo-600 bg-indigo-50",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-500",
    badge: "text-emerald-600 bg-emerald-50",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-500",
    badge: "text-amber-600 bg-amber-50",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-500",
    badge: "text-violet-600 bg-violet-50",
  },
};

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const colors = colorMap[stat.color];
        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 transition-colors duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.badge}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
