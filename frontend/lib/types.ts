// TypeScript types for the application

export interface MatchBreakdown {
  education: number; // percentage
  skills: number; // percentage
  workExp: number; // percentage
  expLevel: number; // percentage
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  workType: 'on-site' | 'remote' | 'hybrid';
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  description: string;
  requirements: string[];
  tags: string[];
  postedDate: string;
  featured?: boolean;
  logo?: string;
  // Match data
  matchPercentage?: number;
  matchBreakdown?: MatchBreakdown;
  skillsMatch?: string; // e.g., "0 of 3 skills match" or "5+ years exp"
  experienceLevel?: string; // e.g., "Mid Level", "Senior"
  applicantCount?: number;
  timePosted?: string; // e.g., "1 hours ago", "2 hours ago", "3 days ago"
  // Status indicators
  isMatched?: boolean;
  isLiked?: boolean;
  isApplied?: boolean;
  // Fit explanation
  fitExplanation?: string;
}

export interface JobFilters {
  search?: string;
  location?: string;
  type?: Job['type'];
  tags?: string[];
  minSalary?: number;
  maxSalary?: number;
}

export interface JobRecommendation {
  job: Job;
  score: number;
  reason: string;
  matchBreakdown?: MatchBreakdown;
  fitExplanation?: string;
}
