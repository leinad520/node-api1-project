// server
const express = require('express');
const server = express();

// database
const db = require('data/db.js');

server.listen(4000, (req, res) => {
    console.log('server is listening on port 4000...')
})

server.get('/', (req, res) => {
    res.send('Hello!')
})

server.get('/api/users', (req, res) => {
    res.send('Hello!')
})