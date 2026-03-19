"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getRoleFromToken, getUserFromToken, getStoredToken } from "@/lib/auth";

export default function GenericPlaceholder() {
  const router = useRouter();
  const [role, setRole] = useState<"ADMIN" | "CHW" | "CLINICIAN">("ADMIN");
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    const userRole = getRoleFromToken();
    if (userRole) {
      setRole(userRole as any);
    }

    const token = getStoredToken();
    if (token) {
      const user = getUserFromToken(token);
      if (user) {
        setUserName(user.sub);
      }
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar role={role} />
      <main className="flex-1 ml-64">
        <Header title="Page Under Construction" userName={userName} />
        <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="p-6 bg-blue-50 text-blue-600 rounded-full mb-6">
            <AlertCircle className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Coming Soon</h2>
          <p className="text-slate-500 max-w-md">This feature is currently being integrated with the real-time backend data stream. Please check back later!</p>
        </div>
      </main>
    </div>
  );
}
