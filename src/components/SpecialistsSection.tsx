import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Award,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { getDoctors, getBranches } from '../services/supabaseService';
import type { DbDoctor, DbBranch } from '../services/supabaseService';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  imagePosition?: string;
  bg: string;
  bio: string;
  status: 'Present' | 'Absent';
  degreeTitle: string;
  degreeSub: string;
  experienceTitle: string;
  experienceSub: string;
  patientsTitle: string;
  patientsSub: string;
}

const normalizeDoctorName = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');

const matchDoctorWithDb = (uiName: string, dbDoctors: DbDoctor[]): DbDoctor | undefined => {
  const normUI = normalizeDoctorName(uiName);
  return dbDoctors.find((d) => {
    const normDB = normalizeDoctorName(d.name);
    return (
      normDB === normUI ||
      normDB.includes(normUI.replace('dr', '')) ||
      normUI.includes(normDB.replace('dr', '')) ||
      (normUI.includes('haris') && normDB.includes('haris')) ||
      (normUI.includes('shanaha') && normDB.includes('shanaha')) ||
      (normUI.includes('bhagy') && normDB.includes('bhagiya')) ||
      (normUI.includes('vipin') && normDB.includes('vipin'))
    );
  });
};

const initialDoctors: Doctor[] = [
  {
    id: 'athira-s',
    name: 'Dr. ATHIRA.S',
    specialty: 'Chief Dental Surgeon',
    image: '/images/doctor_john_smith.jpg',
    bg: '#EE9564', // Warm Peach / Orange
    bio: 'Chief Dental Surgeon specializing in advanced smile rehabilitation, comprehensive dental care, and modern clinical dentistry.',
    status: 'Present',
    degreeTitle: 'BDS',
    degreeSub: '(Chief Surgeon)',
    experienceTitle: '10+ Years',
    experienceSub: 'Experience',
    patientsTitle: '3,500+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'lijeesh-kadambil',
    name: 'Dr. LIJEESH KADAMBIL',
    specialty: 'Dental Surgeon',
    image: '/images/doctor_lijeesh_kadambil.jpg',
    imagePosition: 'center',
    bg: '#C5AEE3', // Soft Lilac / Purple
    bio: 'Highly experienced dental surgeon specializing in aesthetic dentistry, smile correction, root canal treatment, and precision loupes-assisted care.',
    status: 'Present',
    degreeTitle: 'BDS',
    degreeSub: '(Dental Surgery)',
    experienceTitle: '11+ Years',
    experienceSub: 'Experience',
    patientsTitle: '2,800+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'bhagya-r',
    name: 'Dr. BHAGYA.R',
    specialty: 'Lady Dental Surgeon',
    image: '/images/doctor_sarah_lee.jpg',
    bg: '#F6C844', // Golden Yellow
    bio: 'Specializing in compassionate family dentistry, gentle periodontal therapy, preventive gum care, and personalized smile restoration.',
    status: 'Present',
    degreeTitle: 'BDS',
    degreeSub: '(Lady Dental Surgeon)',
    experienceTitle: '6+ Years',
    experienceSub: 'Experience',
    patientsTitle: '2,100+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'ayisha-nizmiya',
    name: 'Dr. AYISHA NIZMIYA',
    specialty: 'Orthodontist | Invisalign® Provider',
    image: '/images/doctor_ayisha_nizmiya.jpg',
    imagePosition: 'center',
    bg: '#9EA8B4', // Studio Grey
    bio: 'Dedicated Orthodontist and Invisalign® Certified Provider offering personalized clear aligners, modern braces, and comprehensive smile alignment.',
    status: 'Present',
    degreeTitle: 'BDS, MDS',
    degreeSub: '(Invisalign® Cert.)',
    experienceTitle: '7+ Years',
    experienceSub: 'Experience',
    patientsTitle: '1,900+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'shanahas',
    name: 'Dr. SHANAHAS',
    specialty: 'Orthodontist | Smile Dentos',
    image: '/images/doctor_shanahas.jpg',
    imagePosition: 'center',
    bg: '#A5DAA8', // Light Pastel Green
    bio: 'Dedicated Orthodontist specializing in bite correction, crooked teeth alignment, fixed orthodontics, and aesthetic smile solutions.',
    status: 'Absent',
    degreeTitle: 'BDS, MDS',
    degreeSub: '(Orthodontics)',
    experienceTitle: '9+ Years',
    experienceSub: 'Experience',
    patientsTitle: '2,400+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'jabir-kottammal',
    name: 'Dr. JABIR KOTTAMMAL',
    specialty: 'Oral & Maxillofacial Surgeon',
    image: '/images/doctor_bradley_parker.jpg',
    bg: '#E879A8', // Warm Rose / Terracotta
    bio: 'Senior maxillofacial surgeon specializing in complex wisdom tooth impactions, surgical extractions, and bone grafting.',
    status: 'Present',
    degreeTitle: 'BDS, MDS',
    degreeSub: '(Oral Surgery)',
    experienceTitle: '11+ Years',
    experienceSub: 'Experience',
    patientsTitle: '3,100+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'muhammad-haris',
    name: 'Dr. MOHAMMED HARIS',
    specialty: 'Consultant Periodontist',
    image: '/images/doctor_muhammad_haris.jpg',
    imagePosition: 'center',
    bg: '#38BDF8', // Crisp Cyan Blue
    bio: 'Consultant periodontist focused on advanced gum treatments, regenerative periodontal therapies, and dental implant care.',
    status: 'Absent',
    degreeTitle: 'BDS, MDS',
    degreeSub: '(Periodontology)',
    experienceTitle: '8+ Years',
    experienceSub: 'Experience',
    patientsTitle: '1,800+',
    patientsSub: 'Happy Patients',
  },
  {
    id: 'vipin-das',
    name: 'Dr. VIPIN DAS',
    specialty: 'Oral & Maxillofacial Surgeon',
    image: '/images/doctor_vipin_das.jpg',
    imagePosition: 'center',
    bg: '#8EA7E9', // Soft Light Periwinkle
    bio: 'Experienced Oral & Maxillofacial Surgeon specializing in impacted tooth removal, complex extractions, and advanced mouth & jaw surgery.',
    status: 'Present',
    degreeTitle: 'BDS, MDS',
    degreeSub: '(Maxillofacial)',
    experienceTitle: '10+ Years',
    experienceSub: 'Experience',
    patientsTitle: '2,900+',
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
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [branchList, setBranchList] = useState<DbBranch[]>([]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getDoctors(), getBranches()]).then(([dbDoctors, dbBranches]) => {
      if (!isMounted) return;
      if (dbBranches && dbBranches.length > 0) {
        setBranchList(dbBranches);
      }
      if (dbDoctors && dbDoctors.length > 0) {
        setDoctors((prev) =>
          prev.map((doc) => {
            const match = matchDoctorWithDb(doc.name, dbDoctors);
            if (!match) return doc;
            return {
              ...doc,
              status: match.is_active ? 'Present' : 'Absent',
            };
          })
        );
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Detailed card only opens when cursor is placed on it (hover). Default is null.
  const [hoveredDoctorIndex, setHoveredDoctorIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Desktop horizontal scroll offset (0 shows the first 5 doctors, scrolls right to show doctors 6 and 7)
  const [desktopOffset, setDesktopOffset] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [initialDesktopOffset, setInitialDesktopOffset] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

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
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsMobile(w < 1180);
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

  // Arrow navigation: on mobile, cycles active card; on desktop, slides by doctor slot distance
  const handleArrowNav = (direction: 'left' | 'right') => {
    if (isMobile) {
      setHoveredDoctorIndex((prev) => {
        const current = prev !== null ? prev : 0;
        return direction === 'right'
          ? (current + 1) % doctors.length
          : (current - 1 + doctors.length) % doctors.length;
      });
    } else {
      // Step by one slot + gap (~260px). With 5 visible, max scroll is -(doctors.length - 5) * step
      const step = 260;
      const maxOffset = -Math.max(0, doctors.length - 5) * step;
      setDesktopOffset((prev) => {
        if (direction === 'right') {
          return Math.max(prev - step, maxOffset);
        } else {
          return Math.min(prev + step, 0);
        }
      });
    }
  };

  // Mouse drag handlers for desktop smooth swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setDragStartX(e.clientX);
    setInitialDesktopOffset(desktopOffset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || isMobile) return;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 5) {
      setHasDragged(true);
      setHoveredDoctorIndex(null);
    }
    const step = 260;
    const maxOffset = -Math.max(0, doctors.length - 5) * step;
    setDesktopOffset(Math.max(maxOffset - 15, Math.min(15, initialDesktopOffset + diff)));
  };

  const handleMouseUp = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
    const step = 260;
    const maxOffset = -Math.max(0, doctors.length - 5) * step;
    // Snap to nearest slot
    setDesktopOffset((prev) => {
      const rounded = Math.round(prev / step) * step;
      return Math.max(maxOffset, Math.min(0, rounded));
    });
    setTimeout(() => setHasDragged(false), 60);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isMobile) return;
    const step = 260;
    const maxOffset = -Math.max(0, doctors.length - 5) * step;
    if (Math.abs(e.deltaX) > 4) {
      setDesktopOffset((prev) => Math.max(maxOffset, Math.min(0, prev - e.deltaX * 1.1)));
    }
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

  // Exact original distance and slot sizing from five circular profile grid format
  const desktopSlotWidth = 185;
  const desktopSlotGap = 'clamp(56px, 4.8vw, 78px)';
  const mobileSlotWidth = 160;
  const mobileSlotGap = 20;

  // On mobile only, slide carousel so active doctor slot is perfectly centered in viewport
  const mobileTranslateX = (() => {
    if (!isMobile) return 0;
    if (hoveredDoctorIndex !== null) {
      const slotCenter =
        hoveredDoctorIndex * (mobileSlotWidth + mobileSlotGap) + mobileSlotWidth / 2;
      return windowWidth / 2 - slotCenter + dragOffset;
    }
    return Math.max(16, (windowWidth - (mobileSlotWidth * 2 + mobileSlotGap)) / 2) + dragOffset;
  })();

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        position: 'relative',
        zIndex: 10,
        overflow: 'visible',
      }}
    >
      {/* Upper Specialist Section */}
      <section
        id="specialists"
        style={{
          backgroundColor: '#6DDBDE',
          borderBottomLeftRadius: 'clamp(32px, 4vw, 48px)',
          borderBottomRightRadius: 'clamp(32px, 4vw, 48px)',
          position: 'relative',
          paddingTop: 0,
          paddingBottom: isMobile
            ? (hoveredDoctorIndex !== null ? '170px' : '1.4rem')
            : (hoveredDoctorIndex !== null ? '2.8rem' : '1.4rem'),
          minHeight: isMobile
            ? undefined
            : '500px',
          transition: isMobile
            ? 'padding-bottom 0.32s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'padding-bottom 0.35s cubic-bezier(0.16, 1, 0.3, 1), min-height 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'padding-bottom',
          overflow: 'visible',
          zIndex: 20,
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.04)',
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
              fill="var(--color-neutral-0)"
            />
          </svg>

          {/* Apex Concentric Circular Badge: +See All / –See Less */}
          <div
            style={{
              position: 'absolute',
              top: '70.3%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 30,
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
                backgroundColor: '#D7F846',
                color: '#5E2614',
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(0.72rem, 1.05vw, 0.82rem)',
                fontWeight: 700,
                boxShadow: '0 6px 20px rgba(215, 248, 70, 0.4)',
                border: '2.5px solid #D7F846',
                outline: '2.5px solid rgba(215, 248, 70, 0.65)',
                outlineOffset: '3px',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(215, 248, 70, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(215, 248, 70, 0.4)';
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
            maxWidth: 'calc(5 * 185px + 4 * clamp(56px, 4.8vw, 78px) + 180px)',
            paddingLeft: isMobile ? '1rem' : '90px',
            paddingRight: isMobile ? '1rem' : '90px',
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
                    color: '#0038A2',
                    textTransform: 'uppercase',
                  }}
                >
                  MEET OUR EXPERTS
                </span>
                <span
                  style={{
                    width: '32px',
                    height: '3px',
                    backgroundColor: '#0038A2',
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
                  color: 'var(--color-neutral-900)',
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
                  border: '1.5px solid var(--color-neutral-300)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-brand-500)',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.22s ease',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-brand-50)';
                  e.currentTarget.style.borderColor = 'var(--color-brand-500)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
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
                  border: '1.5px solid var(--color-neutral-300)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-brand-500)',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.22s ease',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-brand-50)';
                  e.currentTarget.style.borderColor = 'var(--color-brand-500)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'var(--color-neutral-300)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <ArrowRight size={20} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>

        {/* Doctors Row Wrapper: Stretched edge with 90px padding so centered cards are never cut or overlapped */}
        <div
          className="container"
          style={{
            position: 'relative',
            maxWidth: 'calc(5 * 185px + 4 * clamp(56px, 4.8vw, 78px) + 180px)',
            paddingLeft: isMobile ? '0px' : '90px',
            paddingRight: isMobile ? '0px' : '90px',
            margin: '0 auto',
            overflowX: 'clip',
            overflowY: 'visible',
            touchAction: isMobile ? 'pan-y' : 'auto',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            cursor: isMouseDown ? 'grabbing' : isDragging ? 'grabbing' : isMobile ? 'grab' : 'grab',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
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
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--color-neutral-300)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-brand-500)',
                  zIndex: 80,
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
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
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--color-neutral-300)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-brand-500)',
                  zIndex: 80,
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Smooth Carousel / Desktop Row Track */}
          <motion.div
            animate={{
              x: isMobile ? mobileTranslateX : desktopOffset,
            }}
            transition={
              isMobile
                ? { duration: 0.32, ease: [0.16, 1, 0.3, 1] }
                : {
                    type: 'spring',
                    stiffness: 280,
                    damping: 32,
                    mass: 0.9,
                  }
            }
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: isMobile ? `${mobileSlotGap}px` : desktopSlotGap,
              overflow: 'visible',
              paddingTop: '0.5rem',
              paddingBottom: '1rem',
              willChange: 'transform',
            }}
          >
            {doctors.map((doc, idx) => {
              const isCardOpened = hoveredDoctorIndex === idx;

              const isOffscreenInFirstView = !isMobile && desktopOffset === 0 && idx >= 5;

              return (
                <div
                  key={doc.id}
                  className="doctor-slot"
                  onClick={() => {
                    if (hasDragged || isOffscreenInFirstView) return;
                    handleDoctorClick(idx);
                  }}
                  onMouseEnter={() => {
                    if (isOffscreenInFirstView) return;
                    handleMouseEnter(idx);
                  }}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    flex: `0 0 ${isMobile ? mobileSlotWidth : desktopSlotWidth}px`,
                    width: `${isMobile ? mobileSlotWidth : desktopSlotWidth}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: isOffscreenInFirstView ? 'default' : 'pointer',
                    position: 'relative',
                    zIndex: isCardOpened ? 60 : 20,
                    opacity: isOffscreenInFirstView ? 0 : 1,
                    visibility: isOffscreenInFirstView ? 'hidden' : 'visible',
                    pointerEvents: isOffscreenInFirstView ? 'none' : 'auto',
                    transition: 'opacity 0.22s ease, visibility 0.22s ease',
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
                      transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s',
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
                        border: '3.5px solid #FFFFFF',
                        boxShadow: '0 8px 22px rgba(0, 0, 0, 0.08)',
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
                          objectPosition: doc.imagePosition || 'center',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>

                    {/* Present / Absent Small Bar */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor:
                          doc.status === 'Present'
                            ? 'rgba(22, 163, 74, 0.1)'
                            : 'rgba(239, 68, 68, 0.1)',
                        border:
                          doc.status === 'Present'
                            ? '1px solid rgba(22, 163, 74, 0.3)'
                            : '1px solid rgba(239, 68, 68, 0.3)',
                        marginTop: '0.65rem',
                        marginBottom: '0.15rem',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: doc.status === 'Present' ? '#16A34A' : '#EF4444',
                          boxShadow: doc.status === 'Present' ? '0 0 6px rgba(22, 163, 74, 0.5)' : '0 0 6px rgba(239, 68, 68, 0.5)',
                          display: 'inline-block',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          color: doc.status === 'Present' ? '#15803D' : '#B91C1C',
                        }}
                      >
                        {doc.status}
                      </span>
                    </div>

                    {/* Doctor Name */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: isMobile ? '0.84rem' : '0.9rem',
                        fontWeight: 700,
                        color: 'var(--color-neutral-900)',
                        marginTop: '0.35rem',
                        marginBottom: '0.15rem',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.25,
                        textAlign: 'center',
                        maxWidth: isMobile ? '135px' : '170px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={doc.name}
                    >
                      {doc.name}
                    </h3>

                    {/* Doctor Specialty */}
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: isMobile
                          ? '0.68rem'
                          : doc.specialty.length > 22
                          ? '0.71rem'
                          : '0.77rem',
                        fontWeight: 600,
                        color: 'var(--color-brand-500)',
                        margin: 0,
                        lineHeight: 1.25,
                        textAlign: 'center',
                        maxWidth: isMobile ? '135px' : '175px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={doc.specialty}
                    >
                      {doc.specialty}
                    </p>
                  </div>

                  {/* Detailed Card: Desktop local popup on hover/click */}
                  {!isMobile && (
                    <AnimatePresence>
                      {isCardOpened && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.92, x: 0 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{
                            opacity: 0,
                            scale: 0.92,
                            x: 0,
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
                            top: '68px',
                            left: 'calc(50% - 157px)',
                            width: '315px',
                            transformOrigin: '50% 0px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '28px',
                            padding: 'clamp(4.8rem, 5.2vw, 5.3rem) 1.2rem 1.05rem 1.2rem',
                            boxShadow:
                              '0 20px 45px rgba(2, 54, 58, 0.22), 0 4px 14px rgba(0,0,0,0.06)',
                            textAlign: 'center',
                            zIndex: 70,
                            marginBottom: '0px',
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
                          {/* Status Dot in the End of the Card (Top Right Corner: Green if Present, Red if Absent) */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '16px',
                              right: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor:
                                doc.status === 'Present'
                                  ? 'rgba(34, 197, 94, 0.14)'
                                  : 'rgba(239, 68, 68, 0.14)',
                              zIndex: 85,
                            }}
                            title={doc.status === 'Present' ? 'Doctor Present' : 'Doctor Absent'}
                          >
                            <span
                              style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: doc.status === 'Present' ? '#22C55E' : '#EF4444',
                                boxShadow:
                                  doc.status === 'Present'
                                    ? '0 0 10px #22C55E, 0 0 4px #22C55E'
                                    : '0 0 10px #EF4444, 0 0 4px #EF4444',
                                display: 'inline-block',
                              }}
                            />
                          </div>

                          {/* Top Protruding Avatar (aligns directly over slot circle) */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '-74px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '144px',
                              height: '144px',
                              borderRadius: '50%',
                              backgroundColor: doc.bg,
                              border: '4px solid #FFFFFF',
                              overflow: 'hidden',
                              boxShadow: `0 12px 28px rgba(0,0,0,0.18), 0 0 25px ${doc.bg}66`,
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
                                objectPosition: doc.imagePosition || 'center',
                                pointerEvents: 'none',
                              }}
                            />
                          </div>

                          {/* Card Content */}
                          <div>
                            {/* First line: Name of the Doctor in centre */}
                            <h3
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(1.16rem, 1.38vw, 1.32rem)',
                                fontWeight: 700,
                                color: 'var(--color-neutral-900)',
                                margin: '0.45rem 0 0 0',
                                textAlign: 'center',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.22,
                              }}
                            >
                              {doc.name}
                            </h3>

                            {/* Second line: Doctor Title in the centre */}
                            <p
                              style={{
                                fontFamily: 'var(--font-main)',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: 'var(--color-brand-500)',
                                marginTop: '0.2rem',
                                marginBottom: '0.55rem',
                                textAlign: 'center',
                              }}
                            >
                              {doc.specialty}
                            </p>

                            {/* Bio Description */}
                            <p
                              style={{
                                fontFamily: 'var(--font-main)',
                                fontSize: '0.78rem',
                                lineHeight: 1.38,
                                color: 'var(--color-neutral-600)',
                                marginBottom: '0.65rem',
                                textAlign: 'center',
                              }}
                            >
                              {doc.bio}
                            </p>

                            {/* 3-Column Credentials / Stats */}
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '0.25rem',
                                paddingTop: '0.5rem',
                                paddingBottom: '0.5rem',
                                borderTop: '1px solid var(--color-neutral-200)',
                                borderBottom: '1px solid var(--color-neutral-200)',
                                marginBottom: '0.8rem',
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
                                  color="#1F5FD4"
                                  style={{ marginBottom: '0.3rem' }}
                                />
                                <span
                                  style={{
                                    fontFamily: 'var(--font-main)',
                                    fontSize: '0.74rem',
                                    fontWeight: 700,
                                    color: 'var(--color-neutral-900)',
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
                                    color: 'var(--color-neutral-500)',
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
                                  borderLeft: '1px solid var(--color-neutral-200)',
                                  borderRight: '1px solid var(--color-neutral-200)',
                                }}
                              >
                                <Award
                                  size={19}
                                  color="#1F5FD4"
                                  style={{ marginBottom: '0.3rem' }}
                                />
                                <span
                                  style={{
                                    fontFamily: 'var(--font-main)',
                                    fontSize: '0.74rem',
                                    fontWeight: 700,
                                    color: 'var(--color-neutral-900)',
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
                                    color: 'var(--color-neutral-500)',
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
                                  color="#1F5FD4"
                                  style={{ marginBottom: '0.3rem' }}
                                />
                                <span
                                  style={{
                                    fontFamily: 'var(--font-main)',
                                    fontSize: '0.74rem',
                                    fontWeight: 700,
                                    color: 'var(--color-neutral-900)',
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
                                    color: 'var(--color-neutral-500)',
                                    lineHeight: 1.2,
                                    marginTop: '2px',
                                  }}
                                >
                                  {doc.patientsSub}
                                </span>
                              </div>
                            </div>

                            {/* Brand Blue High-Contrast CTA Button */}
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
                                backgroundColor: 'var(--color-brand-500)',
                                color: '#FFFFFF',
                                fontFamily: 'var(--font-main)',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                padding: '0.6rem 1.1rem',
                                borderRadius: 'var(--radius-pill)',
                                boxShadow: '0 5px 16px rgba(31, 95, 212, 0.35)',
                                cursor: 'pointer',
                                border: 'none',
                                transition:
                                  'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-brand-600)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 10px 24px rgba(31, 95, 212, 0.45)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-brand-500)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 6px 18px rgba(31, 95, 212, 0.35)';
                              }}
                            >
                              <span>View Full Profile</span>
                              <ArrowRight size={16} strokeWidth={2.4} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Mobile Dedicated Detail Card: Smooth, lightweight, fast, stable card */}
          {isMobile && (
            <AnimatePresence>
              {hoveredDoctorIndex !== null && doctors[hoveredDoctorIndex] && (() => {
                const doc = doctors[hoveredDoctorIndex];
                return (
                  <motion.div
                    key="mobile-detail-card"
                    initial={{ opacity: 0, y: 16, scale: 0.95, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.95,
                      x: '-50%',
                      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                    }}
                    transition={{
                      duration: 0.32,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      position: 'absolute',
                      top: '66px',
                      left: `calc(50% + ${dragOffset}px)`,
                      width: '295px',
                      transformOrigin: '50% 0px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '28px',
                      padding: 'clamp(4.8rem, 5.2vw, 5.3rem) 1.2rem 1.05rem 1.2rem',
                      boxShadow:
                        '0 20px 45px rgba(2, 54, 58, 0.22), 0 4px 14px rgba(0,0,0,0.06)',
                      textAlign: 'center',
                      zIndex: 70,
                      marginBottom: '0px',
                      WebkitTapHighlightColor: 'transparent',
                      willChange: 'transform, opacity',
                    }}
                    onClick={(e) => {
                      const target = e.target as HTMLElement | null;
                      if (
                        target &&
                        typeof target.closest === 'function' &&
                        (target.closest('button') || target.closest('a'))
                      ) {
                        return;
                      }
                      e.stopPropagation();
                      setHoveredDoctorIndex(null);
                    }}
                  >
                    {/* Status Dot in Top Right Corner */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor:
                          doc.status === 'Present'
                            ? 'rgba(34, 197, 94, 0.14)'
                            : 'rgba(239, 68, 68, 0.14)',
                        zIndex: 85,
                        transition: 'background-color 0.2s ease',
                      }}
                      title={doc.status === 'Present' ? 'Doctor Present' : 'Doctor Absent'}
                    >
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: doc.status === 'Present' ? '#22C55E' : '#EF4444',
                          boxShadow:
                            doc.status === 'Present'
                              ? '0 0 10px #22C55E, 0 0 4px #22C55E'
                              : '0 0 10px #EF4444, 0 0 4px #EF4444',
                          display: 'inline-block',
                          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                        }}
                      />
                    </div>

                    {/* Top Protruding Avatar */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-66px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '132px',
                        height: '132px',
                        borderRadius: '50%',
                        backgroundColor: doc.bg,
                        border: '4px solid #FFFFFF',
                        overflow: 'hidden',
                        boxShadow: `0 12px 28px rgba(0,0,0,0.18), 0 0 25px ${doc.bg}66`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 75,
                        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                    >
                      <motion.img
                        key={doc.id}
                        src={doc.image}
                        alt={doc.name}
                        draggable={false}
                        initial={{ opacity: 0.4, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: doc.imagePosition || 'center',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>

                    {/* Card Content with Fast Subtle Crossfade */}
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0.4, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Doctor Name */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.16rem, 1.38vw, 1.32rem)',
                          fontWeight: 700,
                          color: 'var(--color-neutral-900)',
                          margin: '0.45rem 0 0 0',
                          textAlign: 'center',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.22,
                        }}
                      >
                        {doc.name}
                      </h3>

                      {/* Doctor Title */}
                      <p
                        style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: 'var(--color-brand-500)',
                          marginTop: '0.2rem',
                          marginBottom: '0.55rem',
                          textAlign: 'center',
                        }}
                      >
                        {doc.specialty}
                      </p>

                      {/* Bio Description */}
                      <p
                        style={{
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.78rem',
                          lineHeight: 1.38,
                          color: 'var(--color-neutral-600)',
                          marginBottom: '0.65rem',
                          textAlign: 'center',
                        }}
                      >
                        {doc.bio}
                      </p>

                      {/* 3-Column Credentials */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '0.25rem',
                          paddingTop: '0.5rem',
                          paddingBottom: '0.5rem',
                          borderTop: '1px solid var(--color-neutral-200)',
                          borderBottom: '1px solid var(--color-neutral-200)',
                          marginBottom: '0.8rem',
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
                            color="#1F5FD4"
                            style={{ marginBottom: '0.3rem' }}
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-main)',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              color: 'var(--color-neutral-900)',
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
                              color: 'var(--color-neutral-500)',
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
                            borderLeft: '1px solid var(--color-neutral-200)',
                            borderRight: '1px solid var(--color-neutral-200)',
                          }}
                        >
                          <Award
                            size={19}
                            color="#1F5FD4"
                            style={{ marginBottom: '0.3rem' }}
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-main)',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              color: 'var(--color-neutral-900)',
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
                              color: 'var(--color-neutral-500)',
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
                            color="#1F5FD4"
                            style={{ marginBottom: '0.3rem' }}
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-main)',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              color: 'var(--color-neutral-900)',
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
                              color: 'var(--color-neutral-500)',
                              lineHeight: 1.2,
                              marginTop: '2px',
                            }}
                          >
                            {doc.patientsSub}
                          </span>
                        </div>
                      </div>

                      {/* Brand Blue CTA Button */}
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
                          backgroundColor: 'var(--color-brand-500)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          padding: '0.6rem 1.1rem',
                          borderRadius: 'var(--radius-pill)',
                          boxShadow: '0 5px 16px rgba(31, 95, 212, 0.35)',
                          cursor: 'pointer',
                          border: 'none',
                          transition:
                            'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                          WebkitTapHighlightColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-brand-600)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 10px 24px rgba(31, 95, 212, 0.45)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-brand-500)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 5px 16px rgba(31, 95, 212, 0.35)';
                        }}
                      >
                        <span>View Full Profile</span>
                        <ArrowRight size={16} strokeWidth={2.4} />
                      </button>
                    </motion.div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Bottom Bar: Clean surface */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          position: 'relative',
          zIndex: 15,
          paddingTop: isMobile
            ? (hoveredDoctorIndex !== null ? '2.4rem' : '0.7rem')
            : '0.7rem',
          paddingBottom: isMobile
            ? (hoveredDoctorIndex !== null ? '1rem' : '0.7rem')
            : '0.7rem',
          transition: 'padding-top 0.32s cubic-bezier(0.16, 1, 0.3, 1), padding-bottom 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'padding-top',
        }}
      >
        <div
          className="container"
          style={{
            marginTop: 0,
            paddingLeft: isMobile ? '1.25rem' : '90px',
            paddingRight: isMobile ? '1.25rem' : '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: '42px',
          }}
        >
          {/* Centered Locations Status Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Clinic Locations Small Bar: Opened & Closed */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                backgroundColor: '#FFFFFF',
                padding: '0.42rem 0.75rem 0.42rem 0.95rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--color-neutral-200)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--color-neutral-600)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Locations:
              </span>

              {/* Valanchery Clinic: Dynamic from Supabase */}
              {(() => {
                const valBranch = branchList.find(
                  (b) =>
                    b.id === '0a19849f-aac8-477e-b951-d7c1e0d55a46' ||
                    b.name.toLowerCase().includes('valanchery')
                );
                const isValOpen = valBranch ? valBranch.is_active : true;
                return (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: isValOpen ? 'rgba(22, 163, 74, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      border: isValOpen
                        ? '1px solid rgba(22, 163, 74, 0.3)'
                        : '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '0.24rem 0.65rem',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-main)',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: isValOpen ? '#16A34A' : '#EF4444',
                        boxShadow: isValOpen
                          ? '0 0 6px rgba(22, 163, 74, 0.5)'
                          : '0 0 6px rgba(239, 68, 68, 0.5)',
                      }}
                    />
                    <span style={{ color: 'var(--color-neutral-900)', fontWeight: 600 }}>Valanchery</span>
                    <span
                      style={{
                        color: isValOpen ? '#15803D' : '#B91C1C',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '0.64rem',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {isValOpen ? 'Opened' : 'Closed'}
                    </span>
                  </div>
                );
              })()}

              {/* Edayoor Clinic: Dynamic from Supabase */}
              {(() => {
                const edBranch = branchList.find(
                  (b) =>
                    b.id === 'e0e38ad6-dafd-4049-9aa2-4b49c55208bb' ||
                    b.name.toLowerCase().includes('edayoor')
                );
                const isEdOpen = edBranch ? edBranch.is_active : true;
                return (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: isEdOpen ? 'rgba(22, 163, 74, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      border: isEdOpen
                        ? '1px solid rgba(22, 163, 74, 0.3)'
                        : '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '0.24rem 0.65rem',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-main)',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: isEdOpen ? '#16A34A' : '#EF4444',
                        boxShadow: isEdOpen
                          ? '0 0 6px rgba(22, 163, 74, 0.5)'
                          : '0 0 6px rgba(239, 68, 68, 0.5)',
                      }}
                    />
                    <span style={{ color: 'var(--color-neutral-900)', fontWeight: 600 }}>Edayoor</span>
                    <span
                      style={{
                        color: isEdOpen ? '#15803D' : '#B91C1C',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '0.64rem',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {isEdOpen ? 'Opened' : 'Closed'}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Right Reference Branding: Wavy SVG Line & Healthy Smiles Tag */}
          <div
            style={{
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              position: 'absolute',
              right: isMobile ? '1.25rem' : '90px',
            }}
          >
            <svg width="36" height="15" viewBox="0 0 36 15" fill="none">
              <path
                d="M1 10C6 3 12 14 18 8C24 2 30 12 35 7"
                stroke="var(--color-neutral-400)"
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
                color: 'var(--color-neutral-500)',
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
