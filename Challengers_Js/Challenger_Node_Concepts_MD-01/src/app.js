const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(newRepositorie);

  return response.json(newRepositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, techs, url } = request.body;
  
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if(repositorieIndex < 0){
    return response.status(400).json({ Error: 'Repositorie not found' })
  }

  const repositorie = {
    id,
    title: title ? title : repositories[repositorieIndex].title,
    techs: techs ? techs : repositories[repositorieIndex].techs,
    url: url ? url : repositories[repositorieIndex].url,
    likes: repositories[repositorieIndex].likes
  };

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if(repositorieIndex < 0){
    return response.status(400).json({ Error: 'Repositorie not found.' })
  }
  repositories.splice(repositorieIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);
  
  if(repositorieIndex < 0){
    return response.status(400).json({ Error: 'Repositorie not found.' })
  }
  repositories[repositorieIndex].likes += 1;

  return response.json(repositories[repositorieIndex]);
});

module.exports = app;
