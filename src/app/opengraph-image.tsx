import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Varshan Gowda S R — CSE • AI/ML • Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0A0A',
          padding: '64px 72px',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
          border: '12px solid #121212',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Header & Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#C8FF00', fontSize: '20px', fontFamily: 'monospace', fontWeight: 700 }}>
              {"//"}
            </span>
            <span style={{ color: '#9E988F', fontSize: '16px', fontFamily: 'monospace', letterSpacing: '0.15em' }}>
              PORTFOLIO ARCHITECTURE
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: '#161616',
              border: '1px solid rgba(245, 240, 232, 0.1)',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '9999px',
                backgroundColor: '#C8FF00',
              }}
            />
            <span style={{ color: '#F5F0E8', fontSize: '13px', fontFamily: 'monospace', fontWeight: 600 }}>
              ACTIVE DISPATCH
            </span>
          </div>
        </div>

        {/* Center: Title & Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ color: '#C8FF00', fontSize: '18px', fontFamily: 'monospace', fontWeight: 600, letterSpacing: '0.2em' }}>
            CSE • AI/ML • FULL-STACK DEVELOPER
          </div>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 800,
              color: '#F5F0E8',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            VARSHAN GOWDA S R
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#9E988F',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            &ldquo;I build software, explore AI/ML, and contribute to open source.&rdquo;
          </p>
        </div>

        {/* Bottom Telemetry Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '1px solid rgba(245, 240, 232, 0.1)',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#68635B',
          }}
        >
          <div style={{ display: 'flex' }}>
            CORE:&nbsp;<span style={{ color: '#F5F0E8' }}>A1 Swaara · FLUXA · VelorioLabs</span>
          </div>
          <div style={{ display: 'flex' }}>
            LOCATION:&nbsp;<span style={{ color: '#F5F0E8' }}>Bangalore, India</span>
          </div>
          <div style={{ display: 'flex' }}>
            GITHUB:&nbsp;<span style={{ color: '#C8FF00' }}>@varshuai</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
