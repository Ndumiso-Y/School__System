import React from "react";
import { useTier } from "../context/TierContext";
import { Info, Sparkles, CheckCircle } from "lucide-react";

export const TierBanner = ({ pageName }) => {
  const { currentTier } = useTier();

  const getBannerDetails = () => {
    switch (currentTier) {
      case 1:
        return {
          bg: "bg-blue-50 border-blue-200 text-blue-800",
          icon: <Info className="w-4 h-4 text-blue-600 shrink-0" />,
          text: `Tier 1 (Core SMS) is active for ${pageName}. Managing basic digital registers and logs. Upgrades are highlighted in amber/rose.`,
        };
      case 2:
        return {
          bg: "bg-indigo-50 border-indigo-200 text-indigo-800",
          icon: <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />,
          text: `Tier 2 (School Operations) is active for ${pageName}. Displaying attendance records, timetables, and teacher logs.`,
        };
      case 3:
        return {
          bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
          icon: <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />,
          text: `Tier 3 (Full Digital Platform) is active for ${pageName}. Displaying live documents, automation rules, and downloadable exports.`,
        };
      default:
        return null;
    }
  };

  const details = getBannerDetails();
  if (!details) return null;

  return (
    <div className={`border rounded-lg p-3.5 mb-6 flex items-start gap-2.5 text-xs shadow-sm ${details.bg}`}>
      {details.icon}
      <span className="font-medium leading-relaxed">{details.text}</span>
    </div>
  );
};

export default TierBanner;
