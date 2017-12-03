
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('join',
  (table)=> {
    table.increments().primary
    table.integer('book_id').references('id').inTable('books').onDelete("CASCADE");
    table.integer('author_id').references('id').inTable('authors').onDelete("CASCADE");
  })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('join')
};
