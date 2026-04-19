import { ImageResponse } from 'next/og';
import { getInsightBySlug } from '@/content/insights';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

type ImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function InsightOpenGraphImage({ params }: ImageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  const title = article?.title ?? 'Forever Lotus Insight';
  const keyword = article?.keyword ?? 'conscious creation';
  const description =
    article?.description ?? 'Thoughtful frameworks for dignity, compassion, and Eastern wisdom.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(circle at top left, rgba(201,168,76,0.28), rgba(15,12,31,1) 42%), linear-gradient(140deg, #0f0c1f 0%, #161130 44%, #101b22 100%)',
          color: '#f5efe2',
          padding: '56px 64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#c9a84c',
          }}
        >
          <span>Forever Lotus</span>
          <span style={{ color: '#d7cfbb', letterSpacing: 3 }}>{keyword}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.08,
              fontWeight: 800,
              maxWidth: 1020,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 980,
              color: '#dfd6c3',
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#d7cfbb',
          }}
        >
          <span>Insights for search, social, and AI discovery</span>
          <span style={{ color: '#14b8a6' }}>foreverlotus.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
