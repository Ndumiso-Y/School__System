import React from "react";
import { useTier } from "../context/TierContext";
import { mockFinanceSummary, mockStaff } from "../data/mockData";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import StatusBadge from "../components/StatusBadge";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Percent,
  Download,
  AlertOctagon,
  FileCheck2,
  Lock
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export const Finance = () => {
  const { currentTier } = useTier();

  // Calculate dynamic payroll totals
  const totalMonthlyPayroll = mockStaff.reduce((acc, curr) => acc + curr.salary, 0);

  // Dynamic Finance Alert listings
  const financeAlerts = [
    { id: "A1", type: "Late Collections", text: "Outstanding fees in Grade 9 & 11 currently exceed R25k.", date: "22 May 2026", status: "Open" },
    { id: "A2", type: "Expiring Service Contract", text: "Municipal electricity rebate agreement requires renewal next month.", date: "15 May 2026", status: "Pending Review" },
    { id: "A3", type: "Budget Cap Warning", text: "Maintenance expenditure for Block A plumbing is 92% of set term budget.", date: "20 May 2026", status: "Warning" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Contextual Tier Banner */}
      <TierBanner pageName="School Finance Center" />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Finances & Budget Ledger</h1>
          <p className="text-xs text-slate-500 mt-1">
            General ledger summaries, cash collection ratios, expenditures, and payroll summaries.
          </p>
        </div>
      </div>

      {/* 2. ZAR Finance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Cash Collected"
          value={`R${mockFinanceSummary.totalPaid.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`}
          icon={TrendingUp}
          description="Reflected EFT & Credit Card YTD"
          trend="87.8% collection rate"
          trendType="positive"
        />
        <StatCard
          title="Total Outstanding"
          value={`R${mockFinanceSummary.totalOutstanding.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`}
          icon={TrendingDown}
          description="Unpaid term fees in ledger"
          trend="R12,500 written off"
          trendType="negative"
        />
        <StatCard
          title="Monthly Staff Payroll"
          value={`R${totalMonthlyPayroll.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`}
          icon={DollarSign}
          description="Total salary ledger cost"
          trend="11 staff members"
          trendType="neutral"
        />
        <StatCard
          title="Collection Rate"
          value={`${mockFinanceSummary.collectionRate}%`}
          icon={Percent}
          description="Target fee collection: 92.5%"
          trend="-2.1% variance"
          trendType="negative"
        />
      </div>

      {/* 3. Recharts Visual Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Finance Analytics Forecast"
            subtitle="Income vs Expenditures Area Ledger (ZAR)"
            footerStats={[
              { label: "Operating Margin", value: "23.4%", color: "text-emerald-600" },
              { label: "Cash Reserve", value: "R385,000.00", color: "text-blue-600" },
              { label: "Arrears Exposure", value: "R225,000.00", color: "text-rose-600" },
            ]}
          >
            {currentTier === 1 ? (
              <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-50 border border-dashed border-slate-200 rounded-lg w-full h-full min-h-[220px]">
                <Lock className="w-8 h-8 text-slate-400 mb-2" />
                <h5 className="font-bold text-xs text-slate-800">Advanced Finance Analytics Limited</h5>
                <p className="text-[10px] text-slate-500 max-w-xs mt-1">
                  Viewing full cash-flow forecasts and operating margin charts is available in Tier 2 and Tier 3.
                </p>
              </div>
            ) : (
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockFinanceSummary.monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(value) => [`R${value.toLocaleString()}`, undefined]} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                    <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#1e3a8a" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                    <Area type="monotone" dataKey="expenses" name="Expenditures" stroke="#f43f5e" fillOpacity={1} fill="url(#colorExp)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </ChartCard>
        </div>

        {/* Expense Allocations */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Expenditure Distribution</h4>
            <p className="text-xs text-slate-400 mt-0.5">Top outgoing categories (May 2026)</p>
            <div className="mt-6 space-y-4">
              {mockFinanceSummary.expenses.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{exp.category}</span>
                    <span>R{exp.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${idx === 0 ? "bg-blue-900" : idx === 1 ? "bg-blue-600" : "bg-slate-400"}`}
                      style={{ width: `${(exp.amount / 320000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4 mt-6 text-[10px] text-slate-400 flex items-center gap-1">
            <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Figures reconciled with ABSA statements</span>
          </div>
        </div>
      </div>

      {/* 4. Financial Alerts and Locked Exporter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Finance Alerts list */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm md:col-span-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mb-4">
            <AlertOctagon className="w-4 h-4 text-amber-500" />
            <span>Financial Compliance Alerts</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-2.5 px-4">Alert Classification</th>
                  <th className="py-2.5 px-4">Details</th>
                  <th className="py-2.5 px-4">Date Logged</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {financeAlerts.map((al) => (
                  <tr key={al.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">{al.type}</td>
                    <td className="py-3 px-4 text-slate-500">{al.text}</td>
                    <td className="py-3 px-4 text-slate-400">{al.date}</td>
                    <td className="py-3 px-4 text-right">
                      <StatusBadge status={al.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Locked Exporter */}
        <LockedFeatureCard
          title="Data Export Utility"
          requiredTier={3}
          badgeText="Tier 3 Feature"
          description="Download clean CSV, Excel, and PDF files containing general ledgers, tax breakdowns, SARS payroll certificates, and auditing trails."
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Generate fully structured tables compiled for SGB governance meetings or SASAMS verification templates.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button disabled className="flex items-center justify-center gap-1.5 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">
                <Download className="w-3.5 h-3.5" /> CSV Export
              </button>
              <button disabled className="flex items-center justify-center gap-1.5 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">
                <Download className="w-3.5 h-3.5" /> Excel Spreadsheet
              </button>
            </div>
          </div>
        </LockedFeatureCard>
      </div>
    </div>
  );
};

export default Finance;
