const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema.js')
const {startDatabase} = require('./db.js')
const root = require('./model.js')

const app = express()

const PORT = process.env.PORT || 4000

startDatabase()

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
  rootValue: root
}))

app.listen(PORT, () => console.log('server has been started'))