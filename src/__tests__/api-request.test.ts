import { describe, it, expect } from 'vitest';
import type { NextRequest } from 'next/server';
import { queryInt, queryString, requireFields } from '@/lib/api-request';

// Minimal fake that satisfies the searchParams access pattern used in api-request
function makeRequest(search: string): NextRequest {
  const url = `http://localhost${search ? '?' + search : ''}`;
  return {
    nextUrl: { searchParams: new URL(url).searchParams },
  } as unknown as NextRequest;
}

// ─── queryInt ────────────────────────────────────────────────────────────────

describe('queryInt', () => {
  it('returns the parsed integer when valid', () => {
    expect(queryInt(makeRequest('limit=20'), 'limit', 10)).toBe(20);
  });

  it('returns the default when param is absent', () => {
    expect(queryInt(makeRequest(''), 'limit', 10)).toBe(10);
  });

  it('returns the default when param is non-numeric', () => {
    expect(queryInt(makeRequest('limit=abc'), 'limit', 10)).toBe(10);
  });

  it('returns the default when param is empty string', () => {
    expect(queryInt(makeRequest('limit='), 'limit', 10)).toBe(10);
  });

  it('handles negative integers', () => {
    expect(queryInt(makeRequest('offset=-5'), 'offset', 0)).toBe(-5);
  });
});

// ─── queryString ─────────────────────────────────────────────────────────────

describe('queryString', () => {
  it('returns the trimmed string when present', () => {
    expect(queryString(makeRequest('url=https://example.com'), 'url')).toBe('https://example.com');
  });

  it('returns null when param is absent', () => {
    expect(queryString(makeRequest(''), 'url')).toBeNull();
  });

  it('returns null when param is only whitespace', () => {
    expect(queryString(makeRequest('url=   '), 'url')).toBeNull();
  });

  it('trims leading/trailing whitespace', () => {
    expect(queryString(makeRequest('url=+hello+'), 'url')).toBe('hello');
  });
});

// ─── requireFields ───────────────────────────────────────────────────────────

describe('requireFields', () => {
  it('returns null when all required fields are present', () => {
    expect(requireFields({ a: 'x', b: 'y', c: 'z' }, ['a', 'b', 'c'])).toBeNull();
  });

  it('returns the first missing field name', () => {
    expect(requireFields({ a: 'x' }, ['a', 'b', 'c'])).toBe('b');
  });

  it('treats empty string as missing', () => {
    expect(requireFields({ a: '  ' }, ['a'])).toBe('a');
  });

  it('treats null as missing', () => {
    expect(requireFields({ a: null }, ['a'])).toBe('a');
  });

  it('treats undefined as missing', () => {
    expect(requireFields({}, ['a'])).toBe('a');
  });

  it('returns null for empty required-fields array', () => {
    expect(requireFields({}, [])).toBeNull();
  });
});
