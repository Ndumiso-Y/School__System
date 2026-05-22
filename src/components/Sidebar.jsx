import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CreditCard,
  FileText,
  DollarSign,
  UserCheck,
  Wallet,
  BookOpen,
  CalendarCheck,
  Award,
  Clock,
  Megaphone,
  Calendar,
  Wrench,
  FolderOpen,
  BarChart3,
  Package,
  X
} from "lucide-react";
import theme from "../config/theme";

const menuGroups = [
  {
    title: "Core Operations",
    items: [
      { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { path: "/learners", label: "Learners", icon: GraduationCap },
      { path: "/parents", label: "Parents & Guardians", icon: Users },
      { path: "/teachers", label: "Teachers Register", icon: BookOpen },
    ]
  },
  {
    title: "Academic Control",
    items: [
      { path: "/attendance", label: "Attendance Summary", icon: CalendarCheck },
      { path: "/results", label: "Results & Marks", icon: Award },
      { path: "/timetable", label: "School Timetable", icon: Clock },
    ]
  },
  {
    title: "Financial Center",
    items: [
      { path: "/payments", label: "Payments & Fees", icon: CreditCard },
      { path: "/invoicing", label: "Invoice History", icon: FileText },
      { path: "/finance", label: "School Finances", icon: DollarSign },
      { path: "/payroll", label: "Payroll Ledger", icon: Wallet },
    ]
  },
  {
    title: "Administration",
    items: [
      { path: "/hr", label: "HR & Staff Profiles", icon: UserCheck },
      { path: "/announcements", label: "Announcements", icon: Megaphone },
      { path: "/meetings", label: "Meetings Calendar", icon: Calendar },
      { path: "/maintenance", label: "Maintenance Tickets", icon: Wrench },
      { path: "/documents", label: "Compliance & Docs", icon: FolderOpen },
      { path: "/reports", label: "Reports & Logs", icon: BarChart3 },
    ]
  },
  {
    title: "System Preview",
    items: [
      { path: "/package-preview", label: "Pricing & Tiers", icon: Package },
    ]
  }
];

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-slate-900/60 md:hidden backdrop-blur-sm transition-opacity"
        ></div>
      )}

      {/* Sidebar Navigation Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-slate-950 border-r border-slate-900 text-slate-400 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header / Brand */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-900 bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-500/20">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-white">{theme.schoolName}</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Foundation Portal</span>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 hover:bg-slate-900 rounded text-slate-400 md:hidden"
            title="Close Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-6">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              <h5 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {group.title}
              </h5>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isLinkActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 768) {
                          toggleSidebar();
                        }
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                        active
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-600/10 font-bold"
                          : "hover:bg-slate-900 hover:text-slate-200"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/60 text-[10px] text-slate-600 font-medium">
          <p>© 2026 Embark Digitals</p>
          <p className="mt-0.5">ZAR Currency Active</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
