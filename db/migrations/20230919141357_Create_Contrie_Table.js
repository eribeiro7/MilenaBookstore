/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('countries', function(table) {
      table.increments('ID').primary();
      table.string('NAME').notNullable();
      table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
      table.timestamp('UPDATED_AT').defaultTo(knex.fn.now());
  })
  .then(() => {
      console.log('Tabela "countries" criada com sucesso');
  })
  .catch((error) => {
      console.error('Erro ao criar a tabela "countries":', error);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('countries');
};
