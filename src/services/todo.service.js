const repository = require("../core/Repository");
const schema = require("../schemas/Todo.schema");

const date = () => new Date();

const defaultFilter = () => {
  return true;
};

const get = async (filter = defaultFilter) =>
  await repository.get(schema, filter);

const add = async (data) =>
  await repository.add(schema, {
    ...data,
    id: Date.now(),
    is_completed: false,
    created_date: date(),
    updated_date: date(),
  });

const update = async (id, data) =>
  await repository.modify(schema, id, {
    ...data,
    updated_date: date(),
  });

const remove = async (id) => await repository.remove(schema, id);

module.exports = {
  get,
  add,
  update,
  remove,
};
