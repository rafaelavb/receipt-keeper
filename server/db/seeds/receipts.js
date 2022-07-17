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
            url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051820/eitbxs4xkecu9xgf9zaf.jpg',
            public_id: 'eitbxs4xkecu9xgf9zaf',
            signature: '2f91fa2de7f47078e925fd0c62e58cd0e7d54103',
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
            url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051941/dnoaqqf0j3qptepmxosq.webp',
            public_id: 'dnoaqqf0j3qptepmxosq',
            signature: '37880eb90ac016aaf94af30d47bd407807ff673d',
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
            url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051992/tuttn7hdmvpxaggfcppl.jpg',
            public_id: 'tuttn7hdmvpxaggfcppl',
            signature: 'c336638a193d56b64ec43d043da0940c36d71c32',
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
