import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, GraduationCap, Award, Users, X } from 'lucide-react';

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
    name: 'Dr. John Smith',
    specialty: 'Orthodontics Specialist',
    image: '/images/doctor_john_smith.jpg',
    bg: '#F5A47E',
    bio: 'Pioneering digital smile design, Invisalign, and modern orthodontic alignment for patients of all ages.',
    degree: 'BDS, MDS\n(Orthodontics)',
    experience: '10+ Years\nExperience',
    patients: '2,400+\nHappy Patients',
  },
  {
    name: 'Dr. David Kim',
    specialty: 'Endodontics Specialist',
    image: '/images/doctor_david_kim.jpg',
    bg: '#D0B4F8',
    bio: 'Specializing in single-visit root canals, microscopic endodontics, and gentle tooth preservation.',
    degree: 'DDS, MS\n(Endodontics)',
    experience: '8+ Years\nExperience',
    patients: '1,800+\nHappy Patients',
  },
  {
    name: 'Dr. Sarah Lee',
    specialty: 'Periodontics Specialist',
    image: '/images/doctor_sarah_lee.jpg',
    bg: '#F7DE76',
    bio: 'Specializes in gum care, dental implants, and advanced periodontal treatments. Dedicated to helping you achieve a healthier smile.',
    degree: 'BDS, MDS\n(Periodontology)',
    experience: '5+ Years\nExperience',
    patients: '1,000+\nHappy Patients',
  },
  {
    name: 'Dr. Steven Lee',
    specialty: 'Cosmetic Dentistry',
    image: '/images/doctor_steven_lee.jpg',
    bg: '#BFE0F7',
    bio: 'Crafting bespoke porcelain veneers, laser teeth whitening, and complete aesthetic smile makeovers.',
    degree: 'DDS, FICOI\n(Cosmetic)',
    experience: '7+ Years\nExperience',
    patients: '1,500+\nHappy Patients',
  },
  {
    name: 'Dr. Jennifer Kim',
    specialty: 'Orthodontics Specialist',
    image: '/images/doctor_jennifer_kim.jpg',
    bg: '#C4E8D6',
    bio: 'Dedicated to gentle, personalized orthodontic treatments, invisible aligners, and adolescent smile corrections.',
    degree: 'BDS, MS\n(Orthodontics)',
    experience: '6+ Years\nExperience',
    patients: '1,200+\nHappy Patients',
  },
];

