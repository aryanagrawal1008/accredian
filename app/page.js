'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Partners from '../components/Partners';
import AccredianEdge from '../components/AccredianEdge';
import DomainExpertise from '../components/DomainExpertise';
import CourseSegmentation from '../components/CourseSegmentation';
import WhoShouldJoin from '../components/WhoShouldJoin';
import CATFramework from '../components/CATFramework';
import HowWeDeliver from '../components/HowWeDeliver';
import FAQs from '../components/FAQs';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';
import EnquireModal from '../components/EnquireModal';
import Chatbot from '../components/Chatbot';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      id="scroll-to-top-btn"
      onClick={scrollUp}
      aria-label="Scroll to top"
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 998,
        width: 44, height: 44, borderRadius: '50%',
        background: '#1565C0', color: 'white',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(21,101,192,0.35)',
        fontSize: 20, fontWeight: 700,
        transition: 'all 0.2s',
        animation: 'fadeUp 0.3s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#0D47A1'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#1565C0'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      ↑
    </button>
  );
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar onEnquire={() => setShowModal(true)} />

      {/* Soft blue page gradient — matches reference */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1,
        background: 'linear-gradient(to bottom, #EEF5FF 0%, #FFFFFF 25%, #FFFFFF 75%, #F0F4FF 100%)',
        pointerEvents: 'none',
      }} />

      <main style={{ paddingTop: 64 }}>
        <Hero onEnquire={() => setShowModal(true)} />
        <Stats />
        <Partners />
        <AccredianEdge />
        <DomainExpertise />
        <CourseSegmentation />
        <WhoShouldJoin />
        <CATFramework />
        <HowWeDeliver />
        <FAQs />
        {/* Add id for testimonials nav tracking */}
        <div id="testimonials">
          <Testimonials />
        </div>
        <CTABanner onEnquire={() => setShowModal(true)} />
      </main>

      <Footer onEnquire={() => setShowModal(true)} />

      <Chatbot />
      <ScrollToTop />

      {showModal && <EnquireModal onClose={() => setShowModal(false)} />}
    </>
  );
}
