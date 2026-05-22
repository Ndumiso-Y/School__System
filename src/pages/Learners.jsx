import React, { useState } from "react";
import { useTier } from "../context/TierContext";
import { mockLearners, mockParents } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import TierBanner from "../components/TierBanner";
import { GraduationCap, Sparkles } from "lucide-react";

export const Learners = () => {
  const { currentTier } = useTier();
  const [showAddModal, setShowAddModal] = useState(false);

  // Map parentId to actual Parent name for the grid display
  const learnersWithParent = mockLearners.map((learner) => {
    const parent = mockParents.find((p) => p.id === learner.parentId);
    return {
      ...learner,
      parentName: parent ? parent.name : "Not Assigned",
    };
  });

  // Extract unique grades for filters
  const grades = [...new Set(mockLearners.map((l) => l.grade))].sort();

  // Define columns for the table
  const columns = [
    {
      key: "name",
      header: "Learner Name",
      render: (val) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
            {val.split(" ").map((n) => n[0]).join("")}
          </div>
          <span className="font-bold text-slate-800">{val}</span>
        </div>
      ),
    },
    { key: "grade", header: "Grade" },
    { key: "parentName", header: "Linked Parent / Guardian" },
    {
      key: "attendance",
      header: "Attendance",
      render: (val) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${val >= 90 ? "bg-emerald-500" : val >= 85 ? "bg-amber-500" : "bg-rose-500"}`}
              style={{ width: `${val}%` }}
            ></div>
          </div>
          <span className="font-semibold text-xs text-slate-700">{val}%</span>
        </div>
      ),
    },
    {
      key: "academicStatus",
      header: "Academic Progress",
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: "feeStatus",
      header: "Fee Status",
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: "notes",
      header: "Teacher Notes",
      render: (val) => (
        <span className="text-slate-500 text-xs italic max-w-xs block truncate" title={val}>
          {val || "No record notes."}
        </span>
      ),
    },
  ];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    alert(
      "[Demo Action] Record addition simulated! \n\nIn Phase 2 (backend integrations), this form will validate input and write to the database."
    );
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Contextual Tier Banner */}
      <TierBanner pageName="Learner Administration" />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Registrar</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access, register, and update learner records for the current term.
          </p>
        </div>
      </div>

      {/* 2. Main DataTable */}
      <DataTable
        title="Active Learners Directory"
        data={learnersWithParent}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search learner by name..."
        filterKey="grade"
        filterOptions={grades}
        filterPlaceholder="All Grades"
        onAddClick={() => setShowAddModal(true)}
        addLabel="Add Student"
        currentTier={currentTier}
        actionRequiredTier={1}
      />

      {/* 3. Demo Modal overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scaleUp">
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900">Add New Learner Record</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-extrabold text-sm"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-5 space-y-4 text-xs text-slate-600">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sindi Khumalo"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Grade</label>
                  <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Grade R</option>
                    <option>Grade 1</option>
                    <option>Grade 6</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Attendance Rate</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 95"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Parent Guardian Link</label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500">
                  {mockParents.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Initial Teacher Notes</label>
                <textarea
                  placeholder="Optional general comments..."
                  rows="2"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-center shadow-md flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learners;
