const { isWorldCreator, isAuth, allowRoles } = require('../../middlewares/auth')
const {
  getSpecies,
  postSpecie,
  deleteSpecie,
  updateSpecie
} = require('../controllers/specie')

const speciesRoutes = require('express').Router()

speciesRoutes.get('/', getSpecies)
speciesRoutes.post('/', [isAuth, allowRoles('worldCreator')], postSpecie)
speciesRoutes.patch('/:id', [isAuth, allowRoles('worldCreator')], updateSpecie)
speciesRoutes.delete('/:id', [isAuth, allowRoles('worldCreator')], deleteSpecie)

module.exports = speciesRoutes
