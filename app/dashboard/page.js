"use client";

import { Calendar } from "lucide-react";
import StatsCards from "@/components/dashboard/StatsCards";
import EnrollmentChart from "@/components/dashboard/EnrollmentChart";
import CoursePerformance from "@/components/dashboard/CoursePerformance";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TopCourses from "@/components/dashboard/TopCourses";

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
          <Calendar className="w-4 h-4" />
          <span>{today}</span>
        </div>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EnrollmentChart />
        <CoursePerformance />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopCourses />
        <RecentActivity />
      </div>
    </div>
  );
}
