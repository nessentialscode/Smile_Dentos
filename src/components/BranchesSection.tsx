import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Globe,
  Compass,
  Camera,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
  Quote,
} from 'lucide-react';
import { getBranches } from '../services/supabaseService';

interface BranchesSectionProps {
  onOpenBooking: (branchName?: string) => void;
}

const VALANCHERY_UUID = '0a19849f-aac8-477e-b951-d7c1e0d55a46';
const EDAYOOR_UUID = 'e0e38ad6-dafd-4049-9aa2-4b49c55208bb';

interface GalleryPhoto {
  url: string;
  title: string;
  caption: string;
}

interface BranchCardData {
  id: string;
  dbId: string;
  tag: string;
  name: string;
  shortName: string;
  badge: string;
  landmark: string;
  status: 'OPEN' | 'CLOSED' | 'Opened' | 'Closed';
  rating: number;
  reviewsCount: number;
  addressLine1: string;
  addressLine2: string;
  hours: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  image: string;
  photoCountLabel: string;
  facilities: string[];
  quote: string;
  bookingParam: string;
  gallery: GalleryPhoto[];
}

const initialBranchesData: BranchCardData[] = [
  {
    id: 'valanchery',
    dbId: VALANCHERY_UUID,
    tag: 'VALANCHERY',
    name: 'Smile Dentos — Valanchery Clinic',
    shortName: 'Valanchery',
    badge: 'Flagship Clinic',
    landmark: 'Located at: Opposite Hamad Lab & OBG Clinic',
    status: 'OPEN',
    rating: 4.9,
    reviewsCount: 32,
    addressLine1: 'Perinthalmanna Road, opposite Hamad Lab & OBG Clinic',
    addressLine2: 'Main Road, Valanchery, Kerala 676552',
    hours: 'Mon – Sat: 10:00 AM – 6:30 PM (Sunday: Closed)',
    phone: '09495964737',
    phoneDisplay: '+91 94959 64737',
    whatsappNumber: '919495964737',
    googleMapsUrl:
      'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQvq_-tO-WAxUAAAAAHQAAAAAQBQ..i&pvq=Cg0vZy8xMXk4NGczOHdfIicKIXNtaWxlIGRlbnRvcyBmYW1pbHkgZGVudGFsIGNsaW5pYxACGAM&lqi=CiFzbWlsZSBkZW50b3MgZmFtaWx5IGRlbnRhbCBjbGluaWNI_8aGx6C9gIAIWjcQABABEAIQAxAEGAAYARgCGAMYBCIhc21pbGUgZGVudG9zIGZhbWlseSBkZW50YWwgY2xpbmljkgEHZGVudGlzdA&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba7b70c7574ba2b:0x724a06ff017fd89b',
    image: '/images/branch_valanchery.jpg',
    photoCountLabel: '+12 Photos',
    facilities: [
      'Digital 3D Dental Imaging & OPG',
      'Sterile Implant Operating Room',
      'Painless Laser Dentistry & Whitening',
      'Child-Friendly Specialized Dental Corner',
    ],
    quote: 'Very professional dental clinic in Valanchery. Zero pain during treatment.',
    bookingParam: 'Valanchery Main Clinic',
    gallery: [
      {
        url: '/images/branch_valanchery.jpg',
        title: 'Valanchery Main Reception & Exterior',
        caption: 'Comfortable waiting lounge and exterior access on Perinthalmanna Road.',
      },
      {
        url: '/images/service_digital_imaging.jpg',
        title: 'Digital 3D Dental Diagnostics Suite',
        caption: 'Ultra-low radiation high definition panoramic dental imaging.',
      },
      {
        url: '/images/service_implants.jpg',
        title: 'Sterile Surgical Operatory',
        caption: 'Dedicated aseptic theater for dental implants and complex surgeries.',
      },
      {
        url: '/images/service_whitening.jpg',
        title: 'Cosmetic & Laser Dental Suite',
        caption: 'Advanced diode lasers and clinical teeth whitening systems.',
      },
      {
        url: '/images/who_kids.jpg',
        title: 'Pediatric Care Dental Room',
        caption: 'Gentle, anxiety-free dental experience designed specifically for kids.',
      },
    ],
  },
  {
    id: 'edayoor',
    dbId: EDAYOOR_UUID,
    tag: 'EDAYOOR',
    name: 'Smile Dentos — Edayoor Clinic',
    shortName: 'Edayoor',
    badge: 'Madathil Complex Branch',
    landmark: 'Located in: Madathil Complex, near Gramin Bank',
    status: 'OPEN',
    rating: 4.9,
    reviewsCount: 16,
    addressLine1: 'Madathil Complex, opposite Kerala Gramin Bank',
    addressLine2: 'Mavandiyoor, Edayur, Kerala 676552',
    hours: 'Mon – Sat: 9:30 AM – 6:00 PM (Sunday: Closed)',
    phone: '07514044867',
    phoneDisplay: '+91 75140 44867',
    whatsappNumber: '917514044867',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Smile+Dentos+Dental+Clinic+Madathil+Complex+Edayur+Kerala+676552',
    image: '/images/branch_edayoor.jpg',
    photoCountLabel: '+8 Photos',
    facilities: [
      'Located in Madathil Complex (opp. Gramin Bank)',
      'Multispeciality Dental Surgery & Care',
      'Advanced Root Canal & Tooth Restorations',
      'Comprehensive Digital Dental Diagnostics',
    ],
    quote: 'Very good service, experienced doctors and extremely hygienic clinic.',
    bookingParam: 'Edayoor Branch',
    gallery: [
      {
        url: '/images/branch_edayoor.jpg',
        title: 'Edayoor Clinic Facility & Lounge',
        caption: 'Modern clinical rooms in Madathil Complex, Mavandiyoor.',
      },
      {
        url: '/images/service_endodontics.jpg',
        title: 'Rotary Endodontics & Operatory',
        caption: 'Painless single-visit microscopic root canal therapy.',
      },
      {
        url: '/images/service_orthodontics.jpg',
        title: 'Orthodontic & Invisalign Suite',
        caption: 'Digital aligner scans and smile alignment treatments.',
      },
      {
        url: '/images/service_surgery.jpg',
        title: 'Consultation & Oral Surgery Suite',
        caption: 'State-of-the-art diagnostic and surgical treatment units.',
      },
    ],
  },
];

