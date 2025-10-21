const Converted = require('../api/models/converted')
const WorldCreator = require('../api/models/worldCreator')
const { verifyJwt } = require('../utils/token/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const converted = await Converted.findById(id)
    converted.password = null
    req.user = converted
    next()
  } catch (error) {
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
