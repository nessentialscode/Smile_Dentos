import React from 'react';
import { motion } from 'framer-motion';

interface AudienceCard {
  title: string;
  description: string;
  image: string;
  maskId: 'clipKids' | 'clipTeen' | 'clipAdults';
  bgColor: string;
}

const audienceData: AudienceCard[] = [
  {
    title: 'Kids',
    description:
      'Children need special attention when it comes to dental care, as their teeth and jaws are still developing.',
    image: '/images/who_kids.jpg',
    maskId: 'clipKids',
    bgColor: '#F5A47E',
  },
  {
    title: 'Teenage',
    description:
      'Teenagers may also need orthodontic treatment to correct bite issues or misaligned teeth.',
    image: '/images/who_teen.jpg',
    maskId: 'clipTeen',
    bgColor: '#F7DE76',
  },
  {
    title: 'Adults',
    description:
      'Adults may require various dental treatments, including prosthodontics, periodontics, and oral surgery',
    image: '/images/who_adults.jpg',
    maskId: 'clipAdults',
    bgColor: '#BFE0F7',
  },
];

export const WhoWeHelpSection: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-lavender-light)',
        color: '#5E2614',
        paddingTop: 'clamp(5rem, 8vw, 8rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8rem)',
        position: 'relative',
      }}
    >
      {/* SVG Clip Path Definitions strictly matching Reference Frame 14 */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          {/* Card 1: Smooth Scalloped Double-Lobe / Peanut Cutout for Kids */}
          <clipPath id="clipKids" clipPathUnits="objectBoundingBox">
            <path d="M 0.2,0.15 C 0.38,0.02 0.44,0.18 0.5,0.22 C 0.56,0.18 0.62,0.02 0.8,0.15 C 0.96,0.27 0.98,0.42 0.88,0.5 C 0.98,0.58 0.96,0.73 0.8,0.85 C 0.62,0.98 0.56,0.82 0.5,0.78 C 0.44,0.82 0.38,0.98 0.2,0.85 C 0.04,0.73 0.02,0.58 0.12,0.5 C 0.02,0.42 0.04,0.27 0.2,0.15 Z" />
          </clipPath>

          {/* Card 2: Smooth 4-Leaf Clover Cutout for Teenage */}
          <clipPath id="clipTeen" clipPathUnits="objectBoundingBox">
            <path d="M 0.5,0.1 C 0.64,0.02 0.8,0.06 0.86,0.18 C 0.92,0.3 0.86,0.42 0.82,0.46 C 0.95,0.5 1,0.64 0.94,0.78 C 0.88,0.9 0.74,0.94 0.62,0.88 C 0.56,0.84 0.52,0.8 0.5,0.84 C 0.44,0.96 0.3,1 0.18,0.94 C 0.06,0.88 0.02,0.74 0.08,0.62 C 0.12,0.54 0.18,0.5 0.14,0.46 C 0.02,0.42 -0.02,0.28 0.04,0.16 C 0.1,0.04 0.26,-0.02 0.38,0.06 C 0.45,0.11 0.48,0.16 0.5,0.1 Z" />
          </clipPath>

          {/* Card 3: Cathedral Arch Cutout for Adults */}
          <clipPath id="clipAdults" clipPathUnits="objectBoundingBox">
            <path d="M 0.08,0.95 L 0.08,0.48 C 0.08,0.15 0.25,0.05 0.5,0.05 C 0.75,0.05 0.92,0.15 0.92,0.48 L 0.92,0.95 C 0.92,0.98 0.88,1 0.85,1 L 0.15,1 C 0.11,1 0.08,0.98 0.08,0.95 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="container">
        {/* Centered Heading (Frame 14) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 5.2vw, 4.8rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: '#5E2614',
              margin: 0,
            }}
          >
            Who We Help?
          </h2>
        </motion.div>

        {/* 3 White Elevated Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1.25rem, 2vw, 2.5rem)',
          }}
          className="who-we-help-grid"
        >
          {audienceData.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-card)',
                padding: 'clamp(1.75rem, 3vw, 3rem) clamp(1.25rem, 2vw, 2.2rem)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 12px 35px rgba(94, 38, 20, 0.07)',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(94, 38, 20, 0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(94, 38, 20, 0.07)';
              }}
            >
              {/* Geometric Masked Preview Container with Pastel Color Disc (Frame 14) */}
              <div
                style={{
                  width: 'clamp(155px, 18vw, 230px)',
                  height: 'clamp(155px, 18vw, 230px)',
                  position: 'relative',
                  marginBottom: 'clamp(1.25rem, 2vw, 2rem)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: item.bgColor,
                  borderRadius: item.maskId === 'clipAdults' ? '120px 120px 24px 24px' : '44px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    clipPath: `url(#${item.maskId})`,
                    transition: 'transform 0.4s ease',
                  }}
                />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.3vw, 2.4rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#5E2614',
                  marginBottom: '0.75rem',
                  marginTop: 0,
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: 'clamp(0.88rem, 1.1vw, 1.05rem)',
                  lineHeight: 1.55,
                  color: '#5E2614',
                  opacity: 0.85,
                  maxWidth: '300px',
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .who-we-help-grid {
            grid-template-columns: 1fr !important;
            max-width: 440px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};
