
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {resource_name: 'Laptop', resource_description:"Any laptop with 8GB RAM or more"},
        {resource_name: 'Monitor', resource_description:"Any monitor as a second screen"},
      ]);
    });
};
