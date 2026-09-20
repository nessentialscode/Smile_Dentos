import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink, Calendar } from 'lucide-react';

interface BranchesSectionProps {
  onOpenBooking: (branchName?: string) => void;
}

interface Branch {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  address: string;
  city: string;
  pincode: string;
  hours: string;
  openDays: string;
  phone: string;
  phoneDisplay: string;
  googleMapsUrl: string;
  image: string;
  status: 'Opened' | 'Closed';
}

const branches: Branch[] = [
  {
    id: 'valanchery',
    name: 'Valanchery Main Clinic',
    shortName: 'Valanchery',
    badge: 'Multi-Specialty Center',
    status: 'Opened',
    address: 'Perinthalmanna Road, opposite Hamad Lab & OBG Clinic',
    city: 'Valanchery, Malappuram, Kerala',
    pincode: '676552',
    hours: '10:00 AM – 6:30 PM',
    openDays: 'Monday – Saturday (Sunday Closed)',
    phone: '09633964787',
    phoneDisplay: '09633 964 787',
    googleMapsUrl:
      'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQvq_-tO-WAxUAAAAAHQAAAAAQBQ..i&pvq=Cg0vZy8xMXk4NGczOHdfIicKIXNtaWxlIGRlbnRvcyBmYW1pbHkgZGVudGFsIGNsaW5pYxACGAM&lqi=CiFzbWlsZSBkZW50b3MgZmFtaWx5IGRlbnRhbCBjbGluaWNI_8aGx6C9gIAIWjcQABABEAIQAxAEGAAYARgCGAMYBCIhc21pbGUgZGVudG9zIGZhbWlseSBkZW50YWwgY2xpbmljkgEHZGVudGlzdA&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba7b70c7574ba2b:0x724a06ff017fd89b',
    image: '/images/branch_valanchery.jpg',
  },
  {
    id: 'edayoor',
    name: 'Edayoor / Mavandiyoor Branch',
    shortName: 'Edayoor',
    badge: 'Multi-Speciality Suite',
    status: 'Closed',
    address: 'Madathil Complex, opposite Kerala Gramin Bank',
    city: 'Edayur, Malappuram, Kerala',
    pincode: '676552',
    hours: '9:30 AM – 6:00 PM',
    openDays: 'Monday – Saturday (Sunday Closed)',
    phone: '07514044867',
    phoneDisplay: '07514 044 867',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Smile+Dentos+Dental+Clinic+Madathil+Complex+Edayur+Kerala+676552',
    image: '/images/branch_edayoor.jpg',
  },
];

