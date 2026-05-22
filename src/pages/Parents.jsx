import React from "react";
import { useTier } from "../context/TierContext";
import { mockParents, mockLearners } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import TierBanner from "../components/TierBanner";

export const Parents = () => {
  const { currentTier } = useTier();

  // Map parents to linked learners lists
  const parentsWithLearners = mockParents.map((parent) => {
    const linked = mockLearners.filter((l) => l.parentId === parent.id).map((l) => l.name);
    return {
      ...parent,
      linkedLearners: linked.length > 0 ? linked.join(", ") : "No learners linked",
    };
  });

  const columns = [
    { key: "id", header: "Parent ID" },
    { key: "name", header: "Parent Name", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "email", header: "Email Address" },
    { key: "phone", header: "Mobile Contact" },
    { key: "linkedLearners", header: "Linked Learners", render: (val) => <span className="text-slate-600 font-semibold">{val}</span> },
    {
      key: "balance",
      header: "Accounts Balance",
      render: (val) => (
        <span className={`font-bold ${val > 0 ? "text-rose-600" : "text-emerald-600"}`}>
          R{val.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      key: "portalStatus",
      header: "Portal Status",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="Parent & Guardian Directory" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Parent & Guardian Accounts</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review parents contact records, fee balances, and mobile numbers for communication logs.
        </p>
      </div>

      <DataTable
        title="Family Accounts Registry"
        data={parentsWithLearners}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search parent by name..."
        filterKey="portalStatus"
        filterOptions={["Registered", "Invited", "Pending Invitation"]}
        filterPlaceholder="All Portal States"
        onAddClick={() => alert("[Demo Action] Add Parent simulated.")}
        addLabel="Link New Family"
        currentTier={currentTier}
        actionRequiredTier={1}
      />
    </div>
  );
};

export default Parents;
