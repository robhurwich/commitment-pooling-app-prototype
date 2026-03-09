"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — always visible on md+, slide-in drawer on mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:flex md:flex-shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar with hamburger */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#3d2b1f] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 22 22" fill="none">
                <path d="M5 14c0-1 1-2 2-2h3l2-3h3c1 0 2 1 2 2v2c0 1-1 2-2 2H7c-1 0-2-1-2-2z" fill="#c9a96e" />
                <path d="M5 10c0-1 .8-1.5 2-1l5 2" stroke="#c9a96e" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-semibold text-sm text-gray-900">Sarafu Network</span>
          </div>
        </div>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
