const db = require("../../data/dbConfig");

const getAll = () => {
  return db("tasks as t")
    .join("projects as p", "p.project_id", "t.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    );
};

const getById = (task_id) => {
  return db("tasks").where({ task_id }).first();
};

const create = (task) => {
  return db("tasks").insert(task);
};

module.exports = { getAll, getById, create };
