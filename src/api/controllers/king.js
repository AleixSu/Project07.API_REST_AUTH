const King = require('../models/king')

const getKings = async (req, res, next) => {
  const kings = await King.find().populate('specie')
  if (kings.length === 0) {
    return res.status(400).json('Any king has been found')
  } else {
    return res.status(200).json(kings)
  }
}

const postKing = async (req, res, next) => {
  try {
    const newKing = new King(req.body)

    const kingCreated = await newKing.save()
    return res.status(201).json(kingCreated)
  } catch (error) {
    return res.status(401).json(error)
  }
}
const updateKing = async (req, res, next) => {
  try {
    const { id } = req.params
    const kingUpdated = await King.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.status(200).json(kingUpdated)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteKing = async (req, res, next) => {
  try {
    const { id } = req.params

    const kingDeleted = await King.findByIdAndDelete(id)
    return res.status(200).json(kingDeleted)
  } catch (error) {
    return res.status(401).json(error)
  }
}

module.exports = { getKings, postKing, deleteKing, updateKing }
