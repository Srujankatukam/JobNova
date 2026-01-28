"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import JobTabs from "@/components/JobTabs";
import MobileNav from "@/components/MobileNav";
import BottomNav from "@/components/BottomNav";
import { jobsApi } from "@/lib/api";
import type { Job } from "@/lib/types";

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

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);


  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const jobId = params.id as string;
        const data = await jobsApi.getJobById(jobId);
        if (data) {
          setJob(data);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  const formatSalary = () => {
    if (!job?.salary) return null;
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
    if (percentage >= 90) return "#B9FD33";
    if (percentage >= 70) return "#A68BFA";
    return "#FFD035";
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100 w-full overflow-x-hidden">
        <Sidebar />
        <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <main className="flex-1 flex items-center justify-center lg:ml-56 pb-16 lg:pb-0 w-full overflow-x-hidden max-w-full">
          <div className="text-center px-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading job details...</p>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex min-h-screen bg-gray-100 w-full overflow-x-hidden">
        <Sidebar />
        <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <main className="flex-1 flex items-center justify-center lg:ml-56 pb-16 lg:pb-0 w-full overflow-x-hidden max-w-full">
          <div className="text-center px-4">
            <p className="text-red-600 mb-4">{error || "Job not found"}</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  const breakdown = job.matchBreakdown || {
    education: 93,
    skills: 93,
    workExp: 80,
    expLevel: 44,
  };

  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const percentage = job.matchPercentage || 0;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-100 w-full overflow-x-hidden">
      {/* Left Sidebar - Desktop Only */}
      <Sidebar />

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:ml-56 pb-16 lg:pb-0 h-screen overflow-x-hidden">
        {/* Header - Static in flex container */}
        <header className="bg-white border-b border-gray-200 z-20 w-full flex-shrink-0 sticky top-0 lg:static">
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
              <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">Job Details</h1>
            </div>
            <JobTabs likedCount={0} appliedCount={0} />
          </div>
        </header>

        {/* Main Content - Scrollable Area (Grid Layout) */}
        <div className="flex-1 w-full overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_24rem]">
          {/* Center Content - Independent Scroll */}
          <div className="min-w-0 overflow-y-auto h-full">
            {/* Navigation Bar */}
            <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex items-center gap-2 sm:gap-4 flex-wrap">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M12 19l-7-7 7-7"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-400 text-white text-xs sm:text-sm font-medium rounded-full">
                {job.applicantCount || 27} applicants
              </span>

              <div className="flex-1" />

              <button className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm sm:text-base font-medium rounded-full transition-colors">
                Apply Now
              </button>
            </div>

            {/* Job Content */}
            <div className="flex-1 px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 w-full">
              <div className="bg-white rounded-xl p-4 sm:p-6 max-w-4xl mx-auto w-full">
                {/* Job Header */}
                <div className="flex gap-4 sm:gap-6 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  {/* Company Logo */}
                  {job.company === "Backd Business Funding" ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                      <Image
                        src="/b.png"
                        alt="Backd Business Funding Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : job.company === "Cursor AI" ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                      <Image
                        src="/c.png"
                        alt="Cursor AI Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : job.company === "Simons Foundation" ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                      <Image
                        src="/s.png"
                        alt="Simons Foundation Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : job.company === "TechCorp" ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                      <Image
                        src="/tc.jpeg"
                        alt="TechCorp Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : job.company === "InnovateAI" ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                      <Image
                        src="/IA.jpeg"
                        alt="InnovateAI Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : job.company === "StreamTech" ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                      <Image
                        src="/st.png"
                        alt="StreamTech Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : job.company === "WebFlow" ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                      <Image
                        src="/w.png"
                        alt="WebFlow Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0" />
                  )}

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 sm:px-3 py-1 bg-purple-100 text-gray-700 text-xs sm:text-sm rounded-full mb-2">
                      {job.timePosted || "2 hours ago"}
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
                    <p className="text-sm sm:text-base text-gray-500 mb-2">{job.company}</p>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 flex-wrap">
                      <span className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500" />
                      <span>{job.timePosted || "3 days ago"}</span>
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500" />
                      <span className="capitalize">{job.workType || "Remote"}</span>
                    </div>
                  </div>

                  {/* Match Circle */}
                  {job.matchPercentage !== undefined && (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 hidden sm:block">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="35" fill="none" stroke="#F3F3F4" strokeWidth="6" />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="35"
                          fill="none"
                          stroke={getMatchCircleColor(job.matchPercentage)}
                          strokeWidth="6"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset: offset }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm sm:text-base font-bold text-gray-800">{Math.round(job.matchPercentage)}%</span>
                        <span className="text-[10px] sm:text-xs text-gray-600">Match</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  <span className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.5801 8.13995C15.5801 13.9266 8.14014 18.8865 8.14014 18.8865C8.14014 18.8865 0.700195 13.9266 0.700195 8.13995C0.700195 6.16676 1.48404 4.27438 2.8793 2.87912C4.27456 1.48386 6.16694 0.700012 8.14014 0.700012C10.1133 0.700012 12.0057 1.48386 13.401 2.87912C14.7962 4.27438 15.5801 6.16676 15.5801 8.13995Z" stroke="#717171" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.14111 10.617C9.51077 10.617 10.6211 9.50668 10.6211 8.13702C10.6211 6.76737 9.51077 5.65704 8.14111 5.65704C6.77146 5.65704 5.66113 6.76737 5.66113 8.13702C5.66113 9.50668 6.77146 10.617 8.14111 10.617Z" stroke="#717171" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    United States
                  </span>
                  <span className="flex items-center gap-2 text-sm text-gray-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.6706 8.16797V19.0004H4.67188V8.16797" stroke="#717171" strokeWidth="1.24989" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21.3317 4H3V8.16631H21.3317V4Z" stroke="#717171" strokeWidth="1.24989" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.5 11.4961H13.833" stroke="#717171" strokeWidth="1.24989" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    {job.type.replace("-", " ")}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-gray-600 capitalize">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.53297 5.90996L2.65025 5.91845C6.34265 6.231 9.28418 9.18039 9.58415 12.8766C9.58604 12.9008 9.58792 12.9319 9.59012 12.9709C9.59715 13.1041 9.55098 13.2347 9.46176 13.3338C9.37255 13.433 9.2476 13.4927 9.11438 13.4998L9.08734 13.5004H8.70908C8.58119 13.5004 8.45809 13.4517 8.36481 13.3642C8.27154 13.2767 8.21508 13.157 8.20693 13.0294C8.20378 12.9828 8.20064 12.9413 8.19749 12.9052C7.91891 9.96773 5.59901 7.62489 2.67226 7.31045C2.60614 7.30402 2.53988 7.29909 2.47354 7.29568C2.34541 7.28813 2.225 7.2319 2.13697 7.1385C2.04894 7.04509 1.99994 6.92156 2 6.79321V6.41243C2.00001 6.34385 2.01404 6.276 2.04122 6.21304C2.06841 6.15008 2.10818 6.09334 2.1581 6.04632C2.20801 5.99929 2.26701 5.96296 2.33148 5.93957C2.39594 5.91617 2.46451 5.90621 2.53297 5.91028V5.90996ZM2.52165 1.50066C2.56504 1.50223 2.60403 1.5038 2.63893 1.50569C8.77165 1.82704 13.6859 6.74887 13.996 12.8847L13.9997 12.9813C14.004 13.1146 13.9551 13.2442 13.8638 13.3415C13.7725 13.4388 13.6463 13.4958 13.513 13.5001H13.5048L13.119 13.5004C12.9889 13.5003 12.8639 13.4499 12.7702 13.3596C12.6765 13.2693 12.6214 13.1462 12.6166 13.0162C12.6147 12.9659 12.6125 12.9212 12.6103 12.8822C12.3024 7.51609 8.01324 3.21652 2.65119 2.89203C2.5962 2.88905 2.54117 2.88674 2.48612 2.88511C2.35565 2.8807 2.23201 2.82576 2.1413 2.73189C2.05059 2.63801 1.99993 2.51255 2 2.38202V2.00344C1.99995 1.93578 2.01356 1.86881 2.03999 1.80653C2.06643 1.74425 2.10515 1.68794 2.15385 1.64097C2.20255 1.594 2.26022 1.55734 2.32342 1.53318C2.38661 1.50902 2.45403 1.49785 2.52165 1.50034V1.50066ZM3.25774 10.9849C3.59131 10.9849 3.91122 11.1174 4.14709 11.3533C4.38296 11.5892 4.51547 11.9091 4.51547 12.2427C4.51547 12.5762 4.38296 12.8961 4.14709 13.132C3.91122 13.3679 3.59131 13.5004 3.25774 13.5004C2.92416 13.5004 2.60425 13.3679 2.36838 13.132C2.13251 12.8961 2 12.5762 2 12.2427C2 11.9091 2.13251 11.5892 2.36838 11.3533C2.60425 11.1174 2.92416 10.9849 3.25774 10.9849Z" fill="black" />
                    </svg>

                    {job.workType || "Remote"}
                  </span>
                  {formatSalary() && (
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2003 8.80021C14.1769 8.80021 17.4006 7.72565 17.4006 6.4001C17.4006 5.07456 14.1769 4 10.2003 4C6.22369 4 3 5.07456 3 6.4001C3 7.72565 6.22369 8.80021 10.2003 8.80021Z" stroke="#717171" strokeWidth="1.20005" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17.4006 12.0003C17.4006 13.3284 14.2005 14.4004 10.2003 14.4004C6.20014 14.4004 3 13.3284 3 12.0003" stroke="#717171" strokeWidth="1.20005" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6.39941V17.5999C3 18.928 6.20014 20 10.2003 20C14.2005 20 17.4006 18.928 17.4006 17.5999V6.39941" stroke="#717171" strokeWidth="1.20005" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>

                      {formatSalary()}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {job.description || "We are looking for a talented professional to join our team. This role offers exciting opportunities to work on cutting-edge projects and collaborate with industry experts."}
                  </p>
                </div>

                {/* AI Mock Interview Banner */}
                <div className="bg-lime-400 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-black/10">
                    <div className="flex-shrink-0">
                      <svg width="40" height="40" className="sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40.5 23.5H40.22C39.07 18.36 34.48 14.5 29 14.5H25.5V13.22C27.24 12.6 28.5 10.95 28.5 8.99998C28.5 6.51998 26.48 4.49998 24 4.49998C21.52 4.49998 19.5 6.51998 19.5 8.99998C19.5 10.95 20.76 12.6 22.5 13.22V14.5H19C13.52 14.5 8.93 18.36 7.78 23.5H7.5C5.85 23.5 4.5 24.85 4.5 26.5V29.5C4.5 31.15 5.85 32.5 7.5 32.5H8.05C9.23 36.18 12.21 39.04 15.95 40.08C15.67 40.67 15.5 41.31 15.5 42C15.5 42.83 16.17 43.5 17 43.5H31C31.83 43.5 32.5 42.83 32.5 42C32.5 41.31 32.33 40.66 32.05 40.08C35.79 39.05 38.77 36.18 39.95 32.5H40.5C42.15 32.5 43.5 31.15 43.5 29.5V26.5C43.5 24.85 42.15 23.5 40.5 23.5ZM24 7.49998C24.83 7.49998 25.5 8.16998 25.5 8.99998C25.5 9.82998 24.83 10.5 24 10.5C23.17 10.5 22.5 9.82998 22.5 8.99998C22.5 8.16998 23.17 7.49998 24 7.49998ZM29 37.5H19C14.31 37.5 10.5 33.69 10.5 29V26C10.5 21.31 14.31 17.5 19 17.5H29C33.69 17.5 37.5 21.31 37.5 26V29C37.5 33.69 33.69 37.5 29 37.5Z" fill="black" />
                        <path d="M18.5 21.5C16.85 21.5 15.5 22.85 15.5 24.5V27.5C15.5 29.15 16.85 30.5 18.5 30.5C20.15 30.5 21.5 29.15 21.5 27.5V24.5C21.5 22.85 20.15 21.5 18.5 21.5Z" fill="black" />
                        <path d="M29.5 21.5C27.85 21.5 26.5 22.85 26.5 24.5V27.5C26.5 29.15 27.85 30.5 29.5 30.5C31.15 30.5 32.5 29.15 32.5 27.5V24.5C32.5 22.85 31.15 21.5 29.5 21.5Z" fill="black" />
                        <path d="M13.53 7.41998L16.53 8.41998C16.69 8.46998 16.85 8.49998 17 8.49998C17.63 8.49998 18.21 8.09998 18.42 7.46998C18.68 6.67998 18.26 5.82998 17.47 5.56998L14.47 4.56998C13.69 4.30998 12.84 4.72998 12.57 5.51998C12.3 6.30998 12.73 7.15998 13.52 7.41998H13.53Z" fill="black" />
                        <path d="M14 13.5C14.16 13.5 14.32 13.48 14.47 13.42L17.47 12.42C18.26 12.16 18.68 11.31 18.42 10.52C18.16 9.72998 17.31 9.30998 16.52 9.56998L13.52 10.57C12.73 10.83 12.31 11.68 12.57 12.47C12.78 13.1 13.36 13.5 13.99 13.5H14Z" fill="black" />
                        <path d="M31 8.49998C31.16 8.49998 31.32 8.47998 31.47 8.41998L34.47 7.41998C35.26 7.15998 35.68 6.30998 35.42 5.51998C35.16 4.72998 34.31 4.30998 33.52 4.56998L30.52 5.56998C29.73 5.82998 29.31 6.67998 29.57 7.46998C29.78 8.09998 30.36 8.49998 30.99 8.49998H31Z" fill="black" />
                        <path d="M30.53 12.42L33.53 13.42C33.69 13.47 33.85 13.5 34 13.5C34.63 13.5 35.21 13.1 35.42 12.47C35.68 11.68 35.26 10.83 34.47 10.57L31.47 9.56998C30.69 9.30998 29.83 9.72998 29.57 10.52C29.31 11.31 29.73 12.16 30.52 12.42H30.53Z" fill="black" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Maximize your interview success</h3>
                      <p className="text-xs sm:text-sm text-gray-700/70">
                        Our platform simulates real interview scenarios, helping you refine your responses and boost your confidence.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1">Job-Specific Simulations:</h4>
                      <p className="text-xs sm:text-sm text-gray-700/70">Practice with questions tailored to your target role.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1">Actionable Feedback</h4>
                      <p className="text-xs sm:text-sm text-gray-700/70">Get detailed analysis and improvement suggestions.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1">Boost Success Rates:</h4>
                      <p className="text-xs sm:text-sm text-gray-700/70">Perfect your skills and land the job you want.</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => router.push(`/avatar?jobId=${job.id}`)}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm sm:text-base font-medium rounded-full transition-colors"
                    >
                      Mock Interview
                    </button>
                  </div>
                </div>

                {/* Qualifications */}
                <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Qualification</h2>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                    Discover how your skills align with the requirements of this position.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {(job.tags && job.tags.length > 0 ? job.tags.slice(0, 8) : ["AWS", "DevOps", "API", "Analysis Skills"]).map((tag, i) => (
                      <span key={i} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-200 text-gray-700 text-xs sm:text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Required</h3>
                  <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm mb-4 sm:mb-6">
                    {(job.requirements && job.requirements.length > 0 ? job.requirements.slice(0, 4) : [
                      "3+ years of design experience",
                      "3+ years of delivering design solutions",
                      "Have an available online portfolio",
                      "Experience prototyping"
                    ]).map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>

                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Preferred</h3>
                  <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    {(job.requirements && job.requirements.length > 4 ? job.requirements.slice(4, 6) : [
                      "2+ years of mass-market consumer web experience",
                      "Experience working in a collaborative team"
                    ]).map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Benefits</h2>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">We believe happy team members create amazing work. Here&apos;s what we offer:</p>
                  <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <li>🏠 Remote Flexibility: Work from wherever you&apos;re most productive</li>
                    <li>📈 Equity Options: Become a shareholder through our stock options plan</li>
                    <li>⚕️ Health Coverage: Comprehensive health support</li>
                    <li>🎂 Birthday Bliss: Celebrate with an extra day off</li>
                    <li>🧠 Mental Wellness: Free access to psychological support</li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Company</h2>
                  <div className="flex items-start gap-3 sm:gap-4">
                    {job.company === "Backd Business Funding" ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src="/b.png"
                          alt="Backd Business Funding Logo"
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    ) : job.company === "Cursor AI" ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src="/c.png"
                          alt="Cursor AI Logo"
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    ) : job.company === "Simons Foundation" ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src="/s.png"
                          alt="Simons Foundation Logo"
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    ) : job.company === "TechCorp" ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src="/tc.jpeg"
                          alt="TechCorp Logo"
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    ) : job.company === "InnovateAI" ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src="/IA.jpeg"
                          alt="InnovateAI Logo"
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    ) : job.company === "StreamTech" ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src="/st.png"
                          alt="StreamTech Logo"
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    ) : job.company === "WebFlow" ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src="/w.png"
                          alt="WebFlow Logo"
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-xl flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{job.company}</h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                        <span>Founded in 1979</span>
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500" />
                        <span>{job.location}</span>
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500" />
                        <span>1001-5000 employees</span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        A leading company in the industry, focused on innovation and creating exceptional products and services for our customers worldwide.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Right Panel - Job Fit Explanation - Grid Item (Desktop Only) */}
          <aside className="hidden lg:block h-full overflow-y-auto border-l border-gray-200 bg-gray-50/50">
            <div className="h-full p-4 w-full">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full h-full flex flex-col">
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
                      {job.fitExplanation || "You have substantial experience that aligns well with this role's requirements."}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-gray-900 mb-2">Seniority ✅</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Your experience level meets the requirements for this position.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-gray-900 mb-2">Education ⚠️</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Your educational background is relevant, though may not align with specific requirements.
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button className="w-full px-5 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-full transition-colors">
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main >

      {/* Bottom Navigation - Mobile Only */}
      < BottomNav />
    </div >
  );
}
