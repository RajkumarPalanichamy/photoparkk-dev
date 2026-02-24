
const axios = require('axios');

async function testApi() {
    const urls = [
        'http://localhost:3000/api/frames/acrylic',
        'http://localhost:3000/api/frames/canvas',
        'http://localhost:3000/api/frames/backlight',
        'http://localhost:3000/api/customizer-templates'
    ];

    for (const url of urls) {
        try {
            const res = await axios.get(url);
            console.log(`SUCCESS: ${url} - Status: ${res.status}`);
        } catch (error) {
            console.log(`FAILURE: ${url} - Status: ${error.response ? error.response.status : error.message}`);
        }
    }
}

testApi();
