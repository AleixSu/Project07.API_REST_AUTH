const { isWorldCreator } = require('../../middlewares/auth')
const {
  getSpecies,
  postSpecie,
  deleteSpecie,
  updateSpecie
} = require('../controllers/specie')

const speciesRoutes = require('express').Router()

speciesRoutes.get('/', getSpecies)
speciesRoutes.post('/', isWorldCreator, postSpecie)
speciesRoutes.patch('/:id', isWorldCreator, updateSpecie)
speciesRoutes.delete('/:id', isWorldCreator, deleteSpecie)

module.exports = speciesRoutes
