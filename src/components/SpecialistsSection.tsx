import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Award,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bg: string;
  bio: string;
  degreeTitle: string;
  degreeSub: string;
  experienceTitle: string;
  experienceSub: string;
  patientsTitle: string;
  patientsSub: string;
}

const doctors: Doctor[] = [
  {
    id: 'john-smith',
    name: 'Dr. John Smith',
    specialty: 'Orthodontics Specialist',
    image: '/images/doctor_john_smith.jpg',
    bg: '#EE9564', // Warm Peach / Orange from image
    bio: 'Pioneering digital smile design, Invisalign, and modern orthodontic alignment for patients of all ages.',
    degreeTitle: 'BDS, MDS',
    degreeSub: '(Orthodontics)',
    experienceTitle: '10+ Years',
    experienceSub: 'Experience',
    patientsTitle: '2,400+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'david-kim',
    name: 'Dr. David Kim',
    specialty: 'Endodontics Specialist',
    image: '/images/doctor_david_kim.jpg',
    bg: '#C5AEE3', // Soft Lilac / Purple from image
    bio: 'Specializing in single-visit root canals, microscopic endodontics, and gentle tooth preservation.',
    degreeTitle: 'DDS, MS',
    degreeSub: '(Endodontics)',
    experienceTitle: '8+ Years',
    experienceSub: 'Experience',
    patientsTitle: '1,800+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'sarah-lee',
    name: 'Dr. Sarah Lee',
    specialty: 'Periodontics Specialist',
    image: '/images/doctor_sarah_lee.jpg',
    bg: '#F6C844', // Golden Yellow from image
    bio: 'Specializes in gum care, dental implants, and advanced periodontal treatments. Dedicated to helping you achieve a healthier smile.',
    degreeTitle: 'BDS, MDS',
    degreeSub: '(Periodontology)',
    experienceTitle: '5+ Years',
    experienceSub: 'Experience',
    patientsTitle: '1,000+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'steven-lee',
    name: 'Dr. Steven Lee',
    specialty: 'Cosmetic Dentistry',
    image: '/images/doctor_steven_lee.jpg',
    bg: '#82B3EB', // Ocean Sky Blue from image
    bio: 'Crafting bespoke porcelain veneers, laser teeth whitening, and complete aesthetic smile makeovers.',
    degreeTitle: 'DDS, FICOI',
    degreeSub: '(Cosmetic)',
    experienceTitle: '7+ Years',
    experienceSub: 'Experience',
    patientsTitle: '1,500+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'jennifer-kim',
    name: 'Dr. Jennifer Kim',
    specialty: 'Orthodontics Specialist',
    image: '/images/doctor_jennifer_kim.jpg',
    bg: '#7CBF6B', // Fresh Sage Green from image
    bio: 'Dedicated to gentle, personalized orthodontic treatments, invisible aligners, and adolescent smile corrections.',
    degreeTitle: 'BDS, MS',
    degreeSub: '(Orthodontics)',
    experienceTitle: '6+ Years',
    experienceSub: 'Experience',
    patientsTitle: '1,200+',
    patientsSub: 'Happy Patients',
  },
];

interface SpecialistsSectionProps {
  onOpenBooking?: (doctorName?: string) => void;
  showAllServices?: boolean;
  onToggleShowAllServices?: () => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({
  onOpenBooking,
  showAllServices,
  onToggleShowAllServices,
}) => {
  // Detailed card only opens when cursor is placed on it (hover). Default is null.
  const [hoveredDoctorIndex, setHoveredDoctorIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Drag and touch swipe state for mobile
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Gesture refs
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const isSwipingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hover handlers: open detailed card when cursor is placed on a doctor
  const handleMouseEnter = (index: number) => {
    if (isMobile) return;
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setHoveredDoctorIndex(index);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredDoctorIndex(null);
    }, 220);
  };

  // Click/tap handler: on mobile, toggle card open/close; on desktop, also open
  const handleDoctorClick = (index: number) => {
    if (isSwipingRef.current) return;
    setHoveredDoctorIndex((prev) => (prev === index ? null : index));
  };

