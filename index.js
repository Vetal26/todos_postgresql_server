const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);
const models = require('./models');

const { Todo } = models;
const { newPosition } = require('./utils/utils');

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  Todo.findAll({
    order: [['position', 'ASC']],
  })
    .then((todos) => res.json(todos))
    .catch((err) => res.status(500).send({ message: err.message || 'Failed to load todos' }));
});

app.post('/todos', (req, res) => {
  const todo = {
    title: req.body.title,
    position: new Date().getTime().toString(36),
  };

  Todo.create(todo)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.delete('/todos/:id', (req, res) => {
  Todo.destroy({
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({ message: "Todo doesn't exist!" });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.delete('/todos', (req, res) => {
  Todo.destroy({
    where: { isDone: true },
  })
    .then((num) => {
      if (num === 1) {
        res.status(204).send();
      } else {
        res.status(404).send({ message: "Todo doesn't exist!" });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.patch('/todos', (req, res) => {
  const filter = req.body.id
    ? { id: req.body.id }
    : { isDone: !req.body.isDone };

  Todo.update({ isDone: req.body.isDone }, { where: filter })
    .then((num) => {
      if (num) {
        res.status(200).send(num);
      } else {
        res.status(404).send({ message: "Todo doesn't exist!" });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.patch('/dnd/:id', (req, res) => {
  const newPos = newPosition.apply(this, req.body);

  Todo.update(
    { position: newPos },
    {
      where: { id: req.params.id },
    },
  )
    .then((num) => {
      if (num[0] === 1) {
        res.status(200).send();
      } else {
        res.status(404).send({ message: "Todo doesn't exist!" });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
});

server.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

module.exports = server;
