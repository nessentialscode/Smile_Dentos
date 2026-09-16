import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Award,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface Doctor {
  name: string;
  specialty: string;
  image: string;
  bg: string;
  bio: string;
  degree: string;
  experience: string;
  patients: string;
}

const doctors: Doctor[] = [
  {
    name: 'Dr. Athira S.',
    specialty: 'Chief Dental Surgeon',
    image: '/images/doctor_athira_s.jpg',
    bg: '#F5A47E',
    bio: 'Leading the clinical team at Smile Dentos with exceptional dedication to comprehensive family dentistry, gentle restorative care, and precision diagnosis.',
    degree: 'BDS\n(Dental Surgery)',
    experience: '8+ Years\nExperience',
    patients: '2,500+\nHappy Patients',
  },
  {
    name: 'Dr. Bhagiya R.',
    specialty: 'Lady Dental Surgeon',
    image: '/images/doctor_bhagiya_r.jpg',
    bg: '#D0B4F8',
    bio: 'Dedicated to compassionate, anxiety-free dental care for women, children, and families, specializing in preventive prophylaxis and gentle smile preservation.',
    degree: 'BDS\n(Dental Surgery)',
    experience: '6+ Years\nExperience',
    patients: '1,800+\nHappy Patients',
  },
  {
    name: 'Dr. Lijeesh Kadambil',
    specialty: 'Dental Surgeon',
    image: '/images/doctor_lijeesh_kadambil.jpg',
    bg: '#F7DE76',
    bio: 'Expert in painless single-visit root canal treatments, aesthetic composite restorations, crowns, bridges, and holistic preventive dentistry.',
    degree: 'BDS\n(Dental Surgery)',
    experience: '7+ Years\nExperience',
    patients: '2,100+\nHappy Patients',
  },
  {
    name: 'Dr. Ayisha Nizmiya K.',
    specialty: 'Consultant Orthodontist',
    image: '/images/doctor_ayisha_nizmiya.jpg',
    bg: '#BFE0F7',
    bio: 'Advanced specialist in contemporary orthodontic alignment, digital clear aligners, ceramic braces, and pediatric interceptive smile corrections.',
    degree: 'BDS, MDS\n(Orthodontics)',
    experience: '9+ Years\nExperience',
    patients: '1,700+\nHappy Patients',
  },
  {
    name: 'Dr. Shanahaz',
    specialty: 'Consultant Orthodontist',
    image: '/images/doctor_shanahaz.jpg',
    bg: '#C4E8D6',
    bio: 'Passionate about custom orthodontic mechanics, correcting complex dental malocclusions, invisible aligners, and aesthetic teenage smile transformations.',
    degree: 'BDS, MDS\n(Orthodontics)',
    experience: '8+ Years\nExperience',
    patients: '1,500+\nHappy Patients',
  },
  {
    name: 'Dr. Jabir Kottammal',
    specialty: 'Consultant Oral & Maxillofacial Surgeon',
    image: '/images/doctor_jabir_kottammal.jpg',
    bg: '#FED7AA',
    bio: 'Specialist in surgical wisdom tooth extractions, advanced dental implantology, facial trauma management, and painless minor oral surgeries.',
    degree: 'BDS, MDS\n(Oral Surgery)',
    experience: '11+ Years\nExperience',
    patients: '3,200+\nHappy Patients',
  },
  {
    name: 'Dr. Muhammad Haris P.M',
    specialty: 'Consultant Periodontist',
    image: '/images/doctor_muhammad_haris.jpg',
    bg: '#DDD6FE',
    bio: 'Specialized in advanced periodontal gum therapy, laser gingival depigmentation, bone grafting, and long-term tooth stabilization.',
    degree: 'BDS, MDS\n(Periodontics)',
    experience: '10+ Years\nExperience',
    patients: '2,400+\nHappy Patients',
  },
];

