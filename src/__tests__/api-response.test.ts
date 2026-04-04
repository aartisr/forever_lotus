import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next/server before importing the module under test so that
// NextResponse.json is patched in the Node (non-edge) test environment.
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data: unknown, init?: { status?: number }) => ({
      _body: data,
      _status: init?.status ?? 200,
    })),
  },
}));

import { ok, badRequest, unauthorized, notFound, serverError } from '@/lib/api-response';

type MockResponse = { _body: unknown; _status: number };

function resp(r: unknown): MockResponse {
  return r as MockResponse;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ok', () => {
  it('returns status 200 by default', () => {
    const r = resp(ok({ hello: 'world' }));
    expect(r._status).toBe(200);
    expect(r._body).toEqual({ hello: 'world' });
  });

  it('accepts a custom status code', () => {
    const r = resp(ok({ id: '1' }, 202));
    expect(r._status).toBe(202);
  });
});

describe('badRequest', () => {
  it('returns status 400 with error message', () => {
    const r = resp(badRequest('field is required'));
    expect(r._status).toBe(400);
    expect((r._body as { error: string }).error).toBe('field is required');
  });
});

describe('unauthorized', () => {
  it('returns status 401 with default message', () => {
    const r = resp(unauthorized());
    expect(r._status).toBe(401);
    expect((r._body as { error: string }).error).toBe('Unauthorized');
  });

  it('accepts a custom message', () => {
    const r = resp(unauthorized('Token expired'));
    expect((r._body as { error: string }).error).toBe('Token expired');
  });
});

describe('notFound', () => {
  it('returns status 404 with error message', () => {
    const r = resp(notFound('Record not found'));
    expect(r._status).toBe(404);
    expect((r._body as { error: string }).error).toBe('Record not found');
  });
});

describe('serverError', () => {
  it('returns status 500 with error message', () => {
    const r = resp(serverError('Something went wrong'));
    expect(r._status).toBe(500);
    expect((r._body as { error: string }).error).toBe('Something went wrong');
  });
});
