import { NextRequest } from 'next/server';

/**
 * Read a query-string integer parameter with a fallback default.
 * Returns NaN-safe fallback when the param is absent or non-numeric.
 */
export function queryInt(request: NextRequest, name: string, defaultValue: number): number {
  const raw = request.nextUrl.searchParams.get(name);
  if (raw === null) return defaultValue;
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : defaultValue;
}

/**
 * Read a query-string string parameter, trimmed, or return null.
 */
export function queryString(request: NextRequest, name: string): string | null {
  const raw = request.nextUrl.searchParams.get(name);
  if (raw === null) return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Validate that required string fields are present and non-empty in a parsed body object.
 * Returns the first missing field name, or null if all present.
 */
export function requireFields(
  body: Record<string, unknown>,
  fields: string[]
): string | null {
  for (const field of fields) {
    const value = body[field];
    if (value === undefined || value === null || String(value).trim() === '') {
      return field;
    }
  }
  return null;
}

/**
 * Safely parse a JSON body from a NextRequest.
 * Returns `{ data }` on success or `{ error }` on failure.
 */
export async function parseJsonBody<T = Record<string, unknown>>(
  request: NextRequest
): Promise<{ data: T; error: null } | { data: null; error: string }> {
  try {
    const data = (await request.json()) as T;
    return { data, error: null };
  } catch {
    return { data: null, error: 'Request body must be valid JSON' };
  }
}
