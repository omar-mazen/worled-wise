const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();

const filePath = path.join(__dirname, 'db.json'); // Adjust the path to your db.json file
const data = fs.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);

const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(router);

// Enable CORS for all routes
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Support options preflight request
server.options('*', (req, res) => {
    res.sendStatus(200);
});

// Vercel automatically assigns a port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});

// Export the Server API
module.exports = server;
