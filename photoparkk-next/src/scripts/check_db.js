
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    const { data, error } = await supabase.from('new_arrivals').select('count', { count: 'exact', head: true });
    if (error) {
        console.log('Error:', error.code, error.message);
    } else {
        console.log('Success: Table exists. Count:', data);
    }
}
check();
