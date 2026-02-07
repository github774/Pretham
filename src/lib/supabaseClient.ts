import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iimhscvyydswcfpywtxl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpbWhzY3Z5eWRzd2NmcHl3dHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODYzMjAsImV4cCI6MjA4NjA2MjMyMH0.YKGP3o7sA1wazCe-Jfp97mmJnaWl8gYsJAepTUF90vc";
const supabaseServiceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpbWhzY3Z5eWRzd2NmcHl3dHhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ4NjMyMCwiZXhwIjoyMDg2MDYyMzIwfQ.HdiKWqwy0Hs70tT0UDCRFf02bg3TBA6JqRyFEqm8eUg";

// Use anon key by default, but you can switch to service role if needed
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseService = createClient(supabaseUrl, supabaseServiceRoleKey);
