require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/db')
const kingsRoutes = require('./src/api/routers/king')
const speciesRoutes = require('./src/api/routers/specie')
const convertsRoutes = require('./src/api/routers/converted')

const app = express()
app.use(express.json())
connectDB()

app.use('/api/v1/converts', convertsRoutes)
app.use('/api/v1/kings', kingsRoutes)
app.use('/api/v1/species', speciesRoutes)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
