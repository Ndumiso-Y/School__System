import React from "react";
import { useTier } from "../context/TierContext";
import { mockResults } from "../data/mockData";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import { FileDown, Eye } from "lucide-react";

export const Results = () => {
  const { currentTier } = useTier();

  // Flatten results for the grid display
  const flattenedResults = mockResults.flatMap((res) =>
    res.subjects.map((sub) => ({
      learner: res.learner,
      subject: sub.subject,
      score: sub.score,
      teacher: sub.teacher,
      term: sub.term,
      comment: sub.comment,
    }))
  );

  const columns = [
    { key: "learner", header: "Learner Name", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "subject", header: "Subject" },
    {
      key: "score",
      header: "Mark Score",
      render: (val) => (
        <span className={`font-extrabold text-sm ${val >= 75 ? "text-emerald-600" : val >= 50 ? "text-slate-800" : "text-rose-600"}`}>
          {val}%
        </span>
      ),
    },
    { key: "teacher", header: "Educator" },
    { key: "term", header: "Academic Term" },
    {
      key: "comment",
      header: "Teacher Comments",
      render: (val) => (
        <span className="text-slate-500 text-xs italic block max-w-sm truncate" title={val}>
          {val}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="Academic Results Registry" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Records</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review student subject marks, class scores, and report card logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LockedFeatureCard
          title="Digital Report Card Publisher"
          requiredTier={3}
          badgeText="Tier 3 Feature"
          description="Instantly compile and render print-ready term report cards to PDF format, ready to dispatch via bulk portal uploads."
        >
          <button disabled className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-100 border text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed">
            <FileDown className="w-4 h-4" /> Download PDF Reports Compilation
          </button>
        </LockedFeatureCard>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-800 font-bold mb-1.5">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>Parent Portal Visibility</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              Term marks are hidden from the parent portal preview until the Principal issues a global release command. Release is currently scheduled for the last Friday of Term 2.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        title="Term Marksheets Directory"
        data={flattenedResults}
        columns={columns}
        searchKey="learner"
        searchPlaceholder="Search learner..."
        filterKey="subject"
        filterOptions={["Mathematics", "Physical Sciences", "English Home Lang", "AP Math", "Natural Sciences"]}
        filterPlaceholder="All Subjects"
        onAddClick={() => alert("[Demo Action] Add Mark Entry simulated.")}
        addLabel="Add Marks Entry"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Results;
