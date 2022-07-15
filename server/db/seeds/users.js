/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { auth0_id: '1', email: 'anEmail@gmail.com', username: 'Louis' },
    {
      auth0_id: 'auth0|62ce51224e478f1e65cfb444',
      email: 'receipts_keeper@hotmail.com',
      username: 'Lauren',
    },
    { auth0_id: '3', email: 'fancyEmail@gmail.com', username: 'Raf' },
    {
      auth0_id: 'auth0|62d080b013253f06fced71d3',
      email: 'random16@gmail.com',
      username: 'Random16',
    },
  ])
}
