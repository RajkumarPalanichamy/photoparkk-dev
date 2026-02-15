
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testInsert() {
    const { data, error } = await supabase.from('new_arrivals').insert({
        title: 'Test',
        content: 'Test',
        thickness: '3mm',
        sizes: []
    });
    if (error) {
        console.log('Error Code:', error.code);
        console.log('Error Message:', error.message);
        console.log('Error Details:', error.details);
        console.log('Error Hint:', error.hint);
    } else {
        console.log('Insert Success!');
    }
}
testInsert();
