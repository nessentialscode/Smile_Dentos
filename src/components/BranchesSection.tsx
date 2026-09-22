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
        backgroundColor: '#FFFFFF',
        color: 'var(--color-neutral-900)',
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
              color: 'var(--color-brand-600)',
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
              color: 'var(--color-neutral-900)',
              margin: '0 0 1.75rem 0',
            }}
          >
            Visit Our Branches
          </h2>

          {/* Refined Branch Selector (Unified Semi-Circle Pill) */}
          <div
            role="tablist"
            aria-label="Clinic Branches"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#F1F5F9',
              padding: '6px',
              borderRadius: '9999px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
              gap: '6px',
              position: 'relative',
              maxWidth: '100%',
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
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '9999px',
                    backgroundColor: isActive ? 'var(--color-brand-500)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--color-neutral-600)',
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    border: 'none',
                    boxShadow: isActive ? '0 4px 14px rgba(0, 56, 162, 0.35)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-neutral-900)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-neutral-600)';
                  }}
                >
                  <MapPin size={15} color={isActive ? '#FFFFFF' : 'var(--color-brand-500)'} />
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
                      backgroundColor: isActive
                        ? 'rgba(255, 255, 255, 0.22)'
                        : branch.status === 'Opened'
                        ? 'rgba(22, 163, 74, 0.12)'
                        : 'rgba(239, 68, 68, 0.12)',
                      border: isActive
                        ? '1px solid rgba(255, 255, 255, 0.35)'
                        : branch.status === 'Opened'
                        ? '1px solid rgba(22, 163, 74, 0.35)'
                        : '1px solid rgba(239, 68, 68, 0.35)',
                      color: isActive
                        ? '#FFFFFF'
                        : branch.status === 'Opened'
                        ? '#15803D'
                        : '#DC2626',
                      lineHeight: 1.2,
                    }}
                  >
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: isActive
                          ? '#FFFFFF'
                          : branch.status === 'Opened'
                          ? '#16A34A'
                          : '#EF4444',
                        boxShadow: isActive
                          ? '0 0 6px #FFFFFF'
                          : branch.status === 'Opened'
                          ? '0 0 6px rgba(22, 163, 74, 0.4)'
                          : '0 0 6px rgba(239, 68, 68, 0.4)',
                      }}
                    />
                    {branch.status}
                  </span>
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
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'var(--color-neutral-100)',
              border: '1.5px solid var(--color-neutral-200)',
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
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: 'var(--color-neutral-900)',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-main)',
                fontWeight: 600,
                border: '1px solid var(--color-neutral-200)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-teal-500)',
                  display: 'inline-block',
                  boxShadow: '0 0 8px rgba(1, 158, 162, 0.5)',
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
                    color: 'var(--color-neutral-900)',
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
                        ? 'rgba(22, 163, 74, 0.12)'
                        : 'rgba(239, 68, 68, 0.12)',
                    border:
                      activeBranch.status === 'Opened'
                        ? '1px solid rgba(22, 163, 74, 0.35)'
                        : '1px solid rgba(239, 68, 68, 0.35)',
                    color: activeBranch.status === 'Opened' ? '#15803D' : '#DC2626',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: activeBranch.status === 'Opened' ? '#16A34A' : '#EF4444',
                      boxShadow: activeBranch.status === 'Opened' ? '0 0 6px rgba(22, 163, 74, 0.4)' : '0 0 6px rgba(239, 68, 68, 0.4)',
                    }}
                  />
                  {activeBranch.status}
                </span>
              </div>

              {/* Clinic Details Grid */}
              <div
                className="clinic-details-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.9rem',
                  marginBottom: '2.2rem',
                }}
              >
                {/* Location Card (Spanning 2 columns) */}
                <div
                  style={{
                    gridColumn: 'span 2',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.9rem',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '1.05rem 1.2rem',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0, 56, 162, 0.08)',
                      color: 'var(--color-brand-500)',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: 'var(--color-brand-600)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '3px',
                      }}
                    >
                      Clinic Location
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.98rem',
                        color: 'var(--color-neutral-900)',
                        fontWeight: 600,
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {activeBranch.address}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.86rem',
                        color: 'var(--color-neutral-600)',
                        margin: '0.25rem 0 0 0',
                      }}
                    >
                      {activeBranch.city} — {activeBranch.pincode}
                    </p>
                  </div>
                </div>

                {/* Working Hours Card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '1.05rem 1.15rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0, 56, 162, 0.08)',
                      color: 'var(--color-brand-500)',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: 'var(--color-brand-600)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '3px',
                      }}
                    >
                      Opening Hours
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.98rem',
                        color: 'var(--color-neutral-900)',
                        fontWeight: 700,
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {activeBranch.hours}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.82rem',
                        color: 'var(--color-neutral-600)',
                        margin: '0.2rem 0 0 0',
                      }}
                    >
                      {activeBranch.openDays}
                    </p>
                  </div>
                </div>

                {/* Contact Phone Card */}
                <a
                  href={`tel:${activeBranch.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '1.05rem 1.15rem',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand-500)';
                    e.currentTarget.style.backgroundColor = 'rgba(0, 56, 162, 0.03)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0, 56, 162, 0.08)',
                      color: 'var(--color-brand-500)',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: 'var(--color-brand-600)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '3px',
                      }}
                    >
                      Direct Phone
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '1rem',
                        color: 'var(--color-brand-600)',
                        fontWeight: 700,
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {activeBranch.phoneDisplay}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.82rem',
                        color: 'var(--color-neutral-600)',
                        margin: '0.2rem 0 0 0',
                      }}
                    >
                      Inquiries & booking
                    </p>
                  </div>
                </a>
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
                    backgroundColor: 'var(--color-brand-500)',
                    color: '#FFFFFF',
                    padding: '0.95rem 1.85rem',
                    borderRadius: 'var(--radius-pill)',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    letterSpacing: '0.01em',
                    boxShadow: '0 8px 24px rgba(22, 119, 210, 0.28)',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = 'var(--color-brand-600)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(22, 119, 210, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'var(--color-brand-500)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 119, 210, 0.28)';
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
                    backgroundColor: 'var(--color-brand-50)',
                    color: 'var(--color-brand-600)',
                    padding: '0.92rem 1.6rem',
                    borderRadius: 'var(--radius-pill)',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    border: '1.5px solid var(--color-brand-200)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand-500)';
                    e.currentTarget.style.backgroundColor = 'var(--color-brand-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-brand-200)';
                    e.currentTarget.style.backgroundColor = 'var(--color-brand-50)';
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
        @media (max-width: 580px) {
          .clinic-details-grid {
            grid-template-columns: 1fr !important;
          }
          .clinic-details-grid > * {
            grid-column: span 1 !important;
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
