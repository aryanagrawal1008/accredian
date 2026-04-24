'use client';
import { useEffect, useRef, useState } from 'react';

// SVG icons matching the reference style (monoline blue)
const EdgeIcon = ({ type }) => {
  const icons = {
    guidance: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    tech: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8l3 3-3 3M13 14h4"/>
      </svg>
    ),
    impact: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

const steps = [
  {
    iconType: 'guidance',
    title: 'Expert Guidance',
    desc: 'Learn from industry leaders with real-world success.',
    bullet: '•',
  },
  {
    iconType: 'tech',
    title: 'Advanced Technology',
    desc: 'State-of-the-art LMS for seamless learning experiences.',
    bullet: '•',
  },
  {
    iconType: 'impact',
    title: 'Proven Impact',
    desc: 'Trusted by leading organizations for measurable ROI.',
    bullet: '•',
  },
];

export default function AccredianEdge() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="edge" ref={ref} style={{ padding: '80px 0', background: '#F0F4FF' }}>
      <div className="container-max">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0F172A' }}>
            The <span style={{ color: '#1A73E8' }}>Accredian Edge</span>
          </h2>
          <p style={{ fontSize: 15, color: '#1A73E8', fontWeight: 500, marginTop: 8 }}>
            Key Aspects of <span style={{ color: '#1A73E8' }}>Our Strategic Training</span>
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 32,
          position: 'relative',
        }} className="edge-grid">

          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              {/* Circle icon with dashed ring — matching reference */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
                {/* Outer dashed ring */}
                <div style={{
                  width: 96, height: 96, borderRadius: '50%',
                  border: '2px dashed #93C5FD',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* Inner white circle */}
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'white',
                    boxShadow: '0 4px 16px rgba(21,101,192,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <EdgeIcon type={s.iconType} />
                  </div>
                </div>
              </div>

              {/* Vertical line below icon */}
              <div style={{
                width: 1, height: 32, background: '#93C5FD',
                margin: '0 auto 12px',
              }} />

              {/* Bullet dot */}
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: '#1565C0',
                margin: '0 auto 16px',
              }} />

              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65, maxWidth: 240, margin: '0 auto' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .edge-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
