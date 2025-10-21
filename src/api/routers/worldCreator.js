const { isAuth, allowRoles } = require('../../middlewares/auth')
const {
  getWorldCreators,
  loginWorldCreator,
  registerWorldCreator,
  deleteWorldCreator,
  updateWorldCreator
} = require('../controllers/worldCreator')

const worldCreatorRoutes = require('express').Router()

worldCreatorRoutes.get('/', getWorldCreators)
worldCreatorRoutes.post('/login', loginWorldCreator)
worldCreatorRoutes.post(
  '/register',
  [isAuth, allowRoles('worldCreator')],
  registerWorldCreator
)
worldCreatorRoutes.patch(
  '/:id',
  [isAuth, allowRoles('worldCreator')],
  updateWorldCreator
)
worldCreatorRoutes.delete(
  '/:id',
  [isAuth, allowRoles('worldCreator')],
  deleteWorldCreator
)

module.exports = worldCreatorRoutes
