'use client';
import { useState, useRef, useEffect } from 'react';

const categories = [
  'General',
  'Programs & Curriculum',
  'Pricing & ROI',
  'Delivery & Format',
  'Certification',
];

const faqData = {
  'General': [
    {
      q: 'What is Accredian Enterprise?',
      a: 'Accredian Enterprise is a specialized L&D division that partners with companies to deliver structured, expert-led upskilling programs. We work with enterprises of all sizes — from startups to Fortune 500 companies — to build high-performing, future-ready teams.',
    },
    {
      q: 'How is this different from a generic training vendor?',
      a: 'Unlike generic vendors, we offer fully customized programs built around your company\'s goals, industry, and talent profile. Every engagement starts with a skill gap analysis and is designed collaboratively with your HR and L&D teams.',
    },
    {
      q: 'What industries do you serve?',
      a: 'We serve a broad range of industries including Technology, BFSI (Banking, Financial Services & Insurance), Healthcare, Manufacturing, Retail, and Professional Services.',
    },
  ],
  'Programs & Curriculum': [
    {
      q: 'Can you build a completely custom curriculum?',
      a: 'Absolutely. Our curriculum design team works with your internal SMEs to co-create course content that aligns with your company\'s tools, workflows, and strategic objectives.',
    },
    {
      q: 'How long do enterprise programs typically run?',
      a: 'Programs range from intensive 2-day workshops to 6-month structured learning journeys. The duration depends on the depth of skills targeted and your team\'s bandwidth.',
    },
  ],
  'Pricing & ROI': [
    {
      q: 'How is pricing structured?',
      a: 'Pricing is engagement-based, depending on the number of learners, program duration, and delivery format. We offer per-seat pricing, cohort-based pricing, and enterprise-wide licensing models.',
    },
    {
      q: 'How do you measure ROI?',
      a: 'We use pre/post skill assessments, project completion metrics, manager feedback surveys, and business impact tracking (where applicable) to quantify learning ROI for your investment.',
    },
  ],
  'Delivery & Format': [
    {
      q: 'What delivery formats are available?',
      a: 'We offer: Live Instructor-Led Training (online or on-site), Self-Paced Digital Learning, Blended Learning (mix of both), and On-site Bootcamps at your office.',
    },
    {
      q: 'Can training be delivered at our office locations?',
      a: 'Yes. We have facilitators across major Indian metros and can organize on-site training at your premises, including multi-city rollouts for distributed teams.',
    },
  ],
  'Certification': [
    {
      q: 'Do participants receive certificates?',
      a: 'Yes. Upon successful completion, participants receive Accredian-issued certificates that are shareable on LinkedIn and recognized across the industry.',
    },
    {
      q: 'Are certifications industry-recognized?',
      a: 'Our certificates are backed by partnerships with leading universities and industry bodies. Specific programs may also include co-branded certifications from our university partners.',
    },
  ],
};

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #F1F5F9' }}>
      <button className="accordion-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <span style={{
          width: 26, height: 26, borderRadius: '50%',
          background: open ? '#1565C0' : '#F1F5F9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: open ? 'white' : '#64748B', fontSize: 16, flexShrink: 0,
          transition: 'all 0.2s',
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="accordion-content" style={{ animation: 'fadeUp 0.2s ease' }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState('General');
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
    <section id="faqs" ref={ref} style={{ padding: '80px 0', background: 'white' }}>
      <div className="container-max">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="title-chip">Got Questions?</span>
          <h2 className="section-title">Frequently <span style={{ color: '#1A73E8' }}>Asked Questions</span></h2>
          <div className="blue-divider" />
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32,
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease',
        }} className="faqs-grid">
          {/* Category Sidebar */}
          <div>
            <div style={{
              background: '#FAFBFF', borderRadius: 16, padding: 20,
              border: '1px solid #E2E8F0', position: 'sticky', top: 88,
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: 1, marginBottom: 12 }}>
                CATEGORIES
              </p>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '10px 14px', borderRadius: 10, marginBottom: 4,
                    background: activeCategory === cat ? '#EFF6FF' : 'transparent',
                    color: activeCategory === cat ? '#1565C0' : '#374151',
                    border: activeCategory === cat ? '1px solid #BFDBFE' : '1px solid transparent',
                    fontWeight: activeCategory === cat ? 700 : 500,
                    fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div>
            <div style={{
              background: '#FAFBFF', borderRadius: 16, padding: '8px 28px',
              border: '1px solid #E2E8F0',
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', padding: '20px 0 4px' }}>
                {activeCategory}
              </h3>
              {faqData[activeCategory].map((item, i) => (
                <Accordion key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) { .faqs-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
