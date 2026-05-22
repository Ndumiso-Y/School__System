import React from "react";
import { useTier } from "../context/TierContext";
import { TIER_MARKETING } from "../data/tierData";
import FeatureComparisonTable from "../components/FeatureComparisonTable";
import { Sparkles, CalendarDays, Rocket, ShieldCheck, HeartHandshake, HelpCircle } from "lucide-react";

export const PackagePreview = () => {
  const {
    currentTier,
    setCurrentTier,
    currentBand,
    setCurrentBand,
    bandsData,
    tiersData
  } = useTier();

  const marketing = TIER_MARKETING[currentTier];
  const activeTierDetails = tiersData[currentTier];

  // Retrieve correct price based on active tier and band
  const monthlyPrice = activeTierDetails.prices[currentBand];
  const onboardingFee = activeTierDetails.setupFee;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Packages & Subscription Planner</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review monthly subscriptions, once-off setup costs, features, and scale constraints.
        </p>
      </div>

      {/* Positioning Statement Card */}
      <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-xl shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl"></div>
        <h3 className="font-extrabold text-base tracking-tight text-white">Subscription Billing Model</h3>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-4xl">
          “Pricing is structured as a 12-month subscription agreement. Your monthly fee is determined by the tier you choose (what the system does) and your school size band (number of learners). You only pay for the sophistication and scale your school needs — and as your school grows, your plan grows with you in clear, predictable steps.”
        </p>
      </div>

      {/* Interactive Pricing Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Selectors Column */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5 lg:col-span-1">
          <h3 className="font-bold text-slate-800 text-sm border-b pb-2 flex items-center gap-1.5">
            <Rocket className="w-4 h-4 text-blue-600" />
            <span>Select System Parameters</span>
          </h3>

          {/* 1. Learner Band */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              1. School Learner Scale Band
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.values(bandsData).map((band) => (
                <button
                  key={band}
                  onClick={() => setCurrentBand(band)}
                  className={`p-2.5 rounded-lg border font-semibold text-center transition-all ${
                    currentBand === band
                      ? "bg-blue-50 border-blue-500 text-blue-800"
                      : "bg-slate-50/50 border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  {band}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">
              The default band for this school profile is 251–500 (approx. 300 learners).
            </p>
          </div>

          {/* 2. Tier Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              2. System Feature Package
            </label>
            <div className="space-y-2 text-xs">
              {Object.entries(tiersData).map(([id, t]) => {
                const tierId = Number(id);
                const isActive = currentTier === tierId;
                return (
                  <button
                    key={tierId}
                    onClick={() => setCurrentTier(tierId)}
                    className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10"
                        : "bg-slate-50/50 border-slate-200 hover:bg-slate-100/50 text-slate-700"
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1">
                        Tier {tierId}
                        {tierId === 2 && (
                          <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${isActive ? "bg-white text-blue-700" : "bg-blue-100 text-blue-800"}`}>
                            Recommended
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] mt-0.5 block ${isActive ? "text-blue-100" : "text-slate-400"}`}>
                        {t.name.split(" System")[0]}
                      </span>
                    </div>
                    <span className="font-bold text-sm shrink-0">
                      {t.prices[currentBand]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing & Marketing Details Column */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm lg:col-span-2 space-y-6">
          {/* Price Header Details */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full tracking-wider ${
                currentTier === 2 ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"
              }`}>
                {marketing.badge}
              </span>
              <h2 className="font-bold text-slate-900 text-lg sm:text-xl mt-2">{marketing.name}</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md">{marketing.purpose}</p>
            </div>
            
            <div className="text-left sm:text-right bg-slate-50/80 p-3 rounded-lg border border-slate-100 shrink-0">
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {monthlyPrice}
                {monthlyPrice !== "Custom Quote" && <span className="text-xs font-normal text-slate-400">/month</span>}
              </div>
              <div className="text-[10px] text-slate-500 font-semibold mt-1">
                Onboarding: {onboardingFee} once-off
              </div>
            </div>
          </div>

          {/* Setup / Onboarding Breakdown */}
          <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-4 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Onboarding Setup Covers ({onboardingFee}):</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-blue-800 font-medium list-disc list-inside pl-1">
              <li>Core application setup</li>
              <li>Brand token colors & logo configuration</li>
              <li>Pre-migration templates & data preparation</li>
              <li>Administrative & academic staff training</li>
              <li>System launch support</li>
            </ul>
          </div>

          {/* Features Column lists */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Included */}
            <div>
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wide border-b pb-1.5 text-[10px] text-emerald-700">
                Included Features
              </h4>
              <ul className="space-y-2 mt-3 text-slate-600 pl-1 list-disc list-inside">
                {marketing.includes.map((inc, i) => (
                  <li key={i} className="leading-relaxed font-semibold">{inc}</li>
                ))}
              </ul>
            </div>

            {/* Limited */}
            <div>
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wide border-b pb-1.5 text-[10px] text-amber-700">
                Limited Features
              </h4>
              <ul className="space-y-2 mt-3 text-slate-600 pl-1 list-disc list-inside">
                {marketing.limited.length > 0 ? (
                  marketing.limited.map((lim, i) => (
                    <li key={i} className="leading-relaxed font-semibold">{lim}</li>
                  ))
                ) : (
                  <li className="italic text-slate-400 font-medium">None. All features unlocked.</li>
                )}
              </ul>
            </div>

            {/* Locked */}
            <div>
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wide border-b pb-1.5 text-[10px] text-rose-700">
                Locked Features
              </h4>
              <ul className="space-y-2 mt-3 text-slate-400 pl-1 list-disc list-inside">
                {marketing.locked.length > 0 ? (
                  marketing.locked.map((lock, i) => (
                    <li key={i} className="leading-relaxed font-medium">{lock}</li>
                  ))
                ) : (
                  <li className="italic text-emerald-600 font-bold">None. Complete platform active!</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Support & Next Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mb-3">
            <HeartHandshake className="w-4 h-4 text-blue-600" />
            <span>Recommended Support Plan</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-semibold">
            All subscriptions include standard ticketing and email support (response time within 24 hours). Tier 2 adds monthly 1-on-1 HOD feedback webinars. Tier 3 includes dedicated SLAs with 2-hour priority responses and phone call escalation.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm mb-2">
              <CalendarDays className="w-4 h-4 text-blue-600" />
              <span>Annual Commitment Framing</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              Subscriptions operate on a lock-in 12-month term. Prepaying upfront grants 2 months free subscription. If your school crosses into a larger learner band, pricing updates apply at renewal.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Complete Grid Comparison Table */}
      <FeatureComparisonTable />

      {/* Mandatory Note */}
      <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex gap-2.5">
        <HelpCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          “Package Preview Mode is for demonstration and proposal clarity. It does not mean lower tiers are broken or incomplete. Tier 1 is the working core system, while higher tiers unlock deeper workflows, automation, reporting, document handling, permissions, and scalability.”
        </p>
      </div>
    </div>
  );
};

export default PackagePreview;
