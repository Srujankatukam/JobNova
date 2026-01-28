"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Job } from "@/lib/types";

interface JobCardProps {
  job: Job;
  index?: number;
}

export default function JobCard({ job, index = 0 }: JobCardProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(job.isLiked || false);
  const [isApplied, setIsApplied] = useState(job.isApplied || false);

  const formatSalary = () => {
    if (!job.salary) return null;
    const { min, max } = job.salary;
    if (min && max) {
      if (min >= 1000) {
        return `$${Math.round(min / 1000)}K/yr - $${Math.round(max / 1000)}K/yr`;
      }
      return `$${min.toLocaleString()}/yr - $${max.toLocaleString()}/yr`;
    }
    if (min) {
      if (min >= 1000) {
        return `$${Math.round(min / 1000)}K/yr+`;
      }
      return `$${min.toLocaleString()}+/yr`;
    }
    return null;
  };

  const getMatchCircleColor = (percentage: number) => {
    if (percentage >= 90) return "#B9FD33"; // Green for high match
    if (percentage >= 70) return "#A68BFA"; // Purple for medium match
    return "#FFD035"; // Yellow for fair match
  };

  // Calculate stroke-dasharray for circular progress
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const percentage = job.matchPercentage || 0;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('svg')) {
          return;
        }
        router.push(`/jobs/${job.id}`);
      }}
    >
      {/* Top Section - Match Circle & Job Info */}
      <div className="flex gap-3 sm:gap-5 mb-3 sm:mb-4">
        {/* Match Circle */}
        {job.matchPercentage !== undefined && (
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#F3F3F4"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={getMatchCircleColor(job.matchPercentage)}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm sm:text-base font-bold text-gray-800">
                {Math.round(job.matchPercentage)}%
              </span>
              <span className="text-[10px] sm:text-xs text-gray-600">Match</span>
            </div>
          </div>
        )}

        {/* Job Details */}
        <div className="flex-1 min-w-0">
          {/* Title Row */}
          <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Share Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_3666_100)">
                    <path d="M5.54552 8.99731L1.09538 13.4059C0.965439 13.5347 0.862304 13.6881 0.791921 13.857C0.721539 14.0259 0.685303 14.2071 0.685303 14.3902C0.685303 14.5732 0.721539 14.7544 0.791921 14.9233C0.862304 15.0922 0.965439 15.2456 1.09538 15.3745L4.03441 18.3135C4.16329 18.4434 4.31662 18.5466 4.48556 18.6169C4.65449 18.6873 4.8357 18.7236 5.01871 18.7236C5.20172 18.7236 5.38292 18.6873 5.55186 18.6169C5.7208 18.5466 5.87413 18.4434 6.00301 18.3135L10.4116 13.8634" stroke="#1F2937" strokeWidth="1.07826" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.8636 10.4114L18.2721 6.00285C18.4021 5.87398 18.5052 5.72065 18.5756 5.55171C18.646 5.38277 18.6822 5.20157 18.6822 5.01856C18.6822 4.83554 18.646 4.65434 18.5756 4.4854C18.5052 4.31647 18.4021 4.16314 18.2721 4.03426L15.3747 1.09523C15.2458 0.965287 15.0925 0.862151 14.9236 0.791769C14.7546 0.721386 14.5734 0.68515 14.3904 0.68515C14.2074 0.68515 14.0262 0.721386 13.8573 0.791769C13.6883 0.862151 13.535 0.965287 13.4061 1.09523L8.99756 5.54536" stroke="#1F2937" strokeWidth="1.07826" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.4772 6.93175L6.93188 12.4771" stroke="#1F2937" strokeWidth="1.07826" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_3666_100">
                      <rect width="19.4087" height="19.4087" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </motion.button>
              {/* Like Icon with Animation */}
              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                className={`relative transition-colors p-1 ${isLiked ? 'text-purple-500' : 'text-gray-500 hover:text-gray-700'}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={isLiked ? "currentColor" : "none"}
                  animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
                {isLiked && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-purple-500"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>

          {/* Company */}
          <div className="flex items-center gap-2 mb-2">
            {job.company === "Backd Business Funding" ? (
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/b.png"
                  alt="Backd Business Funding Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            ) : job.company === "Cursor AI" ? (
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/c.png"
                  alt="Cursor AI Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            ) : job.company === "Simons Foundation" ? (
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/s.png"
                  alt="Simons Foundation Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            ) : job.company === "TechCorp" ? (
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/tc.jpeg"
                  alt="TechCorp Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            ) : job.company === "InnovateAI" ? (
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/IA.jpeg"
                  alt="InnovateAI Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            ) : job.company === "StreamTech" ? (
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/st.png"
                  alt="StreamTech Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            ) : job.company === "WebFlow" ? (
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/w.png"
                  alt="WebFlow Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0" />
            )}
            <span className="text-gray-500 text-xs sm:text-sm truncate min-w-0">{job.company}</span>
          </div>

          {/* Location & Work Type */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700 flex-wrap">
            <div className="flex items-center gap-1 min-w-0">
              <svg width="12" height="12" className="sm:w-3.5 sm:h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[180px]">{job.location}</span>
            </div>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
            <div className="flex items-center gap-1">
              <svg width="12" height="12" className="sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="19" r="1" fill="currentColor" />
              </svg>
              <span className="capitalize">{job.workType || "On-Site"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tags Row */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 py-2 sm:py-3 border-t border-b border-gray-100">
        <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-700 border border-gray-200 rounded-full">
          {job.type.replace("-", " ")}
        </span>
        {job.skillsMatch && (
          <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-700 border border-gray-200 rounded-full">
            {job.skillsMatch}
          </span>
        )}
        {job.experienceLevel && (
          <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-700 border border-gray-200 rounded-full">
            {job.experienceLevel}
          </span>
        )}
        {formatSalary() && (
          <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-700 border border-gray-200 rounded-full">
            {formatSalary()}
          </span>
        )}
      </div>

      {/* Bottom Row - Time & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 pt-2 sm:pt-3">
        {/* Left - Time & Applicants */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <span className="px-2 sm:px-3 py-1 bg-purple-100 text-gray-700 rounded-full">
            {job.timePosted || "Recently posted"}
          </span>
          {job.applicantCount !== undefined && (
            <span className="text-gray-600">
              {job.applicantCount} applicants
            </span>
          )}
        </div>

        {/* Right - Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsApplied(true);
            }}
            className="flex-1 sm:flex-none px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            Apply
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/avatar?jobId=${job.id}`;
            }}
            className="flex-1 sm:flex-none px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-gray-800 bg-lime-400 hover:bg-lime-500 rounded-full transition-colors"
          >
            Mock Interview
          </button>
        </div>
      </div>
    </motion.div>
  );
}
