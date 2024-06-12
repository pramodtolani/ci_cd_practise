const mongoose = require("mongoose");

const ENV = require("../constants/ENV");

const logger = require("./Logger");

class Repository {
  constructor() {}

  response = (data, error = null) =>
    Object({
      error,
      data,
    });

  get = async (Schema, filter) => {
    return await Schema.find(filter)
      .then((data) => this.response(data))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });
  };

  add = async (Schema, data) => {
    return await Schema.save(data)
      .then((added) => this.response(added))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });
  };

  modify = async (Schema, id, data) =>
    await Schema.findByIdAndUpdate(id, data, { new: true })
      .then((modified) => this.response(modified))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });

  remove = async (Schema, id) =>
    await Schema.findByIdAndRemove(id)
      .then((modified) => this.response(modified))
      .catch((error) => {
        logger.error(`MongoDb Error: ${error.message}`);
        return this.response(null, error.message);
      });
}

module.exports = new Repository();
