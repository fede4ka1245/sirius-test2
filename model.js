const mongoose = require('mongoose')
const schems = require('./db.js')
const {nanoid} = require('nanoid')


async function get(id, schema){
  return await schema.findOne(id)
}

async function create(obj, schema){
  try{
    obj.id = nanoid()
    const newObj = new schema(obj)
    await newObj.save()
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

async function update(id, obj, schema){
  try{
    await schema.findOnaAndUpdate({id}, obj)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

async function remove(id, schema){
  try{
    await schema.deleteOne({id})
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}


async function getCustomer({id}){
  return await get(id, schems.customerSchema)
}

async function getBouquet({id}){
  return await get(id, schems.bouquetSchema)
}

async function getSeller({id}){
  return await get(id, schems.sellerSchema)
}

async function getCustomers(){
  console.log(1)
  return await schems.customerSchema.find()
}

async function getBouquets(){
  return await schems.bouquetSchema.find({})
}

async function getSellers(){
  return await schems.sellerSchema.find({})
}

async function createCustomer({customer}){
  return await create(customer, schems.customerSchema)
}

async function updateCustomer({id, customer}){
  return await update(id, costumer, schems.customerSchema)
}

async function deleteCustomer({id}){
  return await remove(id, schems.customerSchema)
}

async function creteSeller({seller}){
  return await create(seller, schems.sellerSchema)
}

async function updateSeller({id, seller}){
  return await update(id, seller, schems.sellerSchema)
}

async function deleteSeller({id}){
  return await remove(id, schems.sellerSchema)
}

async function creteBouquet({bouquet}){
  return await create(bouquet, schems.bouquetSchema)
}

async function updateBouquet({id, bouquet}){
  return await update(id, bouquet, schems.bouquetSchema)
}

async function deleteBouquet({id}){
  return await remove(id, schems.bouquetSchema)
}

module.exports = {
  getCustomer,
  getBouquet,
  getSeller,
  getCustomers,
  getBouquets,
  getSellers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  creteSeller,
  updateSeller,
  deleteSeller,
  creteBouquet,
  updateBouquet,
  deleteBouquet
}




// type Mutation {
//   createCustomer(customer: Customer): Customer
//   updateCustomer(id: String, customer: Customer): Customer
//   deleteCustomer(id: String): Customer 

//   createBouquet(bouquet: Bouquet): Bouquet
//   updateBouquet(id: String, bouquet: Bouquet): Bouquet
//   deleteBouquet(id: String): Bouquet 

//   createSeller(seller: Seller): Seller
//   updateSeller(id: String, seller: Seller): Seller
//   deleteSeller(id: String): Seller
// }