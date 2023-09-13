exports.up = function(knex) {
    return knex.schema
    .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('fullname').notNullable();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('avatar');
        table.string('password').notNullable();
        table.
    })
    .createTable('products', function (table) {
        table.increments('id');
        table.decimal('price').notNullable();
        table.string('name', 1000).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
