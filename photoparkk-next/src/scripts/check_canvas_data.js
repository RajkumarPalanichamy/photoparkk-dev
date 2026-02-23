
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    const { data, error } = await supabase.from('canvas_customize').select('*').limit(1);
    if (data) {
        console.log("Canvas data:", JSON.stringify(data[0], null, 2));
    } else {
        console.log("Error or no data:", error);
    }
}
check();
