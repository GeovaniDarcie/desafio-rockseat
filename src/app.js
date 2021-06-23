const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository);

  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if (repositoryId < 0) {
    response.status(400).json({ error: 'repository not found' });
  }

  const likes = repositories[repositoryId].likes;

  repository = { id, title, url, techs, likes }
  repositories[repositoryId] = repository;

  response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if (repositoryId < 0) {
    response.status(400).json({ error: 'repository not found' });
  }

  repositories.splice(repositoryId, 1);

  response.status(204).send('');
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if (repositoryId < 0) {
    response.status(400).json({ error: 'Id not found' });
  }

  repositories[repositoryId].likes++;

  response.json(repositories[repositoryId]);
});

module.exports = app;
