import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { TierProvider } from "./context/TierContext";
import DashboardLayout from "./layouts/DashboardLayout";

// Import all pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Learners from "./pages/Learners";
import Parents from "./pages/Parents";
import Payments from "./pages/Payments";
import Invoicing from "./pages/Invoicing";
import Finance from "./pages/Finance";
import HR from "./pages/HR";
import Payroll from "./pages/Payroll";
import Teachers from "./pages/Teachers";
import Attendance from "./pages/Attendance";
import Results from "./pages/Results";
import Timetable from "./pages/Timetable";
import Announcements from "./pages/Announcements";
import Meetings from "./pages/Meetings";
import Maintenance from "./pages/Maintenance";
import Documents from "./pages/Documents";
import Reports from "./pages/Reports";
import PackagePreview from "./pages/PackagePreview";

// Simple route guard for our demo prototype
const DemoRouteGuard = ({ children }) => {
  const currentRole = localStorage.getItem("demoRole");
  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const App = () => {
  return (
    <TierProvider>
      <HashRouter>
        <Routes>
          {/* Public Auth Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Administrative Dashboard Layout Frame */}
          <Route
            path="/"
            element={
              <DemoRouteGuard>
                <DashboardLayout />
              </DemoRouteGuard>
            }
          >
            {/* Index redirects to /dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="learners" element={<Learners />} />
            <Route path="parents" element={<Parents />} />
            <Route path="payments" element={<Payments />} />
            <Route path="invoicing" element={<Invoicing />} />
            <Route path="finance" element={<Finance />} />
            <Route path="hr" element={<HR />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="results" element={<Results />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="documents" element={<Documents />} />
            <Route path="reports" element={<Reports />} />
            <Route path="package-preview" element={<PackagePreview />} />
          </Route>

          {/* Catch-all redirect to index */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </TierProvider>
  );
};

export default App;
