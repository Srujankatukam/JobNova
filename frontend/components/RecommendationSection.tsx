"use client";

import { motion } from "framer-motion";
import JobCard from "./JobCard";
import type { JobRecommendation } from "@/lib/types";

interface RecommendationSectionProps {
  recommendations: JobRecommendation[];
  isLoading?: boolean;
}

export default function RecommendationSection({
  recommendations,
  isLoading = false,
}: RecommendationSectionProps) {
  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
            >
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-7 bg-gray-200 rounded-full w-16"></div>
                <div className="h-7 bg-gray-200 rounded-full w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <JobCard job={rec.job} index={index} />
            {rec.reason && (
              <p className="text-xs text-gray-500 mt-2 ml-2">{rec.reason}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
