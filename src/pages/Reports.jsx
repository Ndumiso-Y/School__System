import React from "react";
import { useTier } from "../context/TierContext";
import DataTable from "../components/DataTable";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import { FileDown, CalendarDays } from "lucide-react";

export const Reports = () => {
  const { currentTier } = useTier();

  const reportItems = [
    { code: "REP001", title: "Term 1 Class Averages & Progress", category: "Academics", date: "2026-05-15", author: "Academic HOD" },
    { code: "REP002", title: "Fee Collections & Debtor Ledger Q1", category: "Finance", date: "2026-05-02", author: "Bursar" },
    { code: "REP003", title: "SGB Maintenance Cost Forecast", category: "Operations", date: "2026-05-20", author: "Facilities Lead" },
    { code: "REP004", title: "SACE Staff Compliance Registry", category: "HR", date: "2026-04-28", author: "Administrator" },
    { code: "REP005", title: "Grade 10-12 Attendance Outliers", category: "Academics", date: "2026-05-21", author: "Attendance Duty Officer" },
  ];

  const columns = [
    { key: "code", header: "Report Code" },
    { key: "title", header: "Report Title", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "category", header: "Category" },
    { key: "date", header: "Compiled Date" },
    { key: "author", header: "Compiled By" },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="School Reports Hub" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Board & Operational Reports</h1>
        <p className="text-xs text-slate-500 mt-1">
          Compile dashboard stats into structured reports for the Governing Body (SGB) or SASAMS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LockedFeatureCard
          title="PDF & Spreadsheet Exporter"
          requiredTier={3}
          badgeText="Tier 3 Feature"
          description="Export aggregated learner lists, results logs, tax payroll summaries, and facilities expenses straight to Excel, CSV, or formatted PDF."
        >
          <div className="flex gap-2 text-xs">
            <button disabled className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-100 border text-slate-400 rounded-lg cursor-not-allowed font-bold">
              <FileDown className="w-4 h-4" /> Download PDF Report
            </button>
            <button disabled className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-100 border text-slate-400 rounded-lg cursor-not-allowed font-bold">
              <FileDown className="w-4 h-4" /> Download Excel Sheet
            </button>
          </div>
        </LockedFeatureCard>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-800 font-bold mb-1.5">
              <CalendarDays className="w-4 h-4 text-emerald-600" />
              <span>Automated Reports Compiler</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              The reporting scheduler automatically compiles payrollEMP201 totals and monthly student attendance averages on the 1st of every calendar month, notifying the Principal.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        title="Compiled Summary Reports"
        data={reportItems}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search reports..."
        filterKey="category"
        filterOptions={["Academics", "Finance", "Operations", "HR"]}
        filterPlaceholder="All Categories"
        onAddClick={() => alert("[Demo Action] Compilation triggered.")}
        addLabel="Compile New Report"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Reports;
