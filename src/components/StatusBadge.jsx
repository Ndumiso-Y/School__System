import React from "react";

export const StatusBadge = ({ status }) => {
  const getBadgeStyles = (val) => {
    const s = String(val).toLowerCase();
    
    // Green styles: positive, complete, active
    if (["paid", "active", "approved", "completed", "complete", "scheduled", "yes", "full-time"].includes(s)) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    
    // Amber styles: pending, warning, progress
    if (["partial", "pending invitation", "pending review", "draft", "in progress", "pending", "invited", "medium"].includes(s)) {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    
    // Rose styles: danger, overdue, attention
    if (["overdue", "needs attention", "failed", "high", "on leave"].includes(s)) {
      return "bg-rose-50 text-rose-700 border-rose-200";
    }
    
    // Blue styles: logged, informational, part-time
    if (["logged", "low", "part-time", "registered"].includes(s)) {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }
    
    // Gray fallback
    return "bg-slate-100 text-slate-600 border-slate-200";
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyles(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
