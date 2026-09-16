import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Phone, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
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

      {/* Floating Primary Action Bar */}
      <aside
        aria-label="Quick Actions"
        className="floating-quick-bar"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <button
          onClick={onOpenBooking}
          title="Book an Appointment at Smile Dentos"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.68rem 1.45rem',
            borderRadius: 'var(--radius-pill)',
            border: '1.5px solid var(--color-lime)',
            backgroundColor: 'var(--color-lime)',
            color: 'var(--color-rust-dark)',
            fontFamily: 'var(--font-main)',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            boxShadow: '0 8px 24px rgba(215, 248, 70, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(215, 248, 70, 0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(215, 248, 70, 0.4)';
          }}
        >
          <Calendar size={15} />
          <span>BOOK APPOINTMENT</span>
        </button>

        {/* Subtle companion status badge: Valanchery Clinic */}
        <div
          className="desktop-status-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.1rem',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(30, 18, 13, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 0.92)',
            fontFamily: 'var(--font-main)',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.03em',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-lime)',
              boxShadow: '0 0 8px var(--color-lime)',
            }}
          />
          <span>Opens 10 AM · Valanchery</span>
        </div>
      </aside>

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
