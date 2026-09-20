import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  MapPin,
  Phone,
  Search,
  RefreshCw,
  LogOut,
  X,
  AlertCircle,
  UserCheck,
  CheckCircle2,
  Clock4,
  XCircle,
  Stethoscope,
  ExternalLink,
  RotateCcw,
  Building2,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  full_name: string;
  phone: string;
  doctor: string;
  service: string;
  branch: string;
  preferred_date: string;
  preferred_time: string;
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
}

export interface DoctorRecord {
  id: string;
  name: string;
  specialty: string;
  is_present: boolean;
}

export interface ClinicBranch {
  id: string;
  name: string;
  location: string;
  is_active: boolean;
}

const defaultBranches: ClinicBranch[] = [
  {
    id: 'branch-valanchery',
    name: 'Valanchery Main Clinic',
    location: 'Perinthalmanna Rd, Near Indian Oil Pump, Kolamangalam',
    is_active: true,
  },
  {
    id: 'branch-edayoor',
    name: 'Edayoor Branch Clinic',
    location: 'Madathil Complex, Mavandiyoor Road, Edayoor North',
    is_active: true,
  },
];

const defaultDoctors: DoctorRecord[] = [
  { id: 'doc-1', name: 'Dr. ATHIRA.S', specialty: 'Chief Dental Surgeon', is_present: true },
  { id: 'doc-2', name: 'Dr. LIJEESH KADAMBIL', specialty: 'Dental Surgeon', is_present: true },
  { id: 'doc-3', name: 'Dr. BHAGYA.R', specialty: 'Lady Dental Surgeon', is_present: true },
  { id: 'doc-4', name: 'Dr. AYISHA NIZMIYA.K', specialty: 'Consultant Orthodontist', is_present: true },
  { id: 'doc-5', name: 'Dr. SHANAHAS', specialty: 'Consultant Orthodontist', is_present: false },
  { id: 'doc-6', name: 'Dr. JABIR KOTTAMMAL', specialty: 'Oral & Maxillofacial Surgeon', is_present: true },
  { id: 'doc-7', name: 'Dr. MOHAMMED HARIS', specialty: 'Consultant Periodontist', is_present: false },
];

