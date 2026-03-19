import axios from "axios";
import { API_BASE_URL } from "./auth";

// Define Types
export interface EnvReport {
  id: number;
  hazardTypes: string[];
  description: string;
  status: "OPEN" | "RESOLVED";
  reporterName: string;
  districtName: string;
  reportTime: string;
}

export interface ClinicalCase {
  id: number;
  diseaseType: string;
  severity: string;
  admissionTime: string;
  healthPersonnelUsername: string;
  patientAge: number;
  patientGender: string;
  description: string;
  hospital: string;
  districtName: string;
}

export interface CHWDashboardStats {
  currentTemp: number;
  currentHumidity: number;
  currentRiskLevel: "GREEN" | "YELLOW" | "RED" | null;
  riskRecommendation: string;
  openReportsCount: number;
  districtName: string;
  districtId: number;
}

export interface AdminDashboardStats {
  totalDistricts: number;
  totalAgents: number;
  totalClinicalCases: number;
  totalEnvReports: number;
  averageRiskScore: number;
  pendingAlerts: number;
}

// API Functions
export const api = {
  // Environmental Reports
  getMyReports: async (): Promise<EnvReport[]> => {
    const response = await axios.get(`${API_BASE_URL}/env-reports/my`);
    return response.data;
  },
  
  createReport: async (data: any): Promise<EnvReport> => {
    const response = await axios.post(`${API_BASE_URL}/env-reports`, data);
    return response.data;
  },

  // Clinical Cases
  getMyCases: async (): Promise<ClinicalCase[]> => {
    const response = await axios.get(`${API_BASE_URL}/clinical-cases/my`);
    return response.data;
  },

  getAllCases: async (): Promise<ClinicalCase[]> => {
    const response = await axios.get(`${API_BASE_URL}/clinical-cases`);
    return response.data;
  },

  // Dashboard Stats
  getCHWStats: async (): Promise<CHWDashboardStats> => {
    const response = await axios.get(`${API_BASE_URL}/dashboard/chw`);
    return response.data;
  },

  getAdminStats: async (): Promise<AdminDashboardStats> => {
    const response = await axios.get(`${API_BASE_URL}/dashboard/admin`);
    return response.data;
  },

  // Districts (useful for dropdowns)
  getDistricts: async (): Promise<any[]> => {
    const response = await axios.get(`${API_BASE_URL}/districts`);
    return response.data;
  }
};
