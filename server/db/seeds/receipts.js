exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('receipts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('receipts').insert([
        {
          id: 1,
          auth0_id: 'auth0|62d1e54bb624cf5ad8865601',
          name: 'TV',
          image: JSON.stringify({
            url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658046745/cbcvvg9nejljbdljx1r2.jpg',
            public_id: 'cbcvvg9nejljbdljx1r2',
            signature: '2eabcb163c145f76ce14a164fbbe89f9907adac6',
          }),
          purchase_date: '02/04/2019',
          store: 'Smiths City',
          price: 2600,
          category_id: 2,
          note: '',
        },
        {
          id: 2,
          auth0_id: 'auth0|62ce51224e478f1e65cfb444',
          name: 'Fridge',
          image: JSON.stringify({
            url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658046745/cbcvvg9nejljbdljx1r2.jpg',
            public_id: 'cbcvvg9nejljbdljx1r2',
            signature: '2eabcb163c145f76ce14a164fbbe89f9907adac6',
          }),
          purchase_date: '09/08/2020',
          store: 'Harvey Norman',
          price: 1200,
          category_id: 1,
          note: '',
        },
        {
          id: 3,
          auth0_id: 'auth0|62d1e54bb624cf5ad8865601',
          name: 'Drill',
          image: JSON.stringify({
            url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658046745/cbcvvg9nejljbdljx1r2.jpg',
            public_id: 'cbcvvg9nejljbdljx1r2',
            signature: '2eabcb163c145f76ce14a164fbbe89f9907adac6',
          }),
          purchase_date: '03/03/2018',
          store: 'Bunnings Warehouse',
          price: 460,
          category_id: 3,
          note: '',
        },
      ])
    })
}
