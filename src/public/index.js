const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

const UserService = require('../services/User.services');

const userService = new UserService();

app.get('/users', (req, res) => {
  try {
    res.status(200).json(userService.getAll(req.query).map((u) => u.toJson()));
  }catch (error) {
    res.status(400).json(error?.message)
  }
});

app.get('/users/:id', (req, res) => {
  try {
    const user = userService.getById(req.params.id);
    res.status(200).json(user.toJson());
  }catch (error) {
    res.status(400).json(error?.message)
  }
});

app.delete('/users/:id', (req, res) => {
  try {
    const idDeleted = userService.delete(req.params.id);
    res.status(200).json(idDeleted);
  }catch (error) {
    res.status(400).json(error?.message)
  }
});

app.post('/users', (req, res) => {
  try {
    const user = userService.create(req.body);
    res.status(201).json(user.toJson());
  }catch (error) {
    res.status(400).json(error?.message)
  }
});

app.patch('/users/:id', (req, res) => {
  try {
    const user = userService.update(req.params.id, req.body);
    res.status(200).json(user.toJson());
  }catch (error) {
    res.status(400).json(error?.message)
  }
});

app.listen(8080, () => {
  console.log("Serveur à l'écoute");
});

