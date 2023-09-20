exports.up = function(knex) {
    knex.schema.createTable('users', function(table) {
        table.increments('ID').primary();
        table.string('FULLNAME').notNullable();
        table.string('USERNAME').notNullable();
        table.string('EMAIL').notNullable();
        table.string('AVATAR');
        table.string('PASSWORD').notNullable();
        table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
        table.timestamp('UPDATED_AT').defaultTo(knex.fn.now());
    })
    .then(() => {
        console.log('Tabela "users" criada com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao criar a tabela "users":', error);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
