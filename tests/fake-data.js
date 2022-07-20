import React from 'react'
import { useParams } from 'react-router-dom'

export const objReceipts = [
  {
    id: 1,
    auth0_id: '1',
    name: 'TV',
    image: '',
    purchase_date: '2019-04-02',
    store: 'Smiths City',
    price: 2600,
    category_id: 2,
    note: '',
  },
]

export const newUser = {
  auth0_id: 'auth0|62d1e54bb624cf5ad8865601',
  email: 'random17@gmail.com',
  username: 'Random17',
}

export const fakeCategories = [
  {
    categoryId: 1,
    categoryType: 'Software',
  },
  {
    categoryId: 2,
    categoryType: 'Hardware',
  },
  {
    categoryId: 3,
    categoryType: 'Firmware',
  },
  {
    categoryId: 4,
    categoryType: 'Spyware',
  },
  {
    categoryId: 5,
    categoryType: 'Cookware',
  },
  {
    categoryId: 6,
    categoryType: 'Homeware',
  },
  {
    categoryId: 7,
    categoryType: 'Whiteware',
  },
]

export const reducerErrorMessage = 'error'

export const fakeClientReceipts = [
  {
    id: 1,
    auth0Id: 'auth0|random',
    username: 'Lauren',
    name: 'Drill',
    image: JSON.stringify({
      url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051820/eitbxs4xkecu9xgf9zaf.jpg',
      public_id: 'eitbxs4xkecu9xgf9zaf',
      signature: '2f91fa2de7f47078e925fd0c62e58cd0e7d54103',
    }),
    purchaseDate: '2021-04-10',
    store: 'Bunnings',
    price: 1200,
    categoryId: 1,
    categoryType: 'Software',
    note: 'Powerful drill',
    warrantyId: 1,
    expiryDate: '2021-10-10',
    warrantyPeriod: 6,
    warrantyPeriodUnit: 'month(s)',
  },
  {
    id: 2,
    auth0Id: 'auth0|random',
    username: 'Lauren',
    name: 'TV',
    image: JSON.stringify({
      url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051941/dnoaqqf0j3qptepmxosq.webp',
      public_id: 'dnoaqqf0j3qptepmxosq',
      signature: '37880eb90ac016aaf94af30d47bd407807ff673d',
    }),
    purchaseDate: '2022-01-08',
    store: 'Harvey Norman',
    price: 2300,
    categoryId: 3,
    categoryType: 'Firmware',
    note: 'Cheap TV',
    warrantyId: 2,
    expiryDate: '2022-07-08',
    warrantyPeriod: 26,
    warrantyPeriodUnit: 'week(s)',
  },
  {
    id: 3,
    auth0Id: 'auth0|random',
    username: 'Lauren',
    name: 'Microwave',
    image: JSON.stringify({
      url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051992/tuttn7hdmvpxaggfcppl.jpg',
      public_id: 'tuttn7hdmvpxaggfcppl',
      signature: 'c336638a193d56b64ec43d043da0940c36d71c32',
    }),
    purchaseDate: '2021-06-10',
    store: 'Noel Leeming',
    price: 3400,
    categoryId: 2,
    categoryType: 'Hardware',
    note: 'Expensive microwave',
    warrantyId: 3,
    expiryDate: null,
    warrantyPeriod: null,
    warrantyPeriodUnit: null,
  },
  {
    id: 4,
    auth0Id: 'auth0|random',
    username: 'Lauren',
    name: 'Computer',
    image: JSON.stringify({
      url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051941/dnoaqqf0j3qptepmxosq.webp',
      public_id: 'dnoaqqf0j3qptepmxosq',
      signature: '37880eb90ac016aaf94af30d47bd407807ff673d',
    }),
    purchaseDate: '2022-03-25',
    store: 'PB Tech',
    price: 4500,
    categoryId: 4,
    categoryType: 'Spyware',
    note: 'Gaming computer',
    warrantyId: 4,
    expiryDate: '2023-03-25',
    warrantyPeriod: 1,
    warrantyPeriodUnit: 'year(s)',
  },
]

