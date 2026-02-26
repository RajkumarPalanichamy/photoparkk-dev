import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function testUpload() {
    const fileName = `testaxios.jpg`;
    const buffer = Buffer.from('test image content', 'utf-8');

    console.log('Uploading direct axios fetch to:', fileName);

    try {
        const res = await axios.post(`${supabaseUrl}/storage/v1/object/photos/uploads/${fileName}`, buffer, {
            headers: {
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'image/jpeg',
                'x-upsert': 'true'
            },
        });
        console.log('Upload Success:', res.data);
    } catch (err) {
        console.error('Upload Error:', err.response?.data || err.message);
    }
}

testUpload();
