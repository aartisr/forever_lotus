import { NextRequest, NextResponse } from 'next/server';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'ravikumar.raman@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'contact@foreverlotus.com';
const EXPECTED_CONTACT_HOST = process.env.EXPECTED_CONTACT_HOST ?? 'foreverlotus.com';
const CONTACT_WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL;

const rateMap = new Map<string, { count: number; resetAt: number }>();
const idempotencyMap = new Map<string, number>();

type ContactIntent = 'intro' | 'diligence';

type ContactPayload = {
  kind?: unknown;
  fullName?: unknown;
  workEmail?: unknown;
  organization?: unknown;
  stageFocus?: unknown;
  timeline?: unknown;
  notes?: unknown;
  consent?: unknown;
  website?: unknown;
  requestId?: unknown;
};

function isLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  if (entry.count >= 4) {
    return true;
  }

  entry.count += 1;
  return false;
}

function isDuplicateRequest(requestId: string): boolean {
  const now = Date.now();
  for (const [key, expiresAt] of idempotencyMap.entries()) {
    if (now > expiresAt) idempotencyMap.delete(key);
  }

  if (idempotencyMap.has(requestId)) {
    return true;
  }

  idempotencyMap.set(requestId, now + 10 * 60_000);
  return false;
}

function sanitise(value: unknown, max = 240): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>"'`]/g, '').trim().slice(0, max);
}

function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildCtaCopy(kind: ContactIntent) {
  if (kind === 'diligence') {
    return {
      subject: '[Forever Lotus] Diligence Pack Requested',
      title: 'Diligence request CTA clicked',
      message: 'A visitor requested the investor diligence package from the contact page.',
    };
  }

  return {
    subject: '[Forever Lotus] Investment Team Contact Requested',
    title: 'Investment contact CTA clicked',
    message: 'A visitor requested contact with the investment team from the contact page.',
  };
}

function emailHtml(
  copy: { title: string; message: string },
  lead: {
    fullName: string;
    workEmail: string;
    organization: string;
    stageFocus: string;
    timeline: string;
    notes: string;
  },
  metadata: Record<string, string>,
) {
  const metaRows = Object.entries(metadata)
    .map(([key, value]) => `<li style="margin:0 0 6px;"><strong>${key}:</strong> ${value}</li>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#05060c;font-family:Segoe UI,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="width:100%;max-width:620px;border:1px solid rgba(201,168,76,0.35);border-radius:14px;background:#0b0d14;overflow:hidden;">
            <tr><td style="height:4px;background:linear-gradient(90deg,#c9a84c,#0eb6a8);"></td></tr>
            <tr>
              <td style="padding:24px 24px 8px;">
                <p style="margin:0 0 8px;color:#c9a84c;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">Contact CTA Submission</p>
                <h1 style="margin:0;color:#f3e9c2;font-size:24px;line-height:1.2;">${copy.title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 18px;">
                <p style="margin:0;color:#d6dfeb;font-size:15px;line-height:1.6;">${copy.message}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 18px;">
                <ul style="margin:0;padding-left:18px;color:#c4d0df;font-size:13px;line-height:1.6;">
                  <li style="margin:0 0 6px;"><strong>Name:</strong> ${lead.fullName}</li>
                  <li style="margin:0 0 6px;"><strong>Email:</strong> ${lead.workEmail}</li>
                  <li style="margin:0 0 6px;"><strong>Organization:</strong> ${lead.organization || 'Not provided'}</li>
                  <li style="margin:0 0 6px;"><strong>Stage:</strong> ${lead.stageFocus || 'Not specified'}</li>
                  <li style="margin:0 0 6px;"><strong>Timeline:</strong> ${lead.timeline || 'Not specified'}</li>
                  <li style="margin:0 0 6px;"><strong>Notes:</strong> ${lead.notes || 'None'}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px;">
                <ul style="margin:0;padding-left:18px;color:#9fb0c7;font-size:13px;line-height:1.5;">
                  ${metaRows}
                </ul>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute and retry.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const payload = body as ContactPayload;

  if (payload.website) {
    return NextResponse.json({ success: true });
  }

  const requestId = sanitise(payload.requestId, 120);
  if (!requestId) {
    return NextResponse.json({ error: 'Missing request id.' }, { status: 400 });
  }
  if (isDuplicateRequest(requestId)) {
    return NextResponse.json({ success: true, requestId });
  }

  const kind: ContactIntent = payload.kind === 'diligence' ? 'diligence' : 'intro';
  const fullName = sanitise(payload.fullName, 120);
  const workEmail = sanitise(payload.workEmail, 200).toLowerCase();
  const organization = sanitise(payload.organization, 160);
  const stageFocus = sanitise(payload.stageFocus, 100);
  const timeline = sanitise(payload.timeline, 100);
  const notes = sanitise(payload.notes, 600);
  const consent = payload.consent === true;

  if (!fullName || !workEmail) {
    return NextResponse.json(
      { error: 'Full name and work email are required.' },
      { status: 400 },
    );
  }

  if (!validEmail(workEmail)) {
    return NextResponse.json({ error: 'Please enter a valid work email.' }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json(
      { error: 'Consent is required before submitting.' },
      { status: 422 },
    );
  }

  const copy = buildCtaCopy(kind);

  const metadata = {
    path: '/contact',
    cta: kind,
    requestId,
    timestamp: new Date().toISOString(),
    referer: req.headers.get('referer') ?? 'direct',
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Contact channel is temporarily unavailable. Please try again shortly.' },
      { status: 503 },
    );
  }

  try {
    const fromHost = FROM_EMAIL.split('@')[1] ?? '';
    if (!fromHost || !fromHost.includes(EXPECTED_CONTACT_HOST)) {
      return NextResponse.json(
        { error: 'Contact sender is misconfigured. Please notify support.' },
        { status: 500 },
      );
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Forever Lotus <${FROM_EMAIL}>`,
        to: [CONTACT_EMAIL],
        reply_to: workEmail,
        subject: copy.subject,
        html: emailHtml(
          copy,
          {
            fullName,
            workEmail,
            organization,
            stageFocus,
            timeline,
            notes,
          },
          metadata,
        ),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Resend API error]', response.status, errText);
      return NextResponse.json(
        { error: 'Could not submit right now. Please try again shortly.' },
        { status: 502 },
      );
    }

    if (CONTACT_WEBHOOK_URL) {
      fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          kind,
          fullName,
          workEmail,
          organization,
          stageFocus,
          timeline,
          notes,
          submittedAt: metadata.timestamp,
          source: 'forever_lotus_contact',
        }),
      }).catch((err) => {
        console.error('[Contact webhook error]', err);
      });
    }

    return NextResponse.json({ success: true, requestId });
  } catch (err) {
    console.error('[Contact CTA route error]', err);
    return NextResponse.json({ error: 'Network error. Please try again.' }, { status: 500 });
  }
}
