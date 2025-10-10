const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const convertedSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    king: { type: mongoose.Types.ObjectId, ref: 'kings', required: true },
    specie: { type: mongoose.Types.ObjectId, ref: 'species', required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['alphaAdmin', 'convertedUser'],
      default: 'convertedUser'
    }
  },
  {
    timestamps: true,
    collection: 'converts'
  }
)

convertedSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const Converted = mongoose.model('converts', convertedSchema, 'converts')
module.exports = Converted
