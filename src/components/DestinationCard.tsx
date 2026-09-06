import { MapPin, ArrowRight, Bookmark, Bus, Trees, Droplet, Mountain, Bird, ShieldCheck } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  key?: string | number;
  destination: Destination;
  onViewDetails: (destination: Destination) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export default function DestinationCard({
  destination,
  onViewDetails,
  isSaved,
  onToggleSave,
}: DestinationCardProps) {
  const getCategoryIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'waterfalls':
        return <Droplet className="w-3 h-3 text-[#006948]" />;
      case 'hiking':
        return <Mountain className="w-3 h-3 text-[#006948]" />;
      case 'parks':
        return <Trees className="w-3 h-3 text-[#006948]" />;
      case 'wildlife':
        return <Bird className="w-3 h-3 text-[#006948]" />;
      case 'wetlands':
        return <Droplet className="w-3 h-3 text-[#006948]" />;
      default:
        return <Trees className="w-3 h-3 text-[#006948]" />;
    }
  };

  const handleCardClick = () => {
    onViewDetails(destination);
  };

  return (
    <article
      id={`card-${destination.id}`}
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#064e3b]/10 shadow-[0_4px_16px_-2px_rgba(6,78,59,0.06)] hover:shadow-[0_12px_28px_-4px_rgba(6,78,59,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
    >
      {/* Top Image Section */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#eaedff]">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top Overlay Category Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {destination.categoryLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#131b2e] text-[11px] font-bold shadow-xs"
              >
                {getCategoryIcon(label)}
                <span>{label}</span>
              </span>
            ))}
          </div>

          {/* Save Bookmark Button */}
          <button
            id={`bookmark-${destination.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(destination.id);
            }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all z-10 ${
              isSaved
                ? 'bg-[#f59e0b] text-white shadow-sm'
                : 'bg-white/80 hover:bg-white text-[#131b2e]'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save for later'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Price Badge in Bottom Right */}
          <div className="absolute bottom-3 right-3 z-10">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                destination.priceBadgeType === 'gold'
                  ? 'bg-[#ffddb8] border border-[#f59e0b]/40 text-[#825100]'
                  : 'bg-[#b0f0d6] border border-[#006948]/30 text-[#006948]'
              }`}
            >
              {destination.studentPassVerified && <ShieldCheck className="w-3.5 h-3.5" />}
              <span>{destination.studentPrice}</span>
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5">
          {/* Distance & Travel Time */}
          <div className="flex items-center gap-1.5 text-xs text-[#6d7a72] font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#006948] shrink-0" />
            <span className="truncate">{destination.locationDetails}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-[#131b2e] group-hover:text-[#006948] transition-colors leading-snug mb-2">
            {destination.name}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#3d4a42] line-clamp-3 leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="px-5 pb-5 pt-2 border-t border-[#f2f3ff] flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6d7a72]">
          <Bus className="w-3.5 h-3.5 text-[#006948] shrink-0" />
          <span className="truncate max-w-[140px] sm:max-w-[170px]">
            {destination.transitDetails.stage} • Fare {destination.transitDetails.matatuFare}
          </span>
        </div>

        {/* View Details Button */}
        <button
          id={`view-details-${destination.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(destination);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#006948] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-xs shrink-0 group-hover:shadow-md"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
}
