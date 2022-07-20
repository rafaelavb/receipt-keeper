/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('warranties').del()
  await knex('warranties').insert([
    {
      id: 1,
      expiry_date: '10/10/2021',
      period: 6,
      period_unit: 'month(s)',
      receipt_id: 1,
    },
    {
      id: 2,
      expiry_date: '08/07/2022',
      period: 26,
      period_unit: 'week(s)',
      receipt_id: 2,
    },
    {
      id: 3,
      expiry_date: null,
      period: null,
      period_unit: null,
      receipt_id: 3,
    },
    {
      id: 4,
      expiry_date: '25/03/2023',
      period: 1,
      period_unit: 'year(s)',
      receipt_id: 4,
    },
  ])
}
