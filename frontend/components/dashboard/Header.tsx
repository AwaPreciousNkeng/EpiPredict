"use client";

import { Bell, Search, User, LogOut } from "lucide-react";
import { getStoredToken, getUserFromToken, logout } from "@/lib/auth";
import { useEffect, useState } from "react";

interface HeaderProps {
  title: string;
  userName?: string;
}

export default function Header({ title, userName }: HeaderProps) {
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      const user = getUserFromToken(token);
      if (user) {
        setUserEmail(user.sub);
        setRole(user.role);
      }
    }
  }, []);

  const displayName = userName || userEmail || "User";

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        <p className="text-xs text-slate-500 font-medium tracking-tight">Welcome back, {displayName}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search data..." 
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
          />
        </div>

        <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <button 
          onClick={logout}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>

        <div className="h-8 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 max-w-[150px] truncate">{userEmail.split('@')[0]}</p>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{role || "Health Officer"}</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 border border-blue-200">
            <User className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
