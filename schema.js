const {buildSchema} = require('graphql')

const schema = buildSchema(`

  type Bouquet {
    id: String
    name: String
    price: Float
    pictureLink: String
    seller: Seller
  }

  type Seller {
    id: String
    name: String
    pictureLink: String
    creationDate: String
    bouquets: [Bouquet]
    soldBouqetsCounter: Int
  }

  type Customer {
    id: String
    name: String
    email: String
    Purchases: [Purchase]
  }

  type Purchase {
    id: String
    bouquet: Bouquet
    customer: Customer
    totalPrice: Float
    serviceRevenue: Float
  }

  input BouquetInput {
    name: String
    price: Float
    pictureLink: String
  }

  input SellerInput {
    name: String
    pictureLink: String
    creationDate: String
    soldBouqetsCounter: Int
  }

  input CustomerInput {
    name: String
    email: String
  }

  type Query {
    getCustomer(id: String): Customer
    getBouquet(id: String): Bouquet
    getSeller(id: String): Seller

    getCustomers: [Customer]
    getBouquets: [Bouquet]
    getSellers: [Seller]
  }

  type Mutation {
    createCustomer(customer: CustomerInput): Boolean
    updateCustomer(id: String, customer: CustomerInput): Boolean
    deleteCustomer(id: String): Boolean

    createBouquet(bouquet: BouquetInput): Boolean
    updateBouquet(id: String, bouquet: BouquetInput): Boolean
    deleteBouquet(id: String): Boolean

    createSeller(seller: SellerInput): Boolean
    updateSeller(id: String, seller: SellerInput): Boolean
    deleteSeller(id: String): Boolean

    purchaseBouquet(id: String!): [Purchase]
  }

`)

module.exports = schema