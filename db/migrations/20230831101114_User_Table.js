exports.up = function(knex) {
    knex.schema
    .createTable('countries', function(table) {
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
    knex.schema.createTable('authors', function(table) {
        table.increments('ID').primary();
        table.string('NAME').notNullable();
        table.integer('COUNTRY_ID').unsigned();
        table.foreign('COUNTRY_ID').references('id').inTable('countries');
        table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
        table.timestamp('UPDATED_AT').defaultTo(knex.fn.now());
    })
    .then(() => {
        console.log('Tabela "authors" criada com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao criar a tabela "authors":', error);
    });
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
    knex.schema.createTable('books', function (table) {
        table.increments('ID');
        table.integer('AUTHOR_ID').unsigned();
        table.foreign('AUTHOR_ID').references('authors.id');
        table.string('TITTLE');
        table.integer('USER_ID').unsigned();
        table.foreign('USER_ID').references('users.id');
        table.timestamp('CREATED_AT').defaultTo(knex.fn.now());
        table.timestamp('UPDATED_AT').defaultTo(knex.fn.now());
        //table.timestamp(true, true);
    })
    .then(() => {
        console.log('Tabela "books" criada com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao criar a tabela "books":', error);
    });
};

exports.down = function(knex) {
    return knex.schema
                .dropTableIfExists('countries')
                .dropTableIfExists('authors')
                .dropTableIfExists('users')
                .dropTableIfExists('books');
};
