"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface MobileNavProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function MobileNav({ onClose, isOpen }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Jobs",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="1.83334" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="1.83334" />
        </svg>
      ),
    },
    {
      href: "/avatar",
      label: "AI Mock Interview",
      icon: (
        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.58594 14.6665H3.66927C3.18304 14.6665 2.71673 14.4733 2.37291 14.1295C2.02909 13.7857 1.83594 13.3194 1.83594 12.8332V3.66649C1.83594 3.18026 2.02909 2.71395 2.37291 2.37013C2.71673 2.02631 3.18304 1.83316 3.66927 1.83316H18.3359C18.8222 1.83316 19.2885 2.02631 19.6323 2.37013C19.9761 2.71395 20.1693 3.18026 20.1693 3.66649V12.8332C20.1693 13.3194 19.9761 13.7857 19.6323 14.1295C19.2885 14.4733 18.8222 14.6665 18.3359 14.6665H17.4193" stroke="#1D2633" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.0013 12.8332L15.5846 18.3332H6.41797L11.0013 12.8332Z" stroke="#1D2633" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      href: "/resume",
      label: "Resume",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.83333" />
          <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.83333" />
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.83333" />
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.83333" />
          <line x1="10" y1="9" x2="8" y2="9" stroke="currentColor" strokeWidth="1.83333" />
        </svg>
      ),
    },
  ];

  const settingsItems = [
    {
      href: "/profile",
      label: "Profile",
      icon: (
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_3666_691)">
            <path d="M19.4354 9.2082L11.7771 16.8665C10.8389 17.8047 9.56642 18.3318 8.2396 18.3318C6.91278 18.3318 5.6403 17.8047 4.7021 16.8665C3.76389 15.9283 3.23682 14.6558 3.23682 13.329C3.23682 12.0022 3.76389 10.7297 4.7021 9.79153L12.3604 2.1332C12.9859 1.50773 13.8342 1.15634 14.7188 1.15634C15.6033 1.15634 16.4516 1.50773 17.0771 2.1332C17.7026 2.75866 18.054 3.60698 18.054 4.49153C18.054 5.37607 17.7026 6.22439 17.0771 6.84986L9.41043 14.5082C9.0977 14.8209 8.67354 14.9966 8.23126 14.9966C7.78899 14.9966 7.36483 14.8209 7.0521 14.5082C6.73936 14.1955 6.56367 13.7713 6.56367 13.329C6.56367 12.8868 6.73936 12.4626 7.0521 12.1499L14.1271 5.0832" stroke="#1D2633" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      ),
    },
    {
      href: "/settings",
      label: "Setting",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.83333" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.83333" />
        </svg>
      ),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 overflow-y-auto lg:hidden shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <Link href="/" onClick={onClose} className="flex items-center">
                  <Image
                    src="/Frame_2087327261.png"
                    alt="JobNova Logo"
                    width={150}
                    height={42}
                    className="object-contain"
                  />
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 py-4 overflow-y-auto">
                <div className="space-y-1 px-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${
                        pathname === item.href
                          ? "bg-purple-400 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
                      <span className="font-medium text-base">{item.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="mx-4 my-4 border-t border-gray-200" />

                <div className="space-y-1 px-2">
                  {settingsItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${
                        pathname === item.href
                          ? "bg-purple-400 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="w-6 h-6 flex items-center justify-center">{item.icon}</span>
                      <span className="font-medium text-base">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Upgrade Card */}
              <div className="p-4 border-t border-gray-200">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-300 via-purple-400 to-purple-600 p-4">
                  <h3 className="text-white font-semibold text-base mb-1">Upgrade Your Plan</h3>
                  <p className="text-white/80 text-xs mb-3">Boost your success rate now!</p>
                  <Link
                    href="/subscription"
                    onClick={onClose}
                    className="inline-block bg-white text-gray-800 font-medium text-xs px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Subscription
                  </Link>
                </div>
              </div>

              {/* User Avatar */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-semibold">
                    N
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">User</p>
                    <p className="text-xs text-gray-500 truncate">Free Plan</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

