import React from "react";
import { useTier } from "../context/TierContext";
import { Layers, Users } from "lucide-react";

export const TierSwitcher = () => {
  const { currentTier, setCurrentTier, currentBand, setCurrentBand, bandsData } = useTier();

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left Info Column */}
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-sm tracking-wide text-slate-200 uppercase">Package Preview Mode</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            This preview shows how available features change across implementation tiers.
          </p>
        </div>

        {/* Right Controls Column */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Tier Switcher Selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
            <Layers className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
            <button
              onClick={() => setCurrentTier(1)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                currentTier === 1
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Tier 1 (Core)
            </button>
            <button
              onClick={() => setCurrentTier(2)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                currentTier === 2
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Tier 2 (Ops)
            </button>
            <button
              onClick={() => setCurrentTier(3)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                currentTier === 3
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Tier 3 (Full)
            </button>
          </div>

          {/* Learner Band Selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
            <Users className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1.5" />
            <select
              value={currentBand}
              onChange={(e) => setCurrentBand(e.target.value)}
              className="bg-transparent text-xs text-slate-200 border-none outline-none pr-6 pl-1 font-medium cursor-pointer"
            >
              {Object.values(bandsData).map((band) => (
                <option key={band} value={band} className="bg-slate-800 text-slate-200">
                  {band} Learners
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierSwitcher;
