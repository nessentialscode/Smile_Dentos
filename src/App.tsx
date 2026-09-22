import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TransformSection } from './components/TransformSection';
import { ServicesSection } from './components/ServicesSection';
import { SpecialistsSection } from './components/SpecialistsSection';
import { BranchesSection } from './components/BranchesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FooterSection } from './components/FooterSection';
import { AppointmentModal } from './components/AppointmentModal';
import { AdminLoginPage } from './components/AdminLoginPage';
import { AdminPortal } from './components/AdminPortal';
import { getAdminSession, signOutAdmin, type AdminSession } from './services/authService';
import {
  initSmoothScroll,
  smoothScrollTo,
  pauseSmoothScroll,
  resumeSmoothScroll,
} from './utils/smoothScroll';

export function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('Valanchery Main Clinic');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('Dr. ATHIRA.S');
  const [showAllServices, setShowAllServices] = useState(false);

  // Admin authentication and routing states
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => getAdminSession());
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
    }
    return false;
  });

  // Track scroll and viewport for mobile vs desktop button behaviors
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const lenis = initSmoothScroll();

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();

    const onScroll = (e: { scroll: number }) => {
      setScrollY(e.scroll);
    };
    lenis.on('scroll', onScroll);

    window.addEventListener('resize', handleResize);
    return () => {
      lenis.off('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Pause Lenis background scrolling when the booking modal is open
  useEffect(() => {
    if (bookingOpen) {
      pauseSmoothScroll();
    } else {
      resumeSmoothScroll();
    }
  }, [bookingOpen]);

  // Moving book appointment button: on desktop always visible. On mobile, starts after landing page first view (~380px)
  const showMovingBookingButton = !isMobile || scrollY > 380;

  useEffect(() => {
    const handleLocationChange = () => {
      const isNowAdmin =
        window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
      setIsAdminRoute(isNowAdmin);
      setAdminSession(getAdminSession());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminRoute(true);
    setAdminSession(getAdminSession());
    smoothScrollTo(0, { duration: 1.0 });
  };

  const handleBackToSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
    smoothScrollTo(0, { duration: 1.0 });
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setAdminSession(null);
  };

  const handleOpenBooking = (branchName?: string, doctorName?: string) => {
    if (branchName) {
      setSelectedBranch(branchName);
    }
    if (doctorName) {
      setSelectedDoctor(doctorName);
    }
    setBookingOpen(true);
  };

  // ADMIN ROUTING: If route is /admin or #admin
  if (isAdminRoute) {
    // Unauthenticated: Render Admin Login Screen
    if (!adminSession || !adminSession.user) {
      return (
        <AdminLoginPage
          onSuccess={() => setAdminSession(getAdminSession())}
          onNavigateHome={handleBackToSite}
        />
      );
    }

    // Authenticated: Render Admin Operations Portal
    return (
      <AdminPortal
        adminEmail={adminSession.user.email}
        onLogout={handleLogout}
        onBackToSite={handleBackToSite}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} onOpenAdmin={handleNavigateToAdmin} />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* Frame 02: Hero Section */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* Frames 03-04: Transform Your Smile */}
        <TransformSection onOpenBooking={() => handleOpenBooking()} />

        {/* Frames 05-08: Our Services Interactive Accordion */}
        <ServicesSection
          showAllServices={showAllServices}
          onToggleShowAllServices={() => setShowAllServices((prev) => !prev)}
        />

        {/* Frames 09-11: Our Specialist Wave & Carousel */}
        <SpecialistsSection
          onOpenBooking={(doctorName) => handleOpenBooking(undefined, doctorName)}
          showAllServices={showAllServices}
          onToggleShowAllServices={() => setShowAllServices((prev) => !prev)}
        />

        {/* Clinic Branches Section (Valanchery & Edayoor) */}
        <BranchesSection onOpenBooking={handleOpenBooking} />

        {/* Frames 15-17: 39 Google Reviews Testimonial Slider */}
        <ReviewsSection />
      </main>

      {/* Frame 18: High Impact Chartreuse Footer & CTA */}
      <FooterSection onOpenBooking={() => handleOpenBooking()} onOpenAdmin={handleNavigateToAdmin} />

      {/* Floating "Book Appointment" CTA: always visible on desktop, starts after landing page first view on mobile */}
      <AnimatePresence>
        {showMovingBookingButton && (
          <motion.div
            key="floating-booking-btn"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: 'clamp(1.25rem, 2.8vw, 2.25rem)',
              left: 'clamp(1.25rem, 3vw, 2.5rem)',
              zIndex: 90,
            }}
          >
            <motion.button
              type="button"
              onClick={() => handleOpenBooking()}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Book Appointment"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                backgroundColor: '#D7F846',
                color: '#5E2614',
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(0.78rem, 0.95vw, 0.84rem)',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '0.72rem 1.35rem',
                borderRadius: 'var(--radius-pill)',
                border: '2px solid rgba(255, 255, 255, 0.75)',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18), 0 0 16px rgba(215, 248, 70, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E2FA65';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.22), 0 0 22px rgba(215, 248, 70, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#D7F846';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.18), 0 0 16px rgba(215, 248, 70, 0.4)';
              }}
            >
              <Calendar size={17} strokeWidth={2.4} />
              <span>BOOK APPOINTMENT</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Booking Modal */}
      <AppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedBranch={selectedBranch}
        selectedDoctor={selectedDoctor}
      />
    </div>
  );
}

export default App;
