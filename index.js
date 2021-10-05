const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema.js')
const mongoose = require('mongoose')
const root = require('./model.js')

const app = express()

mongoose.connect("mongodb://localhost:27017/test2")
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(cors())

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
  rootValue: root
}))

app.listen(5000, () => console.log('server started on port 3000'))