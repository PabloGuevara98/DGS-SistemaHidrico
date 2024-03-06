const http = require('http'); // Adjusted for compatibility, remove 'node:' if your Node version doesn't support it

// CommonJS -> Traditional Node.js modules
const dittoJSON = require('./pokemon/ditto.json');

const processRequest = (req, res) => {
    const { method, url } = req;

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    return res.end(JSON.stringify(dittoJSON));
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('<h1>404 Not Found</h1>');
            }

        case 'POST':
            switch (url) {
                case '/pokemon': {
                    let body = '';
                    req.on('data', (chunk) => {
                        body += chunk.toString(); // Accumulate data
                    });

                    req.on('end', () => {
                        try {
                            const data = JSON.parse(body);
                            // Here, implement your logic to handle the data, e.g., saving it to a database
                            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
                            data.timestamp = Date.now(); // Add a timestamp to the data
                            res.end(JSON.stringify(data));
                        } catch (error) {
                            res.statusCode = 400; // Bad Request
                            return res.end('Invalid JSON');
                        }
                    });

                    break;
                }
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    return res.end('404 Not Found');
            }
    }
};

const server = http.createServer(processRequest);

server.listen(3000, () => {
    console.log('Server listening on port http://localhost:3000');
});
