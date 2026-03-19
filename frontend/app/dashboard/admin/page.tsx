"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { 
  Activity, 
  Users, 
  AlertTriangle, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Map as MapIcon
} from "lucide-react";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { api, AdminDashboardStats } from "@/lib/api";
import { useRouter } from "next/navigation";
import { isAuthenticated, getRoleFromToken, getUserFromToken, getStoredToken } from "@/lib/auth";

export default function AdminDashboard() {
  const router = useRouter();
  const [statsData, setStatsData] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Admin User");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    
    const role = getRoleFromToken();
    if (role !== "ADMIN") {
      if (role === "CHW") router.push("/dashboard/chw");
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
        const data = await api.getAdminStats();
        setStatsData(data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
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

  const stats = [
    { label: "Avg Risk Score", value: statsData?.averageRiskScore.toFixed(2) || "0.00", icon: Activity, trend: "up", trendValue: "", color: "text-red-600", bg: "bg-red-50" },
    { label: "Active Districts", value: statsData?.totalDistricts.toString() || "0", icon: MapIcon, trend: "up", trendValue: "", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Field Agents", value: statsData?.totalAgents.toString() || "0", icon: Users, trend: "up", trendValue: "", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending Alerts", value: statsData?.pendingAlerts.toString() || "0", icon: AlertTriangle, trend: "up", trendValue: "", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-600">
      <Sidebar role="ADMIN" />
      
      <main className="flex-1 ml-64">
        <Header title="Administrator Command Center" userName={userName} />
        
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.trendValue}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Risk Heatmap Placeholder */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Regional Risk Heatmap</h3>
                  <p className="text-sm text-slate-500 font-medium">Outbreak probability by district</p>
                </div>
                <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                </select>
              </div>
              <div className="aspect-[16/9] bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                 <div className="text-slate-400 flex flex-col items-center gap-3">
                    <TrendingUp className="h-12 w-12 opacity-20 group-hover:scale-110 transition-transform duration-500" />
                    <span className="font-bold tracking-tight">Interactive Map Visualization Data Loading...</span>
                 </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Reports</h3>
              <div className="space-y-6">
                {[
                  { user: "John Doe (CHW)", action: "Reported Standing Water", time: "2 min ago", district: "Wouri", type: "hazard" },
                  { user: "Dr. Amadou (Clinician)", action: "3 Cholera Cases logged", time: "15 min ago", district: "Douala IV", type: "clinical" },
                  { user: "System", action: "High Temp Alert Issued", time: "1 hour ago", district: "North Region", type: "system" },
                  { user: "Alice M. (CHW)", action: "Resolved Water Hazard", time: "3 hours ago", district: "Wouri", type: "success" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                      item.type === 'hazard' ? 'bg-amber-500' : 
                      item.type === 'clinical' ? 'bg-red-500' :
                      item.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">{item.action}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.user} • {item.district}</p>
                      <p className="text-[10px] text-blue-600 font-bold uppercase mt-1 tracking-tighter">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => router.push("/dashboard/admin/districts")}
                className="w-full mt-8 py-3 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
