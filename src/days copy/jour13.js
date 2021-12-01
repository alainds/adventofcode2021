import { input } from "data/input13"
import {
  plusProcheMultipleSuivant,
  lcmArray,
  bigIntMax,
  plusProcheMultipleSuivantBigInt,
  plusProcheMultipleBigInt,
  lcm,
} from "util/math"

const dataBrut = input.split("\n")
const now = BigInt(dataBrut[0])
function result1() {
  const buses = getBuses()
  const nextBuses = buses
    .map((b) => b.id)
    .map((id) => {
      return { timestamp: plusProcheMultipleSuivantBigInt(now, id), id }
    })
    .sort((a, b) => Number(a.timestamp - b.timestamp))
  return Number((nextBuses[0].timestamp - now) * nextBuses[0].id)
}

function result2() {
  const premierBus = getBuses().reduce(reducer, { id: 1n, i: 0n })
  return Number(premierBus.id - premierBus.i)
}

//algo élégant mais plagié ailleurs et adapté... ¯\_(ツ)_/¯
function reducer(bus1, bus2) {
  let lePlusTot = bus1.id - bus1.i
  while ((lePlusTot + bus2.i) % bus2.id !== 0n) {
    lePlusTot = lePlusTot + bus1.id
  }
  const ppcm = lcm(bus1.id, bus2.id)
  return { i: ppcm - lePlusTot, id: ppcm }
}

export default function getResultats() {
  return [result1(), result2()]
}

function getBuses() {
  return dataBrut[1]
    .split(",")
    .map((a, i) => {
      return { id: a, i }
    })
    .filter((a) => a.id !== "x")
    .map((a) => {
      return { id: BigInt(a.id), i: BigInt(a.i) }
    })
}
