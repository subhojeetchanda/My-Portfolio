import { ImageResponse } from 'next/og';
import { profile } from '@/content/profile';

// Route segment config
export const alt = `${profile.name} - ${profile.about.headline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#090a0f', // ink
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif', // Default to generic sans
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '16px',
            height: '100%',
            background: 'linear-gradient(to bottom, #ff5a1f, #ff2a00)', // molten to ember
          }}
        />
        
        <div
          style={{
            color: '#8b949e', // steel-light
            fontSize: 24,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 20,
            fontFamily: 'monospace',
          }}
        >
          Heat No. 0001
        </div>
        
        <div
          style={{
            color: '#f0f6fc', // paper
            fontSize: 100,
            fontWeight: 800,
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: 30,
          }}
        >
          {profile.name}
        </div>
        
        <div
          style={{
            color: '#ff5a1f', // molten
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.4,
            maxWidth: '900px',
          }}
        >
          {profile.about.headline}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