export const BranchesSection: React.FC<BranchesSectionProps> = ({ onOpenBooking }) => {
  const [branches, setBranches] = useState<BranchCardData[]>(initialBranchesData);
  const [activeGallery, setActiveGallery] = useState<{
    branchName: string;
    photos: GalleryPhoto[];
    currentIndex: number;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    getBranches().then((dbBranches) => {
      if (!isMounted || !dbBranches || dbBranches.length === 0) return;
      setBranches((prev) =>
        prev.map((branch) => {
          const match = dbBranches.find(
            (db) =>
              db.id === branch.dbId ||
              (branch.id === 'valanchery' && db.id === VALANCHERY_UUID) ||
              (branch.id === 'edayoor' && db.id === EDAYOOR_UUID) ||
              (branch.id === 'valanchery' && db.name.toLowerCase().includes('valanchery')) ||
              (branch.id === 'edayoor' && db.name.toLowerCase().includes('edayoor'))
          );
          if (!match) return branch;
          const rawDigits = match.phone ? match.phone.replace(/\D/g, '') : '';
          let tenDigits = rawDigits;
          if (tenDigits.startsWith('0') && tenDigits.length === 11) {
            tenDigits = tenDigits.slice(1);
          } else if (tenDigits.startsWith('91') && tenDigits.length === 12) {
            tenDigits = tenDigits.slice(2);
          }
          const phoneFormatted =
            tenDigits.length === 10
              ? `+91 ${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`
              : match.phone || branch.phoneDisplay;
          return {
            ...branch,
            dbId: match.id,
            status: match.is_active ? 'OPEN' : 'CLOSED',
            phone: rawDigits || branch.phone,
            phoneDisplay: phoneFormatted,
            whatsappNumber: tenDigits.length === 10 ? `91${tenDigits}` : rawDigits || branch.whatsappNumber,
          };
        })
      );
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const openBranchGallery = (branch: BranchCardData, startIndex: number = 0) => {
    setActiveGallery({
      branchName: branch.name,
      photos: branch.gallery,
      currentIndex: startIndex,
    });
  };

  const nextGalleryPhoto = () => {
    if (!activeGallery) return;
    setActiveGallery((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.photos.length,
      };
    });
  };

  const prevGalleryPhoto = () => {
    if (!activeGallery) return;
    setActiveGallery((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length,
      };
    });
  };

  return (
    <section
      id="branches"
      style={{
        backgroundColor: '#F8FAFC',
        color: '#0F172A',
        paddingTop: 'clamp(4.5rem, 6.5vw, 6.5rem)',
        paddingBottom: 'clamp(4.5rem, 6.5vw, 6.5rem)',
        position: 'relative',
        overflow: 'hidden',
        scrollMarginTop: '80px',
      }}
    >
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.25rem' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-600)',
              marginBottom: '0.6rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            OUR LOCATIONS
          </span>

          {/* Main Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              color: '#0F172A',
              margin: '0 0 0.85rem 0',
            }}
          >
            Visit Our Clinical Branches
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
              color: '#64748B',
              maxWidth: '680px',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Two fully-equipped dental centers across Malappuram providing seamless digital diagnostics,
            painless surgeries, and gentle dental care.
          </p>
        </div>

        {/* Two-Card Branches Grid: Both branches represented side-by-side simultaneously */}
        <div
          className="branches-two-card-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 'clamp(1.5rem, 2.5vw, 2.25rem)',
            alignItems: 'stretch',
          }}
        >
          {branches.map((branch, index) => {
            const isOpened = branch.status === 'OPEN' || branch.status === 'Opened';
            return (
              <motion.article
                key={branch.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="branch-highlight-card"
                style={{
                  background: 'linear-gradient(168deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)',
                  borderRadius: '28px',
                  padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                  color: '#FFFFFF',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 20px 45px -10px rgba(37, 99, 235, 0.38), 0 8px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  overflow: 'hidden',
                }}
              >
                {/* Subtle decorative background glow */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '-15%',
                    right: '-15%',
                    width: '320px',
                    height: '320px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* 1. Header Bar: Yellow Tag on Left, Opened Status Pill on Right */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    gap: '0.75rem',
                  }}
                >
                  {/* Tag Pill: [ PONNANI ] style */}
                  <span
                    style={{
                      backgroundColor: '#FACC15',
                      color: '#0F172A',
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    [ {branch.tag} ]
                  </span>

                  {/* Status Pill: ● OPENED */}
                  <span
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: isOpened ? '#15803D' : '#DC2626',
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: isOpened ? '#16A34A' : '#EF4444',
                        boxShadow: isOpened
                          ? '0 0 8px rgba(22, 163, 74, 0.6)'
                          : '0 0 8px rgba(239, 68, 68, 0.6)',
                        display: 'inline-block',
                      }}
                    />
                    <span>{isOpened ? 'OPENED' : 'CLOSED'}</span>
                  </span>
                </div>

                {/* 2. Clinic Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.45rem, 2.1vw, 1.85rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    color: '#FFFFFF',
                    margin: '0 0 0.85rem 0',
                  }}
                >
                  {branch.name}
                </h3>

                {/* 3. Rating & Category Badges Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    flexWrap: 'wrap',
                    marginBottom: '0.75rem',
                  }}
                >
                  {/* Rating Badge: ★ 4.9 (32) */}
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.16)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Star size={13} fill="#FACC15" color="#FACC15" />
                    <span>
                      {branch.rating} ({branch.reviewsCount})
                    </span>
                  </span>

                  {/* Clinic Tier Badge */}
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.16)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                  >
                    {branch.badge}
                  </span>
                </div>

                {/* 4. Located Landmark Capsule */}
                <div
                  style={{
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.14)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      maxWidth: '100%',
                      lineHeight: 1.3,
                    }}
                  >
                    <Building2 size={13} style={{ flexShrink: 0, opacity: 0.9 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {branch.landmark}
                    </span>
                  </span>
                </div>

                {/* 5. Quick Action Pills: Website, Directions, Photos */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    marginBottom: '1.15rem',
                  }}
                >
                  {/* Website */}
                  <a
                    href="#top"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.16)',
                      border: '1px solid rgba(255, 255, 255, 0.24)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 11px',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s ease, transform 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.28)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)')}
                  >
                    <Globe size={13} />
                    <span>Website</span>
                  </a>

                  {/* Directions */}
                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.16)',
                      border: '1px solid rgba(255, 255, 255, 0.24)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 11px',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.28)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)')}
                  >
                    <Compass size={13} />
                    <span>Directions</span>
                  </a>

                  {/* +Photos */}
                  <button
                    type="button"
                    onClick={() => openBranchGallery(branch, 0)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.16)',
                      border: '1px solid rgba(255, 255, 255, 0.24)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '4px 11px',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.28)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)')}
                  >
                    <Camera size={13} />
                    <span>{branch.photoCountLabel}</span>
                  </button>
                </div>

                {/* 6. Clinic Image Feature Card (Requested: "Like in the Image but add Image of Clinics also") */}
                <div
                  className="clinic-image-container"
                  onClick={() => openBranchGallery(branch, 0)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '190px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '1.25rem',
                    border: '1.5px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)',
                    cursor: 'pointer',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  }}
                  title="Click to view clinic gallery"
                >
                  <img
                    src={`${branch.image}?v=4`}
                    alt={branch.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Gradient vignette for text contrast */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.72) 0%, rgba(15, 23, 42, 0.1) 50%, transparent 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Clinic badge overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      pointerEvents: 'none',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {branch.shortName} Dental Center
                    </span>

                    <span
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                        color: '#0F172A',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '3px 9px',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      }}
                    >
                      <Camera size={12} color="#0F172A" />
                      <span>Tour Clinic</span>
                    </span>
                  </div>
                </div>

                {/* 7. Address & Working Hours Block */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {/* Address Row with Yellow Map Pin */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                    }}
                  >
                    <MapPin size={17} color="#FDE047" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ lineHeight: 1.35 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          color: '#FFFFFF',
                        }}
                      >
                        {branch.addressLine1}
                      </p>
                      <p
                        style={{
                          margin: '2px 0 0 0',
                          fontSize: '0.78rem',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        {branch.addressLine2}
                      </p>
                    </div>
                  </div>

                  {/* Hours Row with Yellow Clock */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                    }}
                  >
                    <Clock size={17} color="#FDE047" style={{ flexShrink: 0 }} />
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.82rem',
                        color: '#FFFFFF',
                        fontWeight: 500,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#22C55E',
                          display: 'inline-block',
                        }}
                      />
                      <span>{branch.hours}</span>
                    </p>
                  </div>
                </div>

                {/* 8. Clinic Facilities & Services */}
                <div
                  style={{
                    marginBottom: '1.25rem',
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 0.55rem 0',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.82)',
                      fontFamily: 'var(--font-main)',
                    }}
                  >
                    CLINIC FACILITIES & SERVICES
                  </h4>

                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                    }}
                  >
                    {branch.facilities.map((facility, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: '0.82rem',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.55rem',
                          lineHeight: 1.35,
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#FACC15',
                            flexShrink: 0,
                          }}
                        />
                        <span>{facility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 9. Testimonial Quote Box */}
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '0.75rem 0.95rem',
                    marginBottom: '1.35rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.55rem',
                  }}
                >
                  <Quote
                    size={16}
                    color="#FDE047"
                    style={{ flexShrink: 0, marginTop: '2px', opacity: 0.9 }}
                  />
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.8rem',
                      fontStyle: 'italic',
                      lineHeight: 1.4,
                      color: 'rgba(255, 255, 255, 0.95)',
                    }}
                  >
                    "{branch.quote}"
                  </p>
                </div>

                {/* 10. Bottom Action Buttons */}
                <div
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                  }}
                >
                  {/* Primary Full Width White Button: Book [Branch] Appointment ↗ */}
                  <button
                    type="button"
                    onClick={() => onOpenBooking(branch.bookingParam)}
                    style={{
                      width: '100%',
                      backgroundColor: '#FFFFFF',
                      color: '#0F172A',
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      padding: '0.82rem 1.25rem',
                      borderRadius: '9999px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.12)';
                    }}
                  >
                    <span>Book {branch.shortName} Appointment</span>
                    <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>↗</span>
                  </button>

                  {/* Sub Action Buttons: Call & WhatsApp */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.65rem',
                    }}
                  >
                    {/* Call Button */}
                    <a
                      href={`tel:${branch.phone}`}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.16)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '0.65rem 0.5rem',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s ease, transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.26)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Phone size={13} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Call {branch.phoneDisplay}
                      </span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/${branch.whatsappNumber}?text=Hi%20Smile%20Dentos%2C%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(
                        branch.shortName
                      )}%20Clinic.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: '#22C55E',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        padding: '0.65rem 0.5rem',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                        transition: 'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#16A34A';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.45)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#22C55E';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                      }}
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Interactive Clinic Photo Lightbox / Gallery Modal */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div
            key="clinic-gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(10, 23, 35, 0.88)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem',
            }}
            onClick={() => setActiveGallery(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                backgroundColor: '#1E293B',
                color: '#FFFFFF',
                borderRadius: '24px',
                maxWidth: '850px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.1rem 1.4rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {activeGallery.branchName}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                    Photo {activeGallery.currentIndex + 1} of {activeGallery.photos.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveGallery(null)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Photo Display Stage */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  backgroundColor: '#0F172A',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={activeGallery.photos[activeGallery.currentIndex].url}
                  alt={activeGallery.photos[activeGallery.currentIndex].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Left/Right Navigation Buttons */}
                {activeGallery.photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevGalleryPhoto}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        width: '42px',
                        height: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      type="button"
                      onClick={nextGalleryPhoto}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        width: '42px',
                        height: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Caption & Thumbnails Bar */}
              <div style={{ padding: '1rem 1.4rem' }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.92rem', color: '#FFFFFF' }}>
                  {activeGallery.photos[activeGallery.currentIndex].title}
                </p>
                <p style={{ margin: '3px 0 0.85rem 0', fontSize: '0.8rem', color: '#94A3B8' }}>
                  {activeGallery.photos[activeGallery.currentIndex].caption}
                </p>

                {/* Thumbnail strip */}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '4px',
                  }}
                >
                  {activeGallery.photos.map((photo, pIdx) => {
                    const isSelected = pIdx === activeGallery.currentIndex;
                    return (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() =>
                          setActiveGallery((prev) => (prev ? { ...prev, currentIndex: pIdx } : null))
                        }
                        style={{
                          width: '64px',
                          height: '44px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: isSelected ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.2)',
                          opacity: isSelected ? 1 : 0.6,
                          padding: 0,
                          cursor: 'pointer',
                          flexShrink: 0,
                          backgroundColor: '#0F172A',
                        }}
                      >
                        <img
                          src={photo.url}
                          alt={photo.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .branches-two-card-grid {
            grid-template-columns: 1fr !important;
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};
