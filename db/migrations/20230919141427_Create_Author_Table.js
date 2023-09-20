/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('authors', function(table) {
        table.increments('ID').primary();
        table.string('NAME').notNullable();
        table.integer('COUNTRY_ID').unsigned();
        table.foreign('COUNTRY_ID').references('id').inTable('countries').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
        table.timestamp('UPDATED_AT').defaultTo(knex.fn.now());
    })
    .then(() => {
        console.log('Tabela "authors" criada com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao criar a tabela "authors":', error);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('authors');
};
