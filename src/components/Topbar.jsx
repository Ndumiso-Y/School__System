import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Bell, Search, UserCheck, ShieldAlert, ChevronDown, LogOut } from "lucide-react";
import theme from "../config/theme";

export const Topbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Get active role from localStorage or default to Principal
  const currentRole = localStorage.getItem("demoRole") || "Principal / Super Admin";

  const demoRoles = [
    { name: "Principal / Super Admin", email: "principal@demo.school" },
    { name: "School Administrator", email: "admin@demo.school" },
    { name: "Finance Officer / Bursar", email: "finance@demo.school" },
    { name: "Teacher Register", email: "teacher@demo.school" },
    { name: "Parent / Guardian", email: "parent@demo.school" },
  ];

  const handleRoleChange = (roleName) => {
    localStorage.setItem("demoRole", roleName);
    setRoleDropdownOpen(false);
    // Reload or notify system (refresh page simply is cleanest for a prototype)
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("demoRole");
    navigate("/login");
  };

  // Convert pathname to title
  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    if (!path || path === "dashboard") return "Dashboard Operations Overview";
    return path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 relative z-30 shadow-sm">
      {/* Mobile Drawer Trigger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-slate-100 rounded text-slate-500 md:hidden"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-bold text-slate-800 text-sm sm:text-base hidden sm:block tracking-tight">
            {getPageTitle()}
          </h2>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block sm:hidden">
            {theme.schoolName}
          </span>
        </div>
      </div>

      {/* Utilities Column */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Global Mock Search */}
        <div className="relative hidden lg:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search learner, invoice, staff..."
            className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 w-64 bg-slate-50/50"
            onClick={() => alert("[Demo Search] Try typing filter terms in tables below to test filters.")}
          />
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 hover:bg-slate-50 rounded-full border border-slate-100 text-slate-600 relative transition-colors"
            title="System Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown Panel */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg py-2 text-xs text-slate-700 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-slate-100 font-bold text-slate-800 flex justify-between items-center">
                <span>System Notifications</span>
                <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">3 New</span>
              </div>
              <div className="divide-y divide-slate-50 max-h-60 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50/50 flex gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">Payment Overdue</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">T. Mokoena outstanding balance exceeds R10k.</p>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50/50 flex gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">Roll Call Complete</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Grade 12A attendance register submitted by T. Zuma.</p>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50/50 flex gap-2">
                  <Bell className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">Maintenance Request</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Plumbing ticket logged in Block A bathroom.</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <button 
                  onClick={() => {
                    setNotificationsOpen(false);
                    navigate("/announcements");
                  }} 
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  View All Announcements
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Role Simulation Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center">
              {currentRole.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-[10px] text-slate-400 uppercase font-bold leading-none">Role Preview</span>
              <span className="block text-slate-700 mt-0.5 leading-none">{currentRole.split(" / ")[0]}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-2 text-xs text-slate-700 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-slate-100 font-bold text-slate-800">
                Switch Role Context
              </div>
              <div className="p-1 space-y-0.5">
                {demoRoles.map((role) => (
                  <button
                    key={role.name}
                    onClick={() => handleRoleChange(role.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex flex-col ${
                      currentRole === role.name
                        ? "bg-blue-50 text-blue-700 font-bold"
                        : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <span>{role.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{role.email}</span>
                  </button>
                ))}
              </div>
              <div className="px-1 border-t border-slate-100 mt-2 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors flex items-center gap-2 font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out of Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
