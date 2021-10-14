const mongoose = require('mongoose')

const bouquetSchema = mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  pictureLink: String,
  sellerId: String
})

const sellerSchema = mongoose.Schema({
  id: String, 
  name: String, 
  pictureLink: String, 
  creationDate: String,
  bouquets: {
    type: mongoose.Schema.Types.Mixed,
    default: []
  },
  bouquetsCounter: {
    type: Number,
    default: 0
  }
})

const customerSchema = mongoose.Schema({
  id: String,
  name: String,
  email: String,
  purchases: {
    type: mongoose.Schema.Types.Mixed,
    default: []
  }
})

const serviceSchema = mongoose.Schema({
  revenue: Number
}) 

function startDatabase(){
  mongoose.connect(`mongodb+srv://bragin:${process.env.PASSWORD}@cluster0.i1szs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
  const db = mongoose.connection
  db.on('error', (error) => console.error(error))
  db.once('open', () => console.log('Connected to Database'))
}

module.exports = {
  bouquetSchema: mongoose.model('bouquet', bouquetSchema),
  sellerSchema: mongoose.model('seller', sellerSchema),
  customerSchema: mongoose.model('customer', customerSchema),
  serviceSchema: mongoose.model('service', serviceSchema),
  startDatabase
}