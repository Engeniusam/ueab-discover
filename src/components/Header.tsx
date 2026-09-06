import { useState } from 'react';
import { Compass, Search, Bookmark, User, Activity, MapPin } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenTransit: () => void;
  onOpenStudentPass: () => void;
  onToggleTelemetry: () => void;
  telemetryLogsCount: number;
}

export default function Header({
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenSaved,
  onOpenTransit,
  onOpenStudentPass,
  onToggleTelemetry,
  telemetryLogsCount,
}: HeaderProps) {
  const [activeTab, setActiveTab] = useState<'explore' | 'transit' | 'pass'>('explore');

  return (
    <header className="sticky top-0 z-30 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#064e3b]/10 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Campus Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006948] to-[#00855d] flex items-center justify-center text-white shadow-sm">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#006948] block leading-none">
                Kapsabet Discover
              </span>
              <span className="text-[10px] font-bold text-[#6d7a72] uppercase tracking-wider">
                Nandi Student Portal
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#adedd3]/40 border border-[#006948]/20 text-[#006948] text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-[#006948]" />
            <span>UEAB Baraton & Local Campuses</span>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="relative flex-1 max-w-xs md:max-w-sm hidden md:block">
          <Search className="w-4 h-4 text-[#6d7a72] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="header-global-search"
            type="text"
            placeholder="Search trails, waterfalls..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-[#f2f3ff] border border-transparent focus:border-[#006948]/30 focus:bg-white focus:outline-none transition-all placeholder:text-[#6d7a72]"
          />
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          <button
            id="nav-explore-btn"
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === 'explore'
                ? 'bg-[#006948] text-white shadow-sm'
                : 'text-[#131b2e] hover:bg-[#eaedff]'
            }`}
          >
            Explore
          </button>

          <button
            id="nav-transit-btn"
            onClick={() => {
              setActiveTab('transit');
              onOpenTransit();
            }}
            className="px-3 py-2 rounded-full text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-all hidden sm:block"
          >
            Transit & Matatu
          </button>

          <button
            id="nav-student-pass-btn"
            onClick={() => {
              setActiveTab('pass');
              onOpenStudentPass();
            }}
            className="px-3 py-2 rounded-full text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-all hidden lg:block"
          >
            Student Pass
          </button>

          {/* Saved Spots */}
          <button
            id="nav-saved-btn"
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-all"
            title="View saved destinations"
          >
            <Bookmark className="w-4 h-4 text-[#006948]" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#f59e0b] text-[#131b2e] text-[11px] font-extrabold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Grafana Faro Telemetry Monitor Pill */}
          <button
            id="nav-telemetry-pill"
            onClick={onToggleTelemetry}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#f0fdf4] border border-[#006948]/30 hover:border-[#006948] text-[#006948] text-xs font-semibold transition-all shadow-2xs"
            title="Grafana Faro Web SDK Telemetry Monitor"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]"></span>
            </span>
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Faro SDK</span>
            {telemetryLogsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#006948] text-white text-[10px] font-bold">
                {telemetryLogsCount}
              </span>
            )}
          </button>

          {/* Profile Button */}
          <button
            id="nav-profile-btn"
            onClick={onOpenStudentPass}
            className="w-9 h-9 rounded-full bg-[#006948] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
            title="Student Profile & ID Verification"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
