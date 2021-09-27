exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("projects").insert([
        {
          project_name: "Unit4-Sprint2 Challenge",
          project_description:
            "Implement required changes and test your changes",
          project_completed: false,
        },
        {
          project_name: "Web Interview",
          project_description:
            "build a new project for interview",
          project_completed: false,
        }
      ]);
    });
};