  // Arrow navigation: cycles through doctors and opens their detailed card
  const handleArrowNav = (direction: 'left' | 'right') => {
    setHoveredDoctorIndex((prev) => {
      const current = prev !== null ? prev : 2;
      return direction === 'right'
        ? (current + 1) % doctors.length
        : (current - 1 + doctors.length) % doctors.length;
    });
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    isHorizontalSwipeRef.current = null;
    isSwipingRef.current = false;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(diffX) > 7 || Math.abs(diffY) > 7) {
        isHorizontalSwipeRef.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      isSwipingRef.current = true;
      setIsDragging(true);
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartRef.current && isHorizontalSwipeRef.current) {
      const elapsed = Date.now() - touchStartRef.current.time;
      const isQuickFlick = elapsed < 300 && Math.abs(dragOffset) > 25;
      const isPastThreshold = Math.abs(dragOffset) > 45;

      if (isQuickFlick || isPastThreshold) {
        if (dragOffset < 0) {
          handleArrowNav('right');
        } else {
          handleArrowNav('left');
        }
      }
    }

    setDragOffset(0);
    setIsDragging(false);
    touchStartRef.current = null;
    isHorizontalSwipeRef.current = null;
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 60);
  };

  // Increased distance between doctors so detailed card never hides neighboring names
  const desktopSlotWidth = 185;
  const desktopSlotGap = 'clamp(56px, 4.8vw, 78px)';
  const mobileSlotWidth = 160;
  const mobileSlotGap = 20;

  // On mobile only, slide carousel if a doctor is selected
  const mobileTranslateX =
    hoveredDoctorIndex !== null
      ? (2 - hoveredDoctorIndex) * (mobileSlotWidth + mobileSlotGap) + dragOffset
      : dragOffset;

  return (
    <div
      style={{
        backgroundColor: '#5E2614', // Rich continuous brown behind and beneath
        position: 'relative',
        zIndex: 10,
        overflow: 'visible',
      }}
    >
      {/* Upper Lavender Section */}
      <section
        id="specialists"
        style={{
          backgroundColor: 'var(--color-lavender)',
          borderBottomLeftRadius: 'clamp(32px, 4vw, 48px)',
          borderBottomRightRadius: 'clamp(32px, 4vw, 48px)',
          position: 'relative',
          paddingTop: 0,
          paddingBottom: isMobile
            ? (hoveredDoctorIndex !== null ? '430px' : '1.4rem')
            : '1.4rem',
          minHeight: isMobile
            ? (hoveredDoctorIndex !== null ? '620px' : undefined)
            : '500px',
          transition: 'padding-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1), min-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'visible',
          zIndex: 20,
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.14)',
        }}
      >
        {/* Top Wave Divider Transition from Cream Services into Lavender (Adjusted smoothly upwards) */}
        <div
          style={{
            width: '100%',
            overflow: 'visible',
            lineHeight: 0,
            position: 'relative',
            marginTop: 'clamp(-2.8rem, -3.5vw, -1.8rem)',
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
            <path
              d="M0,0 L1440,0 L1440,15 C1080,145 360,145 0,15 Z"
              fill="var(--color-cream)"
            />
          </svg>

          {/* Apex Concentric Circular Badge: +See All / –See Less */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%, 50%)',
              zIndex: 20,
            }}
          >
            <button
              type="button"
              onClick={onToggleShowAllServices}
              aria-label={showAllServices ? 'Show fewer services' : 'See all services'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'clamp(62px, 7vw, 76px)',
                height: 'clamp(62px, 7vw, 76px)',
                borderRadius: '50%',
                backgroundColor: 'var(--color-lime)',
                color: '#5E2614',
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(0.72rem, 1.05vw, 0.82rem)',
                fontWeight: 700,
                boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
                border: '2.5px solid var(--color-lime)',
                outline: '2.5px solid rgba(215, 248, 70, 0.55)',
                outlineOffset: '3px',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(215, 248, 70, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.18)';
              }}
            >
              {showAllServices ? '–See Less' : '+See All'}
            </button>
          </div>
        </div>

        {/* Section Header: Title & Outline Arrows */}
        <div
          className="container"
          style={{
            marginTop: 'clamp(1.8rem, 3.2vw, 3.2rem)',
            marginBottom: 'clamp(2rem, 3.5vw, 3.2rem)',
            maxWidth: '1380px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            {/* Left Header Title */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '0.35rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.92)',
                    textTransform: 'uppercase',
                  }}
                >
                  MEET OUR EXPERTS
                </span>
                <span
                  style={{
                    width: '32px',
                    height: '3px',
                    backgroundColor: 'var(--color-lime)',
                    borderRadius: '2px',
                    display: 'inline-block',
                  }}
                />
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Our Specialist
              </h2>
            </div>

            {/* Right Header Navigation Arrows (Matching reference outline circles) */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => handleArrowNav('left')}
                aria-label="Previous Specialist"
                className="specialist-nav-btn"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255, 255, 255, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  backgroundColor: 'transparent',
                  transition: 'all 0.22s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.borderColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.65)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <ArrowLeft size={20} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => handleArrowNav('right')}
                aria-label="Next Specialist"
                className="specialist-nav-btn"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255, 255, 255, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  backgroundColor: 'transparent',
                  transition: 'all 0.22s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.borderColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.65)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <ArrowRight size={20} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>

        {/* Doctors Row Wrapper */}
        <div
          className="container"
          style={{
            position: 'relative',
            maxWidth: '1440px',
            overflow: 'visible',
            touchAction: isMobile ? 'pan-y' : 'auto',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            cursor: isDragging ? 'grabbing' : isMobile ? 'grab' : 'default',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Mobile Quick Side Chevrons */}
          {isMobile && (
            <>
              <button
                type="button"
                onClick={() => handleArrowNav('left')}
                aria-label="Previous Specialist"
                style={{
                  position: 'absolute',
                  left: '4px',
                  top: '70px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 16, 12, 0.65)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  zIndex: 80,
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => handleArrowNav('right')}
                aria-label="Next Specialist"
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '70px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 16, 12, 0.65)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  zIndex: 80,
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Smooth Carousel / Desktop Row Track */}
          <motion.div
            animate={{
              x: isMobile ? mobileTranslateX : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 32,
              mass: 0.9,
            }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: isMobile ? `${mobileSlotGap}px` : desktopSlotGap,
              overflow: 'visible',
              paddingTop: '0.5rem',
              paddingBottom: '1rem',
              willChange: 'transform',
            }}
          >
            {doctors.map((doc, idx) => {
              const isCardOpened = hoveredDoctorIndex === idx;

              return (
                <div
                  key={doc.id}
                  className="doctor-slot"
                  onClick={() => handleDoctorClick(idx)}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    flex: `0 0 ${isMobile ? mobileSlotWidth : desktopSlotWidth}px`,
                    width: `${isMobile ? mobileSlotWidth : desktopSlotWidth}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: isCardOpened ? 60 : 20,
                  }}
                >
                  {/* Default Circular Avatar + Name + Specialty (Always displayed unless detailed card is open on top) */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      width: '100%',
                      opacity: isCardOpened ? 0 : 1,
                      visibility: isCardOpened ? 'hidden' : 'visible',
                      transition: 'opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.22s',
                      pointerEvents: isCardOpened ? 'none' : 'auto',
                    }}
                  >
                    {/* Avatar Circle with distinct color, subtle border & shadow */}
                    <div
                      style={{
                        width: isMobile ? '135px' : '162px',
                        height: isMobile ? '135px' : '162px',
                        borderRadius: '50%',
                        backgroundColor: doc.bg,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '3.5px solid rgba(255, 255, 255, 0.85)',
                        boxShadow: '0 8px 22px rgba(0, 0, 0, 0.12)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
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
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: isMobile ? '1.05rem' : '1.2rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginTop: '0.9rem',
                        marginBottom: '0.2rem',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {doc.name}
                    </h3>

                    {/* Doctor Specialty */}
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: isMobile ? '0.75rem' : '0.82rem',
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.82)',
                        margin: 0,
                        lineHeight: 1.25,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {doc.specialty}
                    </p>
                  </div>

                  {/* Detailed Card: ONLY opens when cursor is placed on this doctor (hover) */}
                  <AnimatePresence>
                    {isCardOpened && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{
                          opacity: 0,
                          scale: 0.92,
                          transition: { duration: 0.18, ease: 'easeOut' },
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                          mass: 0.8,
                        }}
                        style={{
                          position: 'absolute',
                          top: isMobile ? '70px' : '82px',
                          left: isMobile ? 'calc(50% - 155px)' : 'calc(50% - 165px)',
                          width: isMobile ? '310px' : '330px',
                          transformOrigin: '50% 0px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '28px',
                          padding: 'clamp(5rem, 5.4vw, 5.6rem) 1.4rem 1.5rem 1.4rem',
                          boxShadow:
                            '0 24px 50px rgba(28, 12, 8, 0.24), 0 6px 18px rgba(0,0,0,0.08)',
                          textAlign: 'center',
                          zIndex: 70,
                          /* This margin-bottom creates the exact 1/4 overlap into the brown section */
                          marginBottom: isMobile ? '0px' : '-95px',
                        }}
                        onClick={(e) => {
                          const target = e.target as HTMLElement | null;
                          if (target && typeof target.closest === 'function' && (target.closest('button') || target.closest('a'))) {
                            return;
                          }
                          e.stopPropagation();
                          setHoveredDoctorIndex(null);
                        }}
                      >
                        {/* Top Protruding Avatar (aligns directly over slot circle) */}
                        <div
                          style={{
                            position: 'absolute',
                            top: isMobile ? '-70px' : '-82px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: isMobile ? '145px' : '166px',
                            height: isMobile ? '145px' : '166px',
                            borderRadius: '50%',
                            backgroundColor: doc.bg,
                            border: '5px solid #FFFFFF',
                            overflow: 'hidden',
                            boxShadow: `0 14px 34px rgba(0,0,0,0.2), 0 0 30px ${doc.bg}77`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 75,
                          }}
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

                        {/* Card Content */}
                        <div>
                          {/* Doctor Name */}
                          <h3
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 'clamp(1.35rem, 1.6vw, 1.55rem)',
                              fontWeight: 700,
                              color: '#18181B',
                              marginBottom: '0.25rem',
                              letterSpacing: '-0.02em',
                              lineHeight: 1.2,
                            }}
                          >
                            {doc.name}
                          </h3>

                          {/* Specialty in Purple */}
                          <p
                            style={{
                              fontFamily: 'var(--font-main)',
                              fontSize: '0.86rem',
                              fontWeight: 600,
                              color: '#7C3AED',
                              marginBottom: '0.75rem',
                            }}
                          >
                            {doc.specialty}
                          </p>

                          {/* Bio Description */}
                          <p
                            style={{
                              fontFamily: 'var(--font-main)',
                              fontSize: '0.81rem',
                              lineHeight: 1.48,
                              color: '#4B5563',
                              marginBottom: '1.2rem',
                            }}
                          >
                            {doc.bio}
                          </p>

                          {/* 3-Column Credentials / Stats */}
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gap: '0.35rem',
                              paddingTop: '0.8rem',
                              paddingBottom: '0.8rem',
                              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                              marginBottom: '1.25rem',
                            }}
                          >
                            {/* Qualification */}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}
                            >
                              <GraduationCap
                                size={19}
                                color="#7C3AED"
                                style={{ marginBottom: '0.3rem' }}
                              />
                              <span
                                style={{
                                  fontFamily: 'var(--font-main)',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  color: '#18181B',
                                  lineHeight: 1.2,
                                }}
                              >
                                {doc.degreeTitle}
                              </span>
                              <span
                                style={{
                                  fontFamily: 'var(--font-main)',
                                  fontSize: '0.67rem',
                                  fontWeight: 500,
                                  color: '#6B7280',
                                  lineHeight: 1.2,
                                  marginTop: '2px',
                                }}
                              >
                                {doc.degreeSub}
                              </span>
                            </div>

                            {/* Experience */}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
                                borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                              }}
                            >
                              <Award
                                size={19}
                                color="#7C3AED"
                                style={{ marginBottom: '0.3rem' }}
                              />
                              <span
                                style={{
                                  fontFamily: 'var(--font-main)',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  color: '#18181B',
                                  lineHeight: 1.2,
                                }}
                              >
                                {doc.experienceTitle}
                              </span>
                              <span
                                style={{
                                  fontFamily: 'var(--font-main)',
                                  fontSize: '0.67rem',
                                  fontWeight: 500,
                                  color: '#6B7280',
                                  lineHeight: 1.2,
                                  marginTop: '2px',
                                }}
                              >
                                {doc.experienceSub}
                              </span>
                            </div>

                            {/* Happy Patients */}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}
                            >
                              <Users
                                size={19}
                                color="#7C3AED"
                                style={{ marginBottom: '0.3rem' }}
                              />
                              <span
                                style={{
                                  fontFamily: 'var(--font-main)',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  color: '#18181B',
                                  lineHeight: 1.2,
                                }}
                              >
                                {doc.patientsTitle}
                              </span>
                              <span
                                style={{
                                  fontFamily: 'var(--font-main)',
                                  fontSize: '0.67rem',
                                  fontWeight: 500,
                                  color: '#6B7280',
                                  lineHeight: 1.2,
                                  marginTop: '2px',
                                }}
                              >
                                {doc.patientsSub}
                              </span>
                            </div>
                          </div>

                          {/* Lime High-Contrast CTA Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenBooking) {
                                onOpenBooking(doc.name);
                              } else {
                                const contactSection =
                                  document.getElementById('branches');
                                contactSection?.scrollIntoView({
                                  behavior: 'smooth',
                                });
                              }
                            }}
                            style={{
                              width: '100%',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.45rem',
                              backgroundColor: 'var(--color-lime)',
                              color: '#18181B',
                              fontFamily: 'var(--font-main)',
                              fontSize: '0.86rem',
                              fontWeight: 700,
                              padding: '0.72rem 1.2rem',
                              borderRadius: 'var(--radius-pill)',
                              boxShadow: '0 6px 18px rgba(215, 248, 70, 0.4)',
                              cursor: 'pointer',
                              border: 'none',
                              transition:
                                'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform =
                                'translateY(-2px)';
                              e.currentTarget.style.boxShadow =
                                '0 10px 24px rgba(215, 248, 70, 0.55)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform =
                                'translateY(0)';
                              e.currentTarget.style.boxShadow =
                                '0 6px 18px rgba(215, 248, 70, 0.4)';
                            }}
                          >
                            <span>View Full Profile</span>
                            <ArrowRight size={16} strokeWidth={2.4} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Brown Bottom Bar: Sits behind and underneath the quarter-overlapping card */}
      <div
        style={{
          backgroundColor: '#5E2614', // continuous brown behind and beneath
          position: 'relative',
          zIndex: 15,
          paddingTop: isMobile ? '1.6rem' : '2.2rem',
          paddingBottom: isMobile ? '2.2rem' : '3.4rem',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1380px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Left Controls: Book Appointment Lime Pill & Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Lime Book Appointment Button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenBooking) {
                  const docName =
                    hoveredDoctorIndex !== null
                      ? doctors[hoveredDoctorIndex].name
                      : undefined;
                  onOpenBooking(docName);
                } else {
                  const branchesEl = document.getElementById('branches');
                  branchesEl?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'var(--color-lime)',
                color: '#18181B',
                fontFamily: 'var(--font-main)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '0.62rem 1.15rem',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(215, 248, 70, 0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow =
                  '0 8px 20px rgba(215, 248, 70, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 14px rgba(215, 248, 70, 0.35)';
              }}
            >
              <Calendar size={16} strokeWidth={2.4} />
              <span>BOOK APPOINTMENT</span>
            </button>

            {/* Dark Status Capsule with Glowing Green Dot */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(28, 14, 8, 0.72)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                padding: '0.6rem 1.05rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-main)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              {/* Glowing Green Dot */}
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  display: 'inline-block',
                  boxShadow: '0 0 10px #22C55E',
                }}
              />
              <span>Opens 10 AM · Valanchery</span>
            </div>
          </div>

          {/* Right Reference Branding: Wavy SVG Line & Healthy Smiles Tag */}
          <div
            style={{
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <svg width="36" height="15" viewBox="0 0 36 15" fill="none">
              <path
                d="M1 10C6 3 12 14 18 8C24 2 30 12 35 7"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: '0.67rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'rgba(255, 255, 255, 0.78)',
                lineHeight: 1.35,
                textAlign: 'left',
                textTransform: 'uppercase',
              }}
            >
              HEALTHY SMILES
              <br />
              BRIGHTER TOMORROWS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
