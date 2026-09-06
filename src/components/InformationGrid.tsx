import { useState } from 'react';
import { ShieldAlert, PhoneCall, Radio, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function InformationGrid() {
  const [latency, setLatency] = useState<number>(24);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [lastTested, setLastTested] = useState<string>('Just now');

  const handleTestLatency = async () => {
    setIsTesting(true);
    const start = performance.now();
    try {
      // Ping local server endpoint
      await fetch('/api/health').catch(() => {});
      const elapsed = Math.round(performance.now() - start);
      setLatency(Math.max(12, elapsed));
    } catch {
      setLatency(28);
    } finally {
      setIsTesting(false);
      setLastTested('Just now');
    }
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Box 1: Safety & Community Guides */}
        <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-[#064e3b]/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#006948] uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Safety & Community Guides</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#131b2e] mb-2">
              Student Trail Protocol
            </h3>
            <p className="text-xs sm:text-sm text-[#3d4a42] leading-relaxed">
              Never swim near falls or deep wetlands unaccompanied. Registered guides are available at community gates. Always keep phone battery above 30%.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#f2f3ff] flex items-center gap-2 text-[11px] text-[#006948] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Nandi County Warden Approved</span>
          </div>
        </div>

        {/* Box 2: Local Contacts */}
        <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-[#064e3b]/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#006948] uppercase tracking-wider mb-2">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Local Contacts</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#131b2e]">
              <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#6d7a72]">Tourism Helpline:</span>
                <a href="tel:0800720001" className="font-bold text-[#006948] hover:underline">
                  0800 720 001
                </a>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#6d7a72]">Kapsabet Police Base:</span>
                <a href="tel:+2545352022" className="font-bold text-[#006948] hover:underline">
                  +254 53 52022
                </a>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-[#6d7a72]">Community Desk:</span>
                <span className="font-semibold text-[#131b2e]">Mosoriot & Baraton Union</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-[#f2f3ff] text-[11px] text-[#6d7a72]">
            <span>Emergency radios manned 24/7 at all park gates</span>
          </div>
        </div>

        {/* Box 3: Campus Edge Node */}
        <div className="md:col-span-4 bg-[#f2f3ff] rounded-2xl p-6 border border-[#dae2fd] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-[#6d7a72] uppercase tracking-wider mb-2">
              <span>Campus Edge Node</span>
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            </div>

            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
              <h3 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                Latency: <span className="text-[#006948] font-mono">{latency}ms</span> (Optimal – Kapsabet Node)
              </h3>
            </div>

            <p className="text-xs text-[#3d4a42] leading-relaxed">
              Live ping to local low-bandwidth offline transit cache.
            </p>
          </div>

          <div className="mt-4">
            <button
              id="btn-test-latency"
              onClick={handleTestLatency}
              disabled={isTesting}
              className="w-full py-2 px-3 rounded-xl bg-[#b0f0d6] hover:bg-[#85f8c4] text-[#002114] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Testing Ping...' : 'Test Frontend Latency'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
