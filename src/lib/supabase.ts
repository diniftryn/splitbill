import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dmrlrlwwjyenutjzwnin.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtcmxybHd3anllbnV0anp3bmluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NzQ2NzcsImV4cCI6MjAyNDI1MDY3N30.F1XDNIBmb9xRFenxS-mIXWThCfK0I62fBtwN9HwkCpo";
// process.env.REACT_NATIVE_SUPABASE_URL!;
// process.env.REACT_NATIVE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
