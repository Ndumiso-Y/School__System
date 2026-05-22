import React from "react";
import { useTier } from "../context/TierContext";
import { mockStaff } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import { DollarSign, FileDown } from "lucide-react";

export const Payroll = () => {
  const { currentTier } = useTier();

  // Map staff to a payroll ledger list
  const payrollRecords = mockStaff.map((staff) => ({
    staffId: staff.id,
    name: staff.name,
    role: staff.role,
    salary: staff.salary,
    month: "May 2026",
    status: staff.leaveStatus === "On Leave" ? "Pending Approval" : "Paid",
  }));

  const columns = [
    { key: "staffId", header: "Staff ID" },
    { key: "name", header: "Employee Name", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "role", header: "Position" },
    { key: "month", header: "Pay Period" },
    {
      key: "salary",
      header: "Gross Salary",
      render: (val) => <span className="font-bold text-slate-800">R{val.toLocaleString()}</span>,
    },
    {
      key: "status",
      header: "Payroll Status",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="Payroll Management" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payroll Register</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review monthly salaries, payslips approvals, and ZAR payroll disbursements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LockedFeatureCard
          title="SARS IRP5 Tax Export"
          requiredTier={3}
          badgeText="Tier 3 Upgrade"
          description="Automatically compile and export direct SARS-compatible tax logs, EMP201 monthly declarations, and EMP501 reconciliations."
        >
          <button disabled className="w-full flex items-center justify-center gap-1 py-1.5 bg-slate-100 border text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed">
            <FileDown className="w-3.5 h-3.5" /> Export SARS EMP201 File
          </button>
        </LockedFeatureCard>

        <LockedFeatureCard
          title="Payslip Dispatcher"
          requiredTier={3}
          badgeText="Tier 3 Upgrade"
          description="Send encrypted PDF payslips directly to employees' registered emails with single-click batch commands."
        >
          <button disabled className="w-full flex items-center justify-center gap-1 py-1.5 bg-slate-100 border text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed">
            <DollarSign className="w-3.5 h-3.5" /> Email All Payslips
          </button>
        </LockedFeatureCard>
      </div>

      <DataTable
        title="Active Payroll Registry"
        data={payrollRecords}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search employees..."
        onAddClick={() => alert("[Demo Action] Manually generate bonus/deduction.")}
        addLabel="Add Custom Entry"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Payroll;
