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
    console.log(error)
    return res
      .status(400)
      .json('Something went wrong. Our most sincere apology')
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
    console.log(error)
    return res
      .status(400)
      .json('Something went wrong. Our most sincere apology')
  }
}

const registerWorldCreator = async (req, res, next) => {
  try {
    const newWorldCreator = new WorldCreator(req.body)
    const duplicated = await WorldCreator.findOne({
      userName: req.body.userName
    })
    if (duplicated)
      return res.status(400).json('This worldCreator already exists')

    const worldCreatorSaved = await newWorldCreator.save()
    return res.status(201).json(worldCreatorSaved)
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json('Something went wrong. Our most sincere apology')
  }
}
const updateWorldCreator = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateData = { userName: req.body.userName, role: 'worldCreator' }
    if (req.body.password) {
      updateData.password = bcrypt.hashSync(req.body.password, 10)
    }

    const worldCreatorUpdated = await Converted.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true
      }
    )
    if (!worldCreatorUpdated) {
      return res.status(404).json('This Worldcreator does not exist')
    } else {
      return res.status(200).json(worldCreatordUpdated)
    }
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json('Something went wrong. Our most sincere apology')
  }
}

const deleteWorldCreator = async (req, res, next) => {
  try {
    const { id } = req.params
    const worldCreatorDeleted = await WorldCreator.findByIdAndDelete(id)
    if (!worldCreatorDeleted) {
      return res.status(404).json('This Worldcreator does not exist')
    } else {
      return res.status(200).json(worldCreatorDeleted)
    }
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json('Something went wrong. Our most sincere apology')
  }
}

module.exports = {
  getWorldCreators,
  loginWorldCreator,
  registerWorldCreator,
  updateWorldCreator,
  deleteWorldCreator
}