interface SpecialistsSectionProps {
  onOpenBooking?: (doctorName?: string) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({ onOpenBooking }) => {
  // Center doctor index: starts at 0 (Dr. Athira S.)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // On mobile: controls which doctor's detailed card is expanded
  const [activeDoctorIndex, setActiveDoctorIndex] = useState<number | null>(null);
  // On desktop: tracks currently hovered doctor
  const [hoveredDoctorIndex, setHoveredDoctorIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Drag and touch swipe state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  // Touch gesture tracking refs
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const isSwipingRef = useRef(false);

  // Mouse drag tracking refs
  const mouseStartRef = useRef<{ x: number; time: number } | null>(null);
  const isMouseDownRef = useRef(false);

  // Wheel debounce ref
  const lastWheelTimeRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dimensions: larger circles on desktop, perfectly sized for modern screens
  const baseSlotWidth = isMobile ? 150 : 202;
  const slotGap = isMobile ? 14 : 18;
  const cardWidth = 310;

  const easingCurve = [0.16, 1, 0.3, 1] as const;
  const transitionDuration = shouldReduceMotion ? 0.01 : 0.52;

  // Middle index of doctors array for flex center alignment on mobile
  const middleIdx = Math.floor(doctors.length / 2); // 3 for 7 items

  // Navigate to a specific doctor index with boundary clamping
  const navigateToDoctor = (newIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(doctors.length - 1, newIndex));
    setCurrentIndex(clampedIndex);
    if (activeDoctorIndex !== null) {
      setActiveDoctorIndex(clampedIndex);
    }
  };

  // Header and floating arrow navigation (with circular wrap)
  const handleArrowNav = (direction: 'left' | 'right') => {
    const nextIndex =
      direction === 'right'
        ? (currentIndex + 1) % doctors.length
        : (currentIndex - 1 + doctors.length) % doctors.length;
    setCurrentIndex(nextIndex);
    if (isMobile && activeDoctorIndex !== null) {
      setActiveDoctorIndex(nextIndex);
    }
    if (!isMobile) {
      setHoveredDoctorIndex(nextIndex);
    }
  };

  // On mobile: Close details only when tapping outside the entire specialists carousel/slots
  useEffect(() => {
    if (!isMobile || activeDoctorIndex === null) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (isSwipingRef.current) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Don't close if tapping inside any slot, navigation button, dot, or booking modal
      if (
        target.closest('.doctor-slot') ||
        target.closest('.specialist-nav-btn') ||
        target.closest('.specialist-dot') ||
        target.closest('#appointment-modal')
      ) {
        return;
      }

      setActiveDoctorIndex(null);
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 80);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobile, activeDoctorIndex]);

  // Touch Swipe Handlers (for mobile & touchscreens)
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

