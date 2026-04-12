"use client";

import { BookOpen, Award, UserPlus, MessageSquare } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "enrollment",
    icon: UserPlus,
    color: "bg-indigo-50 text-indigo-500",
    title: "Sarah Chen enrolled in UI/UX Design Fundamentals",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "completion",
    icon: Award,
    color: "bg-emerald-50 text-emerald-500",
    title: "James Park completed Advanced React Patterns",
    time: "15 min ago",
  },
  {
    id: 3,
    type: "course",
    icon: BookOpen,
    color: "bg-amber-50 text-amber-500",
    title: "New course published: Introduction to Machine Learning",
    time: "1 hr ago",
  },
  {
    id: 4,
    type: "message",
    icon: MessageSquare,
    color: "bg-violet-50 text-violet-500",
    title: "Maria Lopez sent a question in Data Science Q&A",
    time: "2 hrs ago",
  },
  {
    id: 5,
    type: "enrollment",
    icon: UserPlus,
    color: "bg-indigo-50 text-indigo-500",
    title: "12 new students enrolled in Web Development Bootcamp",
    time: "3 hrs ago",
  },
  {
    id: 6,
    type: "completion",
    icon: Award,
    color: "bg-emerald-50 text-emerald-500",
    title: "Alex Rivera earned certificate for Python Basics",
    time: "5 hrs ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200 cursor-pointer">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-700 leading-snug">{activity.title}</p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
