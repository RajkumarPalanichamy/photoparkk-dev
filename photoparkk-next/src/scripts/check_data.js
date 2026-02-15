
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkData() {
    const { data: na } = await supabase.from('new_arrivals').select('*').limit(5);
    console.log('New Arrivals Count:', na?.length || 0);
    const { data: u } = await supabase.from('users').select('email').limit(5);
    console.log('Users Count:', u?.length || 0);
}
checkData();
