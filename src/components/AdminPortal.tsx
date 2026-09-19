import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Stethoscope,
  Activity,
  ArrowLeft,
  Search,
  CheckCircle2,
  Building2,
  AlertCircle,
} from 'lucide-react';
import { initialDoctors, type DoctorProfile } from '../data/doctorsData';
import { initialServices, seeAllServices } from './ServicesSection';

interface AppointmentRecord {
  id: string;
  patientName: string;
  phone: string;
  doctorName: string;
  service: string;
  branch: string;
  mode: 'In-person' | 'Online';
  time: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

const mockInitialAppointments: AppointmentRecord[] = [
  {
    id: 'APT-101',
    patientName: 'Fathima Zahra',
    phone: '094959 64737',
    doctorName: 'Dr. Sarah Lee',
    service: 'Cosmetic Dentistry',
    branch: 'Valanchery Main Clinic',
    mode: 'In-person',
    time: '10:30 AM',
    date: 'Today',
    status: 'Confirmed',
  },
  {
    id: 'APT-102',
    patientName: 'Rahul Menon',
    phone: '098471 23901',
    doctorName: 'Dr. John Smith',
    service: 'Orthodontics',
    branch: 'Valanchery Main Clinic',
    mode: 'In-person',
    time: '11:15 AM',
    date: 'Today',
    status: 'Pending',
  },
  {
    id: 'APT-103',
    patientName: 'Ananya Varma',
    phone: '097452 88123',
    doctorName: 'Dr. David Kim',
    service: 'Endodontics',
    branch: 'Edayoor Branch',
    mode: 'In-person',
    time: '02:00 PM',
    date: 'Today',
    status: 'Confirmed',
  },
  {
    id: 'APT-104',
    patientName: 'Mohammed Shafi',
    phone: '094473 19022',
    doctorName: 'Dr. Steven Lee',
    service: 'Dental Implants',
    branch: 'Valanchery Main Clinic',
    mode: 'In-person',
    time: '03:30 PM',
    date: 'Today',
    status: 'Confirmed',
  },
  {
    id: 'APT-105',
    patientName: 'Aarav Nair',
    phone: '096331 45091',
    doctorName: 'Dr. Jennifer Kim',
    service: 'Pediatric Dentistry',
    branch: 'Valanchery Main Clinic',
    mode: 'In-person',
    time: '04:15 PM',
    date: 'Today',
    status: 'Pending',
  },
  {
    id: 'APT-106',
    patientName: 'Deepa Krishnan',
    phone: '091234 56789',
    doctorName: 'Dr. Sarah Lee',
    service: 'Tooth Whitening',
    branch: 'Edayoor Branch',
    mode: 'Online',
    time: '05:00 PM',
    date: 'Today',
    status: 'Completed',
  },
];

interface AdminPortalProps {
  onBackToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  const [activeTab, setActiveTab] = useState<'doctors' | 'appointments' | 'services' | 'branches'>('doctors');

