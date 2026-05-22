import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, Shield, HelpCircle, CheckCircle } from "lucide-react";
import theme from "../config/theme";
import logoImage from "../assets/image.png";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Principal / Super Admin");

  const demoAccounts = [
    { label: "Principal", role: "Principal / Super Admin", email: "principal@demo.school", pass: "demo123" },
    { label: "Administrator", role: "School Administrator", email: "admin@demo.school", pass: "demo123" },
    { label: "Finance Officer", role: "Finance Officer / Bursar", email: "finance@demo.school", pass: "demo123" },
    { label: "Teacher", role: "Teacher Register", email: "teacher@demo.school", pass: "demo123" },
    { label: "Parent / Guardian", role: "Parent / Guardian", email: "parent@demo.school", pass: "demo123" },
  ];

  const handleQuickLogin = (acc) => {
    setEmail(acc.email);
    setPassword(acc.pass);
    setSelectedRole(acc.role);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Allow any input, but match roles to helper roles if possible
    let roleToSave = selectedRole;
    const match = demoAccounts.find((d) => d.email.toLowerCase() === email.toLowerCase());
    if (match) {
      roleToSave = match.role;
    }
    
    localStorage.setItem("demoRole", roleToSave);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-indigo-600/10 blur-3xl"></div>

        <div className="relative text-center mb-6">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-slate-950 items-center justify-center shadow-lg shadow-slate-950/25 mb-3 border border-slate-800 p-1.5">
            <img src={logoImage} alt={theme.logo.alt} className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">{theme.companyName}</h1>
          <p className="text-xs text-slate-400 mt-1">{theme.tagline}</p>
        </div>

        {/* Demo login form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 relative">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. principal@demo.school"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2 rounded-lg text-xs font-bold shadow-lg shadow-blue-500/10 transition-colors flex items-center justify-center gap-1"
          >
            <KeyRound className="w-3.5 h-3.5" /> Sign In to Dashboard
          </button>
        </form>

        <div className="relative mt-8 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
            <Shield className="w-3 h-3 text-blue-500" /> Click to Autofill Demo Profiles
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                onClick={() => handleQuickLogin(acc)}
                className={`p-2 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                  email === acc.email
                    ? "bg-blue-950/40 border-blue-800 text-blue-300"
                    : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400"
                }`}
              >
                <span className="font-bold text-[10px] text-white flex items-center justify-between gap-1">
                  {acc.label}
                  {email === acc.email && <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />}
                </span>
                <span className="text-[9px] text-slate-500 truncate mt-0.5">{acc.email}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500 bg-slate-950/30 p-2.5 rounded border border-slate-800/50">
            <span className="flex items-center gap-1 font-semibold">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" /> Custom username accepted?
            </span>
            <span className="text-emerald-400 font-bold">Yes (Any input works)</span>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-slate-600 mt-4 tracking-wide">
        Scale Preview Mode: Active • ZAR Currency Safe • Phased Prototype
      </p>
    </div>
  );
};

export default Login;
