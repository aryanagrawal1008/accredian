'use client';
import { useEffect, useRef, useState } from 'react';

const professionals = [
  {
    icon: '💻',
    title: 'Tech Professionals',
    desc: 'Software engineers, architects, and tech leads looking to expand into product, AI, and leadership.',
    roles: ['Software Engineers', 'Data Scientists', 'DevOps', 'ML Engineers'],
  },
  {
    icon: '📊',
    title: 'Non-Tech Professionals',
    desc: 'Business, operations, finance, and marketing professionals aiming to gain technical fluency.',
    roles: ['Marketing', 'Finance', 'HR', 'Operations Managers'],
  },
  {
    icon: '🌱',
    title: 'Emerging Professionals',
    desc: 'Early-career employees and high-potential talent earmarked for accelerated career growth.',
    roles: ['Fresh Graduates', 'Junior Managers', 'Associates'],
  },
  {
    icon: '🏅',
    title: 'Senior Professionals',
    desc: 'Directors, VPs, and C-suite leaders seeking strategic upskilling and executive programs.',
    roles: ['Directors', 'VPs', 'C-Suite', 'Business Heads'],
  },
];

export default function WhoShouldJoin() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      padding: '80px 0',
      background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #1976D2 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -80,
        width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
      }} />

      <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.9)',
            fontSize: 12, fontWeight: 700, letterSpacing: 1.5,
            textTransform: 'uppercase', padding: '6px 16px', borderRadius: 100,
            marginBottom: 16, border: '1px solid rgba(255,255,255,0.2)',
          }}>
            Who Benefits
          </span>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800,
            color: 'white', marginBottom: 16,
          }}>
            Who Should Join?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Our programs are designed for professionals at every stage of their career journey.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }} className="who-grid">
          {professionals.map((p, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 20, padding: '28px 22px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: 32, marginBottom: 16,
                width: 56, height: 56, borderRadius: 14,
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 10 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 16 }}>
                {p.desc}
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 14 }}>
                {p.roles.map(r => (
                  <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: '#93C5FD', fontSize: 12 }}>→</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) { .who-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 500px) { .who-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
