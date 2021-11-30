import { input } from "data/input5"

const dataBrut = input.split("\n")
const placesBrut = dataBrut.map((i) => [i.substr(0, 7), i.substr(7)])

const places = calculPlaces(placesBrut)

function result1() {
  return Math.max(...places.map((i) => i.id))
}

function result2() {
  const placesManquantes = []

  const longueurRow = Math.pow(2, placesBrut[0][0].length)
  const longueurCol = Math.pow(2, placesBrut[0][1].length)
  const placesId = places.map((p) => p.id)
  for (let i = 0; i < longueurRow; i++) {
    for (let j = 0; j < longueurCol; j++) {
      const currentId = i * 8 + j
      !placesId.includes(currentId) &&
        placesManquantes.push({ row: i, col: j, id: currentId })
    }
  }

  const placesManquantesId = placesManquantes.map((p) => p.id)
  //truc compliqué pour faire semblant mais en vrai j'ai juste regardé la console de debug
  return placesManquantesId[
    placesManquantesId.reduce((acc, curr, i) => {
      return curr - 1 === acc ? curr : acc
    }) + 1
  ]
}

function calculPlace(chain, bornes, lowChar = "F") {
  const borneInf = bornes[0]
  const borneSup = bornes[1]
  if (chain.length === 1) {
    return chain === lowChar ? borneInf : borneSup
  } else {
    const current = chain.substr(0, 1)
    const others = chain.substr(1, chain.length)
    const borneNew = (borneInf + borneSup + 1) / 2
    return current === lowChar
      ? calculPlace(others, [borneInf, borneNew - 1], lowChar)
      : calculPlace(others, [borneNew, borneSup], lowChar)
  }
}

function calculPlaces(placesChains) {
  const longueurRow = Math.pow(2, placesChains[0][0].length)
  const longueurCol = Math.pow(2, placesChains[0][1].length)
  return placesChains.map((place) => {
    const row = calculPlace(place[0], [0, longueurRow - 1], "F")
    const col = calculPlace(place[1], [0, longueurCol - 1], "L")
    const id = row * 8 + col
    return { row, col, id }
  })
}

export default function getResultats() {
  return [result1(), result2()]
}
