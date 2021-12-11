import { input, inputEx } from "data/input9"
import { reducerSum, reducerMultiply } from "util/array"

const dataInit = (inp) =>
  inp.split("\n").map((a) => a.split("").map((b) => parseInt(b)))
const calculLows = (data) =>
  data.map((ligne, i) =>
    ligne.map((val, j) => {
      const voisins = calculVoisins(data, i, j)
      const isLow = voisins.every((a) => val < a)
      return isLow ? val : -1
    })
  )
const calculVoisins = (data, i, j) => {
  let voisins = []
  voisins = [
    i > 0 ? data[i - 1][j] : null,
    j > 0 ? data[i][j - 1] : null,
    i < data.length - 1 ? data[i + 1][j] : null,
    j < data[0].length - 1 ? data[i][j + 1] : null,
  ]
  return voisins.filter((a) => a !== null)
}

const calculVoisinsCoor = (data, i, j) => {
  const voisins = [
    i > 0 ? [i - 1, j] : null,
    j > 0 ? [i, j - 1] : null,
    i < data.length - 1 ? [i + 1, j] : null,
    j < data[0].length - 1 ? [i, j + 1] : null,
  ]
  return voisins.filter((a) => a !== null && data[a[0]][a[1]] < 9)
}

const calculRisk = (data) =>
  data.map((a) => a.map((b) => b + 1).reduce(reducerSum)).reduce(reducerSum)
const calculBazin1 = (dataBazin) => {
  const coor = []
  dataBazin.map((a, i) => a.map((b, j) => b === 1 && coor.push([i, j])))
  return coor
}

const calculBazin = (data, dataBazin) => {
  const dataBazinNew = [...dataBazin]

  let bazin1 = calculBazin1(dataBazinNew)
  while (bazin1.length > 0) {
    let voisinsValides = []
    bazin1.map((coor) => {
      dataBazinNew[coor[0]][coor[1]]++
      calculVoisinsCoor(data, coor[0], coor[1]).map(
        (c) =>
          voisinsValides.filter((d) => d[0] === c[0] && d[1] === c[1])
            .length === 0 && voisinsValides.push(c)
      )
    })
    voisinsValides.map((a) => {
      dataBazinNew[a[0]][a[1]]++
    })
    bazin1 = calculBazin1(dataBazinNew)
  }
  return dataBazinNew
}

const countItemInBazin = (dataBazin) =>
  dataBazin
    .map((a) => a.map((b) => (b > 0 ? 1 : 0)).reduce(reducerSum))
    .reduce(reducerSum)

function result1() {
  const lows = calculLows(dataInit(input))
  const result = calculRisk(lows)
  return result
}
function result2() {
  const data = dataInit(input)
  const lows = calculLows(data)
  const lowscoor = lows
    .map((b, i) =>
      b.map((a, j) => (a !== -1 ? [i, j] : -1)).filter((a) => a !== -1)
    )
    .flat()

  let nbBazins = []
  for (let i = 0; i < lowscoor.length; i++) {
    let dataBazin = data.map((a) => a.map((b) => 0))
    dataBazin[lowscoor[i][0]][lowscoor[i][1]] = 1
    const bazins = calculBazin(data, dataBazin, lowscoor[0][0], lowscoor[0][1])
    nbBazins.push(countItemInBazin(bazins))
  }

  const result = nbBazins
    .sort((a, b) => (a < b ? 1 : -1))
    .slice(0, 3)
    .reduce(reducerMultiply)
  return result
}
export default function getResultats() {
  return [result1(), result2()]
}
