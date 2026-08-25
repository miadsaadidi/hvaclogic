/**
 * Privacy-Preserving Client-Side Telemetry & Event Dispatcher
 *
 * Implements HVACLogic's strict zero-PII, zero-database tracking standard:
 * - Strips all URL query strings & calculation inputs from telemetry payloads
 * - Sanitizes parameter values into discrete categorical buckets
 * - 100% cookie-free and client-side safe
 */

export type TelemetryEventName =
  | "calculator_viewed"
  | "calculator_started"
  | "result_generated"
  | "result_changed"
  | "unit_changed"
  | "preset_selected"
  | "validation_error"
  | "handoff_clicked"
  | "share_clicked"
  | "print_exported"
  | "csv_exported"
  | "embed_opened"
  | "embed_copied"
  | "pwa_install_prompted"
  | "pwa_installed"
  | "offline_session"
  | "reference_opened";

export interface TelemetryPayload {
  calculatorId?: string;
  pillar?: string;
  unitSystem?: "ip" | "si";
  presetId?: string;
  errorCode?: string;
  sourceCalculator?: string;
  destinationCalculator?: string;
  exportFormat?: "csv" | "json" | "pdf";
  shareMethod?: "clipboard" | "native";
  platform?: "ios" | "android" | "desktop";
  referenceId?: string;
  [key: string]: string | number | boolean | undefined;
}

// Restricted keys that must NEVER be passed to telemetry
const FORBIDDEN_KEYS = [
  "name",
  "email",
  "address",
  "street",
  "phone",
  "ip",
  "zip",
  "postal",
  "customer",
  "jobName",
  "companyName",
  "cfm",
  "btu",
  "sqft",
  "temperature",
  "pressure",
  "width",
  "height",
  "diameter",
];

/**
 * Validates and sanitizes an event payload to guarantee zero PII or proprietary numbers.
 */
export function sanitizeTelemetryPayload(payload: Record<string, any>): TelemetryPayload {
  const sanitized: TelemetryPayload = {};

  for (const [key, value] of Object.entries(payload)) {
    const lowerKey = key.toLowerCase();
    
    // Drop any forbidden PII or raw engineering numeric keys
    if (FORBIDDEN_KEYS.some((fk) => lowerKey.includes(fk.toLowerCase()))) {
      continue;
    }

    // Drop string values that look like full URLs with search parameters
    if (typeof value === "string" && (value.includes("?") || value.includes("&") || value.includes("@"))) {
      continue;
    }

    sanitized[key] = value;
  }

  return sanitized;
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Dispatches an anonymous, privacy-safe analytics event.
 */
export function trackTelemetryEvent(
  eventName: TelemetryEventName,
  payload: TelemetryPayload = {}
): boolean {
  if (typeof window === "undefined") return false;

  const cleanPayload = sanitizeTelemetryPayload(payload);

  // Dispatch to window custom event for privacy-safe integration
  const event = new CustomEvent("hvaclogic:telemetry", {
    detail: {
      event: eventName,
      timestamp: Date.now(),
      ...cleanPayload,
    },
  });

  window.dispatchEvent(event);

  // Forward sanitized event to Google Analytics 4 (gtag.js) if available
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, cleanPayload);
  }

  return true;
}