      // Rubber-band resistance at boundaries
      let effectiveOffset = diffX;
      if (
        (currentIndex === 0 && diffX > 0) ||
        (currentIndex === doctors.length - 1 && diffX < 0)
      ) {
        effectiveOffset = diffX * 0.28;
      }
      setDragOffset(effectiveOffset);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartRef.current && isHorizontalSwipeRef.current) {
      const elapsed = Date.now() - touchStartRef.current.time;
      const isQuickFlick = elapsed < 320 && Math.abs(dragOffset) > 22;
      const isPastThreshold = Math.abs(dragOffset) > 40;

      if (isQuickFlick || isPastThreshold) {
        if (dragOffset < 0) {
          // Swiped left -> advance to next doctor
          if (currentIndex < doctors.length - 1) {
            navigateToDoctor(currentIndex + 1);
          } else {
            navigateToDoctor(0); // Circular wrap at end
          }
        } else {
          // Swiped right -> go to previous doctor
          if (currentIndex > 0) {
            navigateToDoctor(currentIndex - 1);
          } else {
            navigateToDoctor(doctors.length - 1); // Circular wrap at beginning
          }
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

  // Mouse Drag Handlers (for mobile/tablet simulation)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile || e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    mouseStartRef.current = { x: e.clientX, time: Date.now() };
    isMouseDownRef.current = true;
    isSwipingRef.current = false;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile || !isMouseDownRef.current || !mouseStartRef.current) return;
    const diffX = e.clientX - mouseStartRef.current.x;

    if (Math.abs(diffX) > 6) {
      isSwipingRef.current = true;
      setIsDragging(true);

      let effectiveOffset = diffX;
      if (
        (currentIndex === 0 && diffX > 0) ||
        (currentIndex === doctors.length - 1 && diffX < 0)
      ) {
        effectiveOffset = diffX * 0.28;
      }
      setDragOffset(effectiveOffset);
    }
  };

  const handleMouseUp = () => {
    if (!isMobile) return;
    if (isMouseDownRef.current && isSwipingRef.current && mouseStartRef.current) {
      const elapsed = Date.now() - mouseStartRef.current.time;
      const isQuickFlick = elapsed < 350 && Math.abs(dragOffset) > 24;
      const isPastThreshold = Math.abs(dragOffset) > 42;

      if (isQuickFlick || isPastThreshold) {
        if (dragOffset < 0) {
          if (currentIndex < doctors.length - 1) {
            navigateToDoctor(currentIndex + 1);
          } else {
            navigateToDoctor(0);
          }
        } else {
          if (currentIndex > 0) {
            navigateToDoctor(currentIndex - 1);
          } else {
            navigateToDoctor(doctors.length - 1);
          }
        }
      }
    }

    setDragOffset(0);
    setIsDragging(false);
    isMouseDownRef.current = false;
    mouseStartRef.current = null;
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 60);
  };

  const handleMouseLeaveContainer = () => {
    if (isMouseDownRef.current) {
      handleMouseUp();
    }
  };

  // Wheel / Horizontal Trackpad Scroll Handler (mobile/tablet only)
  const handleWheel = (e: React.WheelEvent) => {
    if (!isMobile) return;
    if (Math.abs(e.deltaX) > 30 && Date.now() - lastWheelTimeRef.current > 380) {
      lastWheelTimeRef.current = Date.now();
      if (e.deltaX > 0) {
        handleArrowNav('right');
      } else {
        handleArrowNav('left');
      }
    }
  };

  // Hover handlers for desktop (subtle elevate & tooltip, NO inline card disruption)
  const handleDoctorMouseEnter = (index: number) => {
    if (isMobile) return;
    setHoveredDoctorIndex(index);
  };

  const handleDoctorMouseLeave = () => {
    if (isMobile) return;
    setHoveredDoctorIndex(null);
  };

  // Doctor click handler
  const handleDoctorClick = (index: number) => {
    if (isSwipingRef.current) return;

    if (isMobile) {
      if (currentIndex !== index) {
        setCurrentIndex(index);
        setActiveDoctorIndex(index);
      } else {
        setActiveDoctorIndex((prev) => (prev === index ? null : index));
      }
    } else {
      // On desktop: opens appointment booking modal directly with this doctor selected
      if (onOpenBooking) {
        onOpenBooking(doctors[index].name);
      }
    }
  };

  // Mobile carousel translation: middle index is centered when x = 0
  const mobileTranslateX = (middleIdx - currentIndex) * (baseSlotWidth + slotGap) + dragOffset;

  return (
    <div style={{ backgroundColor: 'var(--color-rust)', position: 'relative', zIndex: 10, paddingBottom: '1.5rem' }}>
      <section
        id="specialists"
        style={{
          backgroundColor: 'var(--color-lavender)',
          borderBottomLeftRadius: 'clamp(32px, 4vw, 44px)',
          borderBottomRightRadius: 'clamp(32px, 4vw, 44px)',
          position: 'relative',
          paddingTop: '0',
          paddingBottom: isMobile
            ? '2.2rem'
            : 'clamp(5.5rem, 7vw, 7.5rem)',
          transition: 'padding-bottom 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden',
          zIndex: 20,
        }}
      >
        {/* Downward Concave Wave Divider Transition from Cream into Lavender */}
        <div
          style={{
            width: '100%',
            overflow: 'visible',
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
            <path
              d="M0,0 L1440,0 L1440,15 C1080,145 360,145 0,15 Z"
              fill="var(--color-cream)"
            />
          </svg>

          {/* Apex Concentric Circular Badge: +See All */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%, 50%)',
              zIndex: 20,
            }}
          >
            <a
              href="#specialists"
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
                fontSize: 'clamp(0.75rem, 1.1vw, 0.84rem)',
                fontWeight: 700,
                boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
                border: '2.5px solid var(--color-lime)',
                outline: '2.5px solid rgba(215, 248, 70, 0.55)',
                outlineOffset: '3px',
                textDecoration: 'none',
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
              +See All
            </a>
          </div>
        </div>

        {/* Header with Title & Outline Arrow Controls */}
        <div className="container" style={{ marginTop: 'clamp(1.8rem, 3vw, 3rem)', marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '0.4rem',
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '3px',
                    backgroundColor: 'var(--color-lime)',
                    borderRadius: '2px',
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'rgba(255, 255, 255, 0.92)',
                    textTransform: 'uppercase',
                  }}
                >
                  MEET OUR EXPERTS
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 5.2vw, 4.6rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-white)',
                  margin: 0,
                }}
              >
                Our Specialist
              </motion.h2>
            </div>

            {/* Thin White Outline Arrow Controls */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={() => handleArrowNav('left')}
                aria-label="Previous Specialist"
                className="specialist-nav-btn"
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
                onClick={() => handleArrowNav('right')}
                aria-label="Next Specialist"
                className="specialist-nav-btn"
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
        </div>

        {/* Doctor Cards Interactive Carousel / Desktop Row Wrapper */}
        <div
          className="container"
          style={{
            position: 'relative',
            maxWidth: isMobile ? undefined : '1520px',
            overflow: 'visible',
            touchAction: isMobile ? 'pan-y' : 'auto',
            cursor: isDragging ? 'grabbing' : isMobile ? 'grab' : 'default',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeaveContainer}
          onWheel={handleWheel}
        >
          {/* Mobile Floating Side Arrows */}
          {isMobile && (
            <>
              <button
                type="button"
                className="specialist-nav-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleArrowNav('left');
                }}
                aria-label="Previous Specialist"
                style={{
                  position: 'absolute',
                  left: '6px',
                  top: '64px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 18, 12, 0.52)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  zIndex: 80,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.28)',
                  transition: 'transform 0.15s ease, background-color 0.2s ease',
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <ChevronLeft size={22} strokeWidth={2.4} />
              </button>
              <button
                type="button"
                className="specialist-nav-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleArrowNav('right');
                }}
                aria-label="Next Specialist"
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '64px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 18, 12, 0.52)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  zIndex: 80,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.28)',
                  transition: 'transform 0.15s ease, background-color 0.2s ease',
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <ChevronRight size={22} strokeWidth={2.4} />
              </button>
            </>
          )}

          {/* Doctor Row Track */}
          <motion.div
            animate={{
              x: isMobile ? mobileTranslateX : 0,
            }}
            transition={{
              duration: isDragging ? 0 : transitionDuration,
              ease: easingCurve,
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? `${slotGap}px` : 'clamp(14px, 1.4vw, 24px)',
              overflowX: 'visible',
              overflowY: 'visible',
              paddingTop: '0.8rem',
              paddingBottom: '0.6rem',
              willChange: 'transform',
            }}
          >
            {doctors.map((doc, idx) => {
              const isActive = isMobile && activeDoctorIndex === idx;
              const isCentered = isMobile && currentIndex === idx;
              const isAnyActive = isMobile && activeDoctorIndex !== null;
              const isSubtle = isAnyActive && !isActive;
              const isHovered = !isMobile && hoveredDoctorIndex === idx;

              return (
                <motion.div
                  key={doc.name}
                  className="doctor-slot"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{
                    opacity: isMobile ? (isCentered ? 1 : 0.78) : (isSubtle ? 0.76 : 1),
                  }}
                  transition={{
                    opacity: {
                      duration: shouldReduceMotion ? 0.01 : 0.38,
                      ease: 'easeOut',
                    },
                  }}
                  onMouseEnter={() => handleDoctorMouseEnter(idx)}
                  onMouseLeave={handleDoctorMouseLeave}
                  onClick={() => handleDoctorClick(idx)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  aria-label={`Specialist ${doc.name}, ${doc.specialty}`}
                  style={{
                    flex: `0 0 ${baseSlotWidth}px`,
                    width: `${baseSlotWidth}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    outline: 'none',
                    zIndex: isActive ? 50 : isHovered ? 40 : isCentered ? 30 : 10,
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Circular Avatar Container with Scaling & Ambient Aura */}
                  <motion.div
                    animate={{
                      scale: isMobile
                        ? isActive
                          ? shouldReduceMotion ? 1 : 1.28
                          : isCentered ? 1.14 : isSubtle ? 0.94 : 1
                        : isHovered ? 1.08 : 1,
                    }}
                    transition={{
                      scale: {
                        duration: transitionDuration,
                        ease: easingCurve,
                      },
                    }}
                    style={{
                      position: 'relative',
                      zIndex: 70,
                      transformOrigin: 'center center',
                      willChange: 'transform',
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? 'clamp(135px, 35vw, 155px)' : 'clamp(172px, 12.5vw, 202px)',
                        height: isMobile ? 'clamp(135px, 35vw, 155px)' : 'clamp(172px, 12.5vw, 202px)',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        backgroundColor: doc.bg,
                        boxShadow: isMobile
                          ? isActive
                            ? `0 16px 36px rgba(0,0,0,0.22), 0 0 45px ${doc.bg}cc`
                            : isCentered
                            ? `0 12px 28px rgba(0,0,0,0.18), 0 0 25px ${doc.bg}88`
                            : '0 10px 24px rgba(0,0,0,0.12)'
                          : isHovered
                          ? `0 20px 45px rgba(0,0,0,0.28), 0 0 38px ${doc.bg}cc`
                          : '0 10px 28px rgba(0,0,0,0.16)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: isMobile
                          ? isActive
                            ? '4.5px solid #FFFFFF'
                            : isCentered
                            ? '3.5px solid rgba(255, 255, 255, 0.95)'
                            : '3px solid transparent'
                          : isHovered
                          ? '4.5px solid #FFFFFF'
                          : '4px solid rgba(255, 255, 255, 0.82)',
                        transition: 'border 0.35s ease, box-shadow 0.45s ease',
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
                  </motion.div>

                  {/* Desktop Hover Floating Badge: Clean minimal pill */}
                  {!isMobile && (
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 8,
                        scale: isHovered ? 1 : 0.95,
                      }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 12px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(28, 16, 12, 0.92)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        color: '#FFFFFF',
                        padding: '0.45rem 0.95rem',
                        borderRadius: 'var(--radius-pill)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        zIndex: 80,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.2,
                        }}
                      >
                        {doc.name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.72rem',
                          color: 'var(--color-lime)',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {doc.specialty}
                      </span>
                    </motion.div>
                  )}

                  {/* Active Expanded State: ONLY on Mobile */}
                  {isMobile && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'clamp(92px, 9.2vw, 108px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: `${cardWidth}px`,
                        zIndex: 60,
                        pointerEvents: isActive ? 'auto' : 'none',
                      }}
                    >
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 14,
                          scale: isActive ? 1 : 0.94,
                        }}
                        transition={{
                          opacity: {
                            duration: shouldReduceMotion ? 0.01 : 0.35,
                            ease: 'easeOut',
                          },
                          y: {
                            duration: transitionDuration,
                            ease: easingCurve,
                          },
                          scale: {
                            duration: transitionDuration,
                            ease: easingCurve,
                          },
                        }}
                        style={{
                          width: '100%',
                          backgroundColor: 'var(--color-white)',
                          borderRadius: '28px',
                          padding: 'clamp(4.2rem, 4.6vw, 4.8rem) 1.5rem 1.6rem 1.5rem',
                          boxShadow: '0 24px 55px rgba(45, 18, 10, 0.28)',
                          textAlign: 'center',
                          transformOrigin: 'top center',
                          willChange: 'transform, opacity',
                          position: 'relative',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {/* Close button on mobile for instant intuitive dismissal */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDoctorIndex(null);
                          }}
                          aria-label="Close specialist details"
                          style={{
                            position: 'absolute',
                            top: '14px',
                            right: '14px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#6B7280',
                            cursor: 'pointer',
                            zIndex: 70,
                            border: 'none',
                          }}
                        >
                          <X size={18} strokeWidth={2.2} />
                        </button>

                        {/* Active Doctor Name */}
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.25rem, 1.4vw, 1.45rem)',
                            fontWeight: 700,
                            color: '#18181B',
                            marginBottom: '0.2rem',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {doc.name}
                        </h3>

                        {/* Active Doctor Specialty */}
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

                        {/* Doctor Short Bio */}
                        <p
                          style={{
                            fontFamily: 'var(--font-main)',
                            fontSize: '0.81rem',
                            lineHeight: 1.45,
                            color: '#4B5563',
                            marginBottom: '1.15rem',
                          }}
                        >
                          {doc.bio}
                        </p>

                        {/* Credentials 3-Column Info Grid */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '0.4rem',
                            paddingTop: '0.85rem',
                            paddingBottom: '0.85rem',
                            borderTop: '1px solid rgba(0, 0, 0, 0.07)',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
                            marginBottom: '1.2rem',
                          }}
                        >
                          {/* Qualification / Degree */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              textAlign: 'center',
                            }}
                          >
                            <GraduationCap
                              size={18}
                              color="#7C3AED"
                              style={{ marginBottom: '0.3rem' }}
                            />
                            <span
                              style={{
                                fontFamily: 'var(--font-main)',
                                fontSize: '0.71rem',
                                fontWeight: 600,
                                color: '#374151',
                                lineHeight: 1.25,
                                whiteSpace: 'pre-line',
                              }}
                            >
                              {doc.degree}
                            </span>
                          </div>

                          {/* Experience */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              textAlign: 'center',
                              borderLeft: '1px solid rgba(0, 0, 0, 0.07)',
                              borderRight: '1px solid rgba(0, 0, 0, 0.07)',
                            }}
                          >
                            <Award
                              size={18}
                              color="#7C3AED"
                              style={{ marginBottom: '0.3rem' }}
                            />
                            <span
                              style={{
                                fontFamily: 'var(--font-main)',
                                fontSize: '0.71rem',
                                fontWeight: 600,
                                color: '#374151',
                                lineHeight: 1.25,
                                whiteSpace: 'pre-line',
                              }}
                            >
                              {doc.experience}
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
                              size={18}
                              color="#7C3AED"
                              style={{ marginBottom: '0.3rem' }}
                            />
                            <span
                              style={{
                                fontFamily: 'var(--font-main)',
                                fontSize: '0.71rem',
                                fontWeight: 600,
                                color: '#374151',
                                lineHeight: 1.25,
                                whiteSpace: 'pre-line',
                              }}
                            >
                              {doc.patients}
                            </span>
                          </div>
                        </div>

                        {/* Lime High-Contrast CTA Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenBooking) {
                              onOpenBooking(doc.name);
                            } else {
                              const contactSection = document.getElementById('branches');
                              contactSection?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          style={{
                            width: '100%',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            backgroundColor: 'var(--color-lime)',
                            color: '#18181B',
                            fontFamily: 'var(--font-main)',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            padding: '0.7rem 1.2rem',
                            borderRadius: 'var(--radius-pill)',
                            boxShadow: '0 6px 18px rgba(215, 248, 70, 0.35)',
                            cursor: 'pointer',
                            border: 'none',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow =
                              '0 10px 24px rgba(215, 248, 70, 0.5)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow =
                              '0 6px 18px rgba(215, 248, 70, 0.35)';
                          }}
                        >
                          <span>View Full Profile</span>
                          <ArrowRight size={16} strokeWidth={2.2} />
                        </button>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile Pagination Indicator Dots */}
          {isMobile && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: activeDoctorIndex !== null ? 'clamp(21rem, 50vh, 22.8rem)' : '1rem',
                transition: 'margin-top 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                zIndex: 45,
              }}
            >
              {doctors.map((_, idx) => {
                const isSelected = currentIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    className="specialist-dot"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToDoctor(idx);
                    }}
                    aria-label={`Go to doctor ${doctors[idx].name}`}
                    style={{
                      width: isSelected ? '26px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: isSelected
                        ? 'var(--color-lime)'
                        : 'rgba(255, 255, 255, 0.42)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isSelected ? '0 0 10px rgba(215, 248, 70, 0.6)' : 'none',
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Decorative Wavy Line & Tag matching Reference on the right of brown section */}
      <div
        style={{
          position: 'absolute',
          right: 'max(1.5rem, calc((100vw - 1380px) / 2 + 2.5rem))',
          bottom: '0.8rem',
          display: isMobile ? 'none' : 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          zIndex: 15,
        }}
      >
        <svg width="34" height="14" viewBox="0 0 34 14" fill="none">
          <path
            d="M1 9C6 3 11 13 17 7C22 2 28 11 33 7"
            stroke="rgba(255, 255, 255, 0.65)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: '0.66rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: 'rgba(255, 255, 255, 0.72)',
            lineHeight: 1.3,
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
  );
};
