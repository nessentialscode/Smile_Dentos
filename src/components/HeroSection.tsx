import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { RotatingBadge } from './RotatingBadge';
import { WhatsAppIcon } from './WhatsAppIcon';

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
        backgroundColor: '#FFFFFF',
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
          {/* Bottom-Left: Display Headline & Spinning Logo at Left End */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: '1 1 420px', maxWidth: '100%' }}
            className="hero-title-col"
          >
            <h1
              className="hero-main-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.3rem, 8.8vw, 8.6rem)',
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: '-0.035em',
                color: 'var(--color-white)',
                margin: 0,
                wordBreak: 'break-word',
              }}
            >
              Gentle<br />
              <span className="hero-title-line2" style={{ whiteSpace: 'nowrap' }}>Dental <span className="hero-highlight-word" style={{ color: 'var(--color-teal-500)' }}>Clinic</span></span>
            </h1>
          </motion.div>

          {/* Bottom-Right: Subtext & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              gap: '1.25rem',
              flex: '0 1 380px',
            }}
            className="hero-right-col"
          >
            {/* The Smile Dentos Spinning Logo Badge moved to right end (end of the black text) */}
            <div
              className="hero-rotating-badge"
              style={{
                alignSelf: 'flex-end',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <RotatingBadge size={114} />
            </div>

            {/* Editorial Paragraph */}
            <p
              className="hero-editorial-p"
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)',
                lineHeight: 1.55,
                color: '#18181B',
                maxWidth: '380px',
                fontWeight: 600,
                textAlign: 'left',
                margin: 0,
              }}
            >
              Smile Dentos Family Dental Clinic is dedicated to exceptional oral health in Valanchery. Providing gentle treatments, experienced doctors, and state-of-the-art care.
            </p>

            {/* Desktop Action Buttons (Matching Reference Image 1) */}
            <div
              className="hero-desktop-cta"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.85rem',
                width: '100%',
                marginTop: '0.4rem',
              }}
            >
              <button
                type="button"
                onClick={onOpenBooking}
                aria-label="Book Appointment"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#16AC8F',
                  color: '#FFFFFF',
                  padding: '0.78rem 1.4rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-main)',
                  letterSpacing: '0.03em',
                  boxShadow: '0 6px 20px rgba(22, 172, 143, 0.35)',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#128C74';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 172, 143, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#16AC8F';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(22, 172, 143, 0.35)';
                }}
              >
                <Calendar size={16} strokeWidth={2.4} />
                <span>Book Appointment</span>
              </button>

              <a
                href="https://wa.me/919495964737?text=Hello%20Smile%20Dentos%2C%20I%20would%20like%20to%20inquire%20about%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact on WhatsApp"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#FFFFFF',
                  color: '#16AC8F',
                  padding: '0.78rem 1.25rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-main)',
                  letterSpacing: '0.02em',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  border: '1.5px solid #16AC8F',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(22, 172, 143, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <WhatsAppIcon size={16} color="#16AC8F" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Direct Mobile/Tablet Action Buttons */}
            <div className="hero-mobile-cta" style={{ display: 'none', gap: '0.75rem', width: '100%', marginTop: '0.35rem' }}>
              <button
                type="button"
                onClick={onOpenBooking}
                aria-label="Book Appointment"
                style={{
                  flex: 1.2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  backgroundColor: '#16AC8F',
                  color: '#FFFFFF',
                  padding: '0.82rem 1.2rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-main)',
                  letterSpacing: '0.04em',
                  boxShadow: '0 8px 24px rgba(22, 172, 143, 0.35)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  border: 'none',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#128C74';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#16AC8F';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Calendar size={17} strokeWidth={2.4} />
                <span>Book Appointment</span>
              </button>
              <a
                href="https://wa.me/919495964737?text=Hello%20Smile%20Dentos%2C%20I%20would%20like%20to%20inquire%20about%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact on WhatsApp"
                style={{
                  flex: 0.9,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  backgroundColor: '#FFFFFF',
                  color: '#16AC8F',
                  border: '1.5px solid #16AC8F',
                  padding: '0.82rem 1.1rem',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-main)',
                  letterSpacing: '0.02em',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(22, 172, 143, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <WhatsAppIcon size={17} color="#16AC8F" />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        #hero {
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F6F4 40%, rgba(232, 242, 239, 0.6) 100%) !important;
        }
        .hero-main-title {
          color: #273F5F !important;
        }
        .hero-highlight-word {
          color: #16AC8F !important;
        }
        .hero-editorial-p {
          color: #273F5F !important;
        }

        @media (min-width: 769px) {
          .hero-desktop-cta {
            display: flex !important;
          }
        }

        @media (max-width: 768px) {
          #hero {
            padding-bottom: clamp(1.5rem, 5vw, 2.25rem) !important;
          }
          .hero-bg-img {
            object-position: center 25% !important;
          }
          .hero-bottom-container {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: clamp(0.9rem, 2.8vw, 1.25rem) !important;
          }
          .hero-title-col {
            flex: 0 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .hero-main-title {
            font-size: clamp(3.2rem, 13vw, 5.2rem) !important;
            line-height: 0.94 !important;
            letter-spacing: -0.04em !important;
            font-weight: 800 !important;
            color: #273F5F !important;
            text-shadow: none !important;
            margin: 0 0 0.85rem 0 !important;
            word-break: normal !important;
          }
          .hero-title-line2 {
            white-space: normal !important;
          }
          .hero-right-col {
            align-items: flex-start !important;
            text-align: left !important;
            width: 100% !important;
            flex: 0 0 auto !important;
            gap: 0.75rem !important;
          }
          .hero-rotating-badge {
            display: none !important;
          }
          .hero-mobile-cta {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
};
