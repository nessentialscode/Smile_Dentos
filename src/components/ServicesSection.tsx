import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string;
  image: string;
  iconType: 'tooth' | 'braces' | 'sparkles' | 'family' | 'digital';
}

// Crisp SVGs matching the dental & specialty badge icons from the reference design
const ToothIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#08B9C3' }) => (
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

const BracesToothIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#08B9C3' }) => (
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

const SparklesIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#08B9C3' }) => (
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

const FamilyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#08B9C3' }) => (
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

const DigitalIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#08B9C3' }) => (
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
      return <BracesToothIcon size={20} color="#08B9C3" />;
    case 'sparkles':
      return <SparklesIcon size={20} color="#08B9C3" />;
    case 'family':
      return <FamilyIcon size={20} color="#08B9C3" />;
    case 'digital':
      return <DigitalIcon size={20} color="#08B9C3" />;
    case 'tooth':
    default:
      return <ToothIcon size={20} color="#08B9C3" />;
  }
};

// First 6 Services displayed in the initial view (in exact original order)
const initialServices: ServiceItem[] = [
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    category: 'IMPLANTOLOGY',
    description: 'State-of-the-art titanium restorations providing permanent, natural-feeling tooth replacements.',
    tags: 'Titanium • Permanent • Predictable',
    image: '/images/service_implants.jpg',
    iconType: 'tooth',
  },
  {
    id: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    category: 'ENDODONTICS',
    description: 'Advanced microscope-enhanced therapy to eliminate infection and preserve your natural tooth.',
    tags: 'Painless • Safe • Tooth Saving',
    image: '/images/service_endodontics.jpg',
    iconType: 'tooth',
  },
  {
    id: 'braces-aligners',
    title: 'Braces & Aligners',
    category: 'ORTHODONTICS',
    description: 'Straighten your smile with modern, comfortable and discreet clear aligner solutions.',
    tags: 'Modern • Comfortable • Predictable',
    image: '/images/service_orthodontics.jpg',
    iconType: 'braces',
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    category: 'COSMETIC DENTISTRY',
    description: 'Brighter, whiter smiles with safe, high-efficacy professional laser treatments.',
    tags: 'Safe • Effective • Long-lasting',
    image: '/images/service_whitening.jpg',
    iconType: 'sparkles',
  },
  {
    id: 'veneers-crowns',
    title: 'Veneers & Crowns',
    category: 'RESTORATIVE DENTISTRY',
    description: 'Natural-looking restorations and porcelain veneers for a confident, beautiful smile.',
    tags: 'Strong • Natural • Long-lasting',
    image: '/images/service_cosmetic_dentistry.jpg',
    iconType: 'tooth',
  },
  {
    id: 'preventive-family-care',
    title: 'Preventive & Family Care',
    category: 'FAMILY DENTISTRY',
    description: 'Complete oral wellness care and gentle checkups for every stage of life.',
    tags: 'Checkups • Cleanings • Protection',
    image: '/images/service_preventive.jpg',
    iconType: 'family',
  },
];

