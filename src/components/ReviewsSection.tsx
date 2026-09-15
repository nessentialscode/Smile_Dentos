import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

interface Review {
  id: string;
  category: string;
  categoryBg: string;
  leadQuote: string;
  body: string;
  author: string;
  rating: number;
}

const GOOGLE_MAPS_REVIEWS_URL =
  'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQvq_-tO-WAxUAAAAAHQAAAAAQBQ..i&pvq=Cg0vZy8xMXk4NGczOHdfIicKIXNtaWxlIGRlbnRvcyBmYW1pbHkgZGVudGFsIGNsaW5pYxACGAM&lqi=CiFzbWlsZSBkZW50b3MgZmFtaWx5IGRlbnRhbCBjbGluaWNI_8aGx6C9gIAIWjcQABABEAIQAxAEGAAYARgCGAMYBCIhc21pbGUgZGVudG9zIGZhbWlseSBkZW50YWwgY2xpbmljkgEHZGVudGlzdA&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba7b70c7574ba2b:0x724a06ff017fd89b';

const reviewsData: Review[] = [
  {
    id: '1',
    category: 'Patient Experience',
    categoryBg: '#FDF1CC',
    leadQuote: '“Outstanding service & friendly staff”',
    body: 'The staff were friendly, the clinic was clean, and the service was outstanding. Gentle care from start to finish.',
    author: 'Verified Google Patient',
    rating: 5,
  },
  {
    id: '2',
    category: 'Doctor Care',
    categoryBg: '#E9E0FA',
    leadQuote: '“Quality treatment and friendly doctors”',
    body: 'Quality treatment and friendly doctors. Highly recommended for families in Valanchery seeking painless dental treatments.',
    author: 'Valanchery Patient',
    rating: 5,
  },
  {
    id: '3',
    category: 'Professionalism',
    categoryBg: '#D8ECF9',
    leadQuote: '“Deeply dedicated to their work”',
    body: 'The team is highly professional and deeply dedicated to their work. Pristine hygienic clinic and compassionate staff.',
    author: 'Google Local Reviewer',
    rating: 5,
  },
  {
    id: '4',
    category: 'Family Dentistry',
    categoryBg: '#E2F8DB',
    leadQuote: '“Convenient location & top hygiene”',
    body: 'Conveniently located opposite Hamad Lab in Kolamangalam, Valanchery. Excellent orthodontic and dental filling care for all ages.',
    author: 'Family Care Review',
    rating: 5,
  },
];

export const ReviewsSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleCount = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const visibleReviews = Array.from({ length: visibleCount }).map((_, offset) => {
    return reviewsData[(startIndex + offset) % reviewsData.length];
  });

  return (
    <section
      id="reviews"
      style={{
        backgroundColor: 'var(--color-cream)',
        color: '#5E2614',
        paddingTop: 'clamp(4.5rem, 7vw, 8rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header with Masked Entrance Reveal & Navigation Controls (Keyframes 15–17) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 'clamp(2.5rem, 4.5vw, 4.5rem)',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
          className="reviews-header-row"
        >
          {/* Masked reveal container matching Frame 15 with 5.0 Google Badge */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--color-white)',
                padding: '0.4rem 1.1rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(94, 38, 20, 0.15)',
                boxShadow: '0 4px 14px rgba(94, 38, 20, 0.05)',
                width: 'fit-content',
              }}
            >
              <div style={{ display: 'flex', gap: '2px', color: '#E5A500', fontSize: '0.95rem' }}>
                ★★★★★
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#5E2614', fontFamily: 'var(--font-main)' }}>
                5.0 Google Review Summary
              </span>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 5vw, 4.4rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#5E2614',
                  margin: 0,
                }}
              >
                39 Google Reviews
              </motion.h2>
            </div>

            <p style={{ margin: 0, fontFamily: 'var(--font-main)', fontSize: '0.92rem', color: '#5E2614', opacity: 0.8 }}>
              100% 5-Star rated patient experiences at Smile Dentos, Valanchery
            </p>
          </div>

          {/* Action Links & Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid #5E2614',
                color: '#5E2614',
                fontFamily: 'var(--font-main)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5E2614';
                e.currentTarget.style.color = 'var(--color-cream)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#5E2614';
              }}
            >
              <span>Rate on Google</span>
              <ExternalLink size={14} />
            </a>

            {/* Thin Circular Outline Arrow Buttons (Frame 15) */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous Reviews"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1.5px solid #5E2614',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5E2614',
                  backgroundColor: 'transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5E2614';
                  e.currentTarget.style.color = 'var(--color-cream)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#5E2614';
                }}
              >
                <ArrowLeft size={19} strokeWidth={1.75} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Reviews"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1.5px solid #5E2614',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5E2614',
                  backgroundColor: 'transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5E2614';
                  e.currentTarget.style.color = 'var(--color-cream)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#5E2614';
                }}
              >
                <ArrowRight size={19} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
            gap: 'clamp(1.25rem, 2vw, 2.2rem)',
          }}
          className="reviews-grid"
        >
          <AnimatePresence mode="popLayout">
            {visibleReviews.map((rev, idx) => (
              <motion.div
                key={rev.id + startIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-card)',
                  padding: 'clamp(1.6rem, 2.5vw, 2.8rem) clamp(1.4rem, 2vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 'clamp(280px, 32vw, 380px)',
                  boxShadow: '0 8px 30px rgba(94, 38, 20, 0.06)',
                  border: '1px solid rgba(94, 38, 20, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(94, 38, 20, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(94, 38, 20, 0.06)';
                }}
              >
                <div>
                  {/* Category Pill Tag (Frame 17) */}
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: rev.categoryBg,
                      color: '#5E2614',
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      padding: '0.35rem 1.1rem',
                      borderRadius: 'var(--radius-pill)',
                      marginBottom: '1.25rem',
                      border: '1px solid rgba(94, 38, 20, 0.15)',
                    }}
                  >
                    {rev.category}
                  </div>

                  {/* Lead Quote */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.15rem, 1.5vw, 1.5rem)',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      letterSpacing: '-0.02em',
                      color: '#5E2614',
                      marginBottom: '0.85rem',
                      marginTop: 0,
                    }}
                  >
                    {rev.leadQuote}
                  </h3>

                  {/* Body Copy */}
                  <p
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: 'clamp(0.88rem, 1.05vw, 1rem)',
                      lineHeight: 1.6,
                      color: '#5E2614',
                      opacity: 0.82,
                      margin: 0,
                    }}
                  >
                    {rev.body}
                  </p>
                </div>

                {/* Bottom Row: Author & 5 Stars */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '2rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(94, 38, 20, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: '#5E2614',
                      }}
                    >
                      {rev.author}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#5E2614', opacity: 0.65, fontWeight: 500 }}>
                      Google Review · 5.0 ★
                    </span>
                  </div>

                  {/* 5 Gold Stars */}
                  <div style={{ display: 'flex', gap: '3px', color: '#E5A500', fontSize: '1.05rem' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .reviews-header-row {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1.25rem !important;
          }
          .reviews-grid {
            max-width: 480px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};
