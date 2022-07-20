/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { id: 0, type: '' },
    { id: 1, type: 'Software' },
    { id: 2, type: 'Hardware' },
    { id: 3, type: 'Firmware' },
    { id: 4, type: 'Spyware' },
    { id: 5, type: 'Cookware' },
    { id: 6, type: 'Homeware' },
    { id: 7, type: 'Whiteware' },
  ])
}
