const mongoose = require('mongoose')

const specieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    territory: { type: String, required: true, trim: true },
    hierarchyLevel: { type: Number, required: true }
  },
  {
    timestamps: true,
    collection: 'species'
  }
)

const Specie = mongoose.model('species', specieSchema, 'species')
module.exports = Specie