export const fakeReceipt = {
  id: 5,
  auth0Id: 'auth0|random',
  username: 'Lauren',
  name: 'Macbook Pro',
  image: JSON.stringify({
    url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051941/dnoaqqf0j3qptepmxosq.webp',
    public_id: 'dnoaqqf0j3qptepmxosq',
    signature: '37880eb90ac016aaf94af30d47bd407807ff673d',
  }),
  purchaseDate: '2022-05-18',
  store: 'Apple',
  price: 3500,
  categoryId: 4,
  categoryType: 'Spyware',
  note: 'My new Mac Pro',
  warrantyId: 5,
  expiryDate: '2022-05-25',
  warrantyPeriod: 1,
  warrantyPeriodUnit: 'week(s)',
}

export const fakePostReceiptWithWarranty = {
  auth0Id: 'auth0|random',
  username: 'Lauren',
  name: 'Macbook Pro',
  image: JSON.stringify({
    url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051941/dnoaqqf0j3qptepmxosq.webp',
    public_id: 'dnoaqqf0j3qptepmxosq',
    signature: '37880eb90ac016aaf94af30d47bd407807ff673d',
  }),
  purchaseDate: '2022-05-18',
  store: 'Apple',
  price: 3500,
  categoryId: 4,
  categoryType: 'Spyware',
  note: 'My new Mac Pro',
  warrantyId: 5,
  expiryDate: '2022-05-25',
  warrantyPeriod: 1,
  warrantyPeriodUnit: 'week(s)',
}

export const fakeCreatedReceiptWithWarranty = {
  id: 5,
  warrantyId: 5,
  ...fakePostReceiptWithWarranty,
}

export const fakePostReceiptWithNoWarranty = {
  auth0Id: 'auth0|random',
  username: 'Lauren',
  name: 'Macbook Pro',
  image: JSON.stringify({
    url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051941/dnoaqqf0j3qptepmxosq.webp',
    public_id: 'dnoaqqf0j3qptepmxosq',
    signature: '37880eb90ac016aaf94af30d47bd407807ff673d',
  }),
  purchaseDate: '2022-05-18',
  store: 'Apple',
  price: 3500,
  categoryId: 4,
  categoryType: 'Spyware',
  note: 'My new Mac Pro',
  expiryDate: null,
  warrantyPeriod: null,
  warrantyPeriodUnit: null,
}

export const fakeCreatedReceiptWithNoWarranty = {
  id: 6,
  warrantyId: 6,
  ...fakePostReceiptWithNoWarranty,
}

export const fakePatchReceipt = {
  id: 4,
  auth0Id: 'auth0|random',
  username: 'Lauren',
  name: 'Macbook Pro Max',
  image: JSON.stringify({
    url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051941/dnoaqqf0j3qptepmxosq.webp',
    public_id: 'dnoaqqf0j3qptepmxosq',
    signature: '37880eb90ac016aaf94af30d47bd407807ff673d',
  }),
  purchaseDate: '2022-05-18',
  store: 'Apple',
  price: 5000,
  categoryId: 4,
  categoryType: 'Spyware',
  note: 'My new Mac Pro Max',
  warrantyId: 4,
  expiryDate: '2023-05-18',
  warrantyPeriod: 1,
  warrantyPeriodUnit: 'year(s)',
}

export const fakePatchedReceipt = fakePatchReceipt

export const fakeReceiptToDelete = fakeClientReceipts[1]

export function FakeLinkedPage() {
  const { store } = useParams()
  return <div>{store}</div>
}

export const fakeReceiptWOCategoryWarrantyNote = {
  id: 5,
  auth0Id: 'auth0|random',
  username: 'Lauren',
  name: 'Macbook Pro',
  image: JSON.stringify({
    url: 'http://res.cloudinary.com/receipt-keepers/image/upload/v1658051941/dnoaqqf0j3qptepmxosq.webp',
    public_id: 'dnoaqqf0j3qptepmxosq',
    signature: '37880eb90ac016aaf94af30d47bd407807ff673d',
  }),
  purchaseDate: '2022-05-18',
  store: 'Apple',
  price: 3500,
  categoryId: 0,
  categoryType: '',
  note: '',
  warrantyId: 6,
  expiryDate: null,
  warrantyPeriod: null,
  warrantyPeriodUnit: null,
}
