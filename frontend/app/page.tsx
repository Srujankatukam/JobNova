"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import JobCard from "@/components/JobCard";
import JobTabs from "@/components/JobTabs";
import AIMockInterviewPanel from "@/components/AIMockInterviewPanel";
import MobileAIPanel from "@/components/MobileAIPanel";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import BottomNav from "@/components/BottomNav";
import ScrollToTop from "@/components/ScrollToTop";
import Toast, { ToastType } from "@/components/Toast";
import SkeletonLoader from "@/components/SkeletonLoader";
import { jobsApi } from "@/lib/api";
import type { Job, JobFilters as JobFiltersType, JobRecommendation } from "@/lib/types";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [filters, setFilters] = useState<JobFiltersType>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileAIPanelOpen, setIsMobileAIPanelOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(73);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  // Calculate counts
  const likedCount = jobs.filter(j => j.isLiked).length;
  const appliedCount = jobs.filter(j => j.isApplied).length;

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await jobsApi.getJobs(filters);
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filters]);

  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoadingRecommendations(true);
        const data = await jobsApi.getRecommendations(6);
        setRecommendations(data);
      } catch (err: any) {
        // Silently handle recommendations error - it's not critical for the main page
        if (err?.response?.status !== 404) {
          console.error("Error fetching recommendations:", err);
        }
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, []);

  // Update header height on resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    // Initial calculation
    updateHeaderHeight();

    // Add resize listener
    window.addEventListener("resize", updateHeaderHeight);

    // ResizeObserver for robust detection of content changes (e.g., text wrapping)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 w-full overflow-x-hidden">
      {/* Left Sidebar - Desktop Only */}
      <Sidebar />

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Mobile AI Panel */}
      <MobileAIPanel isOpen={isMobileAIPanelOpen} onClose={() => setIsMobileAIPanelOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:ml-56 pb-16 lg:pb-0 w-full overflow-x-hidden max-w-full h-screen">
        {/* Top Header with Tabs - Fixed at top */}
        <header ref={headerRef} className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 lg:left-56 z-20 w-full flex-shrink-0">
          <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4">
            {/* Mobile Header with Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 lg:hidden mb-2 sm:mb-3">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="p-1.5 sm:p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">Jobs</h1>
            </div>
            <JobTabs likedCount={likedCount} appliedCount={appliedCount} />
          </div>
        </header>

        {/* Content area below header - Scrollable */}
        <div className="flex-1 flex flex-row w-full overflow-x-hidden overflow-y-auto" style={{
          marginTop: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
          maxHeight: `calc(100vh - ${headerHeight}px)`,
          width: '100%',
          maxWidth: '100%'
        }}>
          {/* Center Content */}
          <div className="flex-1 flex flex-col min-w-0 w-full max-w-full lg:mr-80 xl:mr-96" style={{ maxWidth: '100%' }}>
            {/* Filter Buttons Row */}
            <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex flex-wrap gap-2 sm:gap-3 w-full relative z-10 bg-transparent" style={{ overflow: 'visible', position: 'relative' }}>
              {/* Change Job Reference Button */}
              <button
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 md:px-6 py-2 sm:py-2.5 bg-purple-400 hover:bg-purple-500 transition-colors rounded-full flex-1 min-w-0 text-xs sm:text-sm md:text-base relative z-10"
                style={{ display: 'flex', visibility: 'visible', opacity: 1, flexShrink: 1, maxWidth: '100%' }}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_604_2152)">
                    <path d="M0.666748 2.66666V6.66666H4.66675" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.67333 9.99378C3.1056 11.2207 3.92489 12.2739 5.00777 12.9947C6.09065 13.7155 7.37846 14.0648 8.67714 13.9901C9.97583 13.9153 11.2151 13.4206 12.2081 12.5803C13.2011 11.74 13.8942 10.5998 14.1828 9.33136C14.4715 8.06295 14.3401 6.73509 13.8084 5.54785C13.2768 4.36061 12.3737 3.37831 11.2352 2.74896C10.0968 2.1196 8.7846 1.87729 7.49645 2.05853C6.2083 2.23976 5.01394 2.83473 4.09333 3.75378L1 6.66045" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_604_2152">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-white font-medium text-xs sm:text-sm truncate">
                  Change Job Reference
                </span>
              </button>

              {/* Top matched Button */}
              <button
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-white hover:bg-gray-50 transition-colors rounded-full border border-gray-200 text-xs sm:text-sm md:text-base flex-shrink-0"
                style={{ display: 'flex', visibility: 'visible', opacity: 1, minWidth: 'fit-content', whiteSpace: 'nowrap' }}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_3666_791)">
                    <path d="M6.28582 14.2857H1.71439C1.41129 14.2857 1.1206 14.1653 0.906268 13.951C0.691941 13.7367 0.571533 13.446 0.571533 13.1429V1.71428C0.571533 1.41118 0.691941 1.12049 0.906268 0.906162C1.1206 0.691834 1.41129 0.571426 1.71439 0.571426H14.2858C14.5889 0.571426 14.8796 0.691834 15.0939 0.906162C15.3083 1.12049 15.4287 1.41118 15.4287 1.71428V7.42857" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M0.571533 4H15.4287" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.8571 13.7143C12.4351 13.7143 13.7143 12.4351 13.7143 10.8571C13.7143 9.27919 12.4351 8 10.8571 8C9.27919 8 8 9.27919 8 10.8571C8 12.4351 9.27919 13.7143 10.8571 13.7143Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.8801 12.88L15.4287 15.4286" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3666_791">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <span className="text-gray-800 font-medium whitespace-nowrap">
                  Top matched
                </span>
              </button>
            </div>

            {/* Job Cards Area */}
            <div className="flex-1 px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 w-full">
              <div className="flex flex-col gap-3 sm:gap-4 max-w-4xl mx-auto w-full">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {isLoading ? (
                  <SkeletonLoader count={3} />
                ) : jobs.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center w-full">
                    <p className="text-gray-600 text-base sm:text-lg mb-2">No jobs found</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {jobs.map((job, index) => (
                      <JobCard key={job.id} job={job} index={index} />
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Right: AI Mock Interview Panel - Fixed Desktop Only */}
        <aside className="hidden lg:block fixed right-0 w-80 xl:w-96 flex-shrink-0 z-30" style={{
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
          maxHeight: `calc(100vh - ${headerHeight}px)`,
          overflowY: 'auto'
        }}>
          <div className="h-full p-4 bg-gray-100 w-full">
            <AIMockInterviewPanel />
          </div>
        </aside>
      </main>

      {/* Mobile AI Panel Button - Floating Action Button */}
      <button
        onClick={() => setIsMobileAIPanelOpen(true)}
        className="lg:hidden fixed bottom-20 right-3 sm:right-4 z-40 bg-purple-500 hover:bg-purple-600 text-white rounded-full p-3 sm:p-4 shadow-lg transition-colors"
        aria-label="Open AI Mock Interview"
        style={{
          minWidth: '44px',
          minHeight: '44px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        <svg width="24" height="24" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.58594 14.6665H3.66927C3.18304 14.6665 2.71673 14.4733 2.37291 14.1295C2.02909 13.7857 1.83594 13.3194 1.83594 12.8332V3.66649C1.83594 3.18026 2.02909 2.71395 2.37291 2.37013C2.71673 2.02631 3.18304 1.83316 3.66927 1.83316H18.3359C18.8222 1.83316 19.2885 2.02631 19.6323 2.37013C19.9761 2.71395 20.1693 3.18026 20.1693 3.66649V12.8332C20.1693 13.3194 19.9761 13.7857 19.6323 14.1295C19.2885 14.4733 18.8222 14.6665 18.3359 14.6665H17.4193" stroke="white" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.0013 12.8332L15.5846 18.3332H6.41797L11.0013 12.8332Z" stroke="white" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
