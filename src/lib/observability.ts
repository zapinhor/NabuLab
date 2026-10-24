import "server-only";

import { randomUUID } from "node:crypto";

type LogLevel = "info" | "warn" | "error";
type SafeValue = string | number | boolean | null;

const SENSITIVE_KEY = /(authorization|cookie|token|secret|password|email|phone|document|payload|answer|key)/i;
const SAFE_REQUEST_ID = /^[A-Za-z0-9._:-]{1,128}$/;

export function getRequestId(request: Request) {
  const candidate = request.headers.get("x-vercel-id") ?? request.headers.get("x-request-id");
  return candidate && SAFE_REQUEST_ID.test(candidate) ? candidate : randomUUID();
}

function safeMetadata(input: Record<string, unknown> | undefined) {
  if (!input) return undefined;
  return Object.fromEntries(Object.entries(input).flatMap(([key, value]) => {
    if (SENSITIVE_KEY.test(key)) return [[key, "[redacted]"]];
    if (value === null || ["string", "number", "boolean"].includes(typeof value)) {
      const safe = typeof value === "string" ? value.slice(0, 240) : value as SafeValue;
      return [[key, safe]];
    }
    return [];
  }));
}

export function logServerEvent(input: {
  level: LogLevel;
  subsystem: string;
  event: string;
  outcome: "success" | "failure" | "ignored";
  requestId?: string;
  httpStatus?: number;
  metadata?: Record<string, unknown>;
}) {
  const entry = {
    timestamp: new Date().toISOString(),
    severity: input.level,
    subsystem: input.subsystem.slice(0, 80),
    event: input.event.slice(0, 120),
    requestId: input.requestId,
    httpStatus: input.httpStatus,
    outcome: input.outcome,
    metadata: safeMetadata(input.metadata),
  };
  if (input.level === "error") console.error(JSON.stringify(entry));
  else if (input.level === "warn") console.warn(JSON.stringify(entry));
  else console.info(JSON.stringify(entry));
}

export async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}, timeoutMs = 10_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new DOMException("Request timed out", "TimeoutError")), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}
