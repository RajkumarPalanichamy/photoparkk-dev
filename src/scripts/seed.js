
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log('🚀 Starting database seeding...');

    // 1. Create Admin User
    const adminEmail = 'admin@photoparkk.com';
    const adminPassword = 'adminpassword123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const { data: existingAdmin, error: authError } = await supabase
        .from('users')
        .select('id')
        .eq('email', adminEmail)
        .single();

    if (authError && authError.code !== 'PGRST116') {
        console.error('Error checking for existing admin:', authError);
    } else if (!existingAdmin) {
        const { error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    name: 'System Admin',
                    email: adminEmail,
                    password_hash: hashedPassword,
                    role: 'admin'
                }
            ]);

        if (insertError) {
            console.error('Error creating admin user:', insertError);
        } else {
            console.log(`✅ Admin user created: ${adminEmail} / ${adminPassword}`);
        }
    } else {
        console.log('ℹ️ Admin user already exists.');
    }

    // 2. Seed New Arrivals
    const newArrivals = [
        {
            title: 'Premium Portrait Acrylic Frame',
            content: 'High-quality acrylic frame with stunning clarity and depth. Perfect for portrait photos.',
            image: '/assets/frontend_assets/About/machine2.jpg',
            rating: 4.8,
            thickness: '3mm',
            sizes: [
                { label: '8x10', price: 499, original: 699 },
                { label: '12x16', price: 899, original: 1199 }
            ],
            stock: 'In Stock',
            quantity: 50
        },
        {
            title: 'Modern Landscape Canvas Print',
            content: 'Textured canvas print with vibrant colors and a matte finish. Ideal for landscape scenery.',
            image: '/assets/frontend_assets/About/machine4.jpg',
            rating: 4.5,
            thickness: 'Wooden Stretch',
            sizes: [
                { label: '12x18', price: 799, original: 999 },
                { label: '20x30', price: 1499, original: 1999 }
            ],
            stock: 'In Stock',
            quantity: 30
        },
        {
            title: 'Luminous Backlight Frame',
            content: 'Glow from within with our premium backlight frames. Enhances colors and adds a magical touch.',
            image: '/assets/frontend_assets/About/machine3.jpg',
            rating: 4.9,
            thickness: '5mm',
            sizes: [
                { label: '10x10', price: 1299, original: 1599 },
                { label: '16x16', price: 2199, original: 2799 }
            ],
            stock: 'Limited Edition',
            quantity: 15
        }
    ];

    const { error: naError } = await supabase.from('new_arrivals').insert(newArrivals);
    if (naError) console.error('Error seeding new_arrivals:', naError);
    else console.log('✅ Seeded New Arrivals.');

    // 3. Seed Special Offers
    const specialOffers = [
        {
            title: 'Custom Family Collage Frame',
            content: 'Create a beautiful collage of your best family moments. Buy 1 Get 1 Free for a limited time!',
            image: '/assets/frontend_assets/About/machine1.jpg',
            rating: 4.7,
            thickness: '3mm',
            sizes: [
                { label: '16x20', price: 1199, original: 2399 }
            ],
            stock: 'Sale',
            quantity: 100
        }
    ];

    const { error: soError } = await supabase.from('special_offers').insert(specialOffers);
    if (soError) console.error('Error seeding special_offers:', soError);
    else console.log('✅ Seeded Special Offers.');

    console.log('✨ Seeding complete!');
}

seed().catch(console.error);
