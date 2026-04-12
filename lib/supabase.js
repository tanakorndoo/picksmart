import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get current auth session
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/**
 * Get current user
 */
export async function getAuthUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

/**
 * Sign in with Email OTP (magic link / OTP code)
 */
export async function signInWithEmail(email) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: window.location.origin,
    },
  });
  return { data, error };
}

/**
 * Verify OTP code
 */
export async function verifyOtp(email, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  return { data, error };
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Fetch user profile from DB
 */
export async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
}

/**
 * Update user profile in DB
 */
export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from("user_profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();
  return { data, error };
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}
