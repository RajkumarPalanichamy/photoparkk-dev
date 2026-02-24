
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkOneByOne() {
    const tables = ['users', 'new_arrivals', 'special_offers', 'cart_items', 'orders'];
    for (const table of tables) {
        try {
            const { error } = await supabase.from(table).select('count', { count: 'exact', head: true });
            if (error) {
                console.log(`- ${table}: MISSING (${error.code})`);
            } else {
                console.log(`- ${table}: EXISTS`);
            }
        } catch (e) {
            console.log(`- ${table}: ERROR`);
        }
    }
}
checkOneByOne();
