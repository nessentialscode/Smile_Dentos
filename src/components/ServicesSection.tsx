import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string;
  image: string;
  imagePosition?: string;
  iconType: 'tooth' | 'braces' | 'sparkles' | 'family' | 'digital';
}

// Crisp SVGs matching the dental & specialty badge icons from the reference design
const ToothIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4c-3.2 0-5.2 1.4-6.2 3.8-.8 1.9-1 4.3-.5 7.2.5 3 2 4.5 3 4.5 1.5 0 2-2 3.7-2s2.2 2 3.7 2c1 0 2.5-1.5 3-4.5.5-2.9.3-5.3-.5-7.2C17.2 5.4 15.2 4 12 4z" />
  </svg>
);

const BracesToothIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3.8c-3.2 0-5.2 1.4-6.2 3.8-.8 1.9-1 4.3-.5 7.2.5 3 2 4.5 3 4.5 1.5 0 2-2 3.7-2s2.2 2 3.7 2c1 0 2.5-1.5 3-4.5.5-2.9.3-5.3-.5-7.2C17.2 5.2 15.2 3.8 12 3.8z" />
    <path d="M5.5 10.5h13" strokeDasharray="1.5 1.5" />
    <rect x="7.5" y="9.5" width="2.2" height="2" rx="0.5" fill={color} />
    <rect x="10.9" y="9.5" width="2.2" height="2" rx="0.5" fill={color} />
    <rect x="14.3" y="9.5" width="2.2" height="2" rx="0.5" fill={color} />
  </svg>
);

const SparklesIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

const FamilyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="3.5" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a3.5 3.5 0 0 1 0 6.75" />
  </svg>
);

const DigitalIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="13" x="3" y="4" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
    <path d="M8 10.5h2.5l1.5-3 2 6 1.5-3H16" />
  </svg>
);

const renderIcon = (type: ServiceItem['iconType']) => {
  switch (type) {
    case 'braces':
      return <BracesToothIcon size={20} color="currentColor" />;
    case 'sparkles':
      return <SparklesIcon size={20} color="currentColor" />;
    case 'family':
      return <FamilyIcon size={20} color="currentColor" />;
    case 'digital':
      return <DigitalIcon size={20} color="currentColor" />;
    case 'tooth':
    default:
      return <ToothIcon size={20} color="currentColor" />;
  }
};

// First 6 Services displayed in the initial view (in exact original order matching Reference 2)
const initialServices: ServiceItem[] = [
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    category: 'RESTORATIVE SURGERY',
    description: 'Our computer-guided implantology ensures sub-millimeter precision, minimal discomfort, and rapid healing for seamless single, multiple, or full-arch restorations.',
    tags: 'Titanium • Permanent • Predictable',
    image: '/images/service_implants.png',
    imagePosition: 'center 30%',
    iconType: 'tooth',
  },
  {
    id: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    category: 'ENDODONTICS',
    description: 'Utilizing rotary endodontic instruments and apex locators to eliminate infection painlessly, preserving your natural tooth structure.',
    tags: 'Painless • Safe • Tooth Saving',
    image: '/images/service_endodontics.png',
    imagePosition: 'center 35%',
    iconType: 'tooth',
  },
  {
    id: 'braces-aligners',
    title: 'Braces & Aligners',
    category: 'ORTHODONTICS',
    description: 'Custom 3D scanned treatment paths provide predictable tooth movement with nearly invisible aligners or precision ceramic brackets.',
    tags: 'Modern • Comfortable • Predictable',
    image: '/images/service_orthodontics.png',
    imagePosition: 'center 40%',
    iconType: 'braces',
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    category: 'COSMETIC DENTISTRY',
    description: 'Enamel-safe, pH-balanced professional whitening gel activated with cold LED light gives you an instantly radiant smile without tooth sensitivity.',
    tags: 'Safe • Effective • Long-lasting',
    image: '/images/service_whitening.png',
    imagePosition: 'center 45%',
    iconType: 'sparkles',
  },
  {
    id: 'veneers-crowns',
    title: 'Veneers & Crowns',
    category: 'AESTHETIC RESTORATION',
    description: 'Custom designed to match your facial profile, correcting gaps, chips, uneven edges, and deep discoloration with lifelike translucency.',
    tags: 'Strong • Natural • Long-lasting',
    image: '/images/service_cosmetic_dentistry.png',
    imagePosition: 'center 45%',
    iconType: 'tooth',
  },
  {
    id: 'preventive-family-care',
    title: 'Preventive & Family Care',
    category: 'GENERAL DENTISTRY',
    description: 'A warm, gentle clinic environment designed to make visits relaxed and positive for children and adults alike.',
    tags: 'Checkups • Cleanings • Protection',
    image: '/images/service_preventive_family.jpg',
    imagePosition: 'center 25%',
    iconType: 'family',
  },
];

