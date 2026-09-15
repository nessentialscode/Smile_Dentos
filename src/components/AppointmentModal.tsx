import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBranch?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, selectedBranch }) => {
  const [branchOverride, setBranchOverride] = useState<string | null>(null);
  const defaultBranch = selectedBranch && selectedBranch.includes('Edayoor') ? 'Edayoor Branch' : 'Valanchery Main Clinic';
  const branch = branchOverride ?? defaultBranch;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Teeth whitening');
  const [doctor, setDoctor] = useState('Dr. John Smith');
  const [type, setType] = useState<'Online' | 'In-person'>('In-person');
  const [date, setDate] = useState('2026-09-15');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D7F846', '#8F4225', '#FAF4E8', '#B2A4EC']
    });
    setTimeout(() => {
      // Reset after 3.5s
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 500);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem'
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(14, 10, 8, 0.75)',
              backdropFilter: 'blur(12px)'
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '540px',
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FAF4E8',
              borderRadius: '28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
              border: '1px solid rgba(142, 66, 37, 0.15)',
              overflow: 'hidden'
            }}
          >
            {/* Header with Title & Close Button */}
            <div
              style={{
                backgroundColor: 'var(--color-rust)',
                color: 'var(--color-white)',
                padding: 'clamp(1.2rem, 3vw, 1.75rem) clamp(1.2rem, 3.5vw, 2rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2
                  }}
                >
                  Book Your Appointment
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.84rem',
                    color: 'var(--color-lime)',
                    fontWeight: 600,
                    marginTop: '0.2rem'
                  }}
                >
                  Smile Dentos Family Dental Clinic · Valanchery
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-white)',
                  transition: 'background-color 0.2s',
                  flexShrink: 0,
                  marginLeft: '0.75rem',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)')}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', overflowY: 'auto' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-lime)',
                      color: 'var(--color-rust-dark)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <CheckCircle2 size={40} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color: 'var(--color-rust-dark)',
                      fontWeight: 700,
                      marginBottom: '0.5rem'
                    }}
                  >
                    Appointment Confirmed!
                  </h3>
                  <p
                    style={{
                      color: 'var(--color-rust-dark)',
                      opacity: 0.85,
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      maxWidth: '380px',
                      margin: '0 auto 1.25rem'
                    }}
                  >
                    Thank you, {name || 'valued patient'}! Smile Dentos team at {branch} will confirm your booking shortly at {phone || '094959 64737'}.
                  </p>
                  <a
                    href="tel:09495964737"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0.5rem 1.2rem',
                      backgroundColor: '#5E2614',
                      color: 'var(--color-white)',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    Direct Clinic Line: 094959 64737
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Consultation Type Selector */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-rust-dark)',
                        marginBottom: '0.4rem'
                      }}
                    >
                      Consultation Mode
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      {(['In-person', 'Online'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setType(mode)}
                          style={{
                            padding: '0.65rem 1rem',
                            borderRadius: 'var(--radius-pill)',
                            border: `1.5px solid ${type === mode ? 'var(--color-rust)' : 'rgba(94, 38, 20, 0.2)'}`,
                            backgroundColor: type === mode ? 'var(--color-rust)' : 'transparent',
                            color: type === mode ? 'var(--color-white)' : 'var(--color-rust-dark)',
                            fontFamily: 'var(--font-main)',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {mode === 'In-person' ? '🏥 In-person Clinic' : '💻 Online Consultation'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clinic Branch Selector */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-rust-dark)',
                        marginBottom: '0.35rem'
                      }}
                    >
                      Preferred Clinic Branch
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranchOverride(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.9rem',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(94, 38, 20, 0.2)',
                        backgroundColor: '#FFFFFF',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.9rem',
                        color: 'var(--color-rust-dark)',
                        outline: 'none'
                      }}
                    >
                      <option value="Valanchery Main Clinic">Valanchery Main Clinic (Perinthalmanna Rd, Kolamangalam)</option>
                      <option value="Edayoor Branch">Edayoor Branch (Madathil Complex, Mavandiyoor)</option>
                    </select>
                  </div>

                  {/* Name and Phone */}
                  <div className="modal-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: 'var(--color-rust-dark)',
                          marginBottom: '0.35rem'
                        }}
                      >
                        Patient Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Guy Hawkins"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '12px',
                          border: '1.5px solid rgba(94, 38, 20, 0.2)',
                          backgroundColor: '#FFFFFF',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.9rem',
                          color: 'var(--color-rust-dark)',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: 'var(--color-rust-dark)',
                          marginBottom: '0.35rem'
                        }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="094959 64737"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '12px',
                          border: '1.5px solid rgba(94, 38, 20, 0.2)',
                          backgroundColor: '#FFFFFF',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.9rem',
                          color: 'var(--color-rust-dark)',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-rust-dark)',
                        marginBottom: '0.35rem'
                      }}
                    >
                      Desired Dental Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.9rem',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(94, 38, 20, 0.2)',
                        backgroundColor: '#FFFFFF',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.9rem',
                        color: 'var(--color-rust-dark)',
                        outline: 'none'
                      }}
                    >
                      <option value="Dental fillings">Dental fillings (Restorative care)</option>
                      <option value="Teeth whitening">Teeth whitening (Cosmetic)</option>
                      <option value="Oral Surgery">Oral Surgery (Wisdom teeth / extractions)</option>
                      <option value="Dental implants">Dental implants (Titanium/Zirconia)</option>
                      <option value="General Checkup">Comprehensive General Dental Examination</option>
                    </select>
                  </div>

                  {/* Doctor & Date Selection */}
                  <div className="modal-two-col" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: 'var(--color-rust-dark)',
                          marginBottom: '0.35rem'
                        }}
                      >
                        Select Specialist Doctor
                      </label>
                      <select
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '12px',
                          border: '1.5px solid rgba(94, 38, 20, 0.2)',
                          backgroundColor: '#FFFFFF',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.9rem',
                          color: 'var(--color-rust-dark)',
                          outline: 'none'
                        }}
                      >
                        <option value="Dr. John Smith">Dr. John Smith — Orthodontics</option>
                        <option value="Dr. David Kim">Dr. David Kim — Endodontics</option>
                        <option value="Dr. Sarah Lee">Dr. Sarah Lee — Periodontics</option>
                        <option value="Dr. Steven Lee">Dr. Steven Lee — Cosmetic</option>
                        <option value="Dr. Jennifer Kim">Dr. Jennifer Kim — Orthodontics</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: 'var(--color-rust-dark)',
                          marginBottom: '0.35rem'
                        }}
                      >
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '12px',
                          border: '1.5px solid rgba(94, 38, 20, 0.2)',
                          backgroundColor: '#FFFFFF',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.9rem',
                          color: 'var(--color-rust-dark)',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{
                      marginTop: '0.75rem',
                      width: '100%',
                      backgroundColor: 'var(--color-lime)',
                      color: 'var(--color-rust-dark)',
                      padding: '0.95rem',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-main)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: '0 8px 24px rgba(215, 248, 70, 0.35)',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    Confirm Booking
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-rust-dark)', opacity: 0.75 }}>
                      Prefer to speak now?{' '}
                    </span>
                    <a
                      href="tel:09495964737"
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--color-rust)',
                        textDecoration: 'underline',
                      }}
                    >
                      Call Clinic: 094959 64737
                    </a>
                  </div>
                </form>
              )}
            </div>

            <style>{`
              @media (max-width: 500px) {
                .modal-two-col {
                  grid-template-columns: 1fr !important;
                  gap: 0.85rem !important;
                }
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
