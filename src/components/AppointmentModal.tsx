import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBranch?: string;
  selectedDoctor?: string;
}

interface DoctorOption {
  name: string;
  specialty: string;
  defaultPresent: boolean;
}

const DOCTOR_OPTIONS: DoctorOption[] = [
  { name: 'Dr. ATHIRA.S', specialty: 'Chief Dental Surgeon', defaultPresent: true },
  { name: 'Dr. LIJEESH KADAMBIL', specialty: 'Dental Surgeon', defaultPresent: true },
  { name: 'Dr. BHAGYA.R', specialty: 'Lady Dental Surgeon', defaultPresent: true },
  { name: 'Dr. AYISHA NIZMIYA', specialty: 'Orthodontist | Invisalign® Provider', defaultPresent: true },
  { name: 'Dr. SHANAHAS', specialty: 'Orthodontist | Smile Dentos', defaultPresent: false },
  { name: 'Dr. JABIR KOTTAMMAL', specialty: 'Oral & Maxillofacial Surgeon', defaultPresent: true },
  { name: 'Dr. MOHAMMED HARIS', specialty: 'Consultant Periodontist', defaultPresent: false },
  { name: 'Dr. VIPIN DAS', specialty: 'Oral & Maxillofacial Surgeon', defaultPresent: true },
];

const getTodayDateString = (): string => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const checkIsSunday = (dateStr: string): boolean => {
  if (!dateStr) return false;
  const d = new Date(dateStr + 'T00:00:00');
  return d.getDay() === 0; // 0 is Sunday
};

