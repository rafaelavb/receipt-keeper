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
      expiry_date: '02/04/2023',
      period: 4,
      period_unit: 'year(s)',
      receipt_id: 1,
    },
    {
      id: 2,
      expiry_date: '09/11/2020',
      period: 3,
      period_unit: 'month(s)',
      receipt_id: 2,
    },
    {
      id: 3,
      expiry_date: '10/03/2018',
      period: 1,
      period_unit: 'week(s)',
      receipt_id: 3,
    },
  ])
}
