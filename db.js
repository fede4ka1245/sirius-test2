const mongoose = require('mongoose')

const bouquetSchema = mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  pictureLink: String,
  seller: mongoose.Schema.Types.Mixed
})

const sellerSchema = mongoose.Schema({
  id: String, 
  name: String, 
  pictureLink: String, 
  creationDate: String,
  bouquets: [String],
  soldBouqetsCounter: Number
})

const customerSchema = mongoose.Schema({
  id: String,
  name: String,
  email: String,
  purchases: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
})

const serviceSchema = mongoose.Schema({
  revenue: Number
}) 

module.exports = {
  bouquetSchema: mongoose.model('bouquet', bouquetSchema),
  sellerSchema: mongoose.model('seller', sellerSchema),
  customerSchema: mongoose.model('customer', customerSchema)
}