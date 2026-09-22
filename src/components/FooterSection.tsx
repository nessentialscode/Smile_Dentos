import React from 'react';
import { motion } from 'framer-motion';

interface FooterSectionProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenBooking }) => {

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#0038A2',
        color: '#FFFFFF',
        paddingTop: 'clamp(5rem, 8vw, 8rem)',
        paddingBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Top Call to Action Banner */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 'clamp(4rem, 7vw, 6.5rem)'
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 6vw, 5.8rem)',
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: '-0.035em',
              color: '#FFFFFF',
              marginBottom: '1.75rem'
            }}
          >
            Book appointment today
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={onOpenBooking}
            style={{
              backgroundColor: 'var(--color-teal-500)',
              color: '#FFFFFF',
              padding: '1rem 2.8rem',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-main)',
              fontSize: '1.05rem',
              fontWeight: 700,
              letterSpacing: '0.01em',
              boxShadow: '0 10px 30px rgba(1, 158, 162, 0.35)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(1, 158, 162, 0.45)';
              e.currentTarget.style.backgroundColor = 'var(--color-teal-600)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(1, 158, 162, 0.35)';
              e.currentTarget.style.backgroundColor = 'var(--color-teal-500)';
            }}
          >
            Get Appointment Now
          </motion.button>
        </div>

        {/* Directory Grid with Thin Border Separator */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1.3fr) minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: '2.5rem',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)'
          }}
          className="footer-directory-grid"
        >
          {/* Brand Logo & Google Rating */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="#hero"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 3.5vw, 3.2rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                Smile Dentos
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: 'rgba(255, 255, 255, 0.75)',
                  textTransform: 'uppercase',
                  opacity: 0.95,
                }}
              >
                Family Dental Clinic
              </span>
            </a>

            {/* Rating pill */}
            <a
              href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQvq_-tO-WAxUAAAAAHQAAAAAQBQ..i&pvq=Cg0vZy8xMXk4NGczOHdfIicKIXNtaWxlIGRlbnRvcyBmYW1pbHkgZGVudGFsIGNsaW5pYxACGAM&lqi=CiFzbWlsZSBkZW50b3MgZmFtaWx5IGRlbnRhbCBjbGluaWNI_8aGx6C9gIAIWjcQABABEAIQAxAEGAAYARgCGAMYBCIhc21pbGUgZGVudG9zIGZhbWlseSBkZW50YWwgY2xpbmljkgEHZGVudGlzdA&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba7b70c7574ba2b:0x724a06ff017fd89b"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                width: 'fit-content',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: '#F59E0B', fontWeight: 800, fontSize: '0.85rem' }}>★ 5.0</span>
              <span style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 600 }}>39 Google Reviews</span>
            </a>

            <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.78)', lineHeight: 1.5, margin: 0 }}>
              Specialized gentle dental care for kids, teenagers, and adults in Valanchery.
            </p>
          </div>

          {/* Column 1: Clinic Branches & Hours */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1.1rem'
              }}
            >
              Clinic Branches
            </h4>

            {/* Valanchery */}
            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                📍 Valanchery (Main Clinic)
              </div>
              <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.82rem', lineHeight: 1.45, color: 'rgba(255, 255, 255, 0.78)', margin: '2px 0 4px' }}>
                Perinthalmanna Rd, opp. Hamad Lab, Kolamangalam
              </p>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>
                Mon – Sat: 10:00 AM – 6:30 PM
              </div>
            </div>

            {/* Edayoor */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                📍 Edayoor Branch
              </div>
              <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.82rem', lineHeight: 1.45, color: 'rgba(255, 255, 255, 0.78)', margin: '2px 0 4px' }}>
                Madathil Complex, opp. Kerala Gramin Bank, Mavandiyoor
              </p>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>
                Mon – Sat: 9:30 AM – 6:00 PM
              </div>
            </div>

            <a
              href="#branches"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-main)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--color-teal-300)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-teal-300)';
              }}
            >
              View Both Branches & Directions ↗
            </a>
          </div>

          {/* Column 2: Direct Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1.1rem'
              }}
            >
              Direct Contacts
            </h4>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.78)', marginBottom: '0.15rem' }}>
                Valanchery Main Line:
              </div>
              <a
                href="tel:09495964737"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-teal-300)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                094959 64737
              </a>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.78)', marginBottom: '0.15rem' }}>
                Edayoor Clinic Line:
              </div>
              <a
                href="tel:09778464737"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-teal-300)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                097784 64737
              </a>
            </div>

            {/* Consultation Mode: In-person Clinic Only */}
            <div>
              <h5
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '0.6rem'
                }}
              >
                Consultation Mode
              </h5>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.42rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--color-teal-400)',
                  backgroundColor: 'rgba(1, 158, 162, 0.2)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.82rem',
                  fontWeight: 700
                }}
              >
                <span>🏥</span>
                <span>In-person Clinic Consultation Only</span>
              </div>
            </div>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1.25rem'
              }}
            >
              Treatments
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
              {['Dental fillings', 'Root canal treatment', 'Teeth whitening', 'Dental implants', 'Orthodontic braces'].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.9rem',
                      color: 'rgba(255, 255, 255, 0.78)',
                      transition: 'color 0.2s ease, transform 0.2s ease',
                      display: 'inline-block',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-teal-300)';
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.78)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-main)',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.65)',
          }}
          className="footer-bottom-bar"
        >
          <div>© Smile Dentos Family Dental Clinic. All Rights Reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a
              href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQvq_-tO-WAxUAAAAAHQAAAAAQBQ..i&pvq=Cg0vZy8xMXk4NGczOHdfIicKIXNtaWxlIGRlbnRvcyBmYW1pbHkgZGVudGFsIGNsaW5pYxACGAM&lqi=CiFzbWlsZSBkZW50b3MgZmFtaWx5IGRlbnRhbCBjbGluaWNI_8aGx6C9gIAIWjcQABABEAIQAxAEGAAYARgCGAMYBCIhc21pbGUgZGVudG9zIGZhbWlseSBkZW50YWwgY2xpbmljkgEHZGVudGlzdA&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba7b70c7574ba2b:0x724a06ff017fd89b"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none', color: '#FFFFFF', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-teal-300)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
            >
              Valanchery, Malappuram, Kerala
            </a>
            <a
              href="#footer"
              style={{ textDecoration: 'none', color: '#FFFFFF', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-teal-300)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
            >
              Terms & Care Policies
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-directory-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 580px) {
          .footer-directory-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            gap: 0.75rem !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
};
