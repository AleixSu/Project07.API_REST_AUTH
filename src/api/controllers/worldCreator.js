const { generateSign } = require('../../utils/token/jwt')
const WorldCreator = require('../models/worldCreator')
const bcrypt = require('bcrypt')

const getWorldCreators = async (req, res, next) => {
  try {
    const worldCreators = await WorldCreator.find()
    if (worldCreators.length === 0) {
      return res.status(404).json("There's no worldCreators to be found")
    } else {
      return res.status(200).json(worldCreators)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const loginWorldCreator = async (req, res, next) => {
  try {
    const worldCreator = await WorldCreator.findOne({
      userName: req.body.userName
    })
    if (worldCreator) {
      if (bcrypt.compareSync(req.body.password, worldCreator.password)) {
        const token = generateSign(worldCreator._id)
        return res.status(200).json({ worldCreator, token })
      } else {
        return res.status(400).json('User or password incorrect')
      }
    } else {
      return res.status(400).json('User or password incorrect')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { getWorldCreators, loginWorldCreator }