const defaultAppointments: Appointment[] = [
  {
    id: 'APT-101',
    full_name: 'Fathima Zahra',
    phone: '094959 64737',
    doctor: 'Dr. ATHIRA.S',
    service: 'Cosmetic Dentistry',
    branch: 'Valanchery Main Clinic',
    preferred_date: '2026-09-20',
    preferred_time: '10:30 AM',
    status: 'confirmed',
    notes: 'Consultation & smile design evaluation',
    created_at: '2026-09-20T08:00:00Z',
  },
  {
    id: 'APT-102',
    full_name: 'Rahul Menon',
    phone: '098471 23901',
    doctor: 'Dr. AYISHA NIZMIYA.K',
    service: 'Orthodontics',
    branch: 'Valanchery Main Clinic',
    preferred_date: '2026-09-20',
    preferred_time: '11:15 AM',
    status: 'pending',
    notes: 'Teeth alignment consultation',
    created_at: '2026-09-20T08:30:00Z',
  },
  {
    id: 'APT-103',
    full_name: 'Ananya Varma',
    phone: '097452 88123',
    doctor: 'Dr. LIJEESH KADAMBIL',
    service: 'Endodontics',
    branch: 'Edayoor Branch Clinic',
    preferred_date: '2026-09-20',
    preferred_time: '02:00 PM',
    status: 'confirmed',
    notes: 'Single visit root canal review',
    created_at: '2026-09-20T09:00:00Z',
  },
  {
    id: 'APT-104',
    full_name: 'Mohammed Shafi',
    phone: '094473 19022',
    doctor: 'Dr. BHAGYA.R',
    service: 'Dental Implants',
    branch: 'Valanchery Main Clinic',
    preferred_date: '2026-09-20',
    preferred_time: '03:30 PM',
    status: 'confirmed',
    notes: 'Implant post check',
    created_at: '2026-09-20T09:15:00Z',
  },
  {
    id: 'APT-105',
    full_name: 'Aarav Nair',
    phone: '096331 45091',
    doctor: 'Dr. SHANAHAS',
    service: 'Orthodontics',
    branch: 'Valanchery Main Clinic',
    preferred_date: '2026-09-20',
    preferred_time: '04:15 PM',
    status: 'pending',
    notes: 'Aligner checkup',
    created_at: '2026-09-20T09:30:00Z',
  },
  {
    id: 'APT-106',
    full_name: 'Deepa Krishnan',
    phone: '091234 56789',
    doctor: 'Dr. ATHIRA.S',
    service: 'Tooth Whitening',
    branch: 'Edayoor Branch Clinic',
    preferred_date: '2026-09-19',
    preferred_time: '05:00 PM',
    status: 'completed',
    notes: 'Laser bleaching session complete',
    created_at: '2026-09-19T10:00:00Z',
  },
  {
    id: 'APT-107',
    full_name: 'Jasim',
    phone: '08560251733',
    doctor: 'Dr. JABIR KOTTAMMAL',
    service: 'Veneers & Crowns',
    branch: 'Valanchery Main Clinic',
    preferred_date: '2026-09-21',
    preferred_time: 'Morning (10:00 AM - 1:00 PM)',
    status: 'cancelled',
    notes: 'Patient requested rescheduling',
    created_at: '2026-09-20T10:00:00Z',
  },
  {
    id: 'APT-108',
    full_name: 'Aisha Rahman',
    phone: '094958 22114',
    doctor: 'Dr. MUHAMMAD HARIS',
    service: 'Periodontics',
    branch: 'Edayoor Branch Clinic',
    preferred_date: '2026-09-20',
    preferred_time: '11:45 AM',
    status: 'confirmed',
    notes: 'Fluoride protection & pediatric cleaning',
    created_at: '2026-09-20T08:45:00Z',
  },
  {
    id: 'APT-109',
    full_name: 'Karthik Menon',
    phone: '098471 99881',
    doctor: 'Dr. John Smith',
    service: 'Orthodontics',
    branch: 'Valanchery Main Clinic',
    preferred_date: '2026-09-20',
    preferred_time: '01:15 PM',
    status: 'pending',
    notes: 'Clear aligner assessment and scan review',
    created_at: '2026-09-20T09:10:00Z',
  },
  {
    id: 'APT-110',
    full_name: 'Nihal Cherian',
    phone: '097451 33221',
    doctor: 'Dr. David Kim',
    service: 'Endodontics',
    branch: 'Edayoor Branch Clinic',
    preferred_date: '2026-09-18',
    preferred_time: '03:30 PM',
    status: 'completed',
    notes: 'Single-visit molar root canal completed',
    created_at: '2026-09-18T14:20:00Z',
  },
];

const normalizeStoredDoctors = (data: unknown): DoctorRecord[] => {
  if (!Array.isArray(data) || data.length === 0) return defaultDoctors;
  return data.map((doc: Record<string, unknown>, idx: number) => ({
    id: String(doc.id || defaultDoctors[idx]?.id || `doc-${idx}`),
    name: String(doc.name || defaultDoctors[idx]?.name || 'Specialist'),
    specialty: String(doc.specialty || defaultDoctors[idx]?.specialty || 'Dental Specialist'),
    is_present:
      doc.is_present !== undefined
        ? Boolean(doc.is_present)
        : doc.isPresent !== undefined
        ? Boolean(doc.isPresent)
        : true,
  }));
};

const normalizeStoredAppointments = (data: unknown): Appointment[] => {
  if (!Array.isArray(data) || data.length === 0) return defaultAppointments;
  return data.map((item: Record<string, unknown>, idx: number) => {
    const rawStatus = String(item.status || 'pending').toLowerCase();
    const validStatus: AppointmentStatus =
      rawStatus === 'confirmed' || rawStatus === 'completed' || rawStatus === 'cancelled'
        ? (rawStatus as AppointmentStatus)
        : 'pending';

    return {
      id: String(item.id || `APT-${101 + idx}`),
      full_name: String(item.full_name || item.patientName || item.name || 'Patient'),
      phone: String(item.phone || '094959 64737'),
      doctor: String(item.doctor || item.doctorName || 'Dr. Sarah Lee'),
      service: String(item.service || 'General Dental Care'),
      branch: String(item.branch || 'Valanchery Main Clinic'),
      preferred_date: String(item.preferred_date || item.date || '2026-09-20'),
      preferred_time: String(item.preferred_time || item.time || '10:00 AM'),
      status: validStatus,
      notes: String(item.notes || ''),
      created_at: String(item.created_at || new Date().toISOString()),
    };
  });
};

