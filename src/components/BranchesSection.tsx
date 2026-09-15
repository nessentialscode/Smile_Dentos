import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Star, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

interface BranchesSectionProps {
  onOpenBooking: (branchName?: string) => void;
}

interface Branch {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  hours: string;
  openDays: string;
  phone: string;
  phoneDisplay: string;
  altPhone?: string;
  altPhoneDisplay?: string;
  rating: string;
  reviewCount: string;
  googleMapsUrl: string;
  image: string;
  highlights: string[];
}

const branches: Branch[] = [
  {
    id: 'valanchery',
    name: 'Valanchery Main Clinic',
    shortName: 'Valanchery (Main)',
    badge: 'Multi-Specialty Center',
    address: 'Perinthalmanna Road, opposite Hamad Lab & OBG Clinic',
    landmark: 'Opposite Hamad Lab & OBG Clinic, Kolamangalam',
    city: 'Valanchery, Malappuram, Kerala',
    pincode: '676552',
    hours: '10:00 AM – 6:30 PM',
    openDays: 'Monday – Saturday (Sunday Closed)',
    phone: '09495964737',
    phoneDisplay: '094959 64737',
    rating: '5.0',
    reviewCount: '39 Google Reviews',
    googleMapsUrl:
      'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQvq_-tO-WAxUAAAAAHQAAAAAQBQ..i&pvq=Cg0vZy8xMXk4NGczOHdfIicKIXNtaWxlIGRlbnRvcyBmYW1pbHkgZGVudGFsIGNsaW5pYxACGAM&lqi=CiFzbWlsZSBkZW50b3MgZmFtaWx5IGRlbnRhbCBjbGluaWNI_8aGx6C9gIAIWjcQABABEAIQAxAEGAAYARgCGAMYBCIhc21pbGUgZGVudG9zIGZhbWlseSBkZW50YWwgY2xpbmljkgEHZGVudGlzdA&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba7b70c7574ba2b:0x724a06ff017fd89b',
    image: '/images/branch_valanchery.jpg',
    highlights: [
      'Comprehensive Orthodontics & Clear Aligners',
      'Advanced Dental Implant Suite',
      'Root Canal & Restorative Fillings',
      'Precision Cosmetic Teeth Whitening',
    ],
  },
  {
    id: 'edayoor',
    name: 'Edayoor / Mavandiyoor Branch',
    shortName: 'Edayoor Branch',
    badge: 'Family & Pediatric Suite',
    address: 'Madathil Complex, opposite Kerala Gramin Bank',
    landmark: 'Opposite Kerala Gramin Bank, Mavandiyoor',
    city: 'Edayur, Malappuram, Kerala',
    pincode: '676552',
    hours: '9:30 AM – 6:00 PM',
    openDays: 'Monday – Saturday (Sunday Closed)',
    phone: '09778464737',
    phoneDisplay: '097784 64737',
    altPhone: '09495964737',
    altPhoneDisplay: '094959 64737',
    rating: '5.0',
    reviewCount: 'Patient Recommended',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Smile+Dentos+Dental+Clinic+Madathil+Complex+Edayur+Kerala+676552',
    image: '/images/branch_edayoor.jpg',
    highlights: [
      'Gentle Pediatric Dental Care for Kids',
      'Preventive Checkups & Ultrasonic Scaling',
      'Emergency Dental Care & Fillings',
      'Accessible Ground Floor Parking',
    ],
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
        paddingTop: 'clamp(4.5rem, 7vw, 8rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
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
            marginBottom: 'clamp(2.5rem, 4.5vw, 4rem)',
          }}
        >
          {/* Subtle Pill Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(215, 248, 70, 0.15)',
              color: 'var(--color-lime)',
              padding: '0.4rem 1.1rem',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(215, 248, 70, 0.3)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-main)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <MapPin size={14} />
            <span>Our Clinic Locations</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 5.2vw, 4.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              color: 'var(--color-white)',
              maxWidth: '860px',
              margin: '0 0 1rem 0',
            }}
          >
            Two Modern Branches.{' '}
            <span style={{ color: 'var(--color-lime)' }}>One High Standard.</span>
          </motion.h2>

          <p
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.86)',
              maxWidth: '620px',
              margin: 0,
            }}
          >
            Conveniently situated in Valanchery and Edayoor with state-of-the-art sterilization, gentle specialists, and comfortable care.
          </p>

          {/* Interactive Branch Switcher Tabs */}
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'rgba(0, 0, 0, 0.22)',
              padding: '6px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              marginTop: 'clamp(1.75rem, 3vw, 2.5rem)',
              gap: '6px',
              maxWidth: '100%',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {branches.map((branch) => {
              const isActive = branch.id === activeBranchId;
              return (
                <button
                  key={branch.id}
                  onClick={() => setActiveBranchId(branch.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0.65rem 1.4rem',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: isActive ? 'var(--color-lime)' : 'transparent',
                    color: isActive ? 'var(--color-rust-dark)' : 'rgba(255, 255, 255, 0.88)',
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    border: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <MapPin size={15} color={isActive ? 'var(--color-rust-dark)' : 'var(--color-lime)'} />
                  <span>{branch.shortName}</span>
                  {isActive && (
                    <span
                      style={{
                        backgroundColor: 'var(--color-rust-dark)',
                        color: 'var(--color-white)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '10px',
                        marginLeft: '2px',
                      }}
                    >
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Branch Display Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBranch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: 'clamp(1.5rem, 3.5vw, 3rem)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
            }}
            className="branch-showcase-grid"
          >
            {/* Left Column: Branch Exterior / Interior Photo with Badges */}
            <div
              style={{
                position: 'relative',
                borderRadius: '22px',
                overflow: 'hidden',
                aspectRatio: '16 / 10',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              className="branch-image-wrapper"
            >
              <img
                src={activeBranch.image}
                alt={activeBranch.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />

              {/* Live Status Overlay Pill */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(14, 10, 8, 0.78)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--color-white)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-main)',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#34D399',
                    display: 'inline-block',
                    boxShadow: '0 0 8px #34D399',
                  }}
                />
                <span>Open Mon–Sat · {activeBranch.hours}</span>
              </div>

              {/* Branch Type Badge Bottom-Right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  backgroundColor: 'var(--color-lime)',
                  color: 'var(--color-rust-dark)',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-main)',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                }}
              >
                {activeBranch.badge}
              </div>
            </div>

            {/* Right Column: Clean Branch Information Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '0.4rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--color-lime)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Smile Dentos Clinic
                  </span>

                  {/* Rating Tag */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      padding: '3px 9px',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-main)',
                      fontWeight: 700,
                      color: '#FFD700',
                    }}
                  >
                    <Star size={12} fill="#FFD700" color="#FFD700" />
                    <span style={{ color: 'var(--color-white)' }}>{activeBranch.rating}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
                      ({activeBranch.reviewCount})
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.2,
                    color: 'var(--color-white)',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  {activeBranch.name}
                </h3>
              </div>

              {/* Location & Directions Detail */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.18)',
                  padding: '0.9rem 1.1rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <MapPin size={20} color="var(--color-lime)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.9rem', color: 'var(--color-white)', fontWeight: 600 }}>
                    {activeBranch.landmark}
                  </div>
                  <div style={{ fontFamily: 'var(--font-main)', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.75)', marginTop: '2px' }}>
                    {activeBranch.city} — {activeBranch.pincode}
                  </div>
                </div>
              </div>

              {/* Timings & Direct Phone Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.85rem',
                }}
                className="branch-meta-row"
              >
                {/* Hours */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.18)',
                    padding: '0.75rem 1rem',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Clock size={18} color="var(--color-lime)" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 500 }}>Hours:</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-white)', fontWeight: 700 }}>{activeBranch.hours}</div>
                  </div>
                </div>

                {/* Phone */}
                <a
                  href={`tel:${activeBranch.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.18)',
                    padding: '0.75rem 1rem',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-lime)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
                >
                  <Phone size={18} color="var(--color-lime)" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 500 }}>Direct Line:</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-lime)', fontWeight: 700 }}>{activeBranch.phoneDisplay}</div>
                  </div>
                </a>
              </div>

              {/* Highlights Chips */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.75)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Key Facilities & Care:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activeBranch.highlights.map((h) => (
                    <span
                      key={h}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.76rem',
                        fontFamily: 'var(--font-main)',
                        color: 'rgba(255, 255, 255, 0.92)',
                      }}
                    >
                      <CheckCircle2 size={12} color="var(--color-lime)" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Dual CTAs: Book Appointment & Get Directions */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.85rem',
                  marginTop: '0.5rem',
                  flexWrap: 'wrap',
                }}
                className="branch-action-buttons"
              >
                {/* Book Appointment Button */}
                <button
                  onClick={() => onOpenBooking(activeBranch.name)}
                  style={{
                    flex: '1 1 auto',
                    minWidth: '180px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--color-lime)',
                    color: 'var(--color-rust-dark)',
                    padding: '0.85rem 1.75rem',
                    borderRadius: 'var(--radius-pill)',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.92rem',
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

                {/* Get Directions Button */}
                <a
                  href={activeBranch.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: '1 1 auto',
                    minWidth: '160px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    backgroundColor: 'transparent',
                    color: 'var(--color-white)',
                    padding: '0.85rem 1.5rem',
                    borderRadius: 'var(--radius-pill)',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    border: '1.5px solid rgba(255, 255, 255, 0.4)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-white)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span>Get Directions</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .branch-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
            padding: 1.5rem !important;
          }
          .branch-image-wrapper {
            aspect-ratio: 16 / 10;
            width: 100%;
          }
        }
        @media (max-width: 520px) {
          .branch-meta-row {
            grid-template-columns: 1fr !important;
          }
          .branch-action-buttons {
            flex-direction: column !important;
          }
          .branch-action-buttons button,
          .branch-action-buttons a {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