const checkDoctorIsPresent = (doctorName: string): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('smile_dentos_admin_doctors');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const found = parsed.find((d: any) =>
          d.name === doctorName || doctorName.includes(d.name) || (d.name && d.name.includes(doctorName))
        );
        if (found && typeof found.is_present === 'boolean') {
          return found.is_present;
        }
      } catch {
        // fallback
      }
    }
  }
  const match = DOCTOR_OPTIONS.find((d) => d.name === doctorName);
  return match ? match.defaultPresent : true;
};

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  selectedBranch,
  selectedDoctor,
}) => {
  const [branchOverride, setBranchOverride] = useState<string | null>(null);
  const defaultBranch =
    selectedBranch && selectedBranch.includes('Edayoor')
      ? 'Edayoor Branch'
      : 'Valanchery Main Clinic';
  const branch = branchOverride ?? defaultBranch;

  const [doctorOverride, setDoctorOverride] = useState<string | null>(null);
  const doctor = doctorOverride ?? (selectedDoctor || 'Dr. ATHIRA.S');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Teeth whitening');
  const [date, setDate] = useState(getTodayDateString);
  const [submitted, setSubmitted] = useState(false);
  const [bookingAlert, setBookingAlert] = useState<{ type: 'error' | 'warning'; message: string } | null>(null);
  const prevIsOpenRef = useRef(false);

  // Sync state whenever modal opens or external doctor/branch changes
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      setDate(getTodayDateString());
      setDoctorOverride(selectedDoctor || 'Dr. ATHIRA.S');
      setBranchOverride(
        selectedBranch && selectedBranch.includes('Edayoor')
          ? 'Edayoor Branch'
          : 'Valanchery Main Clinic'
      );
      setSubmitted(false);
      setBookingAlert(null);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, selectedDoctor, selectedBranch]);

  const isSunday = checkIsSunday(date);
  const isDoctorPresent = checkDoctorIsPresent(doctor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Enforce Clinic Working Days: Monday to Saturday. Sunday closed.
    if (checkIsSunday(date)) {
      setBookingAlert({
        type: 'error',
        message: 'Sunday Clinic closed. Working days are Monday to Saturday.',
      });
      alert('Sunday Clinic closed. Smile Dentos clinic operates Monday to Saturday. Please choose another date.');
      return;
    }

    // 2. Enforce Doctor Presence: Cannot book absent doctor
    if (!checkDoctorIsPresent(doctor)) {
      setBookingAlert({
        type: 'error',
        message: `${doctor} is currently marked ABSENT. Appointments cannot be booked on their absent day.`,
      });
      alert(`Doctor Unavailable: ${doctor} is currently ABSENT. Appointments cannot be booked on their absent day. Please select an available doctor.`);
      return;
    }

    // Store in localStorage for live Admin Portal sync
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('smile_dentos_admin_appointments');
        const list = saved ? JSON.parse(saved) : [];
        const newApt = {
          id: `APT-${Date.now().toString().slice(-4)}`,
          full_name: name.trim() || 'Valued Patient',
          phone: phone.trim() || '094959 64737',
          doctor,
          service,
          branch,
          preferred_date: date,
          preferred_time: '10:00 AM',
          status: 'pending',
          notes: 'Direct website booking (In-person Clinic Consultation)',
          created_at: new Date().toISOString(),
        };
        localStorage.setItem('smile_dentos_admin_appointments', JSON.stringify([newApt, ...list]));
      } catch {
        // ignore
      }
    }

    setSubmitted(true);
    setBookingAlert(null);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#019EA2', '#0138A2', '#38BDF8', '#FFFFFF'],
    });

    setTimeout(() => {
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
            padding: '1.25rem',
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
              backgroundColor: 'rgba(12, 43, 109, 0.5)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal Container */}
          <motion.div
            data-lenis-prevent="true"
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
              backgroundColor: 'var(--color-neutral-0)',
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(12, 43, 109, 0.22)',
              border: '1px solid var(--color-neutral-200)',
              overflow: 'hidden',
            }}
          >
            {/* Header with Title & Close Button */}
            <div
              style={{
                backgroundColor: 'var(--color-neutral-0)',
                color: 'var(--color-neutral-900)',
                padding: 'clamp(1.2rem, 3vw, 1.75rem) clamp(1.2rem, 3.5vw, 2rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                flexShrink: 0,
                borderBottom: '1px solid var(--color-neutral-200)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    color: 'var(--color-neutral-900)',
                  }}
                >
                  Book Your Appointment
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.84rem',
                    color: 'var(--color-teal-600)',
                    fontWeight: 600,
                    marginTop: '0.2rem',
                  }}
                >
                  Smile Dentos Family Dental Clinic · Valanchery & Edayoor
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-neutral-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-neutral-700)',
                  transition: 'background-color 0.2s',
                  flexShrink: 0,
                  marginLeft: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-neutral-200)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-neutral-100)')}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div data-lenis-prevent="true" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', overflowY: 'auto' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-teal-50)',
                      color: 'var(--color-teal-600)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <CheckCircle2 size={40} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      color: 'var(--color-neutral-900)',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Appointment Confirmed!
                  </h3>
                  <p
                    style={{
                      color: 'var(--color-neutral-600)',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      maxWidth: '380px',
                      margin: '0 auto 1.25rem',
                    }}
                  >
                    Thank you, {name || 'valued patient'}! Smile Dentos team at {branch} will confirm your in-person clinic booking shortly at {phone || '094959 64737'}.
                  </p>
                  <a
                    href="tel:09495964737"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0.6rem 1.4rem',
                      backgroundColor: 'var(--color-brand-500)',
                      color: '#FFFFFF',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-brand-600)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-brand-500)')}
                  >
                    Direct Clinic Line: 094959 64737
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Alert banner if error or validation warning triggered */}
                  {bookingAlert && (
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        backgroundColor: '#FEE2E2',
                        border: '1.5px solid #EF4444',
                        color: '#991B1B',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <AlertCircle size={18} style={{ flexShrink: 0 }} />
                      <span>{bookingAlert.message}</span>
                    </div>
                  )}

                  {/* Consultation Mode: In-person Only */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-neutral-700)',
                        marginBottom: '0.4rem',
                      }}
                    >
                      Consultation Mode
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 1.1rem',
                        borderRadius: 'var(--radius-pill)',
                        border: '1.5px solid var(--color-teal-200)',
                        backgroundColor: 'var(--color-teal-50)',
                        color: 'var(--color-neutral-900)',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🏥</span>
                        <span>In-person Clinic Consultation</span>
                      </span>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          backgroundColor: 'var(--color-teal-500)',
                          color: '#FFFFFF',
                          padding: '0.2rem 0.65rem',
                          borderRadius: 'var(--radius-pill)',
                          letterSpacing: '0.04em',
                          fontWeight: 700,
                        }}
                      >
                        CLINIC ONLY
                      </span>
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
                        color: 'var(--color-neutral-700)',
                        marginBottom: '0.35rem',
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
                        border: '1.5px solid var(--color-neutral-200)',
                        backgroundColor: 'var(--color-neutral-0)',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.9rem',
                        color: 'var(--color-neutral-900)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-teal-400)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-neutral-200)')}
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
                          color: 'var(--color-neutral-700)',
                          marginBottom: '0.35rem',
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
                          border: '1.5px solid var(--color-neutral-200)',
                          backgroundColor: 'var(--color-neutral-0)',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.9rem',
                          color: 'var(--color-neutral-900)',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-teal-400)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-neutral-200)')}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: 'var(--color-neutral-700)',
                          marginBottom: '0.35rem',
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
                          border: '1.5px solid var(--color-neutral-200)',
                          backgroundColor: 'var(--color-neutral-0)',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.9rem',
                          color: 'var(--color-neutral-900)',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-teal-400)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-neutral-200)')}
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
                        color: 'var(--color-neutral-700)',
                        marginBottom: '0.35rem',
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
                        border: '1.5px solid var(--color-neutral-200)',
                        backgroundColor: 'var(--color-neutral-0)',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.9rem',
                        color: 'var(--color-neutral-900)',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-teal-400)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-neutral-200)')}
                    >
                      <option value="Digital Imaging">Digital Imaging (3D CBCT & Diagnostics)</option>
                      <option value="Cosmetic Dentistry">Cosmetic Dentistry (Veneers & Smile Design)</option>
                      <option value="Pediatric Dentistry">Pediatric Dentistry (Gentle Kids Dental)</option>
                      <option value="Dental Implants">Dental Implants (Titanium/Zirconia)</option>
                      <option value="Minor Surgery">Minor Surgery (Wisdom tooth & Extractions)</option>
                      <option value="Endodontics">Endodontics (Root Canal Therapy)</option>
                      <option value="Orthodontics">Orthodontics (Clear Aligners & Braces)</option>
                      <option value="Tooth Whitening">Tooth Whitening (Laser & Cosmetic)</option>
                      <option value="Comprehensive Examination">Comprehensive Dental Examination</option>
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
                          color: 'var(--color-neutral-700)',
                          marginBottom: '0.35rem',
                        }}
                      >
                        Select Specialist Doctor
                      </label>
                      <select
                        value={doctor}
                        onChange={(e) => {
                          setDoctorOverride(e.target.value);
                          setBookingAlert(null);
                        }}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '12px',
                          border: `1.5px solid ${!isDoctorPresent ? '#EF4444' : 'var(--color-neutral-200)'}`,
                          backgroundColor: 'var(--color-neutral-0)',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.9rem',
                          color: 'var(--color-neutral-900)',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => {
                          if (isDoctorPresent) e.currentTarget.style.borderColor = 'var(--color-teal-400)';
                        }}
                        onBlur={(e) => {
                          if (isDoctorPresent) e.currentTarget.style.borderColor = 'var(--color-neutral-200)';
                        }}
                      >
                        {DOCTOR_OPTIONS.map((doc) => {
                          const present = checkDoctorIsPresent(doc.name);
                          return (
                            <option key={doc.name} value={doc.name}>
                              {doc.name} — {doc.specialty} {present ? '(Present)' : '• ABSENT'}
                            </option>
                          );
                        })}
                      </select>

                      {/* Absent doctor warning */}
                      {!isDoctorPresent && (
                        <div
                          style={{
                            marginTop: '0.4rem',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '8px',
                            backgroundColor: '#FEE2E2',
                            border: '1px solid #FCA5A5',
                            color: '#991B1B',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                          <span>{doctor} is ABSENT today. Cannot be booked.</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: 'var(--color-neutral-700)',
                          marginBottom: '0.35rem',
                        }}
                      >
                        Preferred Date (Mon–Sat)
                      </label>
                      <input
                        type="date"
                        value={date}
                        min={getTodayDateString()}
                        onChange={(e) => {
                          setDate(e.target.value);
                          setBookingAlert(null);
                        }}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '12px',
                          border: `1.5px solid ${isSunday ? '#EF4444' : 'var(--color-neutral-200)'}`,
                          backgroundColor: 'var(--color-neutral-0)',
                          fontFamily: 'var(--font-main)',
                          fontSize: '0.9rem',
                          color: 'var(--color-neutral-900)',
                          outline: 'none',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => {
                          if (!isSunday) e.currentTarget.style.borderColor = 'var(--color-teal-400)';
                        }}
                        onBlur={(e) => {
                          if (!isSunday) e.currentTarget.style.borderColor = 'var(--color-neutral-200)';
                        }}
                      />

                      {/* Sunday clinic closed warning */}
                      {isSunday && (
                        <div
                          style={{
                            marginTop: '0.4rem',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '8px',
                            backgroundColor: '#FEE2E2',
                            border: '1px solid #FCA5A5',
                            color: '#991B1B',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                          <span>Sunday Clinic closed (Open Mon–Sat).</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{
                      marginTop: '0.75rem',
                      width: '100%',
                      backgroundColor: 'var(--color-brand-500)',
                      color: '#FFFFFF',
                      padding: '0.95rem',
                      borderRadius: 'var(--radius-pill)',
                      fontFamily: 'var(--font-main)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: '0 8px 24px rgba(31, 95, 212, 0.35)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.backgroundColor = 'var(--color-brand-600)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = 'var(--color-brand-500)';
                    }}
                  >
                    Confirm Booking
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-500)' }}>
                      Prefer to speak now?{' '}
                    </span>
                    <a
                      href="tel:09495964737"
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--color-brand-500)',
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
