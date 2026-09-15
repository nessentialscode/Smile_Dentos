import { useState } from 'react';
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

export function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('Valanchery Main Clinic');

  const handleOpenBooking = (branchName?: string) => {
    if (branchName) {
      setSelectedBranch(branchName);
    }
    setBookingOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* Frame 02: Hero Section */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* Frames 03-04: Transform Your Smile */}
        <TransformSection onOpenBooking={() => handleOpenBooking()} />

        {/* Frames 05-08: Our Services Interactive Accordion */}
        <ServicesSection />

        {/* Frames 09-11: Our Specialist Wave & Carousel */}
        <SpecialistsSection />

        {/* Clinic Branches Section (Valanchery & Edayoor) */}
        <BranchesSection onOpenBooking={handleOpenBooking} />

        {/* Frame 14: Who We Help? (Kids, Teenage, Adults) */}
        <WhoWeHelpSection />

        {/* Frames 15-17: 39 Google Reviews Testimonial Slider */}
        <ReviewsSection />
      </main>

      {/* Frame 18: High Impact Chartreuse Footer & CTA */}
      <FooterSection onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Modal */}
      <AppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedBranch={selectedBranch}
      />
    </div>
  );
}

export default App;
