// implement your API here

const express = require('express');

const db = require('./data/db.js');

const port = 5000;

const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
  const userInfo = req.body;

  if(userInfo.name && userInfo.bio) {
    db.insert(userInfo)
      .then(result => {
        res.json(result);
        res.status(201);
      })
      .catch(error => {
        res.send(error);
        res.status(500);
      });
  } else {
    res
      .status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(response => {
      res.json(response);
      res.status(200);
    })
    .then(error => {
      res.send(error);
      res.status(500);
    });
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;

  if(id <= 0){
    res.json({ message: 'Please enter a valid id.' });
  };

  db.findById(id)
    .then(response => {
      res.json(response);
      res.status(201);
    })
    .catch(error => {
      res.json(error);
      res.status(500);
    });
});

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
  .then(response => {
    res.json(response);
    res.status(201);
  })
  .catch(error => {
    res.json(error);
    res.status(500);
  });
});

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const userInfo = req.body;

  db.update(id, userInfo)
    .then(response => {
      res.json(response);
      res.status(200);
    })
    .catch(error => {
      res.json(error);
      res.status(500);
    });
})

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
