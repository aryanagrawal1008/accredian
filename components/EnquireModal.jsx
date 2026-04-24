'use client';
import { useState } from 'react';

export default function EnquireModal({ onClose }) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Close */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            width: 32, height: 32, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: '#64748B', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
          aria-label="Close modal"
        >
          ×
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: 72, height: 72, background: '#DCFCE7', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: 32,
            }}>✓</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>
              Enquiry Submitted!
            </h2>
            <p style={{ color: '#64748B', fontSize: 15, marginBottom: 28 }}>
              Thanks, <strong>{form.name}</strong>! Our team will reach out to <strong>{form.email}</strong> shortly.
            </p>
            <button className="btn-primary" onClick={onClose} style={{ margin: '0 auto' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 28 }}>
              <span className="title-chip">Get Started</span>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '8px 0 6px' }}>
                Enquire About Enterprise Training
              </h2>
              <p style={{ fontSize: 14, color: '#64748B' }}>
                Tell us about your organization and we'll tailor a program for you.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name *</label>
                  <input id="name" name="name" type="text" required className="form-input"
                    placeholder="John Smith" value={form.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="company">Company *</label>
                  <input id="company" name="company" type="text" required className="form-input"
                    placeholder="Acme Corp" value={form.company} onChange={handleChange} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Work Email *</label>
                  <input id="email" name="email" type="email" required className="form-input"
                    placeholder="john@acme.com" value={form.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" className="form-input"
                    placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" name="message" className="form-input form-textarea"
                  placeholder="Tell us about your training needs, team size, domains of interest..."
                  value={form.message} onChange={handleChange} />
              </div>

              {status === 'error' && (
                <p style={{ color: '#EF4444', fontSize: 13, marginBottom: 12 }}>⚠ {errorMsg}</p>
              )}

              <button
                id="submit-enquiry-btn"
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '13px 28px' }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)',
                      borderTopColor: 'white', borderRadius: '50%',
                      animation: 'spin 0.7s linear infinite', display: 'inline-block',
                    }} />
                    Submitting...
                  </span>
                ) : 'Submit Enquiry →'}
              </button>
            </form>
          </>
        )}
      </div>
      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 500px) {
          .modal-box { padding: 28px 20px !important; }
          form > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
