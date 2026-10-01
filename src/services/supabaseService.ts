import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface DbBranch {
  id: string;
  name: string;
  address?: string | null;
  phone?: string | null;
  emergency_phone?: string | null;
  opening_hours?: string | null;
  image_url?: string | null;
  maps_url?: string | null;
  display_order?: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbDoctor {
  id: string;
  name: string;
  qualification?: string | null;
  specialty?: string | null;
  bio?: string | null;
  image_url?: string | null;
  display_order?: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AppointmentInput {
  patient_name: string;
  phone: string;
  service_id: string;
  branch_id: string;
  preferred_date: string;
  preferred_time?: string;
  message?: string;
}

const logDevError = (...args: unknown[]) => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
    console.error(...args);
  }
};

const logDevWarn = (...args: unknown[]) => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
    console.warn(...args);
  }
};

/**
 * Fetch all branch records directly from Supabase public.branches.
 * Does not filter out inactive branches, returning the actual database state for each.
 */
export async function getBranches(): Promise<DbBranch[]> {
  if (!isSupabaseConfigured() || !supabase) {
    logDevWarn('[Supabase] Client not configured. Returning empty branch array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      logDevError('[Supabase] Error fetching branches:', error.message);
      return [];
    }

    return (data as DbBranch[]) || [];
  } catch (err) {
    logDevError('[Supabase] Exception fetching branches:', err);
    return [];
  }
}

/**
 * Update branch availability (is_active) in Supabase public.branches.
 * Confirms with .select() that the database record was actually modified.
 */
export async function updateBranchAvailability(
  branchId: string,
  isActive: boolean
): Promise<{ success: boolean; data?: DbBranch; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, error: 'Database service is not configured.' };
  }

  try {
    const { data, error } = await supabase
      .from('branches')
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', branchId)
      .select();

    if (error) {
      logDevError('[Supabase] Error updating branch availability:', error.message);
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      logDevWarn('[Supabase] Update affected 0 rows. Check RLS policies on public.branches.');
      return {
        success: false,
        error: 'Database update affected 0 rows. Please verify Row-Level Security update policies on public.branches.',
      };
    }

    return { success: true, data: data[0] as DbBranch };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update branch availability.';
    logDevError('[Supabase] Exception updating branch availability:', message);
    return { success: false, error: message };
  }
}

/**
 * Fetch all doctor records directly from Supabase public.doctors.
 */
export async function getDoctors(): Promise<DbDoctor[]> {
  if (!isSupabaseConfigured() || !supabase) {
    logDevWarn('[Supabase] Client not configured. Returning empty doctor array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      logDevError('[Supabase] Error fetching doctors:', error.message);
      return [];
    }

    return (data as DbDoctor[]) || [];
  } catch (err) {
    logDevError('[Supabase] Exception fetching doctors:', err);
    return [];
  }
}

/**
 * Update doctor availability (is_active) in Supabase public.doctors.
 * Confirms with .select() that the database record was actually modified.
 */
export async function updateDoctorAvailability(
  doctorId: string,
  isActive: boolean
): Promise<{ success: boolean; data?: DbDoctor; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, error: 'Database service is not configured.' };
  }

  try {
    const { data, error } = await supabase
      .from('doctors')
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', doctorId)
      .select();

    if (error) {
      logDevError('[Supabase] Error updating doctor availability:', error.message);
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      logDevWarn('[Supabase] Update affected 0 rows. Check RLS policies on public.doctors.');
      return {
        success: false,
        error: 'Database update affected 0 rows. Please verify Row-Level Security update policies on public.doctors.',
      };
    }

    return { success: true, data: data[0] as DbDoctor };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update doctor availability.';
    logDevError('[Supabase] Exception updating doctor availability:', message);
    return { success: false, error: message };
  }
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const BRANCH_UUID_MAP: Record<string, string> = {
  valanchery: '0a19849f-aac8-477e-b951-d7c1e0d55a46',
  edayoor: 'e0e38ad6-dafd-4049-9aa2-4b49c55208bb',
};

const SERVICE_UUID_MAP: Record<string, string> = {
  imaging: 'a68a1e39-237f-4d68-8d89-b1a3a0f2b8e5',
  digital: 'a68a1e39-237f-4d68-8d89-b1a3a0f2b8e5',
  cosmetic: '1543d01a-3bf9-4c3f-a9d7-751e24b6e841',
  endodontics: 'b426c972-e6b1-4906-989a-944bf3bd36ba',
  root: 'b426c972-e6b1-4906-989a-944bf3bd36ba',
  pediatric: '956997f4-660b-4297-a1b9-3937776ca6e4',
  kids: '956997f4-660b-4297-a1b9-3937776ca6e4',
  orthodontics: 'd6e307ee-324e-43dc-90ed-6de884afcde1',
  braces: 'd6e307ee-324e-43dc-90ed-6de884afcde1',
  whitening: 'db7f3c0d-10cd-4642-9ea9-042a04792562',
  teeth: 'db7f3c0d-10cd-4642-9ea9-042a04792562',
  tooth: 'db7f3c0d-10cd-4642-9ea9-042a04792562',
  surgery: 'ef9bede4-24eb-4923-abd1-5b503bb19b82',
  minor: 'ef9bede4-24eb-4923-abd1-5b503bb19b82',
  implants: '52f24c3f-51ed-40e5-bdd9-742c4b5bc948',
  aligner: 'ba7948eb-69ec-453b-81b4-1a769b4031f4',
  examination: 'a68a1e39-237f-4d68-8d89-b1a3a0f2b8e5',
};

