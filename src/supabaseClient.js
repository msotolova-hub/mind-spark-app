import { createClient } from '@supabase/supabase-js'

// Tyto dvě hodnoty jsou určené do prohlížeče (publishable key je veřejný a
// chrání ho pravidla databáze), takže je bezpečné mít je přímo zde.
const SUPABASE_URL = 'https://tlcnoargxczyxjztmhff.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_DigilO3MhTJ_ACq3ZoFN2w_LNRnZ88O'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
