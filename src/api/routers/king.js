const { isWorldCreator } = require('../../middlewares/auth')
const {
  getKings,
  postKing,
  updateKing,
  deleteKing
} = require('../controllers/king')

const kingsRoutes = require('express').Router()

kingsRoutes.get('/', isWorldCreator, getKings)
kingsRoutes.post('/', isWorldCreator, postKing)
kingsRoutes.patch('/:id', isWorldCreator, updateKing)
kingsRoutes.delete('/:id', isWorldCreator, deleteKing)

module.exports = kingsRoutes
