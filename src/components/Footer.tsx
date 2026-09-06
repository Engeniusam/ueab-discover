import { useState } from 'react';
import { AlertTriangle, Activity, CheckCircle2, Bug } from 'lucide-react';
import { faroService } from '../services/faro';

interface FooterProps {
  onOpenTelemetry: () => void;
  onOpenGuidelines: () => void;
}

export default function Footer({ onOpenTelemetry, onOpenGuidelines }: FooterProps) {
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const handleTriggerFaroError = () => {
    try {
      const err = faroService.triggerSimulatedError();
      setErrorStatus(`Captured by Faro: "${err.message}"`);
      setTimeout(() => setErrorStatus(null), 4500);
    } catch (e: any) {
      setErrorStatus('Error triggered');
      setTimeout(() => setErrorStatus(null), 3000);
    }
  };

  return (
    <footer className="border-t border-[#064e3b]/10 bg-white/70 backdrop-blur-md pt-8 pb-12 transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 space-y-6">
        {/* Live Demo Testing Bar: Error Trigger & Faro Telemetry Status */}
        <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-[#131b2e]">
            <div className="w-8 h-8 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
              <Bug className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold block text-[#131b2e]">
                Live Observability Testing (Grafana Faro Web SDK)
              </span>
              <span className="text-[#6d7a72] text-[11px]">
                Instrumentation verified for JS errors, unhandled rejections, and Core Web Vitals (LCP, CLS).
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Intentional error-trigger button */}
            <button
              id="btn-trigger-faro-error"
              onClick={handleTriggerFaroError}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#93000a] text-xs font-bold transition-all shadow-2xs border border-[#ba1a1a]/30 cursor-pointer"
              title="Calls faro.api.pushError(new Error('Simulated Frontend Error'))"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Trigger Simulated Faro Error</span>
            </button>

            {/* View Telemetry Drawer Button */}
            <button
              id="btn-open-telemetry-drawer"
              onClick={onOpenTelemetry}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#006948] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>View Telemetry Stream</span>
            </button>
          </div>
        </div>

        {/* Live Toast Confirmation when Error is triggered */}
        {errorStatus && (
          <div className="p-3 rounded-xl bg-[#ffdad6] border border-[#ba1a1a] text-[#93000a] text-xs font-medium flex items-center justify-between animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ba1a1a]" />
              <span>
                <strong>Grafana Faro Recorded Error:</strong> {errorStatus} (Dispatched to{' '}
                <code className="bg-white/60 px-1 py-0.5 rounded font-mono">faro.api.pushError</code>)
              </span>
            </div>
            <button
              onClick={() => setErrorStatus(null)}
              className="text-xs font-bold hover:underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Footer Copyright and Node specs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6d7a72] pt-4 border-t border-[#f2f3ff]">
          <div>
            <p>
              © 2026 Kapsabet Discover. Nandi County Student Tourism Initiative. Baraton, Mosoriot & Kapsabet Campuses.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#006948] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span>Node: Eldoret-Kapsabet Edge | 24ms</span>
            </span>

            <button
              onClick={onOpenGuidelines}
              className="hover:text-[#006948] underline decoration-dotted transition-colors"
            >
              Privacy & Guidelines
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
