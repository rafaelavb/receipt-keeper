/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { id: 0, type: '' },
    { id: 1, type: 'Appliances' },
    { id: 2, type: 'Electronics' },
    { id: 3, type: 'Building & renovation' },
    { id: 4, type: 'Antiques & collectables' },
    { id: 5, type: 'Baby gear' },
    { id: 6, type: 'Books' },
    { id: 7, type: 'Business, farming & industry & renovation' },
    { id: 8, type: 'Clothing & Fashion' },
    { id: 9, type: 'Computers' },
    { id: 10, type: 'Photography' },
    { id: 11, type: 'Gaming' },
    { id: 12, type: 'Health & beauty' },
    { id: 13, type: 'Home & living' },
    { id: 14, type: 'Jewellery & watches' },
    { id: 15, type: 'Music & instruments' },
    { id: 15, type: 'Pets & animals' },
    { id: 15, type: 'Sports' },
    { id: 16, type: 'Toys & models' },
  ])
}
