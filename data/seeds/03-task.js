
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          task_description: 'Clone github project for Unit4-Sprint2',
          task_notes: "Dont forget to fork the repo from Lambda first",
          task_completed: true,
          project_id: 1
        },
        {
          task_description: 'Setup db migrations for Unit4-Sprint2',
          task_notes: "Make sure to reference tables correctly",
          task_completed: true,
          project_id: 1
        },
        {
          task_description: 'Wireframe a new project for Web interview',
          task_notes: "Do api and client in the same folder",
          task_completed: false,
          project_id: 2
        },
      ]);
    });
};
