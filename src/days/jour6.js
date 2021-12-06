import { input, inputEx } from "data/input6"
import { arrayRotate, reducerSum } from "util/array"

const dataBrut = () =>
  input
    .split(",")
    .map((a) => parseInt(a))
    .sort((a, b) => a >= b)

const algobete = (fishes, days) => {
  let newFishes = [...fishes]
  for (let index = 1; index <= days; index++) {
    const futurhuits = newFishes.filter((i) => i === 0)
    const huits = new Array(futurhuits.length).fill(8, 0)
    newFishes = newFishes.map((a) => (a - 1 >= 0 ? a - 1 : 6)).concat(huits)
  }
  return newFishes
}

const algosmart = (fishes, days) => {
  let compteur = comptageInit(fishes, new Array(9).fill(0, 0))
  for (let index = 1; index <= days; index++) {
    compteur = less1(compteur)
  }
  return compteur
}
const comptageInit = (fishes, compteurInit) =>
  compteurInit.map((a, i) => a + fishes.filter((b) => b === i).length)

const less1 = (compt) => {
  const rotation = arrayRotate([...compt])
  rotation[5] += rotation[7]
  return rotation
}

function result1() {
  const result = algobete(dataBrut(), 80).length
  return result
}
function result2() {
  const result = algosmart(dataBrut(), 257).reduce(reducerSum)
  return result
}
export default function getResultats() {
  return [result1(), result2()]
}
