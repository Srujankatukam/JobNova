"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Jobs",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      href: "/avatar",
      label: "Interview",
      icon: (
        <svg width="24" height="24" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.58594 14.6665H3.66927C3.18304 14.6665 2.71673 14.4733 2.37291 14.1295C2.02909 13.7857 1.83594 13.3194 1.83594 12.8332V3.66649C1.83594 3.18026 2.02909 2.71395 2.37291 2.37013C2.71673 2.02631 3.18304 1.83316 3.66927 1.83316H18.3359C18.8222 1.83316 19.2885 2.02631 19.6323 2.37013C19.9761 2.71395 20.1693 3.18026 20.1693 3.66649V12.8332C20.1693 13.3194 19.9761 13.7857 19.6323 14.1295C19.2885 14.4733 18.8222 14.6665 18.3359 14.6665H17.4193" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.0013 12.8332L15.5846 18.3332H6.41797L11.0013 12.8332Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      href: "/resume",
      label: "Resume",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" />
          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" />
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" />
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      href: "/profile",
      label: "Profile",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset-bottom w-full overflow-x-hidden">
      <div className="flex items-center justify-around h-14 sm:h-16 px-1 sm:px-2 max-w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 flex-1 h-full transition-colors min-w-0 px-1 ${
                isActive ? "text-purple-500" : "text-gray-500"
              }`}
            >
              <span className={`flex-shrink-0 ${isActive ? "text-purple-500" : "text-gray-500"}`}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  {item.icon}
                </div>
              </span>
              <span className={`text-[10px] sm:text-xs font-medium truncate w-full text-center ${isActive ? "text-purple-500" : "text-gray-500"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

