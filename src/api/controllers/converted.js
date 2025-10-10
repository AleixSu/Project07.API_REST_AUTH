const { generateSign } = require('../../utils/token/jwt')
const Converted = require('../models/converted')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const users = await Converted.find().populate('king').populate('specie')
    if (users.length === 0) {
      return res.status(404).json("There's no converts to be found")
    } else {
      return res.status(200).json(users)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getUserByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await Converted.findById(id)
      .populate('king')
      .populate('specie')
    if (!user) {
      return res.status(404).json('This converted does not exist')
    } else {
      return res.status(200).json(user)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getKingArmy = async (req, res, next) => {
  try {
    const { king } = req.params
    const army = await Converted.find({ king })
      .populate('king')
      .populate('specie')
    if (army.length === 0) {
      return res.status(404).json('This king has no army')
    } else {
      return res.status(200).json(army)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new Converted({
      userName: req.body.userName,
      king: req.user.king,
      specie: req.user.specie,
      password: req.body.password,
      role: 'convertedUser'
    })

    const userDuplicated = await Converted.findOne({
      userName: req.body.userName
    })
    if (userDuplicated) {
      return res.status(400).json('This user already exists')
    } else {
      const userSaved = await newUser.save()
      return res.status(201).json(userSaved)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const registerByAdmin = async (req, res, next) => {
  try {
    const newUser = new Converted({
      userName: req.body.userName,
      king: req.user.king,
      specie: req.user.specie,
      password: req.body.password,
      role: req.body.role || 'convertedUser'
    })

    const duplicated = await Converted.findOne({ userName: req.body.userName })
    if (duplicated) return res.status(400).json('User already exists')

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await Converted.findOne({ userName: req.body.userName })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id)

        return res.status(200).json({ user, token })
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

const updateConverted = async (req, res, next) => {
  try {
    const { id } = req.params

    if (req.user._id.toString() !== id && req.user.role !== 'alphaAdmin') {
      return res.status(401).json('You have no power here123')
    }

    const updateData = {
      userName: req.body.userName,
      password: req.body.password
    }

    if (req.user.role === 'alphaAdmin' && req.body.role) {
      updateData.role = req.body.role
    } else {
      updateData.role = 'convertedUser'
    }

    const convertedUpdated = await Converted.findByIdAndUpdate(id, updateData, {
      new: true
    })

    return res.status(200).json(convertedUpdated)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteConverted = async (req, res, next) => {
  try {
    const { id } = req.params

    if (req.user._id.toString() === id || req.user.role === 'alphaAdmin') {
      const convertedDeleted = await Converted.findByIdAndDelete(id)
      return res.status(200).json(convertedDeleted)
    } else {
      return res.status(401).json('You have no power here456')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  getUsers,
  getKingArmy,
  getUserByID,
  register,
  login,
  updateConverted,
  deleteConverted,
  registerByAdmin
}
