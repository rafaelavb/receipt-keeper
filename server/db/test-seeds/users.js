/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      auth0_id: 'auth0|someone',
      email: 'someone@gmail.com',
      username: 'Louis',
    },
    {
      auth0_id: 'auth0|random',
      email: 'random@hotmail.com',
      username: 'Lauren',
    },
    {
      auth0_id: 'auth0|somebody',
      email: 'somebody@yahoo.com',
      username: 'Raf',
    },
    {
      auth0_id: 'auth0|someperson',
      email: 'someperson@msn.com',
      username: 'Adam',
    },
  ])
}
