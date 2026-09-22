import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'SERVICES', href: '#services' },
    { name: 'SPECIALISTS', href: '#specialists' },
    { name: 'BRANCHES', href: '#branches' },
    { name: 'REVIEWS', href: '#reviews' },
    { name: 'CONTACT', href: '#footer' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease',
          padding: scrolled ? '0.75rem 0' : '1.15rem 0',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-neutral-200)' : 'none',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.06)' : 'none',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              width: '100%',
            }}
          >
            {/* Left: Brand Logo 'Smile Dentos' */}
            <a
              href="#hero"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              aria-label="Smile Dentos Home"
            >
              <img
                src="/images/smile_dentos_logo.png"
                alt="Smile Dentos Family Dental Care"
                style={{
                  height: scrolled ? 'clamp(46px, 4.4vw, 64px)' : 'clamp(52px, 5.2vw, 80px)',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  transition: 'height 0.3s ease',
                }}
              />
            </a>

            {/* Desktop Nav Links + Phone quick pill */}
            <nav
              className="desktop-nav"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1.15rem, 1.7vw, 2rem)',
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(0.82rem, 0.88vw, 0.92rem)',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: 'var(--color-neutral-700)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease, transform 0.2s ease',
                    padding: '4px 0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-brand-500)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-neutral-700)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {link.name}
                </a>
              ))}

              <a
                href="tel:09495964737"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.52rem 1.15rem',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-teal-500)',
                  border: 'none',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(1, 158, 162, 0.35)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-teal-600)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(1, 158, 162, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-teal-500)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(1, 158, 162, 0.35)';
                }}
              >
                <Phone size={14} color="#FFFFFF" strokeWidth={2.4} />
                <span style={{ color: '#FFFFFF' }}>094959 64737</span>
              </a>

              {/* WhatsApp Contact Button (Desktop mode only) */}
              <a
                href="https://wa.me/919495964737?text=Hello%20Smile%20Dentos%2C%20I%20would%20like%20to%20inquire%20about%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact through WhatsApp"
                title="Chat on WhatsApp: 094959 64737"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 211, 102, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.35)';
                }}
              >
                <WhatsAppIcon size={19} />
              </a>
            </nav>

            {/* Mobile Header Right Actions (Phone Icon + Hamburger) */}
            <div className="mobile-actions-group" style={{ display: 'none', alignItems: 'center', gap: '0.6rem' }}>
              <a
                href="tel:09495964737"
                aria-label="Call Smile Dentos Clinic"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-teal-500)',
                  border: 'none',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(1, 158, 162, 0.35)',
                  textDecoration: 'none',
                }}
              >
                <Phone size={17} color="#FFFFFF" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '5px',
                  padding: '8px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '26px',
                    height: '2.5px',
                    backgroundColor: 'var(--color-neutral-800)',
                    borderRadius: '2px',
                    transition: 'transform 0.3s ease',
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: '26px',
                    height: '2.5px',
                    backgroundColor: 'var(--color-neutral-800)',
                    borderRadius: '2px',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>



      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              zIndex: 999,
              padding: '5.5rem 2rem 3rem',
              borderBottom: '1px solid var(--color-neutral-200)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
            }}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                color: 'var(--color-neutral-800)',
                padding: '8px',
                cursor: 'pointer',
              }}
            >
              <X size={28} />
            </button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: 'var(--color-neutral-800)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brand-500)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-neutral-800)')}
                >
                  {link.name}
                </a>
              ))}
              <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-teal-500)', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', maxWidth: '290px' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  style={{
                    backgroundColor: 'var(--color-brand-500)',
                    color: '#FFFFFF',
                    padding: '0.85rem 2rem',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    width: '100%',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(31, 95, 212, 0.35)',
                  }}
                >
                  Book Appointment
                </button>
                <a
                  href="tel:09495964737"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--color-teal-50)',
                    border: '1px solid var(--color-teal-300)',
                    color: 'var(--color-teal-700)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={16} />
                  <span>Call: 094959 64737</span>
                </a>
                <a
                  href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQvq_-tO-WAxUAAAAAHQAAAAAQBQ..i&pvq=Cg0vZy8xMXk4NGczOHdfIicKIXNtaWxlIGRlbnRvcyBmYW1pbHkgZGVudGFsIGNsaW5pYxACGAM&lqi=CiFzbWlsZSBkZW50b3MgZmFtaWx5IGRlbnRhbCBjbGluaWNI_8aGx6C9gIAIWjcQABABEAIQAxAEGAAYARgCGAMYBCIhc21pbGUgZGVudG9zIGZhbWlseSBkZW50YWwgY2xpbmljkgEHZGVudGlzdA&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba7b70c7574ba2b:0x724a06ff017fd89b"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-neutral-200)',
                    color: 'var(--color-neutral-700)',
                    padding: '0.7rem 1.5rem',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                  }}
                >
                  <MapPin size={15} />
                  <span>Valanchery, Kerala</span>
                </a>

                {onOpenAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      border: '1px solid var(--color-neutral-200)',
                      backgroundColor: 'var(--color-brand-50)',
                      color: 'var(--color-brand-600)',
                      padding: '0.7rem 1.5rem',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>Admin Panel</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-actions-group {
            display: flex !important;
          }
        }
        @media (max-width: 680px) {
          .desktop-status-pill {
            display: none !important;
          }
          .floating-quick-bar {
            left: 50% !important;
            transform: translateX(-50%) !important;
            bottom: calc(14px + env(safe-area-inset-bottom, 0px)) !important;
            width: calc(100% - 32px) !important;
            max-width: 360px !important;
            justify-content: center !important;
          }
          .floating-quick-bar button {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.75rem 1.4rem !important;
          }
        }
      `}</style>
    </>
  );
};
