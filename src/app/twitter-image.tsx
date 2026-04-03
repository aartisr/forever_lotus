import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background:
            'radial-gradient(circle at left, rgba(20,184,166,0.24), rgba(15,12,31,1) 45%), linear-gradient(135deg, #0f0c1f 0%, #161130 100%)',
          color: '#f5efe2',
          padding: '72px',
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#14b8a6',
            marginBottom: 20,
          }}
        >
          Forever Lotus
        </div>
        <div
          style={{
            fontSize: 60,
            lineHeight: 1.08,
            fontWeight: 800,
            maxWidth: 860,
            marginBottom: 22,
          }}
        >
          Rooted in wisdom. Rising in compassion.
        </div>
        <div
          style={{
            fontSize: 30,
            color: '#d9d1bf',
            maxWidth: 900,
            lineHeight: 1.28,
          }}
        >
          A multilingual framework for conscious creation and global dignity.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
