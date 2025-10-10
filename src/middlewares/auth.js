const Converted = require('../api/models/converted')
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
    return res.status(401).json('You have no power here5')
  }
}

const isConvertedUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const converted = await Converted.findById(id)

    if (converted.role === 'convertedUser') {
      converted.password = null
      req.user = converted
      next()
    } else {
      return res.status(401).json('You have no power here3')
    }
  } catch (error) {
    return res.status(401).json('You have no power here4')
  }
}
const isAlphaAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const converted = await Converted.findById(id)

    if (converted.role === 'alphaAdmin') {
      converted.password = null
      req.user = converted
      next()
    } else {
      return res.status(401).json('You have no power here2')
    }
  } catch (error) {
    return res.status(401).json('You have no power here1')
  }
}

const isWorldCreator = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const converted = await Converted.findById(id)

    if (converted.role === 'worldCreator') {
      converted.password = null
      req.user = converted
      next()
    } else {
      return res.status(401).json('You have no power here22')
    }
  } catch (error) {
    return res.status(401).json('You have no power here11')
  }
}

const allowRoles =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next()
    } else {
      return res.status(401).json('You have no power here33')
    }
  }
module.exports = {
  isAuth,
  isWorldCreator,
  isConvertedUser,
  isAlphaAdmin,
  allowRoles
}
