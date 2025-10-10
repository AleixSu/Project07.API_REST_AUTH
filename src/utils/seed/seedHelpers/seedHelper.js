const converts = require('../../../data/converts')
const kings = require('../../../data/kings')
const speciesSeed = require('../../../data/speciesSeed')

const seedHelper1 = (insertedSpecies) => {
  const dataSpecies = []

  for (const specie of speciesSeed) {
    dataSpecies.push(specie.name)
  }
  const specieId = {}
  for (const specie of insertedSpecies) {
    if (dataSpecies.includes(specie.name)) {
      specieId[specie.name] = specie._id
    }
  }
  const result = specieId

  const kingsSeed = []

  for (const king of kings) {
    king.specie = result[king.specie] || king.specie
    kingsSeed.push(king)
  }

  return kingsSeed
}

const seedHelper2 = (insertedKings, insertedSpecies) => {
  const kingsSeed = seedHelper1(insertedSpecies)

  const dataKings = {}
  for (const king of insertedKings) {
    dataKings[king.name] = king._id
  }

  const dataSpecies = {}
  for (const specie of insertedSpecies) {
    dataSpecies[specie.name] = specie._id
  }

  const convertsSeed = []

  for (const convert of converts) {
    convert.king = dataKings[convert.king] || convert.king
    convert.specie = dataSpecies[convert.specie] || convert.specie

    convertsSeed.push(convert)
  }

  return convertsSeed
}

module.exports = { seedHelper1, seedHelper2 }
