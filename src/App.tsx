import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TransformSection } from './components/TransformSection';
import { ServicesSection } from './components/ServicesSection';
import { SpecialistsSection } from './components/SpecialistsSection';
import { BranchesSection } from './components/BranchesSection';
import { WhoWeHelpSection } from './components/WhoWeHelpSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FooterSection } from './components/FooterSection';
import { AppointmentModal } from './components/AppointmentModal';
import { AdminPortal } from './components/AdminPortal';

export function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('Valanchery Main Clinic');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('Dr. Sarah Lee');
  const [showAllServices, setShowAllServices] = useState(false);

  // Admin routing state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
    }
    return false;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const isNowAdmin =
        window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
      setIsAdminOpen(isNowAdmin);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigateToAdmin = () => {
    window.history.pushState({}, '', '#admin');
    setIsAdminOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSite = () => {
    window.history.pushState({}, '', window.location.pathname.startsWith('/admin') ? '/' : ' ');
    setIsAdminOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  if (isAdminOpen) {
    return <AdminPortal onBackToSite={handleBackToSite} />;
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

        {/* Frame 14: Who We Help? (Kids, Teenage, Adults) */}
        <WhoWeHelpSection />

        {/* Frames 15-17: 39 Google Reviews Testimonial Slider */}
        <ReviewsSection />
      </main>

      {/* Frame 18: High Impact Chartreuse Footer & CTA */}
      <FooterSection onOpenBooking={() => handleOpenBooking()} onOpenAdmin={handleNavigateToAdmin} />

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
