"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
