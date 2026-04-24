'use client';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Stats', href: '#stats' },
  { label: 'Clients', href: '#partners' },
  { label: 'Accredian Edge', href: '#edge' },
  { label: 'CAT', href: '#cat' },
  { label: 'How It Works', href: '#deliver' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Navbar({ onEnquire }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: '-60px 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : '0 1px 0 #E2E8F0',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container-max" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: '64px',
        }}>
          {/* Text-only wordmark — matching reference */}
          <a
            href="#home"
            onClick={e => { e.preventDefault(); handleNav('#home'); }}
            style={{ textDecoration: 'none' }}
          >
            <div style={{ fontWeight: 900, fontSize: 20, color: '#1565C0', letterSpacing: -0.5, lineHeight: 1 }}>
              accredian
            </div>
            <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 500, letterSpacing: 0.3 }}>
              credentials that matter
            </div>
          </a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="desktop-nav">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '6px 12px',
                    fontSize: 14, fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#1565C0' : '#374151',
                    borderBottom: isActive ? '2px solid #1565C0' : '2px solid transparent',
                    transition: 'all 0.2s', fontFamily: 'inherit',
                    borderRadius: '4px 4px 0 0',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#1565C0'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#374151'; }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              id="nav-enquire-btn"
              onClick={onEnquire}
              className="btn-primary"
              style={{ fontSize: 14, padding: '10px 20px' }}
            >
              Enquire Now
            </button>
            <button
              id="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none', background: 'none', border: 'none',
                cursor: 'pointer', padding: 6, borderRadius: 6,
              }}
              className="hamburger-btn"
              aria-label="Toggle menu"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 22 }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    display: 'block', height: 2, background: '#0F172A', borderRadius: 2,
                    transition: 'all 0.3s',
                    transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px, 4px)' :
                                menuOpen && i === 1 ? 'scaleX(0)' :
                                menuOpen && i === 2 ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
                  }} />
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: 'white', borderTop: '1px solid #E2E8F0',
            padding: '16px 24px 20px', animation: 'fadeUp 0.2s ease',
          }} className="mobile-menu">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '12px 0', fontSize: 15, fontWeight: 500,
                  color: '#374151', borderBottom: '1px solid #F1F5F9',
                  fontFamily: 'inherit',
                }}
              >{link.label}</button>
            ))}
            <button onClick={() => { setMenuOpen(false); onEnquire(); }}
              className="btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
              Enquire Now
            </button>
          </div>
        )}
      </nav>

      <style jsx>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
