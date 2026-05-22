import React from "react";
import { useTier } from "../context/TierContext";
import { mockDocuments } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import { UploadCloud, ShieldAlert } from "lucide-react";

export const Documents = () => {
  const { currentTier } = useTier();

  const columns = [
    { key: "id", header: "Doc ID" },
    { key: "title", header: "File Title", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "category", header: "Folder Classification" },
    { key: "type", header: "Format" },
    { key: "uploadedBy", header: "Owner / Uploader" },
    {
      key: "status",
      header: "Security Verification",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="School Documents Vault" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Compliance & Digital Vault</h1>
        <p className="text-xs text-slate-500 mt-1">
          Store school compliance records, SARS certificates, admissions documents, and SGB audits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LockedFeatureCard
          title="Digital Cloud Storage Vault"
          requiredTier={3}
          badgeText="Tier 3 Feature"
          description="Drag-and-drop file uploads for student birth certificates, parent ID copies, teacher qualifications. Integrates with AWS S3 storage."
        >
          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              Allocates 50GB encrypted cloud disk capacity. Scan and audit uploads automatically.
            </p>
            <button disabled className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-100 border text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed">
              <UploadCloud className="w-4 h-4" /> Upload PDF Document
            </button>
          </div>
        </LockedFeatureCard>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-800 font-bold mb-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>POPIA Safe Compliance Verification</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              The Protection of Personal Information Act requires encryption of learner and minor profiles. Document storage is safe with restricted user role access keys in Phase 3.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        title="Verified Compliance Documents"
        data={mockDocuments}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search document name..."
        filterKey="category"
        filterOptions={["Compliance", "Finance", "Admissions", "Operations"]}
        filterPlaceholder="All Folders"
        onAddClick={() => alert("[Demo Action] Document registry logged.")}
        addLabel="Register Document"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Documents;
