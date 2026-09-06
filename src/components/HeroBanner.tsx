import { Ticket, Navigation, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick?: () => void;
}

export default function HeroBanner({ onExploreClick }: HeroBannerProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-8 pt-4 pb-2">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#006948] via-[#064e3b] to-[#043e30] text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-[#006948]/40">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#10b981]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Heading & Directory Info */}
          <div className="lg:col-span-8 space-y-4">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#adedd3] text-xs font-bold tracking-wider uppercase">
              <Ticket className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Nandi County Student Pass • 2024 Directory</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Explore Nandi Wonders on a <span className="text-[#85f8c4]">Student Budget</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#d2d9f4] text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              Verified university admission discounts, local matatu connections from Kapsabet & Baraton, plus community guide rates curated for adventurers.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-white/90">
                <Sparkles className="w-3 h-3 text-[#f59e0b]" /> 100% Student Verified
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-white/90">
                Stage 1 & 2 Matatu Routes
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-white/90">
                Special UEAB / Mosoriot Concessions
              </span>
            </div>
          </div>

          {/* Right Column: Campus Origin Card */}
          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-inner flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <span className="text-[11px] font-bold text-[#85f8c4] uppercase tracking-wider">
                  Campus Origin Point
                </span>
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              </div>

              <div className="py-3 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Navigation className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                    Baraton & Kapsabet Town
                  </h2>
                  <p className="text-xs text-[#d2d9f4] mt-0.5">
                    Fares tracked via Main Matatu Stage
                  </p>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#85f8c4] flex items-center justify-between">
                <span>Avg. Student Travel: 15–35 mins</span>
                <span className="font-semibold text-white">Stage 1/2 Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
