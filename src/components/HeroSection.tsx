import React from 'react';
import { motion } from 'framer-motion';
import { RotatingBadge } from './RotatingBadge';

interface HeroSectionProps {
  onOpenBooking?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingTop: 'clamp(6rem, 12vw, 8rem)',
        paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
        overflow: 'hidden',
        backgroundColor: '#1E120D',
      }}
    >
      {/* Background Macro Smile Image with Subtle Cinematic Zoom (Keyframe 02) */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/images/hero_smile_macro.jpg"
          alt="Gentle Dental Care Smile"
          className="hero-bg-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            filter: 'contrast(1.02) brightness(0.96)',
          }}
        />
        {/* Subtle Vignette & Gradient for Perfect Typography Contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to bottom, rgba(14, 10, 8, 0.38) 0%, rgba(14, 10, 8, 0.08) 30%, rgba(14, 10, 8, 0.45) 65%, rgba(14, 10, 8, 0.88) 100%),
              radial-gradient(ellipse at center, transparent 40%, rgba(14, 10, 8, 0.5) 100%)
            `,
          }}
        />
      </motion.div>

      {/* Hero Bottom Content Grid */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
          className="hero-bottom-container"
        >
          {/* Bottom-Left: Display Headline & Google Rating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: '1 1 420px', maxWidth: '100%' }}
          >
            {/* 5.0 Google Trust Badge */}
            <a
              href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQvq_-tO-WAxUAAAAAHQAAAAAQBQ..i&pvq=Cg0vZy8xMXk4NGczOHdfIicKIXNtaWxlIGRlbnRvcyBmYW1pbHkgZGVudGFsIGNsaW5pYxACGAM&lqi=CiFzbWlsZSBkZW50b3MgZmFtaWx5IGRlbnRhbCBjbGluaWNI_8aGx6C9gIAIWjcQABABEAIQAxAEGAAYARgCGAMYBCIhc21pbGUgZGVudG9zIGZhbWlseSBkZW50YWwgY2xpbmljkgEHZGVudGlzdA&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba7b70c7574ba2b:0x724a06ff017fd89b"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 13px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 255, 255, 0.14)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                marginBottom: 'clamp(0.85rem, 2vw, 1.25rem)',
                textDecoration: 'none',
                maxWidth: '100%',
                flexWrap: 'wrap',
                transition: 'transform 0.2s, background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
              }}
            >
              <div style={{ display: 'flex', gap: '2px', color: '#F8D12D', fontSize: '0.85rem' }}>
                ★★★★★
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-white)', fontFamily: 'var(--font-main)' }}>
                5.0 (39 Google Reviews)
              </span>
              <span style={{ color: 'var(--color-lime)', fontSize: '0.75rem' }}>•</span>
              <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.92)', fontFamily: 'var(--font-main)' }}>
                Valanchery
              </span>
            </a>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.6rem, 7.2vw, 7.8rem)',
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: '-0.035em',
                color: 'var(--color-white)',
                textShadow: '0 4px 20px rgba(0,0,0,0.4)',
                margin: 0,
                wordBreak: 'break-word',
              }}
            >
              Gentle<br />Dental Care
            </h1>
          </motion.div>

          {/* Bottom-Right: Rotating Circular Badge & Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              textAlign: 'right',
              gap: '1.25rem',
              flex: '0 1 380px',
            }}
            className="hero-right-col"
          >
            {/* The Signature Neon Lime Badge */}
            <div className="hero-rotating-badge float-slow">
              <RotatingBadge size={114} />
            </div>

            {/* Editorial Paragraph */}
            <p
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)',
                lineHeight: 1.55,
                color: 'rgba(255, 255, 255, 0.92)',
                maxWidth: '380px',
                fontWeight: 400,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                margin: 0,
              }}
            >
              Smile Dentos Family Dental Clinic is dedicated to exceptional oral health in Valanchery. Providing gentle treatments, experienced doctors, and state-of-the-art care.
            </p>

            {/* Direct Mobile/Tablet Action Buttons */}
            <div className="hero-mobile-cta" style={{ display: 'none', gap: '0.75rem', width: '100%', marginTop: '0.35rem' }}>
              <button
                onClick={onOpenBooking}
                style={{
                  flex: 1.2,
                  backgroundColor: 'var(--color-lime)',
                  color: 'var(--color-rust-dark)',
                  padding: '0.82rem 1.4rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-main)',
                  letterSpacing: '0.04em',
                  boxShadow: '0 8px 24px rgba(215, 248, 70, 0.4)',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                Book Appointment
              </button>
              <a
                href="tel:09495964737"
                style={{
                  flex: 0.9,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.82rem 1.1rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid rgba(255, 255, 255, 0.35)',
                  backgroundColor: 'rgba(30, 18, 13, 0.7)',
                  backdropFilter: 'blur(10px)',
                  color: 'var(--color-white)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-main)',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Call Clinic
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-bg-img {
            object-position: center 25% !important;
          }
          .hero-bottom-container {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .hero-right-col {
            align-items: flex-start !important;
            text-align: left !important;
            width: 100% !important;
            flex: 1 1 auto !important;
            gap: 1rem !important;
          }
          .hero-rotating-badge {
            transform: scale(0.82);
            transform-origin: left center;
            margin-bottom: -0.5rem;
          }
          .hero-mobile-cta {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};
