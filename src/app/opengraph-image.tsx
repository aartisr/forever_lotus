import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background:
            'radial-gradient(circle at top, rgba(201,168,76,0.25), rgba(15,12,31,1) 45%), linear-gradient(135deg, #0f0c1f 0%, #161130 100%)',
          color: '#f5efe2',
          padding: '64px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: '#c9a84c',
            marginBottom: 24,
          }}
        >
          Forever Lotus
        </div>
        <div
          style={{
            fontSize: 74,
            lineHeight: 1.05,
            fontWeight: 800,
            maxWidth: 1000,
            marginBottom: 24,
          }}
        >
          Conscious Creation for a Compassionate Future
        </div>
        <div
          style={{
            fontSize: 34,
            color: '#d9d1bf',
            maxWidth: 960,
            lineHeight: 1.3,
          }}
        >
          Eastern wisdom, humanitarian dignity, and evidence-based peacebuilding.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
