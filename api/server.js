const express = require("express");

const AccountsRouter = require('./accounts/accounts-router.js');

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter)

server.get('/', (req, res) => {
    console.log("this is a server")
})

module.exports = server;
