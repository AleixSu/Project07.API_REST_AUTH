const { isWorldCreator, allowRoles, isAuth } = require('../../middlewares/auth')
const {
  getKings,
  postKing,
  updateKing,
  deleteKing
} = require('../controllers/king')

const kingsRoutes = require('express').Router()

kingsRoutes.get('/', getKings)
kingsRoutes.post('/', [isAuth, allowRoles('worldCreator')], postKing)
kingsRoutes.patch('/:id', [isAuth, allowRoles('worldCreator')], updateKing)
kingsRoutes.delete('/:id', [isAuth, allowRoles('worldCreator')], deleteKing)

module.exports = kingsRoutes
