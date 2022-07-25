/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('warranties', (table) => {
    table.increments('id')
    table.date('expiry_date')
    table.integer('period')
    table.string('period_unit')
    table.integer('receipt_id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('warranties')
}
