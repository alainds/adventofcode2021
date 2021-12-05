/* eslint-disable array-callback-return */
import { input, inputEx } from "data/input5"
import { reducerSum, reducerMax } from "util/array"

const initLines = (inputFile) =>
  inputFile.split("\n").map((a) =>
    a.split(" -> ").map((b) => {
      const c = b.split(",")
      return { x: parseInt(c[0]), y: parseInt(c[1]) }
    })
  )
const initMatrice = (lines) => {
  const maxX = lines.map((a) => Math.max(a[0].x, a[1].x)).reduce(reducerMax)
  const maxY = lines.map((a) => Math.max(a[0].y, a[1].y)).reduce(reducerMax)
  const matrice = []
  for (let i = 0; i <= maxX; i++) {
    matrice[i] = []
    for (let j = 0; j <= maxY; j++) {
      matrice[i][j] = 0
    }
  }
  return matrice
}

const tracerHorizontals = (lines, matrice) => {
  const horizontals = lines.filter((c) => c[0].y === c[1].y)
  horizontals.map((a) => {
    const deb = Math.min(a[0].x, a[1].x)
    const fin = Math.max(a[0].x, a[1].x)
    for (let i = deb; i <= fin; i++) {
      matrice[i][a[0].y]++
    }
  })
  return matrice
}
const tracerVerticals = (lines, matrice) => {
  const verticals = lines.filter((c) => c[0].x === c[1].x)
  verticals.map((a) => {
    const deb = Math.min(a[0].y, a[1].y)
    const fin = Math.max(a[0].y, a[1].y)
    for (let i = deb; i <= fin; i++) {
      matrice[a[0].x][i]++
    }
  })
  return matrice
}
const tracerDiagionals = (lines, matrice) => {
  const diagonalsPositive = lines.filter((c) => {
    const rapportCoor = (c[0].x - c[1].x) / (c[0].y - c[1].y)
    return Number.isInteger(rapportCoor) && rapportCoor > 0
  })
  const diagonalsNegative = lines.filter((c) => {
    const rapportCoor = (c[0].x - c[1].x) / (c[0].y - c[1].y)
    return Number.isInteger(rapportCoor) && rapportCoor < 0
  })
  const diagonals = [
    { diagonals: diagonalsPositive, sens: 1 },
    { diagonals: diagonalsNegative, sens: -1 },
  ]
  diagonals.map((d) => {
    d.diagonals.map((a) => {
      const deb = Math.min(a[0].x, a[1].x)
      const fin = Math.max(a[0].x, a[1].x)
      let courant = deb === a[0].x ? { ...a[0] } : { ...a[1] }
      for (let i = deb; i <= fin; i++) {
        matrice[courant.x][courant.y]++
        courant.x += 1
        courant.y += d.sens
      }
    })
  })
  return matrice
}

const score = (matrice) =>
  matrice?.map((a) => a.filter((i) => i >= 2).length).reduce(reducerSum)

function result1() {
  const lines = initLines(input)
  const matrice = initMatrice(lines)
  tracerHorizontals(lines, matrice)
  tracerVerticals(lines, matrice)
  return score(matrice)
}
function result2() {
  const lines = initLines(input)
  const matrice = initMatrice(lines)
  tracerHorizontals(lines, matrice)
  tracerVerticals(lines, matrice)
  tracerDiagionals(lines, matrice)
  return score(matrice)
}
export default function getResultats() {
  return [result1(), result2()]
}
