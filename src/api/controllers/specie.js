const Specie = require('../models/specie')

const getSpecies = async (req, res, next) => {
  try {
    const species = await Specie.find()
    if (species.length === 0) {
      return res.status(400).json('Any specie has been found')
    } else {
      return res.status(200).json(species)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const postSpecie = async (req, res, next) => {
  try {
    const newSpecie = new Specie(req.body)

    const specieCreated = await newSpecie.save()
    return res.status(201).json(specieCreated)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const updateSpecie = async (req, res, next) => {
  try {
    const { id } = req.params
    const specieUpdated = await Specie.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.status(200).json(specieUpdated)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteSpecie = async (req, res, next) => {
  try {
    const { id } = req.params

    const specieDeleted = await Specie.findByIdAndDelete(id)
    return res.status(200).json(specieDeleted)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { getSpecies, postSpecie, updateSpecie, deleteSpecie }
