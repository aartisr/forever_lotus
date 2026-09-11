import { createDataRepository } from '@/services/data-layer/factory';
import { EntityRecord } from '@/services/data-layer/types';

// ── Entity types ──────────────────────────────────────────────────────────────

interface ApprovedSiteRecord extends EntityRecord {
  /** Normalized domain; mirrors the `id` field. */
  site: string;
}

export type AuditAction = 'site_added' | 'site_removed' | 'token_issued';

export interface AwariconAuditRecord extends EntityRecord {
  action: AuditAction;
  site: string;
  tier?: string;
  exp?: number;
}

// ── Repositories ──────────────────────────────────────────────────────────────

const siteRepo = createDataRepository<ApprovedSiteRecord>('awaricon_approved_sites');
const auditRepo = createDataRepository<AwariconAuditRecord>('awaricon_audit_log');

// ── Site normalisation (inlined to prevent circular deps) ─────────────────────

function normalizeSite(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  try {
    const parsed = raw.includes('://') ? new URL(raw) : new URL(`https://${raw}`);
    return parsed.hostname.toLowerCase();
  } catch {
    return null;
  }
}

function loadEnvApprovedSites(): string[] {
  const raw = process.env.AWARICON_APPROVED_SITES ?? '';
  return raw
    .split(',')
    .map((item) => normalizeSite(item))
    .filter((item): item is string => Boolean(item));
}

// ── In-memory cache (fast read path for badge verification) ───────────────────

let cachedSites: Set<string> | null = null;
let cacheInitializing: Promise<Set<string>> | null = null;

async function getInitializedCache(): Promise<Set<string>> {
  if (cachedSites) return cachedSites;
  if (cacheInitializing) return cacheInitializing;

  cacheInitializing = (async () => {
    const set = new Set<string>(loadEnvApprovedSites());
    try {
      const records = await siteRepo.list(1000);
      for (const record of records) {
        set.add(record.site);
      }
    } catch {
      // Data layer unavailable — env baseline still works
    }
    cachedSites = set;
    return set;
  })();

  return cacheInitializing;
}

// ── Audit log helper ──────────────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function appendAuditEntry(
  action: AuditAction,
  site: string,
  extras?: { tier?: string; exp?: number }
): Promise<void> {
  const now = new Date().toISOString();
  const record: AwariconAuditRecord = {
    id: generateId(),
    action,
    site,
    ...(extras ?? {}),
    createdAt: now,
    updatedAt: now,
  };
  try {
    await auditRepo.save(record);
  } catch {
    // Fire-and-forget; never block the main operation
  }
}

// ── Public API (all async) ────────────────────────────────────────────────────

export async function listApprovedSites(): Promise<string[]> {
  const set = await getInitializedCache();
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export async function addApprovedSite(site: string): Promise<boolean> {
  const normalized = normalizeSite(site);
  if (!normalized) return false;

  const set = await getInitializedCache();
  set.add(normalized);

  const now = new Date().toISOString();
  try {
    await siteRepo.save({ id: normalized, site: normalized, createdAt: now, updatedAt: now });
  } catch {
    // In-memory is source of truth for this session if persist fails
  }

  await appendAuditEntry('site_added', normalized);
  return true;
}

export async function removeApprovedSite(site: string): Promise<boolean> {
  const normalized = normalizeSite(site);
  if (!normalized) return false;

  // Env-baseline domains cannot be removed via the admin console
  if (loadEnvApprovedSites().includes(normalized)) return false;

  const set = await getInitializedCache();
  if (!set.has(normalized)) return false;

  set.delete(normalized);

  try {
    await siteRepo.remove(normalized);
  } catch {
    // Best-effort; in-memory state is already updated
  }

  await appendAuditEntry('site_removed', normalized);
  return true;
}

export async function isApprovedSite(site: string): Promise<boolean> {
  const set = await getInitializedCache();
  return set.has(site);
}

export async function listAuditLog(limit: number = 50): Promise<AwariconAuditRecord[]> {
  try {
    return await auditRepo.list(limit);
  } catch {
    return [];
  }
}
