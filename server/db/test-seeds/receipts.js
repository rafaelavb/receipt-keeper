exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('receipts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('receipts').insert([
        {
          id: 1,
          auth0_id: 'auth0|random',
          name: 'Drill',
          image: JSON.stringify({
            url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051820/eitbxs4xkecu9xgf9zaf.jpg',
            public_id: 'eitbxs4xkecu9xgf9zaf',
            signature: '2f91fa2de7f47078e925fd0c62e58cd0e7d54103',
          }),
          purchase_date: '10/04/2021',
          store: 'Bunnings',
          price: 1200,
          category_id: 1,
          note: 'Powerful drill',
        },
        {
          id: 2,
          auth0_id: 'auth0|random',
          name: 'TV',
          image: JSON.stringify({
            url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051941/dnoaqqf0j3qptepmxosq.webp',
            public_id: 'dnoaqqf0j3qptepmxosq',
            signature: '37880eb90ac016aaf94af30d47bd407807ff673d',
          }),
          purchase_date: '08/01/2022',
          store: 'Harvey Norman',
          price: 2300,
          category_id: 3,
          note: 'Cheap TV',
        },
        {
          id: 3,
          auth0_id: 'auth0|random',
          name: 'Microwave',
          image: JSON.stringify({
            url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051992/tuttn7hdmvpxaggfcppl.jpg',
            public_id: 'tuttn7hdmvpxaggfcppl',
            signature: 'c336638a193d56b64ec43d043da0940c36d71c32',
          }),
          purchase_date: '10/06/2021',
          store: 'Noel Leeming',
          price: 3400,
          category_id: 2,
          note: 'Expensive microwave',
        },
        {
          id: 4,
          auth0_id: 'auth0|random',
          name: 'Computer',
          image: JSON.stringify({
            url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051941/dnoaqqf0j3qptepmxosq.webp',
            public_id: 'dnoaqqf0j3qptepmxosq',
            signature: '37880eb90ac016aaf94af30d47bd407807ff673d',
          }),
          purchase_date: '25/03/2022',
          store: 'PB Tech',
          price: 4500,
          category_id: 4,
          note: 'Gaming Computer',
        },
      ])
    })
}
