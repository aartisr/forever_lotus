import { NextResponse } from 'next/server';

interface ErrorPayload {
  error: string;
}

export function ok<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function badRequest(message: string) {
  return NextResponse.json<ErrorPayload>({ error: message }, { status: 400 });
}

export function unauthorized(message = 'Unauthorized') {
  return NextResponse.json<ErrorPayload>({ error: message }, { status: 401 });
}

export function notFound(message: string) {
  return NextResponse.json<ErrorPayload>({ error: message }, { status: 404 });
}

export function serverError(message: string) {
  return NextResponse.json<ErrorPayload>({ error: message }, { status: 500 });
}