interface SpecialistsSectionProps {
  onOpenBooking?: (doctorName?: string) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({ onOpenBooking }) => {
  // Only opens when cursor is on that doctor's circular card (null by default)
  const [activeDoctorIndex, setActiveDoctorIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On mobile: Close details when tapping anywhere outside the active specialist card
  useEffect(() => {
    if (!isMobile || activeDoctorIndex === null) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const activeSlot = document.querySelector('.doctor-slot[aria-expanded="true"]');
      if (activeSlot && activeSlot.contains(target)) return;
      setActiveDoctorIndex(null);
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('touchend', handleOutsideClick);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchend', handleOutsideClick);
    };
  }, [isMobile, activeDoctorIndex]);

  const handleArrowNav = (direction: 'left' | 'right') => {
    const currentIdx = activeDoctorIndex !== null ? activeDoctorIndex : 2;
    const nextIndex =
      direction === 'right'
        ? (currentIdx + 1) % doctors.length
        : (currentIdx - 1 + doctors.length) % doctors.length;
    setActiveDoctorIndex(nextIndex);
  };

  // Hover handlers with 220ms grace period debounce
  const handleDoctorMouseEnter = (index: number) => {
    if (isMobile) return;
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveDoctorIndex(index);
  };

  const handleDoctorMouseLeave = () => {
    if (isMobile) return;
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = setTimeout(() => {
      // Closes card when cursor leaves
      setActiveDoctorIndex(null);
    }, 220);
  };

  // Clicking toggles the card: opens if closed, disappears if clicked again
  const handleDoctorClick = (index: number) => {
    setActiveDoctorIndex((prev) => (prev === index ? null : index));
  };

  // Dimensions matching Image 3 Reference
  const baseSlotWidth = isMobile ? 150 : 190;
  const cardWidth = isMobile ? 310 : 345;
  const spreadAmount = isMobile ? 55 : 68;

  const easingCurve = [0.16, 1, 0.3, 1] as const;
  const transitionDuration = shouldReduceMotion ? 0.01 : 0.52;

  const getDoctorTransformX = (index: number) => {
    if (isMobile) return 0;
    if (activeDoctorIndex === null) return 0;
    if (index === activeDoctorIndex) return 0;

    if (activeDoctorIndex === 0) {
      return index > 0 ? spreadAmount * 1.4 : 0;
    }
    if (activeDoctorIndex === doctors.length - 1) {
      return index < activeDoctorIndex ? -spreadAmount * 1.4 : 0;
    }

    return index < activeDoctorIndex ? -spreadAmount : spreadAmount;
  };

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
            ? activeDoctorIndex !== null
              ? 'clamp(23.5rem, 58vh, 26.5rem)'
              : '4.5rem'
            : 'clamp(7.5rem, 8.8vw, 10rem)',
          transition: 'padding-bottom 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'visible',
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
        <div className="container" style={{ marginTop: 'clamp(1.8rem, 3vw, 3rem)', marginBottom: 'clamp(1.2rem, 2vw, 2rem)' }}>
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

            {/* Thin White Outline Arrow Controls matching Image 3 */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                onClick={() => handleArrowNav('left')}
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
                onClick={() => handleArrowNav('right')}
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
        </div>

        {/* Doctor Cards Container — Clean Centered Flex Grid (NO INNER SCROLLING) */}
        <div className="container" style={{ overflow: 'visible' }}>
          <motion.div
            animate={{
              x: isMobile && activeDoctorIndex !== null
                ? (2 - activeDoctorIndex) * (baseSlotWidth + 14)
                : 0,
            }}
            transition={{
              duration: transitionDuration,
              ease: easingCurve,
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: isMobile ? '14px' : 'clamp(0.8rem, 2vw, 2.2rem)',
              overflowX: 'visible',
              overflowY: 'visible',
              paddingTop: '0.8rem',
              paddingBottom: '0.4rem',
            }}
          >
            {doctors.map((doc, idx) => {
              const isActive = activeDoctorIndex === idx;
              const isAnyActive = activeDoctorIndex !== null;
              const isSubtle = isAnyActive && !isActive;

              return (
                <motion.div
                  key={doc.name}
                  className="doctor-slot"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{
                    x: shouldReduceMotion ? 0 : getDoctorTransformX(idx),
                    opacity: isSubtle ? 0.76 : 1,
                  }}
                  transition={{
                    x: {
                      duration: transitionDuration,
                      ease: easingCurve,
                    },
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
                    zIndex: isActive ? 35 : 2,
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Circular Avatar Container with Scaling & Ambient Aura */}
                  <motion.div
                    animate={{
                      scale: isActive
                        ? shouldReduceMotion
                          ? 1
                          : 1.28
                        : isSubtle
                        ? 0.94
                        : 1,
                    }}
                    transition={{
                      scale: {
                        duration: transitionDuration,
                        ease: easingCurve,
                      },
                    }}
                    style={{
                      position: 'relative',
                      zIndex: 60,
                      marginBottom: '0.8rem',
                      transformOrigin: 'center center',
                      willChange: 'transform',
                    }}
                  >
                    <div
                      style={{
                        width: 'clamp(135px, 13vw, 168px)',
                        height: 'clamp(135px, 13vw, 168px)',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        backgroundColor: doc.bg,
                        boxShadow: isActive
                          ? `0 16px 36px rgba(0,0,0,0.22), 0 0 45px ${doc.bg}cc`
                          : '0 10px 24px rgba(0,0,0,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: isActive
                          ? '4.5px solid #FFFFFF'
                          : '3px solid transparent',
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

                  {/* Default State: Doctor Name & Specialty */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 0 : isSubtle ? 0.78 : 1,
                      y: isActive ? -8 : 0,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : 0.28,
                      ease: 'easeOut',
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      pointerEvents: isActive ? 'none' : 'auto',
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)',
                        fontWeight: 600,
                        color: 'var(--color-white)',
                        marginBottom: '0.2rem',
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {doc.name}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.82rem',
                        color: 'rgba(255, 255, 255, 0.88)',
                        fontWeight: 400,
                        margin: 0,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {doc.specialty}
                    </p>
                  </motion.div>

                  {/* Active Expanded State: Anchored DIRECTLY through the center of the circular photo grid */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 'clamp(92px, 9.2vw, 108px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: `${cardWidth}px`,
                      zIndex: 50,
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
                        if (isMobile) {
                          e.stopPropagation();
                          setActiveDoctorIndex(null);
                        } else {
                          e.stopPropagation();
                        }
                      }}
                    >
                      {/* Close button on mobile for instant intuitive dismissal */}
                      {isMobile && (
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
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#6B7280',
                            cursor: 'pointer',
                            zIndex: 60,
                          }}
                        >
                          <X size={16} strokeWidth={2.2} />
                        </button>
                      )}
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

                      {/* Lime High-Contrast CTA Button (Sits cleanly in the brown section) */}
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Decorative Wavy Line & Tag matching Image 3 Reference on the right of brown section */}
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



