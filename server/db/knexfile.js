const path = require('path')

module.exports = {
  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: path.join(__dirname, 'dev.sqlite3'),
  //   },
  //   useNullAsDefault: true,
  // },

  development: {
    client: 'postgresql',
    connection: {
      connectionString:
        'postgres://ymsptlmklsmywo:bf6902530c369b7368de64b53bca64aee11cad11dba809cbfc6a46b6e27cf37a@ec2-54-208-104-27.compute-1.amazonaws.com:5432/db3fcdrpn40iqc',
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    seeds: {
      directory: path.join(__dirname, 'test-seeds'),
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
