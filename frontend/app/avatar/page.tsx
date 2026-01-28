"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import BottomNav from "@/components/BottomNav";
import TavusDigitalHuman from "@/components/TavusDigitalHuman";

export default function AvatarPage() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 w-full overflow-x-hidden">
      {/* Left Sidebar - Desktop Only */}
      <Sidebar />

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:ml-56 pb-16 lg:pb-0 w-full overflow-x-hidden max-w-full">
        {/* Mobile Header with Hamburger */}
        <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-20 w-full">
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-gray-900">AI Mock Interview</h1>
          </div>
        </header>

        {/* Avatar Content */}
        <div className="flex-1 w-full overflow-y-auto">
          <TavusDigitalHuman />
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav />
    </div>
  );
}
