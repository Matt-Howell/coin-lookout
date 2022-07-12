import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lpjqnxaqhpdhjjudxxcv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwanFueGFxaHBkaGpqdWR4eGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTczODcyMDUsImV4cCI6MTk3Mjk2MzIwNX0.qnEs8ruCwZ7DmJIHD8wK2oG_M1c9YD9QXNUqFTUpxTg'

export const supabase = createClient(supabaseUrl, supabaseKey)