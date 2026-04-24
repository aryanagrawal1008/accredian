'use client';
import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hi there! I am your Accredian Enterprise learning advisor. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: `Sorry, I encountered an error: ${data.error || 'Please try again later.'}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Network error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: isOpen ? 24 : 88, // Sit above scroll-to-top if closed, or stay bottom if open
          right: 28,
          zIndex: 1000,
          width: 60, height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1565C0, #1A73E8)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(21,101,192,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isOpen ? 'scale(0)' : 'scale(1)',
          opacity: isOpen ? 0 : 1,
        }}
        aria-label="Open Chat"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      {/* Chat Window */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 28,
        zIndex: 1001,
        width: 360,
        height: 520,
        maxWidth: 'calc(100vw - 40px)',
        maxHeight: 'calc(100vh - 40px)',
        background: 'white',
        borderRadius: 20,
        boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transformOrigin: 'bottom right',
        transform: isOpen ? 'scale(1)' : 'scale(0.8)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1565C0, #1A73E8)',
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
            }}>
              🤖
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>AI Advisor</div>
              <div style={{ fontSize: 11, opacity: 0.8, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80' }}></span>
                Online
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none', border: 'none', color: 'white', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 4, opacity: 0.8, transition: 'opacity 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, padding: '20px 16px', overflowY: 'auto', background: '#F8FAFC',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.role === 'user' ? '#1565C0' : 'white',
                color: msg.role === 'user' ? 'white' : '#0F172A',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                border: msg.role === 'user' ? 'none' : '1px solid #E2E8F0',
                fontSize: 14, lineHeight: 1.5,
              }}>
                {msg.text}
              </div>
              <span style={{ fontSize: 10, color: '#94A3B8', marginTop: 6, margin: '0 4px' }}>
                {msg.role === 'user' ? 'You' : 'AI Advisor'}
              </span>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{
                padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
                background: 'white', border: '1px solid #E2E8F0',
                display: 'flex', gap: 4, alignItems: 'center'
              }}>
                <span className="dot-bounce" style={{ animationDelay: '0s' }}>•</span>
                <span className="dot-bounce" style={{ animationDelay: '0.2s' }}>•</span>
                <span className="dot-bounce" style={{ animationDelay: '0.4s' }}>•</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div style={{ padding: '16px', background: 'white', borderTop: '1px solid #E2E8F0' }}>
          <form onSubmit={sendMessage} style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={{
                flex: 1, padding: '12px 16px', borderRadius: 24,
                border: '1px solid #CBD5E1', background: '#F1F5F9',
                fontSize: 14, outline: 'none', transition: 'all 0.2s',
              }}
              onFocus={e => { e.target.style.background = 'white'; e.target.style.borderColor = '#93C5FD'; }}
              onBlur={e => { e.target.style.background = '#F1F5F9'; e.target.style.borderColor = '#CBD5E1'; }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                background: !input.trim() || isLoading ? '#E2E8F0' : '#1565C0',
                color: 'white', border: 'none', cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .dot-bounce {
          display: inline-block;
          animation: bounce 1s infinite ease-in-out;
          color: #94A3B8;
        }
      `}</style>
    </>
  );
}
