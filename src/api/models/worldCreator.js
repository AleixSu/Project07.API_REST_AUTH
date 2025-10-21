const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

worldCreatorSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const WorldCreator = mongoose.model(
  'worldCreators',
  worldCreatorSchema,
  'worldCreators'
)
module.exports = WorldCreator
