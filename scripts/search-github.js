const https = require('https');

const query = encodeURIComponent('"resolves outside storage directory" repo:supabase/storage-api');
const options = {
    hostname: 'api.github.com',
    path: `/search/issues?q=${query}`,
    headers: { 'User-Agent': 'Node.js' }
};

https.get(options, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const result = JSON.parse(data);
        if (result.items && result.items.length > 0) {
            console.log('Found issue:', result.items[0].html_url);
            console.log('Title:', result.items[0].title);

            // Get comments
            if (result.items[0].comments_url) {
                const url = new URL(result.items[0].comments_url);
                https.get({
                    hostname: url.hostname,
                    path: url.pathname + url.search,
                    headers: { 'User-Agent': 'Node.js' }
                }, res2 => {
                    let data2 = '';
                    res2.on('data', chunk => data2 += chunk);
                    res2.on('end', () => {
                        const comments = JSON.parse(data2);
                        console.log('Comments:');
                        comments.slice(-3).forEach(c => console.log(c.body.substring(0, 300) + '...'));
                    });
                });
            }
        } else {
            console.log('No issues found');
        }
    });
}).on('error', err => console.error(err));
