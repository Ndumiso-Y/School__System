import React from "react";
import { useTier } from "../context/TierContext";
import { mockLearners } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import ChartCard from "../components/ChartCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CalendarCheck2, Clock } from "lucide-react";

export const Attendance = () => {
  const { currentTier } = useTier();

  // Group attendance average by grade
  const gradeAttendanceData = [
    { grade: "Grade R", rate: 95.0 },
    { grade: "Grade 6", rate: 95.0 },
    { grade: "Grade 7", rate: 93.5 },
    { grade: "Grade 8", rate: 92.7 },
    { grade: "Grade 9", rate: 90.3 },
    { grade: "Grade 10", rate: 91.3 },
    { grade: "Grade 11", rate: 91.7 },
    { grade: "Grade 12", rate: 96.8 },
  ];

  const columns = [
    { key: "id", header: "Student ID" },
    { key: "name", header: "Student Name", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "grade", header: "Grade" },
    {
      key: "attendance",
      header: "Term Attendance",
      render: (val) => (
        <div className="flex items-center gap-2">
          <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${val >= 90 ? "bg-emerald-500" : val >= 85 ? "bg-amber-500" : "bg-rose-500"}`}
              style={{ width: `${val}%` }}
            ></div>
          </div>
          <span className="font-bold text-slate-700 text-xs">{val}%</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status Today",
      render: (_, item) => (
        <StatusBadge status={item.attendance >= 90 ? "Present" : "Present (Tardy)"} />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="Attendance Registry" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Logs</h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor learner daily presence rates, check class summaries, and track chronic absences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Attendance Chart */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Attendance Performance by Grade"
            subtitle="Current term averages per standard class"
          >
            {currentTier === 1 ? (
              <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-50 border border-dashed border-slate-200 rounded-lg w-full h-full min-h-[220px]">
                <Clock className="w-8 h-8 text-slate-400 mb-2" />
                <h5 className="font-bold text-xs text-slate-800">Advanced Analytics Locked</h5>
                <p className="text-[10px] text-slate-500 max-w-xs mt-1">
                  Grade averages charts and analytics tools require Tier 2 or Tier 3 active preview.
                </p>
              </div>
            ) : (
              <div className="w-full h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="grade" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[80, 100]} tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(value) => [`${value}%`, "Attendance Rate"]} />
                    <Bar dataKey="rate" name="Attendance Average %" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </ChartCard>
        </div>

        {/* Locked Roll Call Input */}
        <LockedFeatureCard
          title="Daily Roll Call Dispatcher"
          requiredTier={2}
          badgeText="Tier 2 Feature"
          description="Enables educators to perform instant roll call via their mobile devices, sync directly with administrative dashboard databases."
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Submit class rosters and trigger notifications to parents within 1 hour of unexplained absence.
            </p>
            <button disabled className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-100 border text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed">
              <CalendarCheck2 className="w-4 h-4" /> Open Daily Roll Call Sheet
            </button>
          </div>
        </LockedFeatureCard>
      </div>

      <DataTable
        title="Student Presence Ledger"
        data={mockLearners}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search students..."
        filterKey="grade"
        filterOptions={["Grade R", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]}
        filterPlaceholder="All Grades"
        onAddClick={() => alert("[Demo Action] Logging manual override.")}
        addLabel="Manual Override Entry"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Attendance;
