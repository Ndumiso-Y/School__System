import React from "react";
import { useTier } from "../context/TierContext";
import { mockTeachers } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import TierBanner from "../components/TierBanner";

export const Teachers = () => {
  const { currentTier } = useTier();

  const columns = [
    { key: "id", header: "Teacher ID" },
    { key: "name", header: "Teacher Name", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "role", header: "Academics Role" },
    { key: "subjects", header: "Assigned Subjects", render: (val) => val.join(", ") },
    { key: "classes", header: "Assigned Grades", render: (val) => val.join(", ") },
    { key: "phone", header: "Mobile Contact" },
    {
      key: "attendanceDuty",
      header: "Roll Call Duty",
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="Teacher Registers" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Educators</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review subject mappings, classroom allocations, and portal registration indicators for teachers.
        </p>
      </div>

      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg text-xs flex justify-between items-center">
        <div>
          <span className="bg-blue-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
            Portal Preview Status
          </span>
          <p className="text-blue-900 font-semibold mt-1">
            Teacher login simulates direct entry of marks, classroom notices, and daily attendance roll call.
          </p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded border border-emerald-200">
          Tier 2 Portal Enabled
        </span>
      </div>

      <DataTable
        title="Teaching Staff Registry"
        data={mockTeachers}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search teacher..."
        onAddClick={() => alert("[Demo Action] Add Teacher simulated.")}
        addLabel="Map New Educator"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Teachers;
