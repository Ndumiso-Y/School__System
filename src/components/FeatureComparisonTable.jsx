import React from "react";
import { COMPARISON_FEATURES } from "../data/tierData";
import { Check, X, Sparkles } from "lucide-react";
import { useTier } from "../context/TierContext";

export const FeatureComparisonTable = () => {
  const { currentTier, setCurrentTier } = useTier();

  // Group features by category
  const categories = COMPARISON_FEATURES.reduce((acc, feat) => {
    if (!acc[feat.category]) {
      acc[feat.category] = [];
    }
    acc[feat.category].push(feat);
    return acc;
  }, {});

  const renderIconOrText = (val) => {
    const v = val.toLowerCase();
    if (v === "locked" || v === "no") {
      return <X className="w-4 h-4 text-slate-300 mx-auto" />;
    }
    if (v === "full" || v === "yes" || v === "included") {
      return <Check className="w-4 h-4 text-emerald-500 mx-auto font-bold" />;
    }
    return <span className="text-xs font-semibold text-slate-700">{val}</span>;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Compare All System Features</h3>
          <p className="text-xs text-slate-500 mt-1">Review the capability progression from Core up to the Full Platform.</p>
        </div>
        <div className="flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Tier 2 is Recommended
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50/50">
              <th className="text-left py-4 px-6 font-semibold w-1/3">Feature Category & Name</th>
              
              {/* Tier 1 Header */}
              <th 
                onClick={() => setCurrentTier(1)}
                className={`py-4 px-4 cursor-pointer hover:bg-slate-100/50 transition-colors ${
                  currentTier === 1 ? "bg-blue-50/50 border-x-2 border-blue-500" : ""
                }`}
              >
                <div className="text-slate-800 font-bold">Tier 1 - Core</div>
                <div className="text-[10px] text-slate-500 lowercase font-normal mt-0.5">R3,500/mo</div>
              </th>

              {/* Tier 2 Header - Recommended */}
              <th 
                onClick={() => setCurrentTier(2)}
                className={`py-4 px-4 cursor-pointer bg-blue-50/30 relative hover:bg-blue-50/50 transition-colors ${
                  currentTier === 2 ? "border-x-2 border-t-2 border-blue-600 bg-blue-50/70" : "border-x border-slate-100"
                }`}
              >
                <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                  Recommended
                </div>
                <div className="text-blue-900 font-extrabold pt-2">Tier 2 - Operations</div>
                <div className="text-[10px] text-blue-700 lowercase font-medium mt-0.5">R6,500/mo</div>
              </th>

              {/* Tier 3 Header */}
              <th 
                onClick={() => setCurrentTier(3)}
                className={`py-4 px-4 cursor-pointer hover:bg-slate-100/50 transition-colors ${
                  currentTier === 3 ? "bg-blue-50/50 border-x-2 border-blue-500" : ""
                }`}
              >
                <div className="text-slate-800 font-bold">Tier 3 - Full Platform</div>
                <div className="text-[10px] text-slate-500 lowercase font-normal mt-0.5">R11,500/mo</div>
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {Object.entries(categories).map(([category, items]) => (
              <React.Fragment key={category}>
                <tr className="bg-slate-50 text-left">
                  <td colSpan="4" className="py-2.5 px-6 text-xs font-bold text-slate-800 border-y border-slate-200/80 tracking-wide uppercase">
                    {category}
                  </td>
                </tr>
                {items.map((item) => (
                  <tr key={item.name} className="hover:bg-slate-50/30 transition-colors text-sm">
                    <td className="text-left py-3 px-6 font-medium text-slate-800">{item.name}</td>
                    
                    {/* Tier 1 Cell */}
                    <td className={`py-3 px-4 ${currentTier === 1 ? "bg-blue-50/20 border-x-2 border-blue-500/20" : ""}`}>
                      {renderIconOrText(item.t1)}
                    </td>

                    {/* Tier 2 Cell (Recommended) */}
                    <td className={`py-3 px-4 ${currentTier === 2 ? "bg-blue-50/40 border-x-2 border-blue-600/30" : "border-x border-slate-50"}`}>
                      {renderIconOrText(item.t2)}
                    </td>

                    {/* Tier 3 Cell */}
                    <td className={`py-3 px-4 ${currentTier === 3 ? "bg-blue-50/20 border-x-2 border-blue-500/20" : ""}`}>
                      {renderIconOrText(item.t3)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureComparisonTable;
