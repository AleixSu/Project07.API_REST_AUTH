const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    console.log('Connection in process...')
    await mongoose.connect(process.env.DB_URL)
    console.log('Database connection established')
  } catch (error) {
    console.log(error)

    console.log('Failed to connect to Database:')
  }
}

module.exports = connectDB
