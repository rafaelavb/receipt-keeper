exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('receipts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('receipts').insert([
        {
          id: 1,
          auth0_id: '1',
          name: 'TV',
          image: '',
          purchase_date: '02 - 04 - 2019',
          store: 'Smiths City',
          price: 2600,
          category_id: 2,
          note: '',
        },
        {
          id: 2,
          auth0_id: '2',
          name: 'Fridge',
          image: '',
          purchase_date: '09 - 08 - 2020',
          store: 'Harvey Norman',
          price: 1200,
          category_id: 1,
          note: '',
        },
        {
          id: 3,
          auth0_id: '3',
          name: 'Drill',
          image: '',
          purchase_date: '3 - 03 - 2018',
          store: 'Bunnings Warehouse',
          price: 460,
          category_id: 3,
          note: '',
        },
      ])
    })
}
