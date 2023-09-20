/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createTable('books', function (table) {
        table.increments('ID');
        table.integer('AUTHOR_ID').unsigned();
        table.foreign('AUTHOR_ID').references('authors.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.string('TITTLE');
        table.integer('USER_ID').unsigned();
        table.foreign('USER_ID').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
        table.timestamp('UPDATED_AT').defaultTo(knex.fn.now());
    })
    .then(() => {
        console.log('Tabela "books" criada com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao criar a tabela "books":', error);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('books');
};
