"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { AlertCircle, CheckCircle2, Droplets, Layout, ChevronLeft, Send, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getRoleFromToken, getUserFromToken, getStoredToken } from "@/lib/auth";
import { api, CHWDashboardStats } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

const HAZARD_TYPES = [
  { id: "STANDING_WATER", label: "Standing Water", icon: Droplets },
  { id: "BLOCKED_DRAIN", label: "Blocked Drain", icon: Layout },
  { id: "WASTE_PILE", label: "Waste Pile", icon: Layout },
  { id: "DEAD_LIVESTOCK", label: "Dead Livestock", icon: Layout }
];

export default function NewEnvReportPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState<CHWDashboardStats | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [hazardTypes, setHazardTypes] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    const role = getRoleFromToken();
    if (role !== "CHW") {
        router.push("/dashboard");
        return;
    }

    const token = getStoredToken();
    if (token) {
      const user = getUserFromToken(token);
      if (user) {
        setUserName(user.sub);
      }
    }

    const fetchStats = async () => {
        try {
            const statsData = await api.getCHWStats();
            setStats(statsData);
        } catch (error) {
            console.error("Failed to fetch dashboard stats", error);
        } finally {
            setLoading(false);
        }
    };

    fetchStats();
  }, [router]);

  const toggleHazard = (id: string) => {
    setHazardTypes(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hazardTypes.length === 0) {
        setError("Please select at least one hazard type.");
        return;
    }

    setSubmitting(true);
    setError(null);

    try {
        await api.createReport({
            hazardTypes,
            description
        });
        setSuccess(true);
        setTimeout(() => router.push("/dashboard/chw"), 2000);
    } catch (err: any) {
        setError(err.response?.data?.message || "Failed to submit report. Please try again.");
    } finally {
        setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-600">
      <Sidebar role="CHW" />
      <main className="flex-1 ml-64">
        <Header title="New Environmental Report" userName={userName} />
        
        <div className="p-8 max-w-[800px] mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors group"
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </button>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6"
              >
                <div className="inline-flex p-4 bg-emerald-100 text-emerald-600 rounded-full">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Report Submitted!</h2>
                <p className="text-slate-500 font-medium">Your report has been successfully logged for {stats?.districtName} District.</p>
                <div className="pt-4">
                  <div className="inline-block h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 2 }}
                        className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
              >
                <div className="mb-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-sm font-bold text-blue-700">Reporting for: <span className="underline decoration-2 underline-offset-4">{stats?.districtName} District</span></p>
                    <p className="text-xs text-blue-500 mt-1">Report will be automatically associated with your assigned district.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest">
                      Hazard Types <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {HAZARD_TYPES.map((type) => {
                        const Icon = type.icon;
                        const isSelected = hazardTypes.includes(type.id);
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => toggleHazard(type.id)}
                            className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                              isSelected 
                                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md shadow-blue-100' 
                                : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                            }`}
                          >
                            <div className={`p-2 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-sm">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest">
                      Detailed Description
                    </label>
                    <textarea 
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide more details about the environmental hazard..."
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 animate-shake">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm font-bold">{error}</p>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {submitting ? (
                        <>
                            <Loader2 className="h-6 w-6 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Send className="h-5 w-5" />
                            Submit Environmental Report
                        </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
