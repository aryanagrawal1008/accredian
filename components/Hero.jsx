'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Hero({ onEnquire }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const bullets = [
    { icon: '✦', text: 'Tailored Solutions for every business need' },
    { icon: '✦', text: 'Industry Insights from domain experts' },
    { icon: '✦', text: 'Expert Guidance throughout the journey' },
  ];

  const tags = ['Product Management', 'Gen-AI', 'Data Science', 'Leadership', 'Fintech', 'Operations'];

  return (
    <section
      id="home"
      ref={ref}
      style={{
        paddingTop: 100,
        paddingBottom: 80,
        background: 'linear-gradient(160deg, #EFF6FF 0%, #FFFFFF 55%, #F0F9FF 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(21,101,192,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60, width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(26,115,232,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div className="container-max">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }} className="hero-grid">
          {/* Left */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.7s ease' }}>
            <span className="title-chip">Enterprise Learning & Development</span>

            <h1 style={{
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#0F172A',
              marginBottom: 20,
              letterSpacing: -1,
            }}>
              Next-Gen Expertise{' '}
              <span style={{
                background: 'linear-gradient(90deg, #1565C0, #1A73E8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                For Your Enterprise
              </span>
            </h1>

            <p style={{ fontSize: 18, color: '#475569', marginBottom: 28, lineHeight: 1.7 }}>
              Cultivate high-performance teams through expert learning. We deliver world-class upskilling programs tailored to your organization's unique goals.
            </p>

            <ul style={{ listStyle: 'none', marginBottom: 36 }}>
              {bullets.map((b, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14,
                  opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.6s ease ${0.2 + i * 0.1}s`,
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 2, color: '#16A34A', fontSize: 12, fontWeight: 700,
                  }}>✓</span>
                  <span style={{ fontSize: 15, color: '#374151', fontWeight: 500 }}>{b.text}</span>
                </li>
              ))}
            </ul>

            {/* Domain tags */}
            <div className="tag-stripe" style={{ marginBottom: 36 }}>
              {tags.map(t => (
                <span key={t} style={{
                  background: 'white', border: '1.5px solid #BFDBFE',
                  color: '#1565C0', fontSize: 12, fontWeight: 600,
                  padding: '5px 12px', borderRadius: 100,
                  boxShadow: '0 1px 4px rgba(21,101,192,0.08)',
                }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                id="hero-enquire-btn"
                className="btn-primary"
                onClick={onEnquire}
                style={{ fontSize: 16, padding: '14px 32px' }}
              >
                Enquire Now →
              </button>
              <a href="#stats" className="btn-outline" style={{ fontSize: 16, padding: '14px 32px' }}
                onClick={e => { e.preventDefault(); document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' }); }}>
                See Our Track Record
              </a>
            </div>

            {/* Trust bar */}
            <div style={{
              marginTop: 36, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex' }}>
                  {['#1565C0', '#22C55E', '#F59E0B', '#EF4444'].map((c, i) => (
                    <div key={i} style={{
                      width: 28, height: 28, borderRadius: '50%', background: c,
                      border: '2px solid white', marginLeft: i > 0 ? -8 : 0,
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>
                  Trusted by <strong style={{ color: '#0F172A' }}>200+</strong> enterprises
                </span>
              </div>
              <div style={{ width: 1, height: 20, background: '#E2E8F0' }} />
              <div style={{ display: 'flex', gap: 4 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#F59E0B', fontSize: 14 }}>★</span>)}
                <span style={{ fontSize: 13, color: '#64748B', marginLeft: 4 }}>4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Right — image */}
          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.2s', position: 'relative',
          }}>
            <div style={{
              borderRadius: 24, overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(21,101,192,0.18)',
              border: '4px solid white',
              animation: 'float 4s ease-in-out infinite',
              position: 'relative',
            }}>
              <Image
                src="/hero.png"
                alt="Enterprise learning professionals collaborating"
                width={600}
                height={450}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
              {/* Overlay stats badge */}
              <div style={{
                position: 'absolute', bottom: 20, left: 20,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(12px)',
                borderRadius: 12, padding: '12px 18px',
                display: 'flex', gap: 24,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}>
                {[['10K+', 'Professionals'], ['200+', 'Sessions'], ['5K+', 'Learners']].map(([n, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#1565C0' }}>{n}</div>
                    <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badge */}
            <div style={{
              position: 'absolute', top: -16, right: -16,
              background: 'linear-gradient(135deg, #1565C0, #1A73E8)',
              color: 'white', borderRadius: 16, padding: '10px 16px',
              boxShadow: '0 8px 24px rgba(21,101,192,0.4)',
              fontSize: 13, fontWeight: 700, textAlign: 'center',
            }}>
              🏆 #1 Ranked<br />
              <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.85 }}>Enterprise L&D</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
