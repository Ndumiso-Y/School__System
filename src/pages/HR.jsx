import React from "react";
import { useTier } from "../context/TierContext";
import { mockStaff } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import { FileUp, ShieldCheck } from "lucide-react";

export const HR = () => {
  const { currentTier } = useTier();

  const columns = [
    { key: "id", header: "Staff ID" },
    { key: "name", header: "Full Name", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "role", header: "Role / Position" },
    { key: "department", header: "Department" },
    {
      key: "salary",
      header: "Salary (ZAR)",
      render: (val) => <span className="font-bold text-slate-800">R{val.toLocaleString()}</span>,
    },
    {
      key: "status",
      header: "Work Type",
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: "leaveStatus",
      header: "Leave Status",
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: "documentStatus",
      header: "HR Files",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="HR & Staff Register" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Staff & HR Management</h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor employee contracts, departments, and onboarding compliance registers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LockedFeatureCard
          title="Staff Document Upload & Vault"
          requiredTier={3}
          badgeText="Tier 3 Upgrade"
          description="Upload employment agreements, qualifications verification files, SARS tax registrations, and ID copies directly to the cloud storage vault."
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-500 font-medium">
              Saves files securely with POPIA-compliant encryption standards.
            </p>
            <button disabled className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-100 border text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed">
              <FileUp className="w-4 h-4" /> Upload Verification Document
            </button>
          </div>
        </LockedFeatureCard>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-800 font-bold mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SACE Registration Compliance</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              All educators in South African independent schools must hold valid SACE (South African Council for Educators) registrations. Compliance is verified during annual onboarding cycles.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        title="Employee Directory"
        data={mockStaff}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search staff by name..."
        filterKey="department"
        filterOptions={["Academics", "Administration", "Finance", "Maintenance", "Support Staff"]}
        filterPlaceholder="All Departments"
        onAddClick={() => alert("[Demo Action] Add Staff Record simulated.")}
        addLabel="Onboard Employee"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default HR;
