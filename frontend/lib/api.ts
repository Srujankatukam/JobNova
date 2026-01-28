// API client for backend communication
import axios from 'axios';
import type { Job, JobFilters, JobRecommendation } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Job Board APIs
export const jobsApi = {
  // Get all jobs with optional filters
  getJobs: async (filters?: JobFilters): Promise<Job[]> => {
    const response = await apiClient.get<Job[]>('/api/jobs', {
      params: filters,
    });
    return response.data;
  },

  // Get job by ID
  getJobById: async (id: string): Promise<Job> => {
    const response = await apiClient.get<Job>(`/api/jobs/${id}`);
    return response.data;
  },

  // Get job recommendations
  getRecommendations: async (limit?: number): Promise<JobRecommendation[]> => {
    const response = await apiClient.get<JobRecommendation[]>('/api/jobs/recommendations', {
      params: { limit },
    });
    return response.data;
  },
};

export default apiClient;
