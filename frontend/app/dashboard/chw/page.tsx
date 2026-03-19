"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import {
    Plus,
    Droplets,
    MapPin,
    CloudRain,
    CheckCircle2,
    Clock,
    Activity
} from "lucide-react";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { api, EnvReport, CHWDashboardStats } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { isAuthenticated, getRoleFromToken, getUserFromToken, getStoredToken } from "@/lib/auth";

export default function CHWDashboard() {
  const router = useRouter();
  const [reports, setReports] = useState<EnvReport[]>([]);
  const [stats, setStats] = useState<CHWDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Field Agent");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    } 
    
    const role = getRoleFromToken();
    if (role !== "CHW") {
      if (role === "ADMIN") router.push("/dashboard/admin");
      else if (role === "CLINICIAN") router.push("/dashboard/clinician");
      else router.push("/");
      return;
    }

    const token = getStoredToken();
    if (token) {
      const user = getUserFromToken(token);
      if (user) {
        setUserName(user.sub);
      }
    }

    const fetchData = async () => {
      try {
        const [reportsData, statsData] = await Promise.all([
          api.getMyReports(),
          api.getCHWStats()
        ]);
        setReports(reportsData);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

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
        <Header title="Community Health Worker Portal" userName={userName} />
        
        <div className="p-8 space-y-8 max-w-[1200px]">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Field Operations</h2>
              <p className="text-slate-500 font-medium">Reporting from {stats?.districtName || "Wouri"} District</p>
            </div>
            <button 
              onClick={() => router.push("/dashboard/chw/reports")}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
            >
              <Plus className="h-5 w-5" /> New Environment Report
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Action Cards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" /> My Recent Reports
                </h3>
                <div className="space-y-4">
                  {reports.length > 0 ? reports.slice(0, 5).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm">
                          <Droplets className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{report.hazardTypes.join(", ")}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {report.districtName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          report.status === 'OPEN' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {report.status}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          {formatDistanceToNow(new Date(report.reportTime))} ago
                        </span>
                      </div>
                    </div>
                  )) : (
                    <p className="text-center text-slate-500 py-8">No reports found.</p>
                  )}
                </div>
              </div>

              <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">District Health Status</h3>
                    <p className="text-blue-100 mb-6 opacity-80">{stats?.districtName} is currently at <span className="font-black underline">{stats?.currentRiskLevel || "UNKNOWN"} RISK</span>. {stats?.riskRecommendation}</p>
                    <div className="flex gap-4">
                       <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex-1 border border-white/10">
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Avg Temp</p>
                          <p className="text-2xl font-black">{stats?.currentTemp.toFixed(1)}°C</p>
                       </div>
                       <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex-1 border border-white/10">
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Humidity</p>
                          <p className="text-2xl font-black">{stats?.currentHumidity.toFixed(0)}%</p>
                       </div>
                    </div>
                 </div>
                 <Activity className="absolute -right-8 -bottom-8 h-48 w-48 text-white/5 group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Weather Alert</h3>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-3 text-amber-700 mb-2">
                    <CloudRain className="h-5 w-5" />
                    <span className="font-bold">Heavy Rain Expected</span>
                  </div>
                  <p className="text-xs text-amber-600 font-medium leading-relaxed">
                    Forecast predicts 40mm precipitation over next 24h. Increased risk of standing water in low-lying areas.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Task List</h3>
                <div className="space-y-4">
                   {[
                     { task: "Check Sector 4 Wells", done: true },
                     { task: "Log Clinical Samples", done: false },
                     { task: "Update District Map", done: false },
                   ].map((t, i) => (
                     <div key={i} className="flex items-center gap-3">
                        {t.done ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <div className="h-5 w-5 rounded-full border-2 border-slate-200" />}
                        <span className={`text-sm font-medium ${t.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{t.task}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
