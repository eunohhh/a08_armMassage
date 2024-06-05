import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_PROJECT_URL || !SUPABASE_ANON_KEY) {
    throw new Error('수파베이스 키 확인해라');
}

// 수파베이스에 접속
const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export default supabase;
