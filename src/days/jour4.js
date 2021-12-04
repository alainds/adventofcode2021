import { input, inputEx } from "data/input4"
import { reducerSum, transposeArraysOfArrays } from "util/array"

const dataBrut = input.split("\n\n")
const tirs = dataBrut
  .shift()
  .split(",")
  .map((i) => parseInt(i, 10))
const cartes = dataBrut.map((a) =>
  a.split("\n").map((b) =>
    b
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .map((i) => parseInt(i, 10))
  )
)

const winLigne = (ligne) => !ligne.some((i) => i === 0)
const winLignes = (carte) => carte.some((ligne) => winLigne(ligne))
const winCarte = (carte) => {
  return winLignes(carte) || winLignes(transposeArraysOfArrays(carte))
}
const winCartes = (cartes) => cartes.some((carte) => winCarte(carte))

const faireUnTir = (cartes, cartesTirs, tir) => {
  const cartesTirsNew = [...cartesTirs]
  for (let i = 0; i < cartes.length; i++) {
    for (let j = 0; j < cartes[i].length; j++) {
      for (let k = 0; k < cartes[i][j].length; k++) {
        if (cartes[i][j][k] === tir) {
          cartesTirsNew[i][j][k] = 1
        }
      }
    }
  }
  return cartesTirsNew
}
const scoreWinCarte = (carte, tirs) =>
  carte
    .map((ligne) => {
      const unmark = ligne.filter((item) => !tirs.includes(item))
      // console.log({ unmark })
      return unmark.length > 0 ? unmark.reduce(reducerSum) : 0
    })
    .reduce(reducerSum)

const scoreWinner = (cartes, cartesTirs, tirsGagnant) => {
  for (let i = 0; i < cartesTirs.length; i++) {
    const carteWin = cartes[i]
    const carteTirsWin = cartesTirs[i]
    // debugger
    if (
      winLignes(carteTirsWin) ||
      winLignes(transposeArraysOfArrays(carteTirsWin))
    ) {
      return scoreWinCarte(carteWin, tirsGagnant)
    }
  }
  return 0
}

const reduceCartes = (cartes, cartesTirs) => {
  for (let i = 0; i < cartesTirs.length; i++) {
    const carteTirsWin = cartesTirs[i]
    if (
      winLignes(carteTirsWin) ||
      winLignes(transposeArraysOfArrays(carteTirsWin))
    ) {
      cartes.splice(i, 1)
      cartesTirs.splice(i, 1)
    }
  }
  return null
}

function result1() {
  let result = 0
  let cartesTirs = cartes.map((carte, i) =>
    carte.map((ligne, j) =>
      ligne.map((item, k) => {
        return 0
      })
    )
  )

  for (let index = 0; index < tirs.length; index++) {
    const tir = tirs[index]
    cartesTirs = faireUnTir(cartes, cartesTirs, tir)
    if (winCartes(cartesTirs)) {
      const tirsGagnant = tirs.slice(0, index + 1)
      result = scoreWinner(cartes, cartesTirs, tirsGagnant) * tir

      break
    }
  }

  return result
}
function result2() {
  let result = 0
  let cartesTirs = cartes.map((carte, i) =>
    carte.map((ligne, j) =>
      ligne.map((item, k) => {
        return 0
      })
    )
  )

  let carteWin
  for (let index = 0; index < tirs.length; index++) {
    const tir = tirs[index]
    cartesTirs = faireUnTir(cartes, cartesTirs, tir)
    if (winCartes(cartesTirs)) {
      reduceCartes(cartes, cartesTirs)
    }
    if (cartes.length === 1) {
      carteWin = cartes[0]
    }
    if (cartes.length === 0) {
      const tirsGagnant = tirs.slice(0, index + 1)
      console.log("tirsGagnant", tirsGagnant)
      result = scoreWinCarte(carteWin, tirsGagnant) * tirs[index - 1]

      break
    }
  }
  return result
}
export default function getResultats() {
  return [result1(), result2()]
}
