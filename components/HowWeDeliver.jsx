'use client';
import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    num: '01',
    icon: '🔍',
    title: 'Skill Gap Analysis',
    desc: "We conduct a thorough assessment of your team's current capabilities and identify critical skill gaps through surveys, interviews, and benchmarking.",
    color: '#1565C0', bg: '#EFF6FF',
    outputs: ['Skills assessment report', 'Gap analysis matrix', 'Priority recommendations'],
  },
  {
    num: '02',
    icon: '🗺️',
    title: 'Customized Training Plan',
    desc: 'Our experts design a bespoke learning roadmap aligned with your business goals, team structure, and industry context.',
    color: '#7C3AED', bg: '#F5F3FF',
    outputs: ['Learning roadmap', 'Content curriculum', 'Timeline & milestones'],
  },
  {
    num: '03',
    icon: '🚀',
    title: 'Flexible Program Delivery',
    desc: 'Deliver training through live instructor-led sessions, self-paced modules, or a blended approach — online or on-site at your premises.',
    color: '#059669', bg: '#ECFDF5',
    outputs: ['Live sessions', 'Self-paced modules', 'ROI measurement'],
  },
];

export default function HowWeDeliver() {
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
    <section id="deliver" ref={ref} style={{ padding: '80px 0', background: '#F0F4FF', overflow: 'hidden' }}>
      <div className="container-max">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="title-chip">Our Process</span>
          <h2 className="section-title">How We <span style={{ color: '#1A73E8' }}>Deliver Results</span></h2>
          <div className="blue-divider" />
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            A systematic 3-step approach to transformative enterprise learning.
          </p>
        </div>

        <div style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>
          
          {/* Global Vertical Timeline Line */}
          <div className="desktop-timeline-line" style={{
            position: 'absolute',
            top: 40, bottom: 40,
            left: '50%', width: 4,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, #1565C0, #7C3AED, #059669)',
            borderRadius: 4,
            zIndex: 0,
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 0.5s',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }} className="steps-container">
            {steps.map((s, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    alignItems: 'center',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(40px)',
                    transition: `all 0.6s ease ${i * 0.2}s`,
                  }}
                  className="deliver-row"
                >
                  
                  {/* LEFT CONTENT */}
                  <div className={`content-col left-col ${isEven ? 'active' : 'inactive'}`} 
                       style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', padding: '24px 48px' }}>
                    {isEven && (
                      <>
                        <div className="horizontal-connector right-connector" style={{
                          position: 'absolute', top: '50%', right: -12,
                          width: 60, height: 4, background: s.color,
                          transform: 'translateY(-50%)', zIndex: 0
                        }} />
                        <div className="card" style={{ maxWidth: 440, width: '100%', position: 'relative', zIndex: 1, borderTop: `5px solid ${s.color}` }}>
                          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                            <div style={{
                              width: 48, height: 48, borderRadius: 12, background: s.bg,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0
                            }}>{s.icon}</div>
                            <h3 style={{ fontSize: 19, fontWeight: 700, color: '#0F172A' }}>{s.title}</h3>
                          </div>
                          <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {s.outputs.map(o => (
                              <span key={o} style={{
                                background: s.bg, color: s.color, border: `1px solid ${s.color}30`,
                                fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 100,
                              }}>{o}</span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* CENTER TIMELINE */}
                  <div className="timeline-col" style={{ display: 'flex', justifyContent: 'center', padding: '24px 0', position: 'relative', zIndex: 2 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${s.color}, ${s.color}CC)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 900, fontSize: 18,
                      boxShadow: `0 0 0 8px ${s.bg}, 0 4px 20px ${s.color}66`,
                    }}>
                      {s.num}
                    </div>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className={`content-col right-col ${!isEven ? 'active' : 'inactive'}`} 
                       style={{ position: 'relative', display: 'flex', justifyContent: 'flex-start', padding: '24px 48px' }}>
                    {!isEven && (
                      <>
                        <div className="horizontal-connector left-connector" style={{
                          position: 'absolute', top: '50%', left: -12,
                          width: 60, height: 4, background: s.color,
                          transform: 'translateY(-50%)', zIndex: 0
                        }} />
                        <div className="card" style={{ maxWidth: 440, width: '100%', position: 'relative', zIndex: 1, borderTop: `5px solid ${s.color}` }}>
                          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                            <div style={{
                              width: 48, height: 48, borderRadius: 12, background: s.bg,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0
                            }}>{s.icon}</div>
                            <h3 style={{ fontSize: 19, fontWeight: 700, color: '#0F172A' }}>{s.title}</h3>
                          </div>
                          <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {s.outputs.map(o => (
                              <span key={o} style={{
                                background: s.bg, color: s.color, border: `1px solid ${s.color}30`,
                                fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 100,
                              }}>{o}</span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .deliver-row { grid-template-columns: 1fr 80px 1fr; }
        
        @media (max-width: 900px) {
          .desktop-timeline-line { left: 40px !important; }
          .deliver-row { grid-template-columns: 80px 1fr !important; }
          
          .left-col.active { grid-column: 2; order: 2; padding: 24px 0 24px 24px !important; justify-content: flex-start !important; }
          .right-col.active { grid-column: 2; order: 2; padding: 24px 0 24px 24px !important; justify-content: flex-start !important; }
          
          .left-col.inactive, .right-col.inactive { display: none; }
          
          .timeline-col { grid-column: 1; order: 1; justify-content: center !important; }
          
          .horizontal-connector { width: 36px !important; }
          .right-connector { right: auto !important; left: -12px !important; }
          .left-connector { left: -12px !important; }
        }
      `}</style>
    </section>
  );
}

