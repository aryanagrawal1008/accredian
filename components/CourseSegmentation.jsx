'use client';
import { useEffect, useRef, useState } from 'react';

const segments = [
  {
    icon: '🎓',
    title: 'Program Specific',
    desc: 'Deep-dive programs tailored to specific business roles — from Product Managers to Data Analysts.',
    color: '#1565C0', bg: '#EFF6FF',
    examples: ['MBA for Tech', 'PG in Data Science', 'Product Analytics'],
  },
  {
    icon: '🏭',
    title: 'Industry Specific',
    desc: 'Sector-focused training for BFSI, Healthcare, Manufacturing, Retail, and Technology companies.',
    color: '#7C3AED', bg: '#F5F3FF',
    examples: ['BFSI Programs', 'Healthcare Analytics', 'Retail Tech'],
  },
  {
    icon: '📌',
    title: 'Topic Specific',
    desc: 'Focused short-form modules covering high-demand topics like Gen-AI, Cloud, and Agile leadership.',
    color: '#059669', bg: '#ECFDF5',
    examples: ['Gen-AI Bootcamp', 'Cloud Foundations', 'Agile 101'],
  },
  {
    icon: '📶',
    title: 'Level Specific',
    desc: 'Tiered learning tracks for beginners, mid-level professionals, and senior executives.',
    color: '#D97706', bg: '#FFFBEB',
    examples: ['Beginner Tracks', 'Manager Level', 'C-Suite Programs'],
  },
];

export default function CourseSegmentation() {
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
    <section ref={ref} style={{ padding: '80px 0', background: '#F0F4FF' }}>
      <div className="container-max">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="title-chip">Flexibility by Design</span>
          <h2 className="section-title">Tailored <span style={{ color: '#1A73E8' }}>Course Segmentation</span></h2>
          <div className="blue-divider" />
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Choose the training format that fits your organization's unique context and goals.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
        }} className="seg-grid">
          {segments.map((s, i) => (
            <div
              key={i}
              className="card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `all 0.55s ease ${i * 0.1}s`,
                borderTop: `4px solid ${s.color}`,
              }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 12,
                background: s.bg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22, marginBottom: 16,
              }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', marginBottom: 10 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 13.5, color: '#64748B', lineHeight: 1.65, marginBottom: 16 }}>
                {s.desc}
              </p>
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 14 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: 1, marginBottom: 8 }}>
                  EXAMPLES
                </p>
                {s.examples.map(ex => (
                  <div key={ex} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, color: '#475569' }}>{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) { .seg-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 500px) { .seg-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
