const mongoose = require('mongoose')
const kings = require('../../data/kings')

const kingsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    specie: { type: mongoose.Types.ObjectId, ref: 'species', required: true }
  },
  {
    timestamps: true,
    collection: 'kings'
  }
)

const King = mongoose.model('kings', kingsSchema, 'kings')

module.exports = King
