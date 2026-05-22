import React from "react";
import { useTier } from "../context/TierContext";
import { Lock, Sparkles, ArrowUpRight } from "lucide-react";

export const LockedFeatureCard = ({
  title,
  description,
  requiredTier,
  children,
  badgeText = `Tier ${requiredTier} Feature`,
  bannerOnly = false
}) => {
  const { currentTier } = useTier();
  const isLocked = currentTier < requiredTier;

  if (!isLocked) {
    return (
      <div className="relative border border-slate-200 bg-white rounded-xl shadow-sm overflow-hidden p-5">
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-bl">
          Unlocked
        </div>
        {children}
      </div>
    );
  }

  // If locked, return the locked design layout
  if (bannerOnly) {
    return (
      <div className="border border-dashed border-slate-300 bg-slate-50/50 rounded-xl p-5 relative overflow-hidden flex flex-col justify-center items-center text-center min-h-[200px]">
        <div className="absolute top-3 right-3 bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1">
          <Lock className="w-2.5 h-2.5" /> Locked
        </div>
        <div className="p-3 bg-slate-100 rounded-full mb-3 text-slate-400">
          <Lock className="w-5 h-5" />
        </div>
        <h4 className="font-semibold text-slate-800 text-sm">{title}</h4>
        <p className="text-xs text-slate-500 max-w-md mt-1 mb-3">{description}</p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-lg">
          <Sparkles className="w-3 h-3 text-blue-500" />
          Available in Tier {requiredTier}
        </div>
      </div>
    );
  }

  return (
    <div className="relative border border-slate-200 bg-slate-50/50 rounded-xl p-5 overflow-hidden min-h-[220px] flex flex-col justify-between">
      {/* Locked overlay style */}
      <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-slate-800 text-base">{title}</h4>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {badgeText}
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Locked Visual Button */}
      <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Lock className="w-3 h-3 text-slate-400" /> Upgrade required
        </span>
        <button
          disabled
          className="px-3.5 py-1.5 bg-slate-200 text-slate-500 text-xs font-semibold rounded-lg flex items-center gap-1 cursor-not-allowed opacity-90 shadow-sm"
        >
          Unlock in Tier {requiredTier} <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default LockedFeatureCard;
