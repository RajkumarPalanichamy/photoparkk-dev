
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
    const tables = ['acrylic_customize', 'canvas_customize', 'backlight_customize', 'customizer_templates', 'products'];
    let results = "TABLE CHECK RESULTS:\n";
    for (const table of tables) {
        results += `Checking ${table}... `;
        try {
            const { data, error } = await supabase.from(table).select('*').limit(1);
            if (error) {
                results += `ERROR: ${error.code} - ${error.message}\n`;
            } else {
                results += `SUCCESS: Found ${data.length} records\n`;
            }
        } catch (e) {
            results += `EXCEPTION: ${e.message}\n`;
        }
    }
    fs.writeFileSync('table_check_v3.txt', results);
    console.log("Check complete. Results written to table_check_v3.txt");
}
check();
