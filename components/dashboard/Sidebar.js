"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  GraduationCap,
  MessageSquare,
  Award,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "Students", href: "/dashboard/students", icon: Users },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Certificates", href: "/dashboard/certificates", icon: Award },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ onClose }) {
  const pathname = usePathname();

  return (
    <div className="h-full bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-indigo-500" />
          <span className="text-lg font-semibold text-slate-900">LearnHub</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer lg:hidden"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-indigo-500" : "text-slate-400"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-4 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-indigo-600">A</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">Admin User</p>
            <p className="text-xs text-slate-400 truncate">admin@learnhub.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
