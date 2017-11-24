
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('join',
  (table)=> {
    table.increments().primary
    table.integer('book_id')
    table.integer('author_id')
  })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('join')
};
