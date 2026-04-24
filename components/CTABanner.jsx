'use client';

export default function CTABanner({ onEnquire }) {
  return (
    <section style={{
      background: '#F0F4FF',
      padding: '64px 0',
    }}>
      <div className="container-max">
        {/* Contained rounded card — matching reference */}
        <div style={{
          background: 'linear-gradient(135deg, #1565C0 0%, #1976D2 60%, #1A73E8 100%)',
          borderRadius: 20,
          padding: '36px 48px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute', right: -40, top: '50%',
            transform: 'translateY(-50%)',
            width: 220, height: 220, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 60, top: '50%',
            transform: 'translateY(-50%)',
            width: 160, height: 160, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }} />

          {/* Headset icon box — matching reference */}
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(255,255,255,0.25)',
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0118 0v6"/>
              <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
            </svg>
          </div>

          {/* Text */}
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: 'clamp(17px,2.2vw,22px)',
              fontWeight: 800, color: 'white', marginBottom: 6, lineHeight: 1.25,
            }}>
              Want to Learn More About Our Training Solutions?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>
              Get Expert Guidance for Your Team's Success!
            </p>
          </div>

          {/* Button — right aligned, white with blue text */}
          <button
            id="cta-enquire-btn"
            onClick={onEnquire}
            style={{
              flexShrink: 0,
              background: 'white',
              color: '#1565C0',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: 10,
              padding: '13px 28px',
              fontSize: 15, fontWeight: 700,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.2s ease',
              position: 'relative', zIndex: 1,
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Contact Us <span style={{ fontSize: 16 }}>›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
