'use client';
import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    company: 'ADP',
    abbr: 'ADP',
    color: '#D97706',
    bg: '#FFFBEB',
    name: 'Priya Sharma',
    role: 'Head of L&D, ADP India',
    rating: 5,
    text: '"Accredian Enterprise completely transformed how we approach employee development. Their Gen-AI program was exactly what our analytics team needed — practical, current, and delivered by true domain experts. We saw a measurable skill uplift within 8 weeks."',
  },
  {
    company: 'Bayer',
    abbr: 'BY',
    color: '#059669',
    bg: '#ECFDF5',
    name: 'Rahul Mehta',
    role: 'VP People & Culture, Bayer India',
    rating: 5,
    text: '"The Skill Gap Analysis they conducted was eye-opening. Their team identified gaps we hadn\'t even noticed. The custom learning roadmap they built for our tech leaders was world-class — structured, challenging, and deeply relevant to our business challenges."',
  },
  {
    company: 'HCL',
    abbr: 'HCL',
    color: '#EF4444',
    bg: '#FEF2F2',
    name: 'Anjali Nair',
    role: 'Director of Talent Development, HCL',
    rating: 5,
    text: '"We\'ve worked with many training vendors, but Accredian stands out for their flexibility and quality. They scaled our Product Management training from a pilot of 50 to an org-wide rollout of 800+ employees seamlessly."',
  },
  {
    company: 'Reliance',
    abbr: 'RI',
    color: '#1565C0',
    bg: '#EFF6FF',
    name: 'Deepak Singhania',
    role: 'Chief People Officer, Reliance Retail',
    rating: 5,
    text: '"The ROI on our investment with Accredian has been exceptional. Their blended learning model allowed our field teams to upskill without disrupting operations. The certification outcomes were impressive and morale among the teams improved significantly."',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section ref={ref} style={{ padding: '80px 0', background: '#F0F4FF' }}>
      <div className="container-max">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="title-chip">Client Stories</span>
          <h2 className="section-title">What Our <span style={{ color: '#1A73E8' }}>Partners Say</span></h2>
          <div className="blue-divider" />
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Real results from real enterprise partnerships.
          </p>
        </div>

        <div style={{
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease',
          maxWidth: 780, margin: '0 auto',
        }}>
          {/* Main testimonial */}
          <div style={{
            background: 'white', borderRadius: 24, padding: '44px 48px',
            boxShadow: '0 8px 48px rgba(21,101,192,0.10)',
            border: '1px solid #E2E8F0', position: 'relative',
            transition: 'all 0.4s ease',
          }} className="testimonial-card">
            {/* Quote mark */}
            <div style={{
              position: 'absolute', top: 28, left: 40,
              fontSize: 80, lineHeight: 1, color: '#DBEAFE',
              fontFamily: 'Georgia, serif', fontWeight: 900,
            }}>"</div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                {Array(t.rating).fill(0).map((_, i) => (
                  <span key={i} style={{ color: '#F59E0B', fontSize: 18 }}>★</span>
                ))}
              </div>

              <p style={{
                fontSize: 16, lineHeight: 1.8, color: '#374151',
                fontStyle: 'italic', marginBottom: 28,
              }}>
                {t.text}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: t.bg, border: `2px solid ${t.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 14, color: t.color,
                }}>
                  {t.abbr}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>{t.role}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <span style={{
                    background: t.bg, color: t.color,
                    fontSize: 13, fontWeight: 700,
                    padding: '5px 14px', borderRadius: 100, border: `1px solid ${t.color}30`,
                  }}>{t.company}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dots & arrows */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 28 }}>
            <button
              onClick={() => setActive(a => (a - 1 + testimonials.length) % testimonials.length)}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1.5px solid #CBD5E1', background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 16, color: '#64748B',
                transition: 'all 0.2s',
              }}
              aria-label="Previous testimonial"
            >‹</button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 24 : 8,
                  height: 8, borderRadius: 4,
                  background: i === active ? '#1565C0' : '#CBD5E1',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
            <button
              onClick={() => setActive(a => (a + 1) % testimonials.length)}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1.5px solid #CBD5E1', background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 16, color: '#64748B',
                transition: 'all 0.2s',
              }}
              aria-label="Next testimonial"
            >›</button>
          </div>

          {/* Company logos row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 36, flexWrap: 'wrap' }}>
            {testimonials.map((test, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  padding: '8px 18px', borderRadius: 10,
                  border: `2px solid ${i === active ? test.color : '#E2E8F0'}`,
                  background: i === active ? test.bg : 'white',
                  color: i === active ? test.color : '#94A3B8',
                  fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  transition: 'all 0.2s', fontFamily: 'inherit',
                }}
              >{test.company}</button>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 600px) {
          .testimonial-card { padding: 28px 24px !important; }
        }
      `}</style>
    </section>
  );
}
