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

/**
 * Fetch all branch records directly from Supabase public.branches.
 * Does not filter out inactive branches, returning the actual database state for each.
 */
export async function getBranches(): Promise<DbBranch[]> {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('[Supabase] Client not configured. Returning empty branch array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('[Supabase] Error fetching branches:', error.message);
      return [];
    }

    return (data as DbBranch[]) || [];
  } catch (err) {
    console.error('[Supabase] Exception fetching branches:', err);
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
      console.error('[Supabase] Error updating branch availability:', error.message);
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      console.warn('[Supabase] Update affected 0 rows. Check RLS policies on public.branches.');
      return {
        success: false,
        error: 'Database update affected 0 rows. Please verify Row-Level Security update policies on public.branches.',
      };
    }

    return { success: true, data: data[0] as DbBranch };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update branch availability.';
    console.error('[Supabase] Exception updating branch availability:', message);
    return { success: false, error: message };
  }
}

/**
 * Fetch all doctor records directly from Supabase public.doctors.
 */
export async function getDoctors(): Promise<DbDoctor[]> {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('[Supabase] Client not configured. Returning empty doctor array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('[Supabase] Error fetching doctors:', error.message);
      return [];
    }

    return (data as DbDoctor[]) || [];
  } catch (err) {
    console.error('[Supabase] Exception fetching doctors:', err);
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
      console.error('[Supabase] Error updating doctor availability:', error.message);
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      console.warn('[Supabase] Update affected 0 rows. Check RLS policies on public.doctors.');
      return {
        success: false,
        error: 'Database update affected 0 rows. Please verify Row-Level Security update policies on public.doctors.',
      };
    }

    return { success: true, data: data[0] as DbDoctor };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update doctor availability.';
    console.error('[Supabase] Exception updating doctor availability:', message);
    return { success: false, error: message };
  }
}

/**
 * Create a new appointment in public.appointments
 */
export async function createAppointment(
  input: AppointmentInput
): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!input.patient_name || !input.patient_name.trim()) {
    return { success: false, error: 'Patient name is required.' };
  }
  if (!input.phone || !input.phone.trim()) {
    return { success: false, error: 'Phone number is required.' };
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

  const appointmentId =
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined;

  if (!isSupabaseConfigured() || !supabase) {
    return { success: true, id: appointmentId };
  }

  try {
    const payload: Record<string, unknown> = {
      patient_name: input.patient_name.trim(),
      phone: input.phone.trim(),
      service_id: input.service_id,
      branch_id: input.branch_id,
      preferred_date: input.preferred_date,
      preferred_time: input.preferred_time || '10:00 AM',
      message: input.message || 'Booked via Website',
      status: 'pending',
    };

    if (appointmentId) {
      payload.id = appointmentId;
    }

    const { error } = await supabase.from('appointments').insert([payload]);

    if (error) {
      console.error('[Supabase] Appointment insert error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, id: appointmentId };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Connection error while saving appointment.';
    return { success: false, error: message };
  }
}
