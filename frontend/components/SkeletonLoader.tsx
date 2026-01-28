"use client";

import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
}

export default function SkeletonLoader({ count = 3, className = "" }: SkeletonLoaderProps) {
  return (
    <div className={`flex flex-col gap-3 sm:gap-4 w-full ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 w-full"
        >
          <div className="flex gap-3 sm:gap-4">
            {/* Avatar skeleton */}
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex-shrink-0 animate-pulse" />
            
            {/* Content skeleton */}
            <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
              <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              
              {/* Tags skeleton */}
              <div className="flex gap-2 mt-3 sm:mt-4 flex-wrap">
                <div className="h-7 sm:h-8 bg-gray-200 rounded-full w-16 sm:w-20 animate-pulse" />
                <div className="h-7 sm:h-8 bg-gray-200 rounded-full w-24 sm:w-32 animate-pulse" />
                <div className="h-7 sm:h-8 bg-gray-200 rounded-full w-20 sm:w-24 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

