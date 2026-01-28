"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { JobFilters as JobFiltersType } from "@/lib/types";

interface JobFiltersProps {
  filters: JobFiltersType;
  onFiltersChange: (filters: JobFiltersType) => void;
}

const JOB_TYPES = ["full-time", "part-time", "contract", "internship"] as const;
const POPULAR_TAGS = ["AI", "Remote", "Full-Stack", "Python", "Next.js", "TypeScript", "React", "Startup"];

export default function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const updateFilter = <K extends keyof JobFiltersType>(
    key: K,
    value: JobFiltersType[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== null && value !== ""
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={filters.search || ""}
              onChange={(e) => updateFilter("search", e.target.value)}
              placeholder="Job title, company, keywords..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={filters.location || ""}
              onChange={(e) => updateFilter("location", e.target.value)}
              placeholder="City, State, or Remote"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    updateFilter("type", filters.type === type ? undefined : type)
                  }
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors capitalize ${
                    filters.type === type
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Popular Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((tag) => {
                const isSelected = filters.tags?.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => {
                      const currentTags = filters.tags || [];
                      const newTags = isSelected
                        ? currentTags.filter((t) => t !== tag)
                        : [...currentTags, tag];
                      updateFilter("tags", newTags.length > 0 ? newTags : undefined);
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      isSelected
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Salary
              </label>
              <input
                type="number"
                value={filters.minSalary || ""}
                onChange={(e) =>
                  updateFilter("minSalary", e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="Min"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Salary
              </label>
              <input
                type="number"
                value={filters.maxSalary || ""}
                onChange={(e) =>
                  updateFilter("maxSalary", e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="Max"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between"
        >
          <span className="text-sm font-medium text-gray-700">Filters</span>
          <span className="text-sm text-gray-500">
            {hasActiveFilters
              ? `${Object.values(filters).filter((v) => v).length} active`
              : "None"}
          </span>
        </button>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 overflow-y-auto md:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <input
                      type="text"
                      value={filters.search || ""}
                      onChange={(e) => updateFilter("search", e.target.value)}
                      placeholder="Job title, company, keywords..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={filters.location || ""}
                      onChange={(e) => updateFilter("location", e.target.value)}
                      placeholder="City, State, or Remote"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                    <div className="flex flex-wrap gap-2">
                      {JOB_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => updateFilter("type", filters.type === type ? undefined : type)}
                          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors capitalize ${
                            filters.type === type
                              ? "bg-purple-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {type.replace("-", " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Popular Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_TAGS.map((tag) => {
                        const isSelected = filters.tags?.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => {
                              const currentTags = filters.tags || [];
                              const newTags = isSelected
                                ? currentTags.filter((t) => t !== tag)
                                : [...currentTags, tag];
                              updateFilter("tags", newTags.length > 0 ? newTags : undefined);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                              isSelected
                                ? "bg-purple-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary</label>
                      <input
                        type="number"
                        value={filters.minSalary || ""}
                        onChange={(e) => updateFilter("minSalary", e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="Min"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary</label>
                      <input
                        type="number"
                        value={filters.maxSalary || ""}
                        onChange={(e) => updateFilter("maxSalary", e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="Max"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 px-4 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
