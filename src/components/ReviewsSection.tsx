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
    category: 'Painless Root Canal',
    categoryBg: 'var(--color-brand-50)',
    leadQuote: '“Completely painless root canal treatment”',
    body: 'I was terrified of getting a root canal done, but the doctors at Smile Dentos made the entire procedure completely painless. The care, modern instruments, and gentle handling were truly remarkable. Highly recommend!',
    author: 'Mohammed Shafi K.',
    rating: 5,
  },
  {
    id: '2',
    category: 'Clear Aligners & Braces',
    categoryBg: 'var(--color-teal-50)',
    leadQuote: '“Best orthodontic clinic in Valanchery”',
    body: 'Consulted here for my teeth alignment. The orthodontist clearly explained the treatment timeline and cost without any hidden charges. My smile confidence has improved so much in just a few months!',
    author: 'Anjali Menon',
    rating: 5,
  },
  {
    id: '3',
    category: 'Pediatric Dentistry',
    categoryBg: 'var(--color-brand-50)',
    leadQuote: '“So patient and gentle with my 6-year-old”',
    body: 'Taking my daughter to a dentist used to be a struggle until we visited Smile Dentos. The doctors and staff were so warm and friendly that she sat through her cavity filling without crying once.',
    author: 'Fathima Raniya',
    rating: 5,
  },
  {
    id: '4',
    category: 'Dental Implants & Crowns',
    categoryBg: 'var(--color-teal-50)',
    leadQuote: '“Restored my father’s smile and chewing comfort”',
    body: 'Got dental implants and zirconia crowns done for my father. The precision and finish look exactly like natural teeth. The clinic hygiene and post-treatment follow-up calls were exceptional.',
    author: 'Sujith Kumar P.',
    rating: 5,
  },
  {
    id: '5',
    category: 'Wisdom Tooth Extraction',
    categoryBg: 'var(--color-brand-50)',
    leadQuote: '“Smooth wisdom tooth removal without swelling”',
    body: 'Had severe pain due to an impacted wisdom tooth. The oral surgeon extracted it in less than 20 minutes with zero discomfort during the procedure. Fast recovery and very reasonable charges.',
    author: 'Dr. Harikrishnan Nair',
    rating: 5,
  },
  {
    id: '6',
    category: 'Teeth Cleaning & Whitening',
    categoryBg: 'var(--color-teal-50)',
    leadQuote: '“Pristine hygiene and thorough scaling”',
    body: 'Visited for deep teeth cleaning and polishing before a family wedding. The doctor patiently explained daily oral hygiene tips and plaque prevention. Very spotless clinic environment opposite Hamad Lab.',
    author: 'Aysha Nihala',
    rating: 5,
  },
  {
    id: '7',
    category: 'Family Dental Care',
    categoryBg: 'var(--color-brand-50)',
    leadQuote: '“Our trusted dental clinic for the whole family”',
    body: 'From regular checkups for my grandparents to dental fillings for my children, Smile Dentos has been our family’s go-to clinic in Valanchery. Punctual appointments and wonderful hospitality.',
    author: 'Abdul Rasheed V.P.',
    rating: 5,
  },
  {
    id: '8',
    category: 'Emergency Dental Relief',
    categoryBg: 'var(--color-teal-50)',
    leadQuote: '“Immediate relief for sudden toothache”',
    body: 'Walked in with excruciating late-evening toothache. The team accommodated me promptly, diagnosed the nerve issue, and provided immediate relief. Immensely grateful for their prompt care.',
    author: 'Vignesh K. Ram',
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
        backgroundColor: '#F0F2F6',
        color: 'var(--color-neutral-900)',
        paddingTop: 'clamp(4.5rem, 7vw, 8rem)',
        paddingBottom: 'clamp(4.5rem, 7vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header with Masked Entrance Reveal & Navigation Controls */}
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
                backgroundColor: 'var(--color-neutral-0)',
                padding: '0.4rem 1.1rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--color-neutral-200)',
                boxShadow: '0 4px 14px rgba(12, 43, 109, 0.04)',
                width: 'fit-content',
              }}
            >
              <div style={{ display: 'flex', gap: '2px', color: '#E5A500', fontSize: '0.95rem' }}>
                ★★★★★
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-neutral-800)', fontFamily: 'var(--font-main)' }}>
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
                  color: 'var(--color-neutral-900)',
                  margin: 0,
                }}
              >
                39 Google Reviews
              </motion.h2>
            </div>

            <p style={{ margin: 0, fontFamily: 'var(--font-main)', fontSize: '0.92rem', color: 'var(--color-neutral-600)' }}>
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
                border: '1.5px solid var(--color-brand-500)',
                color: 'var(--color-brand-500)',
                backgroundColor: '#FFFFFF',
                fontFamily: 'var(--font-main)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-brand-500)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = 'var(--color-brand-500)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Rate on Google</span>
              <ExternalLink size={14} />
            </a>

            {/* Thin Circular Outline Arrow Buttons */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous Reviews"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--color-brand-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-brand-500)',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-brand-500)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = 'var(--color-brand-500)';
                  e.currentTarget.style.transform = 'scale(1)';
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
                  border: '1.5px solid var(--color-brand-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-brand-500)',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-brand-500)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = 'var(--color-brand-500)';
                  e.currentTarget.style.transform = 'scale(1)';
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
                  backgroundColor: 'var(--color-neutral-0)',
                  borderRadius: 'var(--radius-card)',
                  padding: 'clamp(1.6rem, 2.5vw, 2.8rem) clamp(1.4rem, 2vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 'clamp(280px, 32vw, 380px)',
                  boxShadow: '0 8px 30px rgba(12, 43, 109, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(12, 43, 109, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(12, 43, 109, 0.04)';
                }}
              >
                <div>
                  {/* Category Pill Tag */}
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: rev.categoryBg,
                      color: 'var(--color-neutral-800)',
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      padding: '0.35rem 1.1rem',
                      borderRadius: 'var(--radius-pill)',
                      marginBottom: '1.25rem',
                      border: '1px solid var(--color-neutral-200)',
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
                      color: 'var(--color-neutral-800)',
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
                      color: 'var(--color-neutral-600)',
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
                    borderTop: '1px solid var(--color-neutral-200)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        color: 'var(--color-neutral-800)',
                      }}
                    >
                      {rev.author}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-neutral-500)', fontWeight: 500 }}>
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
