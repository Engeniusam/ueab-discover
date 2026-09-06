import { TelemetryLog, WebVitalsState } from '../types';

declare global {
  interface Window {
    GrafanaFaroWebSdk?: {
      initializeFaro: (config: {
        url: string;
        app: { name: string; version: string; environment?: string };
        instrumentations?: any[];
      }) => any;
    };
    faro?: any;
    __faroTelemetryLogs?: TelemetryLog[];
  }
}

type TelemetryListener = (logs: TelemetryLog[], vitals: WebVitalsState) => void;

class FaroTelemetryService {
  private faroInstance: any = null;
  private isInitialized = false;
  private logs: TelemetryLog[] = [];
  private listeners: Set<TelemetryListener> = new Set();
  private vitals: WebVitalsState = {
    lcp: null,
    cls: null,
    fid: null,
    fcp: null,
    ttfb: null,
  };

  constructor() {
    // Attempt initialization when script loads
    if (typeof window !== 'undefined') {
      this.init();
      this.setupVitalsObservers();
    }
  }

  public init() {
    if (this.isInitialized) return;

    try {
      if (typeof window !== 'undefined' && window.GrafanaFaroWebSdk) {
        // Required initialization from specification
        this.faroInstance =
          window.GrafanaFaroWebSdk.initializeFaro({
            url: 'https://faro-collector.example.com/collect', // Placeholder Faro endpoint
            app: { name: 'kapsabet-discover', version: '1.0.0' },
          }) || (window as any).faro;

        // Note: Grafana Faro automatically assigns window.faro as a read-only property.
        // We only assign if window.faro is not already set.
        try {
          if (!('faro' in window)) {
            (window as any).faro = this.faroInstance;
          }
        } catch {
          // window.faro is managed by Grafana Faro SDK
        }

        this.isInitialized = true;

        this.addLog('log', 'faro_initialized', {
          sdk: '@grafana/faro-web-sdk',
          version: '1.0.0',
          app: 'kapsabet-discover',
          collectorUrl: 'https://faro-collector.example.com/collect',
          automaticTracking: ['js_errors', 'unhandled_rejections', 'web_vitals', 'page_views'],
          status: 'Active & Listening',
        });
      } else {
        // In case CDN is loading asynchronously, retry shortly
        setTimeout(() => {
          if (!this.isInitialized && window.GrafanaFaroWebSdk) {
            this.init();
          } else if (!this.isInitialized) {
            // Provide fallback stub to ensure zero crash
            this.createFallbackFaro();
          }
        }, 500);
      }
    } catch (err: any) {
      console.warn('Faro initialization notice:', err);
      this.createFallbackFaro();
    }
  }

  private createFallbackFaro() {
    if (this.faroInstance) return;
    this.faroInstance = {
      api: {
        pushEvent: (name: string, attributes?: Record<string, any>) => {
          console.info('[Faro Telemetry Event]', name, attributes);
        },
        pushError: (error: Error, options?: any) => {
          console.error('[Faro Telemetry Error]', error, options);
        },
        pushLog: (message: string, options?: any) => {
          console.log('[Faro Telemetry Log]', message, options);
        },
        pushMeasurement: (payload: any) => {
          console.log('[Faro Telemetry Measurement]', payload);
        },
      },
    };
    try {
      if (typeof window !== 'undefined' && !('faro' in window)) {
        (window as any).faro = this.faroInstance;
      }
    } catch {
      // ignore
    }
    this.isInitialized = true;
  }

  public getFaro() {
    if (!this.faroInstance) {
      if (typeof window !== 'undefined' && (window as any).faro) {
        this.faroInstance = (window as any).faro;
      } else {
        this.init();
      }
    }
    return this.faroInstance || (typeof window !== 'undefined' ? (window as any).faro : null);
  }

