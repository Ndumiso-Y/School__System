import React from "react";
import { useTier } from "../context/TierContext";
import { mockPayments, mockParents } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import { CreditCard, Receipt, Milestone, BellRing } from "lucide-react";

export const Payments = () => {
  const { currentTier } = useTier();

  // Columns for the payments table
  const paymentColumns = [
    { key: "id", header: "Payment Ref" },
    { key: "invoiceNo", header: "Invoice No" },
    { key: "parent", header: "Parent Name", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "date", header: "Date Reflected" },
    {
      key: "amount",
      header: "Amount Paid",
      render: (val) => <span className="font-bold text-slate-800">R{val.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</span>,
    },
    { key: "method", header: "Payment Method" },
    {
      key: "status",
      header: "Status",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  // Filter parents with outstanding balances
  const debtorParents = mockParents.filter((p) => p.balance > 0);

  // Columns for the outstanding balances ledger
  const debtorColumns = [
    { key: "name", header: "Parent Name", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "email", header: "Email Address" },
    { key: "phone", header: "Mobile Number" },
    {
      key: "balance",
      header: "Outstanding Balance",
      render: (val) => (
        <span className="font-extrabold text-rose-600">R{val.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</span>
      ),
    },
    {
      key: "commStatus",
      header: "Alert Level",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Contextual Tier Banner */}
      <TierBanner pageName="Payments & Fees" />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payments & Arrears</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track bank collections, check payment status records, and review outstanding accounts.
          </p>
        </div>
      </div>

      {/* 2. Lock Card Row for Tier 3 Upgrades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LockedFeatureCard
          title="Online Parent Payments"
          requiredTier={3}
          badgeText="Tier 3 Upgrade"
          description="Enable parents to settle invoices directly inside the system via South African gateways (PayFast, Yoco, Instant EFT). Integrates matching directly with invoices."
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
              <CreditCard className="w-4 h-4" />
              <span>Online Payment Integration Ready</span>
            </div>
            <p className="text-xs text-slate-500">
              Gateway endpoints are structured for PayFast and Yoco Webhooks. The portal can accept debit/credit cards and Capitec Pay.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-600">
              Status: <span className="font-bold text-emerald-600 uppercase">Configured (Sandbox Active)</span>
            </div>
          </div>
        </LockedFeatureCard>

        <LockedFeatureCard
          title="Automated Fee Reminders"
          requiredTier={3}
          badgeText="Tier 3 Upgrade"
          description="Schedule automated monthly WhatsApp, SMS, and email alerts for late payments. Toggles notifications automatically when invoices enter outstanding/overdue periods."
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
              <BellRing className="w-4 h-4" />
              <span>Schedules Engine Enabled</span>
            </div>
            <p className="text-xs text-slate-500">
              Sends automated notifications using Twilio SMS, WhatsApp Business API, and SendGrid templates on day 3, 7, and 14 past due dates.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-600">
              Webhook trigger: <span className="font-bold text-emerald-600 uppercase">Auto-dispatch Active</span>
            </div>
          </div>
        </LockedFeatureCard>
      </div>

      {/* 3. Payments Log */}
      <DataTable
        title="Recent Payments Log"
        data={mockPayments}
        columns={paymentColumns}
        searchKey="parent"
        searchPlaceholder="Search by parent name..."
        filterKey="method"
        filterOptions={["EFT", "Credit Card", "Debit Order", "Cash"]}
        filterPlaceholder="All Methods"
        onAddClick={() => alert("[Demo Action] Manually reflect payments by uploading bank statement CSV in Phase 3.")}
        addLabel="Reflect Manual Payment"
        currentTier={currentTier}
        actionRequiredTier={2}
      />

      {/* 4. Arrears Ledger */}
      <DataTable
        title="Outstanding Balances / Debtor Ledger"
        data={debtorParents}
        columns={debtorColumns}
        searchKey="name"
        searchPlaceholder="Search debtor by name..."
        onAddClick={() => alert("[Demo Action] Dispatching manual statements via email...")}
        addLabel="Email Statements"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Payments;
