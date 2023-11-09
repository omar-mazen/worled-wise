const jsonServer = require("json-server");

const server = jsonServer.create();

// Uncomment to allow write operations
const fs = require("fs");
const path = require("../db.json");
const filePath = path.join("db.json");
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);

// Comment out to allow write operations
// const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Export the Server API
module.exports = server;