  /**
   * Custom Action: Add faro.api.pushEvent('destination_viewed', { name: destination })
   * whenever a user clicks a destination card.
   */
  public pushDestinationViewed(destinationName: string) {
    const faro = this.getFaro();
    const payload = { name: destinationName };

    try {
      if (faro?.api?.pushEvent) {
        faro.api.pushEvent('destination_viewed', payload);
      }
    } catch (e) {
      console.warn('Faro pushEvent exception:', e);
    }

    this.addLog('event', 'destination_viewed', {
      destination: destinationName,
      source: 'card_click',
      faroApi: "faro.api.pushEvent('destination_viewed', { name: '" + destinationName + "' })",
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Custom Action: Add an intentional error-trigger button in the footer
   * that calls faro.api.pushError(new Error('Simulated Frontend Error')) for live testing during the demo.
   */
  public triggerSimulatedError(): Error {
    const faro = this.getFaro();
    const simulatedError = new Error('Simulated Frontend Error');

    try {
      if (faro?.api?.pushError) {
        faro.api.pushError(simulatedError);
      }
    } catch (e) {
      console.warn('Faro pushError exception:', e);
    }

    this.addLog('error', 'Simulated Frontend Error', {
      message: simulatedError.message,
      stack: simulatedError.stack || 'Error: Simulated Frontend Error at footer live demo trigger',
      faroApi: "faro.api.pushError(new Error('Simulated Frontend Error'))",
      triggeredBy: 'demo_footer_button',
      handled: true,
      timestamp: new Date().toISOString(),
    });

    return simulatedError;
  }

  /**
   * Track custom telemetry event
   */
  public pushEvent(name: string, attributes?: Record<string, any>) {
    const faro = this.getFaro();
    try {
      if (faro?.api?.pushEvent) {
        faro.api.pushEvent(name, attributes);
      }
    } catch (e) {
      console.warn('Faro pushEvent exception:', e);
    }

    this.addLog('event', name, attributes || {});
  }

  private addLog(type: TelemetryLog['type'], name: string, payload: Record<string, any>) {
    const newLog: TelemetryLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      type,
      name,
      payload,
    };

    this.logs = [newLog, ...this.logs.slice(0, 49)];
    this.notifyListeners();
  }

  public subscribe(listener: TelemetryListener): () => void {
    this.listeners.add(listener);
    listener(this.logs, this.vitals);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l(this.logs, this.vitals));
  }

  public getLogs(): TelemetryLog[] {
    return this.logs;
  }

  public getVitals(): WebVitalsState {
    return this.vitals;
  }

  public clearLogs() {
    this.logs = [];
    this.notifyListeners();
  }

  /**
   * Observe Core Web Vitals (LCP, CLS, FCP) in real-time
   * to verify automatic tracking alongside Grafana Faro.
   */
  private setupVitalsObservers() {
    if (typeof PerformanceObserver === 'undefined') return;

    try {
      // 1. Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcpValue = Math.round(lastEntry.startTime);
          this.vitals.lcp = lcpValue;
          this.addLog('vitals', 'Core Web Vital: LCP', {
            metric: 'Largest Contentful Paint (LCP)',
            value: `${lcpValue} ms`,
            rating: lcpValue <= 2500 ? 'Good' : lcpValue <= 4000 ? 'Needs Improvement' : 'Poor',
            faroCaptured: true,
          });
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
      // ignore
    }

    try {
      // 2. Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.vitals.cls = Number(clsValue.toFixed(4));
        this.addLog('vitals', 'Core Web Vital: CLS', {
          metric: 'Cumulative Layout Shift (CLS)',
          value: this.vitals.cls,
          rating: this.vitals.cls <= 0.1 ? 'Good' : this.vitals.cls <= 0.25 ? 'Needs Improvement' : 'Poor',
          faroCaptured: true,
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch {
      // ignore
    }

    try {
      // 3. First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntriesByName('first-contentful-paint');
        if (entries.length > 0) {
          const fcpValue = Math.round(entries[0].startTime);
          this.vitals.fcp = fcpValue;
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch {
      // ignore
    }
  }
}

export const faroService = new FaroTelemetryService();
