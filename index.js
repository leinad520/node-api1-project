const express = require('express');
const server = express();

//middleware
server.use(express.json())

server.listen(4000, (req, res) => {
    console.log('Server is running on port 4000')
})

server.get('/', (req, res) => {
    res.send('<h3>hello world</h3>')
})

server.get('/now', (req, res) => {
    const date = new Date();
    res.send(date.toString())
})

server.post('/hubs', (req, res) => {
    const newHub = req.body;
    db.add(newHub)
    .then(hub => {
        res.status(201).json(hub)
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'failed to create new hub'
        })
    })
})