import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FooterSectionProps {
  onOpenBooking: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenBooking }) => {
  const [consultationType, setConsultationType] = useState<'Online' | 'In-person'>('Online');

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: 'var(--color-lime)',
        color: '#4A1D11',
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
              color: '#4A1D11',
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
              backgroundColor: '#5E2614',
              color: 'var(--color-white)',
              padding: '1rem 2.8rem',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-main)',
              fontSize: '1.05rem',
              fontWeight: 700,
              letterSpacing: '0.01em',
              boxShadow: '0 10px 30px rgba(74, 29, 17, 0.25)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(74, 29, 17, 0.4)';
              e.currentTarget.style.backgroundColor = '#43170B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(74, 29, 17, 0.25)';
              e.currentTarget.style.backgroundColor = '#5E2614';
            }}
          >
            Get Appointment Now
          </motion.button>
        </div>

        {/* Directory Grid with Thin Border Separator */}
        <div
          style={{
            borderTop: '1px solid rgba(74, 29, 17, 0.25)',
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
                  color: '#4A1D11',
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
                  color: '#4A1D11',
                  textTransform: 'uppercase',
                  opacity: 0.9,
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
                backgroundColor: 'rgba(74, 29, 17, 0.1)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(74, 29, 17, 0.2)',
                width: 'fit-content',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: '#4A1D11', fontWeight: 800, fontSize: '0.85rem' }}>★ 5.0</span>
              <span style={{ color: '#4A1D11', fontSize: '0.8rem', fontWeight: 600 }}>39 Google Reviews</span>
            </a>

            <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.88rem', color: '#4A1D11', opacity: 0.85, lineHeight: 1.5, margin: 0 }}>
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
                color: '#4A1D11',
                marginBottom: '1.1rem'
              }}
            >
              Clinic Branches
            </h4>
            
            {/* Valanchery */}
            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.85rem', fontWeight: 700, color: '#4A1D11' }}>
                📍 Valanchery (Main Clinic)
              </div>
              <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.82rem', lineHeight: 1.45, color: '#4A1D11', opacity: 0.88, margin: '2px 0 4px' }}>
                Perinthalmanna Rd, opp. Hamad Lab, Kolamangalam
              </p>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', color: '#4A1D11', fontWeight: 600, opacity: 0.85 }}>
                Mon – Sat: 10:00 AM – 6:30 PM
              </div>
            </div>

            {/* Edayoor */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.85rem', fontWeight: 700, color: '#4A1D11' }}>
                📍 Edayoor Branch
              </div>
              <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.82rem', lineHeight: 1.45, color: '#4A1D11', opacity: 0.88, margin: '2px 0 4px' }}>
                Madathil Complex, opp. Kerala Gramin Bank, Mavandiyoor
              </p>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', color: '#4A1D11', fontWeight: 600, opacity: 0.85 }}>
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
                color: '#4A1D11',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
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
                color: '#4A1D11',
                marginBottom: '1.1rem'
              }}
            >
              Direct Contacts
            </h4>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', color: '#4A1D11', opacity: 0.8, marginBottom: '0.15rem' }}>
                Valanchery Main Line:
              </div>
              <a
                href="tel:09495964737"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#4A1D11',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                094959 64737
              </a>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.78rem', color: '#4A1D11', opacity: 0.8, marginBottom: '0.15rem' }}>
                Edayoor Clinic Line:
              </div>
              <a
                href="tel:09778464737"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#4A1D11',
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                097784 64737
              </a>
            </div>

            {/* Free Consultation Interactive Selector */}
            <div>
              <h5
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#4A1D11',
                  marginBottom: '0.6rem'
                }}
              >
                Free Consultation Mode
              </h5>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['In-person', 'Online'] as const).map((type) => {
                  const isSelected = consultationType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setConsultationType(type)}
                      style={{
                        padding: '0.4rem 1.1rem',
                        borderRadius: 'var(--radius-pill)',
                        border: '1.5px solid #4A1D11',
                        backgroundColor: isSelected ? '#4A1D11' : 'transparent',
                        color: isSelected ? 'var(--color-lime)' : '#4A1D11',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {type}
                    </button>
                  );
                })}
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
                color: '#4A1D11',
                marginBottom: '1.25rem'
              }}
            >
              Treatments
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['Dental fillings', 'Root canal treatment', 'Teeth whitening', 'Dental implants', 'Orthodontic braces'].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.9rem',
                      color: '#4A1D11',
                      opacity: 0.85,
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.85';
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
            borderTop: '1px solid rgba(74, 29, 17, 0.18)',
            paddingTop: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-main)',
            fontSize: '0.85rem',
            color: '#4A1D11',
            opacity: 0.85
          }}
          className="footer-bottom-bar"
        >
          <div>© Smile Dentos Family Dental Clinic. All Rights Reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQvq_-tO-WAxUAAAAAHQAAAAAQBQ..i&pvq=Cg0vZy8xMXk4NGczOHdfIicKIXNtaWxlIGRlbnRvcyBmYW1pbHkgZGVudGFsIGNsaW5pYxACGAM&lqi=CiFzbWlsZSBkZW50b3MgZmFtaWx5IGRlbnRhbCBjbGluaWNI_8aGx6C9gIAIWjcQABABEAIQAxAEGAAYARgCGAMYBCIhc21pbGUgZGVudG9zIGZhbWlseSBkZW50YWwgY2xpbmljkgEHZGVudGlzdA&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba7b70c7574ba2b:0x724a06ff017fd89b" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              Valanchery, Malappuram, Kerala
            </a>
            <a href="#footer" style={{ textDecoration: 'none' }}>
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
