import React from "react";

export const ChartCard = ({ title, subtitle, children, footerStats }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all-200 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="mt-6 min-h-[220px] w-full flex items-center justify-center">
          {children}
        </div>
      </div>

      {footerStats && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
          {footerStats.map((stat, i) => (
            <div key={i} className="text-center flex-1 border-r last:border-0 border-slate-100 px-2">
              <span className="text-slate-400 block uppercase tracking-wider text-[9px] font-bold">
                {stat.label}
              </span>
              <span className={`text-sm font-bold block mt-0.5 ${stat.color || "text-slate-800"}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartCard;
