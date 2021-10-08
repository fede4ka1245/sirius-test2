const schems = require('./db.js')
const {nanoid} = require('nanoid')


async function get(id, schema){
  return await schema.findOne({id})
}

async function create(obj, schema){
  try{
    obj.id = nanoid()
    const newObj = new schema(obj)
    await newObj.save()
    return obj
  } catch (err) {
    console.log(err)
  }
}

async function update(id, changedObj, schema){
  try{
    const obj = await schema.findOneAndUpdate({id}, changedObj)
    return obj
  } catch (err) {
    console.log(err)
  }
}

async function remove(id, schema){
  try{
    const obj = await schema.findOneAndDelete({id}) 
    return obj
  } catch (err) {
    console.log(err)
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

async function getPurchases({customerId}){
  const customer = await schems.customerSchema.findOne({id: customerId})
  return customer.purchases
} 

async function getCustomers(){
  return await schems.customerSchema.find({})
}

async function getBouquets(){
  return await schems.bouquetSchema.find({})
}

async function getSellers(){
  return await schems.sellerSchema.find({})
}

async function createCustomer({customer}){
  console.log(12);
  return await create(customer, schems.customerSchema)
}

async function updateCustomer({id, customer}){
  return await update(id, customer, schems.customerSchema)
}

async function deleteCustomer({id}){
  return await remove(id, schems.customerSchema)
}

async function createSeller({seller}){
  creationDate = new Date()
  seller.creationDate = `${creationDate.getDate()}.${creationDate.getMonth()}.${creationDate.getFullYear()}`
  return await create(seller, schems.sellerSchema)
}

async function updateSeller({id, seller}){
  return await update(id, seller, schems.sellerSchema)
}

async function deleteSeller({id}){
  return await remove(id, schems.sellerSchema)
}

async function createBouquet({bouquet}){
  const seller = await schems.sellerSchema.findOne({id: bouquet.sellerId})
  seller.bouquets.push(bouquet)
  await schems.sellerSchema.findOneAndUpdate({id: seller.id}, seller)
  return await create(bouquet, schems.bouquetSchema)
}

async function updateBouquet({id, bouquet}){
  return await update(id, bouquet, schems.bouquetSchema)
}

async function deleteBouquet({id}){
  const bouquet = await schems.bouquetSchema.findOne({id})
  sellerId = bouquet.sellerId
  const seller = await schems.sellerSchema.findOne({id: sellerId})
  if (seller.bouquets.indexOf(bouquet)){
    seller.bouquets.splice(seller.bouquets.indexOf(bouquet))
    await schems.sellerSchema.findOneAndUpdate({id: sellerId}, seller)
  }
  return await remove(id, schems.bouquetSchema)
}

async function purchaseBouquet({bouquetId, customerId}){
  try{
    const bouquet = await schems.bouquetSchema.findOne({id: bouquetId})
    const customer = await schems.customerSchema.findOne({id: customerId})
    const bouquetSeller = await schems.sellerSchema.findOne({ id: bouquet.sellerId })
    if (bouquetSeller.bouquetsCounter){
      bouquetSeller.bouquetsCounter += 1
    } else {
      bouquetSeller.bouquetsCounter = 1
    }
    const purchase = {
      id: nanoid(),
      bouquetId: bouquetId,
      customerId: customerId,
      totalPrice: bouquet.price * 1.3,
      serviceRevenue: bouquet.price * 0.3
    }
    customer.purchases.push(purchase)
    console.log(bouquetSeller.bouquetsCounter)
    await schems.customerSchema.findOneAndUpdate({id: customerId}, customer)
    await schems.sellerSchema.findOneAndUpdate({id: bouquetSeller.id}, bouquetSeller)
    return purchase
  } catch(err){
    console.log(err)
  }
}

module.exports = {
  getCustomer,
  getBouquet,
  getSeller,
  getPurchases,
  getBouquets,
  getSellers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  createSeller,
  updateSeller,
  deleteSeller,
  createBouquet,
  updateBouquet,
  deleteBouquet,
  purchaseBouquet,
  getCustomers
}