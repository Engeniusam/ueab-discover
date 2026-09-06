import { X, Trash2, ArrowRight, MapPin, Bookmark } from 'lucide-react';
import { Destination } from '../types';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedDestinations: Destination[];
  onRemoveSaved: (id: string) => void;
  onSelectDestination: (destination: Destination) => void;
}

export default function SavedDrawer({
  isOpen,
  onClose,
  savedDestinations,
  onRemoveSaved,
  onSelectDestination,
}: SavedDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col border-l border-[#006948]/20 animate-in slide-in-from-right"
      >
        <div className="p-4 bg-[#006948] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#f59e0b] fill-current" />
            <h2 className="text-base font-bold">Saved Destinations ({savedDestinations.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedDestinations.length === 0 ? (
            <div className="text-center py-16 text-[#6d7a72]">
              <Bookmark className="w-10 h-10 mx-auto mb-2 text-[#bccac0]" />
              <p className="font-semibold text-sm">No saved destinations yet</p>
              <p className="text-xs mt-1">Tap the bookmark icon on any card to save your favorite spots.</p>
            </div>
          ) : (
            savedDestinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => {
                  onSelectDestination(dest);
                  onClose();
                }}
                className="group cursor-pointer p-3 rounded-xl border border-[#eaedff] hover:border-[#006948]/40 hover:shadow-md transition-all flex gap-3 items-center bg-[#faf8ff]"
              >
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-[#131b2e] group-hover:text-[#006948] truncate">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-[#6d7a72] mt-0.5">
                    <MapPin className="w-3 h-3 text-[#006948]" />
                    <span className="truncate">{dest.distanceKm} km from Kapsabet</span>
                  </div>
                  <span className="inline-block text-[11px] font-extrabold text-[#006948] mt-1">
                    {dest.studentPrice}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSaved(dest.id);
                    }}
                    className="p-2 text-[#6d7a72] hover:text-[#ba1a1a] transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-[#006948] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {savedDestinations.length > 0 && (
          <div className="p-4 bg-[#f2f3ff] border-t border-[#dae2fd] text-xs text-[#3d4a42] text-center">
            Total destinations saved for your Nandi weekend itinerary
          </div>
        )}
      </div>
    </div>
  );
}
