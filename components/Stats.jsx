'use client';
import { useEffect, useRef, useState } from 'react';

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// 3 stats matching the reference
const stats = [
  {
    number: 10000, suffix: '+',
    label: 'Professionals Trained For Exceptional Career Success',
    color: '#1565C0',
  },
  {
    number: 200, suffix: '+',
    label: 'Sessions Delivered With Unmatched Learning Excellence',
    color: '#1565C0',
  },
  {
    number: 5000, suffix: '+',
    label: 'Active Learners Engaged In Dynamic Courses',
    color: '#1565C0',
  },
];

export default function Stats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} style={{ background: '#F0F4FF', padding: '72px 0' }}>
      <div className="container-max">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          divider: 'solid',
        }} className="stats-grid">
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: '28px 32px',
                borderRight: i < stats.length - 1 ? '1px solid #BFDBFE' : 'none',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.6s ease ${i * 0.12}s`,
              }}
            >
              {/* Circular blue badge for the number */}
              <div style={{
                width: 90, height: 90, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1565C0, #1A73E8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 24px rgba(21,101,192,0.25)',
              }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: -1 }}>
                  <CountUp target={s.number} suffix={s.suffix} />
                </span>
              </div>
              <p style={{
                fontSize: 15, fontWeight: 600, color: '#1E293B',
                lineHeight: 1.5, maxWidth: 200, margin: '0 auto',
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid #BFDBFE; }
          .stats-grid > div:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
