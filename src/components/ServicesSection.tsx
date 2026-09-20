import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  bg?: string;
}

// 5 services shown in first view
const initialServices: ServiceItem[] = [
  {
    id: 'digital-imaging',
    title: 'Digital Imaging',
    description:
      'High-resolution 3D CBCT imaging, ultra-low radiation panoramic scans, and computer-guided diagnostics for precision treatment planning and zero guesswork.',
    image: '/images/service_digital_imaging.jpg',
    bg: '#EBF3FA',
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    description:
      'Custom porcelain veneers, smile design makeovers, aesthetic bonding, and tooth contouring tailored to enhance your natural facial harmony with long-lasting beauty.',
    image: '/images/service_cosmetic_dentistry.jpg',
    bg: '#FDF6EE',
  },
  {
    id: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    description:
      'Gentle, compassionate dental care designed specifically for infants, children, and teens in a welcoming, stress-free environment with friendly specialist doctors.',
    image: '/images/service_pediatric.jpg',
    bg: '#F3F8EE',
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    description:
      'State-of-the-art titanium and zirconia implant restorations providing permanent, natural-feeling tooth replacements with computer-guided surgical accuracy.',
    image: '/images/service_implants.jpg',
    bg: '#F5EDE0',
  },
  {
    id: 'minor-surgery',
    title: 'Minor Surgery',
    description:
      'Advanced surgical extractions, wisdom tooth procedures, bone grafting, and gentle maxillofacial treatments performed with precision surgical microscopes.',
    image: '/images/service_surgery.jpg',
    bg: '#F5EDE0',
  },
];

// 3 services revealed when clicking 'See All'
const seeAllServices: ServiceItem[] = [
  {
    id: 'endodontics',
    title: 'Endodontics',
    description:
      'Microscope-enhanced root canal therapy and pulp treatments dedicated to relieving discomfort, clearing infection, and saving your natural tooth structure.',
    image: '/images/service_endodontics.jpg',
    bg: '#EFF4F8',
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    description:
      'Clear aligners, ceramic braces, and comprehensive bite correction for children, teens, and adults to achieve properly aligned, confident smiles.',
    image: '/images/service_orthodontics.jpg',
    bg: '#EEF6F4',
  },
  {
    id: 'tooth-whitening',
    title: 'Tooth Whitening',
    description:
      'Professional in-clinic laser whitening and customized take-home trays that safely and effectively brighten your smile by several shades in a single visit.',
    image: '/images/service_whitening.jpg',
    bg: '#F8DA68',
  },
];

interface ServicesSectionProps {
  showAllServices?: boolean;
  onToggleShowAllServices?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  showAllServices: externalShowAll,
}) => {
  const isShowAll = !!externalShowAll;

  // All service accordion options closed by default on page load / refresh
  const [activeId, setActiveId] = useState<string | null>(null);

  const renderServiceRow = (service: ServiceItem) => {
    const isActive = activeId === service.id;

    return (
      <div
        key={service.id}
        style={{
          borderBottom: '1px solid rgba(94, 38, 20, 0.18)',
          transition: 'background-color 0.25s ease',
        }}
      >
        {/* Clickable Header Row */}
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
              color: '#5E2614',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {service.title}
          </h3>

          {/* Tactile + / - toggle icon */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1.5px solid rgba(94, 38, 20, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginLeft: '1rem',
              color: '#5E2614',
              backgroundColor: isActive ? 'rgba(94, 38, 20, 0.08)' : 'transparent',
              transition: 'all 0.25s ease',
            }}
          >
            <motion.span
              animate={{ rotate: isActive ? 45 : 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                display: 'inline-block',
                fontSize: '1.5rem',
                lineHeight: 1,
                fontWeight: 300,
                userSelect: 'none',
              }}
            >
              +
            </motion.span>
          </div>
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
                      color: '#5E2614',
                      opacity: 0.85,
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
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 12px 30px rgba(94, 38, 20, 0.12)',
                      width: 'clamp(280px, 35vw, 460px)',
                      height: 'clamp(170px, 22vw, 280px)',
                      backgroundColor: service.bg || '#F5EDE0',
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
                        objectPosition: 'center',
                        display: 'block',
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
        backgroundColor: 'var(--color-cream)',
        color: '#5E2614',
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
                color: '#5E2614',
                lineHeight: 1,
              }}
            >
              <span>Our Services</span>
              <span style={{ fontSize: '0.85em', color: '#5E2614', opacity: 0.9 }}>✻</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Accordion List Container */}
      <div className="container">
        <div
          style={{
            borderTop: '1px solid rgba(94, 38, 20, 0.18)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 5 services in first view */}
          {initialServices.map(renderServiceRow)}

          {/* 3 services in See All section */}
          <AnimatePresence>
            {isShowAll && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
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
