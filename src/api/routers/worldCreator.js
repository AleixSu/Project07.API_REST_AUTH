const {
  getWorldCreators,
  loginWorldCreator
} = require('../controllers/worldCreator')

const worldCreatorRoutes = require('express').Router()

worldCreatorRoutes.get('/', getWorldCreators)
worldCreatorRoutes.post('/login', loginWorldCreator)

module.exports = worldCreatorRoutes
