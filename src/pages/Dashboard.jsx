import React from "react";
import { useTier } from "../context/TierContext";
import {
  mockLearners,
  mockParents,
  mockStaff,
  mockMaintenanceTickets,
  mockFinanceSummary,
  mockMeetings,
  mockAnnouncements
} from "../data/mockData";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import TierBanner from "../components/TierBanner";
import StatusBadge from "../components/StatusBadge";
import {
  GraduationCap,
  Users,
  DollarSign,
  Calendar,
  Wrench,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  UserCheck,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { currentTier } = useTier();
  const activeRole = localStorage.getItem("demoRole") || "Principal / Super Admin";

  // Compute school stats dynamically from South African mock dataset
  const totalLearnersCount = 300; // Fixed size based on school specification, or 30 in mockup
  const activeParentsCount = mockParents.length;
  const totalStaffCount = mockStaff.length;
  const openMaintenanceCount = mockMaintenanceTickets.filter((t) => !t.completed).length;

  const totalOutstandingZAR = "R52,300.00";
  const monthlyIncomeZAR = "R162,500.00";
  const avgAttendanceRate = "94.2%";

  // Static alerts list
  const academicAlerts = [
    { name: "Thabo Mokoena (Grade 9)", alert: "Failing English (48%) & Math (42%)", severity: "high" },
    { name: "Lerato Kgositsile (Grade 10)", alert: "Attendance below threshold (84%)", severity: "high" },
    { name: "Lize-Mari Viljoen (Grade 8)", alert: "Attendance warning (87%)", severity: "medium" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Contextual Tier Banner */}
      <TierBanner pageName="Dashboard Operations" />

      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Governance Overview</h1>
          <p className="text-xs text-slate-500 mt-1">
            Running system as: <span className="font-bold text-slate-800">{activeRole}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm">
          <FileCheck className="w-4 h-4 text-blue-600" />
          <span>POPIA Safe Policy Checklist Pending Q3 Audit</span>
        </div>
      </div>

      {/* 2. KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Learners"
          value={totalLearnersCount}
          icon={GraduationCap}
          description="South African Private School Scale"
          trend="+4 boys & girls"
          trendType="positive"
        />
        <StatCard
          title="Active Parents"
          value={activeParentsCount}
          icon={Users}
          description="Registered profiles in portal"
          trend="88% login rate"
          trendType="positive"
        />
        <StatCard
          title="Monthly Income"
          value={monthlyIncomeZAR}
          icon={DollarSign}
          description="Total cash collections (May)"
          trend="87.8% collection rate"
          trendType="positive"
        />
        <StatCard
          title="Outstanding Balance"
          value={totalOutstandingZAR}
          icon={ShieldAlert}
          description="Total arrears school fees"
          trend="Excludes current invoice"
          trendType="neutral"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Teachers & Staff"
          value={totalStaffCount}
          icon={UserCheck}
          description="Academics + Administrative support"
          trend="1 HOD vacancy open"
          trendType="neutral"
        />
        <StatCard
          title="Attendance Rate"
          value={avgAttendanceRate}
          icon={Calendar}
          description="School-wide average this term"
          trend="+1.2% vs last week"
          trendType="positive"
        />
        <StatCard
          title="Maintenance Tickets"
          value={`${openMaintenanceCount} Open`}
          icon={Wrench}
          description="Reported plumbing/electrical"
          trend="2 high priority tickets"
          trendType="negative"
        />
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Bar Chart */}
        <ChartCard
          title="School Finances Ledger"
          subtitle="Monthly collections vs operational expenditure (ZAR)"
          footerStats={[
            { label: "Total Invoiced YTD", value: "R1,850,000.00", color: "text-slate-800" },
            { label: "Total Collected", value: "R1,625,000.00", color: "text-emerald-600" },
            { label: "Collection Ratio", value: "87.8%", color: "text-blue-600" },
          ]}
        >
          {currentTier === 1 ? (
            <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-50 border border-dashed border-slate-200 rounded-lg w-full h-full min-h-[220px]">
              <Lock className="w-8 h-8 text-slate-400 mb-2" />
              <h5 className="font-bold text-xs text-slate-800">Financial Chart Limited</h5>
              <p className="text-[10px] text-slate-500 max-w-xs mt-1">
                Visualizing full historical ledger charts is available starting in Tier 2. Upgrade system to view.
              </p>
            </div>
          ) : (
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockFinanceSummary.monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`R${value.toLocaleString()}`, undefined]} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  <Bar dataKey="revenue" name="Collections" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>

        {/* Weekly Attendance Line Chart */}
        <ChartCard
          title="Attendance Statistics"
          subtitle="Weekly student presence percentage"
          footerStats={[
            { label: "Grade R-7 Average", value: "96.4%", color: "text-emerald-600" },
            { label: "Grade 8-12 Average", value: "91.8%", color: "text-amber-600" },
            { label: "Excusable Sick Leaves", value: "14 learners", color: "text-slate-500" },
          ]}
        >
          {currentTier === 1 ? (
            <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-50 border border-dashed border-slate-200 rounded-lg w-full h-full min-h-[220px]">
              <Lock className="w-8 h-8 text-slate-400 mb-2" />
              <h5 className="font-bold text-xs text-slate-800">Attendance Graph Limited</h5>
              <p className="text-[10px] text-slate-500 max-w-xs mt-1">
                Visualizing historical attendance curves is available starting in Tier 2. Upgrade to view.
              </p>
            </div>
          ) : (
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { week: "Week 1", rate: 93.5 },
                    { week: "Week 2", rate: 94.2 },
                    { week: "Week 3", rate: 95.0 },
                    { week: "Week 4", rate: 92.8 },
                    { week: "Week 5", rate: 94.2 },
                  ]}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`${value}%`, "Attendance"]} />
                  <Line type="monotone" dataKey="rate" name="Attendance %" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>
      </div>

      {/* 4. Downside Lists: Alerts, Recent Activities & Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic and Attendance Alerts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Academic & Attendance Alerts</span>
          </div>
          <div className="space-y-3">
            {academicAlerts.map((al, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>{al.name}</span>
                  <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${al.severity === "high" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-800"}`}>
                    {al.severity}
                  </span>
                </div>
                <p className="text-slate-500 mt-1 font-semibold">{al.alert}</p>
                <div className="mt-2 text-right">
                  <Link to="/results" className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-0.5">
                    View Record <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mb-4">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Latest Announcements</span>
          </div>
          <div className="space-y-3">
            {mockAnnouncements.slice(0, 2).map((ann) => (
              <div key={ann.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs">
                <div className="flex justify-between items-center text-slate-400 font-bold text-[9px] uppercase">
                  <span>By {ann.author}</span>
                  <span>{ann.date}</span>
                </div>
                <h5 className="font-bold text-slate-800 mt-1">{ann.title}</h5>
                <p className="text-slate-500 mt-0.5 leading-relaxed truncate">{ann.content}</p>
                <div className="mt-2 text-right">
                  <Link to="/announcements" className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-0.5">
                    Read Full bulletin <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mb-4">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Upcoming Meetings</span>
          </div>
          <div className="space-y-3">
            {mockMeetings.map((mtg) => (
              <div key={mtg.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wide">
                      {mtg.type}
                    </span>
                    <h5 className="font-bold text-slate-800 mt-1.5">{mtg.notes}</h5>
                  </div>
                  <StatusBadge status={mtg.status} />
                </div>
                <div className="mt-3 flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                  <span>{mtg.date}</span>
                  <span>{mtg.attendees.slice(0, 2).join(" & ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade Banner for Tier 1 users */}
      {currentTier === 1 && (
        <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-xl shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="bg-blue-600 text-white text-[9px] uppercase font-extrabold px-2.5 py-0.5 rounded-full tracking-wider">
              Upgrade opportunity
            </span>
            <h4 className="font-bold text-base mt-2">Unlock advanced Operations Dashboard features</h4>
            <p className="text-xs text-blue-200 mt-1 max-w-2xl leading-relaxed">
              Tier 2 unlocks school class timetables, daily attendance roll call logs, academic results entry forms, and teacher journals. Explore Tier 2 using the preview switcher above!
            </p>
          </div>
          <Link to="/package-preview" className="px-4 py-2 bg-white text-blue-950 text-xs font-bold rounded-lg shadow-md hover:bg-blue-50 transition-colors inline-flex items-center gap-1.5 shrink-0">
            Compare Tiers & Pricing <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

// Helper mock lock icon
const Lock = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default Dashboard;
