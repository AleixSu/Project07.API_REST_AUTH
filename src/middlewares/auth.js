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
      return res.status(401).json('You have no power here')
    }
  } catch (error) {
    return res.status(401).json('You have no power here')
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
      return res.status(401).json('You have no power here')
    }
  } catch (error) {
    return res.status(401).json('You have no power here')
  }
}

const isWorldCreator = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const worldCreator = await WorldCreator.findById(id)

    if (worldCreator.role === 'worldCreator') {
      worldCreator.password = null
      req.user = worldCreator
      next()
    } else {
      return res.status(401).json('You have no power here')
    }
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
module.exports = {
  isAuth,
  isWorldCreator,
  isConvertedUser,
  isAlphaAdmin,
  allowRoles
}
