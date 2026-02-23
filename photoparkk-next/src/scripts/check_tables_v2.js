
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    const tables = ['acrylic_customize', 'canvas_customize', 'backlight_customize', 'customizer_templates', 'products'];
    for (const table of tables) {
        process.stdout.write(`Checking ${table}... `);
        try {
            const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
            if (error) {
                console.log(`ERROR: ${error.code} - ${error.message}`);
            } else {
                console.log(`SUCCESS: Found ${count} records`);
            }
        } catch (e) {
            console.log(`EXCEPTION: ${e.message}`);
        }
    }
}
check();
