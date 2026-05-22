import React from "react";
import { useTier } from "../context/TierContext";
import { mockMaintenanceTickets } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import TierBanner from "../components/TierBanner";

export const Maintenance = () => {
  const { currentTier } = useTier();

  const columns = [
    { key: "id", header: "Ticket ID" },
    { key: "type", header: "Repair Category", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "location", header: "Facilities Location" },
    {
      key: "priority",
      header: "Severity Level",
      render: (val) => <StatusBadge status={val} />,
    },
    { key: "assignee", header: "Assigned Staff / Service" },
    {
      key: "costEstimate",
      header: "Cost Estimate",
      render: (val) => <span className="font-bold text-slate-800">R{val.toLocaleString()}</span>,
    },
    {
      key: "status",
      header: "Workflow Status",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="Facilities & Maintenance Logs" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Maintenance Tickets</h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor campus plumbing, electricity, grounds maintenance, and repair bills.
        </p>
      </div>

      <DataTable
        title="Active Service Tickets"
        data={mockMaintenanceTickets}
        columns={columns}
        searchKey="location"
        searchPlaceholder="Search location..."
        filterKey="priority"
        filterOptions={["High", "Medium", "Low"]}
        filterPlaceholder="All Priorities"
        onAddClick={() => alert("[Demo Action] Log Ticket simulated.")}
        addLabel="Log Repair Ticket"
        currentTier={currentTier}
        actionRequiredTier={1}
      />
    </div>
  );
};

export default Maintenance;
