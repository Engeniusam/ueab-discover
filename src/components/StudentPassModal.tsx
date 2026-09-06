import { X, Ticket, CheckCircle2, ShieldCheck, GraduationCap, Building2 } from 'lucide-react';

interface StudentPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentPassModal({ isOpen, onClose }: StudentPassModalProps) {
  if (!isOpen) return null;

  const institutions = [
    { name: 'University of Eastern Africa, Baraton (UEAB)', discount: 'Full 66% concession' },
    { name: 'Mosoriot Teachers Training College (TTC)', discount: 'Full 66% concession' },
    { name: 'Koitalel Samoei University College (Kapsabet & Nandi Hills)', discount: 'Full 66% concession' },
    { name: 'Eldoret & Moi University Satellite Campuses', discount: 'Verified student pass rates' },
    { name: 'Nandi Technical & Vocational Colleges', discount: 'Verified student pass rates' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-[#006948]/20"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#a36700] text-white flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#131b2e]">
                Nandi County Student Pass 2024
              </h2>
              <p className="text-xs text-[#6d7a72]">
                Subsidized eco-tourism & cultural site admission
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

        <div className="py-4 space-y-4">
          <div className="p-4 rounded-xl bg-[#f0fdf4] border border-[#006948]/20 space-y-2">
            <div className="flex items-center gap-2 text-[#006948] font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>How Student Concessions Work</span>
            </div>
            <p className="text-xs text-[#3d4a42] leading-relaxed">
              Present your active physical or digital Student ID card at destination ticket gates to receive up to 70% off standard park, museum, and falls entry fees.
            </p>
          </div>

          <div>
            <span className="text-xs font-bold uppercase text-[#6d7a72] tracking-wider block mb-2">
              Recognized Higher Learning Campuses
            </span>
            <div className="space-y-2">
              {institutions.map((inst, i) => (
                <div key={i} className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-[#faf8ff] border border-[#eaedff] text-xs">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#006948] shrink-0" />
                    <span className="font-semibold text-[#131b2e]">{inst.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#006948] shrink-0">
                    {inst.discount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#6d7a72]">
            <Building2 className="w-4 h-4 text-[#006948]" />
            <span>Endorsed by County Government of Nandi Department of Tourism & Youth Affairs.</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#006948] text-white text-xs font-bold hover:bg-[#047857] transition-all"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
