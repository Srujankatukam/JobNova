"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Jobs", href: "/" },
  { name: "AI Mock Interview", href: "/avatar" },
  { name: "Resume", href: "/resume" },
  { name: "Profile", href: "/profile" },
  { name: "Setting", href: "/settings" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="4" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="1" fill="#FFFFFF" />
                <path
                  d="M12 4L8 12H12L10 20L16 12H12L12 4Z"
                  fill="#B9FD33"
                  stroke="#B9FD33"
                  strokeWidth="0.5"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">JobNova</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "bg-purple-400 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Subscription
            </button>
            <button className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Extra Credits
            </button>
            <Link
              href="/subscription"
              className="px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-full hover:bg-purple-600 transition-colors"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
