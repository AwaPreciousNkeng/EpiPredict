"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Activity, 
  MapPin, 
  Users, 
  Bell, 
  Settings, 
  LogOut,
  Shield,
  FileText,
  Thermometer
} from "lucide-react";
import { logout } from "@/lib/auth";

interface SidebarProps {
  role: "ADMIN" | "CHW" | "CLINICIAN";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = {
    ADMIN: [
      { name: "Overview", icon: LayoutDashboard, href: "/dashboard/admin" },
      { name: "Risk Analysis", icon: Activity, href: "/dashboard/admin/risk" },
      { name: "Districts", icon: MapPin, href: "/dashboard/admin/districts" },
      { name: "User Management", icon: Users, href: "/dashboard/admin/users" },
      { name: "Global Alerts", icon: Bell, href: "/dashboard/admin/alerts" },
    ],
    CHW: [
      { name: "My Dashboard", icon: LayoutDashboard, href: "/dashboard/chw" },
      { name: "Environmental Reports", icon: FileText, href: "/dashboard/chw/reports" },
      { name: "District Status", icon: MapPin, href: "/dashboard/chw/district" },
      { name: "Weather Alerts", icon: Thermometer, href: "/dashboard/chw/weather" },
    ],
    CLINICIAN: [
      { name: "Clinical Dashboard", icon: LayoutDashboard, href: "/dashboard/clinician" },
      { name: "Case Records", icon: FileText, href: "/dashboard/clinician/cases" },
      { name: "Outbreak Tracking", icon: Activity, href: "/dashboard/clinician/outbreaks" },
      { name: "Diagnostics", icon: Thermometer, href: "/dashboard/clinician/diagnostics" },
    ],
  };

  const currentMenu = menuItems[role] || [];

  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 text-white flex flex-col z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">EpiPredict</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <div className="mb-4 px-2">
           <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Main Menu</span>
        </div>
        {currentMenu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <Settings className="h-5 w-5 text-slate-500" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-white hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
