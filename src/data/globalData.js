const Converted = require('../api/models/converted')
const King = require('../api/models/king')
const Specie = require('../api/models/specie')
const converts = require('./converts')
const kings = require('./kings')
const speciesSeed = require('./speciesSeed')

const specieArray = {
  name: 'Species data',
  array: speciesSeed,
  model: Specie
}
const kingsArray = {
  name: 'Kings data',
  array: kings,
  model: King
}
const convertsArray = {
  name: 'Converts data',
  array: converts,
  model: Converted
}

module.exports = { convertsArray, kingsArray, specieArray }
