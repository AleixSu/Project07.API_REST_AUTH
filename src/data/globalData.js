const Converted = require('../api/models/converted')
const King = require('../api/models/king')
const Specie = require('../api/models/specie')
const WorldCreator = require('../api/models/worldCreator')
const converts = require('./converts')
const kings = require('./kings')
const speciesSeed = require('./speciesSeed')
const worldCreator = require('./worldCreator')

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
const worldCreatorArray = {
  name: 'WorldCreator data',
  array: worldCreator,
  model: WorldCreator
}

module.exports = { convertsArray, kingsArray, specieArray, worldCreatorArray }
