import React from 'react';
import { motion } from 'framer-motion';

interface TransformSectionProps {
  onOpenBooking: () => void;
}

export const TransformSection: React.FC<TransformSectionProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="about"
      style={{
        backgroundColor: '#0038A2',
        paddingTop: 'clamp(5rem, 9vw, 9rem)',
        paddingBottom: 'clamp(5rem, 9vw, 9rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Main Display Headline with Masked Entrance Reveal (Keyframes 03–04) */}
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(2.5rem, 5vw, 5.5rem)' }}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 5.8vw, 5.6rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              maxWidth: '1200px',
              margin: 0,
              wordBreak: 'break-word',
            }}
          >
            Transform Your Smile
            <br />
            {/* Starburst + with State-of-the */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-teal-300)',
                marginRight: '0.5rem',
              }}
            >
              {/* Crisp 8-spoke Asterism matching Reference Frame 04 */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ verticalAlign: 'middle' }}
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
              </svg>
            </span>
            <span>with State-of-the</span>
            <br />
            <span>art </span>
            <span style={{ color: 'var(--color-teal-300)' }}>Dental Care</span>
            {/* Inline Horizontal Capsule Aligner Pill (Strictly matching Frame 04) */}
            <span
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginLeft: 'clamp(0.4rem, 1.2vw, 0.85rem)',
                width: 'clamp(54px, 6.5vw, 84px)',
                height: 'clamp(28px, 3.5vw, 44px)',
                borderRadius: 'var(--radius-pill)',
                overflow: 'hidden',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                transform: 'translateY(-2px)',
              }}
            >
              <img
                src="/images/aligner_pill.jpg"
                alt="Clear aligner smile pill"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 40%',
                }}
              />
            </span>
          </motion.h2>
        </div>

        {/* Bottom Content Grid (Frame 04) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: '3rem',
            alignItems: 'end',
          }}
          className="transform-grid"
        >
          {/* Left spacer for editorial offset */}
          <div className="transform-left-spacer" />

          {/* Right Column: Paragraph, Divider Line & Clickable Phone CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.92)',
                fontWeight: 400,
                margin: 0,
              }}
            >
              Conveniently located on Perinthalmanna Road, opposite Hamad Lab & OBG Clinic in Kolamangalam, Valanchery. We offer comprehensive family dental care including dental fillings, root canal treatment, teeth whitening, orthodontics, and dental implants.
            </p>

            {/* Location & Timings highlight */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255, 255, 255, 0.88)',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-main)',
              }}
            >
              <span style={{ color: 'var(--color-teal-300)' }}>📍</span>
              <span>Opposite Hamad Lab & OBG Clinic, Kolamangalam, Valanchery</span>
            </div>

            {/* Separator Line */}
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.22)',
              }}
            />

            {/* Book Appointment Phone CTA */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.45rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <button
                  onClick={onOpenBooking}
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.9rem',
                    letterSpacing: '0.02em',
                    color: 'rgba(255, 255, 255, 0.85)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)')}
                >
                  Call Clinic Directly
                </button>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 600,
                  }}
                >
                  Mon – Sat · 10 AM – 6:30 PM
                </span>
              </div>
              <a
                href="tel:09495964737"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.7rem, 4.5vw, 2.5rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  textDecoration: 'underline',
                  textUnderlineOffset: '6px',
                  textDecorationThickness: '2px',
                  display: 'inline-block',
                  transition: 'color 0.2s ease, opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-teal-300)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              >
                094959 64737
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .transform-grid {
            grid-template-columns: 1fr !important;
          }
          .transform-left-spacer {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
