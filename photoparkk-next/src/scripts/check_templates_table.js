
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    console.log('--- START CHECK ---');
    const table = 'customizer_templates';
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
        console.log(`TABLE:${table}:ERROR:${error.code}:${error.message}`);
    } else {
        console.log(`TABLE:${table}:SUCCESS`);
    }
    console.log('--- END CHECK ---');
}
check();
