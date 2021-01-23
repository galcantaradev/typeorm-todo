import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

import ormConfig from '../typeorm.config';
import { Todo } from './entities';

const app = express();

const PORT = 3000;
const HOST = 'localhost';

const main = async () => {
  await createConnection(ormConfig);

  app.use(express.json());

  app.get('/', async (_, res) => {
    const todos = await Todo.find();
    return res.status(200).send(todos);
  });

  app.post('/', async (req, res) => {
    const { body } = req;

    if (!body.description) {
      return res.send({ error: true, message: 'description is required' });
    }

    const todo = await Todo.create({
      description: body.description,
      isDone: body.isDone
    });

    await todo.save();

    return res.status(201).send(todo);
  });

  app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findOne(id);

    if (!todo) {
      return res.status(404).send({ error: true, message: 'todo not found' });
    }

    return res.status(200).send(todo);
  });

  app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { description, isDone } = req.body;

    const todo = await Todo.findOne(id);

    if (!todo) {
      return res.status(404).send({ error: true, message: 'todo not found' });
    }

    if (!description) {
      return res.send({ error: true, message: 'description is required' });
    }

    todo.description = description;
    todo.isDone = isDone;

    await todo.save();

    return res.status(200).send(todo);
  });

  app.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findOne(id);

    if (!todo) {
      return res.status(404).send({ error: true, message: 'todo not found' });
    }

    await Todo.delete(todo);

    return res.send({ error: false, message: 'deleted' });
  });

  app.listen(PORT, () => console.log(`Server running on ${HOST}:${PORT}`));
};

main().catch(error => console.error(error));
