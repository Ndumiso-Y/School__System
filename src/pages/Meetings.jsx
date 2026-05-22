import React from "react";
import { useTier } from "../context/TierContext";
import { mockMeetings } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import TierBanner from "../components/TierBanner";

export const Meetings = () => {
  const { currentTier } = useTier();

  const columns = [
    { key: "id", header: "Meeting Ref" },
    { key: "date", header: "Date & Time Slot", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "type", header: "Meeting Type" },
    { key: "attendees", header: "Attendees", render: (val) => val.join(" & ") },
    { key: "notes", header: "Meeting Agenda Notes", render: (val) => <span className="text-slate-500 font-semibold">{val}</span> },
    {
      key: "status",
      header: "Status",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="Meetings Calendar" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Parent-Teacher & Staff Meetings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Coordinate schedules, set meeting agendas, and log board minutes.
        </p>
      </div>

      <DataTable
        title="Scheduled Meetings Registry"
        data={mockMeetings}
        columns={columns}
        searchKey="notes"
        searchPlaceholder="Search agendas..."
        filterKey="type"
        filterOptions={["Parent-Teacher", "Staff Meeting", "Governing Body / Principal"]}
        filterPlaceholder="All Meeting Types"
        onAddClick={() => alert("[Demo Action] Schedule Meeting simulated.")}
        addLabel="Schedule Meeting"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Meetings;
