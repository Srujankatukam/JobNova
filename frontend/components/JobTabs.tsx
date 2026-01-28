"use client";

import { useState } from "react";

interface JobTabsProps {
  likedCount?: number;
  appliedCount?: number;
}

interface TabButtonProps {
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ label, count, isActive, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all text-xs sm:text-base ${
      isActive
        ? "bg-white border border-purple-500 text-gray-800"
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    <span className="font-medium whitespace-nowrap">{label}</span>
    {count !== undefined && count > 0 && (
      <span className="px-1.5 sm:px-2 py-0.5 text-xs sm:text-sm font-medium bg-lime-400 text-gray-800 rounded-full min-w-[20px] sm:min-w-[24px] text-center">
        {count}
      </span>
    )}
  </button>
);

export default function JobTabs({ likedCount = 0, appliedCount = 0 }: JobTabsProps) {
  const [activeTab, setActiveTab] = useState("matched");

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
      <TabButton
        label="Matched"
        isActive={activeTab === "matched"}
        onClick={() => setActiveTab("matched")}
      />
      
      {/* Separator */}
      <div className="w-px h-6 sm:h-8 bg-gray-200 mx-1 sm:mx-2 flex-shrink-0" />
      
      <TabButton
        label="Liked"
        count={likedCount}
        isActive={activeTab === "liked"}
        onClick={() => setActiveTab("liked")}
      />
      
      {/* Separator */}
      <div className="w-px h-6 sm:h-8 bg-gray-200 mx-1 sm:mx-2 flex-shrink-0" />
      
      <TabButton
        label="Applied"
        count={appliedCount}
        isActive={activeTab === "applied"}
        onClick={() => setActiveTab("applied")}
      />
    </div>
  );
}