  // Doctor presence state loaded from localStorage or initialized
  const [doctors, setDoctors] = useState<DoctorProfile[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('smile_dentos_admin_doctors');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return initialDoctors;
  });

  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('smile_dentos_admin_appointments');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return mockInitialAppointments;
  });

  // Save doctors presence whenever it updates
  useEffect(() => {
    try {
      localStorage.setItem('smile_dentos_admin_doctors', JSON.stringify(doctors));
    } catch {
      // ignore
    }
  }, [doctors]);

  // Save appointments
  useEffect(() => {
    try {
      localStorage.setItem('smile_dentos_admin_appointments', JSON.stringify(appointments));
    } catch {
      // ignore
    }
  }, [appointments]);

  // Toggle Doctor Presence (On Duty vs Off Duty)
  const handleToggleDoctorPresence = (id: string) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, isPresent: !doc.isPresent } : doc))
    );
  };

  // Update appointment status
  const handleUpdateAppointmentStatus = (id: string, newStatus: AppointmentRecord['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  // Appointment filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState('All');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState('All');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDoctor = selectedDoctorFilter === 'All' || apt.doctorName === selectedDoctorFilter;
    const matchesBranch = selectedBranchFilter === 'All' || apt.branch.includes(selectedBranchFilter);
    return matchesSearch && matchesDoctor && matchesBranch;
  });

  const onDutyCount = doctors.filter((d) => d.isPresent !== false).length;
  const pendingAppointmentsCount = appointments.filter((a) => a.status === 'Pending').length;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FAF5EE',
        color: '#3B180D',
        fontFamily: 'var(--font-main)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Professional Admin Bar */}
      <header
        style={{
          backgroundColor: '#4A1F10',
          color: '#FFFFFF',
          padding: '0.85rem 1.5rem',
          borderBottom: '2px solid rgba(215, 248, 70, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Brand & Portal Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img
              src="/images/smile_dentos_logo.png"
              alt="Smile Dentos"
              style={{
                height: '42px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <div style={{ borderLeft: '1.5px solid rgba(255,255,255,0.2)', paddingLeft: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Admin Operations Portal
                </span>
                <span
                  style={{
                    backgroundColor: 'var(--color-lime)',
                    color: '#3B180D',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Live Management
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.74rem',
                  opacity: 0.8,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>● Valanchery & Edayoor Clinics</span>
                <span>•</span>
                <span>Specialists & Presence Dashboard</span>
              </p>
            </div>
          </div>

          {/* Action: Back to Public Website */}
          <button
            type="button"
            onClick={onBackToSite}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.15rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-main)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-lime)';
              e.currentTarget.style.color = '#3B180D';
              e.currentTarget.style.borderColor = 'var(--color-lime)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Public Website</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '2rem 1.5rem', flex: 1 }}>
        {/* KPI Stat Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          {/* Doctors KPI */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.4rem',
              boxShadow: '0 4px 18px rgba(94, 38, 20, 0.06)',
              border: '1px solid rgba(94, 38, 20, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#78351D', opacity: 0.8 }}>
                Doctor Specialists
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  fontWeight: 700,
                  margin: '0.2rem 0',
                  color: '#3B180D',
                }}
              >
                {doctors.length}{' '}
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#16A34A' }}>
                  ({onDutyCount} On Duty)
                </span>
              </h4>
              <p style={{ fontSize: '0.74rem', color: '#6B7280', margin: 0 }}>
                {doctors.length - onDutyCount > 0
                  ? `${doctors.length - onDutyCount} off duty today`
                  : 'All specialists active on roster'}
              </p>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                backgroundColor: 'rgba(215, 248, 70, 0.35)',
                color: '#3B180D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stethoscope size={24} />
            </div>
          </div>

          {/* Appointments KPI */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.4rem',
              boxShadow: '0 4px 18px rgba(94, 38, 20, 0.06)',
              border: '1px solid rgba(94, 38, 20, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#78351D', opacity: 0.8 }}>
                Today's Bookings
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  fontWeight: 700,
                  margin: '0.2rem 0',
                  color: '#3B180D',
                }}
              >
                {appointments.length}{' '}
                {pendingAppointmentsCount > 0 && (
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#D97706' }}>
                    ({pendingAppointmentsCount} Pending)
                  </span>
                )}
              </h4>
              <p style={{ fontSize: '0.74rem', color: '#6B7280', margin: 0 }}>
                Across Valanchery & Edayoor
              </p>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Calendar size={24} />
            </div>
          </div>

          {/* Clinical Services KPI */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.4rem',
              boxShadow: '0 4px 18px rgba(94, 38, 20, 0.06)',
              border: '1px solid rgba(94, 38, 20, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#78351D', opacity: 0.8 }}>
                Clinical Services
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  fontWeight: 700,
                  margin: '0.2rem 0',
                  color: '#3B180D',
                }}
              >
                8{' '}
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#7C3AED' }}>
                  (5 First View + 3 See All)
                </span>
              </h4>
              <p style={{ fontSize: '0.74rem', color: '#6B7280', margin: 0 }}>
                100% synchronized with live site
              </p>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                backgroundColor: '#FAF5FF',
                color: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Activity size={24} />
            </div>
          </div>

          {/* Branches KPI */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.4rem',
              boxShadow: '0 4px 18px rgba(94, 38, 20, 0.06)',
              border: '1px solid rgba(94, 38, 20, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#78351D', opacity: 0.8 }}>
                Clinic Facilities
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  fontWeight: 700,
                  margin: '0.2rem 0',
                  color: '#3B180D',
                }}
              >
                2 Branches{' '}
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#16A34A' }}>
                  (Active)
                </span>
              </h4>
              <p style={{ fontSize: '0.74rem', color: '#6B7280', margin: 0 }}>
                Valanchery Main & Edayoor
              </p>
            </div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building2 size={24} />
            </div>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            borderBottom: '2px solid rgba(94, 38, 20, 0.12)',
            marginBottom: '2rem',
            overflowX: 'auto',
            paddingBottom: '0.25rem',
          }}
        >
          {[
            { id: 'doctors', label: '👨‍⚕️ Specialist Doctors Roster', count: doctors.length },
            { id: 'appointments', label: '📅 Patient Appointments Queue', count: appointments.length },
            { id: 'services', label: '🦷 Clinical Services Catalog', count: 8 },
            { id: 'branches', label: '🏥 Clinic Branches', count: 2 },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                style={{
                  padding: '0.8rem 1.4rem',
                  borderRadius: '12px 12px 0 0',
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#4A1F10' : '#78351D',
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 700 : 600,
                  border: 'none',
                  borderBottom: isActive ? '3px solid #4A1F10' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 -2px 10px rgba(0, 0, 0, 0.04)' : 'none',
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    backgroundColor: isActive ? '#4A1F10' : 'rgba(94, 38, 20, 0.1)',
                    color: isActive ? '#FFFFFF' : '#78351D',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.1rem 0.45rem',
                    borderRadius: '999px',
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DOCTOR SPECIALISTS ROSTER */}
        {activeTab === 'doctors' && (
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    margin: 0,
                    color: '#3B180D',
                  }}
                >
                  Doctor Presence & Specialists Roster
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: '0.25rem 0 0 0' }}>
                  Manage live presence for the 5 doctors shown on the public site. Toggling presence updates their status live across the public site and booking modal.
                </p>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  backgroundColor: '#FFFFFF',
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(94, 38, 20, 0.12)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                <span style={{ color: '#16A34A' }}>● {onDutyCount} Available</span>
                <span>•</span>
                <span style={{ color: '#DC2626' }}>{doctors.length - onDutyCount} Off Duty</span>
              </div>
            </div>

            {/* Doctors Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {doctors.map((doc) => {
                const isPresent = doc.isPresent !== false;

                return (
                  <div
                    key={doc.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 24px rgba(94, 38, 20, 0.08)',
                      border: isPresent
                        ? '2px solid rgba(22, 163, 74, 0.3)'
                        : '2px dashed rgba(220, 38, 38, 0.3)',
                      transition: 'all 0.25s ease',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Top Header with Color Swatch Banner */}
                    <div
                      style={{
                        backgroundColor: doc.bg,
                        padding: '1.5rem',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* Avatar Circle */}
                      <div
                        style={{
                          width: '74px',
                          height: '74px',
                          borderRadius: '50%',
                          border: '3.5px solid #FFFFFF',
                          overflow: 'hidden',
                          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
                          backgroundColor: '#FFFFFF',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={doc.image}
                          alt={doc.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>

                      {/* Presence Toggle Control */}
                      <div
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.45rem 0.9rem',
                          borderRadius: '999px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: isPresent ? '#15803D' : '#DC2626',
                          }}
                        >
                          {isPresent ? '● On Duty' : '○ Off Duty'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleDoctorPresence(doc.id)}
                          style={{
                            width: '42px',
                            height: '24px',
                            borderRadius: '999px',
                            backgroundColor: isPresent ? '#16A34A' : '#CBD5E1',
                            position: 'relative',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                          }}
                          aria-label={`Toggle presence for ${doc.name}`}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              top: '2px',
                              left: isPresent ? '20px' : '2px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: '#FFFFFF',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                              transition: 'left 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '10px',
                            }}
                          >
                            {isPresent ? '✓' : '×'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <h4
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '1.25rem',
                              fontWeight: 700,
                              color: '#18181B',
                              margin: '0 0 0.2rem 0',
                            }}
                          >
                            {doc.name}
                          </h4>
                          <span
                            style={{
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: '#7C3AED',
                              display: 'inline-block',
                            }}
                          >
                            {doc.specialty}
                          </span>
                        </div>

                        {/* Color Tag Badge */}
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: doc.bg,
                            border: '2px solid #FFFFFF',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          }}
                          title={`Assigned Color Swatch: ${doc.bg}`}
                        />
                      </div>

                      {/* Bio */}
                      <p
                        style={{
                          fontSize: '0.82rem',
                          lineHeight: 1.5,
                          color: '#4B5563',
                          margin: '0.8rem 0 1rem 0',
                          flex: 1,
                        }}
                      >
                        {doc.bio}
                      </p>

                      {/* Credentials Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '0.5rem',
                          backgroundColor: '#F9FAFB',
                          padding: '0.75rem',
                          borderRadius: '14px',
                          border: '1px solid rgba(0,0,0,0.06)',
                          textAlign: 'center',
                          marginBottom: '1rem',
                        }}
                      >
                        <div>
                          <span style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#111827' }}>
                            {doc.degreeTitle}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: '#6B7280' }}>
                            {doc.degreeSub}
                          </span>
                        </div>
                        <div style={{ borderLeft: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)' }}>
                          <span style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#111827' }}>
                            {doc.experienceTitle}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: '#6B7280' }}>
                            {doc.experienceSub}
                          </span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#111827' }}>
                            {doc.patientsTitle}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: '#6B7280' }}>
                            {doc.patientsSub}
                          </span>
                        </div>
                      </div>

                      {/* Status indicator note */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          fontSize: '0.76rem',
                          color: isPresent ? '#15803D' : '#B91C1C',
                          backgroundColor: isPresent ? '#F0FDF4' : '#FEF2F2',
                          padding: '0.45rem 0.8rem',
                          borderRadius: '8px',
                        }}
                      >
                        {isPresent ? (
                          <>
                            <CheckCircle2 size={14} />
                            <span>Available on public website & booking modal</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle size={14} />
                            <span>Marked Absent — booking requests routed to available colleagues</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 2: APPOINTMENT BOOKINGS QUEUE */}
        {activeTab === 'appointments' && (
          <section>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    margin: 0,
                    color: '#3B180D',
                  }}
                >
                  Appointments & Patient Bookings Queue
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: '0.25rem 0 0 0' }}>
                  Manage patient consultation requests, assigned specialist doctors, and clinic branch routing.
                </p>
              </div>

              {/* Filters & Search */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {/* Search box */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(94, 38, 20, 0.18)',
                    borderRadius: '12px',
                    padding: '0.45rem 0.85rem',
                  }}
                >
                  <Search size={16} color="#78351D" />
                  <input
                    type="text"
                    placeholder="Search patient or service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.84rem',
                      color: '#3B180D',
                      width: '180px',
                    }}
                  />
                </div>

                {/* Filter by Doctor */}
                <select
                  value={selectedDoctorFilter}
                  onChange={(e) => setSelectedDoctorFilter(e.target.value)}
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(94, 38, 20, 0.18)',
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.84rem',
                    color: '#3B180D',
                    outline: 'none',
                  }}
                >
                  <option value="All">All Specialist Doctors</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>

                {/* Filter by Branch */}
                <select
                  value={selectedBranchFilter}
                  onChange={(e) => setSelectedBranchFilter(e.target.value)}
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(94, 38, 20, 0.18)',
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.84rem',
                    color: '#3B180D',
                    outline: 'none',
                  }}
                >
                  <option value="All">All Branches</option>
                  <option value="Valanchery">Valanchery Main</option>
                  <option value="Edayoor">Edayoor Branch</option>
                </select>
              </div>
            </div>

            {/* Appointments Table Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(94, 38, 20, 0.08)',
                border: '1px solid rgba(94, 38, 20, 0.1)',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr
                      style={{
                        backgroundColor: '#F8F3EA',
                        borderBottom: '1px solid rgba(94, 38, 20, 0.12)',
                        color: '#4A1F10',
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      <th style={{ padding: '0.9rem 1.2rem' }}>Appt ID & Time</th>
                      <th style={{ padding: '0.9rem 1.2rem' }}>Patient Name</th>
                      <th style={{ padding: '0.9rem 1.2rem' }}>Service Requested</th>
                      <th style={{ padding: '0.9rem 1.2rem' }}>Assigned Specialist</th>
                      <th style={{ padding: '0.9rem 1.2rem' }}>Branch & Mode</th>
                      <th style={{ padding: '0.9rem 1.2rem' }}>Status</th>
                      <th style={{ padding: '0.9rem 1.2rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                          No appointments found matching your search filters.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => {
                        const statusColors = {
                          Confirmed: { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
                          Pending: { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' },
                          Completed: { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' },
                          Cancelled: { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' },
                        }[apt.status];

                        return (
                          <tr
                            key={apt.id}
                            style={{
                              borderBottom: '1px solid rgba(94, 38, 20, 0.07)',
                              fontSize: '0.86rem',
                              transition: 'background-color 0.15s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF6F0')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <td style={{ padding: '1rem 1.2rem' }}>
                              <span style={{ fontWeight: 700, color: '#3B180D', display: 'block' }}>
                                {apt.id}
                              </span>
                              <span style={{ fontSize: '0.74rem', color: '#6B7280' }}>
                                {apt.date} • {apt.time}
                              </span>
                            </td>
                            <td style={{ padding: '1rem 1.2rem' }}>
                              <span style={{ fontWeight: 600, color: '#111827', display: 'block' }}>
                                {apt.patientName}
                              </span>
                              <span style={{ fontSize: '0.76rem', color: '#4B5563' }}>
                                📞 {apt.phone}
                              </span>
                            </td>
                            <td style={{ padding: '1rem 1.2rem' }}>
                              <span
                                style={{
                                  backgroundColor: '#F3EEFF',
                                  color: '#6D28D9',
                                  padding: '0.25rem 0.6rem',
                                  borderRadius: '6px',
                                  fontSize: '0.8rem',
                                  fontWeight: 600,
                                }}
                              >
                                {apt.service}
                              </span>
                            </td>
                            <td style={{ padding: '1rem 1.2rem' }}>
                              <span style={{ fontWeight: 600, color: '#111827' }}>
                                {apt.doctorName}
                              </span>
                            </td>
                            <td style={{ padding: '1rem 1.2rem' }}>
                              <span style={{ display: 'block', fontWeight: 500, color: '#374151' }}>
                                {apt.branch}
                              </span>
                              <span style={{ fontSize: '0.74rem', color: '#6B7280' }}>
                                {apt.mode === 'In-person' ? '🏥 In-person Clinic' : '💻 Online Consultation'}
                              </span>
                            </td>
                            <td style={{ padding: '1rem 1.2rem' }}>
                              <span
                                style={{
                                  backgroundColor: statusColors.bg,
                                  color: statusColors.text,
                                  border: `1px solid ${statusColors.border}`,
                                  padding: '0.25rem 0.65rem',
                                  borderRadius: '999px',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  display: 'inline-block',
                                }}
                              >
                                {apt.status}
                              </span>
                            </td>
                            <td style={{ padding: '1rem 1.2rem', textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                {apt.status === 'Pending' && (
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateAppointmentStatus(apt.id, 'Confirmed')}
                                    style={{
                                      padding: '0.35rem 0.75rem',
                                      borderRadius: '8px',
                                      backgroundColor: '#16A34A',
                                      color: '#FFFFFF',
                                      border: 'none',
                                      fontSize: '0.76rem',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Confirm
                                  </button>
                                )}
                                {apt.status === 'Confirmed' && (
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateAppointmentStatus(apt.id, 'Completed')}
                                    style={{
                                      padding: '0.35rem 0.75rem',
                                      borderRadius: '8px',
                                      backgroundColor: '#2563EB',
                                      color: '#FFFFFF',
                                      border: 'none',
                                      fontSize: '0.76rem',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                    }}
                                  >
                                    Done
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateAppointmentStatus(
                                      apt.id,
                                      apt.status === 'Cancelled' ? 'Pending' : 'Cancelled'
                                    )
                                  }
                                  style={{
                                    padding: '0.35rem 0.65rem',
                                    borderRadius: '8px',
                                    backgroundColor: 'transparent',
                                    color: '#6B7280',
                                    border: '1px solid rgba(0,0,0,0.15)',
                                    fontSize: '0.76rem',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {apt.status === 'Cancelled' ? 'Restore' : 'Cancel'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: CLINICAL SERVICES CATALOG */}
        {activeTab === 'services' && (
          <section>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  margin: 0,
                  color: '#3B180D',
                }}
              >
                Clinical Services Catalog (8 Services)
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: '0.25rem 0 0 0' }}>
                5 services featured in First View on the public homepage, and 3 services revealed when patients click "See All".
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {[...initialServices, ...seeAllServices].map((service, index) => {
                const isFirstView = index < 5;

                return (
                  <div
                    key={service.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '18px',
                      padding: '1.25rem',
                      boxShadow: '0 4px 16px rgba(94, 38, 20, 0.06)',
                      border: '1px solid rgba(94, 38, 20, 0.08)',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'flex-start',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        flexShrink: 0,
                        backgroundColor: service.bg || '#F5EDE0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <h4
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            margin: 0,
                            color: '#3B180D',
                          }}
                        >
                          {service.title}
                        </h4>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '999px',
                            backgroundColor: isFirstView ? 'rgba(215, 248, 70, 0.4)' : '#F3EEFF',
                            color: isFirstView ? '#3B180D' : '#6D28D9',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {isFirstView ? 'First View (#1–5)' : 'See All (#6–8)'}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: '0.78rem',
                          color: '#6B7280',
                          lineHeight: 1.45,
                          margin: '0.45rem 0 0 0',
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 4: CLINIC BRANCHES */}
        {activeTab === 'branches' && (
          <section>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  margin: 0,
                  color: '#3B180D',
                }}
              >
                Clinic Branches & Operations
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#6B7280', margin: '0.25rem 0 0 0' }}>
                Operational branches supporting in-person clinical consultations and emergency care.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {/* Valanchery Main */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(94, 38, 20, 0.08)',
                  border: '1px solid rgba(94, 38, 20, 0.08)',
                }}
              >
                <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src="/images/branch_valanchery.jpg"
                    alt="Valanchery Main Clinic"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'var(--color-lime)',
                      color: '#3B180D',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                    }}
                  >
                    Flagship Center
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
                    Valanchery Main Clinic
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: '#6B7280', margin: '0.35rem 0 1rem 0' }}>
                    Perinthalmanna Rd, Near Indian Oil Pump, Kolamangalam, Valanchery, Kerala 676552
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', color: '#374151' }}>
                    <div>📞 Hotline: 094959 64737</div>
                    <div>⏰ Timings: 10:00 AM – 08:30 PM (Mon–Sat)</div>
                    <div>⭐ Google Rating: 5.0★ (39 Verified Reviews)</div>
                  </div>
                </div>
              </div>

              {/* Edayoor Branch */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(94, 38, 20, 0.08)',
                  border: '1px solid rgba(94, 38, 20, 0.08)',
                }}
              >
                <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src="/images/branch_edayoor.jpg"
                    alt="Edayoor Branch"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: '#FFFFFF',
                      color: '#3B180D',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                    }}
                  >
                    Branch Clinic
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
                    Edayoor Branch
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: '#6B7280', margin: '0.35rem 0 1rem 0' }}>
                    Madathil Complex, Mavandiyoor Road, Edayoor North, Malappuram, Kerala
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', color: '#374151' }}>
                    <div>📞 Hotline: 094959 64737</div>
                    <div>⏰ Timings: 10:00 AM – 07:00 PM (Mon–Sat)</div>
                    <div>⭐ Google Rating: 5.0★ Verified Quality Care</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Admin Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(94, 38, 20, 0.1)',
          padding: '1.25rem 1.5rem',
          backgroundColor: '#FFFFFF',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: '#6B7280',
        }}
      >
        <span>Smile Dentos Operations Portal • Secure Clinic Management • © 2026 Smile Dentos Family Dental Care</span>
      </footer>
    </div>
  );
};
