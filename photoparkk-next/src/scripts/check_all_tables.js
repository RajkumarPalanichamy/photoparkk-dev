
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkAll() {
    const tables = ['users', 'new_arrivals', 'special_offers', 'cart_items', 'orders'];
    for (const table of tables) {
        const { error } = await supabase.from(table).select('id').limit(1);
        if (error) console.log(`Table ${table} Error:`, error.code, error.message);
        else console.log(`Table ${table} exists.`);
    }
}
checkAll();
