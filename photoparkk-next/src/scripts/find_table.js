
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    const tables = ['customizer_templates', 'frame_templates', 'whatsapp_templates', 'templates', 'customizer', 'frames'];
    for (const table of tables) {
        try {
            const { data, error } = await supabase.from(table).select('*').limit(1);
            if (error) {
                console.log(`RESULT:${table}:ERROR:${error.code}:${error.message}`);
            } else {
                console.log(`RESULT:${table}:SUCCESS`);
            }
        } catch (e) {
            console.log(`RESULT:${table}:EXCEPTION:${e.message}`);
        }
    }
}
check();
