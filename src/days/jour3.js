import { input } from "data/input3"
import { reducerSum, reducerMultiply, repeteData } from "util/array"

const dataBrut = input.split("\n")

function result1() {
  return calculNombreArbres(3, 1)
}

function result2() {
  const slopes = [
    { slopeX: 1, slopeY: 1 },
    { slopeX: 3, slopeY: 1 },
    { slopeX: 5, slopeY: 1 },
    { slopeX: 7, slopeY: 1 },
    { slopeX: 1, slopeY: 2 },
  ]
  const nombreArbres = slopes.map((slope) =>
    calculNombreArbres(slope.slopeX, slope.slopeY)
  )
  return nombreArbres.reduce(reducerMultiply)
}

function calculNombreArbres(slopeX, slopeY) {
  const data = dataBrut.map((row) =>
    row.split("").map((i) => (i === "." ? 0 : 1))
  )
  const n = data[0].length
  const p = data.length
  const nRep = Math.trunc((p * slopeX) / n) + 1
  const newData = repeteData(data, nRep)
  let k = 0
  let j = 0
  let toboggan = []
  while (j < p - slopeY) {
    k = k + slopeX
    j = j + slopeY
    toboggan.push(newData[j][k])
  }
  return toboggan.reduce(reducerSum)
}

export default function getResultats() {
  return [result1(), result2()]
}
