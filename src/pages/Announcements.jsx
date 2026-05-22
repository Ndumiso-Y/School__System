import React from "react";
import { useTier } from "../context/TierContext";
import { mockAnnouncements } from "../data/mockData";
import DataTable from "../components/DataTable";
import LockedFeatureCard from "../components/LockedFeatureCard";
import TierBanner from "../components/TierBanner";
import { Megaphone, MessageSquareText } from "lucide-react";

export const Announcements = () => {
  const { currentTier } = useTier();

  const columns = [
    { key: "id", header: "ID" },
    { key: "date", header: "Date Published" },
    { key: "title", header: "Announcement Title", render: (val) => <span className="font-bold text-slate-800">{val}</span> },
    { key: "content", header: "Content Snippet", render: (val) => <span className="text-slate-500 font-semibold">{val}</span> },
    { key: "author", header: "Author" },
  ];

  return (
    <div className="space-y-6">
      <TierBanner pageName="School Notices Feed" />

      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Announcements Bulletin</h1>
        <p className="text-xs text-slate-500 mt-1">
          Publish general school notifications, newsletters, and reminders for parents and staff.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LockedFeatureCard
          title="Automated SMS & WhatsApp Reminders"
          requiredTier={3}
          badgeText="Tier 3 Feature"
          description="Send bulletins immediately as push SMS and WhatsApp messages to all registered parent mobile phone numbers using Twilio/WhatsApp endpoints."
        >
          <button disabled className="w-full flex items-center justify-center gap-1 py-1.5 bg-slate-100 border text-slate-400 rounded-lg text-xs font-bold cursor-not-allowed">
            <MessageSquareText className="w-4 h-4" /> Trigger WhatsApp Blast Notification
          </button>
        </LockedFeatureCard>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-800 font-bold mb-1.5">
              <Megaphone className="w-4 h-4 text-emerald-600" />
              <span>General Noticeboards</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-semibold">
              Notifications posted here reflect instantly inside the teacher register logs. They will also sync with the Parent Portal app preview once the dashboard updates are saved.
            </p>
          </div>
        </div>
      </div>

      <DataTable
        title="Bulletin History"
        data={mockAnnouncements}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search announcement..."
        onAddClick={() => alert("[Demo Action] Add Notice simulated.")}
        addLabel="Post Notice"
        currentTier={currentTier}
        actionRequiredTier={2}
      />
    </div>
  );
};

export default Announcements;
