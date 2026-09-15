import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Doctor {
  name: string;
  specialty: string;
  image: string;
  bg: string;
}

const doctors: Doctor[] = [
  {
    name: 'Dr. John Smith',
    specialty: 'Orthodontics Specialist',
    image: '/images/doctor_john_smith.jpg',
    bg: '#F5A47E',
  },
  {
    name: 'Dr. David Kim',
    specialty: 'Endodontics Specialist',
    image: '/images/doctor_david_kim.jpg',
    bg: '#D0B4F8',
  },
  {
    name: 'Dr. Sarah Lee',
    specialty: 'Periodontics Specialist',
    image: '/images/doctor_sarah_lee.jpg',
    bg: '#F7DE76',
  },
  {
    name: 'Dr. Steven Lee',
    specialty: 'Cosmetic Dentistry',
    image: '/images/doctor_steven_lee.jpg',
    bg: '#BFE0F7',
  },
  {
    name: 'Dr. Jennifer Kim',
    specialty: 'Orthodontics Specialist',
    image: '/images/doctor_jennifer_kim.jpg',
    bg: '#C4E8D6',
  },
  {
    name: 'Dr. Peter Stark',
    specialty: 'Pediatric Dentistry',
    image: '/images/doctor_peter_stark.jpg',
    bg: '#B8DCFA',
  },
  {
    name: 'Dr. Bradley Parker',
    specialty: 'Maxillofacial Surgeon',
    image: '/images/doctor_bradley_parker.jpg',
    bg: '#CFB8F8',
  },
];

export const SpecialistsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Maintain native vertical page scrolling when mouse wheel is used over carousel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If the wheel movement is primarily vertical
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Prevent the horizontal scroll container from trapping or swallowing vertical wheel
        e.preventDefault();

        // Normalize delta across line and page modes
        let delta = e.deltaY;
        if (e.deltaMode === 1) {
          delta *= 33; // Line mode
        } else if (e.deltaMode === 2) {
          delta *= window.innerHeight; // Page mode
        }

        // Scroll the page vertically with instant native response
        window.scrollBy({
          top: delta,
          left: 0,
          behavior: 'instant',
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const amount = 320;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const target = direction === 'left' ? Math.max(0, currentScroll - amount) : currentScroll + amount;
    scrollContainerRef.current.scrollTo({
      left: target,
      behavior: 'smooth',
    });
  };

  // Mouse drag support for smooth horizontal interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section
      id="specialists"
      style={{
        backgroundColor: 'var(--color-lavender)',
        position: 'relative',
        paddingTop: '0',
        paddingBottom: 'clamp(5rem, 8vw, 8rem)',
        overflow: 'hidden',
      }}
    >
      {/* Downward Concave Wave Divider Transition from Cream into Lavender (Strictly matching Frame 09) */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
          position: 'relative',
        }}
      >
        <svg
          viewBox="0 0 1440 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        >
          {/* Cream section scooping downward into the lavender */}
          <path
            d="M0,0 L1440,0 L1440,15 C1080,145 360,145 0,15 Z"
            fill="var(--color-cream)"
          />
        </svg>

        {/* Apex Concentric Circular Badge: +See All (Centered at the lowest dip of the curve in Frame 09) */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(4px, 1.5vw, 12px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <a
            href="#specialists"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'clamp(56px, 7vw, 74px)',
              height: 'clamp(56px, 7vw, 74px)',
              borderRadius: '50%',
              backgroundColor: 'var(--color-lime)',
              color: '#5E2614',
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(0.72rem, 1.1vw, 0.82rem)',
              fontWeight: 700,
              boxShadow: '0 6px 18px rgba(0,0,0,0.14)',
              border: '2px solid var(--color-lime)',
              outline: '2px solid rgba(215, 248, 70, 0.45)',
              outlineOffset: '3px',
              textDecoration: 'none',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(215, 248, 70, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.14)';
            }}
          >
            +See All
          </a>
        </div>
      </div>

      {/* Header with Title & Delicate Outline Arrow Controls */}
      <div className="container" style={{ marginTop: 'clamp(2rem, 4vw, 4.5rem)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'clamp(2.5rem, 4.5vw, 4.5rem)',
            gap: '1rem',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 5.2vw, 5rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: 'var(--color-white)',
              margin: 0,
            }}
          >
            Our Specialist
          </motion.h2>

          {/* Thin White Outline Arrow Controls (Strictly matching Frame 09) */}
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              onClick={() => handleScroll('left')}
              aria-label="Previous Specialist"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255, 255, 255, 0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-white)',
                backgroundColor: 'transparent',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'var(--color-white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.75)';
              }}
            >
              <ArrowLeft size={20} strokeWidth={1.75} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Next Specialist"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255, 255, 255, 0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-white)',
                backgroundColor: 'transparent',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'var(--color-white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.75)';
              }}
            >
              <ArrowRight size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Doctor Cards Carousel (Keyframes 09–11) */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            display: 'flex',
            gap: 'clamp(1.25rem, 3vw, 2.5rem)',
            overflowX: 'auto',
            paddingBottom: '1.5rem',
            scrollSnapType: isDragging ? 'none' : 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'pan-y pan-x',
          }}
          className="doctors-carousel"
        >
          {doctors.map((doc, idx) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              style={{
                flex: '0 0 auto',
                width: 'clamp(165px, 21vw, 245px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                scrollSnapAlign: 'start',
              }}
            >
              {/* Circular Avatar with Distinct Pastel Backdrop Disc (Frame 09) */}
              <div
                style={{
                  width: 'clamp(145px, 18vw, 210px)',
                  height: 'clamp(145px, 18vw, 210px)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: doc.bg,
                  marginBottom: '1rem',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.35s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Doctor Name */}
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.15rem, 1.4vw, 1.35rem)',
                  fontWeight: 600,
                  color: 'var(--color-white)',
                  marginBottom: '0.25rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {doc.name}
              </h4>

              {/* Specialty */}
              <p
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.88)',
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                {doc.specialty}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .doctors-carousel::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