interface AdminPortalProps {
  adminEmail?: string;
  onLogout: () => void;
  onBackToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  adminEmail = 'smiledentos@gmail.com',
  onLogout,
  onBackToSite,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('smile_dentos_admin_appointments');
      if (saved) {
        try {
          return normalizeStoredAppointments(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
    }
    return defaultAppointments;
  });

  const [branches, setBranches] = useState<ClinicBranch[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('smile_dentos_admin_branches');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return defaultBranches;
  });

  const [doctors, setDoctors] = useState<DoctorRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('smile_dentos_admin_doctors');
      if (saved) {
        try {
          return normalizeStoredDoctors(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
    }
    return defaultDoctors;
  });

  const [loading, setLoading] = useState(false);

  // Modals
  const [doctorConfirmModal, setDoctorConfirmModal] = useState<{
    doctor: DoctorRecord;
    targetPresent: boolean;
  } | null>(null);

  const [branchConfirmModal, setBranchConfirmModal] = useState<{
    branch: ClinicBranch;
    targetActive: boolean;
  } | null>(null);

  const [statusConfirmModal, setStatusConfirmModal] = useState<{
    appt: Appointment;
    action: AppointmentStatus;
  } | null>(null);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('smile_dentos_admin_appointments', JSON.stringify(appointments));
    } catch {
      // ignore
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem('smile_dentos_admin_branches', JSON.stringify(branches));
    } catch {
      // ignore
    }
  }, [branches]);

  useEffect(() => {
    try {
      localStorage.setItem('smile_dentos_admin_doctors', JSON.stringify(doctors));
    } catch {
      // ignore
    }
  }, [doctors]);

  // Helper for today's date in YYYY-MM-DD
  const getTodayDateString = (): string => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [branchFilter, setBranchFilter] = useState<string>('all');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');
  const [treatmentFilter, setTreatmentFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>(() => getTodayDateString());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Available treatments list
  const allTreatments = useMemo(() => {
    const defaultList = [
      'Cosmetic Dentistry',
      'Orthodontics',
      'Endodontics',
      'Dental Implants',
      'Pediatric Dentistry',
      'Tooth Whitening',
      'Oral Surgery',
      'Periodontics & Gum Care',
      'Veneers & Crowns',
      'General Dental Care',
    ];
    appointments.forEach((a) => {
      if (a.service && !defaultList.includes(a.service)) {
        defaultList.push(a.service);
      }
    });
    return defaultList;
  }, [appointments]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setBranchFilter('all');
    setDoctorFilter('all');
    setTreatmentFilter('all');
    setDateFilter(getTodayDateString());
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'all' ||
    branchFilter !== 'all' ||
    doctorFilter !== 'all' ||
    treatmentFilter !== 'all' ||
    dateFilter !== getTodayDateString();

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        appt.full_name.toLowerCase().includes(query) ||
        appt.phone.includes(query) ||
        appt.service.toLowerCase().includes(query) ||
        appt.doctor.toLowerCase().includes(query) ||
        (appt.notes && appt.notes.toLowerCase().includes(query));

      const matchesStatus = statusFilter === 'all' || appt.status === statusFilter;
      const matchesBranch = branchFilter === 'all' || appt.branch.toLowerCase().includes(branchFilter.toLowerCase());
      const matchesDoctor = doctorFilter === 'all' || appt.doctor.toLowerCase() === doctorFilter.toLowerCase();
      const matchesTreatment = treatmentFilter === 'all' || appt.service.toLowerCase().includes(treatmentFilter.toLowerCase());
      const matchesDate = !dateFilter || appt.preferred_date === dateFilter;

      return matchesSearch && matchesStatus && matchesBranch && matchesDoctor && matchesTreatment && matchesDate;
    });
  }, [appointments, searchQuery, statusFilter, branchFilter, doctorFilter, treatmentFilter, dateFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const total = appointments.length;
    const pending = appointments.filter((a) => a.status === 'pending').length;
    const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
    const todayStr = getTodayDateString();
    const today = appointments.filter((a) => a.preferred_date === todayStr).length;
    const completed = appointments.filter((a) => a.status === 'completed').length;
    const cancelled = appointments.filter((a) => a.status === 'cancelled').length;
    return { total, pending, confirmed, today, completed, cancelled };
  }, [appointments]);

  // Handlers
  const handleToggleDoctorPresence = (doc: DoctorRecord, targetPresent: boolean) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, is_present: targetPresent } : d))
    );
    setDoctorConfirmModal(null);
  };

  const handleToggleBranch = (branch: ClinicBranch, targetActive: boolean) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === branch.id ? { ...b, is_active: targetActive } : b))
    );
    setBranchConfirmModal(null);
  };

  const handleUpdateStatus = (apptId: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === apptId ? { ...a, status: newStatus } : a))
    );
    setStatusConfirmModal(null);
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #FDE68A',
            }}
          >
            <Clock4 size={12} />
            Pending
          </span>
        );
      case 'confirmed':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: '#E0F2FE',
              color: '#075985',
              border: '1px solid #BAE6FD',
            }}
          >
            <CheckCircle2 size={12} />
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: '#D1FAE5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
            }}
          >
            <UserCheck size={12} />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: '#F1F5F9',
              color: '#475569',
              border: '1px solid #E2E8F0',
            }}
          >
            <XCircle size={12} />
            Cancelled
          </span>
        );
    }
  };

  const getWhatsAppUrl = (appt: Appointment) => {
    const rawNumber = appt.phone.replace(/\D/g, '').replace(/^0+/, '');
    const phone = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber;
    const message = `Hello ${appt.full_name}, this is Smile Dentos Family Dental Clinic regarding your appointment for ${appt.service} on ${appt.preferred_date} (${appt.preferred_time}).`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        color: '#0F172A',
        fontFamily: 'var(--font-main, system-ui, -apple-system, sans-serif)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. TOP ADMIN HEADER */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 clamp(0.45rem, 2vw, 1.25rem)',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.4rem',
          }}
        >
          {/* BRAND */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
            <img
              src="/images/smile_dentos_brand_logo.png"
              alt="Smile Dentos Family Dental Care"
              style={{
                height: '34px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.54rem',
                textTransform: 'uppercase',
                fontWeight: 800,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                padding: '0.2rem 0.42rem',
                borderRadius: '6px',
                backgroundColor: '#E0F2FE',
                color: '#0369A1',
                border: '1px solid #BAE6FD',
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              <span>STAFF</span>
              <span>ADMIN</span>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
            {adminEmail && (
              <span
                style={{
                  fontSize: 'clamp(0.52rem, 1.75vw, 0.68rem)',
                  fontWeight: 600,
                  color: '#475569',
                  backgroundColor: '#F1F5F9',
                  padding: '0.2rem 0.38rem',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.02em',
                }}
                title={adminEmail}
              >
                {adminEmail}
              </span>
            )}

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 300);
              }}
              title="Refresh dataset"
              style={{
                padding: '0.45rem',
                color: '#475569',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              type="button"
              onClick={onBackToSite}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#334155',
                backgroundColor: '#F1F5F9',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E2E8F0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
            >
              <ExternalLink size={13} color="#2563EB" />
              <span>Public Website</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#DC2626',
                backgroundColor: '#FEF2F2',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #FECACA',
                cursor: 'pointer',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEE2E2')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '1.5rem 1.25rem 3rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          flex: 1,
        }}
      >
        {/* CLINIC AVAILABILITY SECTION */}
        <section
          aria-label="Clinic Availability"
          style={{
            backgroundColor: '#FFFFFF',
            padding: '1.25rem',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={17} color="#334155" />
              <h2
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#1E293B',
                  margin: 0,
                }}
              >
                Clinic Availability
              </h2>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
              Active clinics are available for public booking • Inactive clinics are paused
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '0.85rem',
            }}
          >
            {branches.map((b) => (
              <div
                key={b.id}
                style={{
                  position: 'relative',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                {/* Status pill in corner */}
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '999px',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      border: b.is_active ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                      backgroundColor: b.is_active ? '#ECFDF5' : '#F1F5F9',
                      color: b.is_active ? '#047857' : '#64748B',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: b.is_active ? '#10B981' : '#94A3B8',
                      }}
                    />
                    {b.is_active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>

                <div style={{ minWidth: 0, paddingRight: '0.5rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A', margin: '0 0 0.25rem 0' }}>
                    {b.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.74rem', color: '#64748B' }}>
                    <MapPin size={12} color="#94A3B8" style={{ flexShrink: 0 }} />
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {b.location}
                    </span>
                  </div>
                </div>

                <div style={{ paddingTop: '1.25rem', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => setBranchConfirmModal({ branch: b, targetActive: !b.is_active })}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: b.is_active ? '1px solid #E2E8F0' : 'none',
                      backgroundColor: b.is_active ? '#FFFFFF' : '#059669',
                      color: b.is_active ? '#BE123C' : '#FFFFFF',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.15s',
                    }}
                  >
                    {b.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DOCTOR AVAILABILITY SECTION */}
        <section
          aria-label="Doctor Availability"
          style={{
            backgroundColor: '#FFFFFF',
            padding: '1.25rem',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Stethoscope size={17} color="#334155" />
              <h2
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#1E293B',
                  margin: 0,
                }}
              >
                Doctor Availability
              </h2>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
              Present specialists are available for in-person appointments • Absent specialists cannot be booked
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '0.85rem',
            }}
          >
            {doctors.map((doc) => (
              <div
                key={doc.id}
                style={{
                  position: 'relative',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                {/* Status badge in corner */}
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '999px',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      border: doc.is_present ? '1px solid #A7F3D0' : '1px solid #FDE68A',
                      backgroundColor: doc.is_present ? '#ECFDF5' : '#FFFBEB',
                      color: doc.is_present ? '#047857' : '#B45309',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: doc.is_present ? '#10B981' : '#F59E0B',
                      }}
                    />
                    {doc.is_present ? 'PRESENT' : 'ABSENT'}
                  </span>
                </div>

                <div style={{ minWidth: 0, paddingRight: '0.5rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A', margin: '0 0 0.2rem 0' }}>
                    {doc.name}
                  </h3>
                  <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                    {doc.specialty}
                  </div>
                </div>

                <div style={{ paddingTop: '1.25rem', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => setDoctorConfirmModal({ doctor: doc, targetPresent: !doc.is_present })}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '10px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: doc.is_present ? '1px solid #E2E8F0' : 'none',
                      backgroundColor: doc.is_present ? '#FFFFFF' : '#059669',
                      color: doc.is_present ? '#B45309' : '#FFFFFF',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.15s',
                    }}
                  >
                    {doc.is_present ? 'Mark Absent' : 'Mark Present'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* METRICS SUMMARY CARDS */}
        <section
          aria-label="Appointment Metrics"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))',
            gap: '0.85rem',
          }}
        >
          {/* TOTAL */}
          <div
            onClick={() => handleResetFilters()}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '1rem',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>
              Total Inquiries
            </span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0F172A' }}>
              {metrics.total}
            </span>
          </div>

          {/* PENDING */}
          <div
            onClick={() => setStatusFilter('pending')}
            style={{
              backgroundColor: '#FFFDF5',
              padding: '1rem',
              borderRadius: '14px',
              border: statusFilter === 'pending' ? '2px solid #F59E0B' : '1.5px solid #FDE68A',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#B45309', display: 'block', marginBottom: '0.25rem' }}>
              Pending
            </span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#92400E' }}>
              {metrics.pending}
            </span>
          </div>

          {/* CONFIRMED */}
          <div
            onClick={() => setStatusFilter('confirmed')}
            style={{
              backgroundColor: '#F0F9FF',
              padding: '1rem',
              borderRadius: '14px',
              border: statusFilter === 'confirmed' ? '2px solid #0284C7' : '1.5px solid #BAE6FD',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0369A1', display: 'block', marginBottom: '0.25rem' }}>
              Confirmed
            </span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#075985' }}>
              {metrics.confirmed}
            </span>
          </div>

          {/* TODAY'S DATE */}
          <div
            onClick={() => setDateFilter(getTodayDateString())}
            style={{
              backgroundColor: '#FAF5FF',
              padding: '1rem',
              borderRadius: '14px',
              border: dateFilter === getTodayDateString() ? '2px solid #7C3AED' : '1.5px solid #DDD6FE',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7C3AED', display: 'block', marginBottom: '0.25rem' }}>
              Today's Date
            </span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#6D28D9' }}>
              {metrics.today}
            </span>
          </div>

          {/* COMPLETED */}
          <div
            onClick={() => setStatusFilter('completed')}
            style={{
              backgroundColor: '#F0FDF4',
              padding: '1rem',
              borderRadius: '14px',
              border: statusFilter === 'completed' ? '2px solid #059669' : '1.5px solid #BBF7D0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#047857', display: 'block', marginBottom: '0.25rem' }}>
              Completed
            </span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#065F46' }}>
              {metrics.completed}
            </span>
          </div>

          {/* CANCELLED */}
          <div
            onClick={() => setStatusFilter('cancelled')}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '1rem',
              borderRadius: '14px',
              border: statusFilter === 'cancelled' ? '2px solid #64748B' : '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>
              Cancelled
            </span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#475569' }}>
              {metrics.cancelled}
            </span>
          </div>
        </section>

        {/* SEARCH & FILTERS BAR */}
        <section
          aria-label="Filters and Search"
          style={{
            backgroundColor: '#FFFFFF',
            padding: '1.25rem',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {/* SEARCH INPUT */}
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: '0 auto 0 0',
                  paddingLeft: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  color: '#94A3B8',
                }}
              >
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by patient name, phone, or service..."
                style={{
                  width: '100%',
                  padding: '0.55rem 1rem 0.55rem 2.4rem',
                  fontSize: '0.84rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  color: '#0F172A',
                  outline: 'none',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* RESET BUTTON */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#475569',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={13} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* CONTROLS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0.75rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid #F1F5F9',
            }}
          >
            {/* STATUS FILTER */}
            <div>
              <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', marginBottom: '0.25rem' }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.45rem 0.65rem',
                  fontSize: '0.8rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  color: '#0F172A',
                  fontWeight: 600,
                  outline: 'none',
                }}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* BRANCH FILTER */}
            <div>
              <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', marginBottom: '0.25rem' }}>
                Branch
              </label>
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.45rem 0.65rem',
                  fontSize: '0.8rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  color: '#0F172A',
                  fontWeight: 600,
                  outline: 'none',
                }}
              >
                <option value="all">All Branches</option>
                <option value="Valanchery">Valanchery Main Clinic</option>
                <option value="Edayoor">Edayoor Branch</option>
              </select>
            </div>

            {/* DOCTOR FILTER */}
            <div>
              <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', marginBottom: '0.25rem' }}>
                Doctor Specialist
              </label>
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.45rem 0.65rem',
                  fontSize: '0.8rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  color: '#0F172A',
                  fontWeight: 600,
                  outline: 'none',
                }}
              >
                <option value="all">All Doctors</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TREATMENT FILTER */}
            <div>
              <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', marginBottom: '0.25rem' }}>
                Treatment
              </label>
              <select
                value={treatmentFilter}
                onChange={(e) => setTreatmentFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.45rem 0.65rem',
                  fontSize: '0.8rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  color: '#0F172A',
                  fontWeight: 600,
                  outline: 'none',
                }}
              >
                <option value="all">All Treatments</option>
                {allTreatments.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* DATE FILTER */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <label style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748B' }}>
                  Date
                </label>
                <button
                  type="button"
                  onClick={() => setDateFilter((prev) => (prev ? '' : getTodayDateString()))}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: !dateFilter ? '#2563EB' : '#64748B',
                    cursor: 'pointer',
                  }}
                  title={dateFilter ? 'Click to show all dates' : 'Click to filter by today'}
                >
                  {!dateFilter ? 'All Dates ✓' : 'All Dates'}
                </button>
              </div>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.42rem 0.65rem',
                  fontSize: '0.8rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  color: '#0F172A',
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </section>

        {/* SHOWING COUNT INDICATOR */}
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#64748B',
            marginBottom: '0.65rem',
            paddingLeft: '0.25rem',
          }}
        >
          SHOWING {filteredAppointments.length} OF {appointments.length} APPOINTMENTS (NEWEST FIRST)
        </div>

        {/* APPOINTMENTS TABLE */}
        <section
          aria-label="Appointments Queue"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569' }}>
                    PATIENT
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569' }}>
                    BRANCH
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569' }}>
                    TREATMENT
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569' }}>
                    DOCTOR
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569' }}>
                    DATE &amp; TIME
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569' }}>
                    STATUS
                  </th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', textAlign: 'right' }}>
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '3.5rem 1rem', textAlign: 'center', color: '#64748B' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                        No appointments found matching current filters
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1rem' }}>
                        {dateFilter ? `No bookings found for ${dateFilter}` : 'Try resetting or adjusting the search and filters'}
                      </div>
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.45rem 0.95rem',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#334155',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        <RotateCcw size={13} />
                        <span>Reset Filters</span>
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
                    <tr
                      key={appt.id}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background-color 0.1s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                    >
                      {/* PATIENT */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.88rem' }}>{appt.full_name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                          <a
                            href={`tel:${appt.phone.replace(/\D/g, '')}`}
                            style={{
                              fontSize: '0.75rem',
                              color: '#64748B',
                              textDecoration: 'none',
                              fontWeight: 500,
                            }}
                          >
                            {appt.phone}
                          </a>
                          <a
                            href={getWhatsAppUrl(appt)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '18px',
                              height: '18px',
                              borderRadius: '4px',
                              backgroundColor: '#ECFDF5',
                              color: '#059669',
                              textDecoration: 'none',
                            }}
                          >
                            <MessageCircle size={11} />
                          </a>
                        </div>
                      </td>

                      {/* BRANCH */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#334155', fontWeight: 500 }}>
                          <MapPin size={13} color="#94A3B8" style={{ flexShrink: 0 }} />
                          <span>{appt.branch}</span>
                        </div>
                      </td>

                      {/* TREATMENT */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.84rem' }}>{appt.service}</div>
                      </td>

                      {/* DOCTOR */}
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 500, color: '#334155', fontSize: '0.82rem' }}>
                        {appt.doctor}
                      </td>

                      {/* DATE & TIME */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.82rem' }}>{appt.preferred_date}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.74rem', color: '#64748B', marginTop: '0.15rem' }}>
                          <Clock size={12} color="#94A3B8" />
                          <span>{appt.preferred_time}</span>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        {getStatusBadge(appt.status)}
                      </td>

                      {/* ACTIONS */}
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedAppointment(appt)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.38rem 0.75rem',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #CBD5E1',
                              color: '#334155',
                              borderRadius: '8px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#F8FAFC';
                              e.currentTarget.style.borderColor = '#94A3B8';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFFFFF';
                              e.currentTarget.style.borderColor = '#CBD5E1';
                            }}
                          >
                            <span>Details</span>
                            <ChevronRight size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* APPOINTMENT DETAILS MODAL */}
      {selectedAppointment && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 110,
            padding: '1rem',
          }}
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.75rem',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Appointment Details
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0.15rem 0 0 0' }}>
                  {selectedAppointment.full_name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                  Contact
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>
                  <Phone size={13} color="#059669" />
                  <a href={`tel:${selectedAppointment.phone.replace(/\D/g, '')}`} style={{ color: '#0F172A', textDecoration: 'none' }}>
                    {selectedAppointment.phone}
                  </a>
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                  Status
                </span>
                <div>{getStatusBadge(selectedAppointment.status)}</div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                  Treatment
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>
                  {selectedAppointment.service}
                </span>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                  Specialist Doctor
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>
                  {selectedAppointment.doctor}
                </span>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                  Branch Clinic
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                  <MapPin size={13} color="#94A3B8" />
                  <span>{selectedAppointment.branch}</span>
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                  Scheduled Date & Time
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                  <Clock size={13} color="#94A3B8" />
                  <span>{selectedAppointment.preferred_date} • {selectedAppointment.preferred_time}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedAppointment.notes && (
              <div style={{ backgroundColor: '#FFFDF5', border: '1px solid #FEF3C7', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#B45309', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                  Patient Consultation Notes
                </span>
                <p style={{ fontSize: '0.82rem', color: '#92400E', margin: 0, lineHeight: 1.4 }}>
                  {selectedAppointment.notes}
                </p>
              </div>
            )}

            {/* Status Change Buttons */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Update Appointment Status:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(selectedAppointment.id, 'confirmed');
                    setSelectedAppointment((prev) => prev ? { ...prev, status: 'confirmed' } : null);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.55rem',
                    borderRadius: '8px',
                    border: '1px solid #BAE6FD',
                    backgroundColor: selectedAppointment.status === 'confirmed' ? '#0284C7' : '#E0F2FE',
                    color: selectedAppointment.status === 'confirmed' ? '#FFFFFF' : '#0369A1',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  ✓ Confirm
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(selectedAppointment.id, 'completed');
                    setSelectedAppointment((prev) => prev ? { ...prev, status: 'completed' } : null);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.55rem',
                    borderRadius: '8px',
                    border: '1px solid #A7F3D0',
                    backgroundColor: selectedAppointment.status === 'completed' ? '#059669' : '#ECFDF5',
                    color: selectedAppointment.status === 'completed' ? '#FFFFFF' : '#047857',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  ✓ Complete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(selectedAppointment.id, 'cancelled');
                    setSelectedAppointment((prev) => prev ? { ...prev, status: 'cancelled' } : null);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.55rem',
                    borderRadius: '8px',
                    border: '1px solid #FECDD3',
                    backgroundColor: selectedAppointment.status === 'cancelled' ? '#E11D48' : '#FFF1F2',
                    color: selectedAppointment.status === 'cancelled' ? '#FFFFFF' : '#BE123C',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOCTOR CONFIRMATION DIALOG */}
      {doctorConfirmModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
          onClick={() => setDoctorConfirmModal(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.75rem',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: doctorConfirmModal.targetPresent ? '#ECFDF5' : '#FFFBEB',
                color: doctorConfirmModal.targetPresent ? '#047857' : '#B45309',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
              }}
            >
              <AlertCircle size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem 0' }}>
              {doctorConfirmModal.targetPresent ? 'Mark Doctor Present?' : 'Mark Doctor Absent?'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
              Are you sure you want to update availability for{' '}
              <strong>{doctorConfirmModal.doctor.name}</strong> to{' '}
              <strong style={{ color: doctorConfirmModal.targetPresent ? '#047857' : '#B45309' }}>
                {doctorConfirmModal.targetPresent ? 'PRESENT' : 'ABSENT'}
              </strong>
              ?
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setDoctorConfirmModal(null)}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  color: '#475569',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleToggleDoctorPresence(doctorConfirmModal.doctor, doctorConfirmModal.targetPresent)}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: doctorConfirmModal.targetPresent ? '#059669' : '#D97706',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLINIC BRANCH CONFIRMATION DIALOG */}
      {branchConfirmModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
          onClick={() => setBranchConfirmModal(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.75rem',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: branchConfirmModal.targetActive ? '#ECFDF5' : '#FEF2F2',
                color: branchConfirmModal.targetActive ? '#047857' : '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
              }}
            >
              <Building2 size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem 0' }}>
              {branchConfirmModal.targetActive ? 'Activate Clinic?' : 'Deactivate Clinic?'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
              Are you sure you want to {branchConfirmModal.targetActive ? 'activate' : 'deactivate'}{' '}
              <strong>{branchConfirmModal.branch.name}</strong> for clinic bookings?
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setBranchConfirmModal(null)}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  color: '#475569',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleToggleBranch(branchConfirmModal.branch, branchConfirmModal.targetActive)}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: branchConfirmModal.targetActive ? '#059669' : '#DC2626',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPOINTMENT STATUS CONFIRMATION DIALOG */}
      {statusConfirmModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
          onClick={() => setStatusConfirmModal(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.75rem',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem 0', textTransform: 'capitalize' }}>
              Mark as {statusConfirmModal.action}?
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
              Update appointment <strong>{statusConfirmModal.appt.id}</strong> for{' '}
              <strong>{statusConfirmModal.appt.full_name}</strong> to{' '}
              <strong style={{ textTransform: 'uppercase' }}>{statusConfirmModal.action}</strong>?
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setStatusConfirmModal(null)}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  color: '#475569',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus(statusConfirmModal.appt.id, statusConfirmModal.action)}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: '#0F172A',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        style={{
          borderTop: '1px solid #E2E8F0',
          padding: '1.25rem 1.5rem',
          backgroundColor: '#FFFFFF',
          textAlign: 'center',
          fontSize: '0.74rem',
          color: '#64748B',
        }}
      >
        © {new Date().getFullYear()} Smile Dentos Family Dental Clinic • Staff Operations Portal
      </footer>
    </div>
  );
};