// Other 6 Services revealed when clicking 'See All' (in exact original order)
const additionalServices: ServiceItem[] = [
  {
    id: 'periodontal-gum-surgery',
    title: 'Periodontal Therapy & Gum Surgery',
    category: 'PERIODONTICS',
    description: 'Specialized gum treatments including deep ultrasonic scaling and regenerative gum health protection.',
    tags: 'Healthy Gums • Deep Care • Protection',
    image: '/images/service_periodontal.jpg',
    iconType: 'tooth',
  },
  {
    id: 'minor-maxillofacial-surgeries',
    title: 'Minor Maxillofacial Surgeries',
    category: 'ORAL SURGERY',
    description: 'Gentle surgical care for wisdom teeth extractions, cysts, and precision procedures.',
    tags: 'Gentle • Precise • Quick Healing',
    image: '/images/service_surgery.jpg',
    iconType: 'sparkles',
  },
  {
    id: 'full-partial-dentures',
    title: 'Full Dentures & Partial Dentures',
    category: 'PROSTHODONTICS',
    description: 'Precision-milled flexible dentures and implant restorations engineered for optimal chewing stability.',
    tags: 'Custom Fit • Natural • Comfortable',
    image: '/images/service_dentures.jpg',
    iconType: 'tooth',
  },
  {
    id: 'tmj-treatment-splints',
    title: 'TMJ Treatment & Splints',
    category: 'TMJ & FACIAL PAIN',
    description: 'Targeted therapy for jaw joint pain, clicking, and teeth grinding relief using custom digital splints.',
    tags: 'Pain Relief • Custom Guards • Balance',
    image: '/images/service_tmj.jpg',
    iconType: 'digital',
  },
  {
    id: 'pediatric-dental-care',
    title: 'Pediatric Dental Care',
    category: 'PEDIATRIC DENTISTRY',
    description: 'Child-friendly, anxiety-free dentistry focusing on painless preventive treatments and healthy habits.',
    tags: 'Gentle • Fun • Fear-Free',
    image: '/images/service_pediatric.jpg',
    iconType: 'family',
  },
  {
    id: 'mucosal-pathology-biopsy',
    title: 'Mucosal Pathology & Biopsy Procedures',
    category: 'ORAL MEDICINE',
    description: 'Specialist diagnostic screening and biopsy procedures for comprehensive oral mucosal health.',
    tags: 'Accurate • Early Detection • Safe',
    image: '/images/service_mucosal_pathology.jpg',
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
  onToggleShowAllServices,
  onOpenBooking,
}) => {
  const [internalShowAll, setInternalShowAll] = useState(false);
  const isShowAll = externalShowAll !== undefined ? externalShowAll : internalShowAll;

  const handleToggle = () => {
    if (onToggleShowAllServices) {
      onToggleShowAllServices();
    } else {
      setInternalShowAll((prev) => !prev);
    }
  };

  const renderServiceCard = (service: ServiceItem, index: number) => {
    return (
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onOpenBooking?.()}
        className="service-card-item"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '22px',
          border: '1px solid rgba(226, 232, 240, 0.85)',
          padding: '12px 12px 18px 12px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 20px -3px rgba(15, 23, 42, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease',
        }}
      >
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
          className="service-card-image-wrap"
        >
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="service-card-img"
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
            {/* Feature Highlights with Teal Solid Check Icon */}
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

            {/* Circular Arrow Action Button */}
            <div
              className="service-card-arrow"
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
                transition: 'all 0.22s ease',
              }}
            >
              <ArrowRight size={15} />
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
        paddingBottom: 'clamp(3.5rem, 5.5vw, 5.5rem)',
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
              style={{
                width: '20px',
                height: '2px',
                backgroundColor: '#08B9C3',
                borderRadius: '2px',
                display: 'inline-block',
              }}
            />
            <span
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
          </div>

          {/* Main Title: Comprehensive Dental Care */}
          <h2
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
            <span style={{ color: '#08B9C3' }}>Dental Care</span>
          </h2>

          {/* Subtitle */}
          <p
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

        {/* Centered 'See All Services' Pill Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'clamp(2.5rem, 4vw, 3.5rem)',
          }}
        >
          <button
            type="button"
            onClick={handleToggle}
            aria-expanded={isShowAll}
            aria-label={isShowAll ? 'Show fewer services' : 'See all dental services'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #08B9C3 0%, #06A0A9 100%)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-main, sans-serif)',
              fontSize: '0.98rem',
              fontWeight: 600,
              padding: '13px 30px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px -4px rgba(8, 185, 195, 0.4)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(8, 185, 195, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(8, 185, 195, 0.4)';
            }}
          >
            <span>{isShowAll ? 'See Less' : 'See All Services'}</span>
            {isShowAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Responsive Styles & Hover Micro-interactions */}
      <style>{`
        .service-card-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px -8px rgba(8, 185, 195, 0.14), 0 8px 16px -4px rgba(15, 23, 42, 0.06) !important;
          border-color: rgba(8, 185, 195, 0.35) !important;
        }
        .service-card-item:hover .service-card-img {
          transform: scale(1.05);
        }
        .service-card-item:hover .service-card-arrow {
          background-color: #08B9C3 !important;
          border-color: #08B9C3 !important;
          color: #FFFFFF !important;
          transform: translateX(3px);
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
