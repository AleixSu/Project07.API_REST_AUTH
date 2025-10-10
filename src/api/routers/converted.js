const {
  isConvertedUser,
  isAlphaAdmin,
  allowRoles,
  isAuth
} = require('../../middlewares/auth')
const {
  getUsers,
  getUserByID,
  getKingArmy,
  login,
  register,
  updateConverted,
  deleteConverted,
  registerByAdmin
} = require('../controllers/converted')

const convertsRoutes = require('express').Router()

convertsRoutes.get('/', getUsers)
convertsRoutes.get('/kingArmy/:king', getKingArmy)
convertsRoutes.get('/:id', getUserByID)
convertsRoutes.post('/register', isConvertedUser, register)
convertsRoutes.post('/register/byAdmin', [isAlphaAdmin], registerByAdmin)
convertsRoutes.post('/login', login)
convertsRoutes.patch(
  '/:id',
  [isAuth, allowRoles('alphaAdmin', 'convertedUser')],
  updateConverted
)
convertsRoutes.delete(
  '/:id',
  [isAuth, allowRoles('alphaAdmin', 'convertedUser')],
  deleteConverted
)

module.exports = convertsRoutes
