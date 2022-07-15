/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('warranties').del()
  await knex('warranties').insert([
    { id: 1, expiry_date: '17/04/2023', receipt_id: 1 },
    { id: 2, expiry_date: '06/08/2022', receipt_id: 2 },
    { id: 3, expiry_date: '10/11/2024', receipt_id: 3 },
  ])
}
