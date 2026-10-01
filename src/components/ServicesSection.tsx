import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  bg?: string;
}

// 6 Services shown on the main screen by default
const initialServices: ServiceItem[] = [
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description:
      'State-of-the-art titanium and zirconia implant restorations providing permanent, natural-feeling tooth replacements with computer-guided surgical accuracy and long-term bone preservation.',
    image: '/images/service_implants.jpg',
    bg: '#F5EDE0',
  },
  {
    id: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    description:
      'Advanced rotary and microscope-enhanced endodontic therapy designed to eliminate infection, relieve acute pain, and preserve your natural tooth structure in comfortable single or multi-visit care.',
    image: '/images/service_endodontics.jpg',
    bg: '#EFF4F8',
  },
  {
    id: 'braces-aligners',
    title: 'Braces & Aligners',
    description:
      'Comprehensive orthodontic alignment featuring certified Invisalign® clear aligners, ceramic braces, and self-ligating systems customized for children, teens, and adults to achieve ideal bite harmony.',
    image: '/images/service_orthodontics.jpg',
    bg: '#EEF6F4',
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    description:
      'Professional in-clinic diode laser whitening and custom home-bleaching systems that safely eliminate deep enamel discoloration, brightening your natural smile up to 8 shades with zero sensitivity.',
    image: '/images/service_whitening.jpg',
    bg: '#F8DA68',
  },
  {
    id: 'veneers-crowns',
    title: 'Veneers & Crowns',
    description:
      'Ultra-thin custom porcelain veneers and high-strength zirconia crowns meticulously crafted to restore chipped, discolored, or weakened teeth with natural translucency and radiant facial harmony.',
    image: '/images/service_cosmetic_dentistry.jpg',
    bg: '#FDF6EE',
  },
  {
    id: 'preventive-family-care',
    title: 'Preventive & Family Care',
    description:
      'Comprehensive oral wellness care including digital ultrasonic scaling, cavity-preventing fluoride therapy, pit-and-fissure sealants, and personalized oral hygiene counseling for the entire family.',
    image: '/images/service_preventive.jpg',
    bg: '#EBF3FA',
  },
];

// 6 Services revealed when clicking 'See All'
const seeAllServices: ServiceItem[] = [
  {
    id: 'periodontal-gum-surgery',
    title: 'Periodontal Therapy & Gum Surgery',
    description:
      'Specialized gum treatments including deep root planing, regenerative periodontal therapy, pocket reduction flap surgery, and aesthetic gingival contouring to protect vital bone support.',
    image: '/images/service_periodontal.jpg',
    bg: '#FDE8E8',
  },
  {
    id: 'minor-maxillofacial-surgeries',
    title: 'Minor Maxillofacial Surgeries',
    description:
      'Aseptic surgical management of impacted wisdom teeth, complex root extractions, cyst enucleation, frenectomies, and pre-prosthetic bone contouring performed with gentle local anesthesia.',
    image: '/images/service_surgery.jpg',
    bg: '#F5EDE0',
  },
  {
    id: 'full-partial-dentures',
    title: 'Full Dentures & Partial Dentures',
    description:
      'Precision-milled complete dentures, flexible Valplast partials, and implant-supported overdentures engineered for optimal chewing stability, phonetic clarity, and natural facial fullness.',
    image: '/images/service_dentures.jpg',
    bg: '#FFF7ED',
  },
  {
    id: 'tmj-treatment-splints',
    title: 'TMJ Treatment & Splints',
    description:
      'Targeted therapy for jaw joint pain, clicking, and bruxism (teeth grinding) using custom digital occlusal splints, neuromuscular stabilization guards, and gentle jaw rehabilitation exercises.',
    image: '/images/service_tmj.jpg',
    bg: '#EFF6FF',
  },
  {
    id: 'pediatric-dental-care',
    title: 'Pediatric Dental Care',
    description:
      'Child-friendly, anxiety-free dentistry focusing on painless preventive treatments, space maintainers, gentle restorations, and positive early dental habits in a warm, welcoming environment.',
    image: '/images/service_pediatric.jpg',
    bg: '#F3F8EE',
  },
  {
    id: 'mucosal-pathology-biopsy',
    title: 'Mucosal Pathology & Biopsy Procedures',
    description:
      'Specialist diagnostic screening and microscopic tissue biopsy for oral ulcers, white or red mucosal lesions, precancerous conditions, and soft tissue pathologies with expert histopathological analysis.',
    image: '/images/service_mucosal_pathology.jpg',
    bg: '#F5F3FF',
  },
];

