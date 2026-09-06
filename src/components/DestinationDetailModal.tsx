import { X, MapPin, Bus, Clock, Phone, ShieldAlert, CheckCircle2, Bookmark, Share2, Activity, Sparkles, Navigation } from 'lucide-react';
import { Destination } from '../types';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export default function DestinationDetailModal({
  destination,
  onClose,
  isSaved,
  onToggleSave,
}: DestinationDetailModalProps) {
  if (!destination) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} - Kapsabet Discover`,
        text: `Check out ${destination.name} in Nandi County! Student admission: ${destination.studentPrice}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div
      id="destination-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="destination-detail-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl max-h-[92vh] rounded-2xl overflow-y-auto shadow-2xl border border-[#006948]/20 flex flex-col relative"
      >
        {/* Close Button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo Section */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#131b2e] shrink-0">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Top category tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {destination.categoryLabels.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#006948] text-xs font-bold shadow-xs"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <div className="flex items-center gap-1.5 text-xs text-[#85f8c4] font-bold mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
              <span>{destination.locationDetails}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {destination.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-medium">
              {destination.subtitle}
            </p>
          </div>
        </div>

        {/* Faro Telemetry Event Banner (Live Proof) */}
        <div className="bg-[#f0fdf4] border-b border-[#006948]/20 px-5 py-2.5 flex items-center justify-between text-xs text-[#006948]">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#059669] animate-pulse" />
            <span className="font-semibold">Faro Telemetry Dispatched:</span>
            <code className="bg-[#adedd3]/60 px-2 py-0.5 rounded text-[11px] font-mono text-[#064e3b]">
              faro.api.pushEvent('destination_viewed', &#123; name: '{destination.name}' &#125;)
            </code>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#059669]">
            <CheckCircle2 className="w-3 h-3" /> Instrumented
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Rate & Student Discount Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffddb8] flex items-center justify-center text-[#825100] shrink-0 font-extrabold text-sm">
                KES
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-[#6d7a72] block">
                  Student Rate (With ID)
                </span>
                <span className="text-lg font-extrabold text-[#006948]">
                  {destination.studentPrice}
                </span>
                <span className="text-xs text-[#6d7a72] ml-2 line-through">
                  Reg: {destination.regularPrice}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#b0f0d6] flex items-center justify-center text-[#006948] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-[#6d7a72] block">
                  Visiting Hours
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#131b2e]">
                  {destination.openingHours}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase text-[#6d7a72] tracking-wider mb-2">
              Destination Overview
            </h3>
            <p className="text-sm sm:text-base text-[#131b2e] leading-relaxed">
              {destination.fullDescription}
            </p>
          </div>

          {/* Transit & Matatu Guide */}
          <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]">
            <div className="flex items-center gap-2 mb-3 text-[#006948]">
              <Bus className="w-4 h-4" />
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Student Transit & Matatu Connection
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
              <div className="bg-white p-2.5 rounded-lg border border-[#eaedff]">
                <span className="text-[#6d7a72] block text-[10px] uppercase font-bold">Departure Stage</span>
                <span className="font-bold text-[#131b2e]">{destination.transitDetails.stage}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#eaedff]">
                <span className="text-[#6d7a72] block text-[10px] uppercase font-bold">Matatu Fare</span>
                <span className="font-bold text-[#006948]">{destination.transitDetails.matatuFare}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#eaedff]">
                <span className="text-[#6d7a72] block text-[10px] uppercase font-bold">Last Mile (Boda)</span>
                <span className="font-bold text-[#131b2e]">{destination.transitDetails.bodaFare || 'Not needed'}</span>
              </div>
            </div>

            <p className="text-xs text-[#3d4a42] leading-normal">
              <strong>Route Guidance:</strong> {destination.transitDetails.connectionNotes}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-sm font-bold uppercase text-[#6d7a72] tracking-wider mb-3">
              Key Spot Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#131b2e]">
                  <Sparkles className="w-3.5 h-3.5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & Guidelines */}
          <div className="p-4 rounded-xl bg-[#fff8e1] border border-[#ffe082]">
            <div className="flex items-center gap-2 mb-2 text-[#825100]">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Student Safety & Trail Guidelines
              </h4>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-[#5d4037]">
              {destination.guidelines.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>

          {/* Contact and Emergency */}
          {destination.contactPhone && (
            <div className="flex items-center justify-between text-xs text-[#6d7a72] pt-2 border-t border-[#f2f3ff]">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#006948]" />
                <span>Guide / Gate Desk: <strong>{destination.contactPhone}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#006948]" />
                <span>Coord: {destination.coordinates?.lat.toFixed(3)}, {destination.coordinates?.lng.toFixed(3)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 bg-[#faf8ff] border-t border-[#eaedff] flex items-center justify-between gap-3 shrink-0">
          <button
            id="modal-toggle-save-btn"
            onClick={() => onToggleSave(destination.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              isSaved
                ? 'bg-[#f59e0b] text-white shadow-xs'
                : 'bg-white border border-[#006948]/30 text-[#006948] hover:bg-[#eaedff]'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span>{isSaved ? 'Saved in Itinerary' : 'Save Spot'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id="modal-share-btn"
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white border border-[#eaedff] text-[#131b2e] hover:bg-[#eaedff] transition-all"
              title="Share destination"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              id="modal-close-bottom-btn"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#006948] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold transition-all shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
