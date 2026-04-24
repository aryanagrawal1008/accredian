'use client';

const footerLinks = {
  'Accredian': [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Why Accredian', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press & Media', href: '#' },
  ],
};

const contactInfo = {
  title: 'Contact Us',
  email: 'enterprise@accredian.com',
  address: '4th Floor, 250, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana',
};

// Plain black social icons
function SocialIcon({ href, label, path, viewBox }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32,
        color: hovered ? '#1565C0' : '#374151',
        transition: 'color 0.2s',
        textDecoration: 'none',
      }}
    >
      <svg width="18" height="18" viewBox={viewBox || '0 0 24 24'} fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}

import { useState } from 'react';

export default function Footer({ onEnquire }) {
  const socials = [
    {
      label: 'Facebook', href: 'https://facebook.com',
      path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
    },
    {
      label: 'LinkedIn', href: 'https://linkedin.com',
      path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z'
    },
    {
      label: 'Twitter', href: 'https://twitter.com',
      path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'
    },
    {
      label: 'Instagram', href: 'https://instagram.com',
      path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z'
    },
    {
      label: 'YouTube', href: 'https://youtube.com',
      path: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z'
    },
  ];

  return (
    <footer style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
      {/* Top row: logo + socials + enquire btn */}
      <div className="container-max">
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '36px 0 24px', flexWrap: 'wrap', gap: 20,
        }}>
          {/* Logo */}
          <div>
            <a href="#home" style={{ textDecoration: 'none' }}>
              <div style={{ fontWeight: 900, fontSize: 22, color: '#1565C0', letterSpacing: -0.5 }}>
                accredian
              </div>
              <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: 0.3 }}>
                credentials that matter
              </div>
            </a>
          </div>

          {/* Social icons — plain black */}
          <div style={{ display: 'flex', gap: 4 }}>
            {socials.map(s => <SocialIcon key={s.label} {...s} />)}
          </div>

          {/* Enquire Now button — top right */}
          <div style={{ textAlign: 'right' }}>
            <button
              id="footer-enquire-btn"
              onClick={onEnquire}
              style={{
                background: '#1565C0', color: 'white',
                border: 'none', borderRadius: 8,
                padding: '11px 24px', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', display: 'block', marginBottom: 4,
                fontFamily: 'inherit', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#0D47A1'}
              onMouseLeave={e => e.currentTarget.style.background = '#1565C0'}
            >
              Enquire Now
            </button>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Speak with our Advisor</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#E2E8F0' }} />

        {/* Two-column links */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 40, padding: '32px 0 36px',
        }} className="footer-cols">
          {/* Accredian Links */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>
              Accredian
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {footerLinks['Accredian'].map(link => (
                <li key={link.label} style={{ marginBottom: 12 }}>
                  <a
                    href={link.href}
                    style={{ fontSize: 14, color: '#475569', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#1565C0'}
                    onMouseLeave={e => e.target.style.color = '#475569'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>
              Contact Us
            </h4>
            <p style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>
              Email us:{' '}
              <a href="mailto:enterprise@accredian.com" style={{ color: '#1565C0', textDecoration: 'none' }}>
                enterprise@accredian.com
              </a>
            </p>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
              Office Address: {contactInfo.address}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #E2E8F0',
          padding: '16px 0',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 13, color: '#94A3B8' }}>
            © {new Date().getFullYear()} Accredian A Brand of FullStack Education Pvt Ltd. All Rights Reserved
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
