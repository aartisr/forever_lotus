export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const key = process.env.INDEXNOW_KEY?.trim();

  if (!key) {
    return new Response('IndexNow key is not configured\n', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  return new Response(`${key}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}
