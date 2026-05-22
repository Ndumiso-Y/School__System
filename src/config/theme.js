/**
 * Application Theme & Branding Configuration
 * Centered configuration for colors, branding names, and layout tokens.
 */
export const theme = {
  schoolName: "SMS Operations",
  companyName: "School Management System",
  tagline: "Comprehensive Operations & Governance Portal",
  logo: {
    path: "/src/assets/image.png",
    alt: "School Management System Logo",
  },
  colors: {
    primary: {
      light: "#3b82f6", // Blue 500
      DEFAULT: "#1e3a8a", // Blue 900
      dark: "#1e3a8a", // Slate/Blue
    },
    slate: {
      light: "#f8fafc",
      border: "#e2e8f0",
      text: "#475569",
      heading: "#0f172a",
      cardBg: "#ffffff",
    },
    accent: {
      emerald: "#10b981", // For Paid status
      amber: "#f59e0b", // For Partial status
      rose: "#f43f5e", // For Overdue status
      indigo: "#6366f1", // For Special highlight
    }
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  meta: {
    version: "1.0.0",
    supportEmail: "support@embarkdigitals.co.za",
    supportPhone: "+27 11 123 4567",
  }
};

export default theme;
