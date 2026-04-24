'use client';
import { useEffect, useRef, useState } from 'react';

const partners = [
  { name: 'Reliance Industries', short: 'Reliance', color: '#0F172A' },
  { name: 'HCL Technologies', short: 'HCL', color: '#E31837' },
  { name: 'IBM', short: 'IBM', color: '#1565C0' },
  { name: 'CRIF', short: 'CRIF', color: '#1565C0' },
  { name: 'ADP', short: 'ADP', color: '#CC0000' },
  { name: 'Bayer', short: 'Bayer', color: '#10A341' },
];

// SVG-style logo components matching the real brand aesthetics
function PartnerLogo({ partner }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px 28px',
        filter: hovered ? 'none' : 'grayscale(0.7) opacity(0.65)',
        transition: 'filter 0.3s ease, transform 0.2s ease',
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        cursor: 'default',
      }}
    >
      <span style={{
        fontSize: partner.short === 'IBM' ? 28 : partner.short === 'HCL' ? 26 : partner.short === 'CRIF' ? 22 : 24,
        fontWeight: 900,
        color: hovered ? partner.color : '#374151',
        letterSpacing: partner.short === 'IBM' ? 4 : partner.short === 'ADP' ? 2 : -0.5,
        fontFamily: partner.short === 'Reliance' ? 'Georgia, serif' : 'inherit',
        transition: 'color 0.3s ease',
        whiteSpace: 'nowrap',
      }}>
        {partner.short}
      </span>
    </div>
  );
}

export default function Partners() {
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
    <section id="partners" ref={ref} style={{ padding: '72px 0', background: 'white' }}>
      <div className="container-max">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0F172A' }}>
            Our Proven{' '}
            <span style={{ color: '#1A73E8' }}>Partnerships</span>
          </h2>
          <p style={{ fontSize: 16, color: '#1A73E8', fontWeight: 500, marginTop: 8 }}>
            Successful Collaborations With the{' '}
            <span style={{ color: '#1A73E8' }}>Industry's Best</span>
          </p>
        </div>

        {/* Single-row logo strip */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 0,
          padding: '16px 0',
          borderTop: '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}>
          {partners.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <PartnerLogo partner={p} />
              {i < partners.length - 1 && (
                <div style={{ width: 1, height: 32, background: '#E2E8F0' }} />
              )}
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#94A3B8' }}>
          + 192 more companies across 12 industries
        </p>
      </div>
    </section>
  );
}