// Other 6 Services revealed when clicking 'See All' (in exact original order matching Reference 3)
const additionalServices: ServiceItem[] = [
  {
    id: 'periodontal-gum-surgery',
    title: 'Periodontal Therapy & Gum Surgery',
    category: 'PERIODONTICS',
    description: 'Comprehensive clinical care for bleeding gums, bone loss, and periodontitis using minimally invasive ultrasonic cleaning, laser sterilization, and regenerative surgical grafting.',
    tags: 'Healthy Gums • Deep Care • Protection',
    image: '/images/backup_original/service_periodontal.jpg',
    imagePosition: 'center 35%',
    iconType: 'tooth',
  },
  {
    id: 'minor-maxillofacial-surgeries',
    title: 'Minor Maxillofacial Surgeries',
    category: 'ORAL SURGERY',
    description: 'Painless in-office oral surgical procedures performed under profound local anesthesia in sterile operatory suites with fast-healing clinical protocols.',
    tags: 'Gentle • Precise • Quick Healing',
    image: '/images/service_surgery.png',
    imagePosition: 'center 35%',
    iconType: 'sparkles',
  },
  {
    id: 'full-partial-dentures',
    title: 'Full Dentures & Partial Dentures',
    category: 'PROSTHODONTICS',
    description: 'Custom-molded dental prosthetics engineered for exceptional comfort, secure retention, and natural aesthetics, restoring full chewing power and youthful contours.',
    tags: 'Custom Fit • Natural • Comfortable',
    image: '/images/service_dentures.jpg',
    imagePosition: 'center 30%',
    iconType: 'tooth',
  },
  {
    id: 'tmj-treatment-splints',
    title: 'TMJ Treatment & Splints',
    category: 'TMJ & FACIAL PAIN',
    description: 'Targeted temporomandibular joint evaluation and custom-fabricated splints designed to decompress jaw joints, eliminate morning soreness, and protect teeth from grinding wear.',
    tags: 'Pain Relief • Custom Guards • Balance',
    image: '/images/service_tmj.jpg',
    imagePosition: 'center 25%',
    iconType: 'digital',
  },
  {
    id: 'pediatric-dental-care',
    title: 'Pediatric Dental Care',
    category: 'PEDIATRIC DENTISTRY',
    description: 'Compassionate dental care tailored for young smiles in a cheerful, fear-free atmosphere, focusing on cavity prevention, comfortable treatment, and healthy smile development.',
    tags: 'Gentle • Fun • Fear-Free',
    image: '/images/service_pediatric.jpg',
    imagePosition: 'center 25%',
    iconType: 'family',
  },
  {
    id: 'mucosal-pathology-biopsy',
    title: 'Mucosal Pathology & Biopsy Procedures',
    category: 'ORAL PATHOLOGY',
    description: 'Precise clinical evaluations and minor soft-tissue biopsies for persistent mouth sores, white or red mucosal patches, and oral lesions with dedicated histopathological diagnosis.',
    tags: 'Accurate • Early Detection • Safe',
    image: '/images/service_mucosal_pathology.png',
    imagePosition: 'center 35%',
    iconType: 'digital',
  },
];

