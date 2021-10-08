const {buildSchema} = require('graphql')

const schema = buildSchema(`

  type Bouquet {
    id: String
    name: String
    price: Float
    pictureLink: String
    sellerId: String
  }

  type Seller {
    id: String
    name: String
    pictureLink: String
    creationDate: String
    bouquets: [Bouquet]
    bouquetsCounter: Int
  }

  type Customer {
    id: String
    name: String
    email: String
    Purchases: [Purchase]
  }

  type Purchase {
    id: String
    bouquetId: String
    customerId: String 
    totalPrice: Float
    serviceRevenue: Float
  }

  input BouquetInput {
    name: String
    price: Float
    pictureLink: String
    sellerId: String
  }

  input SellerInput {
    name: String
    pictureLink: String
  }

  input CustomerInput {
    name: String
    email: String
  }

  type Query {
    getCustomer(id: String): Customer
    getBouquet(id: String): Bouquet
    getSeller(id: String): Seller

    getBouquets: [Bouquet]
    getSellers: [Seller]
    getCustomers: [Customer]
    getPurchases(customerId: String): [Purchase]
  }

  type Mutation {
    createCustomer(customer: CustomerInput): Customer
    updateCustomer(id: String, customer: CustomerInput): Customer
    deleteCustomer(id: String): Customer

    createBouquet(bouquet: BouquetInput): Bouquet
    updateBouquet(id: String, bouquet: BouquetInput): Bouquet
    deleteBouquet(id: String): Bouquet

    createSeller(seller: SellerInput): Seller
    updateSeller(id: String, seller: SellerInput): Seller
    deleteSeller(id: String): Seller

    purchaseBouquet(bouquetId: String!, customerId: String!): Purchase
  }

`)

module.exports = schema