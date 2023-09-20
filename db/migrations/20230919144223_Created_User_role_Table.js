/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users_roles', function(table){
        table.integer('USER_ID').unsigned();
        table.foreign('USER_ID').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('ROLE_ID').unsigned();
        table.foreign('ROLE_ID').references('roles.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.primary(['USER_ID', 'ROLE_ID']);
    })
    .then(() => {
        console.log('Tabela "users_roles" criada com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao criar a tabela "users_roles":', error);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users_roles');
};
