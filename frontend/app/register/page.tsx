"use client";

import Link from "next/link";
import { 
  Shield, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Loader2,
  Building2
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL, setAuthToken, getUserFromToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "CHW" // Default role
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);

      const { access_token, refresh_token } = response.data;
      setAuthToken(access_token);
      localStorage.setItem("refresh_token", refresh_token);

      const user = getUserFromToken(access_token);
      if (user) {
        // Redirect based on the role
        switch (user.role) {
          case "ADMIN":
            router.push("/dashboard/admin");
            break;
          case "CHW":
            router.push("/dashboard/chw");
            break;
          case "CLINICIAN":
            router.push("/dashboard/clinician");
            break;
          default:
            router.push("/");
        }
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed. Please check your information.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-blue-100 selection:text-blue-600">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Epi<span className="text-blue-600">Predict</span></span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
          <p className="text-slate-500 mt-2 font-medium">Join the surveillance network today</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 tracking-tight">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    name="firstname"
                    type="text" 
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 tracking-tight">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input 
                    name="lastname"
                    type="text" 
                    required
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 tracking-tight">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  name="email"
                  type="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@organization.org"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 tracking-tight">Access Role</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <select 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium appearance-none"
                >
                  <option value="CHW">Community Health Worker (CHW)</option>
                  <option value="CLINICIAN">Clinician</option>
                  <option value="ADMIN">System Administrator</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 tracking-tight block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  name="password"
                  type="password" 
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Register <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 tracking-tight">
              Sign In
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400 font-medium">
          By registering, you agree to comply with medical data privacy regulations and security protocols.
        </p>
      </motion.div>
    </div>
  );
}
