import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendType = "neutral", // positive | negative | neutral
  tierBadge
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all-200 relative overflow-hidden flex flex-col justify-between">
      {tierBadge && (
        <span className="absolute top-0 right-0 bg-blue-50 text-blue-700 text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-bl tracking-wider border-l border-b border-blue-100">
          {tierBadge}
        </span>
      )}
      
      <div>
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
          {Icon && (
            <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
        <span className="text-slate-500 truncate">{description}</span>
        {trend && (
          <span
            className={`font-semibold inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded ${
              trendType === "positive"
                ? "bg-emerald-50 text-emerald-700"
                : trendType === "negative"
                ? "bg-rose-50 text-rose-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {trendType === "positive" ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : trendType === "negative" ? (
              <ArrowDownRight className="w-3 h-3" />
            ) : null}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