export const BranchesSection: React.FC<BranchesSectionProps> = ({ onOpenBooking }) => {
  const [activeBranchId, setActiveBranchId] = useState<string>('valanchery');

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  return (
    <section
      id="branches"
      style={{
        backgroundColor: 'var(--color-rust)',
        color: 'var(--color-white)',
        paddingTop: 'clamp(5.8rem, 7.8vw, 8.5rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '90px',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 3.5vw, 3rem)',
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-lime)',
              marginBottom: '0.65rem',
              display: 'inline-block',
            }}
          >
            OUR LOCATIONS
          </span>

          {/* Main Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              color: 'var(--color-white)',
              margin: '0 0 1.75rem 0',
            }}
          >
            Visit Our Branches
          </h2>

          {/* Refined Branch Selector */}
          <div
            role="tablist"
            aria-label="Clinic Branches"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(1.75rem, 3.5vw, 3.25rem)',
              position: 'relative',
            }}
          >
            {branches.map((branch) => {
              const isActive = branch.id === activeBranchId;
              return (
                <button
                  key={branch.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveBranchId(branch.id)}
                  style={{
                    position: 'relative',
                    padding: '0.5rem 0.25rem 0.85rem 0.25rem',
                    background: 'none',
                    border: 'none',
                    color: isActive ? 'var(--color-lime)' : 'rgba(255, 255, 255, 0.65)',
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-white)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span>{branch.shortName}</span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 7px',
                        borderRadius: '9999px',
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        backgroundColor:
                          branch.status === 'Opened'
                            ? 'rgba(34, 197, 94, 0.2)'
                            : 'rgba(239, 68, 68, 0.2)',
                        border:
                          branch.status === 'Opened'
                            ? '1px solid rgba(74, 222, 128, 0.45)'
                            : '1px solid rgba(248, 113, 113, 0.45)',
                        color: branch.status === 'Opened' ? '#86EFAC' : '#FCA5A5',
                        lineHeight: 1.2,
                      }}
                    >
                      <span
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          backgroundColor: branch.status === 'Opened' ? '#22C55E' : '#EF4444',
                          boxShadow: branch.status === 'Opened' ? '0 0 6px #22C55E' : '0 0 6px #EF4444',
                        }}
                      />
                      {branch.status}
                    </span>
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeBranchIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        backgroundColor: 'var(--color-lime)',
                        borderRadius: '2px',
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Showcase Composition: Large Dominant Clinic Photograph + Editorial Information */}
        <div
          className="branch-showcase-composition"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.95fr)',
            gap: 'clamp(2rem, 4vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Dominant Clinic Photograph (Occupies ~60% visual attention) */}
          <div
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              aspectRatio: '16 / 10',
              boxShadow: '0 24px 60px -15px rgba(0, 0, 0, 0.55)',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              border: '1.5px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeBranch.id}
                src={`${activeBranch.image}?v=3`}
                alt={activeBranch.name}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: activeBranch.id === 'valanchery' ? 'center 42%' : 'center 48%',
                  display: 'block',
                }}
              />
            </AnimatePresence>

            {/* Subtle Floating Branch Suite Tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(14, 10, 8, 0.72)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: 'var(--color-white)',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-main)',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-lime)',
                  display: 'inline-block',
                  boxShadow: '0 0 8px var(--color-lime)',
                }}
              />
              <span>{activeBranch.badge}</span>
            </div>
          </div>

          {/* Unified Branch Information Composition (Editorial & Airy) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBranch.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Branch Name & Status Small Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  marginBottom: '1.75rem',
                  flexWrap: 'wrap',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.9rem, 2.8vw, 2.75rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.2,
                    color: 'var(--color-white)',
                    margin: 0,
                  }}
                >
                  {activeBranch.name}
                </h3>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    backgroundColor:
                      activeBranch.status === 'Opened'
                        ? 'rgba(34, 197, 94, 0.18)'
                        : 'rgba(239, 68, 68, 0.18)',
                    border:
                      activeBranch.status === 'Opened'
                        ? '1px solid rgba(74, 222, 128, 0.5)'
                        : '1px solid rgba(248, 113, 113, 0.5)',
                    color: activeBranch.status === 'Opened' ? '#86EFAC' : '#FCA5A5',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: activeBranch.status === 'Opened' ? '#22C55E' : '#EF4444',
                      boxShadow: activeBranch.status === 'Opened' ? '0 0 8px #22C55E' : '0 0 8px #EF4444',
                    }}
                  />
                  {activeBranch.status}
                </span>
              </div>

              {/* Minimal Line Information Block */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.4rem',
                  marginBottom: '2.5rem',
                  borderLeft: '2px solid rgba(215, 248, 70, 0.4)',
                  paddingLeft: '1.5rem',
                }}
              >
                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <MapPin
                    size={20}
                    color="var(--color-lime)"
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '1rem',
                        color: 'var(--color-white)',
                        fontWeight: 600,
                        lineHeight: 1.45,
                        margin: 0,
                      }}
                    >
                      {activeBranch.address}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.88rem',
                        color: 'rgba(255, 255, 255, 0.72)',
                        margin: '0.25rem 0 0 0',
                      }}
                    >
                      {activeBranch.city} — {activeBranch.pincode}
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <Clock
                    size={20}
                    color="var(--color-lime)"
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '1rem',
                        color: 'var(--color-white)',
                        fontWeight: 600,
                        lineHeight: 1.45,
                        margin: 0,
                      }}
                    >
                      {activeBranch.hours}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.88rem',
                        color: 'rgba(255, 255, 255, 0.72)',
                        margin: '0.25rem 0 0 0',
                      }}
                    >
                      {activeBranch.openDays}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <Phone
                    size={20}
                    color="var(--color-lime)"
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  />
                  <div>
                    <a
                      href={`tel:${activeBranch.phone}`}
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '1.05rem',
                        color: 'var(--color-white)',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-lime)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
                    >
                      {activeBranch.phoneDisplay}
                    </a>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.82rem',
                        color: 'rgba(255, 255, 255, 0.65)',
                        margin: '0.15rem 0 0 0',
                      }}
                    >
                      Direct clinic line & appointment inquiries
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Book at This Branch + Get Directions */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
                className="branch-cta-row"
              >
                {/* Primary CTA */}
                <button
                  onClick={() => onOpenBooking(activeBranch.name)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--color-lime)',
                    color: 'var(--color-rust-dark)',
                    padding: '0.95rem 1.85rem',
                    borderRadius: 'var(--radius-pill)',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '0.01em',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(215, 248, 70, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
                  }}
                >
                  <Calendar size={17} />
                  <span>Book at This Branch</span>
                </button>

                {/* Secondary CTA */}
                <a
                  href={activeBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: 'transparent',
                    color: 'var(--color-white)',
                    padding: '0.92rem 1.6rem',
                    borderRadius: 'var(--radius-pill)',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    border: '1.5px solid rgba(255, 255, 255, 0.35)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-lime)';
                    e.currentTarget.style.color = 'var(--color-lime)';
                    e.currentTarget.style.backgroundColor = 'rgba(215, 248, 70, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                    e.currentTarget.style.color = 'var(--color-white)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span>Get Directions</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .branch-showcase-composition {
            grid-template-columns: 1fr !important;
            gap: 2.25rem !important;
          }
        }
        @media (max-width: 520px) {
          .branch-cta-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .branch-cta-row button,
          .branch-cta-row a {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
};
