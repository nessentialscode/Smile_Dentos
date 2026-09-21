import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MapPin, Shield } from 'lucide-react';
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
          transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease, padding 0.35s ease',
          padding: scrolled ? '0.75rem 0' : '1.15rem 0',
          backgroundColor: scrolled ? 'rgba(74, 31, 16, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
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
                    color: 'var(--color-white)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    padding: '4px 0',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-lime)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
                >
                  {link.name}
                </a>
              ))}

              <a
                href="tel:09495964737"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'rgba(215, 248, 70, 0.15)',
                  border: '1px solid var(--color-lime)',
                  color: 'var(--color-lime)',
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-lime)';
                  e.currentTarget.style.color = 'var(--color-rust-dark)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(215, 248, 70, 0.15)';
                  e.currentTarget.style.color = 'var(--color-lime)';
                }}
              >
                <Phone size={13} />
                <span>094959 64737</span>
              </a>

              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-pill, 999px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.28)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-main, sans-serif)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-lime, #D7F846)';
                    e.currentTarget.style.color = '#3B180D';
                    e.currentTarget.style.borderColor = 'var(--color-lime, #D7F846)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                  }}
                  title="Smile Dentos Admin Portal"
                >
                  <span>Admin</span>
                </button>
              )}

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
                  backgroundColor: 'rgba(215, 248, 70, 0.15)',
                  border: '1.5px solid var(--color-lime)',
                  color: 'var(--color-lime)',
                  textDecoration: 'none',
                }}
              >
                <Phone size={17} />
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
                    backgroundColor: 'var(--color-white)',
                    borderRadius: '2px',
                    transition: 'transform 0.3s ease',
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: '26px',
                    height: '2.5px',
                    backgroundColor: 'var(--color-white)',
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(94, 38, 20, 0.98)',
              backdropFilter: 'blur(24px)',
              zIndex: 999,
              padding: '5.5rem 2rem 3rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            }}
          >
            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                aria-label="Admin Portal"
                title="Admin Authentication Panel"
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '1.5rem',
                  color: 'var(--color-white)',
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  border: '1.5px solid rgba(255, 255, 255, 0.28)',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                <Shield size={20} />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                color: 'var(--color-white)',
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
                    color: 'var(--color-white)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-lime)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
                >
                  {link.name}
                </a>
              ))}
              <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-lime)', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', maxWidth: '290px' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  style={{
                    backgroundColor: 'var(--color-lime)',
                    color: 'var(--color-rust-dark)',
                    padding: '0.85rem 2rem',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    width: '100%',
                    cursor: 'pointer',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid var(--color-lime)',
                    color: 'var(--color-lime)',
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
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: 'var(--color-white)',
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
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      padding: '0.7rem 1.5rem',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      width: '100%',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Shield size={16} />
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
