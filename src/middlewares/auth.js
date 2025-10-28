const Converted = require('../api/models/converted')
const WorldCreator = require('../api/models/worldCreator')
const { verifyJwt } = require('../utils/token/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) throw new Error('No token provided')

    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)

    let user = await Converted.findById(id)
    if (!user) {
      user = await WorldCreator.findById(id)
    }
    if (!user) {
      throw new Error('User not found')
    }

    user.password = null
    req.user = user

    next()
  } catch (error) {
    console.error('Auth error:', error.message)
    return res.status(401).json('You have no power here')
  }
}

const allowRoles =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next()
    } else {
      return res.status(401).json('You have no power here')
    }
  }

module.exports = { isAuth, allowRoles }
