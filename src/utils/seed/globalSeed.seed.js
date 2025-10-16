require('dotenv').config({
  path: require('path').resolve(__dirname, '../../../.env')
})
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const {
  specieArray,
  kingsArray,
  convertsArray,
  worldCreatorArray
} = require('../../data/globalData')
const { seedHelper1, seedHelper2 } = require('./seedHelpers/seedHelper')

const launchSeed = async (array1, array2, array3, array4) => {
  try {
    console.log('Connection in process...')
    await mongoose.connect(process.env.DB_URL)
    console.log('Database connection established')

    const hashedWorldCreator = []
    for (const worldCreator of array4.array) {
      worldCreator.password = bcrypt.hashSync(worldCreator.password, 10)
      hashedWorldCreator.push(worldCreator)
    }

    await array4.model.deleteMany({})
    console.log('Old worldCreator collection removed from database')
    await array4.model.insertMany(hashedWorldCreator)

    console.log(`${array4.name} succesfully seeded`)

    await array1.model.deleteMany({})
    console.log('Old specie collection removed from database')
    const insertedSpecies = await array1.model.insertMany(array1.array)

    console.log(`${array1.name} succesfully seeded`)

    await array2.model.collection.drop()
    console.log('Old kings collection removed from database')
    const insertedKings = await array2.model.insertMany(
      seedHelper1(insertedSpecies)
    )
    console.log(`${array2.name} succesfully seeded`)

    await array3.model.collection.drop()
    console.log('Old converts collection removed from database')

    //*________________________________

    const convertsArray = seedHelper2(insertedKings, insertedSpecies)
    const hashedConverts = []
    for (const convert of convertsArray) {
      convert.password = bcrypt.hashSync(convert.password, 10)
      hashedConverts.push(convert)
    }

    //*________________________________

    await array3.model.insertMany(hashedConverts)
    console.log(`${array3.name} succesfully seeded`)
  } catch (error) {
    console.log('Failed to connect to Database:' + error)
  } finally {
    await mongoose.disconnect()
    console.log('Database connection closed')
  }
}

launchSeed(specieArray, kingsArray, convertsArray, worldCreatorArray)
