
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    const typesToTry = ["Acrylic", "Acrylic Frame", "custom", "Customized", "AcrylicCustomized", "Acrylic Print"];

    for (const type of typesToTry) {
        console.log(`Trying product_type: '${type}'`);
        const dummyItem = {
            product_id: '7929d948-d915-4d56-97c6-92fdcf652f77',
            user_id: '7929d948-d915-4d56-97c6-92fdcf652f77',
            product_type: type,
            title: 'Debug Item',
            quantity: 1,
            price: 100,
            total_amount: 100
        };

        const { data, error } = await supabase.from('cart_items').insert([dummyItem]).select();

        if (error) {
            console.log(`Failed '${type}':`, error.message);
        } else {
            console.log(`SUCCESS '${type}'!`);
            fs.writeFileSync('db_success_type.txt', type);
            break;
        }
    }
}

test();
