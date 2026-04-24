'use client';
import { useEffect, useRef, useState } from 'react';

const catItems = [
  {
    letter: 'C',
    title: 'Concept',
    color: '#1565C0',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    desc: 'Build a solid theoretical foundation with structured curriculum and expert instruction.',
    points: ['Structured curriculum', 'Industry case studies', 'Expert-led sessions', 'Knowledge assessments'],
  },
  {
    letter: 'A',
    title: 'Application',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    desc: 'Apply concepts through real-world projects, simulations, and hands-on exercises.',
    points: ['Live projects', 'Business simulations', 'Capstone projects', 'Peer collaboration'],
  },
  {
    letter: 'T',
    title: 'Tools',
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    desc: 'Master the latest industry tools and technologies used in modern enterprises.',
    points: ['Industry-standard tools', 'Platform access', 'Tool certifications', 'Hands-on labs'],
  },
];

export default function CATFramework() {
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
    <section id="cat" ref={ref} style={{ padding: '80px 0', background: 'white' }}>
      <div className="container-max">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="title-chip">Our Learning Methodology</span>
          <h2 className="section-title">The <span style={{ color: '#1A73E8' }}>C-A-T Framework</span></h2>
          <div className="blue-divider" />
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            A proven three-pillar methodology that ensures complete learning and retention.
          </p>
        </div>

        {/* CAT Visual */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 56, flexWrap: 'wrap', gap: 0,
        }}>
          {catItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: 110, height: 110, borderRadius: '50%',
                background: item.bg,
                border: `3px solid ${item.border}`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 4px 24px ${item.color}22`,
                cursor: 'default',
                transition: 'transform 0.3s, box-shadow 0.3s',
                marginLeft: i > 0 ? -20 : 0,
                zIndex: 3 - i,
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.7)',
                transitionDelay: `${i * 0.15}s`,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.zIndex = 10; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.zIndex = 3 - i; }}
              >
                <span style={{ fontSize: 36, fontWeight: 900, color: item.color, lineHeight: 1 }}>
                  {item.letter}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: item.color, marginTop: 2 }}>
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        }} className="cat-grid">
          {catItems.map((item, i) => (
            <div
              key={i}
              className="card"
              style={{
                borderLeft: `4px solid ${item.color}`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.6s ease ${0.3 + i * 0.12}s`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: item.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 18, color: item.color,
                }}>
                  {item.letter}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A' }}>{item.title}</h3>
              </div>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65, marginBottom: 14 }}>
                {item.desc}
              </p>
              <ul style={{ listStyle: 'none' }}>
                {item.points.map(pt => (
                  <li key={pt} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ color: item.color, fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 13.5, color: '#475569' }}>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) { .cat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
