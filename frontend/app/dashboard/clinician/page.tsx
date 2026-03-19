"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { 
  FilePlus, 
  Stethoscope, 
  Microscope, 
  Dna,
  History,
  TrendingUp,
  Search
} from "lucide-react";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { api, ClinicalCase } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { isAuthenticated, getRoleFromToken, getUserFromToken, getStoredToken } from "@/lib/auth";

export default function ClinicianDashboard() {
  const router = useRouter();
  const [cases, setCases] = useState<ClinicalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Medical Staff");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }
    
    const role = getRoleFromToken();
    if (role !== "CLINICIAN") {
      if (role === "ADMIN") router.push("/dashboard/admin");
      else if (role === "CHW") router.push("/dashboard/chw");
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
        const casesData = await api.getMyCases();
        setCases(casesData);
      } catch (error) {
        console.error("Failed to fetch cases", error);
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
      <Sidebar role="CLINICIAN" />
      
      <main className="flex-1 ml-64">
        <Header title="Clinical Information System" userName={userName} />
        
        <div className="p-8 space-y-8 max-w-[1200px]">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Patient Surveillance</h2>
              <p className="text-slate-500 font-medium">Reporting for Douala IV General Hospital</p>
            </div>
            <div className="flex gap-4">
               <button 
                 onClick={() => router.push("/dashboard/clinician/diagnostics")}
                 className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
               >
                 <Microscope className="h-5 w-5" /> Lab Results
               </button>
               <button 
                 onClick={() => router.push("/dashboard/clinician/cases")}
                 className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
               >
                 <FilePlus className="h-5 w-5" /> New Clinical Case
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Cases (MoM)</p>
                <div className="flex items-baseline gap-2">
                   <h3 className="text-2xl font-black text-slate-900">1,422</h3>
                   <span className="text-xs font-bold text-emerald-500 flex items-center"><TrendingUp className="h-3 w-3 mr-1" /> +8%</span>
                </div>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Active Outbreaks</p>
                <h3 className="text-2xl font-black text-red-600">2</h3>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Average Recovery</p>
                <h3 className="text-2xl font-black text-slate-900">4.2 Days</h3>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Lab Queue</p>
                <h3 className="text-2xl font-black text-blue-600">12 Pending</h3>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-black text-slate-900 flex items-center gap-2">
                    <History className="h-5 w-5 text-blue-600" /> Case History
                  </h3>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Filter cases..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 transition-all" />
                  </div>
               </div>
               <div className="divide-y divide-slate-50">
                  {cases.length > 0 ? cases.slice(0, 5).map((c) => (
                    <div key={c.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                             <Stethoscope className="h-5 w-5" />
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-900">Case #{c.id}</p>
                             <p className="text-xs text-slate-500 font-medium">{c.diseaseType} - {c.severity}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-xs font-bold text-slate-400 uppercase">
                            {formatDistanceToNow(new Date(c.admissionTime))} ago
                          </p>
                          <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded ${
                            c.severity === 'CRITICAL' ? 'bg-red-100 text-red-600' : 
                            c.severity === 'MODERATE' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                          }`}>{c.severity}</span>
                       </div>
                    </div>
                  )) : (
                    <p className="text-center text-slate-500 py-8">No cases found.</p>
                  )}
               </div>
               <button 
                 onClick={() => router.push("/dashboard/clinician/cases")}
                 className="w-full py-4 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors border-t border-slate-100">
                  Load More Cases
               </button>
            </div>

            <div className="space-y-6">
               <div className="bg-slate-900 rounded-3xl p-8 text-white">
                  <Dna className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Diagnostic Tools</h3>
                  <p className="text-sm text-slate-400 mb-6">Access our AI-powered symptom checker and diagnostic guidelines.</p>
                  <button 
                    onClick={() => router.push("/dashboard/clinician/diagnostics")}
                    className="w-full py-3 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
                    Open Toolkit
                  </button>
               </div>

               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4">Outbreak Alerts</h3>
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                     <div className="flex items-center gap-2 text-red-600 mb-2">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-xs font-black uppercase">Cholera Spike</span>
                     </div>
                     <p className="text-xs text-red-900/60 font-medium leading-relaxed">
                        Douala IV has reported 5 new cases in 24h. Protective measures mandated for all staff.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
