const mongoose = require('mongoose')

const worldCreatorSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: 'worldCreator' }
  },
  {
    timestamps: true,
    collection: 'worldCreators'
  }
)

const WorldCreator = mongoose.model(
  'worldCreators',
  worldCreatorSchema,
  'worldCreators'
)
module.exports = WorldCreator
