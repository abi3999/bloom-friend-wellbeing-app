// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ldopuzflkaapthihnqjz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkb3B1emZsa2FhcHRoaWhucWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MTc5OTgsImV4cCI6MjA1OTE5Mzk5OH0.Sf0_v7ks0KvWVJE29R69OojGBZ9yP0h4QpouN5Vremk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);