exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("authors", table => {
      table.increments().primary;
      table.string("firstName");
      table.string("lastName");
      table.text("biography");
      table.string("portraitURL");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("authors")]);
};
