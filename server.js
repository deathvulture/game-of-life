const handler = require('serve-handler');
const http = require('http');

const PORT = 80;
const PUBLIC_FOLDER = 'src';

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Use serve-handler to serve static files
  handler(req, res, {
    public: PUBLIC_FOLDER,
  });
});

// Start the server
server.listen(PORT, () => {
  console.log('Running at http://localhost:' + PORT);
});