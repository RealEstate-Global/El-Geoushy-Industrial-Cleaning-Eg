/**
 * Local error reporting.
 *
 * Errors are logged where the app runs (browser console / server console) and,
 * when `VITE_ERROR_REPORT_ENDPOINT` is set, are also POSTed to that endpoint
 * (for example the ASP.NET backend in `backend/`). Nothing is sent to a hosted
 * platform and no third-party SDK is loaded.
 */

type ErrorContext = Record<string, unknown>;

const MAX_SERIALIZED_LENGTH = 2000;

function describeThrown(error: unknown): string {
  if (error instanceof Response) {
    return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  const { message } = (error ?? {}) as { message?: unknown };
  if (typeof message === "string" && message.length > 0) return message;
  try {
    return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
  } catch {
    return String(error);
  }
}

function errorReportEndpoint(): string | undefined {
  const endpoint = import.meta.env["VITE_ERROR_REPORT_ENDPOINT"];
  return typeof endpoint === "string" && endpoint.length > 0 ? endpoint : undefined;
}

function sendToLocalEndpoint(payload: Record<string, unknown>) {
  const endpoint = errorReportEndpoint();
  if (!endpoint || typeof fetch !== "function") return;

  void fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Reporting must never break the app; if the backend is down, the console
    // log above is still the source of truth.
  });
}

export function reportError(error: unknown, context: ErrorContext = {}) {
  const payload: Record<string, unknown> = {
    message: describeThrown(error),
    route: typeof window === "undefined" ? undefined : window.location.pathname,
    ...context,
    timestamp: new Date().toISOString(),
  };

  if (error instanceof Error && error.stack) {
    payload["stack"] = error.stack;
  }

  if (import.meta.env.DEV) {
    console.error("[error-report]", payload, error);
  } else {
    console.error("[error-report]", payload["message"]);
  }

  sendToLocalEndpoint(payload);
}

type ErrorMechanism = "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";

export function reportRuntimeError(error: unknown, mechanism: ErrorMechanism = "manual") {
  reportError(error, { mechanism, handled: mechanism !== "react_error_boundary" });
}
