import { X, Bus, MapPin, Clock, AlertCircle } from 'lucide-react';

interface TransitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TransitModal({ isOpen, onClose }: TransitModalProps) {
  if (!isOpen) return null;

  const routes = [
    {
      stage: 'Stage 1: Eldoret Highway Line',
      destinations: 'Kingwal Swamp, Mosoriot Campus, Cheptiret',
      fare: 'KES 50 – 80',
      frequency: 'Every 5–10 minutes',
      matatuType: '14-seater Nissan shuttles (North Rift / Eldo-Met)',
      tip: 'Tell conductor you are alighting at Kingwal Bridge Wildlife Post.',
    },
    {
      stage: 'Stage 2: Kipkaren & Mlango Line',
      destinations: 'Chepkiit Waterfalls, Kipkaren River canyon, Mlango',
      fare: 'KES 70 – 100',
      frequency: 'Every 15–20 minutes',
      matatuType: 'Local countryside matatus & Probox links',
      tip: 'Get off at Chepkiit Junction gate; 10 min scenic walk or KES 50 Boda to falls entrance.',
    },
    {
      stage: 'Stage 3: Nandi Hills Line',
      destinations: 'Koitalel Samoei Museum, Nandi Rock, Chemase',
      fare: 'KES 80 – 120',
      frequency: 'Every 15 minutes',
      matatuType: 'Nandi Hills Express Shuttles',
      tip: 'Scenic highland climb through vast Eastern Produce tea estates.',
    },
    {
      stage: 'Town Boda-Boda Loop',
      destinations: 'Nandi Bears Club, Kapsabet High School Viewpoint',
      fare: 'KES 50 flat student rate',
      frequency: 'Instant (Town Clock Tower Stage)',
      matatuType: 'Registered SACCO Boda riders with reflective vests',
      tip: 'Always wear a helmet; student ID gets 20% discount on standard boda fares.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl border border-[#006948]/20 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#006948] text-white flex items-center justify-center">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#131b2e]">
                Nandi County Student Transit Directory
              </h2>
              <p className="text-xs text-[#6d7a72]">
                Matatu stages, campus connection lines & verified student fares
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#131b2e]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-3">
          {routes.map((r, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="font-extrabold text-sm text-[#006948]">{r.stage}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffddb8] text-[#825100] text-xs font-bold">
                  {r.fare}
                </span>
              </div>
              <div className="text-xs text-[#131b2e] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#006948] shrink-0" />
                <span className="font-semibold">Serves:</span> {r.destinations}
              </div>
              <div className="text-xs text-[#6d7a72] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#6d7a72] shrink-0" />
                <span>{r.frequency} • {r.matatuType}</span>
              </div>
              <div className="p-2 rounded bg-white text-[11px] text-[#3d4a42] border border-[#eaedff]">
                💡 <strong>Tip:</strong> {r.tip}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-[#f0fdf4] border border-[#006948]/20 flex items-start gap-2 text-xs text-[#064e3b]">
          <AlertCircle className="w-4 h-4 text-[#006948] shrink-0 mt-0.5" />
          <p>
            Matatu fares are regulated under the Nandi County Matatu Owners Association student charter. Carry valid physical student ID cards to avoid standard tourist surcharges.
          </p>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#006948] text-white text-xs font-bold hover:bg-[#047857] transition-all"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
