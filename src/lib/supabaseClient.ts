import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://quwooyysobacrdocmzyw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1d29veXlzb2JhY3Jkb2Ntenl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMDU3MTgsImV4cCI6MjA2NzU4MTcxOH0.IwV9i08qu5pyV3AEmItXdnNe87FkVEH3zEy0znCf-CQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);