interface ServicesSectionProps {
  showAllServices?: boolean;
  onToggleShowAllServices?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  showAllServices: externalShowAll,
  onToggleShowAllServices,
}) => {
  const isShowAll = !!externalShowAll;

  // All service accordion options closed by default on page load / refresh
  const [activeId, setActiveId] = useState<string | null>(null);

  const renderServiceRow = (service: ServiceItem) => {
    const isActive = activeId === service.id;

    return (
      <div
        key={service.id}
        onMouseEnter={() => setActiveId(service.id)}
        style={{
          borderBottom: '1px solid var(--color-neutral-200)',
          transition: 'background-color 0.25s ease',
          backgroundColor: isActive ? 'rgba(8, 185, 195, 0.03)' : 'transparent',
        }}
      >
        {/* Clickable / Hoverable Header Row */}
        <button
          type="button"
          onClick={() => setActiveId(isActive ? null : service.id)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(1.3rem, 2.5vw, 2.2rem) 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
          aria-expanded={isActive}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4.2vw, 4.4rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              color: isActive ? '#08B9C3' : 'var(--color-neutral-800)',
              lineHeight: 1.15,
              margin: 0,
              transform: isActive ? 'translateX(12px)' : 'translateX(0)',
              transition: 'color 0.25s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {service.title}
          </h3>
        </button>

        {/* Smooth, Strictly-Contained Expandable Content */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
                  gap: '2rem',
                  alignItems: 'center',
                  paddingBottom: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                  paddingTop: '0.25rem',
                }}
                className="service-expanded-content"
              >
                {/* Left: Description */}
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: 'clamp(0.95rem, 1.25vw, 1.12rem)',
                      lineHeight: 1.65,
                      color: 'var(--color-neutral-600)',
                      maxWidth: '520px',
                      paddingRight: '0.5rem',
                      margin: 0,
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Right: Procedure Preview Image */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                  className="service-image-col"
                >
                  <div
                    style={{
                      width: 'clamp(210px, 24vw, 290px)',
                      height: 'clamp(140px, 16vw, 190px)',
                      borderRadius: 'var(--radius-card)',
                      overflow: 'hidden',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                      backgroundColor: service.bg || 'var(--color-brand-50)',
                    }}
                    className="service-image-card"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section
      id="services"
      style={{
        backgroundColor: 'var(--color-neutral-0)',
        color: 'var(--color-neutral-900)',
        paddingTop: 'clamp(4rem, 7vw, 7rem)',
        paddingBottom: 'clamp(1rem, 1.5vw, 1.8rem)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Continuous Running Marquee Header: Our Services ✻ */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          display: 'flex',
          userSelect: 'none',
        }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2.5rem',
            willChange: 'transform',
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2.5rem',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.6rem, 6.5vw, 7.2rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: 'var(--color-neutral-900)',
                lineHeight: 1,
              }}
            >
              <span>Our Services</span>
              <span style={{ fontSize: '0.85em', color: '#08B9C3' }}>✻</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Accordion List Container */}
      <div className="container">
        <div
          onMouseLeave={() => setActiveId(null)}
          style={{
            borderTop: '1px solid var(--color-neutral-200)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 6 services on main screen */}
          {initialServices.map(renderServiceRow)}

          {/* 6 services revealed when clicking 'See All' */}
          <AnimatePresence>
            {isShowAll && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                style={{ overflow: 'hidden' }}
              >
                {seeAllServices.map(renderServiceRow)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .service-expanded-content {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .service-image-col {
            justify-content: flex-start !important;
            width: 100% !important;
          }
          .service-image-card {
            width: 100% !important;
            max-width: 100% !important;
            height: 200px !important;
          }
        }
      `}</style>
    </section>
  );
};
