'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('message').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.droptable('messages');
};