interface ServicesSectionProps {
  showAllServices?: boolean;
  onToggleShowAllServices?: () => void;
  onOpenBooking?: (branchName?: string, doctorName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  showAllServices: externalShowAll,
  onOpenBooking,
}) => {
  const isShowAll = Boolean(externalShowAll);

  const renderServiceCard = (service: ServiceItem, index: number) => {
    return (
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onOpenBooking?.(undefined, undefined)}
        className="service-card-item"
        style={{
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* ============================================================
            DESKTOP PRESENTATION (SINGLE FULL-BLEED PHOTOGRAPHIC CARD)
            Edge-to-edge dental photography with dark overlay & layered UI
            Visible on Desktop (>= 769px), hidden on Mobile (<= 768px)
            ============================================================ */}
        {/* 1. Full-Card Dental Photograph covering entire background */}
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="service-card-desktop-bg"
          style={{
            objectPosition: service.imagePosition || 'center center',
          }}
        />

        {/* 2. Dark Navy Photographic Overlay with strong bottom gradient */}
        <div className="service-card-desktop-overlay" />

        {/* 3. Layered Content Container positioned directly over the photograph */}
        <div className="service-card-desktop-content">
          {/* Top Row: # PROCEDURE PHOTO Badge (left) & Translucent Category Badge (right) */}
          <div className="service-card-desktop-top-row">
            <div className="service-card-proc-pill">
              <span className="service-card-proc-hash">#</span>
              <span className="service-card-proc-text">PROCEDURE PHOTO</span>
            </div>

            <div className="service-card-cat-pill">
              {service.category}
            </div>
          </div>

          {/* Lower Content Area: Lime label, White title, Soft-white description, and Action row */}
          <div className="service-card-desktop-bottom-area">
            {/* 1. Small Uppercase Bright Lime Category Label */}
            <span className="service-card-desktop-cat-label">
              {service.category}
            </span>

            {/* 2. Service Title in Crisp White */}
            <h3 className="service-card-desktop-title">
              {service.title}
            </h3>

            {/* 3. Service Description in Soft White / Light Grey */}
            <p className="service-card-desktop-desc">
              {service.description}
            </p>

            {/* 4 & 5. Bottom Row: Small Lime Indicator + Supporting Text & Bright Lime Pill CTA */}
            <div className="service-card-desktop-action-row">
              <div className="service-card-desktop-support">
                <span className="service-card-lime-dot" />
                <span className="service-card-support-text">State-of-the-art care</span>
              </div>

              <div
                className="service-card-book-btn"
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenBooking?.(undefined, undefined);
                }}
              >
                <span>Book Treatment</span>
                <span className="service-card-arrow-icon">↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            MOBILE PRESENTATION (STRICTLY LOCKED ORIGINAL LAYOUT)
            Split image + white card content for mobile viewports
            Visible on Mobile (<= 768px), hidden on Desktop (>= 769px)
            ============================================================ */}
        <div className="service-card-mobile-wrap">
          {/* Card Top: Rounded Image with Badges */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(175px, 17vw, 210px)',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#F1F5F9',
            }}
            className="service-card-mobile-image-wrap"
          >
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: service.imagePosition || 'center',
                display: 'block',
              }}
              className="service-card-mobile-img"
            />

            {/* Top-Left Circular Icon Badge */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                color: '#08B9C3',
                zIndex: 2,
              }}
            >
              {renderIcon(service.iconType)}
            </div>

            {/* Top-Right Category Pill Badge */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#0F243A',
                zIndex: 2,
              }}
            >
              {service.category}
            </div>
          </div>

          {/* Card Body: Title, Description, and Bottom Action Row */}
          <div
            style={{
              padding: '16px 8px 2px 8px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display, inherit)',
                fontSize: 'clamp(1.15rem, 1.4vw, 1.28rem)',
                fontWeight: 700,
                color: '#0A2540',
                lineHeight: 1.25,
                margin: '0 0 6px 0',
                letterSpacing: '-0.015em',
              }}
            >
              {service.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-main, sans-serif)',
                fontSize: '0.88rem',
                lineHeight: 1.5,
                color: '#64748B',
                margin: '0 0 14px 0',
                minHeight: '38px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {service.description}
            </p>

            {/* Bottom Row: Checkmark Highlights & Arrow Action Circle */}
            <div
              style={{
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                paddingTop: '6px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    backgroundColor: '#08B9C3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path
                      d="M1 3.5L3.3 6L8 1"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: '#334155',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {service.tags}
                </span>
              </div>

              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#0A2540',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.04)',
                }}
              >
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="services"
      style={{
        backgroundColor: '#F8FAFC',
        color: '#0A2540',
        paddingTop: 'clamp(4rem, 6.5vw, 6.5rem)',
        paddingBottom: 'clamp(2rem, 3.5vw, 3.5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header: Match Reference Design */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
          {/* Subheading: — OUR SERVICES */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '0.75rem',
            }}
          >
            <span
              className="services-subheading-line"
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: '#08B9C3',
                borderRadius: '2px',
                display: 'inline-block',
              }}
            />
            <span
              className="services-subheading-text"
              style={{
                color: '#08B9C3',
                fontSize: '0.84rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-main, sans-serif)',
              }}
            >
              Our Services
            </span>
            <span
              className="services-subheading-line"
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: '#08B9C3',
                borderRadius: '2px',
                display: 'inline-block',
              }}
            />
          </div>

          {/* Main Title: Comprehensive Dental Care */}
          <h2
            className="services-main-title"
            style={{
              fontFamily: 'var(--font-display, inherit)',
              fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              margin: '0 0 0.85rem 0',
              letterSpacing: '-0.025em',
              color: '#0A2540',
            }}
          >
            <span>Comprehensive </span>
            <span className="services-title-highlight" style={{ color: '#08B9C3' }}>Dental Care</span>
          </h2>

          {/* Subtitle */}
          <p
            className="services-main-desc"
            style={{
              fontFamily: 'var(--font-main, sans-serif)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
              color: '#64748B',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Advanced treatments, personalized care, and healthier smiles for all ages.
          </p>
        </div>

        {/* 3-Column Responsive Grid: Initial 6 Services */}
        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1.2rem, 2vw, 1.65rem)',
          }}
        >
          {initialServices.map((service, idx) => renderServiceCard(service, idx))}
        </div>

        {/* Other 6 Services revealed when clicking 'See All' */}
        <AnimatePresence>
          {isShowAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div
                className="services-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'clamp(1.2rem, 2vw, 1.65rem)',
                  paddingTop: 'clamp(1.2rem, 2vw, 1.65rem)',
                }}
              >
                {additionalServices.map((service, idx) => renderServiceCard(service, idx + 6))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Responsive Styles & Theme Application */}
      <style>{`
        /* ============================================================
           MOBILE DEFAULT PRESENTATION (STRICTLY PRESERVED & LOCKED)
           ============================================================ */
        .service-card-item {
          background-color: #FFFFFF;
          border-radius: 22px;
          border: 1px solid rgba(226, 232, 240, 0.85);
          padding: 12px 12px 18px 12px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px -3px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02);
          cursor: pointer;
          position: relative;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
        }
        .service-card-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px -8px rgba(8, 185, 195, 0.14), 0 8px 16px -4px rgba(15, 23, 42, 0.06);
          border-color: rgba(8, 185, 195, 0.35);
        }

        /* Hide desktop layered card elements on mobile */
        .service-card-desktop-bg,
        .service-card-desktop-overlay,
        .service-card-desktop-content {
          display: none !important;
        }

        /* Show mobile container on mobile */
        .service-card-mobile-wrap {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          height: 100% !important;
        }

        /* ============================================================
           DESKTOP SPECIFIC PRESENTATION (MATCHING REFERENCE IMAGES 2 & 3)
           Single Full-Bleed Photographic Card with Layered Elements
           ============================================================ */
        @media (min-width: 769px) {
          #services {
            background-color: var(--services-bg-mint, #E8F2EF) !important;
          }
          .services-subheading-line {
            background-color: #16AC8F !important;
          }
          .services-subheading-text {
            color: #16AC8F !important;
          }
          .services-main-title {
            color: #273F5F !important;
          }
          .services-title-highlight {
            color: #16AC8F !important;
          }
          .services-main-desc {
            color: #4A6375 !important;
          }

          /* Hide mobile container on desktop */
          .service-card-mobile-wrap {
            display: none !important;
          }

          /* Full-Bleed Photographic Card Container */
          .service-card-item {
            position: relative !important;
            overflow: hidden !important;
            border-radius: 28px !important;
            padding: 0 !important;
            height: 485px !important;
            min-height: 485px !important;
            background-color: #07182B !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 16px 36px -6px rgba(5, 11, 25, 0.45), 0 4px 12px rgba(0, 0, 0, 0.2) !important;
            display: flex !important;
            flex-direction: column !important;
            transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease !important;
          }

          .service-card-item:hover {
            transform: translateY(-7px) !important;
            border-color: rgba(223, 255, 36, 0.45) !important;
            box-shadow: 0 24px 48px -8px rgba(5, 11, 25, 0.65), 0 0 24px rgba(223, 255, 36, 0.18) !important;
          }

          /* Full-Card Dental Photograph */
          .service-card-desktop-bg {
            display: block !important;
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            z-index: 0 !important;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }

          .service-card-item:hover .service-card-desktop-bg {
            transform: scale(1.05) !important;
          }

          /* Dark Navy Photographic Overlay with Bottom Gradient */
          .service-card-desktop-overlay {
            display: block !important;
            position: absolute !important;
            inset: 0 !important;
            z-index: 1 !important;
            background: linear-gradient(
              180deg,
              rgba(7, 24, 43, 0.35) 0%,
              rgba(7, 24, 43, 0.48) 32%,
              rgba(10, 41, 64, 0.82) 58%,
              rgba(5, 11, 25, 0.96) 82%,
              #050B19 100%
            ) !important;
            pointer-events: none !important;
          }

          /* Layered Content Container */
          .service-card-desktop-content {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            height: 100% !important;
            width: 100% !important;
            position: relative !important;
            z-index: 2 !important;
            padding: 24px 22px 22px 22px !important;
            box-sizing: border-box !important;
          }

          /* Top Badges Row */
          .service-card-desktop-top-row {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 10px !important;
            width: 100% !important;
          }

          /* Top-Left # PROCEDURE PHOTO Badge */
          .service-card-proc-pill {
            display: inline-flex !important;
            align-items: center !important;
            gap: 5px !important;
            background: rgba(7, 24, 43, 0.68) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.16) !important;
            border-radius: 9999px !important;
            padding: 5px 12px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25) !important;
          }
          .service-card-proc-hash {
            color: #DFFF24 !important;
            font-size: 0.78rem !important;
            font-weight: 800 !important;
            line-height: 1 !important;
          }
          .service-card-proc-text {
            color: #FFFFFF !important;
            font-size: 0.66rem !important;
            font-weight: 700 !important;
            letter-spacing: 0.08em !important;
            text-transform: uppercase !important;
            line-height: 1 !important;
          }

          /* Top-Right Category Pill Badge */
          .service-card-cat-pill {
            display: inline-flex !important;
            align-items: center !important;
            background: rgba(255, 255, 255, 0.14) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.22) !important;
            border-radius: 9999px !important;
            padding: 5px 13px !important;
            font-size: 0.66rem !important;
            font-weight: 700 !important;
            letter-spacing: 0.08em !important;
            text-transform: uppercase !important;
            color: #FFFFFF !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
          }

          /* Bottom Area */
          .service-card-desktop-bottom-area {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            margin-top: auto !important;
          }

          /* 1. Small Uppercase Lime Category Label */
          .service-card-desktop-cat-label {
            color: #DFFF24 !important;
            font-size: 0.72rem !important;
            font-weight: 700 !important;
            letter-spacing: 0.09em !important;
            text-transform: uppercase !important;
            margin-bottom: 6px !important;
            display: block !important;
          }

          /* 2. Service Title in White */
          .service-card-desktop-title {
            color: #FFFFFF !important;
            font-family: var(--font-display, inherit) !important;
            font-size: 1.48rem !important;
            font-weight: 700 !important;
            line-height: 1.22 !important;
            letter-spacing: -0.018em !important;
            margin: 0 0 8px 0 !important;
          }

          /* 3. Service Description in Soft White / Light Grey */
          .service-card-desktop-desc {
            color: rgba(255, 255, 255, 0.76) !important;
            font-family: var(--font-main, sans-serif) !important;
            font-size: 0.86rem !important;
            line-height: 1.5 !important;
            margin: 0 0 16px 0 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 3 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            min-height: 3.8em !important;
          }

          /* 4 & 5. Bottom Row */
          .service-card-desktop-action-row {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 12px !important;
            padding-top: 12px !important;
            border-top: 1px solid rgba(255, 255, 255, 0.09) !important;
          }

          /* Bottom Supporting Info: Small Lime Dot + Supporting Text */
          .service-card-desktop-support {
            display: inline-flex !important;
            align-items: center !important;
            gap: 7px !important;
            min-width: 0 !important;
          }
          .service-card-lime-dot {
            width: 6px !important;
            height: 6px !important;
            border-radius: 50% !important;
            background-color: #DFFF24 !important;
            display: inline-block !important;
            flex-shrink: 0 !important;
            box-shadow: 0 0 6px rgba(223, 255, 36, 0.7) !important;
          }
          .service-card-support-text {
            color: rgba(255, 255, 255, 0.8) !important;
            font-size: 0.78rem !important;
            font-weight: 500 !important;
            letter-spacing: 0.01em !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          /* Bright Lime Pill-Shaped Action Button */
          .service-card-book-btn {
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
            background-color: #DFFF24 !important;
            color: #07182B !important;
            padding: 7px 16px !important;
            border-radius: 9999px !important;
            font-size: 0.8rem !important;
            font-weight: 700 !important;
            letter-spacing: -0.01em !important;
            cursor: pointer !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            transition: all 0.22s ease !important;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2) !important;
          }
          .service-card-item:hover .service-card-book-btn {
            background-color: #E8FF4A !important;
            box-shadow: 0 0 16px rgba(223, 255, 36, 0.6) !important;
            transform: scale(1.02) !important;
          }
          .service-card-arrow-icon {
            font-size: 0.92rem !important;
            line-height: 1 !important;
            font-weight: 800 !important;
            transition: transform 0.2s ease !important;
          }
          .service-card-item:hover .service-card-arrow-icon {
            transform: translate(2px, -2px) !important;
          }
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
