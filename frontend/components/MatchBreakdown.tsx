"use client";

import type { MatchBreakdown } from "@/lib/types";

interface MatchBreakdownProps {
  breakdown: MatchBreakdown;
  className?: string;
}

export default function MatchBreakdownComponent({ breakdown, className = "" }: MatchBreakdownProps) {
  const items = [
    { label: "Education", value: breakdown.education },
    { label: "Skills", value: breakdown.skills },
    { label: "Work Exp", value: breakdown.workExp },
    { label: "Exp. Level", value: breakdown.expLevel },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700 w-20">{item.label}</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${item.value}%` }}
            />
          </div>
          <span className="text-sm font-bold text-gray-900 w-12 text-right">
            {Math.round(item.value)}%
          </span>
        </div>
      ))}
    </div>
  );
}
