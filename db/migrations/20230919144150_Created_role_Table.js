/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('roles', function(table){
        table.increments('ID');
        table.string('NAME').unique();
        table.string('description');
    })
    .then(() => {
        console.log('Tabela "roles" criada com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao criar a tabela "roles":', error);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('roles');
};
