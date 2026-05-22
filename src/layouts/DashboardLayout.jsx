import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TierSwitcher from "../components/TierSwitcher";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. Global Package Tier Selector */}
      <TierSwitcher />

      {/* Main Structural Frame */}
      <div className="flex flex-1 relative">
        {/* 2. Collapsible Navigation Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* 3. Right Content Viewport */}
        <div className="flex flex-col flex-1 md:pl-64 min-w-0">
          {/* Top Header Utilities */}
          <Topbar toggleSidebar={toggleSidebar} />

          {/* Main Scrollable Window Area */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
