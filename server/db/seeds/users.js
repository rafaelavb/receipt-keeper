/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { auth0_id: 1, email: 'anEmail@gmail.com', username: 'Louis' },
    { auth0_id: 2, email: 'anotherEmail@gmail.com', username: 'Lauren' },
    { auth0_id: 3, email: 'fancyEmail@gmail.com', username: 'Raf' },
  ])
}
