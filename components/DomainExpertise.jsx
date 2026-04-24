'use client';
import { useEffect, useRef, useState } from 'react';

// SVG icons matching reference (monoline blue, 28px)
const domainIcons = {
  product: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  genai: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 100 16A8 8 0 0012 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  leadership: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  data: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  ops: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>,
  digital: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  fintech: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
};

const domains = [
  { iconKey: 'product', title: 'Product & Innovation Hub' },
  { iconKey: 'genai', title: 'Gen-AI Mastery' },
  { iconKey: 'leadership', title: 'Leadership Elevation' },
  { iconKey: 'data', title: 'Tech & Data Insights' },
  { iconKey: 'ops', title: 'Operations Excellence' },
  { iconKey: 'digital', title: 'Digital Enterprise' },
  { iconKey: 'fintech', title: 'Fintech Innovation Lab' },
];

export default function DomainExpertise() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="domains" ref={ref} style={{ padding: '80px 0', background: 'white' }}>
      <div className="container-max">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0F172A' }}>
            Our <span style={{ color: '#1A73E8' }}>Domain Expertise</span>
          </h2>
          <p style={{ fontSize: 15, marginTop: 8 }}>
            <span style={{ color: '#1A73E8', fontWeight: 500 }}>Specialized Programs</span>
            {' '}Designed to Fuel Innovation
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }} className="domains-grid">
          {domains.map((d, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                // Center tile: 7th card in col 2
                gridColumn: i === 6 ? '2' : 'auto',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 14, padding: '32px 24px',
                border: `1px solid ${hovered === i ? '#93C5FD' : '#E5E7EB'}`,
                borderRadius: 14, background: hovered === i ? '#EFF6FF' : 'white',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: hovered === i ? '0 4px 20px rgba(21,101,192,0.1)' : 'none',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: hovered === i ? 'white' : '#F0F4FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.25s ease',
                boxShadow: hovered === i ? '0 2px 12px rgba(21,101,192,0.15)' : 'none',
              }}>
                {domainIcons[d.iconKey]}
              </div>
              <span style={{
                fontSize: 15, fontWeight: 700,
                color: hovered === i ? '#1565C0' : '#1E293B',
                textAlign: 'center', lineHeight: 1.3,
                transition: 'color 0.25s ease',
              }}>
                {d.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          .domains-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .domains-grid > div:nth-child(7) { grid-column: auto !important; }
        }
        @media (max-width: 500px) { .domains-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
