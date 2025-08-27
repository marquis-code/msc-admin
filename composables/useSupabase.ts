// composables/useSupabase.ts
import { createClient } from "@supabase/supabase-js";

export const useSupabase = () => {
  const config = useRuntimeConfig();

  // Get environment variables with proper fallbacks
  const supabaseUrl =
    config.public.supabaseUrl || process.env.NUXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    config.public.supabaseAnonKey || process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY;

  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables:");
    console.error("NUXT_PUBLIC_SUPABASE_URL:", supabaseUrl);
    console.error(
      "NUXT_PUBLIC_SUPABASE_ANON_KEY:",
      supabaseAnonKey ? "Present" : "Missing"
    );
    throw new Error(
      "Supabase environment variables are not configured properly"
    );
  }

  // Validate URL format
  try {
    new URL(supabaseUrl);
  } catch (error) {
    throw new Error(`Invalid Supabase URL: ${supabaseUrl}`);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  return {
    supabase,
  };
};
