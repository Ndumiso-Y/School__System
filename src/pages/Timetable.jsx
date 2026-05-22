import React from "react";
import { useTier } from "../context/TierContext";
import { mockTimetables } from "../data/mockData";
import DataTable from "../components/DataTable";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import { CalendarRange, Edit } from "lucide-react";

export const Timetable = () => {
  const { currentTier } = useTier();

  // Flatten timetable for the table grid view
  const flattenedTimetable = mockTimetables.flatMap((dayData) =>
    dayData.slots.map((slot) => ({
      day: dayData.day,
      time: slot.time,
      subject: slot.subject,
      room: slot.room,
      teacher: slot.teacher,
    }))
  );

  const columns = [
    { key: "day", header: "Day" },
    { key: "time", header: "Time Slot" },
    { key: "subject", header: "Subject", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "room", header: "Room / Location" },
    { key: "teacher", header: "Educator" },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="School Timetables" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Class schedules</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review school daily timetable schedules, classrooms, and teacher mappings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LockedFeatureCard
          title="Interactive Timetable Builder"
          requiredTier={2}
          badgeText="Tier 2 Feature"
          description="Drag-and-drop subjects to assign rooms and teachers. Automatically check for double-booking conflicts across rooms or teacher schedules."
        >
          <button disabled className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-100 border text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed">
            <Edit className="w-4 h-4" /> Open Schedule Builder Editor
          </button>
        </LockedFeatureCard>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-800 font-bold mb-1.5">
              <CalendarRange className="w-4 h-4 text-emerald-600" />
              <span>4-Term School Calendar Schedule</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              The school year runs on a standard 4-term private school model. SGB changes will sync automatically to timetables, rescheduling class lists without conflict.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        title="Weekly Schedule Slots"
        data={flattenedTimetable}
        columns={columns}
        searchKey="subject"
        searchPlaceholder="Search slots by subject..."
        filterKey="day"
        filterOptions={["Monday", "Tuesday"]}
        filterPlaceholder="All Days"
        onAddClick={() => alert("[Demo Action] Add slot simulated.")}
        addLabel="Map New Slot"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Timetable;
