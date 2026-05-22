import React from "react";
import { useTier } from "../context/TierContext";
import { mockInvoices } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import { FileText, Mail, FileDown } from "lucide-react";

export const Invoicing = () => {
  const { currentTier } = useTier();

  const columns = [
    { key: "invoiceNo", header: "Invoice #" },
    { key: "parent", header: "Bill To (Parent)", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "learner", header: "Learner Name" },
    {
      key: "amount",
      header: "Invoice Amount",
      render: (val) => <span className="font-bold text-slate-800">R{val.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</span>,
    },
    { key: "dueDate", header: "Due Date" },
    {
      key: "status",
      header: "Billing Status",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="Invoice Ledger" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Invoice Records</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review generated term billing lists, fee rates, and parent account statuses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LockedFeatureCard
          title="Automated PDF Invoice Generator"
          requiredTier={3}
          badgeText="Tier 3 Upgrade"
          description="Click to render print-ready PDF invoices, append custom school letterheads, and batch mail them directly to parents in one click."
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Bulk invoicing engine can dispatch 300+ personalized emails with attached statements in under 5 minutes.
            </p>
            <div className="flex gap-2">
              <button disabled className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-100 border rounded text-slate-400 cursor-not-allowed text-xs">
                <FileDown className="w-3.5 h-3.5" /> PDF Invoices
              </button>
              <button disabled className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-100 border rounded text-slate-400 cursor-not-allowed text-xs">
                <Mail className="w-3.5 h-3.5" /> Mail All Parents
              </button>
            </div>
          </div>
        </LockedFeatureCard>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-xs flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Monthly Invoicing Policy</h4>
            <p className="text-slate-600 leading-relaxed font-semibold mt-2">
              Term fees are invoiced on the 25th of the preceding month, due by the 7th of the billing month. Late matching triggers manual flags on Tier 1 & 2. Auto-reminders dispatch on Tier 3.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        title="School Fees Billing Registry"
        data={mockInvoices}
        columns={columns}
        searchKey="parent"
        searchPlaceholder="Search invoices by parent..."
        filterKey="status"
        filterOptions={["Paid", "Partial", "Overdue"]}
        filterPlaceholder="All Statuses"
        onAddClick={() => alert("[Demo Action] Manually generate invoice.")}
        addLabel="Create Invoice"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Invoicing;
