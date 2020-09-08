// server
const express = require('express');
const server = express();

// database
const db = require('./data/db.js');

// middleware 
server.use(express.json());

server.listen(4000, (req, res) => {
    console.log('server is listening on port 4000...')
})

// GET

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).send(users)
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    })
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.findById(id)
    .then(user => {
        // throw new Error()
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    })
})

// POST

server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if (!newUser.bio || !newUser.name) {
        res.status(201).json({
            errorMessage: "Please provide bio and name for user."
        })
    }

    db.insert(newUser)
    .then(user => {
            res.status(200).json(newUser)
        }
    )
    .catch(err => {
        res.status(500).json({
            err,
            errorMessage: "There was an error while saving the user to the database"
        })
    })
})

// Delete
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(numRecordsDeleted => {
        if (numRecordsDeleted === 0) {res.json({message: 'The user with the specified id does not exist'})}
        else {res.status(200).json(numRecordsDeleted)};
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            error: "The user could not be removed"
        })
    })
})

// PUT
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changedUser = req.body;

    db.findById(id)
    .then(user => {
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        } else if (!changedUser.name || !changedUser.bio) {
            res.status(400).json({
                message: "Please provide name and bio for user"
            })
        } else {
            db.update(id, changedUser)
            .then(updatedCount => {
                res.status(200).send(JSON.stringify(updatedCount))
            })
            .catch(err => {
                res.send(err)
            })
        }
    })

})