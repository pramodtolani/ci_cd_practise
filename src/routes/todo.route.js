const express = require("express");

const service = require("../services/todo.service");

const todo = express.Router();

todo.get("/", async (request, response) => response.send(await service.get()));

todo.get("/:id", async (request, response) =>
  response.send(await service.get(({ id }) => request.params.id == id))
);

todo.post("/", async(request, response) =>
  response.status(201).send(await service.add(request.body))
);

todo.put("/:id", async (request, response) =>
  response.send(await service.update(request.params.id, request.body))
);

todo.delete("/:id", async (request, response) =>
  response.send(await service.remove(request.params.id))
);

module.exports = todo;
