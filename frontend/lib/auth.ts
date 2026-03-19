import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const API_BASE_URL = "http://localhost:8080/api/v1";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserPayload {
  sub: string;
  userId: number;
  role: string;
  districtId?: number;
  iat: number;
  exp: number;
}

export const setAuthToken = (token: string | null) => {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }
};

export const getStoredToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

export const getUserFromToken = (token: string): UserPayload | null => {
  try {
    return jwtDecode<UserPayload>(token);
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

export const isAuthenticated = () => {
  const token = getStoredToken();
  if (!token) return false;
  
  const user = getUserFromToken(token);
  if (!user) return false;
  
  const currentTime = Date.now() / 1000;
  return user.exp > currentTime;
};

export const getRoleFromToken = () => {
  const token = getStoredToken();
  if (!token) return null;
  const user = getUserFromToken(token);
  return user?.role || null;
};

export const logout = () => {
  setAuthToken(null);
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

// Axios interceptor to add token to requests
axios.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
