/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { id: 1, type: 'Appliances' },
    { id: 2, type: 'Electronics' },
    { id: 3, type: 'Hardware' },
  ])
}
