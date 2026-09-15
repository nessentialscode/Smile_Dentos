import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  bg?: string;
}

const services: ServiceItem[] = [
  {
    id: 'fillings',
    title: 'Dental fillings',
    description:
      'It includes regular check-ups, cleanings, fillings, root canals, extractions, and precision restorative procedures to preserve natural tooth structure.',
    image: '/images/service_fillings.jpg',
  },
  {
    id: 'whitening',
    title: 'Teeth whitening',
    description:
      'It includes regular check-ups, cleanings, fillings, root canals, extractions, and cosmetic procedures like teeth whitening and orthodontics. It includes regular check-ups, cleanings, fillings, root canals, extractions, and cosmetic procedures like teeth whitening and orthodontics.',
    image: '/images/service_whitening.jpg',
    bg: '#F8DA68',
  },
  {
    id: 'surgery',
    title: 'Oral Surgery',
    description:
      'Advanced surgical extractions, wisdom tooth procedures, bone grafting, and gentle maxillofacial treatments performed with precision surgical microscopes.',
    image: '/images/service_surgery.jpg',
  },
  {
    id: 'implants',
    title: 'Dental implants',
    description:
      'State-of-the-art titanium and zirconia implant restorations providing permanent, natural-feeling tooth replacements with computer-guided surgical accuracy.',
    image: '/images/service_implants.jpg',
  },
];

export const ServicesSection: React.FC = () => {
  // Start with 'whitening' expanded to match the keyframe sequence (Frame 08)
  const [activeId, setActiveId] = useState<string>('whitening');

  return (
    <section
      id="services"
      style={{
        backgroundColor: 'var(--color-cream)',
        color: '#5E2614',
        paddingTop: 'clamp(4rem, 7vw, 7rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8rem)',
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
          {services.map((service) => {
            const isActive = activeId === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActiveId(isActive ? '' : service.id)}
                style={{
                  borderBottom: '1px solid rgba(94, 38, 20, 0.18)',
                  cursor: 'pointer',
                  padding: isActive ? 'clamp(1.8rem, 3.5vw, 3.5rem) 0' : 'clamp(1.3rem, 2.5vw, 2.2rem) 0',
                  transition: 'background-color 0.25s ease',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
                    alignItems: isActive ? 'start' : 'center',
                    gap: '2rem',
                  }}
                  className="service-row-grid"
                >
                  {/* Left Column: Title & Animated Expanded Description */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
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
                      {/* Mobile Expand Indicator */}
                      <span
                        className="service-expand-indicator"
                        style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '1.4rem',
                          fontWeight: 300,
                          color: '#5E2614',
                          opacity: 0.6,
                          userSelect: 'none',
                          lineHeight: 1,
                        }}
                      >
                        {isActive ? '−' : '+'}
                      </span>
                    </div>

                    {/* Expanded Description Copy */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p
                            style={{
                              fontFamily: 'var(--font-main)',
                              fontSize: 'clamp(0.95rem, 1.25vw, 1.12rem)',
                              lineHeight: 1.6,
                              color: '#5E2614',
                              opacity: 0.85,
                              maxWidth: '520px',
                              paddingRight: '0.5rem',
                              margin: 0,
                            }}
                          >
                            {service.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right Column: Procedure Image Thumbnail or Enlarged Card */}
                  <div
                    className="service-img-wrapper"
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <motion.div
                      layout
                      className={`service-img-box ${isActive ? 'active' : 'collapsed'}`}
                      style={{
                        borderRadius: isActive ? '18px' : '12px',
                        overflow: 'hidden',
                        boxShadow: isActive ? '0 14px 35px rgba(94, 38, 20, 0.16)' : '0 4px 12px rgba(0,0,0,0.06)',
                        width: isActive ? 'clamp(280px, 35vw, 480px)' : 'clamp(140px, 16vw, 210px)',
                        height: isActive ? 'clamp(170px, 22vw, 290px)' : 'clamp(85px, 10vw, 125px)',
                        backgroundColor: service.bg || '#F5EDE0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 641px) {
          .service-expand-indicator {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .service-row-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .service-img-wrapper {
            justify-content: flex-start !important;
            width: 100% !important;
          }
          .service-img-box.active {
            width: 100% !important;
            max-width: 100% !important;
            height: 210px !important;
          }
          .service-img-box.collapsed {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
