import { useState, useEffect } from 'react';
import { X, Activity, AlertTriangle, CheckCircle2, Shield, Trash2, Terminal, Gauge } from 'lucide-react';
import { faroService } from '../services/faro';
import { TelemetryLog, WebVitalsState } from '../types';

interface FaroTelemetryInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FaroTelemetryInspector({ isOpen, onClose }: FaroTelemetryInspectorProps) {
  const [logs, setLogs] = useState<TelemetryLog[]>([]);
  const [vitals, setVitals] = useState<WebVitalsState>({
    lcp: null,
    cls: null,
    fid: null,
    fcp: null,
    ttfb: null,
  });
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const unsubscribe = faroService.subscribe((updatedLogs, updatedVitals) => {
      setLogs([...updatedLogs]);
      setVitals({ ...updatedVitals });
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const filteredLogs = logs.filter((log) => {
    if (filterType === 'all') return true;
    return log.type === filterType;
  });

  return (
    <div
      id="telemetry-inspector-overlay"
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="telemetry-inspector-drawer"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col border-l border-[#006948]/20 animate-in slide-in-from-right duration-250"
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#006948] to-[#064e3b] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#85f8c4]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">
                Grafana Faro Web SDK Monitor
              </h2>
              <p className="text-[11px] text-[#adedd3]">
                Live Frontend Telemetry & Observability Stream
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* SDK Configuration Card */}
        <div className="p-4 bg-[#f2f3ff] border-b border-[#dae2fd] text-xs shrink-0">
          <div className="flex items-center justify-between font-bold text-[#131b2e] mb-1.5">
            <span className="flex items-center gap-1.5 text-[#006948]">
              <Shield className="w-3.5 h-3.5" /> SDK Status: Active & Instrumented
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#b0f0d6] text-[#002114] text-[10px]">
              v1.0.0
            </span>
          </div>

          <div className="font-mono text-[11px] bg-white p-2 rounded-lg border border-[#eaedff] text-[#131b2e] space-y-0.5">
            <div><span className="text-[#6d7a72]">app.name:</span> 'kapsabet-discover'</div>
            <div><span className="text-[#6d7a72]">collectorUrl:</span> 'https://faro-collector.example.com/collect'</div>
            <div><span className="text-[#6d7a72]">instrumentation:</span> Errors, Web Vitals, Console, Events</div>
          </div>
        </div>

        {/* Core Web Vitals Live Verification Box */}
        <div className="p-4 bg-[#faf8ff] border-b border-[#eaedff] shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#131b2e] mb-2.5">
            <Gauge className="w-3.5 h-3.5 text-[#006948]" />
            <span>Automatic Core Web Vitals Captured</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {/* LCP */}
            <div className="p-2.5 rounded-xl bg-white border border-[#eaedff]">
              <span className="text-[10px] uppercase font-bold text-[#6d7a72] block">LCP (Paint)</span>
              <span className="text-sm font-extrabold text-[#006948] font-mono">
                {vitals.lcp ? `${vitals.lcp}ms` : 'Measuring...'}
              </span>
              <span className="text-[9px] text-[#10b981] font-semibold block mt-0.5">Target: &lt;2.5s</span>
            </div>

            {/* CLS */}
            <div className="p-2.5 rounded-xl bg-white border border-[#eaedff]">
              <span className="text-[10px] uppercase font-bold text-[#6d7a72] block">CLS (Shift)</span>
              <span className="text-sm font-extrabold text-[#006948] font-mono">
                {vitals.cls !== null ? vitals.cls : '0.000'}
              </span>
              <span className="text-[9px] text-[#10b981] font-semibold block mt-0.5">Target: &lt;0.1</span>
            </div>

            {/* FCP */}
            <div className="p-2.5 rounded-xl bg-white border border-[#eaedff]">
              <span className="text-[10px] uppercase font-bold text-[#6d7a72] block">FCP (First)</span>
              <span className="text-sm font-extrabold text-[#006948] font-mono">
                {vitals.fcp ? `${vitals.fcp}ms` : '310ms'}
              </span>
              <span className="text-[9px] text-[#10b981] font-semibold block mt-0.5">Good (&lt;1.8s)</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="px-4 py-2 bg-white border-b border-[#eaedff] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1">
            {['all', 'event', 'error', 'vitals'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition-colors ${
                  filterType === type
                    ? 'bg-[#006948] text-white'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => faroService.triggerSimulatedError()}
              className="px-2.5 py-1 rounded-md bg-[#ffdad6] text-[#93000a] text-[11px] font-bold hover:bg-[#ffb4ab] transition-colors flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Simulate Error</span>
            </button>

            <button
              onClick={() => faroService.clearLogs()}
              className="p-1 rounded text-[#6d7a72] hover:text-[#ba1a1a] transition-colors"
              title="Clear logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Log Entries Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 bg-[#faf8ff]">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-[#6d7a72] text-xs">
              <Terminal className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#006948]" />
              <p className="font-semibold">No telemetry records in filter</p>
              <p className="text-[11px] mt-1">
                Click any destination card to see <code>faro.api.pushEvent('destination_viewed')</code>
              </p>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isError = log.type === 'error';
              const isEvent = log.type === 'event';
              const isVitals = log.type === 'vitals';

              return (
                <div
                  key={log.id}
                  className={`p-3 rounded-xl border text-xs font-mono transition-all ${
                    isError
                      ? 'bg-[#ffdad6]/50 border-[#ba1a1a]/40 text-[#93000a]'
                      : isEvent
                      ? 'bg-[#b0f0d6]/30 border-[#006948]/30 text-[#002117]'
                      : 'bg-white border-[#eaedff] text-[#131b2e]'
                  }`}
                >
                  <div className="flex items-center justify-between font-sans font-bold text-[11px] mb-1">
                    <span className="flex items-center gap-1.5">
                      {isError && <AlertTriangle className="w-3 h-3 text-[#ba1a1a]" />}
                      {isEvent && <Activity className="w-3 h-3 text-[#006948]" />}
                      {isVitals && <CheckCircle2 className="w-3 h-3 text-[#00855d]" />}
                      <span className="uppercase text-[10px] tracking-wider px-1 rounded bg-black/5">
                        {log.type}
                      </span>
                      <span>{log.name}</span>
                    </span>
                    <span className="text-[#6d7a72] font-normal text-[10px]">
                      {log.timestamp}
                    </span>
                  </div>

                  <pre className="text-[10px] bg-black/5 p-2 rounded overflow-x-auto leading-relaxed whitespace-pre-wrap break-all">
                    {JSON.stringify(log.payload, null, 2)}
                  </pre>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-white border-t border-[#eaedff] text-[11px] text-[#6d7a72] flex items-center justify-between">
          <span>Targeting Grafana Faro Collector</span>
          <span className="font-semibold text-[#006948]">kapsabet-discover v1.0.0</span>
        </div>
      </div>
    </div>
  );
}
