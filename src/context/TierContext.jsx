import React, { createContext, useContext, useState } from "react";

const TierContext = createContext(undefined);

export const BANDS = {
  BAND_250: "Up to 250",
  BAND_500: "251–500",
  BAND_800: "501–800",
  BAND_800_PLUS: "800+",
};

export const TIERS = {
  1: {
    id: 1,
    name: "Core School Management System",
    setupFee: "R6,500",
    prices: {
      [BANDS.BAND_250]: "R2,650",
      [BANDS.BAND_500]: "R3,500",
      [BANDS.BAND_800]: "R4,900",
      [BANDS.BAND_800_PLUS]: "Custom Quote",
    }
  },
  2: {
    id: 2,
    name: "School Operations Management System",
    setupFee: "R9,500",
    prices: {
      [BANDS.BAND_250]: "R4,900",
      [BANDS.BAND_500]: "R6,500",
      [BANDS.BAND_800]: "R9,100",
      [BANDS.BAND_800_PLUS]: "Custom Quote",
    }
  },
  3: {
    id: 3,
    name: "Full School Digital Platform",
    setupFee: "R14,500",
    prices: {
      [BANDS.BAND_250]: "R8,600",
      [BANDS.BAND_500]: "R11,500",
      [BANDS.BAND_800]: "R16,100",
      [BANDS.BAND_800_PLUS]: "Custom Quote",
    }
  }
};

export const TierProvider = ({ children }) => {
  const [currentTier, setCurrentTier] = useState(2); // Tier 2 (Recommended) as default
  const [currentBand, setCurrentBand] = useState(BANDS.BAND_500); // 251-500 as default

  const toggleTier = (tierId) => {
    if (TIERS[tierId]) {
      setCurrentTier(tierId);
    }
  };

  const toggleBand = (band) => {
    if (Object.values(BANDS).includes(band)) {
      setCurrentBand(band);
    }
  };

  // Helper to determine feature state: 'included' | 'limited' | 'locked'
  const getFeatureState = (featureKey, minTier, maxLimitedTier = null) => {
    if (currentTier >= minTier) {
      if (maxLimitedTier && currentTier <= maxLimitedTier) {
        return "limited";
      }
      return "included";
    }
    return "locked";
  };

  return (
    <TierContext.Provider
      value={{
        currentTier,
        setCurrentTier: toggleTier,
        currentBand,
        setCurrentBand: toggleBand,
        getFeatureState,
        tierDetails: TIERS[currentTier],
        tiersData: TIERS,
        bandsData: BANDS,
      }}
    >
      {children}
    </TierContext.Provider>
  );
};

export const useTier = () => {
  const context = useContext(TierContext);
  if (!context) {
    throw new Error("useTier must be used within a TierProvider");
  }
  return context;
};
