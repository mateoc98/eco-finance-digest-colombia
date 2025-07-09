import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://quwooyysobacrdocmzyw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1d29veXlzb2JhY3Jkb2Ntenl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNzQ1NjIsImV4cCI6MjA1MTk1MDU2Mn0.2qU6wIGI1rHa7v-1HJUjQ8Y3oZjP7zGPaolkhBDp5lc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);