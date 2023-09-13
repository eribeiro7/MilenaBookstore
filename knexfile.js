require('dotenv').config();
// knexfile.js
module.exports = {
  development: {
    client: 'mysql', // ou 'pg' para PostgreSQL, 'sqlite3' para SQLite, etc.
    connection: {
      host: process.env.DB_HOST,//process.env.DB_HOST,
      user: process.env.DB_USER,//process.env.DB_USER,
      password: process.env.DB_PASS,//process.env.DB_PASS,
      database: process.env.DB_NAME//process.env.DB_NAME,
    },
    migrations: {
      directory: './db/migrations', // diretório das migrações
    },
  },
  // ... outras configurações para outros ambientes
};

