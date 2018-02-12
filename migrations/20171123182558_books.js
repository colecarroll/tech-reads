exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("books", table => {
      table.increments().primary;
      table.string("bookTitle");
      table.string("bookGenre");
      table.text("bookDescription");
      table.string("bookCoverURL");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("books")]);
};
