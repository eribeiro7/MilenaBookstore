exports.up = function(knex) {
    return knex.schema.createTable('books', function(table) {
        table.increments('id').primary();
        table.string('username');
        table.string('email');
        // ... outras colunas
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
