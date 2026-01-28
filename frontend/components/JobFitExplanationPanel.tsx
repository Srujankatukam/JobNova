"use client";

import { motion } from "framer-motion";
import type { Job } from "@/lib/types";

interface JobFitExplanationPanelProps {
  job: Job;
}

interface MatchBreakdownItemProps {
  label: string;
  percentage: number;
}

const MatchBreakdownItem = ({ label, percentage }: MatchBreakdownItemProps) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg">
      <div className="relative w-12 h-12 mb-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#E8E8E8" strokeWidth="5" />
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#A68BFA"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-800">{Math.round(percentage)}%</span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
};

export default function JobFitExplanationPanel({ job }: JobFitExplanationPanelProps) {
  const breakdown = job.matchBreakdown || {
    education: 93,
    skills: 93,
    workExp: 80,
    expLevel: 44,
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      {/* Gradient Background */}
      <div className="relative">
        <div
          className="absolute top-0 right-0 w-64 h-64 opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(255, 148, 228, 0.6) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Why is this job a good fit for me?
          </h2>

          {/* Match Breakdown Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <MatchBreakdownItem label="Education" percentage={breakdown.education} />
            <MatchBreakdownItem label="Work Exp" percentage={breakdown.workExp} />
            <MatchBreakdownItem label="Skills" percentage={breakdown.skills} />
            <MatchBreakdownItem label="Exp. Level" percentage={breakdown.expLevel} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      {/* Explanations */}
      <div className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-2">Relevant Experience ✅</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {job.fitExplanation || "You have substantial experience as a UI/UX Designer, Interaction Designer, and User Research Specialist. Your role aligns with designing interaction elements relevant to user experience design for digital products."}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-2">Seniority ✅</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            You have amassed over eight years of relevant experience, meeting the mid-level seniority requirement for the role.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-sm text-gray-900 mb-2">Education ⚠️</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            While your educational background is relevant, it may not strictly align with the specified fields required by the job.
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <button className="w-full px-5 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-full transition-colors">
          View Full Details
        </button>
      </div>
    </div>
  );
}
