import { NextRequest } from 'next/server';

export function isAwariconAdminConfigured(): boolean {
  return Boolean(process.env.AWARICON_ADMIN_KEY);
}

export function isAwariconAdminAuthorized(request: NextRequest): boolean {
  const configuredKey = process.env.AWARICON_ADMIN_KEY;
  if (!configuredKey) {
    return false;
  }

  const providedKey = request.headers.get('x-awaricon-admin-key') ?? '';
  return providedKey === configuredKey;
}