function resolveBranchUuid(raw: string): string {
  if (UUID_REGEX.test(raw)) return raw;
  const lower = raw.toLowerCase();
  if (lower.includes('edayoor')) return BRANCH_UUID_MAP.edayoor;
  return BRANCH_UUID_MAP.valanchery;
}

function resolveServiceUuid(raw: string): string {
  if (UUID_REGEX.test(raw)) return raw;
  const lower = raw.toLowerCase();
  for (const [key, uuid] of Object.entries(SERVICE_UUID_MAP)) {
    if (lower.includes(key)) return uuid;
  }
  return '1543d01a-3bf9-4c3f-a9d7-751e24b6e841'; // Fallback to Cosmetic Dentistry
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface AdminAppointmentView {
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

/**
 * Create a new appointment in public.appointments
 */
export async function createAppointment(
  input: AppointmentInput
): Promise<{ success: boolean; id?: string; error?: string }> {
  const trimmedName = input.patient_name ? input.patient_name.trim() : '';
  if (!trimmedName) {
    return { success: false, error: 'Patient name is required.' };
  }
  if (trimmedName.length > 60) {
    return { success: false, error: 'Patient name must not exceed 60 characters.' };
  }

  const trimmedPhone = input.phone ? input.phone.trim() : '';
  const phoneDigits = trimmedPhone.replace(/\D/g, '');
  if (!trimmedPhone) {
    return { success: false, error: 'Phone number is required.' };
  }
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    return { success: false, error: 'Please provide a valid 10-digit phone number.' };
  }

  if (input.message && input.message.length > 500) {
    return { success: false, error: 'Message must not exceed 500 characters.' };
  }

  if (!input.service_id) {
    return { success: false, error: 'Please select a service.' };
  }
  if (!input.branch_id) {
    return { success: false, error: 'Please select a branch.' };
  }
  if (!input.preferred_date) {
    return { success: false, error: 'Preferred date is required.' };
  }

  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: 'Appointment system is currently not connected to the database. Please contact the clinic directly.',
    };
  }

  const appointmentId =
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined;

  try {
    const branchUuid = resolveBranchUuid(input.branch_id);
    const serviceUuid = resolveServiceUuid(input.service_id);

    const payload: Record<string, unknown> = {
      patient_name: trimmedName,
      phone: trimmedPhone,
      service_id: serviceUuid,
      branch_id: branchUuid,
      preferred_date: input.preferred_date,
      preferred_time: input.preferred_time || '10:00 AM',
      message: input.message ? input.message.slice(0, 500) : 'Direct website booking',
      status: 'pending',
    };

    if (appointmentId) {
      payload.id = appointmentId;
    }

    const { error } = await supabase.from('appointments').insert([payload]);

    if (error) {
      logDevError('[Supabase] Appointment insert error:', error.message);
      return {
        success: false,
        error: 'Unable to schedule appointment at this time. Please try again or call 094959 64737.',
      };
    }

    return { success: true, id: appointmentId };
  } catch (err: unknown) {
    logDevError('[Supabase] Exception saving appointment:', err);
    return {
      success: false,
      error: 'Connection error while saving appointment. Please verify your connection or call the clinic.',
    };
  }
}

/**
 * Fetch all appointments from Supabase public.appointments for the Admin Portal.
 * Joins related branches and services for human-readable display.
 */
export async function getAdminAppointments(): Promise<AdminAppointmentView[]> {
  if (!isSupabaseConfigured() || !supabase) {
    logDevWarn('[Supabase] Client not configured. Cannot fetch appointments.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('id, patient_name, phone, branch_id, service_id, preferred_date, preferred_time, message, status, created_at, updated_at, branches(name), services(name)')
      .order('created_at', { ascending: false });

    if (error) {
      logDevError('[Supabase] Error fetching appointments:', error.message);
      return [];
    }

    if (!data) return [];

    return data.map((item) => {
      let doctor = 'Consultant Specialist';
      const msg = item.message || '';
      const docMatch = msg.match(/Doctor:\s*([^|]+)/i);
      if (docMatch && docMatch[1]) {
        doctor = docMatch[1].trim();
      }

      const branchName =
        (item.branches as { name?: string } | null)?.name ||
        (item.branch_id === 'e0e38ad6-dafd-4049-9aa2-4b49c55208bb'
          ? 'Edayoor Branch'
          : 'Valanchery Main Clinic');

      const serviceName =
        (item.services as { name?: string } | null)?.name || 'General Consultation';

      return {
        id: item.id,
        full_name: item.patient_name || 'Valued Patient',
        phone: item.phone || '',
        doctor,
        service: serviceName,
        branch: branchName,
        preferred_date: item.preferred_date || '',
        preferred_time: item.preferred_time || '10:00 AM',
        status: (item.status as AppointmentStatus) || 'pending',
        notes: item.message || '',
        created_at: item.created_at || new Date().toISOString(),
      };
    });
  } catch (err: unknown) {
    logDevError('[Supabase] Exception fetching admin appointments:', err);
    return [];
  }
}

/**
 * Update appointment status in Supabase public.appointments
 */
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, error: 'Database service is not configured.' };
  }

  try {
    const { data, error } = await supabase
      .from('appointments')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      logDevError('[Supabase] Error updating appointment status:', error.message);
      return { success: false, error: 'Database error updating appointment status.' };
    }

    if (!data || data.length === 0) {
      logDevWarn('[Supabase] Update affected 0 rows. Check RLS policies on public.appointments.');
      return {
        success: false,
        error: 'Database update affected 0 rows. Verify update permissions for authenticated admin.',
      };
    }

    return { success: true };
  } catch (err: unknown) {
    logDevError('[Supabase] Exception updating appointment status:', err);
    return { success: false, error: 'Connection error updating appointment status.' };
  }
}

