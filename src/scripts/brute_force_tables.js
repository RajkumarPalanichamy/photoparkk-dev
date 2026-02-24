
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    // Try to guess table names
    const prefixes = ['', 'frame_', 'whatsapp_', 'customizer_', 'product_'];
    const suffixes = ['templates', 'template', 'inventory', 'list'];

    for (const p of prefixes) {
        for (const s of suffixes) {
            const table = p + s;
            const { error } = await supabase.from(table).select('id').limit(1);
            if (!error) {
                console.log(`FOUND TABLE: ${table}`);
                return;
            }
        }
    }
    console.log('No template-like table found.');
}
check();
