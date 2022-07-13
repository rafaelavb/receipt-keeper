/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('receipts', (table) => {
    table.increments('id').primary()
    table.string('auth0_id').references('users.auth0_id')
    table.string('name')
    table.string('image')
    table.date('purchase_date')
    table.string('store')
    table.decimal('price')
    table.integer('category_id').references('categories.id')
    table.text('note')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('receipts')
}
